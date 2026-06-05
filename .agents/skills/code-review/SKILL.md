---
name: spirit:code-review
description: >-
  Orchestrates a multi-perspective code review of the Spirit Design System. Gathers context (diff,
  Jira issue, existing PR comments) into a Review Brief, fans out to perspective reviewer subagents
  (frontend and accessibility), runs the cross-implementation consistency check itself, then merges,
  deduplicates, and reports findings. Use when reviewing a PR, a local branch, or staged changes.
---

# Code Review Orchestrator

Runs a multi-perspective review of Spirit changes. This skill is the **process**. The shared
methodology and output format live in `references/methodology.md`; the per-technology knowledge lives
in the knowledge skills (`spirit:design-system`, `spirit:react`, `spirit:typescript`, `spirit:scss`,
`spirit:html`, `spirit:accessibility`).

> **CRITICAL — must run inline (non-forked).** This orchestrator spawns perspective reviewers as
> subagents. A forked subagent cannot spawn further subagents, so this skill and its command must NOT
> use `context: fork`. If you cannot use the Agent tool, you were invoked in a forked context — stop
> and report that the orchestrator must be run inline.

## Reference Files

Loaded from `.agents/skills/code-review/references/` (project-root relative):

- `methodology.md` — review philosophy, false-positive rules, severity, finding format, dedup, verdicts.
- `consistency-checklist.md` — web↔web-react parity, applied by the orchestrator across the whole PR.

## Invocation

```text
/spirit:code-review  [#<PR> | --local] [--post] [--conventional-comments] [--only <perspective>]
```

| Argument                  | Effect                                                                                       |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| `#<number>`               | PR review mode — diff and context from the PR                                                |
| `--local`                 | Local branch review vs `main`                                                                |
| (none)                    | Auto-detect: PR arg → branch ahead of main → staged → unstaged                               |
| `--post`                  | Publish the review to the PR (PR mode only). Off by default — print to terminal.             |
| `--conventional-comments` | Overlay Conventional Comments labels (loads `spirit:conventional-comments`). Off by default. |
| `--only <perspective>`    | Run a single perspective: `frontend` or `accessibility`.                                     |

## Phase 0 — Context Gathering

Gather context **before** any review, and emit a structured **Review Brief** that every reviewer
receives (so isolated workers share the same intent).

1. **Diff and stack detection** (deterministic):
   - `git diff --name-only` for the selected mode (see Diff Sources below).
   - Map changed files to perspectives:
     - `*.tsx`, `*.ts`, `*.scss`, `*.css`, `*.html`, vanilla `*.js` → `frontend`
     - `*.tsx`, `*.html`, `*.scss` → also `accessibility`
   - Note whether a component is touched in **both** `packages/web` and `packages/web-react` — that
     triggers the orchestrator's consistency check in Phase 2.
2. **Intent**: PR title/description, commit messages.
3. **Jira** (if an issue is referenced): fetch the issue and its acceptance criteria via the Jira
   MCP — the oracle for the scope-alignment check. (Epic link field is `customfield_12151`.)
4. **Existing feedback**: fetch existing inline and top-level PR comments and prior reviews (PR mode).

Emit the Brief:

```text
Review Brief
- Intent: <what the PR is trying to do>
- Acceptance criteria: <from Jira, if any>
- In-scope files: <list, grouped by perspective>
- Prior unresolved comments: <summary + links>
- Perspectives to run: <subset, or all applicable>
```

## Phase 1 — Fan Out Perspective Reviewers

Spawn one subagent per applicable perspective **in parallel** (issue the Agent calls together).
`--only` runs just that one.

Each reviewer is read-only and **loads its knowledge by `cat`-ing files** (portable across Claude
Code and Cursor). Pass each worker the Review Brief and its file scope; the worker's own definition
lists the files it must read.

| Perspective (subagent)   | File scope                         | Reads                                                                                                                                                               |
| ------------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `frontend-reviewer`      | `web` + `web-react` frontend files | `methodology.md`, `spirit:performance-optimization`, `spirit:design-system`, and `spirit:react`/`spirit:typescript` and/or `spirit:scss`/`spirit:html` by file type |
| `accessibility-reviewer` | tsx + html + scss in scope         | `methodology.md`, `spirit:design-system`, `spirit:accessibility`                                                                                                    |

When `--conventional-comments` is set, tell the workers to also load `spirit:conventional-comments`.

## Phase 2 — Synthesis

1. **Consistency pass (orchestrator-owned).** When the change touches shared components, apply
   `references/consistency-checklist.md` across the whole PR — web↔web-react parity, leftovers after a
   rename/removal, and README/demo sync. This is the orchestrator's own check; it is not delegated to
   a worker (no single per-technology worker can see it).
2. **Collect** findings from all reviewers (note any reviewer that failed — never silently drop a
   perspective; report "perspective X did not complete").
3. **Deduplicate** by `(file:line + concern)` per `methodology.md`. Keep findings that share a line
   but differ in concern.
4. **Cross-reference existing PR comments** (PR mode) → two tiers: new findings, then already-reported.
5. **Format** per `methodology.md` — CLI by default, GitHub PR format with `--post`. Group by
   file/area, single praise block, summary table, verdict.
6. **Post** (`--post`, PR mode only): publish using the GitHub PR format from
   `.github/copilot-instructions.md`. Reuse the patterns in `spirit:address-review-comments`.

## Diff Sources

```bash
# PR mode
gh pr diff <number>
gh pr view <number> --json files,title,body
gh api repos/{owner}/{repo}/pulls/{number}/comments --paginate   # inline comments
gh api repos/{owner}/{repo}/issues/{number}/comments --paginate   # top-level comments

# Local branch mode
git diff main...HEAD && git log --oneline main...HEAD

# Auto-detect fallback
git diff --staged   # then: git diff
```

## Notes

- Linter-detectable issues are out of scope — the repo enforces them (see `methodology.md`).
- Never approve with a blocking finding.
- This is the Claude Code adapter. The Cursor adapter (a custom command + `.cursor/agents/`) reuses
  the same knowledge skills and reference files, and is added later.
