---
name: spirit:release-notes
description: Generate human-readable Slack Canvas release notes for Spirit Design System. Use when the user asks to write, create, or generate release notes after a publish.
---

# Release Notes Generator

Generate a Slack-ready release notes document from the latest lerna publish, including a narrative summary, per-package changelog sections, notable omission warnings, and a "What's Next" section pulled from Jira.

## Principles

- **Human tone, not a changelog dump.** The summary paragraph should read like a newsletter, not a list of commit messages.
- **Only Features and Bug Fixes in the package sections.** Other sections are noise for consumers.
- **Warn, don't silently drop.** Flag anything potentially important that was filtered out.
- **Slack Canvas format.** Use Unicode emoji directly (not `:emoji:` codes). Use `#` for the document title, `##` for top-level sections, `###` for subsections (Features, Bug Fixes) — Canvas renders these as proper headers when pasted. Emoji mapping: 📢 loudspeaker, 🚀 rocket, 🎉 tada, 📦 package, 🔮 crystal ball, 🎯 dart, 💬 slack, 🐙 github.

---

## Workflow

### Step 1 — Identify the Latest Release

```bash
git log --format="%as %h%d %s" --tags --simplify-by-decoration | head -5
```

Find the most recent commit tagged as a release (tagged by lerna, commit message `chore(release): publish`). Note the date from the first column (`YYYY-MM-DD`) — this is the release date for the document title.

---

### Step 2 — Collect Changelog Data Per Package

For each of the 6 public packages, read the CHANGELOG.md and extract only the **latest version section** — the content between the first `## [X.Y.Z]` header and the second one:

| Package display name | npm package                    | CHANGELOG path                      |
| -------------------- | ------------------------------ | ----------------------------------- |
| Web React            | @alma-oss/spirit-web-react     | packages/web-react/CHANGELOG.md     |
| Web                  | @alma-oss/spirit-web           | packages/web/CHANGELOG.md           |
| Design Tokens        | @alma-oss/spirit-design-tokens | packages/design-tokens/CHANGELOG.md |
| Icons                | @alma-oss/spirit-icons         | packages/icons/CHANGELOG.md         |
| Codemods             | @alma-oss/spirit-codemods      | packages/codemods/CHANGELOG.md      |
| Analytics            | @alma-oss/spirit-analytics     | packages/analytics/CHANGELOG.md     |

**Skip a package** if its latest version section body contains only `Version bump only for package` — it had no real changes and should not appear in the release notes.

The GitHub compare URL is embedded in the `## [X.Y.Z](url)` header — extract it for the "Full changelog" link.

---

### Step 3 — Filter Sections and Collect Entries

From each package's latest section, keep only **Features** and **Bug Fixes**. Drop Documentation, Chores, Styles, Code Refactoring, Tests, Dependencies, Reverts (unless they qualify for the warning below).

For each kept entry:

- Strip the scope prefix (`**web-react:**`, `**web:**`, etc.) — keep only the description text.
- Keep the `#DS-XXXX` ticket reference.
- Keep the commit hash as a markdown link: `([abcdef1](https://github.com/alma-oss/spirit-design-system/commit/<full-hash>))` — use the 7-char short hash as display text and the full hash (from the CHANGELOG entry) as the URL.
- Wrap every **component name** (PascalCase, e.g. `Picker`, `ControlButton`, `UNSTABLE_File`) and every **hook/utility name** (camelCase with `use` prefix or similar, e.g. `useSelectionState`) in backticks.
- Wrap every **prop name** or **HTML attribute name** (e.g. `elementType`, `name`) in **bold** instead of backticks.
- Package names (e.g. `@alma-oss/spirit-web-react`) are always in backticks — including in the package header line.

---

### Step 3b — Warn About Notable Omissions

Before writing the file, scan the **dropped sections** for anything a developer should review before publishing. Flag entries matching these criteria:

- Any entry under **BREAKING CHANGES**
- Any **Code Refactoring** entry that mentions a component name, prop name, or public export
- Any **Reverts** of a feature that appeared in a previous release
- Any **Dependencies** bump that changes a peer dependency consumers declare

Print warnings to the terminal (not in the output file), one line each:

```text
⚠️  Possible omissions — review before publishing:
  [web-react] BREAKING CHANGES: remove deprecated `isDisabled` prop from Button
  [web] Code Refactoring: rename UNSTABLE_Attachment → UNSTABLE_File
```

If there are no warnings, print: `✅ No notable omissions detected.`

---

### Step 4 — Build Per-Package Blocks

Format each included package as:

```markdown
📦 **{Display Name} _{version}_** `{npm-package-name}`

### Features

- {description} {#DS-XXXX} ([{commithash}](https://github.com/alma-oss/spirit-design-system/commit/{full-hash}))

### Bug Fixes

- {description} ([{commithash}](https://github.com/alma-oss/spirit-design-system/commit/{full-hash}))

[Full changelog]({github-compare-url})
```

Where:

- `{Display Name}` is the human name (e.g. "Web React", "Design Tokens")
- `{version}` is the version number (e.g. 4.5.0)
- `{npm-package-name}` is the full scoped name (e.g. @alma-oss/spirit-web-react)
- The "Full changelog" line must use markdown link syntax `[Full changelog](url)` — bare URLs containing `@` (from scoped package names) break in Slack Canvas because `@` is interpreted as a mention
- Omit the Features or Bug Fixes section entirely if there are no entries for it

---

### Step 5 — Synthesize the General Changes Summary

Write 2–3 short paragraphs (not a list, not a single block of text) that summarize the release. Each paragraph covers one theme — e.g. new components, framework-specific additions, feature flags or breaking changes. Use a blank line between paragraphs.

- What was the overarching theme or focus?
- What are the 1–2 most impactful additions for consumers?
- If any UNSTABLE components were introduced or stabilized, mention it.
- If there are breaking changes or security improvements, call them out as a separate sentence or short paragraph — do not bury them.

**Tone of voice:**

- Use direct "we/you" address: "We've expanded…", "You can now…"
- Lead with what the release _enables_, not what was technically done: "makes it easier to manage responsive visibility" not "introduces Hidden component"
- Mention new props by name with backticks and explain what they unlock: "control vertical alignment in `Card` via the new `alignmentY` prop"
- Feature-flagged additions: "letting teams opt in early without breaking existing behavior"
- Enthusiastic but not marketing-speak — short exclamations are fine, superlatives are not

Do not restate every entry. Write for a developer who reads Slack and wants to know if this release matters to them.

---

### Step 6 — Fetch "What's Next" From Jira

Use the Jira MCP to find upcoming work:

1. `jira_get_agile_boards` — find the board for project key `DS`
2. `jira_get_sprints_from_board` — get the active sprint and the next sprint(s) (look for state `active` and `future`)
3. `jira_get_sprint_issues` — for each relevant sprint, fetch issues

From the issues, select only items that represent **user-visible new features or components** (new components, new props/variants, stabilization of UNSTABLE components). Skip infrastructure, testing, documentation, and tooling work.

Format as a bulleted list:

```markdown
- **{Component or Feature Name}**
  {One sentence describing what it is and why it matters to consumers.}
```

If no suitable items are found, write: `* More improvements are in the works — stay tuned!`

---

### Step 7 — Assemble the Full Document

Use this exact structure with Unicode emoji:

```markdown
# {YYYY-MM-DD} Spirit Design System Release Notes

📢 🚀 🎉 Ahoy, we have a new release with features and improvements. Here we go.

## General Changes

{2–4 sentence summary paragraph}

## News in Packages

{package blocks, with `&nbsp;` on a line by itself before each package emoji to force a visible empty line in Slack Canvas}

## What's Next 🔮

{bulleted Jira items}

🎯 You can see more of our [quarterly targets outlook in Notion](https://www.notion.so/almacareer/Spirit-DS-team-Quarterly-Goals-878e92d5b74543039e513c0160fb9117).

## We'd Love to Hear Your Feedback

💬 If you have any idea, suggestion or request regarding the newly introduced unstable components, or if you just need help or want to report a bug or wrong behavior, please get in touch with us on our Slack channel: [#spirit-design-system-support_cs_en](https://slack.com/archives/C068XPSDWQN).

&nbsp;

🐙 Everything is available in our [repository on GitHub](https://github.com/alma-oss/spirit-design-system/).

&nbsp;

Thank you for staying with us!
```

---

### Step 8 — Write the Output File

1. Ensure `.release-notes/` directory exists (create it if not).
2. Write the document to `.release-notes/release-notes-{YYYY-MM-DD}.md`.
3. Print the full file path to the terminal.
4. Remind the user to review the ⚠️ warnings (if any) before pasting into Slack Canvas.

---

## Output Example (Abbreviated)

```markdown
# 2026-04-13 Spirit Design System Release Notes

📢 🚀 🎉 Ahoy, we have a new release with features and improvements. Here we go.

## General Changes

This release brings significant expansion to form and file handling capabilities. ...

## News in Packages

📦 **Web React _4.5.0_** `@alma-oss/spirit-web-react`

### Features

- Add FieldDetails component #DS-2454 ([f4d21fc](https://github.com/alma-oss/spirit-design-system/commit/f4d21fc03e846a02768efebb805eab4e0ae2ce28))
- Introduce Picker component #DS-2359 ([9fd982e](https://github.com/alma-oss/spirit-design-system/commit/9fd982e3fd30e22ae71a42c64ae4efbd034712f2))

### Bug Fixes

- Normalize CardLink typings to PolymorphicComponent ([03176fe](https://github.com/alma-oss/spirit-design-system/commit/03176fe0d3a32315d0edf55502ea0fa7cd5875fb))

[Full changelog](https://github.com/alma-oss/spirit-design-system/compare/@alma-oss/spirit-web-react@4.4.2...@alma-oss/spirit-web-react@4.5.0)

...

## What's Next 🔮

- **Interactive Tag**
  A new interactive tag component designed to display selected options in search filters.

🎯 You can see more of our [quarterly targets outlook in Notion](https://www.notion.so/almacareer/Spirit-DS-team-Quarterly-Goals-878e92d5b74543039e513c0160fb9117).

## We'd Love to Hear Your Feedback

💬 If you have any idea, suggestion or request...

🐙 Everything is available in our [repository on GitHub](https://github.com/alma-oss/spirit-design-system/).

Thank you for staying with us!
```
