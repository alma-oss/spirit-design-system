# Create PR

Create or update a GitHub pull request for the current branch with a reviewer-focused, why-first description.

## Usage

```text
/spirit:create-pr
```

Use when you need to:

- Open a new pull request for the current branch
- Update an existing PR description that is missing context or is what-focused
- Ensure the PR body follows the project template and links the right Jira issue

## What It Does

1. Gathers branch diff, commit history, and any existing PR body in parallel
2. Extracts the Jira issue ID from the branch name, commits, or conversation context
3. Asks for the Jira URL interactively if none is found
4. Drafts a description that leads with the _problem_, then the approach and any trade-offs
5. Shows the draft side-by-side for review before touching anything
6. Creates (`gh pr create`) or updates (`gh pr edit`) the PR

## Description Format

The PR body follows `.github/PULL_REQUEST_TEMPLATE.md`:

| Section                | Content                                                                           |
| ---------------------- | --------------------------------------------------------------------------------- |
| **Description**        | Why the change was needed; what was changed and why that approach (2–5 sentences) |
| **Additional context** | Edge cases, Figma/Storybook links, deferred follow-ups — omit if nothing to add   |
| **Issue reference**    | Full Jira URL, e.g. `https://jira.almacareer.tech/browse/DS-XXXX`                 |

## Key Principles

- **Lead with why, not what.** The reviewer can read the diff.
- **Be short and sharp.** Orient a reviewer in under 30 seconds.
- **No AI attribution.** Do not add "Generated with Claude Code" or similar.

## Good vs Bad Examples

|                 | Description                                                                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ❌ What-focused | "Adds an explicit ordering rule and a counter-example to the finding format section."                                                                                                                 |
| ✅ Why-focused  | "Copilot was placing suggestion blocks after the explanation despite the instructions saying to put them first — the rule was buried in a dependent clause with no negative example to reinforce it." |

## See Also

- **SKILL.md** — Complete workflow with all steps and template reference
- Related skill: `/spirit:address-review-comments` — For responding to reviewer feedback after the PR is open
