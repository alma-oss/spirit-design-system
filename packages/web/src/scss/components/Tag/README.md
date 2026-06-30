# Tag

Tag is a visual label used to categorize, organize, or indicate the status of items.

## Basic Usage

```html
<span class="Tag Tag--neutral Tag--small color-scheme-on-neutral-basic">Tag</span>
```

## Color Variants

`Tag` supports neutral, selected, and emotion color variants.
Apply the matching `color-scheme-on-*` helper to each variant:

```html
<span class="Tag Tag--neutral Tag--small color-scheme-on-neutral-basic">Neutral tag</span>
<span class="Tag Tag--informative Tag--small color-scheme-on-emotion-informative-basic">Informative tag</span>
<span class="Tag Tag--success Tag--small color-scheme-on-emotion-success-basic">Success tag</span>
<span class="Tag Tag--warning Tag--small color-scheme-on-emotion-warning-basic">Warning tag</span>
<span class="Tag Tag--danger Tag--small color-scheme-on-emotion-danger-basic">Danger tag</span>
<span class="Tag Tag--selected Tag--small color-scheme-on-selected-basic">Selected tag</span>
```

The system allows you to override the default color scheme by configuring optional design tokens. Even though the `Tag--<color>` modifier is not used by default, it can be used to override the color scheme when needed. See [Component Color Overrides][component-color-overrides] for more information.

### Subtle Variant

Use the `*-subtle` color scheme class together with the `Tag--subtle` modifier when you need a softer color intensity:

```html
<span class="Tag Tag--neutral Tag--subtle Tag--small color-scheme-on-neutral-subtle">Neutral subtle tag</span>
<span class="Tag Tag--informative Tag--subtle Tag--small color-scheme-on-emotion-informative-subtle"
  >Informative subtle tag</span
>
<span class="Tag Tag--success Tag--subtle Tag--small color-scheme-on-emotion-success-subtle">Success subtle tag</span>
<span class="Tag Tag--warning Tag--subtle Tag--small color-scheme-on-emotion-warning-subtle">Warning subtle tag</span>
<span class="Tag Tag--danger Tag--subtle Tag--small color-scheme-on-emotion-danger-subtle">Danger subtle tag</span>
```

## Sizes

Tag comes in five available sizes: xsmall, small, medium, large, and xlarge.

```html
<span class="Tag Tag--neutral Tag--xsmall color-scheme-on-neutral-basic">XSmall tag</span>
<span class="Tag Tag--neutral Tag--small color-scheme-on-neutral-basic">Small tag</span>
<span class="Tag Tag--neutral Tag--medium color-scheme-on-neutral-basic">Medium tag</span>
<span class="Tag Tag--neutral Tag--large color-scheme-on-neutral-basic">Large tag</span>
<span class="Tag Tag--neutral Tag--xlarge color-scheme-on-neutral-basic">XLarge tag</span>
```

## With ControlButton

### ControlButton Size Mapping

| Tag Size | ControlButton Size |
| -------- | ------------------ |
| xsmall   | xsmall             |
| small    | xsmall             |
| medium   | xsmall             |
| large    | small              |
| xlarge   | small              |

```html
<div class="Tag Tag--selected Tag--medium color-scheme-on-selected-basic">
  <span>Tag label</span>
  <button
    type="button"
    class="ControlButton ControlButton--xsmall ControlButton--symmetrical"
    aria-label="Remove Tag label"
  >
    <svg class="Icon" width="16" height="16" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#close" />
    </svg>
  </button>
</div>
```

## Interactive Tag

Tag can be rendered as a `<button>` or `<a>` element to make it interactive. Hover and active states apply a
dynamically derived background color via a `::before` pseudo-element overlay.

### Button

```html
<button type="button" class="Tag Tag--neutral Tag--medium color-scheme-on-neutral-basic">Button tag</button>
```

### Link

```html
<a href="#" class="Tag Tag--neutral Tag--medium color-scheme-on-neutral-basic">Link tag</a>
```

## Disabled

Use the `disabled` utility class for disabled colors and pointer interaction. For interactive elements, combine with the native `disabled` attribute or `aria-disabled="true"` for links.

```html
<span class="Tag Tag--neutral Tag--small disabled">Disabled tag</span>
```

Disabled Tag with `ControlButton`:

```html
<div class="Tag Tag--neutral Tag--medium color-scheme-on-neutral-basic disabled">
  <span>Disabled tag</span>
  <button
    type="button"
    class="ControlButton ControlButton--xsmall ControlButton--symmetrical disabled"
    aria-label="Remove Disabled tag"
    disabled
  >
    <svg class="Icon" width="16" height="16" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#close" />
    </svg>
  </button>
</div>
```

Disabled link Tag:

```html
<a role="link" class="Tag Tag--neutral Tag--small disabled" aria-disabled="true">Disabled link tag</a>
```

ℹ️ Read more about this pattern at [Scott O'Hara's blog][scott-o-hara-disabling-a-link].

[component-color-overrides]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/design-tokens/README.md#component-color-overrides
[scott-o-hara-disabling-a-link]: https://www.scottohara.me/blog/2021/05/28/disabled-links.html
