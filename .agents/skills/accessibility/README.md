# Accessibility

Accessibility (a11y) review knowledge for Spirit, a first-class lens for a design system.

## Purpose

Covers semantics-first markup, correct ARIA, keyboard operability and focus management, the
`focus-ring` token and `:focus-visible`, forms, color/motion, screen-reader content (`VisuallyHidden`),
and the repo's a11y test infrastructure. Targets WCAG 2.1 AA. Spans React, HTML, and SCSS together,
so it catches issues a single-technology lens cannot. The actionable detail lives in
`references/accessibility-checklist.md`.

## Usage

Loaded (via `cat`) by the `accessibility-reviewer` alongside `spirit:design-system` and
the code-review methodology. Invoke `/spirit:accessibility` to apply this lens directly when reviewing only
accessibility.

## Related Skills

- `spirit:html` — semantic markup foundation.
- `spirit:react` — accessible component behavior.
- `spirit:design-system` — focus-ring and contrast tokens.
