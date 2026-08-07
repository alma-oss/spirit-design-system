# UNSTABLE SplitTag

`UNSTABLE_SplitTag` visually joins multiple related `Tag` segments into one compact control.

> This component is UNSTABLE. It may significantly change at any time without notice.

**Important:** Styles depend on the HTML structure and segment order. Keep interactive segments as
direct Tag/button children (or Tag shells wrapping controls) so joined corners and segment gap apply
as intended.

The component works with Spirit `Tag` segments and Spirit overlay components whose trigger is rendered as a
button-like `Tag`.

## Basic Usage

```html
<div class="UNSTABLE_SplitTag">
  <span class="Tag Tag--neutral Tag--medium color-scheme-on-neutral-basic">Prague</span>
  <span class="Tag Tag--neutral Tag--medium color-scheme-on-neutral-basic">+5 km</span>
</div>
```

## With Dropdown

Use a button-like `Tag` as the dropdown trigger when the segment opens a radius picker.
Wrap the chevron in a presentational `ControlButton` `span`, same as the remove icon.

```html
<div class="UNSTABLE_SplitTag" role="group" aria-label="Prague distance filter, radius +5 km">
  <span class="Tag Tag--neutral Tag--medium color-scheme-on-neutral-basic">Prague</span>
  <div class="Dropdown">
    <button
      type="button"
      class="Tag Tag--neutral Tag--medium color-scheme-on-neutral-basic"
      data-spirit-toggle="dropdown"
      data-spirit-target="#split-tag-radius"
      aria-expanded="false"
      aria-controls="split-tag-radius"
      data-spirit-autoclose="true"
      aria-label="Select distance, selected +5 km"
    >
      +5 km
      <span
        class="ControlButton ControlButton--xsmall text-color-scheme dynamic-color-background-interactive ControlButton--hasBackground dynamic-color-border ControlButton--symmetrical element-stretched"
        aria-hidden="true"
      >
        <svg class="Icon" width="16" height="16" aria-hidden="true">
          <use href="/assets/icons/svg/sprite.svg#chevron-down" />
        </svg>
      </span>
    </button>
    <div class="DropdownPopover placement-bottom-start" data-spirit-placement="bottom-start" id="split-tag-radius">
      <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-300);">
        <button type="button" class="Item color-scheme-on-selected-subtle bg-color-scheme">
          <span class="Item__content" role="presentation">
            <span class="Label">+5 km</span>
          </span>
        </button>
        <button type="button" class="Item">
          <span class="Item__content" role="presentation">
            <span class="Label">+10 km</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</div>
```

## With ControlButton

Use `Tag` as the interactive remove control and render the nested `ControlButton` as a presentational
`span` to avoid nested interactive controls.

```html
<div class="UNSTABLE_SplitTag" role="group" aria-label="Prague distance filter">
  <span class="Tag Tag--neutral Tag--medium color-scheme-on-neutral-basic">Prague</span>
  <button
    type="button"
    class="Tag Tag--neutral Tag--medium color-scheme-on-neutral-basic"
    aria-label="Remove Prague distance filter"
  >
    <span
      class="ControlButton ControlButton--xsmall text-color-scheme dynamic-color-background-interactive ControlButton--hasBackground dynamic-color-border ControlButton--symmetrical element-stretched"
      aria-hidden="true"
    >
      <svg class="Icon" width="16" height="16" aria-hidden="true">
        <use href="/assets/icons/svg/sprite.svg#close" />
      </svg>
    </span>
  </button>
</div>
```

### ControlButton Size Mapping

| Tag Size | ControlButton Size |
| -------- | ------------------ |
| xsmall   | xsmall             |
| small    | xsmall             |
| medium   | xsmall             |
| large    | small              |
| xlarge   | small              |

## Accessibility

`UNSTABLE_SplitTag` does not set grouping semantics by default. When the segments represent one filter or one
logical control, add `role="group"` and provide an accessible name with `aria-label` or `aria-labelledby`.

For removable segments, put `aria-label` on the interactive `Tag` and keep the nested `ControlButton`
presentational with a `span` element and `aria-hidden="true"`.
