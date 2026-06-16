# ControlButton

ControlButton is ideal for interfaces where buttons aren't meant to draw a lot of attention.
It uses a lighter visual design than [Button][button] and reacts to the color scheme of its surroundings.

## When to Use ControlButton

Use **ControlButton** for:

- **Close buttons** in modals, dialogs, and notifications
- **Navigation controls** like ScrollView controls or carousel controls
- **Icon-only actions** that need minimal visual weight

Do you need size consistency with form controls or a heavier visual? Use
[Button][button] instead.

## Basic Usage

ControlButtons are composed using component styles and helper classes:

```html
<button
  type="button"
  class="ControlButton ControlButton--medium dynamic-color-background-interactive accessibility-tap-target"
  aria-label="Close"
>
  <svg class="Icon" width="16" height="16" aria-hidden="true">
    <use href="/icons/svg/sprite.svg#close" />
  </svg>
</button>
```

### Required Helper Classes

- `dynamic-color-background-interactive` — Provides hover/active states that adapt to the active color scheme

### Recommended Classes

- `accessibility-tap-target` — Ensures the tap target size is large enough without affecting the size of the button

### Optional Classes

- `dynamic-color-border` — Adapts the border color to the active color scheme

## Reacting to Color Schemes

ControlButton reacts to the color scheme of its context. Apply a `color-scheme-on-*` class to a
parent element (or directly to the ControlButton) and the button derives its colors from that scheme
using the [dynamic color system][dynamic-color]:

```html
<div class="color-scheme-on-emotion-informative-basic">
  <button
    type="button"
    class="ControlButton ControlButton--medium dynamic-color-background-interactive accessibility-tap-target"
    aria-label="Close"
  >
    <svg class="Icon" width="16" height="16" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#close" />
    </svg>
  </button>
</div>
```

This works with any available color scheme.

ControlButton reads these values from the active color scheme:

- **content color** (`--spirit-local-color`) — the icon and text color
- **background color** (`--spirit-local-background-color`) — visible with the `ControlButton--hasBackground` modifier
- **subtle border color** (`--spirit-local-border-color-subtle`) — visible with the `dynamic-color-border` helper

ControlButton always uses the **subtle** border color so the border stands out on a basic background, and it
**computes** the interactive (hover and active) state colors from the background color instead of reading them from
the scheme.

## Variants

### With Background

Add the `ControlButton--hasBackground` modifier class to the button to make
the background visible in the default state. The modifier class reads the
`--spirit-local-background-color` CSS variable which is provided by the active
color scheme (e.g. a `color-scheme-on-*` class).

```html
<button
  type="button"
  class="ControlButton ControlButton--medium ControlButton--hasBackground dynamic-color-background-interactive accessibility-tap-target"
  aria-label="Close"
>
  <svg class="Icon" width="16" height="16" aria-hidden="true">
    <use href="/icons/svg/sprite.svg#close" />
  </svg>
</button>
```

This variant is useful for buttons that are layered on top of other elements.

### With Border

Add the `dynamic-color-border` helper class to the button to make border
visible. The border color will adapt to the background color:

```html
<button
  type="button"
  class="ControlButton ControlButton--medium dynamic-color-background-interactive dynamic-color-border accessibility-tap-target"
  aria-label="Close"
>
  <svg class="Icon" width="16" height="16" aria-hidden="true">
    <use href="/icons/svg/sprite.svg#close" />
  </svg>
</button>
```

## Sizes

The following sizes are available:

| Size   | CSS Class               | Height | Icon Size |
| ------ | ----------------------- | ------ | --------- |
| XSmall | `ControlButton--xsmall` | 16px   | 12px      |
| Small  | `ControlButton--small`  | 20px   | 16px      |
| Medium | `ControlButton--medium` | 24px   | 16px      |
| Large  | `ControlButton--large`  | 32px   | 16px      |
| XLarge | `ControlButton--xlarge` | 40px   | 20px      |

## Symmetrical ControlButton

A symmetrical control button has equal width and height, typically used with icon-only buttons.

```html
<button
  type="button"
  class="ControlButton ControlButton--medium ControlButton--symmetrical dynamic-color-background-interactive accessibility-tap-target"
  aria-label="Close"
>
  <svg class="Icon" width="16" height="16" aria-hidden="true">
    <use href="/icons/svg/sprite.svg#close" />
  </svg>
</button>
```

### Responsive Symmetrical ControlButton

To create a responsive symmetrical control button, use breakpoint-specific modifiers. The button will be symmetrical at the specified breakpoint and above.

Symmetrical from tablet breakpoint and up:

```html
<button
  type="button"
  class="ControlButton ControlButton--medium ControlButton--tablet--symmetrical dynamic-color-background-interactive accessibility-tap-target"
  aria-label="Close"
>
  <svg class="Icon" width="16" height="16" aria-hidden="true">
    <use href="/assets/icons/svg/sprite.svg#close" />
  </svg>
</button>
```

Symmetrical from desktop breakpoint and up:

```html
<button
  type="button"
  class="ControlButton ControlButton--medium ControlButton--desktop--symmetrical dynamic-color-background-interactive accessibility-tap-target"
  aria-label="Close"
>
  <svg class="Icon" width="16" height="16" aria-hidden="true">
    <use href="/assets/icons/svg/sprite.svg#close" />
  </svg>
</button>
```

Symmetrical on mobile, not on tablet and up (use modifier class with suffix `--asymmetrical` to stop symmetrical behavior):

```html
<button
  type="button"
  class="ControlButton ControlButton--medium ControlButton--symmetrical ControlButton--tablet--asymmetrical dynamic-color-background-interactive accessibility-tap-target"
  aria-label="Close"
>
  <svg class="Icon" width="16" height="16" aria-hidden="true">
    <use href="/icons/svg/sprite.svg#close" />
  </svg>
</button>
```

Symmetrical on mobile and tablet, not on desktop (combine breakpoint-specific classes):

```html
<button
  type="button"
  class="ControlButton ControlButton--medium ControlButton--symmetrical ControlButton--desktop--asymmetrical dynamic-color-background-interactive accessibility-tap-target"
  aria-label="Close"
>
  <svg class="Icon" width="16" height="16" aria-hidden="true">
    <use href="/icons/svg/sprite.svg#close" />
  </svg>
</button>
```

## Disabled State

Use the `disabled` attribute to disable a ControlButton. This will also apply the `ControlButton--disabled` class, ensuring proper behavior.
To achieve proper styles, use the `color-scheme-on-disabled` class on the parent element, or directly on the
ControlButton together with the `text-color-scheme` utility class so its content color is applied.

### Color Scheme for Disabled State

**Parent component handles the color scheme:**

```html
<div class="color-scheme-on-disabled">
  <button
    type="button"
    class="ControlButton ControlButton--medium ControlButton--symmetrical dynamic-color-background-interactive accessibility-tap-target"
    aria-label="Previous"
    disabled
  >
    <svg class="Icon" width="16" height="16" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#chevron-left" />
    </svg>
  </button>
  <span>Disabled content</span>
  <button
    type="button"
    class="ControlButton ControlButton--medium ControlButton--symmetrical dynamic-color-background-interactive accessibility-tap-target"
    aria-label="Next"
    disabled
  >
    <svg class="Icon" width="16" height="16" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#chevron-right" />
    </svg>
  </button>
</div>
```

**Standalone ControlButton:**

```html
<button
  type="button"
  class="ControlButton ControlButton--medium ControlButton--symmetrical color-scheme-on-disabled text-color-scheme dynamic-color-background-interactive accessibility-tap-target"
  aria-label="Close"
  disabled
>
  <svg class="Icon" width="16" height="16" aria-hidden="true">
    <use href="/icons/svg/sprite.svg#close" />
  </svg>
</button>
```

## Custom Spacing

Use CSS custom properties to define custom spacing between control button content items (icons and text). Set the `--control-button-spacing`
property to one of the spacing token values defined on the `:root` element, e.g. `--control-button-spacing: var(--spirit-space-600)`.
This will set the spacing to `var(--spirit-space-600)` for all breakpoints.

Custom spacing:

```html
<button
  type="button"
  class="ControlButton ControlButton--medium dynamic-color-background-interactive accessibility-tap-target"
  style="--control-button-spacing: var(--spirit-space-600)"
  aria-label="Close"
>
  <svg class="Icon" width="16" height="16" aria-hidden="true">
    <use href="/icons/svg/sprite.svg#close" />
  </svg>
  Close
</button>
```

ℹ️ We highly discourage from using absolute values like `--control-button-spacing: 1rem`. It will work, but you will lose
the consistency between the spacing and the design tokens.

If you need to set custom spacing from a specific breakpoint, use the `--control-button-spacing-{breakpoint}` property,
e.g. `--control-button-spacing-tablet: var(--spirit-space-800)`. The breakpoint value must be one of the breakpoint tokens
except for the `mobile` breakpoint where you don't need the suffix at all. The spacing is set to all larger breakpoints
automatically if you don't set them explicitly. E.g. if you set only `--control-button-spacing-tablet: var(--spirit-space-800)`
the spacing will be set to `var(--spirit-space-800)` for `tablet` and `desktop` breakpoints while on the `mobile`
breakpoint the default spacing will be used.

Custom spacing from tablet up:

```html
<button
  type="button"
  class="ControlButton ControlButton--medium dynamic-color-background-interactive accessibility-tap-target"
  style="--control-button-spacing-tablet: var(--spirit-space-800)"
  aria-label="Close"
>
  <svg class="Icon" width="16" height="16" aria-hidden="true">
    <use href="/icons/svg/sprite.svg#close" />
  </svg>
  Close
</button>
```

Custom spacing for each breakpoint:

```html
<button
  type="button"
  class="ControlButton ControlButton--medium dynamic-color-background-interactive accessibility-tap-target"
  style="--control-button-spacing: var(--spirit-space-400); --control-button-spacing-tablet: var(--spirit-space-600); --control-button-spacing-desktop: var(--spirit-space-800)"
  aria-label="Close"
>
  <svg class="Icon" width="16" height="16" aria-hidden="true">
    <use href="/icons/svg/sprite.svg#close" />
  </svg>
  Close
</button>
```

## Accessibility

For icon-only buttons, always include an accessible label, for example, using
the `aria-label` attribute or a child element with our `accessibility-hidden`
helper class.

ℹ️ We recommend applying the `accessibility-tap-target` helper class to ensure
the tap target size of ControlButton is large enough.

[button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Button/README.md
[dynamic-color]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/helpers/dynamic-color/README.md
