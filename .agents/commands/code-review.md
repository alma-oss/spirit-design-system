---
name: code-review
description: Run a multi-perspective Spirit code review (orchestrator + perspective reviewer subagents)
---

# `/code-review` — Spirit Code Review

Run the `spirit:code-review` orchestrator on the current changes.

> **Runs inline (must NOT fork).** This command deliberately does not set `context: fork`: the
> orchestrator spawns perspective reviewer subagents, and a forked context cannot spawn subagents.

Load and follow the `spirit:code-review` skill, passing the arguments below. Detect the mode:

- `#<number>` → GitHub PR review
- `--local` → local branch vs `main`
- no positional argument → auto-detect (staged → unstaged → branch diff)
- `--post` → publish the review to the PR (PR mode only)
- `--conventional-comments` → overlay Conventional Comments labels
- `--only <perspective>` → run a single perspective (`frontend`, `accessibility`)

Arguments: $ARGUMENTS
