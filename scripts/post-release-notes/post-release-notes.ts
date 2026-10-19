/* eslint-disable no-console */
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

import { buildCanvas } from './buildCanvas';

const SLACK_API_URL = 'https://slack.com/api';
const SLACK_TIMEOUT_MS = 15_000;

type SlackResponse = { ok: boolean; error?: string; [key: string]: unknown };

async function callSlack(method: string, token: string, payload: object = {}): Promise<SlackResponse> {
  const response = await fetch(`${SLACK_API_URL}/${method}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(SLACK_TIMEOUT_MS),
  });
  let result: SlackResponse;

  try {
    result = (await response.json()) as SlackResponse;
  } catch {
    // Slack answers with HTML instead of JSON on gateway errors (e.g. 502)
    throw new Error(`Slack ${method} failed: ${response.status} ${response.statusText} (not a JSON response)`);
  }

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

  // `yarn workspace` runs this script from its own folder (and resets INIT_CWD), relative paths are meant from the repository root
  process.chdir(process.env.PROJECT_CWD ?? process.cwd());
  const { title, body } = buildCanvas(readFileSync(filePath, 'utf8'), basename(filePath, '.md'));

  if (isDryRun) {
    console.log(`Title: ${title}\n\n${body}`);

    return;
  }

  const token = process.env.SLACK_BOT_TOKEN;
  const channelId = process.env.SLACK_CHANNEL_ID;
  if (!token || !channelId) {
    throw new Error('SLACK_BOT_TOKEN and SLACK_CHANNEL_ID must be set');
  }

  const { canvas_id: canvasId } = await callSlack('canvases.create', token, {
    title,
    document_content: { type: 'markdown', markdown: body },
  });
  // Logged right away, a failure of the next calls leaves the Canvas behind and it can be shared or removed by hand
  console.log(`Canvas ${canvasId} created`);
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
