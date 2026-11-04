---
name: spirit:conventional-comments
description: >-
  Conventional Comments vocabulary (labels, decorations, ordering) for Spirit code review. It overlays
  label markings onto the finding format from the code-review methodology. Off by default in the CLI
  (loaded with `--conventional-comments`); CI rendering always uses it. Use when the team explicitly
  wants CC-formatted review output, or when rendering findings for a GitHub review.
---

# Conventional Comments Overlay

Off by default in the CLI; CI rendering always uses it. It is loaded when a review runs with
`--conventional-comments` and in every CI review (CI findings always carry the `label (decorations):` line).
It does **not** change the finding structure defined in the code-review methodology
(`.agents/skills/code-review/references/methodology.md`, `review-output-templates.md`, and
`ci-rendering-and-posting.md`: `Fix:` before `Why:`, suggestion-fence first in CI mode) — it only
prepends a `label (decorations):` line to each finding. It is off by default in the CLI because the team
has not adopted Conventional Comments as a whole and the reviewers communicate clearly without markings.

This file is the only place that maps the methodology severities to labels and decorations; the code-review
references link here instead of repeating the mapping.

Reference: <https://conventionalcomments.org/>

## Format

```text
<label> (<decorations>): <subject>

<the finding body from the code-review methodology>
```

## Labels

| Label          | Meaning                                    | When to use                                          | Maps to methodology severity              |
| -------------- | ------------------------------------------ | ---------------------------------------------------- | ----------------------------------------- |
| **issue**      | A problem that must or should be addressed | Bugs, a11y regressions, logic errors, data loss      | blocking (with `(blocking)`) or important |
| **suggestion** | A proposed improvement                     | Cleaner pattern, better token usage, simpler code    | important or minor                        |
| **todo**       | A required follow-up task                  | Missing test, incomplete migration, leftover cleanup | important                                 |
| **question**   | Seeking clarification                      | Unclear intent, ambiguous logic                      | question                                  |
| **thought**    | An observation for consideration           | Architectural note, future concern                   | note                                      |
| **note**       | Highlighting information                   | Context, non-obvious behavior                        | note                                      |
| **chore**      | Maintenance or cleanup                     | Rename, restructure, remove dead code                | minor                                     |
| **praise**     | Positive feedback                          | Good patterns, clean design                          | praise                                    |

Prefer `question` over `issue` when you are not sure something is a mistake. Never use `nitpick` —
linter-detectable items are not reported at all (see the code-review methodology).

## Decorations

| Decoration         | Meaning                               | When                                                  |
| ------------------ | ------------------------------------- | ----------------------------------------------------- |
| **(blocking)**     | Merge must not proceed until resolved | Critical bugs, a11y regressions, data loss, security  |
| **(non-blocking)** | Default — does not block merge        | Whenever no stronger decoration applies               |
| **(if-minor)**     | Resolve only if the change is small   | Minor suggestions where effort should be proportional |
| **(security)**     | Security-related                      | Any finding with security implications                |

Combine when needed, e.g. `(blocking, security)`. Default to `(non-blocking)`.

From the methodology severity: `blocking` takes `(blocking)`, `minor` takes `(if-minor)`, and every other
severity takes `(non-blocking)`. Add `security` whenever it applies.

## Output Ordering

Within each file/area section, order findings by severity:

1. `issue (blocking)`
2. `issue`
3. `todo`
4. `suggestion`
5. `question`
6. `thought`
7. `note`
8. `chore`

Praise is a single block after all findings, before the summary table (per the code-review methodology).
In PR mode, already-reported findings move to the second tier in the same order.

## Examples

```text
issue (blocking, security): Unescaped user input rendered as HTML

File: packages/web-react/src/components/Toast/Toast.tsx:31

Fix: Render the message as text content instead of via dangerouslySetInnerHTML.
Why: User-controlled content is injected into the DOM without sanitization (XSS).
```

```text
suggestion (non-blocking): Use the spacing token instead of a raw pixel value

File: packages/web/src/scss/components/Avatar/_Avatar.scss:15

Fix: Replace `padding: 12px` with `padding: $space-300` (or the matching spacing token).
Why: Raw values bypass the token scale and drift from the design system.
```
