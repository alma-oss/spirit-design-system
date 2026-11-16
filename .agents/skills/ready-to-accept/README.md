# Ready to Accept

Post a ready-to-accept comment on a DS Jira issue and move it to `Done`, so the product manager
who accepts the work can click straight into the component.

## Usage

```text
/spirit:ready-to-accept
```

Run it on the branch whose PR is ready. Use when you need to:

- Mark a finished component ready for acceptance once the PR is approved
- Post the same link set every time without re-deriving the URL shapes
- Get past the `Done` transition's quality-gate validator without hard-coded custom field IDs

## What It Does

1. Finds the branch's PR and the `DS-XXXX` key, and reads the issue
2. Resolves the product manager at run time — from the conversation, the DS project lead, or by
   asking — and looks up their Atlassian account ID, or skips the mention when there is no product
   manager
3. Builds the README and preview links from what the PR touched, adding Storybook only when a story
   actually changed, and verifies each one resolves and is built from the current branch head
4. Shows the comment for approval, then posts it through the Atlassian MCP as HTML so links and the
   mention survive intact
5. Transitions the issue from `Testing` to `Done` (usually done by the responsible person), asking before
   asserting any quality gate it cannot evidence

## Output

```text
@<product manager> ProgressBar (vanilla CSS) is ready for acceptance.

* Documentation: ProgressBar README on the branch
  https://github.com/alma-oss/spirit-design-system/blob/<branch>/packages/web/src/scss/components/ProgressBar/README.md
* Demo: ProgressBar on the deploy preview
  https://deploy-preview-<PR>--spirit-design-system.netlify.app/packages/web/src/scss/components/progressbar/
* Pull request: #<PR>
  https://github.com/alma-oss/spirit-design-system/pull/<PR>
```

Each bullet text is a link to the URL shown under it, and the mention is a real Jira mention. The comment itself is
posted as HTML; the exact markup is in `SKILL.md`.

Plus a report: new status, comment ID, whom you mentioned and how, which gate statuses were set, which
fields were left empty, and anything still open on the PR.

## Setup

- **Atlassian MCP server**, signed in to `almacareer.atlassian.net`. It reads the issue, posts the comment
  and runs the transition; no API token or shell environment variable is needed.
- **`gh` CLI**, authenticated, for the PR and the README existence check.
- Outbound HTTP for the preview checks. Without it the skill asks for the links instead of guessing.

## Key Principles

- **The mention is always the product manager, or nobody**, resolved at run time — no name is baked
  into the skill, because a stale one mentions the wrong person silently.
- **Demo links follow the packages the PR touched**; Storybook is optional and gated on story changes;
  the `spirit-design-system-docsite` preview is never linked, being a WIP next-gen site.
- **Never invent a URL, never assert a quality gate you cannot evidence.**

## See Also

- **SKILL.md** — the workflow, URL shapes, and comment template
- **references/quality-gates.md** — transition resolution, the validator error, and the quality-gate fields
- Related: `/spirit:create-pr` opens the PR this links to; `/spirit:address-review-comments` clears
  review threads before you mark the issue ready
