---
name: spirit:create-jira-ticket
description: Draft, preview, and file a DS-project Jira Story with the team's required structure (persona/goal/reason, measurable acceptance criteria, detailed implementation notes) and avoid this Jira instance's known wiki-markup corruption bugs.
---

# Create Jira Ticket

Draft a DS-project Jira Story, preview it for approval, file it via the `jira` MCP tools, link it to the right epic, and verify the actual stored formatting — because this Jira instance's Markdown-to-wiki-markup conversion silently corrupts specific, recurring patterns.

## Principles

- **Persona/goal/reason opening is mandatory.** The description's first paragraph is "As a [persona], I want [X] because [Y]" — no "Premise" heading, just the sentence itself.
- **Treat each ticket as an isolated problem.** Don't narrate its relationship to other tickets in the prose. Express dependencies via Jira issue links (`jira_create_issue_link`), not sentences like "this unblocks ticket X."
- **Acceptance criteria are outcomes, not tasks.** Max 5 bullets, phrased as "how do I measure this is done." Never include "tests pass" / "lint passes" — that's already a merge gate, not a criterion.
- **Don't prescribe an API that hasn't been designed yet.** If the concrete shape (function signatures, type interfaces) is part of the ticket's own work, describe capabilities and cite external prior art instead of inventing code blocks that look decided.
- **Implementation notes carry the depth.** Evidence of current behavior (with file references), the model/reference being drawn from, explicit scope bullets, and a References list of external links when relevant — verify every link via WebSearch/context7 before including it, never paste an unverified URL.
- **Always preview before writing.** Show the full drafted text to the user before calling `jira_create_issue` or `jira_update_issue`. Iterate until approved.

---

## Workflow

### Step 1: Look Up Precedent

Search for similar recent tickets so the template hasn't silently drifted from what's documented here:

```
jira_search(jql="project = DS AND issuetype = Story ORDER BY created DESC", limit=5)
```

Or a summary-keyword search for the specific area. Read 1-2 similar tickets via `jira_get_issue` before drafting.

### Step 2: Determine the Epic Link

Find a related sibling ticket and read its `customfield_12151` value rather than guessing which epic to attach to.

### Step 3: Draft the Description

Follow the Principles above. Structure:

1. Opening paragraph: "As a [persona], I want [X] because [Y]."
2. `h2. Acceptance criteria` — max 5 bullets, outcomes only.
3. `h2. Implementation notes` — `h3.` sub-headings for "What exists today" (evidence), "Model to draw from" (external prior art, prose only — no invented API), a `References` list (verified links only), and "Scope of the [refactor/work]" (explicit bullets).

Keep the description short enough to scan — push depth into Implementation Notes, not length into Acceptance Criteria.

### Step 4: Present for Review

Show the full drafted text, in the exact Jira wiki markup it will be submitted as, before writing anything. Iterate on the draft until the user approves it.

### Step 5: Create the Issue

```
jira_create_issue(project_key="DS", summary="<summary>", issue_type="Story", description="<approved draft>")
```

Then link the epic:

```
jira_link_to_epic(issue_key="<new key>", epic_key="<epic from Step 2>")
```

**Verify it actually took** — re-read `customfield_12151` via `jira_get_issue`. This call has silently reported success while leaving the field `null`; do not assume success from the response alone.

### Step 6: Apply the Jira Wiki-Markup Gotchas

This is the load-bearing section of this skill — every rule below was learned the hard way by watching the actual stored output, not by reading documentation.

- **Write real Jira wiki markup, not Markdown.** `h2.`/`h3.` headings, `*bold*`, `{{monospace}}`, `{code}...{code}` blocks, `*` for every bullet.
- **Never start a bullet with bold immediately after the `*` marker.** `* *Bold text.* rest of sentence...` reliably corrupts into `_ _text*` garbage. Put emphasis later in the sentence, or skip it in bullets entirely.
- **Never use `#`-numbered lists.** They get converted into a sequence of full `h1.` headings instead of a numbered list. Use `*` bullets even for sequential steps.
- **Avoid generic angle-bracket notation** like `Node<T>` or `Collection<T>` — silently mangled to `Node[T]`. Describe types in prose instead ("a Node type parameterized by the item type").
- **Avoid double-underscore tokens** like `__tests__` inside `{code}` blocks — corrupted to `*tests*`. Restructure the code block or mention the path outside a code block instead.
- **Don't trust the tool's own response body.** `jira_add_comment`/`jira_update_issue` return a `body` field that is an unreliable lossy preview, not the real stored content. After every write, re-fetch with `jira_get_issue(fields="description")` or `fields="comment"` and read the actual stored text before telling the user it's correct.
- **There is no comment edit/delete tool.** A malformed comment can't be fixed in place — post a corrected new comment and note it supersedes the broken one, or ask the user to delete the bad one manually in the Jira UI.
- **Attachment-by-local-path is unreliable.** `jira_update_issue`'s `attachments` param can silently fail even on retry, or occasionally succeed despite reporting failure. Treat it as best-effort only — the durable fallback is pasting the full content as a comment.

### Step 7: Report Back

Give the direct issue URL(s) and summarize any issue-link relationships created (e.g. "Blocks" / "is blocked by").

---

## Template Reference

```
As a [persona], I want [X] because [Y].

h2. Acceptance criteria

* [outcome 1]
* [outcome 2]
* ...(max 5)

h2. Implementation notes

h3. What exists today

* [evidence, file references]

h3. Model to draw from

[external prior art, prose only, no invented API]

References:
* [verified links]

h3. Scope of the [refactor/work]

* [work items]
```

---

## Good vs Bad Examples

|                             | Description                                                                                                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ❌ **Wrong persona**        | "As a user, I want this to work." — vague, and this is internal tooling work with no end-user-facing behavior.                                                                  |
| ✅ **Concrete persona**     | "As a design system engineer maintaining Picker and Combobox, I want a Collection abstraction because today's option resolution is fragile and duplicated."                     |
| ❌ **CI as criterion**      | Acceptance criteria bullet: "yarn lint and yarn test pass."                                                                                                                     |
| ✅ **Outcome as criterion** | "Combobox's inline filtering hides non-matching options without scanning the DOM to determine what's currently visible."                                                        |
| ❌ **Invented API**         | A code block declaring `interface Collection<T> { getKeys(): ...; filter(fn): ...; }` for a hook that hasn't been designed yet.                                                 |
| ✅ **Prose reference**      | "react-stately solves this with a builder producing a stable tree of nodes... this is the reference model, not a spec to copy — the concrete API is this ticket's design work." |
| ❌ **Breaks in Jira**       | `* *Dual-mode builder.* Supports both...` — corrupts into `_ _Dual-mode builder.*` on save.                                                                                     |
| ✅ **Survives in Jira**     | `* Dual-mode builder -- supports both...` — plain bullet, no leading emphasis.                                                                                                  |
