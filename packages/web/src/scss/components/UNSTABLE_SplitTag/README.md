# UNSTABLE SplitTag

`UNSTABLE_SplitTag` visually joins multiple related `Tag` segments into one compact control.

> This component is UNSTABLE. It may significantly change at any time without notice.

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
    >
      +5 km
      <svg class="Icon" width="24" height="24" aria-hidden="true">
        <use href="/assets/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </button>
    <div class="DropdownPopover placement-bottom-start" data-spirit-placement="bottom-start" id="split-tag-radius">
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
```

## With ControlButton

Use a non-interactive `Tag` shell when the remove action lives on a nested `ControlButton`.

```html
<div class="UNSTABLE_SplitTag" role="group" aria-label="Prague distance filter">
  <span class="Tag Tag--neutral Tag--medium color-scheme-on-neutral-basic">Prague</span>
  <span class="Tag Tag--neutral Tag--medium color-scheme-on-neutral-basic">
    <button
      type="button"
      class="ControlButton ControlButton--xsmall text-color-scheme dynamic-color-background-interactive accessibility-tap-target ControlButton--hasBackground dynamic-color-border ControlButton--symmetrical"
      aria-label="Remove Prague distance filter"
    >
      <svg class="Icon" width="16" height="16" aria-hidden="true">
        <use href="/assets/icons/svg/sprite.svg#close" />
      </svg>
    </button>
  </span>
</div>
```

Alternatively, use `Tag` as the interactive element and render the nested `ControlButton` as a presentational
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
      class="ControlButton ControlButton--xsmall text-color-scheme dynamic-color-background-interactive accessibility-tap-target ControlButton--hasBackground dynamic-color-border ControlButton--symmetrical"
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

For removable segments, provide a specific accessible label and click handler on the interactive element.
When the action lives on `ControlButton`, put `aria-label` on the button. When the action lives on `Tag`, keep
the nested `ControlButton` presentational with a `span` element and `aria-hidden="true"`.
