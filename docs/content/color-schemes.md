# Color Schemes

A color scheme is a **semantic surface**: one CSS class that pairs the content, border, and background colors of
a region of the UI, so everything inside it stays on-palette without naming individual design tokens.

## Overview

Spirit resolves colors in four layers, each narrowing the previous one:

```text
--spirit-color-emotion-success-background-subtle    design tokens — the raw palette
        │
        ▼
<body class="theme-light-default">                  theme — which value each token holds
│
└── <section class="color-scheme-on-emotion-success-subtle bg-color-scheme">
    │                                               color scheme — picks a combination and
    │                                               publishes --spirit-local-*;
    │                                               bg-color-scheme is what paints the background
    │
    ├── <span class="Pill">                         component CSS — reads the locals itself
    ├── <h2 class="text-color-scheme">              utility — paints the text
    └── <hr class="border-color-scheme">            utility — paints the border
```

ℹ️ **A `color-scheme-on-*` CSS class paints nothing by itself.** It only sets CSS custom properties, on its own element
and, by inheritance, its descendants. Utility CSS classes or the component's own style rules do the painting.

## When to Use

Reach for a color scheme when a region needs a **semantic** color with background, text, border, and interactive
states kept consistent, or when a component should adopt whatever surface it is placed on. The neighboring tools
operate at different scopes:

| Tool                                                     | What it does                          | Reach for it when                                              |
| -------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------- |
| Theme (`theme-light-default`, `theme-light-on-brand`)    | Redefines `--spirit-color-*`          | An entire page region should use a different palette           |
| Color scheme (`color-scheme-on-*`)                       | Sets `--spirit-local-*`               | One region or component needs a specific semantic surface      |
| Scheme utilities (`bg-`, `text-`, `border-color-scheme`) | Paints one property from the scheme   | Applying the active scheme to plain markup                     |
| Dynamic color helpers (`dynamic-color-*`)                | Derives borders and interactive fills | Interactive children inside a scheme, or outside any scheme    |
| Background utilities (`bg-emotion-success-basic`, …)     | Paints one hard-coded color           | A genuine one-off, and you accept picking the other colors too |

A **theme** changes what the colors _are_; a **color scheme** chooses _which_ of them a region uses, so a scheme inside
an on-brand theme resolves to the on-brand palette. To disable an interactive element, use `disabled` instead — see
[Disabled State](#disabled-state).

ℹ️ Unrelated to the CSS [`color-scheme`][mdn-color-scheme] property, which Spirit does not use.

## Anatomy of a Color Scheme

### Naming

```text
color-scheme-on-<category>-<intensity>
```

- `<category>` — `accent-01`…`accent-06`, `emotion-danger`, `emotion-informative`, `emotion-success`,
  `emotion-warning`, `neutral`, `selected`
- `<intensity>` — `basic` or `subtle`; `disabled` has none: `color-scheme-on-disabled`

### Available Color Schemes

| Category                                                                      | CSS classes                                     |
| ----------------------------------------------------------------------------- | ----------------------------------------------- |
| `accent-<NN>`                                                                 | `color-scheme-on-accent-<NN>-{basic,subtle}`    |
| `emotion-danger`, `emotion-informative`, `emotion-success`, `emotion-warning` | `color-scheme-on-emotion-<NAME>-{basic,subtle}` |
| `neutral`                                                                     | `color-scheme-on-neutral-{basic,subtle}`        |
| `selected`                                                                    | `color-scheme-on-selected-{basic,subtle}`       |
| `disabled`                                                                    | `color-scheme-on-disabled`                      |

Accent and emotion CSS classes are generated from the `accent-colors` and `emotion-colors` token maps, so new tokens
produce new CSS classes with no code change; the rest are written out by hand. All of them ship in `themes.css`,
because the theme layer defines their values.

### Pairing Logic

The intensity in the CSS class name describes the **background**; the content flips to the opposite intensity:

| CSS class suffix | Background          | Content          | Border          |
| ---------------- | ------------------- | ---------------- | --------------- |
| `-basic`         | `background-basic`  | `content-subtle` | `border-basic`  |
| `-subtle`        | `background-subtle` | `content-basic`  | `border-subtle` |

The flip guarantees sufficient contrast, and it is the most common point of confusion:
`color-scheme-on-emotion-danger-basic` is the _loud_ one (saturated red surface, near-white text),
`color-scheme-on-emotion-danger-subtle` the _quiet_ one (pale red surface, dark red text). Pick `basic` for small,
emphatic elements like badges and filled buttons, `subtle` for large calm areas like alert bodies and selected rows.

### CSS Custom Properties

Every scheme CSS class publishes two sets of CSS custom properties, each with a Sass accessor in the
`tools/color-scheme` module that takes an optional `$fallback`.

#### The Picked Combination

The pair implied by the `<intensity>` in the CSS class name — the contrast-checked set most components need. The two
state properties are the same in both intensities, because the tokens define them per category.

| CSS custom property                            | Sass accessor                     | Holds                                          |
| ---------------------------------------------- | --------------------------------- | ---------------------------------------------- |
| `--spirit-local-color`                         | `color()`                         | Content color paired with the picked intensity |
| `--spirit-local-border-color`                  | `border-color()`                  | Border color paired with the picked intensity  |
| `--spirit-local-background-color`              | `background-color()`              | Background paired with the picked intensity    |
| `--spirit-local-background-color-state-hover`  | `background-color-state-hover()`  | Hover background                               |
| `--spirit-local-background-color-state-active` | `background-color-state-active()` | Active background                              |

#### The Full Palette

Set regardless of the picked intensity, for a region that shows both — see
[Combining Both Intensities](#combining-both-intensities).

| CSS custom property                      | Sass accessor               | Holds                |
| ---------------------------------------- | --------------------------- | -------------------- |
| `--spirit-local-color-basic`             | `color-basic()`             | Basic content color  |
| `--spirit-local-color-subtle`            | `color-subtle()`            | Subtle content color |
| `--spirit-local-border-color-subtle`     | `border-color-subtle()`     | Subtle border color  |
| `--spirit-local-background-color-basic`  | `background-color-basic()`  | Basic background     |
| `--spirit-local-background-color-subtle` | `background-color-subtle()` | Subtle background    |

- **There is no `--spirit-local-border-color-basic`.** The dynamic color helpers always want a border that still reads
  against a basic background.
- **No CSS class sets `--spirit-local-background-color-state-selected`.** Only its accessor exists, read by
  `dynamic-colors.background-selected()` with a computed fallback.
- **`color-scheme-on-disabled` sets less:** the three content and three background properties plus
  `--spirit-local-border-color` — no subtle border, no states. See
  [Substitutability of Categories](#substitutability-of-categories).

## Applying a Color Scheme

### In HTML

The scheme CSS class and the utilities that read it can share an element. Once several elements read the surface,
declare it on their container — see [Declare the Scheme Once](#declare-the-scheme-once).

```html
<div class="color-scheme-on-emotion-success-subtle bg-color-scheme text-color-scheme p-700 rounded-200">
  Your changes have been saved.
</div>
```

The utilities `bg-color-scheme`, `text-color-scheme`, and `border-color-scheme` emit `!important`, like all Spirit
utilities.

### In Component Styles

Read the locals through the Sass accessors, with the component's own token as the fallback for when no scheme is
present:

```scss
@use '../../tools/color-scheme';
@use 'theme';

.MyComponent {
  color: color-scheme.color(theme.$content);
  background-color: color-scheme.background-color(theme.$background);
  border-color: color-scheme.border-color(theme.$border);
}
```

⚠️ **Prefer accessors over `.bg-color-scheme` inside a component.** Its `!important` would override
`dynamic-color-background-interactive`, killing hover and active states — which is why `ControlButton` reads
`background-color()` instead — and would beat the [component color overrides](#overriding-scheme-colors-per-component).

### In React

`Box` takes the full scheme suffix in its `colorScheme` prop and adds the scheme CSS class plus the paint utilities:

```tsx
<Box colorScheme="emotion-success-subtle">{/* Content goes here */}</Box>
```

`border-color-scheme` is added only when `borderWidth` is greater than `0` and `borderColor` is not set. Explicit
`backgroundColor`, `backgroundGradient`, `textColor`, and `borderColor` win over the scheme utilities.

Other components either expose `color` and `isSubtle` or inherit their parent's scheme:

```tsx
<Alert color="success">Your changes have been saved.</Alert>
```

## Disabled State

| CSS class                  | Sets                                                            | Side effects                                               | Use on                                |
| -------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------- |
| `disabled`                 | The same disabled colors, all `!important`, hover/active frozen | Blocks pointer events, disables selection, disabled cursor | **Interactive** elements              |
| `color-scheme-on-disabled` | Content, border, and background locals, no `!important`         | None                                                       | **Non-interactive** parent containers |

Put `disabled` on the thing the user would otherwise click: its `!important` beats schemes and component color
modifiers, and frozen states stop a dead button from lighting up on hover. Use `color-scheme-on-disabled` for a
container that should only _look_ disabled without swallowing pointer events.

## Overriding Scheme Colors Per Component

Component color modifiers such as `Alert--success` and `Tag--danger` carry no styling; they are hooks for tokens named
`component/<component-name>/<token-name>-<suffix>`, which compile to overrides that win over the shared scheme. To
recolor `Alert`'s success variant:

```text
component/alert/emotion-success-background-subtle
component/alert/emotion-success-content-basic
component/alert/emotion-success-border-subtle
```

See [Component Color Overrides][component-color-overrides] for the naming reference, and
[Component Customization][adr-component-customization] for choosing between a prop (one instance) and a component
token (every instance).

## Components Using Color Schemes

| Component              | How it uses the scheme                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| `Alert`                | `color` prop, always subtle                                                                              |
| `Button`, `ButtonLink` | Scheme CSS class for **emotion** colors only; primary, secondary, and tertiary use component tokens      |
| `Tag`                  | `color` + `isSubtle`; switches to `disabled` when disabled                                               |
| `Pill`                 | `color` + `isSubtle`, defaults to `selected`                                                             |
| `ToastBar`             | `color`, always basic, defaults to `neutral`                                                             |
| `Tooltip`              | Fixed `neutral-basic`                                                                                    |
| `ControlButton`        | No scheme of its own — reads whatever the parent provides, plus dynamic colors                           |
| `Item`                 | `selected-subtle` when selected; this is how `UNSTABLE_Picker` and `UNSTABLE_Combobox` highlight options |
| `Box`                  | `colorScheme` prop, any scheme                                                                           |

👉 The [`Box` preview][box-preview] renders every scheme side by side.

## Extending Color Schemes

Check whether an existing local already covers the need before extending the generator. Beware of coincidences: in the
default theme `border-basic` equals `background-basic` for every emotion, but no theme has to keep it that way.

### Combining Both Intensities

When one region shows both intensities and the parts are not separate elements — a native `<progress>` draws its
indicator as a pseudo-element of the same node — nesting a second scheme is impossible. Read both intensities from one
scheme CSS class instead ([rationale][adr-intensity-exposure]):

```scss
.MyComponent {
  background-color: color-scheme.background-color-subtle(theme.$surface-background);
}

.MyComponent__indicator {
  background-color: color-scheme.background-color-basic(theme.$indicator-background);
}
```

### Substitutability of Categories

Because components may read any intensity from any scheme, every category must provide all of them, or components
reading the missing one render **uncolored**. Where a token does not exist, pick and document a stand-in. `disabled`
has no background pair and one content color, so its foreground stands in for the basic background and its content
color serves both content intensities.

### Testing

Generator changes ship with unit tests in `tools/__tests__/_color-scheme.test.scss`, covering the generated map, the
emitted declarations, and each accessor with and without a fallback.

## Best Practices

### Declare the Scheme Once

Repeating the scheme CSS class on every child defeats the indirection and makes the region hard to recolor.

```html
<!-- ❌ Bad: the scheme repeated on every child -->
<section class="color-scheme-on-accent-01-subtle bg-color-scheme p-700">
  <h2 class="color-scheme-on-accent-01-subtle text-color-scheme">Section heading</h2>
  <hr class="color-scheme-on-accent-01-subtle border-color-scheme" />
</section>

<!-- ✅ Good: declared once, read by the descendants that need it -->
<section class="color-scheme-on-accent-01-subtle bg-color-scheme p-700">
  <h2 class="text-color-scheme">Section heading</h2>
  <hr class="border-color-scheme" />
</section>
```

### Prefer a Scheme Over Hand-Picked Utilities

A background utility gives you one color and leaves the rest to you, and to whoever changes the tokens next.

```html
<!-- ❌ Bad: each color picked by hand; nothing keeps them in sync -->
<div class="bg-emotion-success-subtle text-emotion-success-basic p-700">Your changes have been saved.</div>

<!-- ✅ Good: one scheme, and the utilities follow it -->
<div class="color-scheme-on-emotion-success-subtle bg-color-scheme text-color-scheme p-700">
  Your changes have been saved.
</div>
```

### Do Not Stack Two Scheme CSS Classes on One Element

The one later in the generated stylesheet wins for every property, regardless of markup order. Give a nested surface
its own element.

```html
<!-- ❌ Bad: two schemes on one element — whichever comes later in the CSS wins outright -->
<div class="color-scheme-on-neutral-subtle color-scheme-on-emotion-danger-basic bg-color-scheme p-700">
  Invoice overdue
</div>

<!-- ✅ Good: the nested surface gets its own element -->
<div class="color-scheme-on-neutral-subtle bg-color-scheme p-700">
  Invoice
  <span class="color-scheme-on-emotion-danger-basic bg-color-scheme text-color-scheme px-500 py-300 rounded-200">
    Overdue
  </span>
</div>
```

### Read Through Accessors, Not Raw Token Names

A hard-coded token opts the component out of the surrounding scheme for good — unless it is meant to hold one fixed
color, like `Tooltip`.

```scss
// ❌ Bad: hard-coded tokens ignore whatever scheme surrounds the component
.MyComponent {
  color: tokens.$neutral-content-basic;
  background-color: tokens.$neutral-background-subtle;
}

// ✅ Good: reads the active scheme, falls back to the token when there is none
.MyComponent {
  color: color-scheme.color(theme.$content);
  background-color: color-scheme.background-color(theme.$background);
}
```

## Accessibility

- **Do not mix halves of two pairs.** The [pairing logic](#pairing-logic) is what meets contrast requirements.
- **Re-check component overrides as a pair.** Changing only the background or only the content token invalidates the
  verified ratio. Check [contrast (minimum)][wcag-contrast-minimum] and, for borders and indicators,
  [non-text contrast][wcag-non-text-contrast].
- **Disabled colors are intentionally low-contrast** and exempt from contrast requirements, so they must never be the
  only signal — pair them with `disabled`, `aria-disabled`, or text.
- **Color alone is never enough.** Keep an icon or label alongside an emotion scheme.

## Known Issues

Current behavior that is expected to change. Do not build on it.

- **`disabled` does not set the intensity locals.** It overrides the picked combination and the state colors, but not
  `--spirit-local-color-basic`/`-subtle` or `--spirit-local-background-color-basic`/`-subtle`. A component reading
  those inside `disabled` gets the surrounding scheme's colors or its fallback instead of disabled ones, contrary to
  [Substitutability of Categories](#substitutability-of-categories).
- **React components disable their schemes inconsistently.** `Tag` removes its scheme CSS class when `isDisabled` is
  set, while a selected `Item` keeps `color-scheme-on-selected-subtle` and relies on `disabled` overriding it.

## Related

### Architecture Decisions

- [ADR 012: Color Schemes][adr-color-schemes] — the decision record behind the concept
- [ADR 016: Color Scheme Intensity Exposure][adr-intensity-exposure] — why both intensities are always exposed
- [ADR 008: Themes][adr-themes] — the layer above color schemes
- [ADR 011: Component Customization][adr-component-customization] — prop versus component token

### Documentation and Source

- [Color schemes in `spirit-web`][web-readme-color-schemes] — package-level summary
- [Dynamic Colors][dynamic-colors] — helpers that derive borders and interactive backgrounds from the active scheme
- [Component Color Overrides][component-color-overrides] — token naming for per-component overrides
- [`tools/_color-scheme.scss`][color-scheme-tool] — the generator and the accessors
- [`Box` in `spirit-web-react`][box-react-readme] — the `colorScheme` prop
- [`ControlButton` in `spirit-web-react`][control-button-readme] — a component that inherits its parent's scheme

## Resources

- [WCAG 2.2: Contrast (Minimum)][wcag-contrast-minimum]
- [WCAG 2.2: Non-text Contrast][wcag-non-text-contrast]

[adr-color-schemes]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/decisions/012-color-schemes.md
[adr-component-customization]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/decisions/011-component-customization.md
[adr-intensity-exposure]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/decisions/016-color-scheme-intensity-exposure.md
[adr-themes]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/decisions/008-themes.md
[box-preview]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Box/preview.html
[box-react-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Box/README.md
[color-scheme-tool]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/tools/_color-scheme.scss
[component-color-overrides]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/design-tokens/README.md#component-color-overrides
[control-button-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ControlButton/README.md
[dynamic-colors]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/helpers/dynamic-color/README.md
[mdn-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
[wcag-contrast-minimum]: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
[wcag-non-text-contrast]: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
[web-readme-color-schemes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md#color-schemes
