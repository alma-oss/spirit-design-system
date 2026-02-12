# Tag

Tag is a visual label used to categorize, organize, or indicate the status of items.

## Basic Usage

```html
<span class="Tag Tag--neutral Tag--small">Tag</span>
```

## Color Variants

⚠️ Color variant classes (`Tag--<color>`, `Tag--subtle`) are deprecated and will be removed in the next major version
in favor of color schemes using utility classes (`border-*`, `bg-*`, `text-*`).
See [DS-2269][ds-2269].

There are several color variants of Tag to choose from: neutral, informative, success, warning, danger, and selected.

Each variant also has a subtle version using the `Tag--subtle` modifier:

```html
<span class="Tag Tag--neutral Tag--small">Neutral tag</span>
<span class="Tag Tag--informative Tag--small">Informative tag</span>
<span class="Tag Tag--success Tag--small">Success tag</span>
<span class="Tag Tag--warning Tag--small">Warning tag</span>
<span class="Tag Tag--danger Tag--small">Danger tag</span>
<span class="Tag Tag--selected Tag--small">Selected tag</span>
```

Subtle variants:

```html
<span class="Tag Tag--neutral Tag--subtle Tag--small">Neutral subtle tag</span>
<span class="Tag Tag--informative Tag--subtle Tag--small">Informative subtle tag</span>
<span class="Tag Tag--success Tag--subtle Tag--small">Success subtle tag</span>
<span class="Tag Tag--warning Tag--subtle Tag--small">Warning subtle tag</span>
<span class="Tag Tag--danger Tag--subtle Tag--small">Danger subtle tag</span>
```

## Sizes

Tag comes in five available sizes: xsmall, small, medium, large, and xlarge.

```html
<span class="Tag Tag--neutral Tag--xsmall">XSmall tag</span>
<span class="Tag Tag--neutral Tag--small">Small tag</span>
<span class="Tag Tag--neutral Tag--medium">Medium tag</span>
<span class="Tag Tag--neutral Tag--large">Large tag</span>
<span class="Tag Tag--neutral Tag--xlarge">XLarge tag</span>
```

## With ControlButton

ℹ️ The `ControlButton` inside `Tag` requires the
[expanded size scale][expanded-size-scale] and [Tag appearance](#feature-flag-appearance) features to be enabled.

### ControlButton Size Matching

| Tag Size | ControlButton Size |
| -------- | ------------------ |
| xsmall   | xsmall             |
| small    | small              |
| medium   | small              |
| large    | medium             |
| xlarge   | medium             |

```html
<div class="spirit-feature-enable-v5-control-button-expanded-size-scale spirit-feature-enable-v5-tag-appearance">
  <div class="Tag Tag--selected Tag--medium">
    <span>Tag label</span>
    <button
      type="button"
      class="ControlButton ControlButton--small ControlButton--symmetrical"
      aria-label="Remove Tag label"
    >
      <svg class="Icon" width="16" height="16" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#close" />
      </svg>
    </button>
  </div>
</div>
```

## Disabled

Add the `Tag--disabled` modifier to visually disable a Tag:

```html
<span class="Tag Tag--neutral Tag--small Tag--disabled">Disabled tag</span>
```

Disabled Tag with `ControlButton`:

```html
<div class="spirit-feature-enable-v5-control-button-expanded-size-scale spirit-feature-enable-v5-tag-appearance">
  <div class="Tag Tag--neutral Tag--medium Tag--disabled">
    <span>Disabled tag</span>
    <button
      type="button"
      class="ControlButton ControlButton--small ControlButton--symmetrical"
      aria-label="Remove Disabled tag"
      disabled
    >
      <svg class="Icon" width="16" height="16" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#close" />
      </svg>
    </button>
  </div>
</div>
```

## Feature Flag: Appearance

The Tag appearance feature flag enables the new Tag layout with explicit height and inside spacing.

Enable it via a Sass variable:

```scss
@use '~@alma-oss/spirit-web/scss/settings/feature-flags' with (
  $enable-v5-tag-appearance: true
);
```

Or via a CSS class on any parent element:

```html
<div class="spirit-feature-enable-v5-tag-appearance">
  <span class="Tag Tag--neutral Tag--medium">Tag</span>
</div>
```

[ds-2269]: https://jira.almacareer.tech/browse/DS-2269
[expanded-size-scale]: https://github.com/lmc-eu/spirit-design-system/blob/main/packages/web/src/scss/components/ControlButton/README.md#expanded-size-scale
