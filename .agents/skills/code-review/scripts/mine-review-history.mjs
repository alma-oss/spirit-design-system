#!/usr/bin/env node
/**
 * Collects human review feedback from recently merged PRs, used to refresh
 * `references/review-history-analysis.md`.
 *
 * Usage: node mine-review-history.mjs [--limit 200] [--out /tmp/review-history] [--repo alma-oss/spirit-design-system]
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
  },
});

const LIMIT = Number(args.limit);
const BOT_PATTERN = /bot|copilot|github-actions|netlify|coderabbit|cursor|dependabot|renovate|sonar|codecov|almaoss/i;
const MAX_BODY_LENGTH = 600;
const MAX_BUFFER_BYTES = 256 * 1024 * 1024;

const QUERY = `
query($searchQuery: String!, $cursor: String) {
  search(query: $searchQuery, type: ISSUE, first: 20, after: $cursor) {
    pageInfo { hasNextPage endCursor }
    nodes {
      ... on PullRequest {
        number title mergedAt author { login }
        reviews(first: 100) { pageInfo { hasNextPage } nodes { author { login } state body } }
        reviewThreads(first: 100) {
          pageInfo { hasNextPage }
          nodes { path comments(first: 100) { pageInfo { hasNextPage } nodes { author { login } body } } }
        }
        comments(first: 100) { pageInfo { hasNextPage } nodes { author { login } body } }
      }
    }
  }
}`;

const isHuman = (login) => Boolean(login) && !BOT_PATTERN.test(login);

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
    `searchQuery=repo:${args.repo} is:pr is:merged sort:created-desc`,
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
  const byReviewer = (login) => isHuman(login) && login !== author;

  const threads = pr.reviewThreads.nodes.flatMap((thread) =>
    thread.comments.nodes
      .filter((comment) => byReviewer(comment.author?.login))
      .map((comment) => ({ where: thread.path, by: comment.author.login, body: clean(comment.body) })));
  const reviews = pr.reviews.nodes
    .filter((review) => byReviewer(review.author?.login) && review.body?.trim())
    .map((review) => ({ where: `review ${review.state}`, by: review.author.login, body: clean(review.body) }));
  const comments = pr.comments.nodes
    .filter((comment) => byReviewer(comment.author?.login) && comment.body?.trim())
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
process.stderr.write(`${prs.length} PRs with ${total} human comments (of ${scanned} scanned) → ${args.out}\n`);

if (truncated.length > 0) {
  const list = truncated.map((number) => `#${number}`).join(', ');

  process.stderr.write(`Warning: feedback beyond 100 entries per list was not fetched for ${list}\n`);
}
