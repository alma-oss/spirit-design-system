// This script is based on @see { @link https://github.com/kiwicom/orbit/blob/master/scripts/post-changelog.mjs }
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { fileURLToPath } from 'url';
import { config as dotenvConfig } from 'dotenv-safe';
import gitDiffParser from 'gitdiff-parser';
import { simpleGit } from 'simple-git';
import slackifyMarkdown from 'slackify-markdown';
import { $, fetch, argv, path, fs } from 'zx';

const COLOR_CORE = '#00A58E';
const PACKAGES = ['web', 'web-react', 'design-tokens', 'icons', 'codemods', 'analytics'];
let SLACK_CHANGELOG_WEBHOOK_URL = process.env.SLACK_CHANGELOG_WEBHOOK_URL ?? '';
// Git lock retry configuration
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000; // 2 seconds

/**
 * Wait for specified milliseconds
 */
async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if git lock files are present
 */
function isGitLockPresent(repoDir: string = '.'): boolean {
  // Checks for common git lock files
  return (
    fs.existsSync(path.join(repoDir, '.git', 'index.lock')) ||
    fs.existsSync(path.join(repoDir, '.git', 'packed-refs.lock')) ||
    fs.existsSync(path.join(repoDir, '.git', 'HEAD.lock'))
  );
}

/**
 * Executes a git operation with retry mechanism for handling git locks
 *
 * @param operation - The git operation function to execute
 * @param repoDir - The repository directory (defaults to current directory)
 * @param maxRetries - Maximum number of retries (defaults to MAX_RETRIES)
 * @param retryDelay - Delay between retries in milliseconds (defaults to RETRY_DELAY_MS)
 *
 * @returns Promise resolving to the operation result
 */
async function executeGitOperationWithRetry<T>(
  operation: () => Promise<T>,
  repoDir: string = '.',
  maxRetries: number = MAX_RETRIES,
  retryDelay: number = RETRY_DELAY_MS,
): Promise<T> {
  let attempts = 0;
  let lastError: Error;

  while (attempts < maxRetries) {
    try {
      if (isGitLockPresent(repoDir)) {
        throw new Error('Git lock file detected before operation.');
      }

      return await operation();
    } catch (err) {
      const error = err as Error;

      const isGitLockError =
        error.message.includes('Another git process seems to be running') ||
        error.message.includes('index.lock') ||
        error.message.includes('packed-refs.lock') ||
        error.message.includes('HEAD.lock') ||
        error.message.includes('Git lock file detected') ||
        isGitLockPresent(repoDir);

      if (isGitLockError) {
        attempts++;
        lastError = error;
        console.warn(
          `Git lock detected (attempt ${attempts}/${maxRetries}). Retrying in ${retryDelay / 1000} seconds...`,
        );

        if (attempts < maxRetries) {
          await wait(retryDelay);
          continue;
        }
      }

      throw error;
    }
  }

  throw new Error(`Git operation failed after ${maxRetries} retries: ${lastError!.message}`);
}

/*
 * Generates a title for the given package.
 *
 * @returns {string} The generated title.
 */
function getTitle() {
  return `🚀 New release published`;
}

/**
 * Sends the content to the specified webhook URL.
 *
 * @param {object} params - The parameters.
 * @param {object} params.content - The content to send.
 * @param {string} params.webhookUrl - The webhook URL to send the content to.
 */
async function sendToWebhook({ content, webhookUrl }: { content: object; webhookUrl: string }) {
  await fetch(webhookUrl, {
    method: 'POST',
    body: JSON.stringify(content),
  })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
    })
    .catch((err) => {
      console.log('Error posting to Slack');
      console.error(err);
      process.exit(1);
    });
}

/**
 * Formats the changelog string with the given package name and prefix.
 *
 * @param {string} str - The changelog string to format.
 * @param {string} packageName - The name of the package.
 * @param {string} prefix - The prefix to use for the package.
 *
 * @returns {string} The formatted changelog string.
 */
function format(str: string, packageName: string, prefix: string = '@alma-oss') {
  const output = str
    .replace(
      /^(#+ )(.+)/,
      `# 📦 ${packageName
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')} _$2_ \`${prefix}/spirit-${packageName}\``,
    )
    .replace(/\(\d{4}-\d{2}-\d{2}\)/, '') // Remove release date
    .replace('Bug Fixes', '🐛 Bug Fixes')
    .replace('Features', '⚡ Features')
    .replace('BREAKING CHANGES', '🚨 BREAKING CHANGES')
    .replace('Dependencies', '📦 Dependencies')
    .replace('Documentation', '📜 Documentation')
    .replace('Tests', '🧪 Tests')
    .replace('Code Refactoring', '🛠️ Code Refactoring')
    .replace('Chores', '🔨 Chores')
    .replace('Styles', '💅 Styles')
    .replaceAll('https://github.com/alma-oss/spirit-design-system/issues/', 'https://jira.almacareer.tech/browse/');

  return output;
}

type ChangelogDiffFile = File & {
  hunks: { changes: { isInsert: boolean; content: string }[] }[];
};

/**
 * Extracts the changelog content from the given diff files.
 *
 * @param {Array<ChangelogDiffFile>} files - The diff files to extract the changelog from.
 * @returns {string} The extracted changelog content.
 */
function getChangelogFromDiff(files: ChangelogDiffFile[]) {
  // Only one file as we're only looking at the changelog
  const versionPattern = /<a name=".*"><\/a>/;
  const [changelogFile] = files;
  const changelog = changelogFile.hunks
    .flatMap((hunk: { changes: { isInsert: boolean; content: string }[] }) =>
      hunk.changes
        .filter(({ isInsert }: { isInsert: boolean }) => isInsert)
        .map(({ content }: { content: string }) => content),
    )
    .filter((line: string) => !versionPattern.test(line))
    .join('\n')
    .trim();

  return changelog;
}

/**
 * Gets the diff for the given tag and path.
 *
 * @param {string} tag - The tag to get the diff for.
 * @param {string} path - The path to get the diff for.
 * @returns {Promise<string>} The diff output.
 */
function getDiff(tag: string, path: string): Promise<string> {
  return simpleGit().show([tag, path]);
}

/**
 * Returns the changelog path for the given package name.
 *
 * @param {string} packageName - The name of the package.
 * @returns {string} The changelog path.
 */
function changelogPath(packageName: string): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  return path.resolve(__dirname, `../../packages/${packageName}/CHANGELOG.md`);
}

/**
 * Posts a Slack notification with the given changelog.
 *
 * @param {string} changelog - The changelog content to post.
 * @param {string} packageName - The name of the package.
 *
 * @returns {Promise<void>}
 */
async function postSlackNotification(changelog: string, packageName: string): Promise<null | void> {
  try {
    $.verbose = false;
    const res = await sendToWebhook({
      webhookUrl: SLACK_CHANGELOG_WEBHOOK_URL,
      content: {
        attachments: [
          {
            color: COLOR_CORE,
            blocks: [
              {
                type: 'header',
                text: {
                  type: 'plain_text',
                  text: getTitle(),
                  emoji: true,
                },
              },
            ],
          },
          {
            // The `text` field is used as fallback, but it has higher character limit (4000) then section block
            // @see { @link https://api.slack.com/methods/chat.postMessage#text_usage}
            // @see { @link https://api.slack.com/reference/block-kit/blocks#section_fields }
            text: changelog,
            color: COLOR_CORE,
          },
        ],
      },
    });

    return res;
  } catch (err) {
    console.log('Error posting to Slack');
    console.error(err);
  }

  return null;
}

/**
 * Configures the webhook URL from the environment variables.
 */
async function configureWebhookURL() {
  try {
    dotenvConfig({
      allowEmptyValues: true,
      example: '.env.example',
    });
    SLACK_CHANGELOG_WEBHOOK_URL = process.env.SLACK_CHANGELOG_WEBHOOK_URL as string;
  } catch (err) {
    if (/SLACK_CHANGELOG_WEBHOOK_URL/g.test(err.message)) {
      throw new Error('SLACK_CHANGELOG_WEBHOOK_URL is not set');
    }
  }
}

/**
 * Publish the changelog for the given npm package.
 *
 * @param {string} npmPackage - The name of the npm package.
 */
async function publishChangelog(npmPackage: string) {
  try {
    const diff = await executeGitOperationWithRetry(async () => {
      // Fetch latest tags from remote (force update since publish step just created them)
      await simpleGit().fetch(['origin', 'refs/tags/*:refs/tags/*', '--force']);
      const tags = await simpleGit().tags({ '--sort': '-taggerdate' });
      const diff = await getDiff(
        argv.dry ? '@lmc-eu/spirit-web-react@3.1.0' : (tags.latest ?? ''),
        changelogPath(npmPackage),
      );

      return diff;
    });
    const files = gitDiffParser.parse(diff);
    if (files.length === 0) {
      console.log(`No changes in ${npmPackage}`);

      return;
    }
    const changelog = getChangelogFromDiff(files as unknown as ChangelogDiffFile[]);
    const formattedChangelog = format(changelog, npmPackage);
    const slackifiedChangelog = slackifyMarkdown(formattedChangelog);

    if (argv.dry) {
      console.info(slackifiedChangelog);
    } else {
      await configureWebhookURL();
      await postSlackNotification(slackifiedChangelog, npmPackage);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

(async () => {
  await Promise.all(
    PACKAGES.map(async (npmPackage) => {
      await publishChangelog(npmPackage);
    }),
  );
  process.exit(0);
})();
