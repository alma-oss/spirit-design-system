# Jira Comment Templates

Templates for the acceptance comment. Jira Cloud (the Atlassian MCP) stores the comment body as Markdown and renders it, so write Markdown, not Jira wiki markup.

## Formatting Rules

- Use `###` headings and `*` bullets. Do not use wiki headings such as `h3.` — Jira Cloud stores them as literal text (DS-2934: `h3. Criteria` showed up verbatim).
- Wrap class names, props, and values in backticks — they render as inline code.
- Bare URLs are fine; Jira auto-links them.
- Keep the body plain: headings, bullets, backticks, and links. Bold, italics, and numbered lists are untested in comments — if you use them, check the stored body.
- After posting, always re-fetch the comments (`responseContentFormat: html`) and check that headings, bullets, and code render. A raw `h3.` or `\*` in the stored body means the formatting is broken.
- If it is broken, edit the comment (`addOrEditJiraIssueComment` with `commentId`) with corrected Markdown. If Jira refuses the edit (DS-2934: "You do not have the permission to edit this comment"), tell the user and either post a corrected comment or ask them to edit it by hand.

## Accept and Clarify Template (ACCEPT / CLARIFY)

```text
### Acceptance review: ACCEPT (4 of 4 criteria met)

PR: https://github.com/alma-oss/spirit-design-system/pull/3011 (open, preview built from f85a3c9 = PR head)

### Deployment

* Web demo: https://deploy-preview-3011--spirit-design-system.netlify.app/packages/web/src/scss/components/box/
* Web React demo: https://deploy-preview-3011--spirit-design-system.netlify.app/packages/web-react/src/components/box/
* Storybook: https://deploy-preview-3011--spirit-design-system-storybook.netlify.app/?path=/docs/components-box--overview

### Criteria

* AC1 Met: `boxShadow="100"` and `.shadow-100` render `rgba(0,0,0,.1) 0 2px 8px` (web and web-react demo, 1400px)
* AC2 Met: shadows 100 to 400 resolve to identical values in web and web-react
* AC3 Met: Shadow section added to both Box READMEs
* AC4 Met: Storybook Box docs list the `boxShadow` control

### Not verified

* Changing the `boxShadow` control interactively in the Storybook playground
* Browsers other than Chrome

Screenshots attached: DS-2774-shadow-web.png
```

For CLARIFY, change the heading to `Acceptance review: CLARIFY (3 met, 1 not verifiable)` and add an `### Open questions` section listing what is missing to decide, and who can provide it.

## Decline Template (DECLINE)

Written for the assignee: every failed criterion must be reproducible without asking.

```text
### Acceptance review: DECLINE (2 met, 1 not met)

PR: https://github.com/alma-oss/spirit-design-system/pull/3008 (open, preview built from 1e23832 = PR head)

### Failed criteria

* AC3 Not met: per-corner override does not take precedence over the uniform radius
* Where: https://deploy-preview-3008--spirit-design-system.netlify.app/packages/web/src/scss/components/box/ at 1400px, box "With radius per corner"
* Expected: `border-start-start-radius: 0px` with `rounded-300 rounded-top-start-0`
* Actual: `border-start-start-radius: 8px`
* Screenshot: DS-2831-ac3-desktop.png

### Met criteria

* AC1 Met: uniform radius unchanged (`rounded-300` renders 8px on all corners)
* AC2 Met: per-corner props render the expected radii at 375px and 1400px

### Not verified

* RTL layout
```
