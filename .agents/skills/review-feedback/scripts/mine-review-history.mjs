#!/usr/bin/env node
/**
 * Collects human review feedback from recently merged PRs, used to refresh
 * `REVIEW.md`. See `references/mining-method.md` of the `spirit:review-feedback` skill.
 *
 * Usage: node mine-review-history.mjs [--limit 200] [--since <date or ISO timestamp> [--until <date or ISO timestamp>]]
 *        [--out /tmp/review-history] [--repo alma-oss/spirit-design-system]
 *
 * With `--since`, only PRs merged after that moment are fetched (for example the "Latest merged" value in `REVIEW.md`).
 * All matching PRs are fetched in that case, so `--limit` applies to baseline runs only. GitHub Search returns at
 * most 1,000 results, so a `--since` run that matches more PRs fails instead of publishing a checkpoint that
 * skips some. Add `--until` to mine a bounded window (merged after `--since`, up to and including `--until`), and use
 * it as `--since` of the next window, so a long period can be mined in several runs without skipping any PR.
 *
 * A baseline run scans every PR the search returns, orders them by merge time, and keeps the newest `--limit` PRs with
 * human feedback. The search can only sort by creation time, so selecting by merge time needs the whole result set.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

const { values: args } = parseArgs({
  options: {
    limit: { type: 'string', default: '200' },
    out: { type: 'string', default: '/tmp/review-history' },
    repo: { type: 'string', default: 'alma-oss/spirit-design-system' },
    since: { type: 'string' },
    until: { type: 'string' },
  },
});

if (args.until && !args.since) {
  process.stderr.write('Error: --until needs --since, because a window is bounded on both sides.\n');
  process.exit(1);
}

// Search qualifiers compare dates, but `--since` is an exclusive moment (the previous checkpoint), so the PRs merged
// exactly at that moment are dropped after fetching. An unparsable value fails here instead of matching nothing.
const toTime = (value) => {
  const time = Date.parse(value);

  if (Number.isNaN(time)) {
    process.stderr.write(`Error: "${value}" is not a date or an ISO timestamp.\n`);
    process.exit(1);
  }

  return time;
};
const sinceTime = args.since ? toTime(args.since) : null;

if (args.until) {
  toTime(args.until);
}

// `--limit` samples a baseline run only. An incremental `--since` run must exhaust all matching PRs, because the
// printed `Latest mergedAt` becomes the next checkpoint and any PR skipped here would never be mined.
const LIMIT = args.since ? Number.POSITIVE_INFINITY : Number(args.limit);
// Long comments are shortened in `comments.md` (and reported) so that it stays readable for clustering. `prs.json`
// keeps the complete text.
const MAX_BODY_LENGTH = 2000;
// GitHub Search never returns more than this many results, however many pages are requested.
const SEARCH_RESULT_CAP = 1000;
const MAX_BUFFER_BYTES = 256 * 1024 * 1024;

const QUERY = `
query($searchQuery: String!, $cursor: String) {
  search(query: $searchQuery, type: ISSUE, first: 20, after: $cursor) {
    issueCount
    pageInfo { hasNextPage endCursor }
    nodes {
      ... on PullRequest {
        number title mergedAt author { login }
        reviews(first: 100) { pageInfo { hasNextPage } nodes { author { type: __typename login } state body } }
        reviewThreads(first: 100) {
          pageInfo { hasNextPage }
          nodes {
            path
            comments(first: 100) { pageInfo { hasNextPage } nodes { author { type: __typename login } body } }
          }
        }
        comments(first: 100) { pageInfo { hasNextPage } nodes { author { type: __typename login } body } }
      }
    }
  }
}`;

// GitHub reports bot accounts (Copilot, Netlify, Dependabot, ...) with the `Bot` type, so no login matching is needed.
const isHuman = (account) => account?.type === 'User';

const clean = (body) =>
  body
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<summary>[\s\S]*?<\/summary>/g, '')
    .replace(/<\/?details\b[^>]*>/g, '')
    .replace(/\r/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim();

const mergedQualifier = args.since ? ` merged:${args.since}..${args.until ?? '*'}` : '';

const fetchPage = (cursor) => {
  const ghArgs = [
    'api',
    'graphql',
    '-f',
    `query=${QUERY}`,
    '-f',
    `searchQuery=repo:${args.repo} is:pr is:merged${mergedQualifier} sort:created-desc`,
  ];

  if (cursor) {
    ghArgs.push('-f', `cursor=${cursor}`);
  }

  return JSON.parse(execFileSync('gh', ghArgs, { maxBuffer: MAX_BUFFER_BYTES })).data.search;
};

const isTruncated = (pr) => {
  const threadComments = pr.reviewThreads.nodes.map((thread) => thread.comments);
  const connections = [pr.reviews, pr.reviewThreads, pr.comments, ...threadComments];

  return connections.some((connection) => connection.pageInfo.hasNextPage);
};

const toFeedback = (pr) => {
  const author = pr.author?.login;
  const byReviewer = (account) => isHuman(account) && account.login !== author;

  const threads = pr.reviewThreads.nodes.flatMap((thread) =>
    thread.comments.nodes
      .filter((comment) => byReviewer(comment.author))
      .map((comment) => ({ where: thread.path, by: comment.author.login, body: clean(comment.body) })));
  const reviews = pr.reviews.nodes
    .filter((review) => byReviewer(review.author) && review.body?.trim())
    .map((review) => ({ where: `review ${review.state}`, by: review.author.login, body: clean(review.body) }));
  const comments = pr.comments.nodes
    .filter((comment) => byReviewer(comment.author) && comment.body?.trim())
    .map((comment) => ({ where: 'conversation', by: comment.author.login, body: clean(comment.body) }));

  return {
    number: pr.number,
    title: pr.title,
    mergedAt: pr.mergedAt,
    author,
    feedback: [...threads, ...reviews, ...comments],
  };
};

const entries = [];
let scanned = 0;
let cursor = null;
let issueCount = 0;

for (;;) {
  const { nodes, pageInfo, issueCount: count } = fetchPage(cursor);

  issueCount = count;

  if (args.since && issueCount > SEARCH_RESULT_CAP) {
    const found = `${issueCount} PRs match this period, but GitHub Search returns at most ${SEARCH_RESULT_CAP}.`;
    const advice = 'Split it into windows with --since and --until, and start each window at the previous --until.';

    process.stderr.write(`Error: ${found} ${advice} A later --since alone would skip the PRs in between.\n`);
    process.exit(1);
  }

  // The search qualifier is inclusive, but `--since` is the previous checkpoint, which was mined already.
  const unmined = nodes.filter((pr) => sinceTime === null || Date.parse(pr.mergedAt) > sinceTime);

  for (const pr of unmined) {
    scanned += 1;
    entries.push({ ...toFeedback(pr), truncated: isTruncated(pr) });
  }
  process.stderr.write(`scanned ${scanned}\n`);

  if (!pageInfo.hasNextPage) {
    break;
  }
  cursor = pageInfo.endCursor;
}

const byMergedAtDesc = (first, second) => second.mergedAt.localeCompare(first.mergedAt);
const prs = entries
  .filter((entry) => entry.feedback.length > 0)
  .sort(byMergedAtDesc)
  .slice(0, LIMIT);

// Truncation is checked for every PR in the mined merge window, including PRs whose fetched entries hold no human
// feedback: later pages may still contain some. A `--since` run mines all scanned PRs, so its window is all of them. A
// baseline run mines the PRs from the oldest kept one onwards, or all of them when none has feedback.
const windowStart = args.since ? null : prs.at(-1)?.mergedAt ?? null;
const truncated = entries
  .filter((entry) => entry.truncated && (!windowStart || entry.mergedAt >= windowStart))
  .sort(byMergedAtDesc)
  .map((entry) => entry.number);

const shorten = (body) => body.slice(0, MAX_BODY_LENGTH);
const lines = prs.flatMap((pr) => [
  `\n### #${pr.number} ${pr.title} (by ${pr.author}, ${pr.mergedAt.slice(0, 10)})`,
  ...pr.feedback.map((item) => `- [${item.where}] ${item.by}: ${shorten(item.body)}`),
]);
const shortened = prs.flatMap((pr) => pr.feedback).filter((item) => item.body.length > MAX_BODY_LENGTH).length;

mkdirSync(args.out, { recursive: true });
writeFileSync(join(args.out, 'prs.json'), JSON.stringify(prs, null, 2));
writeFileSync(join(args.out, 'comments.md'), lines.join('\n'));

const total = prs.reduce((sum, pr) => sum + pr.feedback.length, 0);
const latestMergedAt = prs.map((pr) => pr.mergedAt).sort().at(-1);

process.stderr.write(`${prs.length} PRs with ${total} human comments (of ${scanned} scanned) → ${args.out}\n`);

if (!args.since && issueCount > SEARCH_RESULT_CAP) {
  const matched = `${issueCount} PRs match but GitHub Search returns at most ${SEARCH_RESULT_CAP}`;

  process.stderr.write(`Warning: ${matched}, so the oldest PRs were not scanned\n`);
}

if (latestMergedAt) {
  process.stderr.write(`Latest mergedAt: ${latestMergedAt} (record it as "Latest merged" in REVIEW.md)\n`);
}

if (args.until) {
  process.stderr.write(`Window ends at ${args.until}: use it as --since of the next window\n`);
}

if (shortened > 0) {
  const count = `${shortened} comments were shortened to ${MAX_BODY_LENGTH} characters in comments.md`;

  process.stderr.write(`Warning: ${count} (prs.json keeps them complete)\n`);
}

if (truncated.length > 0) {
  const list = truncated.map((number) => `#${number}`).join(', ');

  process.stderr.write(`Warning: feedback beyond 100 entries per list was not fetched for ${list}\n`);
}
