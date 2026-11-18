# Create Jira Issue

Draft, preview, and file a DS-project Jira Story with the team's required structure through the Atlassian MCP, and verify what Jira Cloud stored.

## Usage

```text
/spirit:create-jira-issue
```

Use when you need to:

- File a new Jira Story in the DS project for a piece of work you've been discussing or analyzing
- Turn an architectural analysis or design discussion into a properly structured ticket

## What It Does

1. Looks up similar recent DS Story tickets to confirm the template hasn't drifted
2. Determines the epic from a sibling ticket's `parent` (many DS tickets have none)
3. Drafts the description in Markdown: a WHO/WHAT/WHY opening, max-5-bullet outcome-based acceptance criteria, and detailed implementation notes
4. Shows the full draft for review before writing anything
5. Creates the issue with `createJiraIssue`, sets the epic as `parent` and adds issue links with `createJiraIssueLink`
6. Re-reads the stored issue to confirm the description, parent and links — the write response is not proof

## Description Format

| Section                  | Content                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Opening**              | `**WHO:**`/`**WHAT:**`/`**WHY:**` three labeled lines — no heading                                   |
| **Acceptance criteria**  | Max 5 bullets, measurable outcomes only — never CI/lint/test (that's a merge gate, not a criterion)  |
| **Implementation notes** | What exists today (evidence), model to draw from (prose, no invented API), references, scope bullets |

## Key Principles

- **WHO/WHAT/WHY is mandatory.** Every ticket opens with three labeled lines.
- **Each ticket is an isolated problem.** Dependencies go through Jira issue links, not prose.
- **Acceptance criteria measure success, not process.** No CI-obvious items.
- **Don't invent an API you haven't designed yet.** Cite prior art in prose instead.
- **Write Markdown.** Jira Cloud converts it to its document format.

## Good vs Bad Examples

|                         | Description                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------- |
| ❌ CI as criterion      | "yarn lint and yarn test pass."                                                    |
| ✅ Outcome as criterion | "Combobox's inline filtering hides non-matching options without scanning the DOM." |

## See Also

- **SKILL.md** — Complete workflow with all steps, formatting notes, and template reference
- Related skill: `/spirit:accept-jira-issue` — Validating a finished ticket against its acceptance criteria
- Related skill: `/spirit:create-pr` — For opening the PR once the implementation is done
