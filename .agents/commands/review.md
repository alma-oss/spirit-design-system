---
name: review
description: Code review using the code-reviewer agent
context: fork
agent: code-reviewer
---

# /review - Code Review

Review the current code changes. Detect the appropriate mode from the arguments:

- No arguments → auto-detect (staged changes, unstaged changes, or branch diff)
- `#<number>` → GitHub PR review
- `--local` → local branch changes vs main
- `--thorough` → deep multi-pass review using 3 parallel Agent passes (security+bugs, types+simplification, tests+silent-failures), then merge and deduplicate results

Arguments: $ARGUMENTS
