---
name: spirit:merge-pr
description: >-
  Merge a PR whose Jira issue is accepted — verify the acceptance, autosquash fixup
  commits onto the fresh main, push with lease, wait for green checks, then rebase-merge after the user
  approves and offer branch cleanup. Use when asked to merge, land, or finalize an accepted PR, or when
  the user says an issue is accepted and the PR is ready to merge.
---

# Merge PR

Take an accepted PR to a merge on `main`. Check the gates, squash fixups into their target commits,
wait for green CI, merge once the user approves, then offer to clean up.

Wherever this skill says "ask the user", use whatever your environment provides (a choice prompt or
plain text) and wait for the answer.

## Principles

- **Never merge without explicit approval.** Show the final commit list and wait. Approval for the rebase
  or the push is not approval for the merge.
- **Accepted means the Jira issue is accepted, not that the PR is approved.** Both are gates.
- **Rebase merge only.** The repository allows nothing else, and it keeps one commit per logical change.
- **Never force-push `main`.** Force-push the PR branch only, with `--force-with-lease`.
- **Stop on any failed gate.** Report it; never skip, bypass, or `--admin` merge.

---

## Workflow

### Step 1: Resolve the PR and the Issue

```bash
git branch --show-current
gh pr list --head "$(git branch --show-current)" --state all \
  --json number,title,url,state,isDraft,reviewDecision,mergeStateStatus,labels,headRefOid
```

No PR, or a `MERGED`/`CLOSED` one → stop and say so. Take the `DS-XXXX` key from the branch, commits,
or PR title; read the issue with `getJiraIssue` (Atlassian MCP, `almacareer.atlassian.net`).

### Step 2: Check the Gates

| Gate          | Pass when                                                                      |
| ------------- | ------------------------------------------------------------------------------ |
| Jira accepted | Issue status ID is `10012` (Accepted) and the PR has the `jira-accepted` label |
| Reviews       | `reviewDecision` is `APPROVED`; no unresolved review threads                   |
| Not a draft   | `isDraft` is `false`                                                           |
| Checks        | `gh pr checks <PR>` all pass, except the two fixup checks named below          |
| No conflicts  | `mergeStateStatus` is not `DIRTY`                                              |
| ADR accepted  | Every ADR the PR adds has `Status: accepted`                                   |

A PR without a Jira issue skips the Jira gate; say so. Report every failed gate together and stop.
Pending checks are not a failure yet — wait for them in Step 4.

- **Jira status:** compare the ID, not the name. Jira localizes the name per user: `Accepted`, or
  `Přijato` in Czech.
- **Fixup checks:** while the branch has `fixup!` commits, `🚫 Merge Blocked by Git Fixup` fails by design
  and `🚢 Ready to Integrate` fails with it. Ignore those two here; Step 3 removes the fixups, and Step 4
  needs them green.
- **ADR status:** merging an ADR accepts it, so its status line must say so. Find the ADRs the PR adds:

  ```bash
  git fetch origin main
  git diff --name-only --diff-filter=A origin/main...HEAD -- docs/decisions/
  ```

  A status other than `accepted` (usually `proposed`) is the one gate you may fix: offer to set
  `Status: accepted` and commit it with `git commit --fixup=<commit that added the ADR>`, so Step 3
  squashes it in. ADRs the PR only modifies, for example to mark them `superseded by`, keep their status.

### Step 3: Autosquash Onto Fresh Main

Run it on the PR branch, in its worktree. The working tree must be clean:

```bash
git status --porcelain
git fetch origin main
git log --oneline origin/main..HEAD
git rebase --autosquash origin/main
```

- A conflict → `git rebase --abort`, report the files, and stop. Do not resolve it unasked.
- Any `fixup!` or `squash!` commit left in `git log origin/main..HEAD` → its target is not on the branch.
  Stop and ask.
- Check each commit header against [`git-workflow.md`](../../instructions/git-workflow.md).
  Report violations; do not rewrite messages unasked.

Run `git range-diff origin/main <old-head> HEAD` (take the old head from `git reflog`). Only the squashed
fixups may differ. Any other change means the rebase altered real content, so stop.

### Step 4: Push and Wait for Green

Skip the push when the rebase changed nothing. After a clean rebase, push without asking:

```bash
git push --force-with-lease
gh pr checks <PR> --watch
```

The push restarts CI and invalidates a stale approval if the repository dismisses them. Re-run
Step 2 afterwards, now with no check exempt. A red check → stop and report it.

### Step 5: Confirm and Merge

Show the commits that will land on `main` and the PR URL, then ask the user to choose:
**merge** or **stop here**. Silence or an unclear reply is not approval. On **merge**:

```bash
gh pr merge <PR> --rebase
gh pr view <PR> --json state,mergeCommit --jq '{state, sha: .mergeCommit.oid}'
```

Do not pass `--admin` or `--delete-branch`. Report the state and the merge SHA.

### Step 6: Offer Cleanup

Ask the user to choose: **remove** or **keep** the local worktree and branch of the merged PR.
Do it only on **remove**.
Run it from the main checkout, not from the worktree being removed. First check that nothing is lost:

- `git -C <path> status --porcelain` is empty.
- `git rev-parse <branch>` equals the PR's `headRefOid`, so no commit was made after the last push.

If either check fails, report it and leave the worktree and branch alone. Otherwise:

```bash
git worktree remove <path>
git branch -D <branch>
```

`-D` is needed because a rebase merge leaves the local commits different from the ones on `main`.
Do not move the Jira issue; the accepted status already says the work is done.

---

## Good vs Bad Examples

|                                 | Description                                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------- |
| ❌ **Approved ≠ accepted**      | Merging because `reviewDecision` is `APPROVED` while the Jira issue still awaits acceptance. |
| ❌ **Plain force push**         | `git push --force` instead of `--force-with-lease`; it can overwrite a reviewer's commit.    |
| ❌ **Bypassing a gate**         | `gh pr merge --admin` to get past a pending required check.                                  |
| ❌ **Rewriting content**        | Resolving a rebase conflict silently. Abort and report it.                                   |
| ❌ **Merge on rebase approval** | Merging right after the push because the user approved the rebase.                           |
| ❌ **Proposed ADR on `main`**   | Merging a new ADR that still says `Status: proposed`; merging is what accepts it.            |
