---
name: spirit:review-feedback
description: >-
  Collect recurring human PR review feedback, update `REVIEW-FEEDBACK.md`, and promote stable
  themes into the spirit:code-review checklist. Use when refreshing the code review checklist, after a
  batch of merged PRs, or when asked to mine review history or update `REVIEW-FEEDBACK.md`.
category: spirit
displayName: Spirit Review Feedback Loop
---

# Spirit Review Feedback Loop

Keeps `spirit:code-review` aligned with how maintainers actually review. Feedback flows in two steps:

1. **Gather** — frequent. Mine merged PRs and record new or changed themes in `REVIEW-FEEDBACK.md`.
2. **Promote** — rare (after a release). Move stable themes from `REVIEW-FEEDBACK.md` into
   the matching file in `.agents/skills/code-review/references/checklist/`.

Load `references/mining-method.md` before gathering; it defines the collection, clustering, and
filtering steps so counts stay comparable between runs.

## Operating Rules

1. **Never ask the user anything.** Use the defaults below and record deviations in the summary.
2. **Run once, from an up-to-date `main`.** Stop with a warning when the current branch is not `main` or when
   another open PR already updates `REVIEW-FEEDBACK.md` (`gh pr list --state open --json headRefName
--jq '.[] | select(.headRefName | startswith("docs/review-feedback-"))'`).
3. **Edit only** `REVIEW-FEEDBACK.md` (the themes, "Themes Not Promoted", and the "Last Run" line, never the rest),
   the index `.agents/skills/code-review/references/checklist.md`, and the files in
   `.agents/skills/code-review/references/checklist/`. Do not touch
   the other review skill files.
4. **Portable commands only.** Use `git`, `gh`, and `node`.
5. **Humans only.** Never count comments from bots or from the PR author.

## Step 1 — Gather

```bash
node .agents/skills/review-feedback/scripts/mine-review-history.mjs --limit 200 --out /tmp/review-history
```

When `gh` is not authenticated, stop with an error explaining that `gh auth` is required.

For a periodic run, mine only PRs merged after the "Latest merged" value in `REVIEW-FEEDBACK.md`:

```bash
node .agents/skills/review-feedback/scripts/mine-review-history.mjs --since <Latest merged> --out /tmp/review-history
```

The script prints the new latest `mergedAt`; record it in Step 4.

When the script stops because more than 1,000 PRs match, do not retry with a later `--since`, which would skip PRs.
Mine the period in windows of about a month instead, each with its own `--out` directory: pass `--until <date>`,
then use that date as `--since` of the next window (see "Running the Script" in `references/mining-method.md`).
Cluster the output of all windows together in Step 2.

## Step 2 — Cluster

1. Read `/tmp/review-history/comments.md` in full, in chronological slices. When it holds more than about
   50 PRs or 500 comments, give each slice of about 50 PRs to its own agent and pass back only the themes
   (see "Method" in `references/mining-method.md`).
2. Phrase each recurring concern as a rule a reviewer can check on a diff.
3. Count the distinct PRs where each theme appeared, and keep up to three of those PR numbers as examples.
   Never reword a reviewer's concern into a different rule; phrase the rule so it matches the comments.
4. Match each theme to an existing `REVIEW-FEEDBACK.md` theme. Update its count and examples, or add a
   new theme when none fits.

## Step 3 — Filter

Check every new or growing theme against `.github/workflows/` and the lint configs. When tooling
already enforces it, do not add it to `REVIEW-FEEDBACK.md`; record it under "Already Enforced by Tooling" in
`checklist.md` instead. Also move a theme there when a new lint rule or CI check now covers it.

## Step 4 — Update `REVIEW-FEEDBACK.md`

Update the themes, the "Themes Not Promoted" list, and the one-line "Last Run" record (collection date, "Latest merged" timestamp, PR range, comment
and reviewer counts). Keep the "Last Run" line even when you clear themes.

Every theme is one list item: `- **<Theme>** (<N> PRs, <typical severity>; checklist section <number>): <rule>
Examples: #<PR>, #<PR>.` Write theme names in title case. Keep the themes ordered by PR count, highest first; do not
renumber the checklist sections.

## Step 5 — Promote (Periodic)

Run this step only when asked to refresh the checklist, or when a theme in `REVIEW-FEEDBACK.md` has no checklist
section and appears in 10 or more PRs.

1. Add the theme to the matching `checklist/NN-*.md` file with a default severity, or create the section
   and list it in the index `checklist.md`.
2. Set the theme's "checklist section" in `REVIEW-FEEDBACK.md` to that section number.
3. Remove checklist items from the `checklist/NN-*.md` files whose theme tooling now enforces.

## Step 6 — Report

Print what changed (this is also the body of the PR in Step 7): new themes, themes whose counts grew, themes promoted, themes moved to
"Already Enforced", and warnings (truncated PRs, skipped inputs).

## Step 7 — Deliver

Works the same in interactive and non-interactive runs, and never pushes to `main`.

1. Create a branch `docs/review-feedback-<YYYY-MM-DD>` and commit the changed files as `docs(repo): update review feedback in REVIEW-FEEDBACK.md`.
2. Push it and open a PR with `gh pr create`, using the Step 6 report as the body.
3. When there is nothing to change, or `gh` or `git push` fails, skip the PR and print the report with the reason.

## Related Skills

- `spirit:code-review` — consumes `REVIEW-FEEDBACK.md` and the checklist.
- `spirit:address-review-comments` — the author side of a review.
