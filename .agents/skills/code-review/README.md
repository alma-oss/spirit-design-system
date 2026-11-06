# Spirit Code Review

A first-pass code review grounded in how Spirit maintainers actually review. It combines general
checks (bugs, security, silent failures, type design, simplification) with a Spirit checklist built
from human review comments, filtered against what CI and linters already enforce, so the review flags
what humans keep asking for and stays quiet on the rest. The recurring feedback is logged in the root
[`REVIEW.md`][review-md], which the review reads, and the [`spirit:review-feedback`][review-feedback]
skill keeps it current.

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
| `--cli`, `--ci`           | Force the review context (see below); detected by default             |
| `--post`                  | Post the review to the PR as a single `COMMENT` review (PR mode only) |
| `--conventional-comments` | Prefix findings with Conventional Comments labels                     |
| `--output <file>`         | Also write the report to a Markdown file                              |

Without `--post`, nothing leaves your machine: the review is printed in the terminal.

### Review Context

The context decides how findings are rendered, not what is found. It is detected automatically, so you
normally do not pass a flag:

| Context | Detected when                                             | Rendering                                                                                                                 |
| ------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| CLI     | Default, for a developer running the review locally       | Markdown grouped by file, each finding with `File:`, `Fix:`, and `Why:`                                                   |
| CI      | `CI` or `GITHUB_ACTIONS` is `true`, or `--post` is passed | Comments attached to code lines (`File:` kept when not posted), with a suggestion fence and a collapsed `<details>` block |

Use `--cli` or `--ci` to override the detection, for example `--ci` to preview locally how a posted
review will look. The CI rendering follows the template in `.github/copilot-instructions.md`.

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

The verdict is shown with an icon (✅ APPROVE, 🟡 COMMENT, ❌ REQUEST CHANGES) and is a recommendation. With `--post`, the skill always submits a `COMMENT` review and
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
└── references/
    ├── methodology.md                      # severity, finding fields, what not to report, verdicts
    ├── checklist.md                        # general checks, Spirit areas, what tooling already enforces
    └── review-output-templates.md          # CLI and CI rendering, writing style, verdict templates
```

The skill also reads the root [`REVIEW.md`][review-md]. Deeper knowledge is reused from existing skills
rather than copied: `spirit:accessibility`, `spirit:breaking-change-checklist`,
`spirit:component-deprecation`, `spirit:stabilize-component`, `spirit:docsite-composition`, and
`spirit:docsite-styles` are loaded when matching files change.

## Keeping It Current

Review habits and tooling change. The [`spirit:review-feedback`][review-feedback] skill mines merged
PRs, logs new themes in `REVIEW.md`, and every month or two promotes stable themes into
`references/checklist.md`. When a new lint rule or CI check lands, move the theme it covers to
"Already Enforced by Tooling" in the checklist.

## Related Skills

- [`spirit:review-feedback`][review-feedback] — the feedback loop behind `REVIEW.md` and the checklist.
- [`spirit:accept-jira-issue`][accept-jira-issue] — Jira access, acceptance criteria extraction, and deploy preview checks are reused from it.
- [`spirit:conventional-comments`][conventional-comments] — the optional label overlay.
- [`spirit:address-review-comments`][address-review-comments] — responding to review feedback as the author.

[accept-jira-issue]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/accept-jira-issue/README.md
[address-review-comments]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/address-review-comments/README.md
[ai-agents]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/contribution/ai-agents.md
[conventional-comments]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/conventional-comments/README.md
[review-feedback]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/review-feedback/README.md
[review-md]: https://github.com/alma-oss/spirit-design-system/blob/main/REVIEW.md
