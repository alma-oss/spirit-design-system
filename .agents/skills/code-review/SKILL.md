---
name: spirit:code-review
description: >-
  Review a Spirit Design System change (a GitHub PR, the current branch, staged changes, or a diff file) against
  the checklist derived from the team's past PR reviews, and report findings with severities in the team's comment
  style. Stays quiet on what linters and CI enforce. Runs without user interaction, so it works locally and in CI.
  Use when asked to review a PR, review my branch or changes, or do a first-pass code review.
category: spirit
displayName: Spirit Code Review
---

# Spirit Code Review

A first-pass review that reflects how Spirit maintainers actually review. This file is the
**process**. Load these references from `.agents/skills/code-review/references/` before reviewing:

- `methodology.md` — what not to report, severity, finding fields, output structure, verdicts.
- `checklist.md` — what to look for (general checks and Spirit areas), with default severities, and the
  themes that tooling already enforces.
- `review-output-templates.md` — how findings and the report are rendered for the CLI and for CI.

Also read the repository's root `REVIEW.md`, the log of feedback that human reviewers raise repeatedly.
Treat it as extra review focus: it can raise the priority of an area, but it never silences a real
defect. When the file is missing, add a warning and continue.

## Operating Rules

These rules make the skill safe to run unattended (for example from a GitHub Action):

1. **Never ask the user anything.** Resolve every choice from the arguments, the repository state,
   or the defaults below. When something is ambiguous, pick the documented default and record it
   under **Warnings** in the output.
2. **Read-only.** Do not edit, stage, commit, or push. The only side effects allowed are writing the
   `--output` file, posting with `--post`, and updating the local `origin/pr-<pr>` ref in PR mode.
3. **Warn, don't drop.** When an input, service, or checklist area cannot be used (no `gh` auth, Jira
   unavailable, diff too large), continue with what is available and list what was skipped.
4. **Portable commands only.** Use `git`, `gh`, and `node`. Search with `git grep`; do not assume
   `rg`, `jq`, or Python are installed. Filter `gh` output with its built-in `--jq` flag.

## Invocation

```text
/spirit:code-review [<pr> | --local | --staged | --diff <file>] [--base <ref>] [--cli | --ci] [--post] [--conventional-comments] [--output <file>]
```

| Argument                  | Effect                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------- |
| `<pr>`                    | PR mode. Accepts `123`, `#123`, or a full PR URL                                       |
| `--local`                 | Current branch vs its merge base with `--base`                                         |
| `--staged`                | Staged changes only                                                                    |
| `--diff <file>`           | Review a unified diff from a file (CI or other remote environments)                    |
| `--base <ref>`            | Base for `--local`. Default: `origin/main`, falling back to `main`                     |
| `--cli`, `--ci`           | Force the review context. Default: detected, see below                                 |
| `--post`                  | PR mode only. Post the review to the PR as a `COMMENT` review. Default: print only     |
| `--conventional-comments` | Overlay Conventional Comments labels (`.agents/skills/conventional-comments/SKILL.md`) |
| `--output <file>`         | Also write the report as Markdown to this file                                         |

**Review context.** The context decides how findings are rendered (see `review-output-templates.md`),
not what is found:

- **CLI** — a developer runs the review locally. This is the default.
- **CI** — the review runs unattended. Detected when the `CI` or `GITHUB_ACTIONS` environment variable
  is `true`, or when `--post` is set. Findings are attached to code lines and carry no `File:` line.

`--cli` or `--ci` overrides the detection. `--post` with `--cli` stops with an error, because posted
comments always use the CI rendering.

**Auto-detect** when no mode is given, first match wins:

1. The current branch has an open PR (`gh pr view --json number,state --jq 'select(.state == "OPEN") | .number'`
   prints a number) → PR mode. A merged or closed PR for the branch does not count; fall through.
2. The branch has commits ahead of the base → `--local`.
3. There are staged changes → `--staged`.
4. There are unstaged changes → review `git diff`.
5. Nothing to review → print "Nothing to review" with the detected state and stop.

## Step 1 — Collect the Change

```bash
# PR mode
gh pr view <pr> --json number,title,body,baseRefName,headRefOid,files,commits,url
gh pr diff <pr>
gh api repos/{owner}/{repo}/pulls/<pr>/comments --paginate    # inline review comments
gh api repos/{owner}/{repo}/issues/<pr>/comments --paginate   # conversation comments
gh api graphql -F owner={owner} -F repo={repo} -F pr=<pr> -f query='
  query($owner: String!, $repo: String!, $pr: Int!) {
    repository(owner: $owner, name: $repo) {
      pullRequest(number: $pr) { reviewThreads(first: 100) { nodes { isResolved path line } } }
    }
  }' --jq '[.data.repository.pullRequest.reviewThreads.nodes[] | select(.isResolved | not)] | length'
git fetch origin +pull/<pr>/head:refs/remotes/origin/pr-<pr>   # PR head for git grep and file reads

# Local branch mode
git merge-base <base> HEAD
git diff <merge-base>...HEAD
git log --format='%h %s%n%b' <merge-base>..HEAD

# Staged / unstaged
git diff --staged
git diff
```

If `gh` fails in PR mode (for example `HTTP 401: Bad credentials`) and a GitHub MCP server is
available, use it instead; the GitHub section of
`.agents/skills/accept-jira-issue/references/verification-recipes.md` maps each operation to both.
Without either, fall back to `--local` against the PR's base branch when the PR branch is checked out;
otherwise stop with an error explaining that `gh auth` is required. For more `gh` patterns (review
threads, replies), see `.agents/skills/address-review-comments/references/github-integration-patterns.md`.

**Validate before reviewing.** Check the inputs here, so a bad ref fails with a clear message
instead of producing an empty or misleading review:

- Resolve the base with `git rev-parse --verify --quiet '<base>^{commit}'`. When the default
  `origin/main` does not resolve, try `main` and add a warning. When an explicit `--base`, or both
  defaults, do not resolve, stop with an error naming the ref.
- In PR mode, stop with an error when `gh pr view` reports that the PR does not exist. When the PR is
  merged or closed, review it anyway, add a warning, and refuse `--post`.
- With `--diff <file>`, stop with an error when the file is missing or does not contain a unified
  diff.
- When the collected diff is empty, print "Nothing to review" with the mode and the compared refs,
  and stop.

## Step 2 — Build the Review Brief

Assemble the brief before reviewing so every judgment uses the same intent:

```text
Review Brief
- Mode: <PR #123 | local vs origin/main | staged | diff file>
- Intent: <PR title and description, or commit subjects>
- Jira: <DS-1234 — <n> criteria: <n> met, <n> partial, <n> missing | none found | unavailable>
- Changed files: <count>, grouped by checklist area
- Areas to apply: <checklist sections>
- Prior comments: <count of unresolved threads> (PR mode)
```

**Jira.** Look for an issue key (`DS-1234`) in the PR body, branch name, and commit messages. When
Jira is reachable, fetch the issue and check the change against each acceptance criterion. Reuse
Step 0 (Jira access, MCP or REST fallback) and Step 1 (extracting and numbering the criteria) of
`.agents/skills/accept-jira-issue/SKILL.md`, and the Jira section of its
`references/verification-recipes.md`; do not re-implement them. Unlike that skill, this review only
reads the issue and never writes to Jira. Quote the criterion in every finding this produces:

| The change…                                                                   | Severity                                      | Location                 |
| ----------------------------------------------------------------------------- | --------------------------------------------- | ------------------------ |
| has no visible implementation of the criterion                                | `question` (it may be planned for a later PR) | `File: DS-1234`          |
| covers the criterion only partly (one package, some variants, one state)      | `important`                                   | the closest changed file |
| looks like it implements the criterion, but the code does something different | `important` (`blocking` if it breaks users)   | the code that diverges   |
| contains work no criterion or PR description explains                         | "PR scope" (checklist section 12)             | the unrelated files      |

The PR title and description make promises too. Check the diverging case against them even when no
Jira issue is found ("return 404 for missing pages" that still responds with 200 is a finding).
When Jira is unavailable, check only the PR title and description, and add a warning.

**CI checks.** In PR mode, list the PR's failing checks (`gh pr checks <pr>`). Do not file findings
that a failing check already reports (lint, types, e2e); mention the failing checks under Warnings
instead. When the checks cannot be read, add a warning.

The brief is printed at the top of the CLI report and omitted from posted reviews.

## Step 3 — Area Selection

Map each changed path to checklist sections. Apply the General Checks, section 11 (comments, naming,
leftovers), and section 12 (commits and PR scope) to every review.

| Changed paths                                                  | Checklist sections   | Also load                                                            |
| -------------------------------------------------------------- | -------------------- | -------------------------------------------------------------------- |
| `packages/web-react/src/**/*.{ts,tsx}`                         | 1, 3, 4, 6, 7        | —                                                                    |
| `packages/web/src/**/*.{scss,ts,js,mjs,html}`                  | 1, 4, 5, 6, 7        | —                                                                    |
| `packages/web-react/src/translations/**`                       | 3 (translations), 11 | —                                                                    |
| `**/*.scss` anywhere                                           | 5                    | —                                                                    |
| `**/demo/**`, `**/preview.html`, `**/stories/**`, `*.figma.ts` | 1, 4, 8              | —                                                                    |
| `**/README.md`, `docs/**`                                      | 9                    | —                                                                    |
| `docs/migrations/**`, `packages/codemods/**`, any `!` commit   | 2                    | `.agents/skills/breaking-change-checklist/SKILL.md`                  |
| `tests/e2e/**`                                                 | 7                    | —                                                                    |
| `apps/docsite/**`                                              | 10 (+ 5 for SCSS)    | `docsite-composition` and `docsite-styles` skills                    |
| `.github/**`                                                   | 13                   | —                                                                    |
| `.agents/**`, `AGENTS.md`                                      | 14                   | —                                                                    |
| `*.tsx`, `*.html`, `*.hbs` with interactive or ARIA changes    | 6                    | `.agents/skills/accessibility/references/accessibility-checklist.md` |
| Removal or rename of a prop, class, token, or component        | 2, 11 (leftovers)    | `component-deprecation` or `stabilize-component` skill as relevant   |

Paths outside this table (for example `packages/design-tokens`, `packages/icons`, `exporters/`)
get sections 4, 11, and 12 only, plus a warning that no specialized checklist applies.

## Step 4 — Review

Review like a maintainer, not like a linter. Start from the stated intent, form specific questions
about what the change could break, and read only the code needed to answer each one. Tests passing or
a description claiming something is a hint, not verification: confirm by reading the code. Before
reporting, answer these with evidence from the code:

- **Intent** — does the diff do what the PR and the Jira issue promise?
- **Simplest solution** — could it be simpler or reuse something that exists?
- **Contracts and consumers** — who else uses the changed API, and what breaks for them?
- **Edge cases** — what input or state makes it fail, and is that tested?
- **Maintainability** — is the logic in the right place, and will it be easy to change?

Then work through the steps:

1. **Read beyond the hunk.** Open each changed file in full where a finding depends on context. In
   PR mode without the branch checked out, read files at the fetched PR head
   (`git show origin/pr-<pr>:<path>`), falling back to
   `gh api repos/{owner}/{repo}/contents/<path>?ref=<headRefOid> -H 'Accept: application/vnd.github.raw'`.
2. **Check the pair.** For every component touched in one of `packages/web` / `packages/web-react`,
   open its counterpart README, demo, and implementation, and apply checklist section 1. When a
   prop, class, or translation key is removed, the counterparts also include
   `packages/web-react/DEPRECATIONS.md` and the transforms in `packages/codemods/src/transforms/`.
3. **Search for leftovers.** For every removed or renamed identifier, search the snapshot under
   review and report remaining references:

   | Mode            | Command                                               |
   | --------------- | ----------------------------------------------------- |
   | PR              | `git grep -n -F -e '<old name>' origin/pr-<pr>`       |
   | `--local`       | `git grep -n -F -e '<old name>' HEAD`                 |
   | `--staged`      | `git grep --cached -n -F -e '<old name>'`             |
   | unstaged        | `git grep -n -F -e '<old name>'` (the working tree)   |
   | `--diff <file>` | `git grep -n -F -e '<old name>' HEAD`, with a warning |

   Never search `main` for a PR, because later commits may have fixed or introduced the reference.
   In `--diff` mode the checkout may not match the diff, so say so in the warning.

4. **Apply the checklist**: the General Checks always, plus the Spirit sections for the selected areas. For each candidate finding, apply the
   false-positive rules and the confidence rule from `methodology.md` before keeping it.
5. **Inspect snapshots.** List changed PNGs under `tests/e2e/` and check each is explained by the
   diff. Do not attempt pixel comparison; report a `question` when a change is unexplained.
6. **Verify claimed behavior** (PR mode). When the PR title, description, or Jira issue promises
   runtime behavior the code alone cannot prove (an HTTP status, a redirect, what renders for a
   given URL), or the author says they did not verify something, check it on the Netlify deploy
   preview. Find the preview, check that it is fresh (its "Latest commit" equals the PR head), and
   build page URLs as described in Step 3 of `.agents/skills/accept-jira-issue/SKILL.md` and the
   "Netlify Deploy Previews" section of its `references/verification-recipes.md`. Observe only what
   the claim needs: an HTTP status or redirect with `node` and `fetch(url, { redirect: 'manual' })`, computed styles with its `scripts/verify.mjs`
   when a browser is available. Quote the URL and the observed result in the finding. Compare
   against an unchanged page on the same preview before calling a result a regression. When there is
   no preview, it is stale or still building, or the network is unavailable, add a warning instead.

Large diffs: when the diff exceeds roughly 3,000 changed lines (not counting snapshot PNGs,
`yarn.lock`, `CHANGELOG.md`, and generated token or icon output), review source files first
(`src/**`), then docs and demos, and list skipped files under Warnings rather than skimming
everything.

## Step 5 — Synthesize

1. **Deduplicate** by file, line, and concern; collapse repeated occurrences into one finding with
   the other locations listed.
2. **Cross-reference** existing PR comments (PR mode) into Tier 1 and Tier 2, per `methodology.md`.
3. **Assign the verdict** from the remaining findings.

## Step 6 — Report

Print the report in the CLI format from `review-output-templates.md`: a header, the Review Brief,
findings grouped by file or area (blocking first), "Commits and PR Scope" and "Already Reported" groups
when non-empty, an optional praise block, the severity table with every row (including zero counts),
the verdict with its icon, and warnings. When there are no findings, say so in one line, give the
verdict, and still print warnings.

In the CI context, print the same report as the posted review would read, but skip the posting.

With `--output <file>`, write the same Markdown to the file.

## Step 7 — Post (`--post`, PR Mode Only)

Post exactly one review. Never approve or request changes automatically; the verdict is stated in
the review body and a human decides.

1. Render each finding in the CI format from `review-output-templates.md`: suggestion fence first, then
   the subject line, then the collapsed `<details>` block with `Fix:` and `Why:`.
2. Findings on lines inside the PR diff become inline comments (`side: "RIGHT"`, `line`, and
   `start_line` for ranges) without a `File:` line, because the comment is anchored to the code. All
   other findings (they keep their location), Tier 2 items, praise, the summary table, and the
   verdict go into the review body.
3. Write the payload to a temporary file and submit it:

```bash
gh api repos/{owner}/{repo}/pulls/<pr>/reviews --method POST --input <payload.json>
```

```json
{
  "commit_id": "<headRefOid>",
  "event": "COMMENT",
  "body": "<summary, out-of-diff findings, verdict>",
  "comments": [{ "path": "<file>", "line": 42, "side": "RIGHT", "body": "<finding>" }]
}
```

If posting fails (permissions, a line no longer in the diff), retry once with all findings moved
into the body; if that fails too, print the report and the error.

## Related Skills

- `spirit:review-feedback` — the feedback loop that keeps `REVIEW.md` and the checklist current.
- `spirit:accept-jira-issue` — Jira access, criteria extraction, and deploy preview verification are
  reused from it.
- `spirit:conventional-comments` — the optional label overlay.
- `spirit:address-review-comments` — the author side: responding to this review.
- `spirit:accessibility`, `spirit:breaking-change-checklist`, `spirit:component-deprecation`,
  `spirit:stabilize-component`, `spirit:docsite-composition`, `spirit:docsite-styles` — deeper
  checklists loaded for matching areas.
