# Jira Comment Templates

Templates for the acceptance comment. Jira Cloud stores comments as ADF, so post them with
`addOrEditJiraIssueComment` and `contentFormat: "html"`. The Markdown default drops rich nodes such as
mentions.

## Formatting Rules

- Use `<h3>` headings, `<ul><li>` lists and `<p>` paragraphs.
- Wrap class names, props and values in `<code>`. Escape `<` and `>` inside them as `&lt;` and `&gt;`.
- Write links as plain `<a href="URL">text</a>`; a bare URL is not turned into a link in HTML.
- Do not use column layouts (`<section data-type="layout-*">`): Jira refuses them.
- Mentions need a real `accountId`: `<span data-type="mention" data-user-id="ACCOUNT_ID">@Name</span>`.
  Without one, write the name as plain text.

After posting, re-fetch the comments with `listJiraIssueComments` and read the stored body. A comment can
be edited in place with its `commentId`.

## Accept and Clarify Template (ACCEPT / CLARIFY)

```html
<h3>Acceptance review: ACCEPT (4 of 4 criteria met)</h3>
<p>
  PR: <a href="https://github.com/alma-oss/spirit-design-system/pull/3011">#3011</a> (open, preview built from f85a3c9 =
  PR head)
</p>

<h3>Deployment</h3>
<ul>
  <li>
    Web demo:
    <a href="https://deploy-preview-3011--spirit-design-system.netlify.app/packages/web/src/scss/components/box/"
      >Box (web)</a
    >
  </li>
  <li>
    Web React demo:
    <a href="https://deploy-preview-3011--spirit-design-system.netlify.app/packages/web-react/src/components/box/"
      >Box (web-react)</a
    >
  </li>
  <li>
    Storybook:
    <a
      href="https://deploy-preview-3011--spirit-design-system-storybook.netlify.app/?path=/docs/components-box--overview"
      >Box docs</a
    >
  </li>
</ul>

<h3>Criteria</h3>
<ul>
  <li>
    AC1 Met: <code>boxShadow="100"</code> and <code>.shadow-100</code> render <code>rgba(0,0,0,.1) 0 2px 8px</code> (web
    and web-react demo, 1400px)
  </li>
  <li>AC2 Met: shadows 100 to 400 resolve to identical values in web and web-react</li>
  <li>AC3 Met: Shadow section added to both Box READMEs</li>
  <li>AC4 Met: Storybook Box docs list the <code>boxShadow</code> control</li>
</ul>

<h3>Not verified</h3>
<ul>
  <li>Changing the <code>boxShadow</code> control interactively in the Storybook playground</li>
  <li>Browsers other than Chrome</li>
</ul>

<p>Screenshots attached: DS-2774-shadow-web.png</p>
```

For CLARIFY, change the heading to `Acceptance review: CLARIFY (3 met, 1 not verifiable)` and add an `<h3>Open questions</h3>` section listing what is missing to decide, and who can provide it.

## Decline Template (DECLINE)

Written for the assignee: every failed criterion must be reproducible without asking.

```html
<h3>Acceptance review: DECLINE (2 met, 1 not met)</h3>
<p>
  PR: <a href="https://github.com/alma-oss/spirit-design-system/pull/3008">#3008</a> (open, preview built from 1e23832 =
  PR head)
</p>

<h3>Failed criteria</h3>
<ul>
  <li>AC3 Not met: per-corner override does not take precedence over the uniform radius</li>
  <li>
    Where:
    <a href="https://deploy-preview-3008--spirit-design-system.netlify.app/packages/web/src/scss/components/box/"
      >Box demo</a
    >
    at 1400px, box "With radius per corner"
  </li>
  <li>Expected: <code>border-start-start-radius: 0px</code> with <code>rounded-300 rounded-top-start-0</code></li>
  <li>Actual: <code>border-start-start-radius: 8px</code></li>
  <li>Screenshot: DS-2831-ac3-desktop.png</li>
</ul>

<h3>Met criteria</h3>
<ul>
  <li>AC1 Met: uniform radius unchanged (<code>rounded-300</code> renders 8px on all corners)</li>
  <li>AC2 Met: per-corner props render the expected radii at 375px and 1400px</li>
</ul>

<h3>Not verified</h3>
<ul>
  <li>RTL layout</li>
</ul>
```
