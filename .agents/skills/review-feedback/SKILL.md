---
name: spirit:review-feedback
description: >-
  Collect recurring human PR review feedback, update the root REVIEW.md feedback log, and promote stable
  themes into the spirit:code-review checklist. Use when refreshing the code review checklist, after a
  batch of merged PRs, or when asked to mine review history or update REVIEW.md.
category: spirit
displayName: Spirit Review Feedback Loop
---

# Spirit Review Feedback Loop

Keeps `spirit:code-review` aligned with how maintainers actually review. Feedback flows in two steps:

1. **Gather** — frequent. Mine merged PRs and record new or changed themes in the root `REVIEW.md`.
2. **Promote** — rare (every month or two). Move stable themes from `REVIEW.md` into
   `.agents/skills/code-review/references/checklist.md`.

Load `references/mining-method.md` before gathering; it defines the collection, clustering, and
filtering steps so counts stay comparable between runs.

## Operating Rules

1. **Never ask the user anything.** Use the defaults below and record deviations in the summary.
2. **Edit only** `REVIEW.md` and `.agents/skills/code-review/references/checklist.md`. Do not touch
   the other review skill files.
3. **Portable commands only.** Use `git`, `gh`, and `node`.
4. **Humans only.** Never count comments from bots or from the PR author.

## Step 1 — Gather

```bash
node .agents/skills/review-feedback/scripts/mine-review-history.mjs --limit 200 --out /tmp/review-history
```

When `gh` is not authenticated, stop with an error explaining that `gh auth` is required.

For a periodic run, mine only PRs merged after the "Latest merged" value in `REVIEW.md`:

```bash
node .agents/skills/review-feedback/scripts/mine-review-history.mjs --since <Latest merged> --out /tmp/review-history
```

The script prints the new latest `mergedAt`; record it in Step 4.

## Step 2 — Cluster

1. Read `/tmp/review-history/comments.md` in full, in chronological slices.
2. Phrase each recurring concern as a rule a reviewer can check on a diff.
3. Count the distinct PRs where each theme appeared, and keep up to three PR numbers as evidence.
4. Match each theme to an existing row of the `REVIEW.md` table. Add the counts to the existing row, or
   add a new row when no row fits.

## Step 3 — Filter

Check every new or growing theme against `.github/workflows/` and the lint configs. When tooling
already enforces it, do not add it to `REVIEW.md`; record it under "Already Enforced by Tooling" in
`checklist.md` instead. Also move a theme there when a new lint rule or CI check now covers it.

## Step 4 — Update `REVIEW.md`

Update the table, the "Collected" date, the "Latest merged" timestamp, the PR range, and the comment count. Keep the rows ordered as
they are (they follow the original analysis); do not renumber the checklist column.

## Step 5 — Promote (Periodic)

Run this step only when asked to refresh the checklist, or when a theme in `REVIEW.md` has no checklist
section and appears in 10 or more PRs.

1. Add the theme to the matching checklist section with a default severity, or create the section.
2. Set the theme's `Checklist` column in `REVIEW.md` to that section number.
3. Remove checklist items whose theme tooling now enforces.

## Step 6 — Report

Print what changed: new themes, themes whose counts grew, themes promoted, themes moved to
"Already Enforced", and warnings (truncated PRs, skipped inputs).

## Related Skills

- `spirit:code-review` — consumes `REVIEW.md` and the checklist.
- `spirit:address-review-comments` — the author side of a review.
