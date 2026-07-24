# Implementation Plan — Spirit Code Review

> Status: in progress. Reworking the agentic code-review setup introduced in PR #2581
> ([alma-oss/spirit-design-system#2581](https://github.com/alma-oss/spirit-design-system/pull/2581))
> in place on branch `chore/reviewer-skill`. The 24 review threads on that PR are the de-facto spec
> and are kept open.

## 0. Guiding Constraints

- **Orchestrator runs inline (non-forked).** No `context: fork` on the entry point — a forked
  subagent cannot spawn workers (true in both Claude Code and Cursor). The old `/review` command was
  retired precisely because it violated this.
- **Workers and the orchestrator load knowledge by `cat`** — portable across Claude Code and Cursor.
- **Output format = the fine-tuned `.github/copilot-instructions.md` format** for PR comments.
- **Conventional Comments off by default**, opt-in via `--conventional-comments`.
- Knowledge skills are **standalone-runnable** and **`spirit:`-namespaced**.
- **No SQL/backend material** — the design system has no use for it.

## 1. Artifact Taxonomy

```text
command:  code-review  →  invokes the spirit:code-review skill (orchestrator, inline)

orchestrator skill:  spirit:code-review
  references/ (loaded by cat):
    methodology.md            shared review philosophy + finding format (was the review-core skill)
    consistency-checklist.md  web↔web-react parity — applied by the orchestrator across the whole PR

perspective reviewers (.agents/agents/, read-only, spawned + standalone-runnable):
    frontend-reviewer       web + web-react (correctness, types, tokens, markup, styles, performance)
    accessibility-reviewer  a11y across tsx + html + scss

knowledge skills (.agents/skills/, cat-loadable, standalone-runnable):
    design-system   react   typescript   scss   html   accessibility   conventional-comments   performance-optimization
```

Methodology and consistency are **reference files**; performance is the `spirit:performance-optimization` skill. The
cross-implementation consistency check is owned by the orchestrator (it sees the whole PR); the
performance checklist is applied by the frontend reviewer.

## 2. Orchestrator Flow

```text
/spirit:code-review  [#PR | --local] [--post] [--conventional-comments] [--only frontend|accessibility]

Phase 0 — Context → Review Brief
  - git diff --name-only + stack detection (frontend / accessibility)
  - PR description, commits, Jira acceptance criteria, existing PR comments
Phase 1 — Fan out frontend-reviewer and/or accessibility-reviewer (parallel; --only runs one)
Phase 2 — Consistency check (orchestrator-owned) → merge → dedup by (file:line + concern)
  → cross-reference existing comments → format → verdict → optional --post
```

## 3. Knowledge Sources

| Artifact                          | Composed from                                                                                  |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| `design-system`                   | ADRs 008/009/011, `figma-to-spirit/components/*`, `copilot-instructions.md`, skills.sh (later) |
| `react` / `typescript`            | React + type-design review knowledge                                                           |
| `scss` / `html`                   | tokens, mixin reuse + tests, separation of concerns, BEM/SUIT, semantic markup                 |
| `accessibility`                   | `docs/contribution/accessibility-testing.md`, a11y test infra, WCAG 2.1 AA                     |
| `methodology.md`                  | review philosophy + `copilot-instructions.md` output format                                    |
| `spirit:performance-optimization` | frontend performance — bundle, render, and style cost                                          |

## 4. Existing-Files Disposition

- **Retired**: `commands/review.md`, monolithic `agents/code-reviewer.md`, the `review-core` skill,
  and the separate `web-reviewer` / `web-react-reviewer` / `consistency-reviewer` agents.
- **Reworked**: methodology → `references/methodology.md`; web + web-react reviewers merged into
  `frontend-reviewer`; consistency and performance became reference checklists.

## 5. Remaining Steps

1. Validate the full run against PR #2575 (the deprecation-removal case the old version flubbed).
2. Cursor adapter — a custom command + `.cursor/agents/` over the same knowledge and references.
3. skills.sh enrichment of `design-system` and the technology skills.

## 6. Open Items to Confirm During Build

- Jira acceptance-criteria field for the Review Brief (epic link is `customfield_12151`).
- Exact symlink targets the local setup uses (so the adapter registers in `.claude/`).
