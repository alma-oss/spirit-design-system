# Jira Comment Templates

Templates for the acceptance comment. They avoid the patterns that this on-prem Jira corrupts when a comment goes through the Markdown-to-wiki conversion.

## Formatting Rules

- Use `h3.` headings and `*` bullets — they pass through the converter untouched.
- **No bold or italics.** The same Markdown bold was stored correctly on one ticket and escaped as `\*\*text\*\*` on the next. Plain text is always safe.
- Wrap class names, props, and values in backticks — they become `{{monospace}}`.
- **No angle brackets**, even in backticks: `shadow-<token>` was stored as `shadow-`. Write `shadow-100 … shadow-400` or "shadow-TOKEN" instead.
- Avoid identifiers with two or more underscores (`__tests__`, `FONT_WEIGHT_MAP`) and tokens starting with `_`.
- No `#` numbered lists — they become `h1.` headings.
- Bare URLs are fine; Jira auto-links them.

For the full list of corruption bugs, see [`../../create-jira-issue/references/wiki-markup-cheatsheet.md`](../../create-jira-issue/references/wiki-markup-cheatsheet.md).

After posting, always re-fetch the comments and read the stored body. Comments can't be edited — a broken one can only be followed by a corrected one.

## Accept and Clarify Template (ACCEPT / CLARIFY)

```text
h3. Acceptance review: ACCEPT (4 of 4 criteria met)

PR: https://github.com/alma-oss/spirit-design-system/pull/3011 (open, preview built from f85a3c9 = PR head)

h3. Deployment

* Web demo: https://deploy-preview-3011--spirit-design-system.netlify.app/packages/web/src/scss/components/box/
* Web React demo: https://deploy-preview-3011--spirit-design-system.netlify.app/packages/web-react/src/components/box/
* Storybook: https://deploy-preview-3011--spirit-design-system-storybook.netlify.app/?path=/docs/components-box--overview

h3. Criteria

* AC1 Met: `boxShadow="100"` and `.shadow-100` render `rgba(0,0,0,.1) 0 2px 8px` (web and web-react demo, 1400px)
* AC2 Met: shadows 100 to 400 resolve to identical values in web and web-react
* AC3 Met: Shadow section added to both Box READMEs
* AC4 Met: Storybook Box docs list the `boxShadow` control

h3. Not verified

* Changing the `boxShadow` control interactively in the Storybook playground
* Browsers other than Chrome

Screenshots attached: DS-2774-shadow-web.png
```

For CLARIFY, change the heading to `Acceptance review: CLARIFY (3 met, 1 not verifiable)` and add an `h3. Open questions` section listing what is missing to decide, and who can provide it.

## Decline Template (DECLINE)

Written for the assignee: every failed criterion must be reproducible without asking.

```text
h3. Acceptance review: DECLINE (2 met, 1 not met)

PR: https://github.com/alma-oss/spirit-design-system/pull/3008 (open, preview built from 1e23832 = PR head)

h3. Failed criteria

* AC3 Not met: per-corner override does not take precedence over the uniform radius
* Where: https://deploy-preview-3008--spirit-design-system.netlify.app/packages/web/src/scss/components/box/ at 1400px, box "With radius per corner"
* Expected: `border-start-start-radius: 0px` with `rounded-300 rounded-top-start-0`
* Actual: `border-start-start-radius: 8px`
* Screenshot: DS-2831-ac3-desktop.png

h3. Met criteria

* AC1 Met: uniform radius unchanged (`rounded-300` renders 8px on all corners)
* AC2 Met: per-corner props render the expected radii at 375px and 1400px

h3. Not verified

* RTL layout
```
