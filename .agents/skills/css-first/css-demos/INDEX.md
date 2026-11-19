# CSS Demos Index

All CSS demos are organized by category with direct MDN links, baseline status, and browser support.

## Layout

### [centering-logical.css](layout/centering-logical.css)

**Modern Centering with Logical Properties**

- Baseline: 🟢 Widely Available
- MDN: [Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values), [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout)
- Task: Center a card horizontally and vertically
- Features: align-content, flexbox, grid, place-items, auto margins

### [logical-spacing.css](layout/logical-spacing.css)

**Advanced Logical Spacing**

- Baseline: 🟢 Widely Available
- MDN: [Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values)
- Task: Create responsive spacing that works in any writing mode
- Features: Logical spacing, container units, writing modes

### [subgrid.css](layout/subgrid.css)

**CSS Subgrid**

- Baseline: 🟢 Widely Available
- MDN: [Subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid)
- Task: Align nested grid items to parent grid tracks
- Features: `grid-template-rows: subgrid`, `grid-template-columns: subgrid`, named lines

### [has-selector.css](layout/has-selector.css)

**:has() Relational Pseudo-Class**

- Baseline: 🟢 Widely Available
- MDN: [:has()](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)
- Task: Style parents based on children, siblings, or form state
- Features: Parent selection, quantity queries, sibling awareness, form validation

### [css-nesting.css](layout/css-nesting.css)

**Native CSS Nesting**

- Baseline: 🟢 Widely Available
- MDN: [CSS Nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting)
- Task: Write component styles with native CSS nesting
- Features: `&` nesting selector, nested media/container queries, compound selectors

### [grid-lanes-masonry.css](layout/grid-lanes-masonry.css)

**CSS Grid Lanes — Masonry Layout**

- Baseline: 🟣 Experimental (Safari TP 234+, Firefox behind flag)
- WebKit: [Introducing CSS Grid Lanes](https://webkit.org/blog/17660/introducing-css-grid-lanes/)
- Task: Create masonry (waterfall) layouts with pure CSS
- Features: `display: grid-lanes`, `grid-template-columns`, lane spanning, explicit placement, horizontal brick layout, `@supports` fallback

### [isolation-stacking.css](layout/isolation-stacking.css)

**isolation: isolate — Stacking Context Control**

- Baseline: 🟢 Widely Available
- MDN: [isolation](https://developer.mozilla.org/en-US/docs/Web/CSS/isolation)
- Task: Fix z-index issues by creating explicit stacking contexts
- Features: `isolation: isolate`, component-scoped z-index, mix-blend-mode containment, z-index scale with custom properties

### [stretch-keyword.css](layout/stretch-keyword.css)

**stretch Sizing Keyword**

- Baseline: 🟡 Limited Availability
- MDN: [stretch](https://developer.mozilla.org/en-US/docs/Web/CSS/stretch)
- Task: Fill containing block while respecting margins
- Features: `inline-size: stretch`, margin-safe full-width, form inputs, sticky bars, comparison vs `100%`, `@supports` fallback

### [column-wrap.css](layout/column-wrap.css)

**Multi-Column Wrapping — column-wrap & column-height**

- Baseline: 🟣 Experimental (Chrome 145+)
- Spec: CSS Multi-column Layout Module Level 2
- Reference: [Multi-column wrapping (Chrome Blog)](https://developer.chrome.com/blog/multicol-wrapping)
- Task: Make multi-column layouts wrap into rows instead of overflowing inline
- Features: `column-wrap` (`wrap`/`balance`/`balance-all`), `column-height`, full-viewport column carousel, magazine-style article layout, `@supports` fallback

### [flex-wrap-balance.css](layout/flex-wrap-balance.css)

**Balanced Flex Wrapping**

- Baseline: 🟣 Experimental / unknown
- Reference: [Chrome 150](https://developer.chrome.com/release-notes/150)
- Task: Balance item distribution across wrapped flex lines
- Features: `flex-wrap: balance`, `@supports` fallback

### [reading-flow.css](layout/reading-flow.css)

**reading-flow & reading-order — Visual Focus Order**

- Baseline: 🟡 Limited Availability
- MDN: [reading-flow](https://developer.mozilla.org/en-US/docs/Web/CSS/reading-flow), [reading-order](https://developer.mozilla.org/en-US/docs/Web/CSS/reading-order)
- Reference: [Use CSS reading-flow (Chrome Blog)](https://developer.chrome.com/blog/reading-flow), [Interop 2027 proposal #1349](https://github.com/web-platform-tests/interop/issues/1349)
- Task: Make Tab order and screen readers follow the visual order of reordered flex/grid items
- Features: `reading-flow: flex-visual` (row-reverse toolbar), `grid-rows` (dense grid), `grid-order` (responsive `order`), `source-order` + `reading-order` promotion, positive-tabindex caveat, `@supports` fallback

---

## Responsive

### [media-queries.css](responsive/media-queries.css)

**Modern Media Queries — Range Syntax + Logical Queries**

- Baseline: 🟢 Widely Available
- MDN: [@media](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media)
- Task: Write modern, readable media queries with range syntax
- Features: `(width >= 900px)`, `(600px <= width <= 899px)`, preference queries, interaction queries

### [supports-rule.css](responsive/supports-rule.css)

**@supports Feature Detection**

- Baseline: 🟡 Limited Availability
- MDN: [@supports](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports)
- Task: Detect CSS feature support and provide progressive enhancement
- Features: Property support, `selector()`, `font-tech()`, `at-rule()` at-rule detection (Chrome 148+), `and`/`or`/`not` operators

### [viewport-units.css](responsive/viewport-units.css)

**Modern Viewport Units — Small, Large, Dynamic**

- Baseline: 🟢 Widely Available
- Reference: [Viewport Units (web.dev)](https://web.dev/blog/viewport-units)
- MDN: [Viewport-relative lengths](https://developer.mozilla.org/en-US/docs/Web/CSS/length#relative_length_units_based_on_viewport)
- Task: Size elements relative to the viewport with mobile-safe units
- Features: `svw/svh/svi/svb`, `lvw/lvh/lvi/lvb`, `dvw/dvh/dvi/dvb`, `*vmin/*vmax`, fluid typography, scroll-snap sections

### [page-margin-safety.css](responsive/page-margin-safety.css)

**Printable-Area Safety**

- Baseline: 🟣 Experimental / unknown
- Reference: [Chrome 150](https://developer.chrome.com/release-notes/150)
- Task: Keep print headers and footers out of printer-specific unprintable areas
- Features: `page-margin-safety: none | clamp | add`, `@page` margin boxes

---

## Container Queries

### [size-queries.css](container/size-queries.css)

**Container Size Queries**

- Baseline: 🟢 Widely Available
- MDN: [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
- Task: Make components responsive to their container, not the viewport
- Features: `container-type: inline-size`, named containers, container units (cqi, cqb, cqw, cqh, cqmin, cqmax)

### [style-queries.css](container/style-queries.css)

**Container Style Queries**

- Baseline: 🔵 Newly Available
- MDN: [Style Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@container#querying_custom_properties)
- Task: Style components based on parent custom property values
- Features: `@container style(--prop: value)`, theme switching, component theming

### [scroll-state-queries.css](container/scroll-state-queries.css)

**Scroll State Container Queries**

- Baseline: 🟡 Limited Availability
- MDN: [Scroll State Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_conditional_rules/Container_scroll-state_queries)
- Task: Style elements based on scroll state (scrollable, stuck, snapped)
- Features: `scroll-state(stuck:)`, `scroll-state(snapped:)`, `scroll-state(scrollable:)`, breadcrumb scroll mask with `@property` + `mask` edge fade

### [anchored-queries.css](container/anchored-queries.css)

**Anchored Container Queries**

- Baseline: 🟡 Limited Availability
- Reference: [Chrome Blog](https://developer.chrome.com/blog/anchored-container-queries)
- Task: Query which anchor position fallback is active and adapt styles
- Features: `container-type: anchored`, `@container anchored(fallback:)`, tooltip arrow direction

### [named-queries.css](container/named-queries.css)

**Name-Only Container Queries**

- Support: Chrome 148+
- MDN: [@container](https://developer.mozilla.org/en-US/docs/Web/CSS/@container), [container-name](https://developer.mozilla.org/en-US/docs/Web/CSS/container-name)
- Reference: [Chrome 148 Beta (Chrome Blog)](https://developer.chrome.com/blog/chrome-148-beta)
- Task: Target a container by name alone — no `container-type` required
- Features: `container-name` without `container-type`, unconditional `@container <name>` scoping, name-based `style()` queries, when size queries still need `container-type`

### [comma-separated-queries.css](container/comma-separated-queries.css)

**Comma-Separated Container Queries**

- Baseline: 🟣 Experimental / unknown for the comma-separated syntax
- Reference: [Chrome 150](https://developer.chrome.com/release-notes/150)
- Task: Apply one container rule when any query in a list matches
- Features: comma-separated `@container` conditions, repeated-rule fallback

---

## Animation

### [view-transitions.css](animation/view-transitions.css)

**View Transitions — From CSS-Only MPA to Element-Scoped Transitions**

- Baseline: 🟡 Limited Availability
- MDN: [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- Task: Add smooth transitions between page states — MPA, SPA, and scoped
- Features: CSS-only MPA transitions (`@view-transition { navigation: auto }`), transition `types` + `:active-view-transition-type()`, pseudo-element tree (`::view-transition`, `::view-transition-group`, `::view-transition-image-pair`, `::view-transition-old/new`), selector syntax (`*.class`, `name.class`, `*`), `view-transition-name: match-element` (SPA auto-pairing), `view-transition-class` (dot notation), nested groups (`view-transition-group: contain/nearest/<name>`, `::view-transition-group-children()`), element-scoped transitions (Chrome 147+ — concurrent animations, name reuse across scopes, `view-transition-scope`), custom old/new animations, `object-fit` on snapshots, `mix-blend-mode: plus-lighter`, performance/CWV notes, accessibility (`prefers-reduced-motion` wrapping)
- Reference: [CSS View Transitions (Lukáš Chylík)](https://lukaschylik.dev/blog/articles/css-view-transitions/)

### [scroll-driven.css](animation/scroll-driven.css)

**Scroll-Driven Animations**

- Baseline: 🟡 Limited Availability
- MDN: [Scroll Timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/scroll), [View Timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view)
- Task: Create animation that responds to scroll
- Features: Scroll timeline, view timeline, animation-range

### [scroll-triggered.css](animation/scroll-triggered.css)

**Scroll-Triggered Animations**

- Baseline: 🟣 Experimental (Chrome 145+)
- Reference: [Chrome Blog](https://developer.chrome.com/blog/scroll-triggered-animations)
- Task: Fire time-based animations when elements cross a scroll offset
- Features: `animation-trigger`, `timeline-trigger-name`, `timeline-trigger-source`, `trigger-scope`, decoupled triggers, staggered entries, scrollytelling

### [starting-style.css](animation/starting-style.css)

**Entry/Exit Animations with @starting-style + interpolate-size**

- Baseline: 🔵 Newly Available
- MDN: [@starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style), [interpolate-size](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size)
- Task: Animate elements entering/exiting the DOM
- Features: `@starting-style`, `transition-behavior: allow-discrete`, `interpolate-size: allow-keywords`, dialog/popover/details animation, dialog body scroll lock with `scrollbar-gutter: stable`

### [animatable-zoom.css](animation/animatable-zoom.css)

**Animatable zoom**

- Baseline: 🟣 Experimental / unknown for animation
- MDN: [zoom](https://developer.mozilla.org/en-US/docs/Web/CSS/zoom)
- Task: Animate visual size when layout reflow is intentional
- Features: animatable `zoom`, transition, reduced-motion handling

---

## Theming

### [light-dark-function.css](theming/light-dark-function.css)

**Dark Mode with light-dark() Function**

- Baseline: 🔵 Newly Available
- MDN: [light-dark()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark), [color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)
- Task: Implement dark mode support
- Features: light-dark() function, color-scheme property

### [system-accent-colors.css](theming/system-accent-colors.css)

**Installed-App Accent System Colors**

- Baseline: 🟣 Experimental / unknown
- Reference: [Chrome 150](https://developer.chrome.com/release-notes/150)
- Task: Match installed web-app controls to the operating-system accent
- Features: `AccentColor`, `AccentColorText`, system-color fallback

---

## Positioning

### [anchor-positioning.css](positioning/anchor-positioning.css)

**Anchor Positioning for Tooltips**

- Baseline: 🟡 Limited Availability
- MDN: [Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)
- Task: Create tooltips positioned relative to elements
- Features: anchor-name, position-anchor, position-area, position-try, @supports fallback

---

## Interaction

### [css-carousel.css](interaction/css-carousel.css)

**CSS Carousel — Slider, Tabs, Scroll Spy, Series**

- Baseline: 🟣 Experimental (Chrome 135+)
- MDN: [CSS Carousel Features](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow/Carousels)
- Task: Build carousels, tabs, and scroll spy with only CSS
- Features: `::scroll-button()`, `::scroll-marker-group`, `::scroll-marker`, `:target-current`, `:target-before`, `scroll-state()`, anchor positioning
- Patterns: Horizontal slider, tab panels, vertical scroll spy, Netflix-style series grid

### [interest-invokers.css](interaction/interest-invokers.css)

**Interest Invokers — Hover/Focus-Triggered Popovers**

- Baseline: 🟡 Limited Availability
- MDN: [Interest Invokers](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using_interest_invokers), [interest-delay](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/interest-delay)
- Task: Show popovers on hover/focus without JavaScript
- Features: `interestfor` attribute, `popover="hint"`, `interest-delay`, `:interest-target`, link previews, mega-menu, anchor positioning

### [flip-card.css](interaction/flip-card.css)

**Flip Card / 3D Tile — backface-visibility**

- Baseline: 🟢 Widely Available
- MDN: [backface-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility), [transform-style](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style), [perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective)
- Task: Create flip cards, 3D tiles, and reveal-on-hover UI patterns
- Features: `backface-visibility: hidden`, `transform-style: preserve-3d`, `perspective`, horizontal/vertical flip, product tiles, team cards, keyboard accessible, `prefers-reduced-motion`

### [perspective-3d.css](interaction/perspective-3d.css)

**CSS 3D Transforms & Perspective**

- Baseline: 🟢 Widely Available
- MDN: [perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective), [transform-style](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style)
- Task: Build 3D scenes — cubes, carousels, rotating forms, tilt effects
- Features: CSS cube construction, face navigation via `:target`, form-on-cube, 3D carousel, tilt-on-hover, isometric scene with floor, text ring, scroll-driven 3D rotation, perspective guide, 3D flattening gotchas

### [popover.css](interaction/popover.css)

**Popover API with CSS**

- Baseline: 🔵 Newly Available
- MDN: [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API), [:popover-open](https://developer.mozilla.org/en-US/docs/Web/CSS/:popover-open)
- Task: Create popovers, dropdowns, and tooltips with HTML + CSS only
- Features: `popover` attribute, `:popover-open`, `::backdrop`, anchor positioning, invoker commands, dialog `closedby`

### [overscroll-behavior.css](interaction/overscroll-behavior.css)

**overscroll-behavior**

- Baseline: 🟡 Limited Availability
- MDN: [overscroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior)
- Task: Prevent scroll chaining, pull-to-refresh, and bounce effects
- Features: `overscroll-behavior`, `overscroll-behavior-block`, `overscroll-behavior-inline`, contain/none values, modal scroll locking, carousel containment

### [scroll-margin-padding.css](interaction/scroll-margin-padding.css)

**scroll-margin & scroll-padding**

- Baseline: 🟢 Widely Available
- MDN: [scroll-margin](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin), [scroll-padding](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding)
- Task: Prevent anchor-linked sections from scrolling behind fixed navigation
- Features: `scroll-margin-block-start`, `scroll-padding-block-start`, fixed/sticky nav offset, scroll-snap offsets, logical properties, dynamic nav height

### [target-focus-within.css](interaction/target-focus-within.css)

**:target & :focus-within Pseudo-Selectors**

- Baseline: 🟢 Widely Available
- MDN: [:target](https://developer.mozilla.org/en-US/docs/Web/CSS/:target), [:focus-within](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within)
- Task: Highlight anchor-linked sections, animate on navigation, style containers on child focus
- Features: `:target` highlight/animate, CSS-only modal, tab switching, `:focus-within` form highlight, floating labels, search expand, dropdown keep-open, table row highlight

### [hover-media-queries.css](interaction/hover-media-queries.css)

**Hover and Pointer Media Queries**

- Baseline: 🟢 Widely Available
- MDN: [@media/hover](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover), [@media/pointer](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer)
- Task: Adapt interaction patterns for touch vs pointer devices
- Features: `@media (hover:)`, `@media (pointer:)`, `@media (any-hover:)`, touch target sizing

### [media-state-pseudos.css](interaction/media-state-pseudos.css)

**Media Element State Pseudo-Classes**

- Baseline: 🟡 Limited Availability
- Reference: [Chrome 152 beta](https://developer.chrome.com/blog/chrome-152-beta)
- Task: Style audio and video from native playback state
- Features: `:playing`, `:paused`, `:seeking`, `:buffering`, `:stalled`, `:muted`, `:volume-locked`

### [window-drag.css](interaction/window-drag.css)

**Installed-App Drag Regions**

- Baseline: 🟣 Experimental / unknown
- Reference: [Chrome 152 beta](https://developer.chrome.com/blog/chrome-152-beta)
- Task: Create a draggable custom title bar for an installed desktop web app
- Features: `window-drag: move | none`, interactive-child exclusion

---

## Visual

### [form-validation.css](visual/form-validation.css)

**Modern Form with CSS-Only Validation**

- Baseline: 🟢 Widely Available
- MDN: [:user-valid](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-valid), [:user-invalid](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid)
- Task: Style form with validation feedback
- Features: :user-valid, :user-invalid, :focus-visible, :has() form validation

### [color-mix.css](visual/color-mix.css)

**color-mix() Function**

- Baseline: 🟢 Widely Available
- MDN: [color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)
- Task: Create color variations, tints, shades, and transparency from a single base
- Features: `color-mix()` in oklch/srgb, tints, shades, transparency, interactive states

### [gap-decorations.css](visual/gap-decorations.css)

**Gap Decorations — column-rule & row-rule**

- Baseline: 🟡 Limited Availability
- Support: gap decorations (grid/flex) — Chrome 139+
- MDN: [column-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule)
- Reference: [Gap Decorations (Chrome Blog)](https://developer.chrome.com/blog/gap-decorations-stable)
- Task: Draw separator lines between grid columns, flex items, or multicol columns
- Features: `column-rule`, `row-rule`, `repeat()` patterns, `column-rule-inset` (+ `overlap-join`), `column-rule-break` (`none`/`intersection`), `column-rule-visibility-items` (`between`/`around`), multicol/grid/flex support, `@supports` fallback

### [backdrop-filter.css](visual/backdrop-filter.css)

**backdrop-filter — Glassmorphism & Background Effects**

- Baseline: 🔵 Newly Available
- MDN: [backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- Task: Apply visual effects to the area behind an element
- Features: `blur()`, `brightness()`, `contrast()`, `grayscale()`, `hue-rotate()`, `invert()`, `saturate()`, `sepia()`, glassmorphism, frosted nav, tinted glass, `@supports` fallback

### [relative-colors.css](visual/relative-colors.css)

**Relative Color Syntax — Color Conversion & Channel Manipulation**

- Baseline: 🔵 Newly Available
- MDN: [Using Relative Colors](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Colors/Using_relative_colors)
- Task: Create color variants, convert between color spaces, manipulate channels
- Features: `oklch(from var(--color) ...)`, lighten/darken, opacity adjust, desaturate, complementary/triadic palettes, color space conversion, dynamic theming, tint/shade scales

### [relative-alpha.css](visual/relative-alpha.css)

**Relative Alpha Colors**

- Baseline: 🟣 Experimental / unknown for `alpha()`
- Reference: [Chrome 152 beta](https://developer.chrome.com/blog/chrome-152-beta)
- Task: Replace only a color's alpha channel
- Features: `alpha(from <color> / <alpha>)`, `@supports` fallback

### [clip-path-shape.css](visual/clip-path-shape.css)

**clip-path: shape() — Responsive Clipping & Scroll Morphing**

- Baseline: 🔵 Newly Available
- MDN: [clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)
- Reference: [CSS shape() (Chrome Blog)](https://developer.chrome.com/blog/css-shape)
- Task: Create responsive clip shapes with curves, animate/morph them on scroll
- Features: `shape()` function (from, line, curve, arc, close), `@property` + scroll-driven morphing, hover blob, responsive notched card, `@supports` fallback

### [rounded-polygon.css](visual/rounded-polygon.css)

**Rounded polygon() Corners**

- Baseline: 🟣 Experimental / unknown for the round parameter
- Reference: [Chrome 150](https://developer.chrome.com/release-notes/150)
- Task: Round polygon corners without hand-authored curves
- Features: `polygon(round <length>, ...)`, plain-polygon fallback

### [mix-blend-mode.css](visual/mix-blend-mode.css)

**mix-blend-mode — Adaptive Content & Visual Blending**

- Baseline: 🟢 Widely Available
- MDN: [mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)
- Task: Make text/content adapt color based on background, create visual effects
- Features: `difference` for adaptive text, `multiply` image tint, `screen` glow, `exclusion`, `isolation: isolate` containment, all blend modes reference

### [corner-shape.css](visual/corner-shape.css)

**CSS corner-shape Property**

- Baseline: 🟡 Limited Availability
- Spec: CSS Borders and Box Decorations Module Level 4
- MDN: [corner-shape](https://developer.mozilla.org/en-US/docs/Web/CSS/corner-shape)
- Reference: [Implementing corner-shape (Chrome Blog)](https://developer.chrome.com/blog/implementing-corner-shape)
- Task: Create modern border shapes — bevels, scoops, squircles, notches, tooltip arrows
- Features: `corner-shape` shorthand (round, squircle, bevel, scoop, notch, square), `superellipse()` function with custom values, physical longhands (`corner-top-left-shape` etc.), logical longhands (`corner-start-start-shape` etc.), side shorthands, mixed corners (per-corner shapes), backdrop-filter/outline/box-shadow follow shape, tooltip arrow with scoop, animated morphing + transition, `@supports` fallback

### [border-shape.css](visual/border-shape.css)

**CSS border-shape Property**

- Baseline: 🟡 Limited Availability
- Spec: [CSS Borders and Box Decorations Module Level 4](https://drafts.csswg.org/css-borders-4/#border-shape)
- Reference: [Chrome Platform Status](https://chromestatus.com/feature/5459864205393920), [Interop 2027 proposal #1371](https://github.com/web-platform-tests/interop/issues/1371)
- Task: Draw non-rectangular borders — circles, hexagons, speech bubbles, scooped cards — that shadows and clipping follow
- Features: stroke mode (one shape, `half-border-box`), fill mode (outer + inner shapes), `circle()`/`polygon()`/`shape()` with arcs, relevant-side rule, `box-shadow` following the shape, inner-shape overflow clip, `border-radius` as free fallback (ignored when shaped), animated polygon morph, `@supports` fallback

### [text-box-trim.css](visual/text-box-trim.css)

**text-box-trim & text-box-edge — Optical Text Alignment**

- Baseline: 🟡 Limited Availability
- MDN: [text-box-trim](https://developer.mozilla.org/en-US/docs/Web/CSS/text-box-trim), [text-box-edge](https://developer.mozilla.org/en-US/docs/Web/CSS/text-box-edge)
- Reference: [CSS text-box-trim (Chrome Blog)](https://developer.chrome.com/blog/css-text-box-trim)
- Task: Remove extra whitespace above/below text for pixel-perfect vertical centering
- Features: `text-box-trim`, `text-box-edge`, `text-box` shorthand, cap/alphabetic/ex metrics, buttons, badges, headings, `@supports` fallback

### [text-justify.css](visual/text-justify.css)

**text-justify — Justification Method Control**

- Baseline: 🟡 Limited Availability
- MDN: [text-justify](https://developer.mozilla.org/en-US/docs/Web/CSS/text-justify)
- Spec: CSS Text Module Level 3
- Task: Control how text-align: justify distributes space — between words or characters
- Features: `inter-word` (Latin scripts), `inter-character` (CJK / stylistic), `auto` (browser decides by language), `none` (disable), `letter-spacing`/`word-spacing` percentage values (Chrome 145+), practical patterns (article body + hyphens, narrow column override, expanded heading)

### [overflow-clip-margin.css](visual/overflow-clip-margin.css)

**overflow: clip + overflow-clip-margin**

- Baseline: 🟡 Limited Availability
- MDN: [overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow), [overflow-clip-margin](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-clip-margin)
- Task: Clip overflow while keeping focus outlines, shadows, and decorations visible
- Features: `overflow: clip`, `overflow-clip-margin`, single-axis clipping, focus ring preservation, badge/ribbon overflow, `@supports` fallback

### [shape-outside-functions.css](visual/shape-outside-functions.css)

**shape-outside — rect(), xywh(), path(), shape()**

- Support: Chrome 149+
- MDN: [shape-outside](https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside), [path()](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/path), [shape()](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/shape)
- Reference: [Chrome 149 Beta (Chrome Blog)](https://developer.chrome.com/blog/chrome-149-beta)
- Task: Wrap inline text around a non-rectangular float exclusion shape
- Features: `rect()`/`xywh()` rectangle exclusions, `path()` SVG-path exclusion, `shape()` unit-aware geometry, `shape-margin`, `@supports` fallback

### [text-decoration-skip-ink.css](visual/text-decoration-skip-ink.css)

**text-decoration-skip-ink: all**

- Baseline: 🔵 Newly Available
- MDN: [text-decoration-skip-ink](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip-ink)
- Reference: [Chrome 148 Beta (Chrome Blog)](https://developer.chrome.com/blog/chrome-148-beta)
- Task: Control how underlines skip over glyph descenders, including CJK
- Features: `auto` (default), `all` (force skipping for every glyph incl. CJK), `none` (unbroken line), mixed-script typography

### [image-rendering.css](visual/image-rendering.css)

**image-rendering — Crisp Scaling for Pixel Art**

- Baseline: 🔵 Newly Available
- MDN: [image-rendering](https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering)
- Reference: [Chrome 149 Beta (Chrome Blog)](https://developer.chrome.com/blog/chrome-149-beta)
- Task: Scale small raster images up without blurring them
- Features: `auto` (smooth), `crisp-edges` (edge-preserving), `pixelated` (nearest-neighbour), sprites/QR/pixel-art game canvas use cases

### [font-variant-numeric.css](visual/font-variant-numeric.css)

**font-variant-numeric — Numeric Typography Control**

- Baseline: 🟢 Widely Available
- MDN: [font-variant-numeric](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
- Task: Pick the right numeral glyphs — equal-width digits, slashed zero, old-style figures, fractions, ordinals
- Features: `tabular-nums` for tables/timers/prices/counters (no digit jitter), `slashed-zero`, `lining-nums`/`oldstyle-nums`, `diagonal-fractions`/`stacked-fractions`, `ordinal`, `font-feature-settings` low-level fallback, `ch`-unit sizing

### [text-fit.css](visual/text-fit.css)

**Responsive Text Fitting**

- Baseline: 🟡 Limited Availability
- Reference: [Chrome 150](https://developer.chrome.com/release-notes/150)
- Task: Grow or shrink text to fill the containing box
- Features: `text-fit: grow`, `shrink`, `consistent`, `per-line`, `per-line-all`

### [background-clip-border-area.css](visual/background-clip-border-area.css)

**Gradient Border Painting**

- Baseline: 🟡 Limited Availability
- MDN: [background-clip](https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip)
- Task: Paint gradient borders without wrappers or `border-image`
- Features: `background-clip: border-area`, layered-background fallback

### [css-image-values.css](visual/css-image-values.css)

**Modern CSS Image Values**

- Baseline: 🟡 Limited Availability
- Reference: [Chrome 150](https://developer.chrome.com/release-notes/150)
- Task: Generate solid images, theme image values, and control CSS resource requests
- Features: `image(<color>)`, image-valued `light-dark()`, `cross-origin()` URL modifier

### [svg-path-length.css](visual/svg-path-length.css)

**SVG path-length CSS Property**

- Baseline: 🟣 Experimental / unknown
- Reference: [Chrome 150](https://developer.chrome.com/release-notes/150)
- Task: Normalize SVG geometry for predictable dash animation
- Features: `path-length`, `stroke-dasharray`, custom progress values

### [ruby-overhang.css](visual/ruby-overhang.css)

**Ruby Annotation Overhang**

- Baseline: 🟡 Limited Availability
- MDN: [ruby-overhang](https://developer.mozilla.org/en-US/docs/Web/CSS/ruby-overhang)
- Task: Control ruby annotation intrusion into adjacent text
- Features: `ruby-overhang: auto | spaces | none`

---

## Functions & Values

### [random-function.css](functions/random-function.css)

**random() Function**

- Baseline: 🟡 Limited Availability
- MDN: [random()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/random)
- Task: Vary decorative shapes without JavaScript
- Features: Range, step interval, named value sharing, `@supports` fallback

### [progress-function.css](functions/progress-function.css)

**progress() Function**

- Baseline: 🔵 Newly Available
- MDN: [progress()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/progress)
- Task: Map a value between two bounds to a unitless ratio
- Features: Clamped 0–1 progress, `no-clamp` extrapolation, `@supports` fallback

### [calc-size.css](functions/calc-size.css)

**calc-size() Function**

- Baseline: 🟡 Limited Availability
- MDN: [calc-size()](https://developer.mozilla.org/en-US/docs/Web/CSS/calc-size)
- Reference: [Interop 2027 proposal #1373](https://github.com/web-platform-tests/interop/issues/1373)
- Task: Do math on intrinsic sizes and animate to the result
- Features: `calc-size(auto, size + 1rem)` expand transition, `round(up, size, …)` vertical rhythm, `fit-content` + `max()` pills, `field-sizing` input, `details::details-content` accordion, when to prefer `interpolate-size`, `@supports` fallback

### [inherit-function.css](functions/inherit-function.css)

**inherit() Function**

- Baseline: 🟣 Experimental / unknown
- Spec: [CSS Values and Units Module Level 5](https://drafts.csswg.org/css-values-5/#inherit-notation)
- Reference: [Chrome Platform Status](https://chromestatus.com/feature/5996914579472384), [Interop 2027 proposal #1453](https://github.com/web-platform-tests/interop/issues/1453)
- Task: Read and adjust the parent's custom property value in place
- Features: nesting depth counter, concentric border radii, compounding scale, custom-property-only limitation (Level 5), per-level selector fallback

### [css-if-function.css](functions/css-if-function.css)

**CSS if() Function**

- Baseline: 🟡 Limited Availability
- MDN: [if()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/if)
- Task: Apply conditional values inline without at-rules
- Features: `if(style():)`, `if(media():)`, `if(supports():)`, nested `if()`, logical operators, use in `calc()` and shorthands, `else: revert-rule` to drop a declaration when no condition matches

### [custom-functions.css](functions/custom-functions.css)

**CSS Custom Functions (@function) and Mixins (@mixin)**

- Baseline: 🟡 Limited Availability
- MDN: [@function](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@function), [Custom Functions Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Custom_functions_and_mixins)
- Task: Create reusable CSS functions that accept arguments and return values
- Features: `@function`, `result:` descriptor, typed parameters, composing functions, design tokens, `@mixin`/`@apply` (spec only)

### [advanced-attr.css](functions/advanced-attr.css)

**Advanced attr() Function**

- Baseline: 🟡 Limited Availability
- MDN: [attr()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/attr)
- Reference: [Chrome Blog](https://developer.chrome.com/blog/advanced-attr)
- Task: Read HTML attributes as typed CSS values — colors, numbers, lengths
- Features: `type(<color>)`, `type(<integer>)`, `type(<custom-ident>)`, dimension units, `raw-string`, `@property` + `attr()` conic progress demo, fallbacks

### [sibling-functions.css](functions/sibling-functions.css)

**sibling-index() & sibling-count() Functions**

- Baseline: 🟡 Limited Availability
- MDN: [sibling-index()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-index), [sibling-count()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-count)
- Spec: CSS Values and Units Module Level 5
- Task: Dynamically style elements based on their position among siblings — like SCSS `@for` loops but resolved at render time
- Features: Staggered animations (one-line), reverse stagger, rainbow colors, progressive sizing, circular layout without `--i`, dynamic opacity, equal-width flex columns, combined width+color distribution, zero-based index loop (numbered list with relative-color ramp + `contrast-color()` + counters), SCSS `@for` vs `sibling-index()` comparison

### [trigonometric-functions.css](functions/trigonometric-functions.css)

**CSS Trigonometric Functions — sin(), cos(), tan(), atan2()**

- Baseline: 🟢 Widely Available
- MDN: [sin()](https://developer.mozilla.org/en-US/docs/Web/CSS/sin), [cos()](https://developer.mozilla.org/en-US/docs/Web/CSS/cos), [tan()](https://developer.mozilla.org/en-US/docs/Web/CSS/tan), [atan2()](https://developer.mozilla.org/en-US/docs/Web/CSS/atan2)
- Reference: [CSS trigonometric functions (web.dev)](https://web.dev/articles/css-trig-functions)
- Task: Position elements in circles, arcs, and radial patterns with pure CSS
- Features: Circular menus, animated reveals, semicircle/arc layouts, clock faces, orbit animations, wave patterns, spirals, `@property` + trig, `tan()` slope geometry (diagonal placement, angled section divider, parallelogram lean), `atan2()` pointer rotation

### [contrast-color.css](functions/contrast-color.css)

**contrast-color() Function**

- Baseline: 🔵 Newly Available
- MDN: [contrast-color()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/contrast-color)
- Task: Automatically pick black or white text for maximum contrast
- Features: WCAG AA auto contrast, dynamic buttons, color swatches, tag clouds, `@supports` fallback

---

## Specificity

### [cascade-layers.css](specificity/cascade-layers.css)

**@layer — Cascade Layers**

- Baseline: 🟢 Widely Available
- MDN: [@layer](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer)
- Task: Control specificity and cascade order without selector hacks
- Features: Layer declaration order, nested layers, `@import` with layers, `!important` reversal, unlayered overrides

### [scope-rule.css](specificity/scope-rule.css)

**@scope — Scoped Styles**

- Baseline: 🔵 Newly Available
- MDN: [@scope](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@scope)
- Task: Scope styles to DOM subtrees and control specificity with proximity
- Features: Scope root/limit (donut scope), `:scope` pseudo-class, scoping proximity, low-specificity selectors, scope + nesting

### [revert-rule.css](specificity/revert-rule.css)

**revert-rule — Roll Back the Cascade by One Rule**

- Support: Chrome 148+
- MDN: [revert-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/revert-rule)
- Reference: [Chrome 148 Beta (Chrome Blog)](https://developer.chrome.com/blog/chrome-148-beta)
- Task: Discard the current rule's value and fall back to the rest of the cascade
- Features: `revert` vs `revert-layer` vs `revert-rule`, basic rollback, conditional declarations with `if()`, style-attribute escape hatch

---

## Accessibility

### [prefers-reduced-motion.css](accessibility/prefers-reduced-motion.css)

**Accessibility Media Queries — Reduced Motion, Contrast, Transparency**

- Baseline: 🟡 Limited Availability
- MDN: [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion), [prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast), [prefers-reduced-transparency](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency), [forced-colors](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)
- Task: Respect user accessibility preferences — disable decorative motion, adapt contrast, handle transparency and forced colors
- Features: Global animation reset, targeted per-component control, motion-safe opt-in pattern, scroll-behavior gating, view transition disable, essential vs decorative motion guide, `prefers-contrast`, `prefers-reduced-transparency`, `forced-colors`, all accessibility queries reference

---

## Native Customization

### [customizable-select.css](native-customization/customizable-select.css)

**Customizable Select Element**

- Baseline: 🟡 Limited Availability
- MDN: [Customizable Select](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)
- Reference: [A customizable select (Chrome Blog)](https://developer.chrome.com/blog/a-customizable-select)
- Task: Style native `<select>` with full visual control — picker, options, icons, animations
- Features: `appearance: base-select` opt-in, `::picker(select)` popover in top-layer, `::picker-icon` arrow rotation, `::checkmark` indicator, `<selectedcontent>` cloned preview with differential styling, `:open` pseudo-class, rich HTML in options (SVG, images, spans), anchor positioning, `<optgroup>` + `<legend>`, listbox mode (`<select multiple>`/`<select size>`, Chrome 145+), entry/exit animations (`@starting-style`), zebra striping, `@supports` fallback, country picker example

---

## Legend

- **🟢 Widely Available**: interoperable in the core browser set for at least 30 months
- **🔵 Newly Available**: interoperable in the core browser set for less than 30 months
- **🟡 Limited Availability**: not Baseline because core-browser coverage is incomplete
- **🟣 Experimental / unknown**: no usable WebStatus record; verify releases and specifications

These are Web Platform Baseline categories, not global usage percentages. Run
`python3 scripts/update_baseline.py --check` from the skill root before publishing
support claims.
