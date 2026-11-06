#!/usr/bin/env node
/**
 * Collects human review feedback from recently merged PRs, used to refresh
 * `REVIEW.md`. See `references/mining-method.md` of the `spirit:review-feedback` skill.
 *
 * Usage: node mine-review-history.mjs [--limit 200] [--since <date or ISO timestamp>] [--out /tmp/review-history]
 *        [--repo alma-oss/spirit-design-system]
 *
 * With `--since`, only PRs merged after that moment are fetched (for example the "Latest merged" value in `REVIEW.md`).
 * All matching PRs are fetched in that case, so `--limit` applies to baseline runs only.
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
  },
});

// `--limit` samples a baseline run only. An incremental `--since` run must exhaust all matching PRs, because the
// printed `Latest mergedAt` becomes the next checkpoint and any PR skipped here would never be mined.
const LIMIT = args.since ? Number.POSITIVE_INFINITY : Number(args.limit);
const MAX_BODY_LENGTH = 600;
const MAX_BUFFER_BYTES = 256 * 1024 * 1024;

const QUERY = `
query($searchQuery: String!, $cursor: String) {
  search(query: $searchQuery, type: ISSUE, first: 20, after: $cursor) {
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
    .trim()
    .slice(0, MAX_BODY_LENGTH);

const fetchPage = (cursor) => {
  const ghArgs = [
    'api',
    'graphql',
    '-f',
    `query=${QUERY}`,
    '-f',
    `searchQuery=repo:${args.repo} is:pr is:merged${args.since ? ` merged:>${args.since}` : ''} sort:created-desc`,
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

const prs = [];
const truncated = [];
let scanned = 0;
let cursor = null;

while (prs.length < LIMIT) {
  const { nodes, pageInfo } = fetchPage(cursor);

  for (const pr of nodes) {
    scanned += 1;
    const entry = toFeedback(pr);

    if (entry.feedback.length > 0 && prs.length < LIMIT) {
      prs.push(entry);

      if (isTruncated(pr)) {
        truncated.push(pr.number);
      }
    }
  }
  process.stderr.write(`scanned ${scanned}, kept ${prs.length}\n`);

  if (!pageInfo.hasNextPage) {
    break;
  }
  cursor = pageInfo.endCursor;
}

const lines = prs.flatMap((pr) => [
  `\n### #${pr.number} ${pr.title} (by ${pr.author}, ${pr.mergedAt.slice(0, 10)})`,
  ...pr.feedback.map((item) => `- [${item.where}] ${item.by}: ${item.body}`),
]);

mkdirSync(args.out, { recursive: true });
writeFileSync(join(args.out, 'prs.json'), JSON.stringify(prs, null, 2));
writeFileSync(join(args.out, 'comments.md'), lines.join('\n'));

const total = prs.reduce((sum, pr) => sum + pr.feedback.length, 0);
const latestMergedAt = prs.map((pr) => pr.mergedAt).sort().at(-1);

process.stderr.write(`${prs.length} PRs with ${total} human comments (of ${scanned} scanned) → ${args.out}\n`);

if (latestMergedAt) {
  process.stderr.write(`Latest mergedAt: ${latestMergedAt} (record it as "Latest merged" in REVIEW.md)\n`);
}

if (truncated.length > 0) {
  const list = truncated.map((number) => `#${number}`).join(', ');

  process.stderr.write(`Warning: feedback beyond 100 entries per list was not fetched for ${list}\n`);
}
