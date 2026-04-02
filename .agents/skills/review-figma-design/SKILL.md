---
name: spirit:review-figma-design
description: Review a Figma design from a Spirit Design System perspective before handoff to development. Use when a designer asks for a DS review, a design needs to be checked for DS compliance, or a handoff review is required. Requires the Figma MCP to be available.
tools:
  - Read
  - Grep
  - Glob
  - Bash
  - Write
  - mcp__figma__get_metadata
  - mcp__figma__get_design_context
  - mcp__figma__get_screenshot
  - mcp__figma__get_variable_defs
  - mcp__figma__get_code_connect_suggestions
  - mcp__github__get_file_contents
---

# Spirit Design System — Review Figma Design

This skill guides you through a structured design review from a Spirit Design System perspective,
matching the team's handoff process. The output is a written report (for the ticket) and, if issues
are found, a list of Figma comments to be added.

---

## Invocation

```text
/spirit:review-figma-design [type] [issue-id] [figma-url] [--post-comments-to-figma]
```

All arguments are optional and positionally flexible — each is unambiguous by its format:
`type` is one of `page`, `component`, `composition`; `issue-id` matches `[A-Z]+-\d+` (e.g.
`DS-2475`); `figma-url` starts with `https://`; `--post-comments-to-figma` is a literal flag.

**`[type]`** — When omitted, auto-detected from the frame structure (see Step 1); falls back to
`composition` if detection is inconclusive. `page` is never auto-detected — pass it explicitly
when reviewing a full page.

| Type          | When to use                                                       |
| ------------- | ----------------------------------------------------------------- |
| `page`        | Full page design — includes the Section/Container structure check |
| `component`   | A single DS component being designed or updated                   |
| `composition` | A multi-component composition that is not a full page             |

**`[issue-id]`** — optional JIRA issue ID (e.g. `DS-2475`). When provided, it is prepended to the
output directory name: `design-reviews/DS-2475-reply-form/`. When omitted, the directory uses only
the frame-name slug.

**`[figma-url]`** — optional Figma frame URL. Two behaviours:

- **Omitted** — review the frame currently selected in the Figma desktop app. Call `get_metadata`
  without a `nodeId`.
- **Provided** — extract the `nodeId` from the URL and use it for all Figma MCP calls. The node ID
  is the `node-id` query parameter with `-` replaced by `:` (e.g. `node-id=34675-59177` →
  `nodeId: "34675:59177"`).

**`[--post-comments-to-figma]`** — optional flag. When present, all proposed Figma comments are
posted automatically at the end of the review without asking for confirmation (see Step 13).

Checks that apply only to specific evaluation types are marked accordingly throughout this skill.

---

## Prerequisites

- The **Figma desktop app must be open** — it exposes the Figma MCP server.
- **Without a URL** — the target frame must be selected in the Figma desktop app.
- **With a URL** — no frame selection is needed; the URL identifies the target node.
- You must have access to the **Spirit component codebase** (for cross-referencing component existence).

---

## Workflow

### Step 1: Fetch Design Data

1. Determine the target node:
   - **No URL provided** — call `get_metadata` without a `nodeId` (uses current Figma selection).
     If the call fails with an error such as "fileKey is required", the MCP server in this
     environment needs a file key. Stop and ask the user to provide a Figma URL, then proceed
     with the URL-based path below.
   - **URL provided** — extract the `nodeId` from the URL (see Invocation section) and pass it to
     all subsequent Figma MCP calls. If the URL has no `node-id` parameter, call `get_metadata`
     without a `nodeId` as well.

2. **Detect multi-frame mode** — inspect the root node returned by `get_metadata`:
   - If the root is a page or canvas (its direct children are `<frame>` elements rather than
     component layers), the URL points to a zoomed area or page rather than a single frame.
   - List the frames numbered and ask:
     > This URL contains **N frames**:
     >
     > 1. Frame One
     > 2. Frame Two
     >    …
     >    Review all N frames, or pick one? Enter a number to pick a single frame, or `all`.
   - Wait for the user's answer before continuing.
   - **User picks a number** — review only that frame in single-frame mode (continue with
     step 3 below, using the picked frame's node ID as the target).
   - **User answers `all`** — review all frames together and produce a **single combined report**.
     Run Steps 3–8 for each `<frame>` child in order (collecting findings across all frames), then
     write one report (Steps 9–11) that covers all frames. See Step 9 for the output path and
     Step 10 for the Frames Reviewed section format.
   - **Single-frame mode** (the normal case): the root node is already a single frame — continue
     with step 3 below.

3. If `[type]` was **not** provided, auto-detect it from the `get_metadata` output:
   - Inspect the direct children of the root frame.
   - If **all** direct children are `<symbol>` elements with names in `Property=Value` format
     (e.g. `Color=Primary, Size=Medium`), set type to `component`.
   - Otherwise, set type to `composition`.
   - Log the detected type so the user can see which was chosen.
   - If `[type]` **was** provided, use it as-is — skip detection entirely.

4. Call `get_design_context` on the root node to extract:
   - All component instances and their Code Connect snippets
   - All token references (spacing, color, typography, radius, shadow)
   - Raw hardcoded values (CSS literals without `var(--...)`)
   - Any custom/raw HTML compositions that lack Code Connect mappings
5. Call `get_variable_defs` on the root node to see exactly which variables are bound versus
   unbound. Use this as corroborating evidence for token findings in Step 5 — a layer present
   in `get_design_context` with a token reference but absent or unbound in `get_variable_defs`
   confirms the token is not properly attached.
6. Call `get_screenshot` on the root node for visual context.

If the frame is large (> ~2000px tall), call `get_design_context` section by section using node IDs
from `get_metadata` to avoid truncation.

### Step 2: Check Page Structure (type=page Only)

Inspect the top-level children of the root frame in the `get_metadata` output. The allowed
structure, in order, is:

1. An optional `Header` component instance (may be wrapped in a layer named `Header`)
2. One or more `Section [Size]` layers, each containing a `Container [Size]` child layer
3. An optional `Footer` component instance
4. An optional `Modal` component instance

Rules:

- Section and Container sizes do not need to match (`Section Small` > `Container Large` is valid)
- Any unnamed or unrecognised top-level layer (e.g. `Frame 12`) fails this check
- Skip entirely for `component` and `composition` evaluations

### Step 3: Check Variant Completeness (type=component Only)

For each property dimension visible in the component, run two checks.

#### Dictionary Enum Completeness

Fetch [`docs/DICTIONARIES.md`](https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md)
from GitHub to get the current list of Spirit dictionaries and their values.
If the component defines **any** value from a dictionary, it must define **all** values from that
dictionary. Flag any missing values as ⚠️.

If a property spans two dictionaries (e.g. a `Color` prop that combines `ComponentButtonColor`
and `EmotionColor`), check completeness against both.

#### Interaction State Completeness

If the component has an `Interaction State` property, every other property combination must have
all of: `Default`, `Hover`, `Focus`, `Active`, `Disabled`. Flag any combination that is missing
one or more states as ⚠️.

### Step 4: Check DS Component Usage

For each visible UI element, verify it maps to an existing Spirit component:

| Check                                          | What to look for                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Component instance**                         | Does the Figma layer have a Code Connect snippet? If not, it may be a custom composition or a missing DS component. **Exception:** plain `<text>` layers are not components in Figma — Spirit uses text styles (Body, Heading, etc.) for typography, not typography components. Never flag a text layer as a missing DS component. **Exception:** layout layers named `Container`, `Section`, `Stack`, or `Grid` are intentional named frames — they are not DS component instances and must not be flagged as missing components.                                                                         |
| **Correct component**                          | Is the right DS component used? **Note:** there is no `Link` component in Figma — designers indicate links via text styles with `link` in the name (e.g. `Body/Medium/Link Regular`). This is correct design practice and must NOT be flagged as a finding. Instead, add a note to **Development Considerations** that these text layers should be implemented as the DS `Link` component in code.                                                                                                                                                                                                         |
| **No links inside interactive element labels** | A `Link` (or link-styled text) placed inside the **label** of a form field (e.g. `TextField`, `Toggle`, `Checkbox`, `Radio`, `Select`) is a 🚨 blocker — a link nested inside a `<label>` is invalid HTML and causes serious accessibility issues. Links in **helper text** or **validation text** are acceptable, as those are plain text nodes, not interactive elements.                                                                                                                                                                                                                                |
| **No unimplemented component features**        | Compare what the design shows for each component instance against its Code Connect output. If the design uses a variant, prop, or slot that is absent from the Code Connect snippet (e.g. a `description` text area on a `Toggle` that Code Connect never renders), the feature does not exist in the DS yet and must be added before the design can be implemented as shown. **Routing:** record it in **Development Considerations** with 🚨 severity **and** add a matching row to **Required DS Changes**. Do **not** include it in Findings — CC gaps are developer/DS work, not designer-actionable. |
| **"NEW" suffix in layer name**                 | Layers named "XYZ NEW" signal a proposed new DS component that doesn't exist yet — flag as a required DS change.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Deprecated components**                      | Search for a `DEPRECATIONS.md` file in the repository (e.g. `packages/web-react/DEPRECATIONS.md` in Spirit). If not found locally, fetch it from [`packages/web-react/DEPRECATIONS.md`](https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/DEPRECATIONS.md) on GitHub as a reference. Check whether any components in the design appear in that file.                                                                                                                                                                                                                           |

When a layer lacks a Code Connect snippet and its structure or name suggests it may correspond to
a Spirit component, try to suggest a replacement:

1. **`search_design_system`** _(preferred, if available)_ — call with the layer's role or name
   (e.g. `"avatar"`, `"stat tile"`, `"navigation item"`). Available in Codex/Cursor environments.
2. **`get_code_connect_suggestions`** _(fallback)_ — call on the specific node. Available in the
   Figma desktop app MCP.

Use whichever tool is available in the current environment; skip silently if neither is. Include
a replacement suggestion in the finding only when the match is credible. Omit a suggestion when
results are ambiguous or the match is implausible.

### Step 5: Check Token Usage

Inspect the `get_design_context` output for hardcoded CSS literals. These indicate missing token
references in the design.

All token references must use one of three valid prefixes: `device`, `global`, or `themed`.
Any `var(--...)` that does not start with one of these is invalid regardless of which DS is in use.

**Spacing tokens:**

- Hardcoded `gap-[Xpx]`, `p-[Xpx]`, `m-[Xpx]` without a `var(--global/spacing/...)` reference → tokens missing; flag so the designer can attach the correct token.

**Color tokens:**

- Hardcoded hex/rgb values → tokens missing; flag as ⚠️.
- Token-referenced colors that do **not** start with `themed` → wrong token scope; colors must use `var(--themed/...)` tokens; flag as ⚠️.
- **Exception:** hardcoded colors on `<vector>` layers (SVG illustration paths) are expected and should NOT be flagged — illustrations embed colors by design and are not tokenised.

**Typography:**

- Verify text styles use `var(--device/typography/...)` tokens.
- Custom font-weight/size combinations outside the scale should be flagged.

**Radius / shadow:**

- Verify `border-radius` uses `var(--global/radius/...)` tokens.
- Verify `box-shadow` uses `var(--global/shadow/...)` or `var(--themed/shadow/...)` tokens.

### Step 6: Check Icon Usage

For every icon in the design:

1. Resolve the icon search path by trying the following in order, stopping at the first match:
   1. `packages/icons/src/` — Spirit's default icon path
   2. `libs/design-icons/` — Cyborg convention
   3. `iconsPath` value in `.agents/skills/review-figma-design/config.json` — custom override
      (set `iconsPath` to a relative path from the repo root; `null` skips this step)

   If none of the paths exist in the repository, skip the existence check and note in the report
   that the icon path could not be resolved.

2. Verify the icon name exists in the resolved path:
   ```text
   Grep for the icon name in <resolved-path>
   ```
3. Verify it is using `<Icon name="..." />` via Code Connect — not a raw SVG or image asset.
4. Route failures by type:
   - **Icon name missing from the codebase** — this is a joint designer + developer concern:
     - Record in **Findings** with 🚨 severity — the designer should make sure the icon is
       present in their Figma asset library and published so downstream consumers have access.
     - Record in **Development Considerations** with 🚨 severity **and** add a matching row to
       **Required DS Changes** (e.g. `Add missing icon "<name>"`) — the DS needs to ship the
       icon in code before the design can be implemented.
   - **Raw SVG / image asset instead of `<Icon name="..." />`** — this is a Code Connect
     binding concern. Record in **Development Considerations** with 🚨 severity and, if a DS
     fix is needed, add a row to **Required DS Changes**. Do **not** include it in Findings.

### Step 7: Spirit Repo Checks (Spirit Repo Only)

Check whether the skill is running inside the Spirit repo by testing for the presence of
`packages/web-react/`. If the directory does not exist, skip this step entirely — all JIRA cells
in the Required DS Changes table will be _to be created_.

If running in Spirit, perform the following:

1. **Cross-reference git history** — run `git log --oneline -50` and scan recent commit messages
   for `DS-` ticket references (e.g. `#DS-2300`). If a commit relates to a component or feature
   visible in the design (e.g. a recently shipped prop, a new component, a Code Connect update),
   note the ticket number and annotate the relevant finding — either to flag it as already in
   progress or to explain why something appears incomplete.

2. **Populate JIRA column** — for each row in the Required DS Changes table, check whether a
   matching `DS-` ticket was found in the git log. If yes, link it as
   `[DS-XXXX](https://jira.almacareer.tech/browse/DS-XXXX)`. If no matching ticket was found,
   write _to be created_.

### Step 8: Identify Required DS Changes

Based on your findings, list any changes needed in the DS itself:

- New components (e.g., "File Upload NEW" → new `FileUpload` component needed) — always a 🚨 blocker, as development cannot proceed without a DS component or an agreed implementation path
- Component updates (e.g., a prop variant that doesn't exist yet)
- Token additions (e.g., a spacing value not in the Spirit scale)
- Code Connect updates (e.g., a recently shipped feature not yet reflected in Code Connect)
- Missing icons (e.g., a name referenced in the design that is not present in `packages/icons/src/`)

Required DS Changes is the canonical work-item list for implementation issues. Every
severity-tagged item recorded in **Development Considerations** that requires DS work must have a
matching row here.

Estimate effort for each: **Low** (< 2h), **Medium** (2–8h), **High** (> 8h).

### Step 9: Compile Design Evaluation

Based on all findings from Steps 2–8, compile the generic checks table. Each row either passes (✅)
or fails (❌). This gives an at-a-glance view of what's correct as well as what isn't.

| Check                                                          | What to verify                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Top-level frame uses Section/Container structure _(page only)_ | See Step 2 for the full structure rules. Omit this row for `component` and `composition`.                                                                                                                                                                                                                                                                                                                   |
| Design tokens used for all values                              | No hardcoded `px`, hex, or rgb values — spacing, color, radius, shadow all use `var(--...)` tokens                                                                                                                                                                                                                                                                                                          |
| DS components used for all UI elements                         | Every UI element maps to a DS component instance (`<instance>` in metadata, Code Connect present in design context); no custom compositions where a DS component exists                                                                                                                                                                                                                                     |
| No detached or modified components                             | Detached instances appear as `<frame>` in metadata instead of `<instance>` — flag any `<frame>` whose name matches a known DS component. **Exception:** `<frame>` layers named `Container`, `Section`, `Stack`, or `Grid` are intentional named frames — skip these. Modified instances cannot be reliably detected via the Figma MCP; always show ❓ for the modified part and add a note below the table. |
| No unimplemented component features                            | Every variant, prop, or slot visible in the design for each component instance appears in its Code Connect output; anything absent from Code Connect is not yet implemented in the DS                                                                                                                                                                                                                       |
| No deprecated components                                       | No deprecated components or props used                                                                                                                                                                                                                                                                                                                                                                      |
| Icons from DS icon set                                         | All icons use `<Icon name="..." />` with a name that exists in the resolved icon path (see Step 6)                                                                                                                                                                                                                                                                                                          |

Specific findings do NOT go in this table — they are routed by audience per Steps 4 and 6:

- **Designer-actionable** (wrong component choice, missing token in a particular spot, detached
  component, deprecated component used, missing icon in the designer's asset library, etc.) →
  **Findings** (see Step 11).
- **Implementation-actionable** (Code Connect gaps, unimplemented component features, icon name
  missing from the codebase, raw SVG used instead of the `Icon` component, etc.) →
  **Development Considerations** with severity and, where DS work is required, a row in
  **Required DS Changes**.

See Step 11 for the detailed routing and format.

### Step 10: Capture Per-Finding Screenshots

1. Derive the output names:

   **Slugification rule** (used throughout): lowercase the input, replace whitespace, hyphens,
   pipes, and other non-alphanumeric characters with hyphens, collapse consecutive hyphens,
   trim leading/trailing hyphens.
   - **Single-frame mode:** `<topic-slug>` = slugified frame name, optionally prefixed with `[issue-id]-`.
     Example: `DS-2475-user-account-settings`
   - **Multi-frame mode (combined report):** `<topic-slug>` = slugified canvas/page name, optionally
     prefixed with `[issue-id]-`. Example: `DS-2475-reply-form`
   - `<report-name>` = `[issue-id]-design-review` (with issue ID) or `design-review` (without).
   - Output (both modes): `design-reviews/<topic-slug>/<report-name>.{md|html|pdf}`

2. Run `mkdir -p design-reviews/<topic-slug>` to create the output folder.
3. For each finding that references a specific node ID (not just the root frame), call
   `get_screenshot` with that node ID. The tool zooms to the node bounds automatically — no manual
   crop needed. Do NOT capture a screenshot for findings that only reference the root frame (already
   captured in Step 1).
4. Save each screenshot to `design-reviews/<topic-slug>/` as `finding-{n}.png`, where `{n}`
   matches the finding's number in the report (🚨 first, then ⚠️, then ℹ️, matching sort order).
   In multi-frame mode findings are numbered sequentially across all frames.
   The Figma MCP server returns images as base64 PNG — decode and save each one using the
   `save-screenshots.js` script in this skill's `scripts/` directory. Each argument is a `NODE_ID:PATH` pair
   (the script splits on the last colon, so node IDs like `2802:66561` work correctly):

   ```bash
   node .agents/skills/review-figma-design/scripts/save-screenshots.js \
     "NODE_ID_1:design-reviews/SLUG/finding-1.png" \
     "NODE_ID_2:design-reviews/SLUG/finding-2.png"
   ```

   Replace `NODE_ID_*` and `SLUG` with the actual values before running.

5. Keep a numbered index (finding → screenshot filename) to use during report writing.
6. If a finding spans multiple nodes and warrants more than one screenshot, use letters:
   `finding-1a.png`, `finding-1b.png`, `finding-1c.png`, …

7. Save the overview and compute pin positions for the HTML report:

   a. Decode and save the root screenshot to `<output-folder>/overview.png` using the same
   `save-screenshots.js` script (add an entry with the root node ID and path
   `<output-folder>/overview.png`). **Capture the overview's natural dimensions from the
   script's stdout** — the line has the form `Saved <path> (<width>x<height>)`. They are
   needed in step 7d below to size the overview box on the HTML cover.

   b. For each finding, compute its **absolute position within the root frame** by walking the
   metadata tree from that node up to the root frame and summing the `x`/`y` offsets of **every**
   ancestor (not including the root frame itself). This means building a parent map from the
   XML tree and following it all the way up — not just adding one parent's offset. For deeply
   nested nodes (e.g. a text layer inside a component inside a frame inside a section) every
   intermediate `x`/`y` must be accumulated; skipping levels produces pins that cluster
   incorrectly. Record:
   - `center_x = abs_x + width / 2`
   - `center_y = abs_y + height / 2`
   - `pin_left = round(center_x / canvas_w * 100, 1)` — percentage of canvas width
   - `pin_top  = round(center_y / canvas_h * 100, 1)` — percentage of canvas height

   Store `(n, pin_left, pin_top)` for each finding — these become the `style` values for the
   pin `<a>` elements in the HTML cover page (`style="left:XX.X%;top:YY.Y%"`).

   c. The canvas dimensions used for pin percentages (`canvas_w`, `canvas_h`) must come from
   the **root frame's bounding box** in `get_metadata`, not the overview PNG. The Figma
   screenshot may be rendered at a different resolution than the frame's logical coordinates,
   but the positions of findings are in logical units — matching the root frame is what keeps
   pins aligned with features in the image.

   d. Build the overview wrapper's inline style using the PNG dimensions captured in step 7a.
   The HTML cover sizes the overview with `aspect-ratio`, so the wrapper needs the image's
   natural ratio as a CSS custom property:

   ```html
   style="--overview-aspect: <width>/<height>;"</height></width>
   ```

   (note the leading space — the placeholder sits where an HTML attribute would). Substitute
   this into `{{OVERVIEW_WRAP_STYLE}}` when writing the HTML. Without it, the overview box
   falls back to an unconstrained aspect and the image will not fit the cover page correctly.

### Step 11: Write the Report

Output the complete report to the conversation first — the user reads it here. Then write the
identical content to `design-reviews/<topic-slug>/<report-name>.md` immediately, without asking for
confirmation. Both happen together; neither requires user approval.

Produce a structured Markdown report with the sections below. Use the same tone and format as the
team's existing reports — concise, developer-facing, no filler.

#### Frames Reviewed (multi-Frame Mode Only)

When running in multi-frame mode (combined report), include a **Frames Reviewed** section
immediately after the report's title block (date / type) and before the Design Evaluation section.
List every frame in the batch:

- With a Figma URL: link each frame name to its node in Figma using the file key from the URL
  (`https://www.figma.com/design/{fileKey}/{fileName}?node-id={nodeId}`).
- Without a URL: plain text names only.

```markdown
## Frames Reviewed

- [Frame One](https://www.figma.com/design/abc123/My-Design?node-id=100-200)
- [Frame Two](https://www.figma.com/design/abc123/My-Design?node-id=100-300)
- [Frame Three](https://www.figma.com/design/abc123/My-Design?node-id=100-400)
- [Frame Four](https://www.figma.com/design/abc123/My-Design?node-id=100-500)
```

Omit this section entirely for single-frame reviews.

#### Node ID Links

Node IDs in the report body serve two audiences: designers who click them to open the node in
Figma, and machines (search, scripts) that parse the source. The rendering rules differ by
invocation mode:

**Invoked with a Figma URL** — file key is available; render every node ID as a clickable link:

- In the body: ``[`34809:7052`][n-34809-7052]``
- At the end of the file, under an HTML comment `<!-- Node references -->`, add the definitions:
  `[n-34809-7052]: https://www.figma.com/design/{fileKey}/{fileName}?node-id=34809-7052`

The file key and file name come from the Figma URL passed at invocation. Node IDs in Figma URLs
use hyphens instead of colons (`34809:7052` → `34809-7052`). Strip any leading `I` prefix from
instance node IDs when constructing the URL (e.g. `I34809:7083` → `node-id=34809-7083`).

**Invoked without a URL** — file key is not available; node IDs must not appear as visible
text (they are meaningless to a reader who cannot click them). Instead, embed them in HTML
comments so they remain machine-readable in the source but are invisible in rendered Markdown
and PDF:

- In the body: write the finding description naturally, without the node ID in the prose.
  Append an HTML comment immediately after: `<!-- node:34809:7052 -->`
- Example: `The label in the toggle composition uses a raw hex color.<!-- node:34809:7052 -->`

Node IDs inside the fenced code block of Figma Comments are plain text and do not need links or
comments.

#### Score

Before the Design Evaluation table, calculate and emit the design quality score:

- **Score** = `round(✅_count / (✅_count + ❌_count) * 100)` — ❓ rows do not count toward either.
- Emit as an HTML div so the report CSS can style it as a large centred number:
  `<div class="score">72</div>`
- Place it between the `## Design Evaluation` heading and the table.

#### Design Evaluation Table

Include the generic checks table compiled in Step 9. Specific findings do NOT go in the table —
they are routed by audience:

- **Designer-actionable** → **Findings** (see below)
- **Implementation-actionable** (Code Connect gaps, unimplemented component features, icon name
  missing from the codebase) → **Development Considerations** and, when DS work is needed,
  **Required DS Changes**

**Findings are designer-facing only.** Every item here must be something a designer can act on
in Figma: wrong component, missing token, detached instance, deprecated component used,
structural issue, missing icon in the designer's asset library. Code Connect gaps and
unimplemented component features are implementation concerns and do not appear in Findings.

**Finding validation gate** — apply this test to every candidate Finding before writing it:

> Can the designer act on this in Figma, alone, without involving a developer?

If NO, reroute to **Development Considerations** (with severity) and, when DS work is required,
**Required DS Changes**. The Finding stays out of the Findings list.

**Automatic reroute triggers** — if a candidate Finding's description contains any of these
phrases it describes the state of Figma's Code Connect panel, not anything the designer can
change. Reroute to Development Considerations:

- "has no Code Connect" / "lacks Code Connect" / "no CC binding" / "CC is missing"
- "CC snippet" / "CC mapping" / "CC output" / "CC not updated" / "CC not connected"
- "Code Connect outputs …" / "Code Connect emits …" / "emits `X` snippet"
- "prop is not reflected in CC" / "`X` prop missing from Code Connect"

**Refresh caveat** — when re-running this skill against an existing report, do NOT preserve the
prior report's structure. Re-evaluate every pre-existing Finding against the validation gate
above; prior reviews may pre-date current routing rules.

**❌ Anti-examples — these are NOT Findings, reroute to Development Considerations:**

- `FileUpload has no Code Connect in Figma` → Dev Considerations 🚨 (+ Required DS Changes)
- `TextArea Code Connect lacks counter prop` → Dev Considerations ⚠️ (+ Required DS Changes)
- `Button Code Connect outputs placeholder icon name` → Dev Considerations ℹ️
- `Attachment Item row has no CC snippet` → Dev Considerations 🚨 (+ Required DS Changes)

- If a finding in **Findings** is already covered by a known DS ticket or in-progress work, add
  the ticket reference inline (e.g. `DS-2300`). This signals no new action is needed.
- Use collaborative, constructive language: "appears to", "should consider", "could use" rather than
  "uses wrong", "must", "needs to fix".
- Keep each finding to one sentence. State what and where — omit elaboration, rationale, and next steps unless they are non-obvious.
- Sort findings by severity: 🚨 first, then ⚠️, then ℹ️.

```markdown
## Design Evaluation

<div class="score">72</div>

| Result       | Check                                                          |
| ------------ | -------------------------------------------------------------- |
| ✅ / ❌      | Top-level frame uses Section/Container structure _(page only)_ |
| ✅ / ❌      | Design tokens used for all values                              |
| ✅ / ❌      | DS components used for all UI elements                         |
| ✅ / ❌ / ❓ | No detached or modified components                             |
| ✅ / ❌      | No unimplemented component features                            |
| ✅ / ❌      | No deprecated components                                       |
| ✅ / ❌      | Icons from DS icon set                                         |

> ❓ Modified component instances cannot be reliably detected via the Figma MCP. Please verify manually in Figma — modified instances show the message "The layout in this instance differs from the main component."

_(Include the ❓ note only when ❓ appears in the table. Omit it when all checks are ✅ or ❌.)_

### Findings

![Findings overview](overview.png)

_(With Figma URL — node IDs as clickable links):_

1. 🚨 **Specific finding** — [description] in [`34809:7052`][n-34809-7052].

   ![Finding 1: Short description](finding-1.png)

2. ⚠️ **Specific finding** — [description, ticket reference if covered e.g. [DS-XXXX](https://jira.almacareer.tech/browse/DS-XXXX)].

   ![Finding 2: Short description](finding-2.png)

_(Without Figma URL — node IDs in HTML comments, invisible in rendered output):_

1. 🚨 **Specific finding** — [description, no node ID in prose].<!-- node:34809:7052 -->

   ![Finding 1: Short description](finding-1.png)

2. ⚠️ **Specific finding** — [description, ticket reference if covered e.g. [DS-XXXX](https://jira.almacareer.tech/browse/DS-XXXX)].<!-- node:34809:7083 -->

   ![Finding 2: Short description](finding-2.png)

_(Omit the image line for findings that have no node-level screenshot.)_

## Development Considerations

### 🚨 Toggle `description` prop absent from Code Connect

The design uses a description slot on `Toggle` that the current Code Connect snippet does not
expose. Implementation is blocked until the DS ships it (see Required DS Changes #1).

### ⚠️ Icon `sparkle` missing from codebase

Referenced in the header but not present in `packages/icons/src/`. The DS needs to add it before
the design can be implemented as shown (see Required DS Changes #2).

### Composition pattern for hero block

No DS `Hero` component exists. Use `Stack` with `gap-600` and the existing `Heading` + `Text`
styles to reproduce the layout.

## Required DS Changes

| #   | Change                                  | Effort | JIRA            |
| --- | --------------------------------------- | ------ | --------------- |
| 1   | **New `XYZ` component** — ...           | High   | _to be created_ |
| 2   | **Update Code Connect for `ABC`** — ... | Low    | _to be created_ |

JIRA links are filled in by Step 7 when running in the Spirit repo. In all other repos, leave
every JIRA cell as _to be created_.
```

Development Considerations accepts two kinds of entries:

- **Severity-tagged implementation issues** — prefix the heading with the severity emoji
  (🚨/⚠️/ℹ️). Use these for Code Connect gaps, unimplemented component features, icons missing
  from the codebase, or any other implementation blocker that is not designer-actionable. Each
  entry must have a matching row in **Required DS Changes** when DS work is required.
- **Untagged notes** — composition patterns, known workarounds, anything non-obvious that the
  developer needs to know but that is not a defect per se. Omit the severity emoji.

Sort severity-tagged entries first (🚨 → ⚠️ → ℹ️), then notes.

#### HTML Report

After writing the MD, generate `<report-name>.html` in the same output folder. Write this file
directly — the same way you write the MD. The HTML is the PDF source; it does not need to be
readable as raw text.

All external links in the HTML (Figma node links, Figma file links) must use `target="_blank"` so
they open in a new tab when the report is viewed in a browser.

Read the HTML template from [`report-template.html`](report-template.html) in this skill's directory
and substitute all `{{PLACEHOLDER}}` values from the report:

- `{{SUBJECT}}` — page/frame name (e.g. `DS-2475 — Handoff | Job reply form`)
- `{{DATE}}` — review date (e.g. `2026-04-09`)
- `{{REVIEW_TYPE}}` — `Page`, `Component`, or `Composition`
- `{{SCORE}}` — numeric score (e.g. `67`)
- `{{EVAL_ROWS}}` — one `<tr>` per evaluation check (result + label)
- `{{OVERVIEW_WRAP_STYLE}}` — an HTML attribute string that sets the overview image's aspect
  ratio (e.g. ` style="--overview-aspect: 1440/1024;"` — note the leading space). See Step 10
  item 7d for how the width and height come from the overview PNG's dimensions
- `{{PINS}}` — one `<a class="pin" href="#finding-N">` per finding (links to the finding anchor)
- `{{FRAMES_REVIEWED}}` — _(multi-frame only)_ a `<div class="cover-footer">` block containing
  only the `<h2 class="section-label">Frames Reviewed</h2>` heading and a `<ul>` of frame links
  (no intro paragraph — it costs vertical space the cover page cannot spare); omit the entire
  block for single-frame reviews
- `{{FINDINGS}}` — one `.finding` block per finding
- `{{DEV_NOTES}}` — one `<li>` per development consideration, each containing `<h3 class="note-heading">` + `<p>`
- `{{DS_CHANGES}}` — required DS changes `<tr>` rows

**Severity classes:** map emoji to HTML class — 🚨 → `critical`, ⚠️ → `warning`, ℹ️ → `info`.
**Severity labels:** 🚨 → `Blocker`, ⚠️ → `Warning`, ℹ️ → `Info`.

**`{{EVAL_ROWS}}` example** (one row per check, circle icon first):

```html
<tr>
  <td><span class="check-icon check-pass">✓</span></td>
  <td>Top-level frame uses Section/Container structure</td>
</tr>
<tr>
  <td><span class="check-icon check-fail">✕</span></td>
  <td>Design tokens used for all values</td>
</tr>
<tr>
  <td><span class="check-icon check-doubt">?</span></td>
  <td>No detached or modified components</td>
</tr>
```

**`{{PINS}}` example** (one `<a>` per finding, linking to the finding anchor):

```html
<a href="#finding-1" class="pin" style="left:12.3%;top:45.6%">1</a>
<a href="#finding-2" class="pin" style="left:67.8%;top:22.1%">2</a>
```

**`{{FINDINGS}}` example** (one `.finding` block per finding, with `id` for pin anchors):

```html
<div class="finding" id="finding-2">
  <div class="finding-header warning">
    <span class="finding-num">2</span>
    <span class="finding-severity">Warning</span>
    <span class="finding-title">Hardcoded spacing in profile promo section</span>
  </div>
  <div class="finding-body">
    <p>
      The feature-list container uses <code>gap: 12px</code> without a token reference — could use
      <code>--global/spacing/space-600</code>.
    </p>
    <img src="finding-2a.png" alt="Finding 2" />
  </div>
</div>
```

Omit the `<img>` line for findings that have no node-level screenshot.

If `{{DS_CHANGES}}` is empty (no required changes), omit the entire Required DS Changes section.

### Step 12: Generate PDF

After writing the HTML report, print it to PDF immediately without asking for confirmation.
Use Chrome in headless mode — it renders the HTML faithfully (CSS Grid, `@page`, percentage
positioning of pins all work correctly):

```bash
# Find Chrome / Chromium
CHROME=$(ls -1 \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium" \
  "$(which google-chrome 2>/dev/null)" \
  "$(which chromium 2>/dev/null)" 2>/dev/null | head -1)

HTML="$(pwd)/<output-folder>/<report-name>.html"
PDF="$(pwd)/<output-folder>/<report-name>.pdf"

if [ -z "$CHROME" ]; then
  echo "Error: Chrome or Chromium is required for PDF generation" >&2
  exit 1
fi

# Primary path: Chrome CDP via pdf-gen.js
# Renders the footer (Spirit logo + page numbers) on every page and applies
# CSS @page named-page margins (cover: landscape, inner pages: portrait).
# Requires Node.js 22+ for the built-in WebSocket global.
node .agents/skills/review-figma-design/scripts/pdf-gen.js "$CHROME" "$HTML" "$PDF" || \
  # Fallback: plain Chrome CLI (no custom footer)
  "$CHROME" --headless=new \
    --print-to-pdf="$PDF" \
    --no-pdf-header-footer \
    "file://$HTML"
```

- `pdf-gen.js` uses Chrome's DevTools Protocol so the footer template
  (`<span class="pageNumber">` / `<span class="totalPages">`) renders on every page.
- Chrome resolves `src="overview.png"` and `src="finding-1.png"` relative to the HTML file —
  images in the same folder are embedded automatically.
- All hyperlinks (Figma node links) are preserved as clickable links in the PDF.
- If PDF generation fails, report success for the MD and HTML outputs and print a clear error
  message with the failed command so the user can retry manually.

### Step 13: Flag Figma Comments (if Needed)

For each issue found that requires the **designer** to make a change in Figma before dev, prepare
proposed Figma comments. Each comment must end with ` — <user-name> (via AI)` (the current git user name,
obtained via `git config user.name`) so the author is identifiable and the team knows the comment
was generated automatically — the whole team shares a single Figma account.

**Comments are sourced from Findings only.** Because Findings is strictly designer-actionable,
every item there is a candidate comment. Items in **Development Considerations** and
**Required DS Changes** never become Figma comments — they are for developers and DS
maintainers, not for the designer to act on in Figma.

**Use Figma variable paths, not CSS syntax.** Designers work with Figma variables, not CSS.
Reference variables without the `var(--...)` wrapper — write `global/spacing/space-1000`, not
`var(--global/spacing/space-1000)`. The same applies to all token prefixes (`device/...`,
`global/...`, `themed/...`).

Each comment body must be prefixed with the review title (`<issue-id> — <frame/canvas name>:`)
so readers can identify which review the comment belongs to. Example:
`DS-2475 — Reply Form: "Composition" layer uses gap: 40px …`

1. **Save to file** — write `figma-comments.md` in the report output folder
   (`design-reviews/<topic-slug>/figma-comments.md`). Use this format:

   ```markdown
   # Figma Comments — <topic-slug>

   Figma file: `<fileKey>` (<fileName>)
   Figma page: `<pageNodeId>` (<pageName>)

   - [ ] `1605:44215` — DS-2475 — Reply Form: "Composition" layer uses gap: 40px without a variable reference. Please attach a spacing variable.

     — Jane Doe (via AI)

   - [ ] `3999:14932` — DS-2475 — Reply Form: Vertical divider uses hardcoded #5c7dbf. Please attach a `themed/border/...` variable.

     — Jane Doe (via AI)
   ```

   The checkbox `- [ ]` marks a pending comment; `- [x]` means posted. When a Figma URL was
   provided, include the file key and file name so a future session can locate the file.

2. **Output to conversation** — after the report, list all proposed comments in the conversation
   so the user can review them immediately.

Do NOT post comments to Figma automatically — **unless `--post-comments-to-figma` was passed** at
invocation, in which case proceed directly to the Posting section below without asking for
confirmation. Otherwise, wait for the user to explicitly ask — they may want to review, edit, or
post the comments in a later session by asking the AI to read the `figma-comments.md` file.

#### Posting Comments to Figma

The Figma MCP server does not support posting comments. When the user asks to post, use the
Figma REST API via `curl`. A personal access token is required — read it from the
`FIGMA_PERSONAL_TOKEN` environment variable (prompt the user to set it if unset).

To attach each comment to its target node:

1. Use the **Figma page node ID** as `client_meta.node_id` — this ensures the comment lands on
   the correct page. The page ID is the canvas node from `get_metadata` (e.g. `2802:66563`).
   Store it in `figma-comments.md` alongside the file key.
2. Use the **target node's absolute center** as `client_meta.node_offset` — fetch the node's
   `absoluteBoundingBox` via `GET /v1/files/:key/nodes?ids=<nodeId>&depth=0` and compute
   `x = abs_x + width/2`, `y = abs_y + height/2`.

For each pending (`- [ ]`) comment in `figma-comments.md`, post it with:

```bash
curl -s -X POST "https://api.figma.com/v1/files/<fileKey>/comments" \
  -H "X-Figma-Token: $FIGMA_PERSONAL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "<comment text including signature>",
    "client_meta": {
      "node_id": "<pageNodeId>",
      "node_offset": { "x": <center_x>, "y": <center_y> }
    }
  }'
```

- `<fileKey>` — from the `Figma file:` line in `figma-comments.md`.
- `<pageNodeId>` — from the `Figma page:` line in `figma-comments.md`.
- `<center_x>`, `<center_y>` — absolute center of the target node (from its bounding box).
- `<comment text>` — the full comment including the review title prefix and signature.
  Preserve the blank line before the signature: use `\n\n` in the JSON string.

After a successful post (HTTP 200), flip the checkbox from `- [ ]` to `- [x]` in the file.
If a post fails, print the error and leave the checkbox unchecked.

---

## Severity Guide

| Severity    | Meaning                                  | Example                                                                      |
| ----------- | ---------------------------------------- | ---------------------------------------------------------------------------- |
| ✅ No issue | Fully aligned with DS                    | Components and tokens used correctly                                         |
| ℹ️ Minor    | Can be fixed easily before or during dev | Missing token reference, wrong spacing fallback                              |
| ⚠️ Moderate | Should be fixed before dev starts        | Wrong component used, non-standard pattern                                   |
| 🚨 Blocker  | Dev cannot start until resolved          | Custom component built where DS component exists, missing required DS change |

---

## What NOT to Flag

- Placeholder content (dummy text, "Label", "Root item") — these are expected in design files.
- Layout structure decisions (e.g., section order, padding choices) — these are design decisions, not DS issues.
- Missing responsive variants unless the design explicitly covers multiple breakpoints.
- Minor pixel rounding differences that result in the same visual outcome.

---

## Checklist

Before writing the final report:

- `get_metadata` called — root frame identified
- `get_design_context` called on all major sections
- `get_variable_defs` called — used to corroborate unbound token findings
- `get_screenshot` called for visual reference
- _(page)_ Top-level frame children checked for Section \[Size\] / Container \[Size\] naming
- _(component)_ Dictionary enum completeness checked against DICTIONARIES.md
- _(component)_ Interaction state completeness checked for all property combinations
- All component instances checked for Code Connect mapping
- `search_design_system` or `get_code_connect_suggestions` called for any layer with no Code Connect snippet that appears to be a custom primitive — replacement suggestion included when the match is credible
- Detached components identified (frames with DS component names) → flagged as findings
- Modified instances: not detectable via MCP — note in report that manual verification in Figma is required
- "NEW" layer names identified → flagged as required DS changes
- Spirit repo detected (`packages/web-react/` present) — if yes, `git log --oneline -50` checked, DS ticket references noted, JIRA column populated; if no, all JIRA cells set to _to be created_
- Hardcoded spacing values identified → cross-referenced with Spirit scale
- Hardcoded color values identified → flagged
- Typography tokens verified
- _(CC gaps)_ Every Finding passed the validation gate (Step 11): the designer can act on it alone in Figma. Code Connect gaps, CC mapping gaps, and unimplemented component features routed to **Development Considerations** (with severity) **and** **Required DS Changes** — never in Findings. When refreshing an existing report, every prior Finding was re-evaluated, not preserved as-is.
- _(icons)_ Icon names verified against codebase; failures dual-routed: **Findings** with 🚨 (designer — publish asset in Figma) **and** **Development Considerations** + **Required DS Changes** (developer — add to code)
- Output names derived per Step 10 — both modes: `design-reviews/<topic-slug>/`; multi-frame topic-slug comes from canvas name
- Root frame (or first frame in multi-frame) saved as `overview.png`; per-finding pin percentages computed by walking the **full** parent chain (Step 10 item 7b) — verify pins are spread across the overview, not clustered
- `get_screenshot` called for each finding with a node-level node ID — saved as `finding-{n}.png` (or `finding-{n}a.png`, `finding-{n}b.png` … for multi-screenshot findings); findings numbered sequentially across all frames in multi-frame mode
- _(multi-frame)_ Frames Reviewed section included listing all frames with links — single combined report, no per-frame ➤ marker
- Score calculated (✅ / (✅ + ❌) × 100) and emitted as `<div class="score">NN</div>` in the MD and as `{{SCORE}}` in the HTML
- MD report written to `<report-name>.md` (Design Evaluation → Development Considerations → Required DS Changes); `overview.png` embedded before findings
- HTML report written to `<report-name>.html` using the Step 11 template; cover page has score, eval table, and overview with CSS pin overlay
- Node IDs rendered as clickable links (with URL) or hidden in `<!-- node:… -->` comments (without URL) — never as plain visible text
- PDF generated from HTML via Chrome headless — or error printed if generation failed
- Figma comments saved to `figma-comments.md` in the output folder (if any actionable findings exist); each comment ends with ` — <git user name>`; NOT posted without user confirmation
