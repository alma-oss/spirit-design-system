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

- `methodology.md` — what not to report, severity, finding format, output structure, verdicts.
- `checklist.md` — what to look for, by area, with default severities.
- `review-history-analysis.md` — the evidence behind the checklist and the list of themes that
  tooling already enforces. Read it when unsure whether something is worth reporting.

## Operating Rules

These rules make the skill safe to run unattended (for example from a GitHub Action):

1. **Never ask the user anything.** Resolve every choice from the arguments, the repository state,
   or the defaults below. When something is ambiguous, pick the documented default and record it
   under **Warnings** in the output.
2. **Read-only.** Do not edit, stage, commit, or push. The only side effects allowed are writing the
   `--output` file and posting with `--post`.
3. **Warn, don't drop.** When an input, service, or checklist area cannot be used (no `gh` auth, Jira
   unavailable, diff too large), continue with what is available and list what was skipped.
4. **Portable commands only.** Use `git`, `gh`, and `node`. Search with `git grep`; do not assume
   `rg`, `jq`, or Python are installed. Filter `gh` output with its built-in `--jq` flag.

## Invocation

```text
/spirit:code-review [<pr> | --local | --staged | --diff <file>] [--base <ref>] [--post] [--conventional-comments] [--output <file>]
```

| Argument                  | Effect                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------- |
| `<pr>`                    | PR mode. Accepts `123`, `#123`, or a full PR URL                                       |
| `--local`                 | Current branch vs its merge base with `--base`                                         |
| `--staged`                | Staged changes only                                                                    |
| `--diff <file>`           | Review a unified diff from a file (CI or other remote environments)                    |
| `--base <ref>`            | Base for `--local`. Default: `origin/main`, falling back to `main`                     |
| `--post`                  | PR mode only. Post the review to the PR as a `COMMENT` review. Default: print only     |
| `--conventional-comments` | Overlay Conventional Comments labels (`.agents/skills/conventional-comments/SKILL.md`) |
| `--output <file>`         | Also write the report as Markdown to this file                                         |

**Auto-detect** when no mode is given, first match wins:

1. The current branch has an open PR (`gh pr view --json number,state` succeeds and `state` is
   `OPEN`) → PR mode.
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
git fetch origin pull/<pr>/head:refs/remotes/origin/pr-<pr>   # PR head for git grep and file reads

# Local branch mode
git merge-base <base> HEAD
git diff <merge-base>...HEAD
git log --format='%h %s%n%b' <merge-base>..HEAD

# Staged / unstaged
git diff --staged
git diff
```

If `gh` is not authenticated in PR mode, fall back to `--local` against the PR's base branch when
the PR branch is checked out; otherwise stop with an error explaining that `gh auth` is required.

**Validate before reviewing.** Check the inputs here, so a bad ref fails with a clear message
instead of producing an empty or misleading review:

- Resolve the base with `git rev-parse --verify --quiet '<base>^{commit}'`. When the default
  `origin/main` does not resolve, try `main` and add a warning. When an explicit `--base`, or both
  defaults, do not resolve, stop with an error naming the ref.
- In PR mode, stop with an error when `gh pr view` reports that the PR does not exist.
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
the Jira MCP server is available, fetch the issue and check the change against each acceptance
criterion. Quote the criterion in every finding this produces:

| The change…                                                                   | Severity                                      | Location                 |
| ----------------------------------------------------------------------------- | --------------------------------------------- | ------------------------ |
| has no visible implementation of the criterion                                | `question` (it may be planned for a later PR) | `File: DS-1234`          |
| covers the criterion only partly (one package, some variants, one state)      | `important`                                   | the closest changed file |
| looks like it implements the criterion, but the code does something different | `important` (`blocking` if it breaks users)   | the code that diverges   |
| contains work no criterion or PR description explains                         | "PR scope" (checklist section 12)             | the unrelated files      |

The PR title and description make promises too. Check the diverging case against them even when no
Jira issue is found ("return 404 for missing pages" that still responds with 200 is a finding).
When Jira is unavailable, check only the PR title and description, and add a warning.

The brief is printed at the top of the CLI report and omitted from posted reviews.

## Step 3 — Area Selection

Map each changed path to checklist sections. Apply section 11 (comments, naming, leftovers) and
section 12 (commits and PR scope) to every review.

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

4. **Apply the checklist** for the selected areas. For each candidate finding, apply the
   false-positive rules and the confidence rule from `methodology.md` before keeping it.
5. **Inspect snapshots.** List changed PNGs under `tests/e2e/` and check each is explained by the
   diff. Do not attempt pixel comparison; report a `question` when a change is unexplained.
6. **Verify claimed behavior** (PR mode). When the PR title, description, or Jira issue promises
   runtime behavior the code alone cannot prove (an HTTP status, a redirect, what renders for a
   given URL), or the author says they did not verify something, check it on the Netlify deploy
   preview. The Netlify bot comment links it; the hosts are
   `deploy-preview-<pr>--spirit-design-system{,-docsite,-storybook}.netlify.app` for the demo,
   docsite, and Storybook. Fetch read-only with `node`, for example
   `node -e "fetch(process.argv[1], { redirect: 'manual' }).then((r) => console.log(r.status))" <url>`,
   and quote the URL and the result in the finding. Compare against an unchanged page on the same
   preview before calling a result a regression. When there is no preview, it is still building,
   or the network is unavailable, add a warning instead.

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

Print the report in the CLI format from `methodology.md`:

```text
## Spirit Code Review 🤖 — <mode>

<Review Brief>

### <file or area>
<findings…>

### Commits and PR Scope        (only when non-empty)
<findings with `File: commit <short sha>`…>

### Already Reported            (PR mode, only when non-empty)
<tier 2 findings…>

praise: <single paragraph, optional>

| Severity  | Count |
| --------- | ----- |
| blocking  | 0     |
| important | 2     |
| minor     | 3     |
| question  | 1     |
| note      | 0     |

**Verdict:** COMMENT

**Warnings:**
- Jira unavailable; acceptance criteria not checked.
```

Always print every severity row, including zero counts. The CLI report uses `path:line`
locations; GitHub permalinks are only used in posted reviews. When there are no findings, say so in
one line, give the verdict, and still print warnings.

With `--output <file>`, write the same Markdown to the file.

## Step 7 — Post (`--post`, PR Mode Only)

Post exactly one review. Never approve or request changes automatically; the verdict is stated in
the review body and a human decides.

1. Render each finding in the GitHub format from `methodology.md` (suggestion fence first).
2. Findings on lines inside the PR diff become inline comments (`side: "RIGHT"`, `line`, and
   `start_line` for ranges). All other findings, Tier 2 items, praise, the summary table, and the
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

- `spirit:conventional-comments` — the optional label overlay.
- `spirit:address-review-comments` — the author side: responding to this review.
- `spirit:accessibility`, `spirit:breaking-change-checklist`, `spirit:component-deprecation`,
  `spirit:stabilize-component`, `spirit:docsite-composition`, `spirit:docsite-styles` — deeper
  checklists loaded for matching areas.
