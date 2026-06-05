# Accessibility Skill

Applies the Spirit accessibility review lens — semantics-first markup, ARIA, keyboard operability,
focus management, forms, contrast, motion, and screen-reader content. Targets WCAG 2.2 AA.
Spans React, vanilla HTML, and SCSS.

## Usage

Invoked automatically when adding or reviewing Spirit components. Also triggered by phrases like
"improve accessibility", "a11y audit", "WCAG compliance", "screen reader support", "keyboard
navigation", or "make accessible".

Or explicitly:

```text
/spirit:accessibility
```

## What It Does

1. Loads the Spirit-specific [accessibility checklist](references/accessibility-checklist.md)
   covering keyboard navigation, screen readers, visual, forms, ARIA live regions, and common
   anti-patterns.
2. Loads [accessibility code patterns](references/accessibility-patterns.md) — worked examples using
   Spirit primitives (`VisuallyHidden`, `$focus-ring`, SCSS a11y mixins).
3. Applies the checklist as a review lens: flags regressions as **blocking**; other issues as
   `todo` or `suggestion`.

## What It Does Not Do

- **Cannot run automated tests** — does not execute Lighthouse, axe-core, or any test suite.
  Run `yarn dlx lighthouse <url>` or `yarn dlx @axe-core/cli <url>` for an automated pass.
- **Cannot replace manual testing** — screen reader (VoiceOver / NVDA), 200% zoom, and
  `prefers-reduced-motion` checks require a real browser session.
- **Does not check design tokens** — contrast is the designer's responsibility; the skill only
  flags hardcoded color values that bypass the token system.

## Reference Files

| File                                                                             | Contents                                                                                        |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`references/accessibility-checklist.md`](references/accessibility-checklist.md) | Actionable WCAG 2.2 AA checklist — keyboard, screen readers, visual, forms, ARIA, anti-patterns |
| [`references/accessibility-patterns.md`](references/accessibility-patterns.md)   | Spirit-adapted code patterns with worked examples                                               |
