# ContextualHelp

ContextualHelp shows extra information about a nearby field or control. It is a composition of a quiet icon-only
[ControlButton][control-button] that opens a [Tooltip][tooltip]. It has no CSS of its own.

The [Tooltip JavaScript plugin][tooltip-js] powers open and close behavior. There is no separate ContextualHelp plugin.

## Basic Usage

The trigger uses the `info` icon by default. Pair it with a nearby label using [Flex][flex]:

```html
<div class="Flex Flex--horizontal Flex--alignmentYCenter" style="--flex-spacing-x: var(--spirit-space-100);">
  <label class="Label" for="languages">Languages</label>
  <div class="Tooltip d-inline-block" data-spirit-element="tooltip">
    <button
      type="button"
      class="ControlButton ControlButton--small ControlButton--symmetrical text-color-scheme dynamic-color-background-interactive accessibility-tap-target d-flex"
      aria-describedby="languages-help"
      data-spirit-toggle="tooltip"
      data-spirit-target="#languages-help"
    >
      <svg class="Icon" width="16" height="16" aria-hidden="true">
        <use href="/icons/svg/sprite.svg#info" />
      </svg>
      <span class="accessibility-hidden">More information about Languages</span>
    </button>
    <div
      id="languages-help"
      class="TooltipPopover color-scheme-on-neutral-basic is-hidden placement-top placement-controlled"
      data-spirit-placement="top"
      data-spirit-trigger="click, hover, focus"
    >
      Choose all languages you can use at work.
      <span class="TooltipPopover__arrow" data-spirit-element="arrow"></span>
    </div>
  </div>
</div>
```

The trigger is **subtle**: omit `ControlButton--hasBackground` and `dynamic-color-border`. Keep
`ControlButton--symmetrical` for the icon-only square.

## Icon

Override the sprite fragment to use another icon. Change `width` and `height` on the SVG when you need a custom size
(otherwise the icon inherits ControlButton’s per-size dimensions):

```html
<svg class="Icon" width="16" height="16" aria-hidden="true">
  <use href="/icons/svg/sprite.svg#help" />
</svg>
<span class="accessibility-hidden">What is a segment?</span>
```

## Placement and Other Tooltip Options

ContextualHelp uses [Tooltip][tooltip] placement, trigger, dismissible, and Floating UI attributes. Placement defaults
to `top`. The trigger defaults to click, hover, and focus — set `data-spirit-trigger="click, hover, focus"` because
Tooltip’s plugin default is only `click, hover`.

```html
<div
  id="opacity-help"
  class="TooltipPopover TooltipPopover--dismissible color-scheme-on-neutral-basic is-hidden placement-top placement-controlled"
  data-spirit-placement="top"
  data-spirit-trigger="click, hover, focus"
>
  Adjust how transparent this layer is.
  <!-- dismiss ControlButton, see Tooltip dismissible docs -->
  <span class="TooltipPopover__arrow" data-spirit-element="arrow"></span>
</div>
```

## Size

`ControlButton--small` is the default trigger size. Use another [ControlButton size][control-button-sizes] when the
control must match a larger field:

```html
<button
  type="button"
  class="ControlButton ControlButton--medium ControlButton--symmetrical text-color-scheme dynamic-color-background-interactive accessibility-tap-target d-flex"
  …
></button>
```

## With Form Fields

Place ContextualHelp next to the field [Label][label] in a horizontal Flex. Set a specific accessible name on the
trigger. `More information` is only the fallback when none is provided.

See [UNSTABLE Combobox][combobox] and [UNSTABLE Picker][picker] demos for the full field composition.

## Accessibility

The trigger is a real `button` with an [accessibility-hidden][accessibility-hidden] name (default `More information`).
Override that text when the default is not specific enough. Keyboard users can open the tooltip with focus as well as
click because `focus` is included in `data-spirit-trigger`.

Do not use a non-focusable icon as the trigger.

## Composition

| Piece            | What to use                                                                                           | Default                       |
| ---------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------- |
| Wrapper          | `.Tooltip.d-inline-block` with `data-spirit-element="tooltip"`                                        | —                             |
| Trigger          | `ControlButton` `small`, `symmetrical`, subtle (no background or border), `d-flex`                    | `small`                       |
| Icon             | [Icon][icon] sprite, `aria-hidden="true"`                                                             | `info`, 16×16 with small size |
| Accessible name  | `.accessibility-hidden` on a child span                                                               | `More information`            |
| Popover          | `.TooltipPopover` with `is-hidden`, `placement-top`, `placement-controlled`                           | `top`                         |
| Trigger behavior | `data-spirit-trigger="click, hover, focus"`                                                           | click, hover, and focus       |
| Linking          | Unique popover `id`; trigger `data-spirit-toggle="tooltip"`, `data-spirit-target`, `aria-describedby` | required                      |

[accessibility-hidden]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/helpers/accessibility/README.md
[combobox]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/UNSTABLE_Combobox/README.md
[control-button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/ControlButton/README.md
[control-button-sizes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/ControlButton/README.md#sizes
[flex]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Flex/README.md
[icon]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Icon/README.md
[label]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Label/README.md
[picker]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/UNSTABLE_Picker/README.md
[tooltip]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Tooltip/README.md
[tooltip-js]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Tooltip/README.md#javascript-api
