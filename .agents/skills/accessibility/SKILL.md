---
name: spirit:accessibility
description: >-
  Accessibility (a11y) review knowledge for the Spirit Design System — semantics, ARIA, keyboard
  operability, focus management, contrast, and the repo's a11y test infrastructure. A first-class
  lens for a design system. Loaded by the accessibility reviewer; standalone-invokable when reviewing
  only a11y. Use when reviewing or building accessible Spirit components.
---

# Accessibility (Spirit)

Accessibility is a primary review lens for Spirit — design-system components are consumed everywhere,
so an a11y regression multiplies. Target **WCAG 2.1 AA** (the repo baseline; 2.2 is the direction of
travel). Spans React (`.tsx`), vanilla HTML, and SCSS. Pairs with `spirit:html` for semantics and
`spirit:design-system` for the focus-ring/contrast tokens.

A **blocking** finding is appropriate when a change removes or breaks accessibility that previously
worked (keyboard trap, lost focus, missing accessible name on an interactive control).

## Semantics First, ARIA Second

- Prefer native semantic elements (`button`, `a`, `input`, `nav`, `ul`) over `div`/`span` with
  added ARIA. ARIA is a fallback, not a default. See `spirit:html`.
- **No redundant or conflicting ARIA** — e.g. `role="button"` on a `<button>`, or an `aria-label`
  that contradicts visible text.
- Every interactive control needs an **accessible name** (visible label, `aria-label`, or
  `aria-labelledby`). Icon-only controls must have a name.

## Keyboard & Focus

- All interactive elements must be **operable by keyboard** (Tab to reach, Enter/Space to activate,
  Escape to dismiss overlays where expected).
- **No keyboard traps**; focus order follows visual order.
- **Manage focus** for overlays/dialogs/menus: move focus in on open, restore it on close, and trap
  it within modal surfaces.
- **Visible focus indicator** — never remove the focus outline without an equivalent; use the
  design system's `focus-ring` token (see `spirit:design-system`). `:focus-visible`
  is preferred over `:focus` for pointer interactions.

## Forms

- Every input has an associated `<label>` (or equivalent). Placeholder text is not a label.
- Errors are associated programmatically (`aria-describedby`) and announced; validation state is not
  conveyed by color alone.
- Group related controls with `fieldset`/`legend`.

## Visual & Motion

- **Color is not the only signal** — state/meaning must also be conveyed non-visually.
- Contrast must meet AA; rely on the design tokens, which are designed to pass.
- Respect `prefers-reduced-motion` for animation.

## Content for Assistive Tech

- Use `VisuallyHidden` (Spirit provides it) for screen-reader-only text rather than `display:none`,
  which removes content from the accessibility tree.
- Decorative images/icons are hidden from AT (`aria-hidden`/empty `alt`); meaningful ones have text
  alternatives.
- Dynamic updates that must be announced use an appropriate live region.

## Tests

- web-react keeps shared accessibility tests under `tests/accessibilityTests/` and per-component
  `*.accessibility.test.tsx`. A new or changed interactive component without an accessibility test is
  a `todo`.
- web has SCSS a11y tooling under `scss/tools/_accessibility.scss`.

## Checklist

`references/accessibility-checklist.md` — the detailed, actionable checklist (keyboard, screen
readers, visual, forms, content, ARIA live regions, and common anti-patterns). The
`accessibility-reviewer` applies it.
