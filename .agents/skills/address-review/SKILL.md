---
name: spirit:address-review
description: >-
  Systematic approach to responding to PR review comments. Guides through analyzing feedback,
  implementing changes, adding responses, and resolving conversations. Use when you receive
  PR reviews and need to address feedback efficiently and professionally.
category: github
displayName: Address GitHub Review
---

# Address GitHub Review

You are an expert at systematically addressing PR review feedback. You guide users through analyzing, implementing, and professionally responding to all review comments using GitHub CLI.

## Core Principles

### Respectful Communication
- Treat all feedback as constructive input, even if you disagree
- Respond to every comment (even if just to acknowledge)
- Provide clear reasoning for decisions to accept/decline suggestions
- Use positive language and thank reviewers for their time

### Systematic Approach
- List all comments before starting implementation
- Categorize feedback by type (bug, docs, suggestion, question)
- Evaluate each comment independently using decision framework
- Document decisions in code and commit messages
- Complete implementation before resolving conversations

### Professional Standards
- Group related changes in logical commits
- Reference review comments in commit messages
- Link commits when replying to specific suggestions
- Request re-review explicitly when ready
- Resolve conversations only after implementation

## Workflow Phases

### Phase 1: Review Analysis

Start by understanding the complete scope of feedback:

**Prerequisite:** Verify GitHub CLI authentication
```bash
gh auth status
```

1. **List All Review Comments**
   ```bash
   gh pr view <number> --comments
   ```

2. **Categorize Comments**
   - **Bug/Security Issues**: Actual problems that break functionality
   - **Documentation**: Clarity, examples, or explanation improvements
   - **Suggestions**: Non-blocking improvements or style preferences
   - **Questions**: Clarifications about design or implementation
   - **Praise**: Positive feedback (acknowledge and thank)

   **For Large PRs:** If you have more than 10 comments, confirm with the user which categories to prioritize before implementing all changes.

3. **Assess Each Comment**

   Use this framework for every suggestion:

   | Criteria | Accept ✅ | Partial ⚠️ | Decline ❌ |
   |----------|----------|------------|-----------|
   | **Correctness** | Fixes actual bug/issue | Partially addresses issue | Not actually an issue |
   | **Clarity** | Improves readability | Minor improvement | Preference/subjective |
   | **Scope** | Within PR scope | Related but separate concern | Out of scope |
   | **Cost/Value** | Low effort, high value | Medium effort | High effort, low value |
   | **Architecture** | Aligns with project patterns | Requires discussion | Conflicts with design |

4. **Document Rationale**
   - Write down your decision for each comment (you'll use this when replying)
   - Note any concerns or questions to address
   - Identify dependencies between changes

### Phase 2: Implementation

Execute changes systematically:

1. **Group Related Changes**
   - Batch similar fixes into logical commits
   - Keep unrelated changes separate
   - One fix per commit when appropriate

2. **Read Surrounding Code**
   - Always review the code context before making fixes
   - Understand why the change was suggested
   - Check for related code that may need similar updates
   - This prevents incomplete implementations

3. **Read GitHub Suggestion Blocks in Full**

   GitHub review comments formatted as ` ```suggestion ``` ` blocks show the **complete replacement** for the highlighted lines. When a suggestion exists:
   - Read the entire suggested replacement, not just the part that prompted the comment title.
   - Diff it mentally against the **current file content** line by line.
   - Only declare "already applied" when **every token** of the suggestion matches the file.

   **Example of a mistake to avoid:**
   Reviewer suggests:
   ```suggestion
   <ButtonLink href={routes.homepage}>
   ```
   Current code: `<ButtonLink href={routes.homepage} color="primary">`
   ❌ Wrong: "href already uses routes.homepage — already applied."
   ✅ Correct: Suggestion also removes `color="primary"` — apply that removal too.

4. **Always Ask Before Committing**

   Before running any `git commit`, use `AskUserQuestion` to ask:
   - New commit or fixup into an existing one?
   - If fixup: which commit hash?

   Never run `git commit` (or `git commit --fixup`) without first getting this confirmation from the user. This respects project hooks that enforce the commit workflow.

5. **Reference Review Comments**
   ```bash
   # In commit message, reference the PR comment
   git commit -m "Fix: Update documentation (review comment PR#1-c123)"
   ```

4. **Test Changes**
   - Run tests for modified code
   - Manually verify fixes work as intended
   - Check that you haven't introduced regressions

5. **Update Status**
   - Push commits to the PR branch
   - Let checks/CI run to completion
   - Do NOT push if tests fail

### Phase 3: Communication

Reply to each review comment systematically:

1. **Use Status Indicators**
   ```
   ✅ Fixed: [brief description]
   ⚠️ Addressed: [what was done, why other parts weren't]
   ❌ Not addressed: [clear rationale]
   ❓ Clarification: [ask specific question]
   ```

2. **Reply to Each Review Thread Individually**

   **CRITICAL:** Always reply to review threads using GraphQL, not regular PR comments. Review threads are different from comments and require specific mutations.

   Using GitHub CLI with GraphQL:
   ```bash
   # Reply to a specific review thread (use thread ID from Phase 1)
   gh api graphql -f query='
   mutation {
     addPullRequestReviewThreadReply(input: {
       pullRequestReviewThreadId: "PRRT_kwDOFqk-Ps5vjRxb"
       body: "✅ Fixed (commit abc123d): Description of what was fixed"
     }) {
       comment {
         id
       }
     }
   }'
   ```

   **Important Notes:**
   - Use the review thread ID (starts with `PRRT_`), NOT comment ID
   - This mutation adds your reply to the existing review thread
   - Each thread must be replied to individually - do NOT add a general PR comment instead

3. **Provide Context**
   - Link to specific commits when referencing changes
   - Quote relevant code if explaining a decision
   - Provide rationale for declined suggestions
   - Suggest alternatives when applicable

4. **Response Templates** (see references for full templates)

   **Accepting:**
   ```markdown
   ✅ Fixed: Updated documentation to clarify the implementation approach.
   Commit: abc123d
   ```

   **Partial Acceptance:**
   ```markdown
   ⚠️ Addressed: Added the validation you suggested. I kept the error
   message generic to maintain consistency with other endpoints (see
   similar pattern in middleware.ts:42).
   ```

   **Declining Professionally:**
   ```markdown
   ❌ Not addressed: This is handled by the authentication middleware
   which runs before this code. Adding additional checks here would create
   unnecessary duplication. The auth middleware is tested separately in
   tests/auth.test.ts.
   ```

### Phase 4: Resolution

Finalize the review process:

1. **Resolve Conversations After Replying**

   **BEST PRACTICE:** Always resolve threads immediately after replying if you don't need additional information from the reviewer.

   Using GitHub CLI with GraphQL:
   ```bash
   # Resolve a specific thread
   gh api graphql -f query='
   mutation {
     resolveReviewThread(input: {
       threadId: "PRRT_kwDOFqk-Ps5vjRxb"
     }) {
       thread {
         id
         isResolved
       }
     }
   }'
   ```

   **When to Resolve:**
   - ✅ After replying to comments where you've fixed the issue
   - ✅ After replying to comments where you've explained why the suggestion isn't applicable
   - ✅ After asking clarifying questions and providing context
   - ❌ Only if you don't need additional information from the reviewer

2. **Verify All Threads Are Handled**
   - Check every unresolved thread has a reply or explanation
   - Ensure all implementation is complete
   - Verify CI/tests pass
   - Query remaining unresolved threads to confirm all are addressed

3. **Query Unresolved Threads** (before declaring done)
   ```bash
   gh api graphql -f query='
   query {
     repository(owner: "owner", name: "repo") {
       pullRequest(number: 123) {
         reviewThreads(first: 100) {
           edges {
             node {
               id
               isResolved
             }
           }
         }
       }
     }
   }'
   ```

4. **Request Re-Review** (only if major changes made)
   ```bash
   gh pr comment <number> \
     -b "I've addressed all review comments. Ready for re-review!"
   ```

## GitHub Integration

### GitHub CLI (`gh`)

**Advantages:**
- Widely known and documented
- Direct control over commands
- Good for scripting and automation
- Familiar command-line interface

**Common Commands:**

```bash
# View PR with reviews
gh pr view <number> --comments

# List all review comments with IDs
gh api repos/{owner}/{repo}/pulls/{number}/comments

# Reply to a comment
gh api -X POST repos/{owner}/{repo}/pulls/{number}/comments/{id}/replies \
  -f body="Your response"

# Query review threads
gh api graphql -f query='...'

# Push branch and open PR
gh pr create --title "Title" --body "Description"

# Add comment to PR
gh pr comment <number> -b "Comment text"
```

**Error Handling:**
- Check `gh` installation: `which gh`
- Verify authentication: `gh auth status`
- Check API rate limits: `gh api rate-limit`

## Batch Operations

For PRs with many review comments:

### Resolve Multiple Threads Script

```bash
#!/bin/bash
set -e

OWNER="owner"
REPO="repo"
PR_NUMBER="123"

# Get all unresolved thread IDs
THREAD_IDS=$(gh api graphql -f query='
  query {
    repository(owner: "'$OWNER'", name: "'$REPO'") {
      pullRequest(number: '$PR_NUMBER') {
        reviewThreads(first: 100) {
          edges {
            node {
              id
              isResolved
            }
          }
        }
      }
    }
  }
' --jq '.data.repository.pullRequest.reviewThreads.edges[] | select(.node.isResolved == false) | .node.id')

# Resolve each thread
count=0
while IFS= read -r thread_id; do
  [ -z "$thread_id" ] && continue
  count=$((count + 1))
  echo "[$count] Resolving: $thread_id"
  gh api graphql -f query="
    mutation {
      resolveReviewThread(input: {threadId: \"$thread_id\"}) {
        thread { isResolved }
      }
    }
  " > /dev/null
  echo "  ✓ Resolved"
done <<< "$THREAD_IDS"

echo "All $count threads resolved!"
```

### Reply to and Resolve Multiple Review Threads

This is the recommended pattern when addressing multiple review comments:

```bash
#!/bin/bash

# Define review threads and responses
# Format: THREAD_ID|RESPONSE

declare -a THREADS=(
  "PRRT_kwDOFqk-Ps5vjRxb|✅ Fixed (commit abc123d): Changed implementation as suggested"
  "PRRT_kwDOFqk-Ps5vjRxx|✅ Fixed (commit def456e): Updated types to match default element"
  "PRRT_kwDOFqk-Ps5vjRx_|⚠️ Not applied: This causes type errors in tests. Current approach is correct."
)

# Reply to each thread
for thread_data in "${THREADS[@]}"; do
  IFS='|' read -r thread_id response <<< "$thread_data"

  echo "Replying to thread: $thread_id"
  gh api graphql -f query="
  mutation {
    addPullRequestReviewThreadReply(input: {
      pullRequestReviewThreadId: \"$thread_id\"
      body: \"$response\"
    }) {
      comment {
        id
      }
    }
  }"
done

# Resolve each thread
for thread_data in "${THREADS[@]}"; do
  IFS='|' read -r thread_id _ <<< "$thread_data"

  echo "Resolving thread: $thread_id"
  gh api graphql -f query="
  mutation {
    resolveReviewThread(input: {
      threadId: \"$thread_id\"
    }) {
      thread {
        isResolved
      }
    }
  }"
done

echo "All threads replied and resolved!"
```

**Key Points:**
1. Reply to each thread individually first
2. Verify each reply was posted before proceeding
3. Resolve threads after replying
4. Check that all threads are now resolved

## Common Scenarios

### Scenario 1: Multiple Reviewers with Conflicting Feedback

**Situation:** Two reviewers suggest opposite approaches.

**Approach:**
1. Acknowledge both perspectives in your reply
2. Explain your chosen approach and why
3. Offer to discuss trade-offs if reviewers want to align
4. Implement what you believe is best for the project
5. Be respectful and open to changing your mind

**Example Response:**
```markdown
❓ Trade-off Discussion: I appreciate both perspectives:
- @reviewer1: Your approach is more explicit and easier to debug
- @reviewer2: Your approach is more concise and follows our convention

I implemented @reviewer2's approach because it aligns with our existing
patterns in middleware.ts. However, I'm open to switching if the team
prefers explicit clarity over consistency. What does the team think?
```

### Scenario 2: Reviewer Requests Out-of-Scope Changes

**Situation:** Review comment suggests feature or refactoring outside this PR's scope.

**Approach:**
1. Thank them for the suggestion
2. Clearly explain why it's out of scope
3. Propose opening a separate issue
4. Decline politely in this PR

**Example Response:**
```markdown
❌ Not addressed: This is a great suggestion for improving the auth flow,
but it's beyond this PR's scope (which focuses on pagination). I've opened
#456 to track this for a future PR. Let's keep this PR focused on the
original objective.
```

### Scenario 3: Disagreeing with Suggestion Professionally

**Situation:** You believe the suggestion is incorrect or harmful.

**Approach:**
1. Take time to ensure you understand their concern
2. Explain clearly why the suggestion doesn't work
3. Provide evidence (existing code, tests, architecture)
4. Propose alternative if one exists
5. Invite discussion if uncertain

**Example Response:**
```markdown
❌ Not implemented: I understand your concern about performance, but
caching here would create stale data issues. This endpoint doesn't have
TTL semantics, and we'd need distributed invalidation (tracked separately
in #789). For now, we rely on the application layer to manage caching via
Cache-Control headers (see line 42 in middleware.ts).

If you're concerned about performance, the profiling data in #750 shows
database query time as the bottleneck, not API response serialization.
```

### Scenario 4: Stale Comments After Code Changes

**Situation:** Review comments are no longer relevant after you've made changes.

**Approach:**
1. Leave a comment explaining the code has changed
2. Quote the previous code if helpful
3. Explain what changed and why it addresses the concern
4. Ask reviewer to re-review if needed

**Example Response:**
```markdown
✅ Addressed: This code was refactored in commit abc123d based on
previous feedback. The validation logic now uses our shared validator
utility (see utils/validators.ts). Please re-review the updated code!
```

### Scenario 5: Bulk Resolving Minor/Resolved Comments

**Situation:** Many comments are now resolved but conversation threads remain open.

**Approach:**
1. Use batch script to query unresolved threads
2. Verify each thread is actually resolved
3. Resolve all at once
4. Post summary comment

**Script:**
```bash
# See "Batch Operations" section above for full script

# Or use single command to resolve all
gh api graphql << 'EOF'
query {
  repository(owner: "owner", name: "repo") {
    pullRequest(number: 123) {
      reviewThreads(first: 100) {
        edges {
          node {
            id
            isResolved
          }
        }
      }
    }
  }
}
EOF
```

## Best Practices

1. **Read Before Starting**
   - Review ALL comments before implementing anything
   - Understand the full scope of feedback
   - Identify dependencies and conflicts

2. **Respond to Everything**
   - Even positive feedback deserves acknowledgment
   - Questions deserve direct answers or clarification requests
   - Don't leave any thread without a response

3. **Group Related Changes**
   - One logical change per commit
   - Makes it easier to discuss and revert if needed
   - Improves git history readability

4. **Reference Comments**
   - Include PR comment IDs or URLs in replies
   - Link commits to specific feedback items
   - Makes it easy to track what was addressed where

5. **Resolve Last**
   - Don't resolve conversations until implementation is complete
   - Only resolve after the reviewer confirms the fix
   - Indicates "this is done and verified"

6. **Request Re-Review Explicitly**
   - Don't assume reviewers will notice changes
   - Use clear language: "Ready for re-review"
   - Consider @ mentioning for important changes

7. **Test Everything**
   - Run relevant test suites before pushing
   - Manually verify fixes work as intended
   - Check CI pipeline passes completely

## Common Pitfalls

### ❌ Not Reading All Comments First
**Problem:** You start implementing before understanding full scope
**Solution:** List all comments and review them before making changes

### ❌ Resolving Before Implementation
**Problem:** You mark conversations resolved but haven't actually fixed things
**Solution:** Only resolve after code is changed and tested

### ❌ Defensive or Dismissive Tone
**Problem:** Your responses upset reviewers or create conflict
**Solution:** Use the response templates, focus on explanation not defense

### ❌ Implementing Every Suggestion
**Problem:** You accept every suggestion uncritically
**Solution:** Use the decision framework to evaluate each comment

### ❌ Missing Nested Reply Threads
**Problem:** Some comments are replies to other comments and get missed
**Solution:** Expand all comment threads to see complete conversations

### ❌ Replying to Comments Instead of Review Threads
**Problem:** You reply to individual comments rather than the review thread, fragments the conversation
**Solution:** Always use `addPullRequestReviewThreadReply` mutation with the thread ID (PRRT_...), not regular PR comments

### ❌ Adding Summary Comment Instead of Replying to Threads
**Problem:** You add a general "I've fixed everything" comment instead of replying to each thread
**Solution:** Reply individually to each review thread using GraphQL mutation. Only add a summary comment if explicitly requested.

### ❌ Not Resolving Threads After Replying
**Problem:** Review conversations remain open even though they've been addressed
**Solution:** Always resolve threads immediately after replying if no additional information is needed from the reviewer

### ❌ Partially Reading a GitHub Suggestion Block
**Problem:** A suggestion block shows the full replacement, but you only check one part of it and declare the thread "already applied".
**Example:** Reviewer suggests `<ButtonLink href={routes.homepage}>`. Current code has `<ButtonLink href={routes.homepage} color="primary">`. Checking only that `routes.homepage` is present misses that `color="primary"` should be removed.
**Solution:** Diff the entire suggestion against the current file content token by token before concluding it is already applied.

### ❌ Committing Without Asking First
**Problem:** Running `git commit` directly skips the project's required workflow (hook or convention) for choosing between a new commit and a fixup.
**Solution:** Always use `AskUserQuestion` before any `git commit` call: ask (1) new commit or fixup, and (2) if fixup, which target hash. Never commit autonomously.

## Advanced Patterns

### Conditional Resolution Based on Status

```bash
# Only resolve if CI passed
CI_STATUS=$(gh pr view <number> --json "statusCheckRollup" --jq '.statusCheckRollup[0].state')

if [ "$CI_STATUS" = "SUCCESS" ]; then
  echo "CI passed, resolving threads..."
  # Run resolution script
else
  echo "CI failed, not resolving yet"
fi
```

### Tracking Decision Rationale

Create a document for complex PRs:

```markdown
# PR #123 Review Response Summary

## Accepted Changes
- [ ] Comment #456: Add input validation
  - Implementation: Added validator in utils/validators.ts
  - Commit: abc123d

## Partial Changes
- [ ] Comment #789: Improve error messages
  - What was done: Added context to common errors
  - What wasn't done: Full error code documentation (tracked in #999)

## Declined Changes
- [ ] Comment #1011: Cache results
  - Reason: Creates stale data issues without TTL
  - Alternative: Track in #750 for future performance work
```

### Automating Response Generation

For PRs with many similar comments:

```bash
# Generate responses from template
for i in {1..10}; do
  comment_id=$(gh api repos/{owner}/{repo}/pulls/{number}/comments \
    --jq ".[$i].id")

  template="✅ Fixed: Applied suggestion from review comment.
  Commit: $(git rev-parse --short HEAD)"

  gh api -X POST repos/{owner}/{repo}/pulls/{number}/comments/$comment_id/replies \
    -f body="$template"
done
```

## Verification Checklist

Use this before marking PR as ready for re-review:

- [ ] All comments have been reviewed and categorized
- [ ] Decision rationale documented for each comment
- [ ] All accepted changes implemented
- [ ] Code changes follow project conventions
- [ ] Tests pass locally and in CI
- [ ] Each accepted comment has a reply
- [ ] Declined comments have clear explanations
- [ ] All code commits reference the review comments
- [ ] No nested threads were missed
- [ ] Ready for re-review comment has been posted
- [ ] Conversations will be resolved only after re-approval

## Summary

The PR review response workflow has four phases:

1. **Analyze** → Understand all feedback systematically
2. **Implement** → Make changes grouped logically
3. **Communicate** → Reply to each comment professionally
4. **Resolve** → Finalize once everything is done

Use the decision framework to evaluate suggestions, the response templates to communicate professionally, and batch operations for efficiency. Always prefer respectful communication and systematic approaches over rushing or defensive reactions.
