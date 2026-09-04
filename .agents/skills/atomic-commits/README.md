# Atomic Commits

Split a mixed working tree into a clean series of atomic commits, formatted per
[Git Workflow Guidelines][git-workflow].

## Usage

```text
/spirit:atomic-commits
```

Also triggers on plain requests like "commit my changes", "make a commit", or "commit this" — you
don't need to type the slash command.

## What It Does

1. Checks that `git-surgeon` is installed, offering to install it if not
2. Surveys unstaged and staged changes (`git status`, `git diff`; `git-surgeon hunks` when
   available)
3. Groups hunks into logical, self-contained units — feature vs. tests vs. docs vs. unrelated
   fixes
4. Confirms the Jira issue ID if none was already given
5. Drafts one Conventional Commit message per group, following the repo's
   `type(scope): description #DS-XXXX` format
6. Shows the full grouping and messages for review via `AskUserQuestion`, including whether each
   group is a new commit or a `--fixup` of an existing one
7. Stages each group at hunk granularity and commits it through `git` (never `--no-verify`)

## Setup

Requires [`git-surgeon`](https://github.com/raine/git-surgeon) for hunk-level, non-interactive
staging — `git add -p` needs a human at the prompt, so it can't be driven by an agent. The skill
checks for it first and offers to install it if missing:

```bash
brew install raine/git-surgeon/git-surgeon
```

On a non-Homebrew platform, install a pinned, checksummed release from
[the releases page](https://github.com/raine/git-surgeon/releases) rather than piping the `main`
branch's install script into a shell.

Without it, the skill falls back to whole-file staging only — it can't split a single file's
changes across multiple commits.

## Key Principles

- **One commit = one logical change.** A reviewer should be able to understand and revert a
  single commit in isolation.
- **Body explains why, not what.** The diff already shows what changed.
- **No AI attribution.** Do not add "Generated with Claude Code" or `Co-authored-by` trailers.
- **Pushing is out of scope.** Stops after committing unless explicitly asked to push.

## See Also

- **SKILL.md** — Complete workflow with all steps
- [Git Workflow Guidelines][git-workflow] — branch naming, commit message format, PR conventions

[git-workflow]: ../../instructions/git-workflow.md
