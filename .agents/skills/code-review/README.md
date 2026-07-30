# Code Review Skill

Multi-perspective, agentic code review for the Spirit Design System. An inline orchestrator gathers
context, fans out to perspective reviewers, runs the cross-implementation consistency check itself,
then merges and reports findings.

## How to Run

```text
/spirit:code-review  [#<PR> | --local] [--post] [--conventional-comments] [--only <perspective>]
```

| Mode               | Trigger                               | Diff source                                            |
| ------------------ | ------------------------------------- | ------------------------------------------------------ |
| PR review          | `/spirit:code-review #123`            | `gh pr diff 123`                                       |
| Local branch       | `/spirit:code-review --local`         | `git diff main...HEAD`                                 |
| Auto-detect        | `/spirit:code-review`                 | staged → unstaged → branch diff                        |
| Single perspective | `/spirit:code-review --only frontend` | as above, one reviewer (`frontend` or `accessibility`) |

Flags: `--post` publishes to the PR (off by default), `--conventional-comments` overlays CC labels
(off by default).

## Architecture

```text
command code-review  →  spirit:code-review skill (orchestrator, inline — must NOT fork)
  Phase 0  gather context → Review Brief (diff, stack detection, Jira, existing comments)
  Phase 1  fan out perspective reviewer subagents in parallel
  Phase 2  run consistency check, merge, deduplicate, cross-reference, format, verdict, optional --post

perspective reviewers (.agents/agents/, read-only, spawned + standalone-runnable)
  frontend-reviewer (web + web-react)        accessibility-reviewer

knowledge skills (.agents/skills/, loaded by `cat`, standalone-runnable)
  design-system   conventional-comments   performance-optimization
  react   typescript   scss   html   accessibility

reference files (.agents/skills/code-review/references/, loaded by `cat`)
  methodology.md            shared review philosophy + finding format
  consistency-checklist.md  web↔web-react parity — applied by the orchestrator across the whole PR
```

The orchestrator must run **inline (non-forked)** so it can spawn the reviewer subagents — a forked
context cannot spawn further subagents. Reviewers load their knowledge by `cat`-ing the relevant
files, which keeps everything portable across Claude Code and Cursor.

## Separation of Concerns

- **`references/methodology.md`** — review philosophy, false-positive rules, finding format, dedup,
  verdicts. The shared "how to review and report" contract every reviewer follows.
- **`references/consistency-checklist.md`** — web↔web-react parity, leftovers, README/demo sync.
  Applied by the orchestrator, which sees the whole PR.
- **`spirit:performance-optimization`** — measure-first workflow plus the bundle/render/style
  checklist for frontend code; applied by the `frontend-reviewer`.
- **`spirit:design-system`** — Spirit tokens, theming, conventions; loaded by every reviewer.
- **technology skills** (`react`, `typescript`, `scss`, `html`) and **`accessibility`** — the
  per-lens knowledge. Each is standalone-runnable, so you can apply a single lens directly.
- **`conventional-comments`** — opt-in label overlay, off by default.

## Directory Structure

```text
.agents/
  commands/code-review.md            # inline (non-forked) launcher
  agents/                            # perspective reviewer subagents
    frontend-reviewer.md
    accessibility-reviewer.md
  skills/
    code-review/                     # this orchestrator skill
      SKILL.md  README.md  IMPLEMENTATION-PLAN.md
      references/
        methodology.md
        consistency-checklist.md
    performance-optimization/        # perf workflow + performance-checklist.md
    design-system/                   # always-loaded Spirit base
    react/  typescript/  scss/  html/  accessibility/
    conventional-comments/           # opt-in CC overlay
```

## Status

This is the Claude Code adapter. The Cursor adapter (a custom command + `.cursor/agents/` pointing at
the same knowledge skills and reference files) is planned. See
[IMPLEMENTATION-PLAN.md](./IMPLEMENTATION-PLAN.md) for the full plan and remaining steps.
