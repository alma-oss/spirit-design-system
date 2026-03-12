# ControlButton

ControlButton is ideal for interfaces where buttons aren't meant to draw a lot of attention.
It uses a lighter visual design than [Button][button] and adapts to its background color context.

## When to Use ControlButton

Use **ControlButton** for:

- **Close buttons** in modals, dialogs, and notifications
- **Navigation controls** like ScrollView arrows or carousel controls
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
    <use xlink:href="/icons/svg/sprite.svg#close" />
  </svg>
</button>
```

### Required Helper Classes

- `dynamic-color-background-interactive` — Provides hover/active states that adapt to the parent background

### Recommended Classes

- `accessibility-tap-target` — Ensures the tap target size is large enough without affecting the size of the button

### Optional Classes

- `dynamic-color-border` — Adapts the border color to the parent background

## Adapting to Background Colors

ControlButtons automatically adapt to their parents' background color using the
[dynamic color system][dynamic-color]. Set a background and text color on the
parent element:

```html
<div class="bg-emotion-informative-basic text-emotion-informative-subtle">
  <button
    type="button"
    class="ControlButton ControlButton--medium dynamic-color-background-interactive accessibility-tap-target"
    aria-label="Close"
  >
    <svg class="Icon" width="16" height="16" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#close" />
    </svg>
  </button>
</div>
```

This works with any pair of available background and text colors.

## Variants

### With Background

Add the `ControlButton--hasBackground` modifier class to the button to make
the background visible in the default state. The modifier class reads the
`--spirit-local-background-color` CSS variable which is typically provided by
`bg-*` utility class.

```html
<button
  type="button"
  class="ControlButton ControlButton--medium ControlButton--hasBackground dynamic-color-background-interactive accessibility-tap-target"
  aria-label="Close"
>
  <svg class="Icon" width="16" height="16" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#close" />
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
    <use xlink:href="/icons/svg/sprite.svg#close" />
  </svg>
</button>
```

## Sizes

The following sizes are available:

| Size   | CSS Class               | Icon Size |
| ------ | ----------------------- | --------- |
| Small  | `ControlButton--small`  | 16px      |
| Medium | `ControlButton--medium` | 16px      |
| Large  | `ControlButton--large`  | 20px      |

## Feature Flag: Expanded Size Scale

Enable the expanded size scale using the `spirit-feature-enable-v5-control-button-expanded-size-scale`
CSS class on a parent element or using the `$enable-v5-control-button-expanded-size-scale` Sass flag.
When enabled, the size scale shifts to include two additional smaller sizes (`xsmall` and `small`)
while mapping the existing sizes up:

| Size   | CSS Class               | Height | Icon Size |
| ------ | ----------------------- | ------ | --------- |
| XSmall | `ControlButton--xsmall` | 16px   | 16px      |
| Small  | `ControlButton--small`  | 20px   | 16px      |
| Medium | `ControlButton--medium` | 24px   | 16px      |
| Large  | `ControlButton--large`  | 32px   | 16px      |
| XLarge | `ControlButton--xlarge` | 40px   | 20px      |

```html
<div class="spirit-feature-enable-v5-control-button-expanded-size-scale">
  <button
    type="button"
    class="ControlButton ControlButton--xsmall ControlButton--symmetrical dynamic-color-background-interactive accessibility-tap-target"
    aria-label="Close"
  >
    <svg class="Icon" width="16" height="16" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#close" />
    </svg>
  </button>
</div>
```

## Symmetrical ControlButton

A symmetrical control button has equal width and height, typically used with icon-only buttons.

```html
<button
  type="button"
  class="ControlButton ControlButton--medium ControlButton--symmetrical dynamic-color-background-interactive accessibility-tap-target"
  aria-label="Close"
>
  <svg class="Icon" width="16" height="16" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#close" />
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
    <use xlink:href="/assets/icons/svg/sprite.svg#close" />
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
    <use xlink:href="/assets/icons/svg/sprite.svg#close" />
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
    <use xlink:href="/icons/svg/sprite.svg#close" />
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
    <use xlink:href="/icons/svg/sprite.svg#close" />
  </svg>
</button>
```

## Disabled State

Use the `disabled` attribute to disable a ControlButton. This will also apply the `ControlButton--disabled` class, ensuring proper behavior.
To achieve proper styles, use `color-scheme-on-disabled` class on the parent element or directly on the ControlButton.

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
      <use xlink:href="/icons/svg/sprite.svg#chevron-left" />
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
      <use xlink:href="/icons/svg/sprite.svg#chevron-right" />
    </svg>
  </button>
</div>
```

**Standalone ControlButton:**

```html
<button
  type="button"
  class="ControlButton ControlButton--medium ControlButton--symmetrical dynamic-color-background-interactive accessibility-tap-target color-scheme-on-disabled"
  aria-label="Close"
  disabled
>
  <svg class="Icon" width="16" height="16" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#close" />
  </svg>
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
