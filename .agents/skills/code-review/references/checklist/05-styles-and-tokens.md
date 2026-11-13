# 5. Styles and Tokens (`*.scss`)

- **Tokens, not raw values** (important) — Sizes, spacing, radii, and colors use design tokens or
  `theme.$…` variables; lengths are in `rem` via `px-to-rem()` (see `docs/contribution/units.md`).
  Stylelint does not catch raw `px` or hex values.
- **Real tokens, not fallbacks** (important) — Component tokens are used where they exist; fallback
  variables carry a `-fallback` suffix. Unused tokens are removed. Token names match siblings.
- **Sizing lives in CSS** (important) — Icon and element sizes come from component CSS or custom
  properties, not React props, `boxSize`, `width` attributes, or `cloneElement`.
- **No cross-component selectors** (important) — A component's SCSS does not select another
  component's classes. `.is-*`/`.has-*` are JS states; utility classes are separate.
- **Simple selectors** (minor) — Prefer `:is()`, `:first-child`, `:last-child` over extra modifiers;
  every `stylelint-disable` has a reason; `no-descending-specificity` suppressions are questioned.
- **Reduced motion** (important) — Animations are wrapped in
  `@media (prefers-reduced-motion: no-preference)`.
- **Numbered comments** (minor) — SCSS explanations use the file's `// 1.` reference style, numbered
  in order.
- **Matches Figma** (question) — Colors, sizes, and weights match the design; ask for a screenshot
  comparison when the PR changes visuals without one.
