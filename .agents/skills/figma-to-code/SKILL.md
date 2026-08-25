---
name: spirit:figma-to-code
description: >-
  Implement production React UI from a Figma design using @alma-oss/spirit-web-react.
  Use when the requested output is React code and a Figma node, URL, selection, screenshot,
  or specification is provided. Do not use for design review, Code Connect authoring,
  code-to-Figma workflows, or non-React Spirit packages.
---

# Figma to Code

Convert a Figma design into React with `@alma-oss/spirit-web-react`. Target this repository’s
current main / latest v5 APIs. Do not invent APIs, tokens, breakpoints, routes, data, or assets.

Do **not** use this skill for:

- Design-system review or handoff reports — use `/spirit:review-figma-design`
- Writing or updating Figma Code Connect mappings
- Building or syncing designs **in** Figma from code
- Vanilla `packages/web` markup or other non-React packages

## References

- [Component selection](references/component-selection.md)
- [Layout](references/layout.md)
- [Typography](references/typography.md)
- [Cards](references/cards.md)
- [Forms](references/forms.md)
- Accessibility: `/spirit:accessibility`

## Source Authority

Resolve conflicts in this order. A later source does not override an earlier one.

1. **Valid APIs, defaults, deprecations, composition** — current Spirit source in this order:
   implementation, public types, `packages/web-react/DEPRECATIONS.md`, then the component README.
   If those disagree, implementation and types win. Do not copy stale README examples.
2. **Component identity and variants** — Figma Code Connect mappings (when present).
3. **Visual measurements, tokens, assets** — Figma design context, variables, and exported assets.
4. **Behavior, copy, routing, and accessibility** — product requirements and the surrounding app.

Normalize Code Connect and generated snippets to the current API: replace removed or deprecated
props, omit values equal to current defaults, and keep design intent. Code Connect is not always
complete or up to date.

Never guess from screenshots. If Figma data, Code Connect, or product context is missing, stop,
list the assumptions, and ask. Do not silently invent breakpoints, icon names, colors, spacing,
accessible names, hrefs, or image sources.

## Workflow

### 1. Acquire the Design

If a Figma design-to-code skill is available, follow it before calling `get_design_context`.

1. Parse a Figma URL when provided (`fileKey`, `nodeId` from `node-id` with `-` → `:`). If the MCP
   needs `fileKey` even for the current selection, ask for a node URL instead of guessing.
2. Call `get_design_context` first. Treat the returned code as a **reference**, not paste-ready
   output. Adapt it to Spirit React.
3. Use supporting tools only when needed: metadata to pick a node, variable definitions for tokens,
   screenshots for visual comparison, asset download for images/icons, motion context for animation.
4. When the MCP lets you set client context, request React and TypeScript.

### 2. Map Structure, Not Figma’s Layer Count

Preserve reading order, visual grouping, max-width boundaries, and Spirit composition contracts.
Figma frames often exist for editing, clipping, or naming — they are not 1:1 DOM nodes.

- Use a Spirit component when it owns the needed semantics, behavior, or styling contract.
- Use native semantic elements (`p`, `ul`/`ol`/`li`, `article`, `form`) when no Spirit component is
  responsible, including inside Card body content.
- Do not wrap extra layout components around Card, Dialog, Drawer, or other families that require a
  flat, ordered composition.
- Add `Container` only where a distinct width constraint exists. See [Layout](references/layout.md).
- When the design is a form, wrap **both** the field area and the action buttons in a named native
  `<form>`. See [Forms](references/forms.md).

### 3. Choose Components and Props

1. Route from Figma component names, text styles, and Code Connect to Spirit components using
   [Component selection](references/component-selection.md).
2. Confirm props against current types and defaults. Omit props that match defaults.
3. Heading and `UNSTABLE_DisplayHeading` `elementType` is always required. CardTitle already
   defaults to `h4`. Map Figma **Display/\*** styles to `UNSTABLE_DisplayHeading`, not `Heading`.
4. Keep exact icon identifiers from Figma: `Icon` uses `name`, `IconBox` uses `iconName`. Do not
   replace `placeholder` with a “better” icon.
5. Map Figma spacing tokens such as `--global/spacing/space-1400` to `spacing="space-1400"`.
6. Map CSS alignment to Spirit `alignmentX` / `alignmentY` (`flex-start` → `left`/`top`,
   `flex-end` → `right`/`bottom`). On vertical Flex, `align-items` is `alignmentX`. On horizontal
   Flex, `justify-content` is `alignmentX`.
7. Prefer `Box colorScheme` for semantic surfaces. Use component-specific color dictionaries; do
   not reuse Heading/Text colors on Box, Section, Link, or Button.

Deprecated or removed APIs must not appear in new code. Current traps:

- `emphasis` → `fontWeight` and `isItalic`
- Flex `row` / `column` → `horizontal` / `vertical` (plus `horizontal-reversed` when needed)
- `hideOnCollapse` → `isDisposable` on UncontrolledCollapse
- `CardDescription`, `CardTitle headingProps`, `CardLink isExternal`, Button `variant`

If Code Connect still emits those, tell the user and emit the current API.

### 4. Responsive Behavior

Spirit breakpoints are `mobile` from `0`, `tablet` from `48rem`, `desktop` from `80rem`
(typically 768px and 1280px). Do not infer a 1024px desktop breakpoint from frame width.

- Encode only transitions supported by Figma frames, variables, or annotations.
- A scalar applies at every breakpoint. Partial objects cascade forward
  (`{ mobile: 'small', desktop: 'large' }` keeps `small` on tablet).
- If only one frame is provided, match that frame. Do not invent other breakpoints.
- Figma layout guides (column counts, gutters) are often absent from MCP output. If the user
  mentions them, implement with Grid and ask when the column count is unclear.

### 5. Accessibility

Apply `/spirit:accessibility` and:

- Choose `elementType` from document outline, not from visual size. Visual style and semantics
  are independent.
- Prefer not to skip heading ranks; fix the outline rather than forcing a visual size onto the
  wrong tag.
- Preserve DOM source order. If Flex `horizontal-reversed` or similar changes visual order, keep
  the accessible reading order correct.
- Give controls accessible names, states, and relationships (label, description, error, required).
- Decide decorative vs informative for images and icons; do not invent alt text from pixels.
- Do not nest interactive elements. A stretched CardLink may coexist with footer buttons because
  Card raises those controls; do not add extra wrapping links.
- Honor reduced-motion and focus management for Dialog, Drawer, Dropdown, and similar overlays.
- Personal-data fields get WCAG 1.3.5 `autoComplete` tokens. Checkbox-revealed fields get
  `aria-expanded` always and `aria-controls` only while those IDs exist in the DOM. See
  `/spirit:accessibility` for the token table and worked example.

### 6. Assets

- Prefer Figma MCP assets, files already in the repo, or an explicit product image source.
- MCP asset URLs expire; for committed code, download the bytes or wire the app’s image source.
- Do not use `picsum.photos` or other random remote placeholders.
- If no asset is available, use a clearly labeled local placeholder and flag it in the handoff.

## Validation

Validation is required, not optional. After implementation:

1. Confirm every Spirit prop against current types. Fix invalid token names and removed APIs.
2. Run linters on edited files (`ReadLints` in this repo) and fix new issues.
3. Run relevant unit tests when the change lives in this repository.
4. Render and compare. In this repo: start Vite with `make start` or `yarn start`
   (`http://localhost:3456/packages/web-react/`), inspect with Playwright MCP, then use Docker
   Make targets (`make test-e2e`, `make test-e2e-a11y`) for suite runs. Do not skip visual
   comparison silently.
5. Re-fetch Figma context if the implementation drifted from tokens, icons, or composition.

If a gate cannot run, say so in the handoff (`verified` vs `unverified`) and list what was skipped.

## Implementation Checklist

- \[ \] Design acquired with `get_design_context`; missing data flagged, not guessed
- \[ \] Code Connect intent kept; snippets normalized to current APIs and defaults
- \[ \] Icon identifiers unchanged (`Icon name`, `IconBox iconName`)
- \[ \] No deprecated or removed APIs (`emphasis`, `row`/`column`, `hideOnCollapse`, `CardDescription`)
- \[ \] Semantic structure preserved; Figma-only wrapper frames not copied 1:1
- \[ \] Heading `elementType` set; Display/\* → `UNSTABLE_DisplayHeading`; typography mapped by text style, not by size alone
- \[ \] Form wraps fields and actions; submit first in DOM; `autoComplete` on personal-data fields
- \[ \] Responsive values exist only where Figma supports them; breakpoints are Spirit tokens
- \[ \] Assets are stable; alt/decorative decisions are explicit
- \[ \] Accessibility, TypeScript, lint, render, and (when in this repo) tests/a11y checks ran — or the handoff is marked unverified
- \[ \] Unclear patterns were asked about instead of improvised
