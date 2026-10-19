/* eslint-disable no-console */
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

const SLACK_API_URL = 'https://slack.com/api';

type SlackResponse = { ok: boolean; error?: string; [key: string]: unknown };

/**
 * Split the release notes into the Canvas title (first `# ` heading) and the Canvas body.
 * Lines containing only `&nbsp;` are Slack paste helpers and are turned into empty lines.
 */
export function buildCanvas(markdown: string, fallbackTitle: string): { title: string; body: string } {
  const lines = markdown.split('\n');
  const titleIndex = lines.findIndex((line) => line.startsWith('# '));
  const title = titleIndex === -1 ? fallbackTitle : lines[titleIndex].slice(2).trim();
  const body = lines
    .filter((_, index) => index !== titleIndex)
    .map((line) => (line.trim() === '&nbsp;' ? '' : line))
    .join('\n')
    .trim();

  return { title, body };
}

async function callSlack(method: string, token: string, payload: object = {}): Promise<SlackResponse> {
  const response = await fetch(`${SLACK_API_URL}/${method}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const result = (await response.json()) as SlackResponse;

  if (!result.ok) {
    throw new Error(`Slack ${method} failed: ${result.error ?? response.statusText}`);
  }

  return result;
}

async function main() {
  const [filePath, ...flags] = process.argv.slice(2);
  const isDryRun = flags.includes('--dry');

  if (!filePath) {
    throw new Error('Usage: post-release-notes <release-notes.md> [--dry]');
  }

  const { title, body } = buildCanvas(readFileSync(filePath, 'utf8'), basename(filePath, '.md'));

  if (isDryRun) {
    console.log(`Title: ${title}\n\n${body}`);

    return;
  }

  const token = process.env.SLACK_BOT_TOKEN;
  const channelId = process.env.SLACK_RELEASE_CHANNEL_ID;
  if (!token || !channelId) {
    throw new Error('SLACK_BOT_TOKEN and SLACK_RELEASE_CHANNEL_ID must be set');
  }

  const { canvas_id: canvasId } = await callSlack('canvases.create', token, {
    title,
    document_content: { type: 'markdown', markdown: body },
  });
  await callSlack('canvases.access.set', token, {
    canvas_id: canvasId,
    access_level: 'read',
    channel_ids: [channelId],
  });

  const { url, team_id: teamId } = await callSlack('auth.test', token);
  const canvasUrl = `${url}docs/${teamId}/${canvasId}`;
  const prUrl = process.env.RELEASE_NOTES_PR_URL;
  await callSlack('chat.postMessage', token, {
    channel: channelId,
    text: `📢 ${title}: <${canvasUrl}|read the release notes>${prUrl ? ` (<${prUrl}|PR>)` : ''}`,
  });

  console.log(`Canvas created: ${canvasUrl}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
