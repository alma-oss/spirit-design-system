# Modern CSS Feature Selection

Choose the smallest native CSS primitive that expresses the intent. Prefer semantics,
logical properties, accessibility, and interoperability over novelty.

## Selection Order

1. Start with broadly interoperable layout and styling primitives.
2. Prefer container-aware behavior for reusable components and viewport-aware
   behavior for page-level composition.
3. Use state selectors, HTML attributes, and native controls before JavaScript state.
4. Check the exact feature's live Baseline record.
5. Layer Limited Availability or experimental syntax over a usable fallback.
6. Verify syntax in MDN/specification and behavior in a real target browser.

## Core Modern Toolkit

- Layout: Grid, Flexbox, subgrid, logical properties, intrinsic sizing, `gap`,
  `aspect-ratio`, and container queries.
- Responsive design: range media queries, dynamic viewport units, container units,
  size/style/scroll-state queries, and preference media queries.
- Selectors and cascade: `:has()`, `:is()`, `:where()`, `:focus-visible`,
  `:user-valid`, nesting, `@layer`, and `@scope`.
- Color and visual design: modern color spaces, `color-mix()`, relative colors,
  `light-dark()`, gradients, masks, and `backdrop-filter`.
- Motion: `@starting-style`, discrete transitions, view transitions, scroll-driven
  animations, and `interpolate-size` / `calc-size()` where supported.
- Native interaction: popovers, customizable select, CSS carousels, interest
  invokers, anchor positioning, scroll snap, and overscroll control.

Never assign a static Baseline label from this list. Fetch the current status using
[`../live-mdn-fetch.md`](../live-mdn-fetch.md).

## Chrome 148–152 Additions

Chrome shipping information is a browser release fact, not proof of Baseline. Use the
listed demo for syntax and query WebStatus separately.

| Capability                    | Syntax / intent                           | Demo                                     |
| ----------------------------- | ----------------------------------------- | ---------------------------------------- |
| Name-only container query     | `@container sidebar { ... }`              | `container/named-queries.css`            |
| Detect an at-rule             | `@supports at-rule(@scope)`               | `responsive/supports-rule.css`           |
| Roll back the current rule    | `revert-rule`                             | `specificity/revert-rule.css`            |
| Skip all underline ink        | `text-decoration-skip-ink: all`           | `visual/text-decoration-skip-ink.css`    |
| Gap decorations               | `row-rule`, `column-rule`                 | `visual/gap-decorations.css`             |
| Crisp bitmap scaling          | `image-rendering: crisp-edges`            | `visual/image-rendering.css`             |
| Shape functions around floats | `shape-outside: shape(...)`               | `visual/shape-outside-functions.css`     |
| Rounded polygons              | `polygon(round 1rem, ...)`                | `visual/rounded-polygon.css`             |
| Animate page zoom             | transition or animation of `zoom`         | `animation/animatable-zoom.css`          |
| URL request mode              | `url(...) cross-origin(...)`              | `visual/css-image-values.css`            |
| Fit text to a box             | `text-fit: grow per-line-all`             | `visual/text-fit.css`                    |
| Paint the border area         | `background-clip: border-area`            | `visual/background-clip-border-area.css` |
| Solid-color CSS image         | `image(oklch(...))`                       | `visual/css-image-values.css`            |
| Theme-aware image             | `light-dark(url(...), image(...))`        | `visual/css-image-values.css`            |
| Query alternative containers  | comma-separated `@container` queries      | `container/comma-separated-queries.css`  |
| Protect print margin boxes    | `page-margin-safety: clamp                | add`                                     | `responsive/page-margin-safety.css` |
| Balance flex lines            | `flex-wrap: balance`                      | `layout/flex-wrap-balance.css`           |
| Detect named features         | `@supports named-feature(...)`            | `responsive/supports-rule.css`           |
| Allow scroll chaining         | `overscroll-behavior: chain`              | `interaction/overscroll-behavior.css`    |
| Normalize SVG path distance   | `path-length: 100`                        | `visual/svg-path-length.css`             |
| Control ruby overhang         | `ruby-overhang: auto                      | spaces                                   | none`                               | `visual/ruby-overhang.css` |
| Style media playback state    | `:playing`, `:paused`, `:buffering`, etc. | `interaction/media-state-pseudos.css`    |
| Replace a color's alpha       | `alpha(from var(--color) / .7)`           | `visual/relative-alpha.css`              |
| Installed-app drag region     | `window-drag: move`                       | `interaction/window-drag.css`            |
| Installed-app accent colors   | `AccentColor`, `AccentColorText`          | `theming/system-accent-colors.css`       |

Some release features have no dedicated WebStatus ID yet. Keep their headers manual,
include the Chrome release source, and describe them as experimental/unknown rather
than forcing them into another feature's record.

## CSS-First Boundaries

CSS is the right tool for presentation, responsive layout, declarative visual state,
focus/target state, scroll-linked effects, and native control styling. Use JavaScript
when the request needs business logic, persistent application state, network work,
arbitrary data transformation, or unsupported interaction semantics. Do not disguise
JavaScript-required behavior as a fragile selector trick.

## Accessibility Checks

- Preserve keyboard focus and native semantics.
- Wrap non-essential motion in `prefers-reduced-motion` handling.
- Confirm contrast in both color schemes and forced-colors mode.
- Avoid hover-only or pointer-only access to information.
- Treat fallback content and controls as the core experience.
