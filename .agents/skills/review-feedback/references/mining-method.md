# Mining Method

How the recurring review feedback in [`REVIEW-FEEDBACK.md`][review-md] is collected and clustered.
Follow it for every refresh so the counts stay comparable between runs.

## Method

1. **Collect.** `scripts/mine-review-history.mjs` fetches the most recent merged PRs of
   `alma-oss/spirit-design-system` via the GitHub GraphQL API and keeps those with feedback from a
   human other than the author: inline review threads, review bodies, and conversation comments.
   Bot accounts (Copilot, GitHub Actions, Netlify, Renovate, Dependabot, and similar) are excluded.
   Record the state of each thread (resolved, outdated, or open) with the comment; count a comment as
   incorporated only when its thread is resolved and not marked as declined.
2. **Cluster.** Split the comments into chronological slices of about 50 PRs. Read each slice in full
   and group the comments into themes phrased as rules a reviewer can check on a diff, with per-PR counts.
3. **Merge.** Merge the themes of all slices and sum the counts (slices do not overlap). A full refresh costs
   over 100,000 tokens of context, so run each slice in its own agent or context and pass only the resulting
   themes back, not the raw comments.
4. **Filter.** Cross-check every theme against the CI workflows in `.github/workflows/` and the lint
   configuration. Drop themes that tooling already enforces, and record them in the "Already Enforced
   by Tooling" section of `.agents/skills/code-review/references/checklist.md` so the review stays quiet on them.

## Avoiding Duplicates

Each run mines only PRs merged after the "Latest merged" checkpoint, so a PR is analysed once. Run the skill only
from an up-to-date `main` and only when no other open PR updates `REVIEW-FEEDBACK.md`; otherwise two runs could
count the same PR twice.

## Baseline Dataset

Record these properties of every run in the "Last Run" line of [`REVIEW-FEEDBACK.md`][review-md], so the counts stay
comparable between runs:

- Collection date and the latest merge date ("Latest merged", the checkpoint for the next `--since` run)
- Number of PRs with human feedback, with the PR number range
- Merge date range
- Number of human review comments and number of distinct reviewers

## Running the Script

```bash
# Requires an authenticated GitHub CLI (`gh auth status`)
node .agents/skills/review-feedback/scripts/mine-review-history.mjs --limit 200 --out /tmp/review-history
```

A baseline run scans every PR the GitHub search returns (at most 1,000), orders them by merge time, and keeps the
newest `--limit` PRs with human feedback.

Add `--since <date or ISO timestamp>` to fetch only PRs merged after that moment, for a periodic run
(use the "Latest merged" value from `REVIEW-FEEDBACK.md`). A `--since` run ignores `--limit` and fetches every matching
PR, so no PR is skipped before the new checkpoint. The script prints the latest `mergedAt` it saw, so the next run
starts exactly where this one ended.

When more than 1,000 PRs match, GitHub Search cannot return them all, so the script stops with an error. A later
`--since` alone would skip the PRs in between. Split the period into windows with `--until` instead, and start each
window at the previous `--until`. Both bounds are exact moments (a date alone means 00:00 UTC), so no PR falls into two windows:

```bash
node .agents/skills/review-feedback/scripts/mine-review-history.mjs --since <Latest merged> --until <date> --out /tmp/review-history-1
node .agents/skills/review-feedback/scripts/mine-review-history.mjs --since <date> --out /tmp/review-history-2
```

The script writes `prs.json` (raw data, complete comments) and `comments.md` (one line per human comment, grouped by
PR) into the output directory. It warns about PRs whose feedback exceeded 100 entries per list, since
those were truncated, and about comments longer than 2,000 characters, which are shortened in `comments.md` only.

## Validating Changes

To validate checklist changes, run `spirit:code-review` on PRs newer than the dataset (after #3058)
and compare its findings with the human review. PRs inside the dataset informed the checklist and are
not a blind test.

[review-md]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/REVIEW-FEEDBACK.md
