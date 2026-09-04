---
name: spirit:atomic-commits
description: >-
  Create clean, atomic git commits following Spirit's commit message conventions. Splits a mixed
  working tree into one logical commit per change via hunk-level staging, then commits each
  through git hooks. Use whenever the user asks to commit, "commit my changes", "make a commit",
  "commit this", or "commit my work".
---

# Atomic Commits

Turn a working tree into a clean series of **atomic commits** — each commit one logical,
self-contained change, formatted per [Git Workflow Guidelines][git-workflow]. Stage at hunk
granularity, then commit through the normal `git` path so hooks (commitlint, etc.) run.

## Principles

- **One commit = one logical change.** A reviewer should be able to understand and, if needed,
  revert a single commit in isolation.
- **Stage at hunk granularity.** Never `git add -A` or `git add .` blindly when the tree mixes
  unrelated changes — pick exactly the hunks that belong together.
- **Follow [Git Workflow Guidelines][git-workflow] for message format.** Lowercase
  `type(scope): description #DS-XXXX`, component names in backticks, imperative mood, no period.
- **Body explains _why_, not _what_.** The diff already shows what changed. Use a `  *` bulleted
  list (two-space indent, lowercase text) when the reasoning isn't obvious from the subject alone.
- **Commit with `git`, never bypass hooks.** Do not use `--no-verify` or similar.
- **No AI attribution.** Do not add "Generated with Claude Code", `Co-authored-by`, or similar
  trailers.
- **Pushing is out of scope.** Stop after committing unless the user explicitly asked to push.
- **Ask before committing.** Always confirm with the user before creating any commit: whether
  each group should be a new commit or a `--fixup` of an existing commit (and which hash), per
  [Fixup Commits][fixup-commits].

## Workflow

### Step 1: Check Prerequisites

`git-surgeon` staging is non-interactive, which is what makes hunk-level splitting reliable for
an agent — `git add -p` is interactive and cannot be driven this way. Check whether it's
installed:

```bash
command -v git-surgeon
```

- **Available:** use it for all staging in this workflow (Steps 2 and 6).
- **Not available:** tell the user it's missing and offer to install it before continuing, e.g.
  via `AskUserQuestion` with options **Install now** / **Continue without it**:

  ```bash
  brew install raine/git-surgeon/git-surgeon
  ```

  On a non-Homebrew platform, point the user to a pinned, checksummed release from
  <https://github.com/raine/git-surgeon/releases> instead of piping the `main` branch's install
  script into a shell — that script's contents aren't pinned or verified.

  If the user chooses to continue without it, fall back to **file-level** grouping only
  (`git add <path>` per group) — do not attempt to split a single file's changes across multiple
  commits without `git-surgeon`, since there is no non-interactive way to do that safely.

### Step 2: Survey the Changes

```bash
git status
git diff              # unstaged changes
git diff --staged     # already-staged changes, if any
```

With `git-surgeon` available, prefer it for hunk-level IDs instead of raw diffs:

```bash
git-surgeon hunks
git-surgeon hunks --staged
```

### Step 3: Group Hunks Into Atomic Units

Cluster the hunks by logical change — e.g. the feature vs. its tests vs. docs vs. an unrelated
fix that happened to be in the tree. Inspect anything ambiguous:

```bash
git-surgeon show <id>    # full diff for one hunk, lines numbered for partial staging
```

A single file often spans multiple commits; a single commit often spans multiple files. Group by
intent, not by file.

### Step 4: Confirm the Jira Issue ID and Draft a Message Per Group

If a Jira issue ID (`DS-XXXX`) hasn't already been given in the conversation, ask for it — see
[Before Committing][git-workflow-before-committing]. Draft one commit message per group following
[Git Workflow Guidelines][git-workflow]:

```text
type(scope): description #DS-XXXX

  * why this change was needed, lowercase, wrapped at ~72 chars
  * another point, if needed
```

Omit the body for trivial commits (e.g. `chore(deps): bump lerna to 8.1.0`).

### Step 5: Confirm the Plan

First collect, for **each** group, whether it should be a **new commit** or a **fixup** of an
existing commit. Use `AskUserQuestion` with one question per group (options: **New commit** /
**Fixup into `<hash>`** — list the relevant existing commit hash(es) from `git log` as separate
options so the user picks the hash directly, rather than typing it as free text).

Then use a second `AskUserQuestion` call to present the full plan — groups → hunk IDs → messages
→ the new-commit-or-fixup choice just collected for each group — before touching git. Put the
complete plan in the `preview` of the first option:

- **Apply it** (preview: the full grouping + messages + mode/hash per group) — create the
  commits as proposed.
- **Edit first** — user adjusts grouping, wording, or mode/hash, then re-confirm.
- **Discard** — make no commits.

### Step 6: Commit Each Group

Commit in dependency order (e.g. the change before the test that exercises it). For each group:

```bash
git-surgeon stage <id1> <id2> ...        # or <id>:5-30 to stage only part of a hunk
# without git-surgeon: git add <path> ... (whole files only, per Step 1)
TMPFILE=$(mktemp /tmp/commit-msg.XXXXXX)
printf '%s\n' "<commit message>" > "$TMPFILE"
git commit -F "$TMPFILE"                 # or: git commit --fixup <hash> for a fixup
rm -f "$TMPFILE"
```

> Stage with `git-surgeon` (or `git add`), commit with `git` — not `git-surgeon commit`. This
> keeps commit-msg hooks in the loop and supports multi-line bodies via the tempfile.

Squashing is out of scope for this skill — leave fixup commits as-is once created. Per
[Fixup Commits][fixup-commits], `git rebase -i --autosquash` runs later, right before merge, not
as part of this workflow; never run it here unless the user explicitly asks for it.

After all groups are committed, verify:

```bash
git log --oneline -n <count>
git status               # should be clean, or hold only intentionally-deferred hunks
```

[git-workflow]: ../../instructions/git-workflow.md
[git-workflow-before-committing]: ../../instructions/git-workflow.md#before-committing
[fixup-commits]: ../../instructions/git-workflow.md#fixup-commits
