# Create Jira Issue

Draft, preview, and file a DS-project Jira Story with the team's required structure, avoiding this Jira instance's known wiki-markup corruption bugs.

## Usage

```text
/spirit:create-jira-issue
```

Use when you need to:

- File a new Jira Story in the DS project for a piece of work you've been discussing or analyzing
- Turn an architectural analysis or design discussion into a properly structured ticket
- Avoid re-learning this Jira instance's Markdown-to-wiki-markup corruption bugs from scratch

## What It Does

1. Looks up similar recent DS Story tickets to confirm the template hasn't drifted
2. Determines the right epic to link to from a sibling ticket's Epic Link field
3. Drafts the description: a WHO/WHAT/WHY opening, max-5-bullet outcome-based acceptance criteria, and detailed implementation notes
4. Shows the full draft for review before writing anything
5. Creates the issue and links the epic, verifying the epic link actually took
6. Writes in real Jira wiki markup and works around known corruption bugs (numbered lists, bold-leading bullets, angle brackets, double underscores in code blocks)
7. Re-fetches the stored content after every write to confirm it rendered correctly — the tool's own response is not reliable for this

## Description Format

| Section                  | Content                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Opening**              | `*WHO:*`/`*WHAT:*`/`*WHY:*` three labeled lines — no heading                                         |
| **Acceptance criteria**  | Max 5 bullets, measurable outcomes only — never CI/lint/test (that's a merge gate, not a criterion)  |
| **Implementation notes** | What exists today (evidence), model to draw from (prose, no invented API), references, scope bullets |

## Key Principles

- **WHO/WHAT/WHY is mandatory.** Every ticket opens with three labeled lines: `*WHO:*`, `*WHAT:*`, `*WHY:*`.
- **Each ticket is an isolated problem.** Dependencies go through Jira issue links, not prose.
- **Acceptance criteria measure success, not process.** No CI-obvious items.
- **Don't invent an API you haven't designed yet.** Cite prior art in prose instead.

## Good vs Bad Examples

|                         | Description                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------- |
| ❌ CI as criterion      | "yarn lint and yarn test pass."                                                    |
| ✅ Outcome as criterion | "Combobox's inline filtering hides non-matching options without scanning the DOM." |
| ❌ Breaks in Jira       | `* *Bold text.* rest...` — corrupts on save.                                       |
| ✅ Survives in Jira     | `* Plain text first, *bold* later if needed.`                                      |

## See Also

- **SKILL.md** — Complete workflow with all steps, the wiki-markup gotcha list, and template reference
- **references/wiki-markup-cheatsheet.md** — Full Jira wiki markup syntax reference plus the known corruption-bug table
- Related skill: `/spirit:create-pr` — For opening the PR once the implementation is done
