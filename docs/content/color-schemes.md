# Color Schemes

A color scheme is a **semantic surface**: one CSS class that pairs the content, border, and background colors of
a region of the UI, so everything inside it stays on-palette without naming individual design tokens.

## Overview

Spirit resolves colors in layers. Each layer narrows the previous one:

1. **Design tokens** define the raw palette (`--spirit-color-emotion-success-background-basic`).
2. **Themes** decide which values those tokens hold for a subtree (`theme-light-default`, `theme-light-on-brand`).
   See [Themes][adr-themes].
3. **Color schemes** pick a coherent set out of the active palette and publish it as **local** CSS custom
   properties (`--spirit-local-background-color`).
4. **Utilities and component CSS** read those locals and actually paint something.

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
    ├── <h2 class="text-color-scheme">              utility — paints the text
    ├── <hr class="border-color-scheme">            utility — paints the border
    └── <span class="Pill">                         component CSS — reads the locals itself
```

Steps 3 and 4 are deliberately kept apart:

ℹ️ **A `color-scheme-on-*` CSS class paints nothing by itself.** It only sets CSS custom properties. What paints is a
utility CSS class or the component's own style rules.

Splitting the declaration from the painting is what makes a scheme reusable. The properties apply to the element
that declares them **and** inherit to its descendants, so both placements work: one element can declare a scheme
and paint with it, or a container can declare it and let each descendant read only what it needs — a heading takes
the content color, a divider takes the border color, a badge takes the background. One declaration of intent, one
or many selective consumers.

## When to Use

- A region needs a **semantic** color — success, danger, selected, an accent — rather than one specific value
- Several properties (background, text, border) must stay consistent with each other
- Interactive children inside the region need hover and active colors that match
- Building a component that should adopt whatever surface its consumer places it on

## When Not to Use

- **A single one-off color** — use a background or text utility; a scheme is overkill
- **Repalettizing a whole page region** — that is a theme, see [Themes][adr-themes]
- **Deriving interactive or computed colors** — use the [dynamic color helpers][dynamic-colors], which read the
  active scheme and compute what the tokens do not cover
- **Disabling an interactive element** — use the `disabled` utility, see [Disabled State](#disabled-state)

## Anatomy of a Color Scheme

### Naming

```text
color-scheme-on-<category>-<intensity>
```

- `<category>` — the semantic color group: `accent-01`…`accent-06`, `emotion-danger`, `emotion-informative`,
  `emotion-success`, `emotion-warning`, `neutral`, `selected`
- `<intensity>` — `basic` or `subtle`

`disabled` is the one category with no intensity suffix: `color-scheme-on-disabled`.

### Available Color Schemes

| Category                                                                      | CSS classes                                     |
| ----------------------------------------------------------------------------- | ----------------------------------------------- |
| `accent-01`, `accent-02`, `accent-03`, `accent-04`, `accent-05`, `accent-06`  | `color-scheme-on-accent-<NN>-{basic,subtle}`    |
| `emotion-danger`, `emotion-informative`, `emotion-success`, `emotion-warning` | `color-scheme-on-emotion-<NAME>-{basic,subtle}` |
| `neutral`                                                                     | `color-scheme-on-neutral-{basic,subtle}`        |
| `selected`                                                                    | `color-scheme-on-selected-{basic,subtle}`       |
| `disabled`                                                                    | `color-scheme-on-disabled`                      |

That is 25 CSS classes today. The accent and emotion ones are **generated** from the `accent-colors` and
`emotion-colors` token maps, so adding an accent or an emotion in the design tokens produces new scheme CSS classes
with no code change.
`neutral`, `selected`, and `disabled` are written out by hand in the same generator, because they are flat token sets
rather than maps.

The CSS classes ship in `themes.css`, not `utilities.css` — they belong to the theme layer, since that is what defines
their values.

### Pairing Logic

The intensity in the CSS class name describes the **background**. The content color flips to the opposite intensity,
because a strong background needs light text and a light background needs strong text:

| CSS class suffix | Background          | Content          | Border          |
| ---------------- | ------------------- | ---------------- | --------------- |
| `-basic`         | `background-basic`  | `content-subtle` | `border-basic`  |
| `-subtle`        | `background-subtle` | `content-basic`  | `border-subtle` |

This flip is what guarantees the contrast ratio. It is also the single most common point of confusion:
`color-scheme-on-emotion-danger-basic` is the _loud_ one (saturated red surface, near-white text), and
`color-scheme-on-emotion-danger-subtle` is the _quiet_ one (pale red surface, dark red text).

ℹ️ Pick `basic` for small, emphatic elements that must stand out — badges, filled buttons, indicators. Pick `subtle`
for large calm areas — alert bodies, banners, selected rows — where a saturated fill would dominate the page.

### CSS Custom Properties

Every scheme CSS class publishes two sets of CSS custom properties, and the `tools/color-scheme` Sass module exposes a
matching accessor for each. All accessors take an optional `$fallback`.

#### The Picked Combination

These resolve to the combination implied by the `<intensity>` in the CSS class name. They are the ready-to-use set, and
what most components need: one coherent, contrast-checked pairing.

| CSS custom property                            | Sass accessor                     | Holds                                          |
| ---------------------------------------------- | --------------------------------- | ---------------------------------------------- |
| `--spirit-local-color`                         | `color()`                         | Content color paired with the picked intensity |
| `--spirit-local-border-color`                  | `border-color()`                  | Border color paired with the picked intensity  |
| `--spirit-local-background-color`              | `background-color()`              | Background paired with the picked intensity    |
| `--spirit-local-background-color-state-hover`  | `background-color-state-hover()`  | Hover background                               |
| `--spirit-local-background-color-state-active` | `background-color-state-active()` | Active background                              |

The two state properties carry the same value in both variants — the tokens define hover and active per category, not
per intensity.

#### The Full Palette

These are set regardless of which intensity the CSS class name picks, so a single scheme CSS class can color a
region that combines both. Reach for them only when the picked combination genuinely cannot express what you need — see
[Combining Both Intensities](#combining-both-intensities).

| CSS custom property                      | Sass accessor               | Holds                |
| ---------------------------------------- | --------------------------- | -------------------- |
| `--spirit-local-color-basic`             | `color-basic()`             | Basic content color  |
| `--spirit-local-color-subtle`            | `color-subtle()`            | Subtle content color |
| `--spirit-local-border-color-subtle`     | `border-color-subtle()`     | Subtle border color  |
| `--spirit-local-background-color-basic`  | `background-color-basic()`  | Basic background     |
| `--spirit-local-background-color-subtle` | `background-color-subtle()` | Subtle background    |

Three details are worth knowing before you go looking for them:

- **There is no `--spirit-local-border-color-basic`.** The palette exposes only the subtle border, because the dynamic
  color helpers always want a border that still reads against a basic background.
- **`--spirit-local-background-color-state-selected` is never set by any CSS class.** Only the accessor
  `background-color-state-selected()` exists, and `dynamic-colors.background-selected()` reads it with a computed
  fallback. Do not look for a CSS class that provides it.
- **`color-scheme-on-disabled` is smaller than both tables.** It sets the three content properties,
  `--spirit-local-border-color`, and the three background properties — no subtle border, no state colors. See
  [Substitutability of Categories](#substitutability-of-categories) for why it still stands in for any other scheme.

## Color Schemes, Themes, and Dynamic Colors

Spirit has five ways to color something. They are not alternatives to each other; they operate at different scopes.

| Tool                                                     | What it does                          | Reach for it when                                              |
| -------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------- |
| Theme (`theme-light-default`, `theme-light-on-brand`)    | Redefines `--spirit-color-*`          | An entire page region should use a different palette           |
| Color scheme (`color-scheme-on-*`)                       | Sets `--spirit-local-*`               | One region or component needs a specific semantic surface      |
| Scheme utilities (`bg-`, `text-`, `border-color-scheme`) | Paints one property from the scheme   | Applying the active scheme to plain markup                     |
| Dynamic color helpers (`dynamic-color-*`)                | Derives borders and interactive fills | Interactive children inside a scheme, or outside any scheme    |
| Background utilities (`bg-emotion-success-basic`, …)     | Paints one hard-coded color           | A genuine one-off, and you accept picking the other colors too |

The rule of thumb: a **theme** changes what the colors _are_; a **color scheme** chooses _which_ of them this region
uses. Use both together — a scheme inside an on-brand theme resolves to the on-brand palette automatically.

ℹ️ **Not to be confused with the CSS [`color-scheme`][mdn-color-scheme] property.** That is a different feature that
happens to share the name: it opts a document into the browser's light or dark rendering of native UI. Spirit does
not use it to implement color schemes, and the problem it addresses sits closer to the theme layer than to this one.

## Applying a Color Scheme

### In Markup

A scheme CSS class and the utilities that read it can sit on the **same element** — a scheme applies to the element
that declares it, not only to its descendants:

```html
<div class="color-scheme-on-emotion-success-subtle bg-color-scheme text-color-scheme p-700 rounded-200">
  Your changes have been saved.
</div>
```

Putting the scheme on a parent instead lets each child take only what it needs, and is the shape that pays off
once more than one element reads the surface:

```html
<section class="color-scheme-on-accent-01-subtle bg-color-scheme p-700">
  <h2 class="text-color-scheme">Section heading</h2>
  <p>Body text inherits the color from the heading's parent.</p>
  <hr class="border-color-scheme" />
</section>
```

The three utilities are `bg-color-scheme`, `text-color-scheme`, and `border-color-scheme`. Each emits `!important`,
as all Spirit utilities do — which matters in one case, see below.

### In Component Styles

Component CSS reads the locals through the Sass accessors instead of the utilities. Pass a fallback so the component
still looks right when no scheme CSS class is present anywhere above it:

```scss
@use '../../tools/color-scheme';
@use 'theme';

.MyComponent {
  color: color-scheme.color(theme.$content);
  background-color: color-scheme.background-color(theme.$background);
  border-color: color-scheme.border-color(theme.$border);
}
```

⚠️ **Prefer accessors over `.bg-color-scheme` inside a component.** `ControlButton` reads `background-color()` in its
own CSS precisely because the utility's `!important` would override `dynamic-color-background-interactive` and kill
the hover and active states.

### In React

`Box` is the general-purpose entry point. Its `colorScheme` prop takes the full scheme suffix and adds both the
scheme CSS class and the paint utilities:

```tsx
<Box colorScheme="emotion-success-subtle">{/* Content goes here */}</Box>
```

`Box` applies `border-color-scheme` only when `borderWidth` is greater than `0` and `borderColor` is not set.
Explicit `backgroundColor`, `backgroundGradient`, `textColor`, and `borderColor` take precedence over the scheme
utilities.

Components with their own palette expose `color` and `isSubtle` instead, and build the CSS class internally:

```tsx
<Alert color="success">Your changes have been saved.</Alert>
```

For a custom component, build the CSS class with `getColorSchemeClassName`:

```tsx
import { getColorSchemeClassName } from '@alma-oss/spirit-web-react';

const className = getColorSchemeClassName({ color: 'emotion-success', isSubtle: true });
```

The `ColorSchemeType` union in [`types/shared/colors.ts`][color-scheme-types] enumerates every valid suffix, so
invalid combinations fail at compile time.

ℹ️ There is no generic color scheme prop beyond `Box`. Other components either expose `color` / `isSubtle` or inherit
whatever scheme their parent provides.

## Disabled State

Disabling is the one place where color schemes are deliberately not the answer, and the two available CSS classes are
easy to mix up.

| CSS class                  | Sets                                                            | Side effects                                               | Use on                                |
| -------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------- |
| `disabled`                 | The same disabled colors, all `!important`, hover/active frozen | Blocks pointer events, disables selection, disabled cursor | **Interactive** elements              |
| `color-scheme-on-disabled` | Content, border, and background locals, no `!important`         | None                                                       | **Non-interactive** parent containers |

Use `disabled` on the thing the user would otherwise click. Its `!important` is what lets it beat both a scheme
CSS class and a component's own color modifier, and freezing the state colors is what stops a dead button from
lighting up on hover.

Use `color-scheme-on-disabled` when a surrounding container should merely _look_ disabled — a panel whose contents
are individually disabled already — without swallowing pointer events.

In React this is handled for you, though not identically. `Tag` drops its scheme CSS class entirely when `isDisabled`
is set and applies `disabled`. `Item` keeps `color-scheme-on-selected-subtle` on a selected row but stops painting
the background with it, letting `disabled` win on color while `text-color-scheme` keeps the label readable.

⚠️ **`disabled` does not set the intensity properties.** It provides the paired locals only, not
`--spirit-local-color-basic` / `-subtle` or `--spirit-local-background-color-basic` / `-subtle`. A component that
reads an intensity accessor needs a fallback to survive being placed inside `.disabled`.

## Overriding Scheme Colors Per Component

Replacing component color modifiers with shared utilities did not delete the modifiers. `Alert--success`,
`Tag--danger`, and friends are retained as **inert semantic hooks**: they carry no styling until someone defines
component-specific tokens for them.

Defining those tokens is the designer-facing lever. Given tokens named
`component/<component-name>/<token-name>-<suffix>`, the build compiles overrides scoped to the modifier CSS class, which
then win over the shared utility. To recolor `Alert`'s success variant:

```text
component/alert/emotion-success-background-subtle
component/alert/emotion-success-content-basic
component/alert/emotion-success-border-subtle
```

`Alert`, `Button`, `Pill`, `Tag`, and `ToastBar` are wired up for this today. See
[Component Color Overrides][component-color-overrides] for the full naming reference.

ℹ️ Deciding between a prop and a component token is its own question — see
[Component Customization][adr-component-customization]. In short: a prop lets a developer vary one instance, a
component token lets a designer change every instance in the product.

## Components Using Color Schemes

Useful as precedent when wiring up something new.

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

👉 The [`Box` preview][box-preview] renders every scheme side by side and is the fastest way to see the whole
palette at once.

## Extending Color Schemes

Before adding anything to the generator, check whether an existing local already covers the need. The properties are
deliberately few, and near-misses are common: in the default theme `border-basic` happens to hold the same value as
`background-basic` for every emotion, which makes it tempting to reach for the wrong one — a coincidence of the
palette, not a guarantee any theme has to keep.

### Combining Both Intensities

The case that genuinely could not be expressed was a **single colored region that shows both intensities at once** —
a subtle surface carrying a basic-colored element drawn on top of it.

Nesting a second scheme CSS class solves it only when the two parts are separate elements. They often are not: a native
`<progress>` draws its track on the element itself and its indicator in a `::-webkit-progress-value` or
`::-moz-progress-bar` pseudo-element, all on one DOM node. One node cannot carry two scheme CSS classes. The alternative
— reading raw tokens in the component — means re-implementing the entire category matrix in that component's CSS,
which is the duplication color schemes exist to remove.

Hence every scheme CSS class now exposes both intensities of the background and content colors, whichever intensity the
CSS class name picks. A component takes the subtle background for its surface and the basic background for the element
on top, from one CSS class on the root:

```scss
.MyComponent {
  background-color: color-scheme.background-color-subtle(theme.$surface-background);
}

.MyComponent__indicator {
  background-color: color-scheme.background-color-basic(theme.$indicator-background);
}
```

The precedent for exposing something regardless of the picked intensity is `border-color-subtle`, which had solved
the same problem ad hoc for borders long before. Full rationale in
[Color Scheme Intensity Exposure][adr-intensity-exposure].

### Substitutability of Categories

Because a component may now read _any_ intensity from _any_ scheme CSS class, every category has to provide all of them.
This is a hard constraint on adding a category, not a nicety: a category that silently omits an intensity renders
any component reading it **uncolored**.

Where a token does not exist, pick an explicit stand-in and document it. `disabled` is the worked example — it has no
background pair and only one content color, so:

- the disabled **foreground** stands in for the basic background, being the color of a filled element sitting on a
  disabled surface
- its single content color serves as both content intensities

That is what keeps `color-scheme-on-disabled` droppable in wherever any other scheme CSS class would go, without
components special-casing it.

### Testing

Every change to the generator ships with unit tests in `tools/__tests__/_color-scheme.test.scss`, covering the
generated map, the emitted declarations, and each accessor with and without a fallback.

## Best Practices

### Declare the Scheme Once

Put it on the element or region that defines the surface — that element and its descendants can all read it.
Repeating the CSS class on every child defeats the indirection and makes the region hard to recolor.

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

A scheme hands you a complete, mutually consistent set — content, border, background, states. A background utility
gives you one color and leaves the rest to you, and to whoever changes the tokens next.

```html
<!-- ❌ Bad: each color picked by hand; nothing keeps them in sync -->
<div class="bg-emotion-success-subtle text-emotion-success-basic p-700">Your changes have been saved.</div>

<!-- ✅ Good: one scheme, and the utilities follow it -->
<div class="color-scheme-on-emotion-success-subtle bg-color-scheme text-color-scheme p-700">
  Your changes have been saved.
</div>
```

Add `border-color-scheme` and the border joins the same set — with hand-picked utilities that would be a third color
to choose and keep in sync.

### Do Not Stack Two Scheme CSS Classes on One Element

The second one wins for every property, which is rarely what anyone means. If a nested area needs a different
surface, give it its own element.

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

Hard-coding a token inside a component opts it out of the surrounding scheme permanently. Use the accessor with the
token as its fallback instead — the component then adapts when a scheme is present and still looks right when it is
not.

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

### Match Intensity to Area

Basic is for emphasis on small elements; subtle is for large calm areas. A full-width banner in a basic emotion color
reads as an emergency.

```html
<!-- ❌ Bad: a saturated fill across the whole banner overstates the message -->
<section class="color-scheme-on-emotion-warning-basic bg-color-scheme text-color-scheme p-900">
  Your trial ends in 14 days.
</section>

<!-- ✅ Good: subtle carries the surface, basic is saved for the one thing that must stand out -->
<section class="color-scheme-on-emotion-warning-subtle bg-color-scheme text-color-scheme p-900">
  Your trial ends in
  <span class="color-scheme-on-emotion-warning-basic bg-color-scheme text-color-scheme px-500 py-300 rounded-200">
    14 days
  </span>
</section>
```

## Accessibility

- **The pairing logic is the contrast guarantee.** Basic backgrounds carry subtle content and vice versa precisely so
  every scheme meets contrast requirements. Mixing halves of two different pairs breaks that guarantee.
- **Component overrides must be re-checked as a pair.** Changing only the background token of a variant, or only the
  content token, silently invalidates the ratio the scheme was verified at. Verify against
  [contrast (minimum)][wcag-contrast-minimum] and, for borders and indicators,
  [non-text contrast][wcag-non-text-contrast].
- **Disabled colors are intentionally low-contrast** and are exempt from contrast requirements. That also means they
  must never be the only signal — pair them with `disabled` attributes, `aria-disabled`, or text.
- **Color alone is never enough.** An emotion scheme communicates severity to sighted users only; keep an icon or a
  label alongside it.

## Related

### Architecture Decisions

- [ADR 012: Color Schemes][adr-color-schemes] — the decision record behind the concept
- [ADR 015: Color Scheme Intensity Exposure][adr-intensity-exposure] — why both intensities are always exposed
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
[adr-intensity-exposure]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/decisions/015-color-scheme-intensity-exposure.md
[adr-themes]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/decisions/008-themes.md
[box-preview]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Box/preview.html
[box-react-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Box/README.md
[color-scheme-tool]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/tools/_color-scheme.scss
[color-scheme-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/types/shared/colors.ts
[component-color-overrides]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/design-tokens/README.md#component-color-overrides
[control-button-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ControlButton/README.md
[dynamic-colors]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/helpers/dynamic-color/README.md
[mdn-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
[wcag-contrast-minimum]: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
[wcag-non-text-contrast]: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
[web-readme-color-schemes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md#color-schemes
