# Review Figma Design

**`/spirit:review-figma-design`** is a pre-handoff design review skill for [Spirit Design System](https://spirit.design) and design systems built on top of it.

**Who it's for** — designers preparing a Figma frame for developer handoff, and design system reviewers checking compliance on their behalf.

**What it does** — reads a Figma frame (page, component, or composition) via the Figma MCP and checks it against design tokens, deprecated components, icon availability, and Code Connect coverage. Findings are compiled into a shareable MD + HTML + PDF report with per-finding screenshots and proposed Figma comments that can be posted back to Figma automatically.

---

The skill can be run standalone or inside any repository — **no codebase is required**. All checks
work out of the box with no configuration. External references (Spirit dictionaries, deprecation
list, logo) are fetched from GitHub automatically when not available locally. Checks that depend
on the local codebase (icon verification) are skipped gracefully when the relevant paths are
absent.

> When run inside the Spirit repository itself, the skill additionally cross-references open JIRA
> tickets against findings and links them in the report.

## Usage

The skill supports the following scenarios:

1. **Figma desktop app open with MCP enabled** — the agent reads the currently selected frame directly via the Figma MCP server. No URL needed.
2. **Figma URL pointing to a specific frame** — the agent fetches that frame by URL. No active selection in Figma is needed; the frame is identified by the URL. The Figma desktop app must still be running as it provides the MCP server.
3. **Figma URL pointing to a zoomed area or page** — when the URL has no `node-id` or targets a page/canvas, the agent detects all frames and asks: review all frames, or pick one? Reviewing all produces a separate report per frame, each in its own subdirectory. The Figma desktop app must still be running as it provides the MCP server.

```text
/spirit:review-figma-design [type] [issue-id] [figma-url] [--post-comments-to-figma]
```

All arguments are optional and positionally flexible — each is unambiguous by its format.

**`[type]`** — When omitted, auto-detected from the frame structure:

| Type          | When to use                                           | Auto-detected?                                |
| ------------- | ----------------------------------------------------- | --------------------------------------------- |
| `page`        | Full page design                                      | No — must be passed explicitly                |
| `component`   | A single DS component                                 | Yes — when all children are variant symbols   |
| `composition` | A multi-component composition that is not a full page | Yes — fallback when component is not detected |

`page` is never auto-detected because the Section/Container structure it relies on is optional and may not be present. Pass it explicitly when reviewing a full page.

**`[issue-id]`** — optional JIRA issue ID (e.g. `DS-2475`). When provided, it is prepended to the
output directory: `design-reviews/DS-2475-reply-form/`. When omitted, the directory uses only the
frame-name slug.

**`[figma-url]`** — optional. When omitted, the frame currently selected in the Figma desktop app is reviewed. When provided, that specific frame is reviewed regardless of the current selection.

**`[--post-comments-to-figma]`** — optional flag. When present, all proposed Figma comments are
posted to Figma automatically at the end of the review without asking for confirmation. Requires
the `FIGMA_PERSONAL_TOKEN` environment variable to be set (see [Requirements](#requirements)).
Without the flag, comments are saved to `figma-comments.md` and can be posted in any later
session.

### Examples

Review the currently selected frame (type auto-detected):

```text
/spirit:review-figma-design
```

Review the currently selected frame as a page:

```text
/spirit:review-figma-design page
```

Review the currently selected frame, tagged with a JIRA issue:

```text
/spirit:review-figma-design DS-2475
```

Review a specific frame by URL as a page, tagged with a JIRA issue:

```text
/spirit:review-figma-design page DS-2475 https://www.figma.com/design/abc123/My-Design?node-id=34675-59177
```

Review a frame and post Figma comments automatically after the report:

```text
/spirit:review-figma-design DS-2475 https://www.figma.com/design/abc123/My-Design?node-id=34675-59177 --post-comments-to-figma
```

---

## Output

Output is written to `design-reviews/` in the current working directory.

```text
design-reviews/<topic-slug>/
  <report-name>.md
  <report-name>.html
  <report-name>.pdf
  figma-comments.md
  overview.png
  finding-1.png
  …
```

`<topic-slug>` is the slugified frame name (single-frame) or canvas name (multi-frame), optionally
prefixed with the issue ID (e.g. `DS-2475-reply-form`). `<report-name>` follows the same prefix
rule (`DS-2475-design-review` or `design-review`). Multi-frame reports include a **Frames Reviewed**
section listing all frames with Figma links; findings are numbered sequentially across all frames.

`figma-comments.md` contains proposed Figma comments for actionable findings (missing tokens,
hardcoded values, etc.). Comments can be posted to Figma right after the report has been generated,
or anytime later — ask your AI agent to read the file and post the comments on your behalf.

---

## Requirements

| Requirement                         | macOS                        | Used for                                                                            |
| ----------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------- |
| **Figma desktop app** (MCP enabled) | [Download →][figma-download] | Reads design data directly from Figma. Requires a [paid Figma plan][figma-pricing]. |
| **Node.js 22+**                     | [Install →][nodejs-download] | Saves Figma screenshots to disk; adds page numbers to the PDF footer                |
| **Chrome or Chromium**              | [Install →][chrome-download] | Renders the HTML report to PDF                                                      |
| **`curl`**                          | Built-in                     | Posts review comments to Figma via the REST API                                     |

If Node.js 22+ is not available, `pdf-gen.js` exits with an error and the skill falls back to the
plain Chrome CLI (PDF is generated without footer logo or page numbers). Chrome or Chromium is
required — PDF generation fails if neither is installed.

To post review comments to Figma, set the `FIGMA_PERSONAL_TOKEN` environment variable with a
[Figma personal access token][figma-tokens]. Generate one under **Figma → Settings → Personal
access tokens**.

---

## Configuration

When installed in a repository, the skill reads `.agents/skills/review-figma-design/config.json`
for local overrides:

| Key         | Default | Description                                                                                                                                                                        |
| ----------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `iconsPath` | `null`  | Custom icon search path (relative to the current working directory). Used as a fallback when neither `packages/icons/src/` nor `libs/design-icons/` exists. Set to `null` to skip. |

The skill resolves the icon path in this order:

1. `packages/icons/src/` — Spirit default
2. `libs/design-icons/` — Cyborg convention
3. `iconsPath` from `config.json` — custom override

---

## FAQ

<details>
<summary>How do I post Figma comments from the review?</summary>

The skill posts Figma comments via the Figma REST API using `curl`. Set a `FIGMA_PERSONAL_TOKEN`
environment variable with a [personal access token][figma-tokens], then ask your AI agent to post
the comments. It reads `figma-comments.md` from the report directory and posts each pending
comment. You can do this right after the review or in any later session.

Each comment is prefixed with the review title (e.g. `DS-2475 — Reply Form:`) so designers can
identify the context at a glance.

</details>

<details>
<summary>Multi-frame reviews are slow and expensive — is that expected?</summary>

Yes. When a URL points to a canvas or page with many frames and you choose to review all of them, the skill must call `get_design_context` for each frame sequentially (parallel calls tend to time out the Figma MCP). A canvas with 30+ frames can easily take 10–15 minutes and consume a large amount of tokens. For faster, cheaper reviews, pick a single frame or a small group instead of reviewing an entire canvas at once.

</details>

<details>
<summary>The PDF footer on the cover page looks misaligned — is that a bug?</summary>

The cover page footer cannot be precisely aligned: Chrome CDP footer templates only accept `px` units in inline styles (not `mm`), so the horizontal offset cannot be made to exactly match the CSS `@page` content margin, and attempts to suppress the footer on the cover page did not work.

</details>

<details>
<summary>What tool does the skill use to generate the PDF?</summary>

The skill uses a two-level fallback chain:

1. **`pdf-gen.js` + Chrome CDP** (primary) — launches Chrome with remote debugging, calls
   `Page.printToPDF` via the DevTools Protocol, and renders a footer with `1 / N` page numbers
   on every page. Requires Node.js 22+ and Chrome or Chromium.
2. **Chrome CLI** (fallback) — `--print-to-pdf` without a custom footer, used when `pdf-gen.js`
   fails (e.g. older Node.js). No footer logo or page numbers.

To ensure the best output, make sure Chrome or Chromium is installed and Node.js 22+ is active.

</details>

<details>
<summary>Can the skill find matching JIRA issues for Required DS Changes?</summary>

Only partially, and only when run inside the Spirit repository. The skill searches `git log` for DS ticket references in commit messages — if a ticket was referenced in a commit, it will be linked. Direct JIRA querying is not possible as there is no JIRA MCP available. Matches are therefore opportunistic: reliable when a commit reference exists, blind otherwise.

</details>

<details>
<summary>Can the skill create JIRA issues for Required DS Changes with no existing ticket?</summary>

No. Without a JIRA MCP, the skill cannot create issues. Rows with no known ticket are marked _to be created_ as a reminder to link them manually once the issues are created.

</details>

<details>
<summary>The skill says "fileKey is required" when I try to review the current Figma selection.</summary>

Some Figma MCP server versions require a `fileKey` argument even when reading the current
selection. If you see this error, provide a Figma URL instead:

```text
/spirit:review-figma-design https://www.figma.com/design/<fileKey>/<fileName>?node-id=<nodeId>
```

The skill handles URL-based and selection-based modes identically — passing a URL is always a
safe fallback. You can copy the URL from Figma using **Share → Copy link** while the target frame
is selected.

</details>

<details>
<summary>Claude asks for permission to run <code>git log</code> every time. How do I fix it?</summary>

Add a permission rule to `~/.claude/settings.json`:

```json
{
  "permissions": {
    "allow": ["Bash(git log:*)"]
  }
}
```

Takes effect on the next Claude Code session.

</details>

<details>
<summary>How can I add my own findings to the generated PDF?</summary>

Edit the `.md` or `.html` report in the output folder, then regenerate the PDF. You can ask the AI to add, remove, or reword any finding in the report — it will update the file and re-run the PDF generation command from Step 11 of the skill. Alternatively, run the Chrome command directly:

```bash
CHROME=$(ls -1 \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium" 2>/dev/null | head -1)
node .agents/skills/review-figma-design/scripts/pdf-gen.js "$CHROME" \
  "$(pwd)/design-reviews/<topic-slug>/<report-name>.html" \
  "$(pwd)/design-reviews/<topic-slug>/<report-name>.pdf"
```

</details>

---

## Comparison with `/audit-design-system`

> [`/audit-design-system`][audit-design-system] is an open-source skill by Edenspiekermann,
> compatible with Claude Code, Codex, and Cursor.

Both skills read Figma designs and report on design-system alignment, but they serve different
purposes and should not be used in tandem — they overlap on the core checks and would fetch the
same Figma data twice.

| Dimension               | `/spirit:review-figma-design`                                                                                                                                                                        | `/audit-design-system`                                                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **DS specificity**      | Spirit-specific (token prefixes, DICTIONARIES.md, DEPRECATIONS.md, Spirit icon paths, JIRA)                                                                                                          | DS-agnostic — works with any design system                                                                                  |
| **Purpose**             | Pre-handoff compliance report that certifies a design is ready for dev                                                                                                                               | Drift detection — finds places where a design has diverged from its DS                                                      |
| **Review types**        | `page`, `component`, `composition` — different checks per type                                                                                                                                       | Flat — no type distinction                                                                                                  |
| **Output**              | MD + HTML + PDF, per-finding screenshots, pinned overview map, `figma-comments.md`                                                                                                                   | Findings list: markdown (default) or structured JSON                                                                        |
| **Figma tools**         | `get_metadata`, `get_design_context`, `get_variable_defs`, `get_screenshot`; `search_design_system` (Codex/Cursor) or `get_code_connect_suggestions` (Figma desktop MCP) for replacement suggestions | `get_metadata`, `get_design_context`, `get_variable_defs`, `get_code_connect_map`, `get_screenshot`, `search_design_system` |
| **Specific checks**     | Page Section/Container structure, variant/enum completeness, Code Connect coverage, deprecated components, icon existence in repo, git/JIRA cross-reference                                          | Missing component instances, hard-coded values vs tokens, repeated sibling structures, variant drift                        |
| **Post-review actions** | Proposes Figma comments for designers; can post via REST API                                                                                                                                         | Routes to `fix-design-system-finding` or `apply-design-system` fix skills                                                   |
| **Priority model**      | Severity: ✅ / ℹ️ / ⚠️ / 🚨                                                                                                                                                                          | Numeric priority 0–3 + confidence score 0.0–1.0                                                                             |

**When to use which:**

- **`/spirit:review-figma-design`** — a designer hands off a Spirit frame for implementation and wants a structured compliance sign-off, with a shareable PDF report and proposed Figma comments.
- **`/audit-design-system`** — you want a quick structural check on any Figma node (not Spirit-specific), need machine-readable JSON output, or want to feed results into a downstream fix skill.

[audit-design-system]: https://github.com/edenspiekermann/Skills/tree/main/skills/audit-design-system
[chrome-download]: https://www.google.com/chrome/
[figma-download]: https://www.figma.com/downloads/
[figma-pricing]: https://www.figma.com/pricing/
[figma-tokens]: https://www.figma.com/developers/api#access-tokens
[nodejs-download]: https://nodejs.org/en/download/
