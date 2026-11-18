---
name: spirit:create-jira-issue
description: Draft, preview, and file a DS-project Jira Story with the team's required structure (WHO/WHAT/WHY opening, measurable acceptance criteria, detailed implementation notes) through the Atlassian MCP, and verify the stored result.
---

# Create Jira Issue

Draft a DS-project Jira Story, preview it for approval, file it through the Atlassian MCP on
`almacareer.atlassian.net` (Jira Cloud), set its epic, and re-read what Jira actually stored.

Operations that are not primary tools (`createJiraIssueLink`, `uploadAttachmentToJiraIssue`) are found with
`discover` and run with `executeWrite`. Jira Cloud's `cloudId` is `almacareer.atlassian.net`.

## Principles

- **WHO/WHAT/WHY opening is mandatory.** The description opens with three labeled lines — no "Premise" heading, just:
  ```markdown
  **WHO:** As a [persona],  
  **WHAT:** I want to [X],  
  **WHY:** So that [Y].
  ```
  This scans faster than a single run-on sentence. End the first two lines with two trailing spaces so each stays
  on its own line.
- **Treat each ticket as an isolated problem.** Don't narrate its relationship to other tickets in the prose. Express dependencies via Jira issue links (`createJiraIssueLink`), not sentences like "this unblocks ticket X."
- **Acceptance criteria stay short and clear.** Max 5 bullets, phrased as "how do I measure this is done," in plain language a non-engineer stakeholder can skim. Never include "tests pass" / "lint passes" — that's already a merge gate, not a criterion.
- **Don't prescribe an API that hasn't been designed yet.** If the concrete shape (function signatures, type interfaces) is part of the ticket's own work, describe capabilities and cite external prior art instead of inventing code blocks that look decided. Only write out concrete signatures if the user has actually agreed on them in conversation first — never default to inventing one.
- **Implementation notes carry the depth — gate the structure on actual complexity, not habit.** If the work is simple enough to explain in a flat list, use one `## Implementation notes` with up to ~5 plain bullets — don't manufacture sub-headings to fill a template. If the work genuinely spans multiple files/layers, draws on external prior art, or needs to separate current-state from approach from scope, split into `###` sub-headings: "What exists today" (evidence, file references), "Model to draw from" (the reasoning/prior art being drawn from), and "Scope of the work" (explicit bullets). Judge which shape fits from what you actually know about the work — don't default to the heavier one just because it's more thorough-looking.
- **References are opt-in, not a template fixture.** Only add a References list of external links when prior art genuinely changes how someone would implement this — verify every link actually resolves (fetch/open it) before including it, never paste an unverified URL. Skip it entirely for internal-only or straightforward work.
- **Always preview before writing.** Show the full drafted text to the user before calling `createJiraIssue` or `editJiraIssue`. Iterate until approved.

---

## Workflow

### Step 1: Look Up Precedent

Search for similar recent tickets so the template hasn't silently drifted from what's documented here:

```text
searchJiraIssuesUsingJql { jql: "project = DS AND issuetype = Story ORDER BY created DESC", maxResults: 5 }
```

Or a summary-keyword search for the specific area. Read 1-2 similar tickets with `getJiraIssue` before drafting.

### Step 2: Determine the Epic

Find a related sibling ticket and read its `parent` rather than guessing which epic to attach to. On Jira Cloud
the epic is the issue's `parent`. The `Epic Link` custom field also shows up in the issue, but it only mirrors
`parent` — never write it. If the siblings have no epic, file without one and say so.

### Step 3: Draft the Description

Follow the Principles above. Structure:

1. Opening: `**WHO:**`/`**WHAT:**`/`**WHY:**` three labeled lines, per the Principles above.
2. `## Acceptance criteria` — max 5 bullets, outcomes only, short and plain-language.
3. `## Implementation notes` — pick the shape based on complexity:
   - **Simple/single-area work:** a flat list of up to ~5 plain bullets under `## Implementation notes`.
   - **Substantial/multi-file/prior-art-dependent work:** `###` sub-headings for "What exists today" (evidence, file references), "Model to draw from" (the reasoning/prior art being drawn from), and "Scope of the work" (explicit bullets).

   Add a `References` list only when external prior art actually changes the implementation approach.

Keep Acceptance Criteria short enough to scan at a glance — push depth and detail into Implementation Notes instead.

### Step 4: Present for Review

Show the full drafted text, in the exact Markdown it will be submitted as, before writing anything. Iterate on the draft until the user approves it.

### Step 5: Create the Issue

```text
createJiraIssue {
  projectKey: "DS", issueType: "Story", summary: "<summary>",
  description: "<approved draft>",
  parent: "<epic key from Step 2, omit when there is none>"
}
```

`description` is Markdown by default and is converted to Jira's document format. Link related tickets afterwards
with `createJiraIssueLink` (run via `executeWrite`; `discover` it for the exact inputs and use
`listJiraIssueLinkTypes` for valid link type names, e.g. `Relates`, `Blocks`).

### Step 6: Verify What Was Stored

The response is not proof. Re-read the issue with `getJiraIssue` (`view: "evidence"`) and check:

- the description reads back as written (headings, bullets, the WHO/WHAT/WHY line breaks),
- `parent` holds the epic, when one was set,
- `issuelinks` holds the links you created.

Fix a mismatch with `editJiraIssue` (fields are set, not appended) and read it again.

### Step 7: Report Back

Give the direct issue URL(s) and summarize any issue-link relationships created (e.g. "Blocks" / "is blocked by").

---

## Formatting Notes

Jira Cloud stores the description as a rich document converted from Markdown. Write plain Markdown:
`##`/`###` headings, `*` or `-` bullets, `1.` numbered lists, `**bold**`, backtick `code`, fenced code blocks.
Do **not** write Jira wiki markup (`h2.`, `{code}`, `{{mono}}`) — each of these is stored as literal text.

Checked on Cloud with probe edits and a throwaway ticket: numbered lists stay lists, bold at the start of a
bullet survives, `Node<T>` and `hooks/<pattern>/` are stored unchanged, `__tests__` survives both inline and in
a code block, and `parent`, an issue link and an attachment all read back as written. The pitfalls of the old
Jira Server instance no longer apply.

- **Nested bullets** come back with extra indentation. Prefer a flat list.
- **Comments** are a different format: post them with `addOrEditJiraIssueComment` and `contentFormat: "html"`
  (see the acceptance comment template in `accept-jira-issue`). A comment can be edited in place with its `commentId`.
- **Attachments** go through `uploadAttachmentToJiraIssue` in two phases: call it with `filePath` only to get an
  `uploadCommand`, run that command in the shell to get a `fileId`, then call it again with the `fileId` to attach
  the file. To embed the file inline instead, stop after phase one and pass the `fileId` to `editJiraIssue` as
  `inlineFileId` — do not also run phase two.

---

## Template Reference

Shared opening and acceptance criteria (always the same):

```markdown
**WHO:** As a [persona],  
**WHAT:** I want to [X],  
**WHY:** So that [Y].

## Acceptance criteria

- [outcome 1]
- [outcome 2]
- ...(max 5)
```

Implementation notes — pick one shape based on how complex the work actually is:

**Simple/single-area work** — flat bullets, no sub-headings:

```markdown
## Implementation notes

- [evidence, file references]
- [what changes and why]
- ...(up to ~5)
```

**Substantial/multi-file/prior-art-dependent work** — `###` sub-headings:

```markdown
## Implementation notes

### What exists today

- [evidence, file references]

### Model to draw from

[external prior art, prose only, no invented API]

References (only if prior art changes the approach):

- [verified links]

### Scope of the [refactor/work]

- [work items]
```

---

## Good vs Bad Examples

|                             | Description                                                                                                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ❌ **Wrong persona**        | `**WHO:** As a user,` — vague, and this is internal tooling work with no end-user-facing behavior.                                                                                                |
| ✅ **Concrete persona**     | `**WHO:** As a design system engineer maintaining Picker and Combobox, **WHAT:** I want a Collection abstraction, **WHY:** So that today's option resolution stops being fragile and duplicated.` |
| ❌ **CI as criterion**      | Acceptance criteria bullet: "yarn lint and yarn test pass."                                                                                                                                       |
| ✅ **Outcome as criterion** | "Combobox's inline filtering hides non-matching options without scanning the DOM to determine what's currently visible."                                                                          |
| ❌ **Invented API**         | A code block declaring an interface for a hook that hasn't been designed yet.                                                                                                                     |
| ✅ **Prose reference**      | "react-stately solves this with a builder producing a stable tree of nodes... this is the reference model, not a spec to copy — the concrete API is this ticket's design work."                   |
| ❌ **Old wiki markup**      | `h2. Acceptance criteria` — stored as literal text on Cloud.                                                                                                                                      |
| ✅ **Markdown**             | `## Acceptance criteria` — stored as a real heading.                                                                                                                                              |
