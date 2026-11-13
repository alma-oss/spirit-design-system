---
name: css-first
description: CSS-first expert guidance with live Web Platform Baseline data. Use for CSS implementations, modern CSS features, browser support, Baseline status, progressive enhancement, or newly available web-platform features.
---

# CSS First

Solve interface work with semantic HTML and CSS before proposing JavaScript. Prefer
modern, standards-based CSS when it matches the user's target browsers and preserve
the core experience with progressive enhancement when support is incomplete.

## Workflow

1. Identify the visual or interaction intent and inspect the project's framework,
   browser targets, writing modes, and existing conventions.
2. Search [`css-demos/INDEX.md`](css-demos/INDEX.md) for a matching pattern.
3. When support or recency matters, fetch the current Baseline record using
   [`references/live-mdn-fetch.md`](references/live-mdn-fetch.md). Treat checked-in
   labels as dated snapshots, not permanent facts.
4. Rank solutions by semantic fit, accessibility, interoperability, and maintenance
   cost. Prefer logical properties and native CSS capabilities.
5. If the selected feature is Limited Availability or has no WebStatus record, show
   a usable fallback and gate the enhancement with `@supports` when practical.
6. Verify syntax and behavior in a real browser when the environment provides one.

## Baseline Vocabulary

Use the Web Platform Status meaning exactly. Do not convert global usage percentages
into Baseline labels.

| API status | Label                     | Meaning                                                                 |
| ---------- | ------------------------- | ----------------------------------------------------------------------- |
| `widely`   | 🟢 Widely Available       | Interoperable in the core browser set for at least 30 months            |
| `newly`    | 🔵 Newly Available        | Interoperable in the core browser set for less than 30 months           |
| `limited`  | 🟡 Limited Availability   | Not Baseline because core-browser coverage is incomplete                |
| missing    | 🟣 Experimental / unknown | No usable WebStatus record; inspect specifications and browser releases |

Browser-version percentages can be useful supplementary data, but never determine a
Baseline category.

## Rules

Read only the references needed for the task:

- [`references/rules/css-only-enforcement.md`](references/rules/css-only-enforcement.md)
  — decide when CSS is sufficient and when JavaScript is genuinely required.
- [`references/rules/logical-properties-first.md`](references/rules/logical-properties-first.md)
  — prefer writing-mode-aware properties.
- [`references/rules/modern-css-features.md`](references/rules/modern-css-features.md)
  — select modern features, including Chrome 148–152 additions.
- [`references/rules/semantic-intent-analysis.md`](references/rules/semantic-intent-analysis.md)
  — map the request to the right CSS primitive.
- [`references/rules/framework-awareness.md`](references/rules/framework-awareness.md)
  — adapt examples to the repository.
- [`references/rules/browser-support-consideration.md`](references/rules/browser-support-consideration.md)
  — report Baseline and support accurately.
- [`references/rules/progressive-enhancement.md`](references/rules/progressive-enhancement.md)
  — layer optional features over a working core.
- [`references/rules/browser-verification.md`](references/rules/browser-verification.md)
  — verify browser-facing behavior.

## Current Chrome Additions

The demo catalog covers author-facing CSS shipped or announced from Chrome 148
through Chrome 152, including name-only and comma-separated container queries,
`at-rule()` and `named-feature()` support tests, animatable `zoom`, rounded
`polygon()`, `text-fit`, `background-clip: border-area`, CSS `image()` values,
image-valued `light-dark()`, `flex-wrap: balance`, `overscroll-behavior: chain`,
print `page-margin-safety`, SVG `path-length`, `ruby-overhang`, media-state pseudo-classes, `alpha()`,
`window-drag`, and installed-app accent system colors.

Use the feature's demo header and live WebStatus entry together: Chrome shipping does
not by itself mean a feature is Baseline.

## Maintaining Snapshots

From this skill directory, run:

```bash
python3 scripts/update_baseline.py --check
python3 scripts/update_baseline.py --write
```

`--check` reports drift without changing files. `--write` refreshes mapped demo
headers and their matching entries in `css-demos/INDEX.md` from the official
WebStatus API. Features without a WebStatus record stay manual and must cite their
release note or specification.

## Quick Reference

| Intent                      | Preferred CSS                                     | Demo                                                 |
| --------------------------- | ------------------------------------------------- | ---------------------------------------------------- |
| Component responsiveness    | Container queries                                 | `css-demos/container/size-queries.css`               |
| Parent-aware styles         | `:has()`                                          | `css-demos/layout/has-selector.css`                  |
| Balanced wrapped flex lines | `flex-wrap: balance`                              | `css-demos/layout/flex-wrap-balance.css`             |
| Entry animation             | `@starting-style`                                 | `css-demos/animation/starting-style.css`             |
| Scroll effects              | Scroll-driven animations                          | `css-demos/animation/scroll-driven.css`              |
| Native tooltip placement    | Anchor positioning                                | `css-demos/positioning/anchor-positioning.css`       |
| Responsive headline fitting | `text-fit`                                        | `css-demos/visual/text-fit.css`                      |
| Theme-aware images          | `light-dark()` / `image()`                        | `css-demos/visual/css-image-values.css`              |
| Media playback state        | `:playing`, `:paused`, and related pseudo-classes | `css-demos/interaction/media-state-pseudos.css`      |
| Installed-app drag region   | `window-drag`                                     | `css-demos/interaction/window-drag.css`              |
| Reduced motion              | `prefers-reduced-motion`                          | `css-demos/accessibility/prefers-reduced-motion.css` |
| Decorative variation        | `random()`                                        | `css-demos/functions/random-function.css`            |
| Normalize a range           | `progress()`                                      | `css-demos/functions/progress-function.css`          |

Use MDN for syntax and caveats and WebStatus for Baseline:

- https://developer.mozilla.org/en-US/docs/Web/CSS
- https://webstatus.dev/
- https://web.dev/baseline/
