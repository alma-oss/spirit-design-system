---
name: spirit:create-pr
description: Create or update a GitHub PR for the current branch. Drafts a short why-first description from branch changes and conversation context, asks for any missing info (issue URL, draft status), then creates or updates the PR via gh CLI.
---

# Create PR

Create or update a GitHub pull request for the current branch. Gather context, draft a reviewer-focused description, fill gaps interactively, then apply via `gh` CLI.

## Principles

- **Lead with why, not what.** The reviewer can read the diff. Explain the problem or context that drove the change.
- **Be short and sharp.** The description should let a reviewer orient themselves in under 30 seconds.
- **Help reviewers, not bots.** Add links, edge-case notes, and anything that speeds up review — not summaries of what the code does.
- **Follow the template.** Use `.github/PULL_REQUEST_TEMPLATE.md` as the structural skeleton.
- **No AI attribution.** Do not add "Generated with Claude Code" or similar.

---

## Workflow

### Step 1: Gather Context

Run these in parallel:

```bash
git log main..HEAD --oneline
git diff main..HEAD -- . ':(exclude)*.lock'
gh pr view --json number,title,body,url,state 2>/dev/null || echo "NO_PR"
```

Also note from the current conversation: what problem did the user describe? What was decided and why? Any Jira IDs, links, or constraints mentioned?

Extract the Jira issue ID from:

1. Branch name (e.g. `feat/DS-123-...` → `DS-123`)
2. Commit messages (`#DS-XXX` suffix)
3. Conversation context

### Step 2: Check PR State

**If a PR exists:**

- Read its current `body`.
- Identify what is missing or stale:
  - Is the Description section empty or just a what-summary?
  - Is the Additional context section missing something reviewers need?
  - Is the Issue reference a placeholder or missing?
- Note the gaps — you will fill them in the draft.

**If no PR exists:**

- You will create one. Derive the PR title from the branch name or top commit:
  - Format: `type(scope): description` (all lowercase, max 100 chars — see [git-workflow.md](.agents/instructions/git-workflow.md))
  - Wrap component names in backticks (e.g. `` `Button` ``)

### Step 3: Ask for Missing Issue URL

If no Jira issue ID was found (branch, commits, and conversation all lack one), use `AskUserQuestion` to ask:

> "What is the Jira issue URL for this PR? (e.g. https://jira.almacareer.tech/browse/DS-XXXX) — or type 'none' to skip."

Do not proceed to drafting until you have the answer.

### Step 4: Draft the Description

Fill the PR template sections:

**Description** (required, 2–5 sentences max):

- First sentence: the _problem or gap_ that made this change necessary.
- Second sentence: what was changed and why that specific approach was chosen over alternatives.
- Optional third sentence: a non-obvious trade-off, constraint, or follow-up that is out of scope.

**Additional context** (optional):

- Include only if there is something specific reviewers should scrutinize: a tricky edge case, a deliberate deviation from convention, a dependency on another PR, a screenshot link, or a follow-up that is intentionally deferred.
- If referencing Storybook, Figma, or a demo URL — add it here.
- Omit the section entirely if there is nothing worth flagging.

**Issue reference**:

- Full Jira URL: `https://jira.almacareer.tech/browse/DS-XXXX`
- If none, leave the placeholder comment as-is.

### Step 5: Present for Review

Use `AskUserQuestion` with the following questions:

1. A single-select for the description. Set the full draft as the `preview` of the first option so it renders side-by-side with the choices:
   - **Apply it** (preview: full draft text) — create or update the PR with this description
   - **Edit first** — user will provide changes, then re-apply
   - **Discard** — do not touch the PR

2. _(Only when no PR exists)_ A single-select asking whether to create a draft PR:
   - **No** — publish immediately (default)
   - **Yes** — create as draft

The preview field renders markdown — format the draft exactly as it will appear in the PR body.

### Step 6: Create or Update the PR

**If PR already exists**, update its body:

```bash
gh pr edit <number> --body "$(cat <<'EOF'
<approved description>
EOF
)"
```

**If no PR exists**, create it:

```bash
gh pr create \
  --title "<derived title>" \
  --body "$(cat <<'EOF'
<approved description>
EOF
)" \
  --base main
```

Add `--draft` if the user answered **Yes** to the draft question in Step 5.

After the command succeeds, print the PR URL.

---

## Template Reference

```markdown
<!-- Thank you for contributing! -->

## Description

{why the change was needed; what was changed and why that approach}

### Additional context

{links, edge cases, Figma/Storybook URLs, deferred follow-ups — omit if nothing to add}

### Issue reference

{full Jira URL, e.g. https://jira.almacareer.tech/browse/DS-XXXX}
```

---

## Good vs Bad Examples

|                     | Description                                                                                                                                                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ❌ **What-focused** | "Adds an explicit ordering rule and a counter-example to the finding format section."                                                                                                                                      |
| ✅ **Why-focused**  | "Copilot was placing suggestion blocks after the explanation despite the instructions saying to put them first — the rule was buried in a dependent clause with no negative example to reinforce it."                      |
| ❌ **What-focused** | "Moves Figma code connect definitions into story files."                                                                                                                                                                   |
| ✅ **Why-focused**  | "Figma code connect and Storybook stories share the same component metadata — keeping them in separate files caused drift and duplicated prop mappings. Co-locating them in the story file makes both easier to maintain." |

Keep the description to the point. If you find yourself listing more than three bullet points, focus on the top-level intent instead.
