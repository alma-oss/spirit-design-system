# GitHub Integration Patterns

Technical reference for working with PR reviews via GitHub CLI and GitHub APIs.

## GitHub CLI Quick Reference

### Install & Setup

```bash
# Install GitHub CLI (macOS)
brew install gh

# Authenticate
gh auth login

# Check status
gh auth status

# Check API rate limits
gh api rate-limit
```

### Common Commands

#### View PR Information

```bash
# View specific PR
gh pr view <number>

# View with all comments
gh pr view <number> --comments

# View in browser
gh pr view <number> --web

# Get PR data as JSON
gh pr view <number> --json title,body,number,state
```

#### List Review Comments

```bash
# Get all review comments on PR
gh api repos/{owner}/{repo}/pulls/{number}/comments

# Get with specific fields
gh api repos/{owner}/{repo}/pulls/{number}/comments \
  --jq '.[] | {id, body, user: .user.login, createdAt: .created_at}'

# Get paginated results
gh api repos/{owner}/{repo}/pulls/{number}/comments --paginate
```

#### Reply to Comments

```bash
# Reply to a specific review comment
gh api -X POST \
  repos/{owner}/{repo}/pulls/{number}/comments/{comment_id}/replies \
  -f body="Your response text"

# Example with real values
gh api -X POST \
  repos/literat/awesome-agents/pulls/1/comments/2811675240/replies \
  -f body="✅ Fixed: Updated filename to match convention."
```

#### Add PR Comments

```bash
# Add comment to PR (not a reply to review)
gh pr comment <number> -b "Comment text"

# Add multiline comment
gh pr comment <number> -b "$(cat <<'EOF'
## Summary
Multiple lines of text

- Bullet point
- Another point
EOF
)"
```

### GraphQL Queries

#### List Review Threads

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
              line
              comments(first: 10) {
                edges {
                  node {
                    id
                    body
                    author {
                      login
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
'
```

#### Query Unresolved Threads Only

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
              line
            }
          }
        }
      }
    }
  }
' | jq '.data.repository.pullRequest.reviewThreads.edges[] | select(.node.isResolved == false) | .node.id'
```

#### Resolve a Thread

```bash
gh api graphql -f query='
  mutation {
    resolveReviewThread(input: {threadId: "PRRT_kwDOLVk0P85VJ9iN"}) {
      thread {
        id
        isResolved
      }
    }
  }
'
```

#### Unresolve a Thread

```bash
gh api graphql -f query='
  mutation {
    unresolveReviewThread(input: {threadId: "PRRT_kwDOLVk0P85VJ9iN"}) {
      thread {
        id
        isResolved
      }
    }
  }
'
```

## Batch Operations

### Resolve Multiple Threads Script

```bash
#!/bin/bash
set -e

OWNER="${1:?Owner required}"
REPO="${2:?Repo required}"
PR_NUMBER="${3:?PR number required}"

echo "Fetching unresolved threads for $OWNER/$REPO PR #$PR_NUMBER..."

# Get all unresolved thread IDs
THREADS=$(gh api graphql -f query="
  query {
    repository(owner: \"$OWNER\", name: \"$REPO\") {
      pullRequest(number: $PR_NUMBER) {
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
" --jq '.data.repository.pullRequest.reviewThreads.edges[] | select(.node.isResolved == false) | .node.id')

if [ -z "$THREADS" ]; then
  echo "No unresolved threads found."
  exit 0
fi

echo "Found $(echo "$THREADS" | wc -l) unresolved threads. Resolving..."

# Resolve each thread
count=0
while IFS= read -r thread_id; do
  count=$((count + 1))
  echo "[$count] Resolving: $thread_id"

  gh api graphql -f query="
    mutation {
      resolveReviewThread(input: {threadId: \"$thread_id\"}) {
        thread {
          id
          isResolved
        }
      }
    }
  " > /dev/null

  echo "  ✓ Resolved"
done <<< "$THREADS"

echo "All $count threads resolved!"
```

### Usage

```bash
./resolve-threads.sh literat awesome-agents 1
```

### Reply to Multiple Comments

```bash
#!/bin/bash
# File format: COMMENT_ID|RESPONSE_TEXT

set -e

OWNER="${1:?Owner required}"
REPO="${2:?Repo required}"
PR_NUMBER="${3:?PR number required}"
RESPONSES_FILE="${4:?Responses file required}"

echo "Replying to comments in $OWNER/$REPO PR #$PR_NUMBER..."

count=0
while IFS='|' read -r comment_id response; do
  # Skip empty lines and comments
  [[ -z "$comment_id" || "$comment_id" =~ ^# ]] && continue

  count=$((count + 1))
  echo "[$count] Replying to comment $comment_id"

  gh api -X POST \
    repos/$OWNER/$REPO/pulls/$PR_NUMBER/comments/$comment_id/replies \
    -f body="$response"

  echo "  ✓ Replied"
done < "$RESPONSES_FILE"

echo "Done! Replied to $count comments."
```

### Usage

```bash
# responses.txt format:
# 2811675240|✅ Fixed: Updated filename
# 2811675241|❌ Not addressed: Out of scope

./reply-comments.sh literat awesome-agents 1 responses.txt
```

## GitHub REST API Reference

### Direct API Calls with `gh`

#### Get Review Comments

```bash
gh api repos/{owner}/{repo}/pulls/{number}/comments
```

Response includes:

- `id` - Comment ID (use for replies)
- `body` - Comment text
- `user.login` - Author
- `created_at` - When it was created
- `line` - Line number in diff

#### Create Reply

```bash
gh api -X POST \
  repos/{owner}/{repo}/pulls/{number}/comments/{comment_id}/replies \
  -f body="Response text"
```

#### List Review Threads

```bash
gh api repos/{owner}/{repo}/pulls/{number}/reviews
```

#### Get Individual Review

```bash
gh api repos/{owner}/{repo}/pulls/{number}/reviews/{review_id}
```

### Error Handling

#### Handle Rate Limits

```bash
# Check current rate limit
gh api rate-limit --jq '.resources.core'

# Output:
# {
#   "limit": 5000,
#   "remaining": 4999,
#   "reset": 1645000000,
#   "resetDate": "2022-02-15T18:00:00Z"
# }

# Calculate reset time
RESET_TIME=$(gh api rate-limit --jq '.resources.core.reset')
CURRENT_TIME=$(date +%s)
WAIT_TIME=$((RESET_TIME - CURRENT_TIME))
echo "Rate limit resets in $WAIT_TIME seconds"
```

#### Handle API Errors

```bash
#!/bin/bash
set -e

# Try command with error handling
if ! gh api repos/$OWNER/$REPO/pulls/$NUMBER/comments 2>/dev/null; then
  echo "Error: Could not fetch comments"
  echo "Check that:"
  echo "- PR #$NUMBER exists in $OWNER/$REPO"
  echo "- You have read access to the repository"
  echo "- gh is authenticated: gh auth status"
  exit 1
fi
```

## Common Patterns

### Validate Before Operating

```bash
# Check PR exists
if ! gh pr view "$PR_NUMBER" > /dev/null 2>&1; then
  echo "Error: PR #$PR_NUMBER not found"
  exit 1
fi

# Check authentication
if ! gh auth status > /dev/null 2>&1; then
  echo "Error: Not authenticated. Run: gh auth login"
  exit 1
fi
```

### Extract IDs From Comments

```bash
# Get all comment IDs
gh api repos/$OWNER/$REPO/pulls/$NUMBER/comments \
  --jq '.[].id'

# Get comment ID and author
gh api repos/$OWNER/$REPO/pulls/$NUMBER/comments \
  --jq '.[] | {id: .id, author: .user.login}'
```

### Build Response with Variables

```bash
COMMIT_SHA=$(git rev-parse --short HEAD)
COMMIT_URL="https://github.com/$OWNER/$REPO/commit/$COMMIT_SHA"

RESPONSE="✅ Fixed: Implemented as suggested.

Commit: [$COMMIT_SHA]($COMMIT_URL)"

gh api -X POST \
  repos/$OWNER/$REPO/pulls/$NUMBER/comments/$COMMENT_ID/replies \
  -f body="$RESPONSE"
```

### Conditional Resolution

```bash
# Only resolve if CI passed
CI_STATUS=$(gh pr view "$NUMBER" \
  --json statusCheckRollup \
  --jq '.statusCheckRollup[0].state // "unknown"')

if [ "$CI_STATUS" = "SUCCESS" ]; then
  echo "CI passed, resolving thread..."
  gh api graphql -f query="..."
else
  echo "CI status: $CI_STATUS. Not resolving yet."
fi
```

### Bulk Comment IDs From Body Search

```bash
# Find comments matching a pattern
gh api repos/$OWNER/$REPO/pulls/$NUMBER/comments \
  --jq '.[] | select(.body | contains("FIXME")) | {id, body}'

# Count comments by author
gh api repos/$OWNER/$REPO/pulls/$NUMBER/comments \
  --jq 'group_by(.user.login) | map({author: .[0].user.login, count: length})'
```

## Troubleshooting

### "Not Authenticated"

```bash
# Fix authentication
gh auth login

# Verify it worked
gh auth status
```

### "PR Not Found" or "Access Denied"

```bash
# Verify PR exists and you have access
gh pr view <number>

# Try with explicit owner/repo
gh pr view -R owner/repo <number>
```

### Rate Limit Hit

```bash
# Check remaining quota
gh api rate-limit

# Wait for reset
sleep 3600  # Wait 1 hour
```

### GraphQL Syntax Error

```bash
# Test GraphQL query validity
gh api graphql -f query='YOUR_QUERY_HERE'

# Add proper quotes and escaping
gh api graphql -f query='
  query {
    viewer {
      login
    }
  }
'
```

### Comment Reply Failed

```bash
# Verify comment exists
COMMENT_ID="123456"
gh api repos/$OWNER/$REPO/pulls/$NUMBER/comments/$COMMENT_ID

# If error: comment was deleted or ID is wrong
```

### Common Mistakes When Replying to Review Threads

#### ❌ CRITICAL: Never Use `gh pr comment` as a Fallback for Review Thread Replies

**The Problem:**

```bash
# WRONG! This creates a top-level PR comment, NOT a thread reply
gh pr comment <number> -b "Your response"
```

This creates a general PR comment visible to everyone, not an inline reply to the specific review thread. It bypasses the thread history and discussion context, making it appear as if you didn't address the reviewer's specific concern.

**The Fix:**
Use the correct REST endpoint with the numeric comment ID in the URL path:

```bash
# CORRECT! This replies to the specific review thread
gh api -X POST \
  repos/$OWNER/$REPO/pulls/$NUMBER/comments/$COMMENT_ID/replies \
  -f body="Your response text"
```

**Key Details:**

- Use the numeric `comment_id` (e.g., `2833510930`), NOT the node ID (e.g., `PRRC_kwDO...`)
- The ID goes in the URL **path**, not as a body parameter
- No `-f in_reply_to=<id>` parameter needed—that's not valid

#### ❌ WRONG: Using `in_reply_to` as a Body Parameter

**The Problem:**

```bash
# WRONG! -f in_reply_to=<id> is not a valid parameter
gh api -X POST repos/$OWNER/$REPO/pulls/$NUMBER/comments \
  -f in_reply_to=$COMMENT_ID \
  -f body="Response"
```

**The Fix:**
The ID goes in the **URL path**, not the request body:

```bash
# CORRECT! ID is part of the endpoint URL
gh api -X POST \
  repos/$OWNER/$REPO/pulls/$NUMBER/comments/$COMMENT_ID/replies \
  -f body="Response"
```

#### Why This Matters

Review thread replies:

1. **Stay attached** to the original comment they're replying to
2. **Preserve context** — the thread shows as a conversation
3. **Allow resolution** — threads can be marked resolved/unresolved
4. **Notify the reviewer** — they see a direct response to their feedback

Top-level PR comments (created by `gh pr comment`):

1. Are **disconnected** from the thread
2. Appear in the main PR timeline, not in the thread
3. Don't resolve the thread
4. Can be confusing when there are multiple threads on the same file

#### Fallback Strategy If API Methods Fail

If you try GraphQL `addPullRequestReviewThreadReply` mutation and it fails:

- **ALWAYS fall back to the REST `/replies` endpoint** (shown above)
- **NEVER fall back to `gh pr comment`** — this defeats the purpose

```bash
# Attempt GraphQL (may fail if mutation is named differently)
gh api graphql -f query='
  mutation {
    addPullRequestReviewThreadReply(input: {...}) {
      reply { id }
    }
  }
' || {
  # If GraphQL fails, use REST endpoint
  echo "GraphQL failed, using REST endpoint..."
  gh api -X POST \
    repos/$OWNER/$REPO/pulls/$NUMBER/comments/$COMMENT_ID/replies \
    -f body="Response"
}
```

## Performance Optimization

### Pagination for Large PRs

```bash
# Instead of --paginate for all comments (slow)
# Use --paginate with filtering

gh api repos/$OWNER/$REPO/pulls/$NUMBER/comments \
  --paginate \
  --jq '.[] | select(.created_at > "2024-01-01")'
```

### Batch GraphQL Queries

```bash
# Instead of multiple separate queries, combine into one

gh api graphql -f query='
  query {
    pr1: repository(owner: "owner", name: "repo1") {
      pullRequest(number: 1) {
        reviewThreads(first: 10) {
          edges { node { id, isResolved } }
        }
      }
    }
    pr2: repository(owner: "owner", name: "repo2") {
      pullRequest(number: 2) {
        reviewThreads(first: 10) {
          edges { node { id, isResolved } }
        }
      }
    }
  }
'
```

### Cache Results When Appropriate

```bash
# For scripts that might run multiple times
CACHE_FILE="/tmp/pr_comments_$PR_NUMBER.json"

if [ -f "$CACHE_FILE" ]; then
  # Use GNU stat on Linux (-c %Y) or BSD/macOS stat (-f %m)
  if stat --version >/dev/null 2>&1; then
    CACHE_MTIME=$(stat -c %Y "$CACHE_FILE")
  else
    CACHE_MTIME=$(stat -f %m "$CACHE_FILE")
  fi
else
  CACHE_MTIME=0
fi

CACHE_AGE=$(($(date +%s) - CACHE_MTIME))

if [ $CACHE_AGE -lt 300 ]; then  # 5 minute cache
  cat "$CACHE_FILE"
else
  gh api repos/$OWNER/$REPO/pulls/$NUMBER/comments > "$CACHE_FILE"
  cat "$CACHE_FILE"
fi
```

## Summary

**GitHub CLI** is the primary tool for most operations:

- Install: `brew install gh`
- Authenticate: `gh auth login`
- Fetch comments: `gh api repos/{owner}/{repo}/pulls/{number}/comments`
- Reply: `gh api -X POST repos/...comments/{id}/replies -f body="text"`
- Resolve: `gh api graphql -f query='mutation { resolveReviewThread(...) }'`

**Always test locally** before deploying automation scripts to ensure they handle errors gracefully.
