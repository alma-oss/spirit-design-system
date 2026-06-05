---
name: spirit:accessibility
description: >-
  Audit and improve web accessibility, semantics, ARIA, keyboard
  operability, focus management, contrast, following WCAG 2.2 guidelines. Always apply when adding or reviewing Spirit components and features. Also triggered by "improve accessibility", "a11y audit", "WCAG compliance", "screen reader support", "keyboard navigation", or "make accessible".
---

# Accessibility

Accessibility is a primary review lens for Spirit — design-system components are consumed everywhere,
so an a11y regression multiplies. Target **WCAG 2.2 AA**. Spans React (`.tsx`), vanilla HTML, and
SCSS.

A **blocking** finding is appropriate when a change removes or breaks accessibility that previously
worked (keyboard trap, lost focus, missing accessible name on an interactive control).

## Beyond the Component

A few WCAG 2.2-only success criteria are **application-level** and rarely actionable on an isolated
component — note them for consumers but don't force them onto a primitive: consistent help (`3.2.6`),
redundant entry (`3.3.7`), and accessible authentication (`3.3.8`).

## References

- `references/accessibility-checklist.md` — the detailed, actionable checklist (keyboard, screen
  readers, visual, forms, content, ARIA live regions, common anti-patterns, impact prioritization,
  and automated-testing commands).
- `references/accessibility-patterns.md` — worked, Spirit-adapted code patterns (icon-button names,
  `:focus-visible` with the `focus-ring` token, error fields, live regions, modal focus management,
  form labels, reduced motion, and the new 2.2 patterns).
