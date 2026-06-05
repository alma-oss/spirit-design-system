---
name: spirit:accessibility
description: >-
  Audit and improve web accessibility, semantics, ARIA, keyboard
  operability, focus management, contrast, following WCAG 2.2 guidelines. Use when asked to "improve accessibility", "a11y audit", "WCAG compliance", "screen reader support", "keyboard navigation", or "make accessible".
---

# Accessibility

Accessibility is a primary review lens for Spirit — design-system components are consumed everywhere,
so an a11y regression multiplies. Target **WCAG 2.2 AA**. Spans React (`.tsx`), vanilla HTML, and
SCSS.

WCAG is organized around four principles — content must be **P**erceivable, **O**perable,
**U**nderstandable, and **R**obust — across three conformance levels (A, **AA** ← our target, AAA).
The sections below map to how the work shows up in Spirit; WCAG success-criterion numbers (e.g.
`2.5.8`) are cited inline so a finding can point at the exact criterion.

A **blocking** finding is appropriate when a change removes or breaks accessibility that previously
worked (keyboard trap, lost focus, missing accessible name on an interactive control).

## Semantics First, ARIA Second

- Prefer native semantic elements (`button`, `a`, `input`, `nav`, `ul`) over `div`/`span` with
  added ARIA. ARIA is a fallback, not a default.
- **No redundant or conflicting ARIA** — e.g. `role="button"` on a `<button>`, or an `aria-label`
  that contradicts visible text.
- Every interactive control needs an **accessible name** (visible label, `aria-label`, or
  `aria-labelledby`) — name/role/value (`4.1.2`). Icon-only controls must have a name.

## Keyboard & Focus

- All interactive elements must be **operable by keyboard** (`2.1.1`): Tab to reach, Enter/Space to
  activate, Escape to dismiss overlays where expected.
- **No keyboard traps** (`2.1.2`); focus order follows visual order (`2.4.3`).
- **Manage focus** for overlays/dialogs/menus: move focus in on open, restore it on close, and trap
  it within modal surfaces.
- **Visible focus indicator** (`2.4.7`) — never remove the focus outline without an equivalent; use
  the design system's focus-ring token. `:focus-visible` is preferred over `:focus` for pointer
  interactions.
- **Focus not obscured** (`2.4.11`, new in 2.2) — when an element takes focus it must not be fully
  hidden by sticky headers/footers or overlapping panels; reserve space with `scroll-margin`.

## Forms

- Every input has an associated `<label>` (or equivalent). Placeholder text is not a label.
- Errors are associated programmatically (`aria-describedby`) and announced; validation state is not
  conveyed by color alone.
- Group related controls with `fieldset`/`legend`.

## Visual & Motion

- **Color is not the only signal** (`1.4.1`) — state/meaning must also be conveyed non-visually.
- Contrast must meet AA (`1.4.3`: 4.5:1 text, 3:1 large text & UI components); rely on the design
  tokens, which are designed to pass.
- **Target size** (`2.5.8`, new in 2.2) — interactive targets are at least 24×24 CSS px, unless an
  inline link, browser-sized, or sufficiently spaced. Aim larger (44×44) for primary actions.
- **Dragging movements** (`2.5.7`, new in 2.2) — any drag action has a single-pointer alternative
  (e.g. buttons, an input).
- Respect `prefers-reduced-motion` for animation (`2.3.3`).

## Content for Assistive Tech

- Use `VisuallyHidden` (Spirit provides it) for screen-reader-only text rather than `display:none`,
  which removes content from the accessibility tree.
- Decorative images/icons are hidden from AT (`aria-hidden`/empty `alt`); meaningful ones have text
  alternatives.
- Dynamic updates that must be announced use an appropriate live region (`4.1.3`).

## Beyond the Component

A few new 2.2 success criteria are **application-level** and rarely actionable on an isolated
component — note them for consumers but don't force them onto a primitive: consistent help (`3.2.6`),
redundant entry (`3.3.7`), and accessible authentication (`3.3.8`).

## Tests

- web-react keeps shared accessibility tests under `packages/web-react/tests/accessibilityTests/` and
  per-component `packages/web-react/src/components/<Component>/__tests__/*.accessibility.test.tsx`. A
  new or changed interactive component without an accessibility test is a `todo`.
- web has SCSS a11y tooling under `packages/web/src/scss/tools/_accessibility.scss`.

## References

- `references/accessibility-checklist.md` — the detailed, actionable checklist (keyboard, screen
  readers, visual, forms, content, ARIA live regions, common anti-patterns, impact prioritization,
  and automated-testing commands). The `accessibility-reviewer` applies it.
- `references/accessibility-patterns.md` — worked, Spirit-adapted code patterns (icon-button names,
  `:focus-visible` with the `focus-ring` token, error fields, live regions, modal focus management,
  form labels, reduced motion, the new 2.2 patterns, and screen-reader command shortcuts).
