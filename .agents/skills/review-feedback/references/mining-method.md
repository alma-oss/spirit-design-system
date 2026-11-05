# Mining Method

How the recurring review feedback in [`REVIEW.md`][review-md] is collected and clustered.
Follow it for every refresh so the counts stay comparable between runs.

## Method

1. **Collect.** `scripts/mine-review-history.mjs` fetches the most recent merged PRs of
   `alma-oss/spirit-design-system` via the GitHub GraphQL API and keeps those with feedback from a
   human other than the author: inline review threads, review bodies, and conversation comments.
   Bot accounts (Copilot, GitHub Actions, Netlify, Renovate, Dependabot, and similar) are excluded.
2. **Cluster.** Split the comments into chronological slices of about 50 PRs. Read each slice in full
   and group the comments into themes phrased as rules a reviewer can check on a diff, with per-PR counts.
3. **Merge.** Merge the themes of all slices and sum the counts (slices do not overlap).
4. **Filter.** Cross-check every theme against the CI workflows in `.github/workflows/` and the lint
   configuration. Drop themes that tooling already enforces, and record them in the "Already Enforced
   by Tooling" section of `.agents/skills/code-review/references/checklist.md` so the review stays quiet on them.

## Baseline Dataset

| Property                | Value                                               |
| ----------------------- | --------------------------------------------------- |
| Collected               | 2026-11-04                                          |
| PRs scanned             | 332 most recent merged PRs                          |
| PRs with human feedback | 200 (#2660 to #3058)                                |
| Merge date range        | 2026-05-25 to 2026-11-02                            |
| Human review comments   | 1,830                                               |
| Reviewers               | 6 (comment shares: 32 %, 28 %, 24 %, 9 %, 4 %, 3 %) |

## Running the Script

```bash
# Requires an authenticated GitHub CLI (`gh auth status`)
node .agents/skills/review-feedback/scripts/mine-review-history.mjs --limit 200 --out /tmp/review-history
```

Add `--since <date or ISO timestamp>` to fetch only PRs merged after that moment, for a periodic run
(use the "Latest merged" value from `REVIEW.md`). The script prints the latest `mergedAt` it saw, so the
next run starts exactly where this one ended.

The script writes `prs.json` (raw data) and `comments.md` (one line per human comment, grouped by
PR) into the output directory. It warns about PRs whose feedback exceeded 100 entries per list, since
those were truncated.

## Validating Changes

To validate checklist changes, run `spirit:code-review` on PRs newer than the dataset (after #3058)
and compare its findings with the human review. PRs inside the dataset informed the checklist and are
not a blind test.

[review-md]: https://github.com/alma-oss/spirit-design-system/blob/main/REVIEW.md
