# Address Review

Systematically address PR review comments with a structured workflow and professional communication patterns.

## Quick Start

When you receive a PR review, follow these four phases:

### 1. Analyze
```bash
gh pr view <number>
gh api repos/{owner}/{repo}/pulls/{number}/comments
```
- List all comments
- Categorize by type (bug, docs, suggestion, question)
- Use decision framework to assess each

### 2. Implement
- Group related changes into logical commits
- Reference review comments in commit messages
- Test changes before pushing

### 3. Communicate
Use status indicators in replies:
- ✅ **Fixed**: You implemented the suggestion
- ⚠️ **Addressed**: You did part of it, with explanation
- ❌ **Not addressed**: Declined with clear reasoning
- ❓ **Clarification**: Asking for more information

Reply to EVERY comment using templates (see references):

```bash
gh api -X POST repos/{owner}/{repo}/pulls/{number}/comments/{id}/replies \
  -f body="✅ Fixed: Implemented validation check in utils/validators.ts"
```

### 4. Resolve
- Verify all implementation is complete
- Only resolve conversations after fixes are done
- Explicitly request re-review

```bash
gh pr comment <number> -b "I've addressed all review comments. Ready for re-review!"
```

## When to Use This Skill

- ✅ You've received a PR review and need to respond
- ✅ Multiple reviewers with conflicting feedback
- ✅ You need to decline some suggestions professionally
- ✅ Large PRs with many review comments
- ✅ You want to systematically track all feedback

## Common Commands

```bash
# View PR and reviews
gh pr view <number> --comments

# List all review comments
gh api repos/{owner}/{repo}/pulls/{number}/comments

# Reply to a specific comment
gh api -X POST repos/{owner}/{repo}/pulls/{number}/comments/{comment_id}/replies \
  -f body="Your response"

# Query review threads
gh api graphql -f query='
  query {
    repository(owner: "owner", name: "repo") {
      pullRequest(number: 123) {
        reviewThreads(first: 100) {
          edges { node { id, isResolved } }
        }
      }
    }
  }
'

# Resolve a thread
gh api graphql -f query='
  mutation {
    resolveReviewThread(input: {threadId: "PRRT_..."}) {
      thread { isResolved }
    }
  }
'
```

## Decision Framework

Evaluate each suggestion using these criteria:

| Criteria | Accept ✅ | Partial ⚠️ | Decline ❌ |
|----------|----------|------------|-----------|
| **Correctness** | Fixes actual issue | Partially fixes | Not an issue |
| **Clarity** | Improves readability | Minor improvement | Subjective preference |
| **Scope** | Within PR scope | Related concern | Out of scope |
| **Cost/Value** | Low effort, high value | Medium effort | High effort, low value |
| **Architecture** | Aligns with patterns | Requires discussion | Conflicts with design |

## Response Templates

See `references/response-templates.md` for comprehensive examples:
- Accepting suggestions
- Declining professionally
- Partial acceptance
- Requesting clarification
- Handling conflicts

## GitHub Integration

Use GitHub CLI (`gh`):
- Command-line tool, widely known
- Use commands shown in the quick start above
- Good for scripting and automation
- Check authentication with `gh auth status`

## Batch Operations

For PRs with many comments:

```bash
# Script in references/github-integration-patterns.md shows:
# - Resolving multiple threads
# - Replying to multiple comments
# - Bulk operations with proper error handling
```

## Key Principles

1. **Read all comments first** - Understand complete scope before implementing
2. **Respond to everything** - Even questions or praise deserve acknowledgment
3. **Document decisions** - Explain your rationale for accepted/declined suggestions
4. **Group changes logically** - One logical change per commit
5. **Resolve last** - Only mark conversations done after implementation complete
6. **Be professional** - Use templates, avoid defensive tone, thank reviewers
7. **Test thoroughly** - Run tests before pushing, verify CI passes

## Detailed Documentation

- **SKILL.md** - Complete workflow with all phases and patterns
- **references/response-templates.md** - Communication examples and patterns
- **references/github-integration-patterns.md** - Technical reference for GitHub CLI and APIs

## See Also

- Related skill: `/review` - For reviewing PRs from the reviewer's perspective
- GitHub CLI docs: `gh help pr`
- GitHub API docs: https://docs.github.com/en/rest/pulls
