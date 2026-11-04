# Spirit Code Review

A first-pass code review grounded in how Spirit maintainers actually review. The checklist comes
from an analysis of 200 merged PRs and their 1,830 human review comments, filtered against what CI
and linters already enforce, so the review flags what humans keep asking for and stays quiet on the
rest.

## How to Run

Invoke the skill from Claude Code or Cursor in the repository root:

```text
/spirit:code-review                     # auto-detect: open PR → branch → staged → unstaged
/spirit:code-review 3058                # review a GitHub PR (also #3058 or the PR URL)
/spirit:code-review --local             # current branch vs origin/main
/spirit:code-review --staged            # staged changes only
/spirit:code-review --diff changes.diff # a unified diff file
```

| Flag                      | Effect                                                                |
| ------------------------- | --------------------------------------------------------------------- |
| `--base <ref>`            | Base for `--local` (default `origin/main`)                            |
| `--post`                  | Post the review to the PR as a single `COMMENT` review (PR mode only) |
| `--conventional-comments` | Prefix findings with Conventional Comments labels                     |
| `--output <file>`         | Also write the report to a Markdown file                              |

Without `--post`, nothing leaves your machine: the review is printed in the terminal.

## Setup

- **GitHub CLI** authenticated (`gh auth status`) for PR mode and `--post`. Local modes need only `git`.
- **Network access to Netlify** (optional) in PR mode, to check behavior the PR promises (an HTTP
  status, what renders) on its deploy preview. Without it, the review adds a warning.
- **Jira MCP server** (optional) to check the change against the issue's acceptance criteria:
  missing, partly done, or implemented differently than asked. See the
  [AI Agent Setup Guide][ai-agents] for MCP configuration. Without it, the review checks only the
  PR title and description, and notes that acceptance criteria were not checked.

## What You Get

A report with:

1. **Review Brief** — mode, intent, Jira issue with how many criteria are met, partial, or missing,
   and which checklist areas were applied.
2. **Findings** grouped by file, each with a severity (`blocking`, `important`, `minor`,
   `question`, `note`), the location, and a `Fix:` followed by a `Why:`. Repeated problems are
   reported once with the other locations listed.
3. **Already reported** findings (PR mode) that match existing review comments.
4. **Summary table**, a recommended **verdict** (APPROVE, COMMENT, or REQUEST CHANGES), and
   **warnings** about anything that could not be checked.

The verdict is a recommendation. With `--post`, the skill always submits a `COMMENT` review and
never approves or requests changes on its own.

## Using It in CI

The skill never prompts and takes all input from arguments, so it runs unattended. A GitHub Action
can check out the PR, then run the agent with `/spirit:code-review <pr> --post` (or `--diff <file>`
when GitHub API access is restricted, combined with `--output` to upload the report as an artifact).

## How It Is Built

```text
.agents/skills/code-review/
├── SKILL.md                                # process: inputs, area selection, review, report, post
├── README.md                               # this file
├── references/
│   ├── methodology.md                      # severity, finding format, what not to report, verdicts
│   ├── checklist.md                        # what to look for, by area, with default severities
│   └── review-history-analysis.md          # evidence: themes, PR counts, what tooling already enforces
└── scripts/
    └── mine-review-history.mjs             # refreshes the analysis data from GitHub
```

Deeper knowledge is reused from existing skills rather than copied: `spirit:accessibility`,
`spirit:breaking-change-checklist`, `spirit:component-deprecation`, `spirit:stabilize-component`,
`spirit:docsite-composition`, and `spirit:docsite-styles` are loaded when matching files change.

## Keeping It Current

Review habits and tooling change. To refresh the checklist:

1. Run `node .agents/skills/code-review/scripts/mine-review-history.mjs --limit 200 --out /tmp/review-history`.
2. Cluster the comments in `/tmp/review-history/comments.md` and update
   `references/review-history-analysis.md`.
3. Add, change, or remove items in `references/checklist.md`.
4. When a new lint rule or CI check lands, move the theme it covers to the "Already Enforced" table
   and remove it from the checklist.

## Related Skills

- [`spirit:conventional-comments`][conventional-comments] — the optional label overlay.
- [`spirit:address-review-comments`][address-review-comments] — responding to review feedback as the author.

[address-review-comments]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/address-review-comments/README.md
[ai-agents]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/contribution/ai-agents.md
[conventional-comments]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/conventional-comments/README.md
