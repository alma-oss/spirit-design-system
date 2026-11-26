# Merge PR

Land a PR whose Jira issue is accepted: autosquash its fixup commits, wait for green checks, and
rebase-merge it.

## Usage

```text
/spirit:merge-pr
```

Run it on the PR's branch after [`/spirit:accept-jira-issue`](../accept-jira-issue/README.md) accepted
the issue.

## What It Does

1. Finds the branch's PR and Jira issue
2. Checks the gates: Jira accepted, PR approved, not a draft, checks green, no conflicts, new ADRs accepted
3. Autosquashes `fixup!` commits onto the fresh `origin/main` and verifies the tree did not change
4. Pushes with `--force-with-lease` then waits for checks
5. Merges with `gh pr merge --rebase` only after you approve the commit list
6. Offers to remove the merged local worktree and branch

## Requirements

- `gh` authenticated with merge rights on `alma-oss/spirit-design-system`
- Atlassian MCP for the Jira gate

## Output

A gate table, the commits that will land on `main`, and the merge SHA.

## Key Principles

- **Accepted is not approved.** Both the Jira acceptance and the PR approval are gates.
- **Nothing merges without your approval** of the final commit list.
- **No bypass.** A failed gate stops the skill; it never uses `--admin` or a plain force push.

## See Also

- **SKILL.md** — the workflow, gates, and commands
- Related: `/spirit:accept-jira-issue` accepts the issue and labels the PR first; `/spirit:atomic-commits`
  explains the `fixup!` commits this skill squashes
