# UNSTABLE SplitTag

`UNSTABLE_SplitTag` visually joins multiple related `Tag` segments into one compact control.

> This component is UNSTABLE. It may significantly change at any time without notice.

> **Listbox interaction is not part of UNSTABLE_SplitTag.** The web demo includes demo-only JavaScript for
> roving focus, keyboard handling, and selection. Applications must provide equivalent behavior.

**Important:** Styles depend on the HTML structure and segment order. Keep segments as direct Tag/button
children or in a wrapper whose direct child is a link or button, such as Dropdown, so joined corners and the
segment gap apply as intended.

The component works with Spirit `Tag` segments and the Dropdown component whose trigger is rendered as a
button-like `Tag`.

## Basic Usage

```html
<div class="UNSTABLE_SplitTag">
  <span class="Tag Tag--neutral Tag--medium color-scheme-on-neutral-basic">Prague</span>
  <span class="Tag Tag--neutral Tag--medium color-scheme-on-neutral-basic">+5 km</span>
</div>
```

## With Dropdown

Use a button-like `Tag` as the Dropdown trigger when the segment opens, for example a radius picker. The
`Tag` button is the one interactive segment and owns the action. Render the nested `ControlButton` as a
decorative `span` to avoid nested or competing controls.

An interactive `ControlButton` can be rendered inside a static `Tag` when the inner button owns the action,
but that is not the pattern used in this recipe.

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
      aria-haspopup="dialog"
      data-spirit-autoclose="true"
      aria-label="Select distance, selected +5 km"
    >
      <span data-spirit-element="selected-radius">+5 km</span>
      <span
        class="ControlButton ControlButton--xsmall text-color-scheme dynamic-color-background-interactive ControlButton--hasBackground dynamic-color-border ControlButton--symmetrical element-stretched"
        aria-hidden="true"
      >
        <svg class="Icon" width="16" height="16" aria-hidden="true">
          <use href="/assets/icons/svg/sprite.svg#chevron-down" />
        </svg>
      </span>
    </button>
    <div
      role="dialog"
      aria-label="Distance options"
      class="DropdownPopover placement-bottom-start"
      data-spirit-placement="bottom-start"
      id="split-tag-radius"
    >
      <div
        role="listbox"
        aria-label="Distance"
        class="Stack Stack--spacing"
        style="--stack-spacing: var(--spirit-space-300);"
      >
        <div
          role="option"
          id="split-tag-radius-5"
          aria-selected="true"
          tabindex="0"
          class="Item cursor-pointer color-scheme-on-selected-subtle bg-color-scheme"
        >
          <span class="Item__content" role="presentation">
            <span class="Label">+5 km</span>
          </span>
          <span class="Item__slot" role="presentation">
            <svg
              class="Icon Icon--selected"
              data-spirit-element="option-check"
              width="20"
              height="20"
              aria-hidden="true"
            >
              <use href="/assets/icons/svg/sprite.svg#check-plain" />
            </svg>
          </span>
        </div>
        <div role="option" id="split-tag-radius-10" aria-selected="false" tabindex="-1" class="Item cursor-pointer">
          <span class="Item__content" role="presentation">
            <span class="Label">+10 km</span>
          </span>
          <span class="Item__slot" role="presentation">
            <svg
              class="Icon Icon--selected d-none"
              data-spirit-element="option-check"
              width="20"
              height="20"
              aria-hidden="true"
            >
              <use href="/assets/icons/svg/sprite.svg#check-plain" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
```

## With ControlButton

Use `Tag` as the one interactive remove control and render the nested `ControlButton` as a decorative
`span` to avoid nested or competing controls.

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

Grouping semantics are not set on `UNSTABLE_SplitTag` segments by default. When the segments represent one
filter or one logical control, add `role="group"` and provide an accessible name with `aria-label` or
`aria-labelledby`.

The `Tag` button owns the segment action in this recipe. Put its accessible name on the interactive `Tag`
and keep its nested `ControlButton` decorative with a `span` element and `aria-hidden="true"`.

The Dropdown trigger uses `aria-haspopup="dialog"` and controls a `role="dialog"` popover with an accessible
name. Radius choices are plain labels without interactive descendants, so the inner option list uses
`role="listbox"` and `role="option"` according to [decision 013][decision-listbox-grid]. Each option has a
unique `id`, `aria-selected`, and roving `tabindex`; its decorative check glyph is rendered at the end in
`Item__slot`.

The demo uses real focus in the listbox. Up and Down Arrow move focus without wrapping, Home and End move to
the first and last option, printable characters use type-ahead with a 500 ms reset, and Space or Enter
selects the focused option.

[decision-listbox-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/decisions/013-listbox-vs-grid-for-selectable-options.md
