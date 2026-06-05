---
name: spirit:scss
description: >-
  SCSS/CSS review knowledge for the Spirit Design System web package — token usage over hardcoded
  values, mixin/function reuse and unit tests, separation of concerns, and BEM/SUIT naming. Loaded by
  the web reviewer; standalone-invokable when reviewing only styles. Use when reviewing or building
  Spirit SCSS.
---

# SCSS (Spirit Web)

Review knowledge for `packages/web` styles. Defers all token _structure_ and theming rules to
`spirit:design-system` and visual a11y (contrast, focus ring) to
`spirit:accessibility`. Report only what Stylelint (`stylelint-config-spirit`) cannot catch (see
the code-review methodology) — focus on the conventions below, which are not lintable.

## Tokens Over Hardcoded Values

- Raw colors, spacing, radii, shadows, typography, z-index, or breakpoints in component SCSS are a
  finding — there is a token for it. See the token structure in
  `spirit:design-system`.
- A value wedged off the token scale (e.g. a one-off `13px`) signals either a missing token or a
  design drift — ask rather than assert if intent is unclear.

## Reuse Over Reinvention

- **Use existing mixins, functions, and helpers** instead of re-implementing equivalent logic.
  Before flagging, check whether a suitable tool/mixin already exists in the `tools/`/`helpers/`
  layers.
- **Use existing components/placeholders** rather than duplicating their styles inline.

## Test Custom Mixins & Functions

- Every custom SCSS mixin or function should be covered by a unit test (Spirit keeps
  `__tests__/_*.test.scss` alongside the tools). A new mixin/function without a test is a `todo`.

## Separation of Concerns

- A component must not style another component. Do not reach across and style component B from
  component A's stylesheet (e.g. targeting `.OtherComponent` inside `_Component.scss`). Layout
  relationships belong to layout primitives or explicit composition, not cross-component selectors.
- Keep specificity flat; avoid deep descendant chains that leak into children's internals.

## Naming & Structure

- **BEM/SUIT**: `.Component`, `.Component--modifier`, `.Component__element` (see
  `spirit:design-system`).
- SCSS partials use the underscore prefix (`_Button.scss`).
- Avoid deep nesting (>3 levels) — it inflates specificity and obscures the generated selector.
- No brightness-implying names (`-light`, `-dark`, `-inverted`) — use neutral tokens/themes.

## Responsiveness

- Use the design system's breakpoint tokens/mixins rather than ad-hoc media queries with raw widths.
