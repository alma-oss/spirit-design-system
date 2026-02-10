# Migration Guide

Introducing version 2 of the _spirit-web_ package.

> Please follow these steps to safely upgrade to Spirit Design System v2 components.

## Overview

- [General Changes](#general-changes)
  - [Dropped Support for Node.js 16](#dropped-support-for-nodejs-16)
  - [CSS Variables Component Prefix](#css-variables-component-prefix)
  - [Placement in Dropdown and Tooltip](#placement-in-dropdown-and-tooltip)
- [Feature Flags](#feature-flags)
  - [Alert: Border](#alert-border)
  - [Dropdown: Shadow](#dropdown-shadow)
  - [Modal: Uniform Variant](#modal-uniform-variant)
  - [Tooltip: Controlled Placement](#tooltip-controlled-placement)
- [JavaScript Plugins](#javascript-plugins)
  - [Tooltip: Floating UI only](#tooltip-floating-ui-only)
- [Component Changes](#component-changes)
  - [Dropdown: New Structure](#dropdown-new-structure)
  - [Dropdown: Placement Control](#dropdown-placement-control)
  - [Dropdown: Combined Placements](#dropdown-combined-placements)
  - [Grid: GridSpan Component](#grid-gridspan-component)
  - [Header: HeaderDesktopActions Alignment](#header-headerdesktopactions-alignment)
  - [Modal: (Non)Scrollable](#modal-nonscrollable)
  - [Modal: Custom Height](#modal-custom-height)
  - [Tooltip: New Structure](#tooltip-new-structure)
  - [Tooltip: Placement Control](#tooltip-placement-control)

## General Changes

### Dropped Support for Node.js 16

The Node.js v16 is no longer supported. The minimum required Node.js version is 18.

### CSS Variables Component Prefix

All CSS variables in the components now have a component name prefix.

- In Stack, `--gap` is now `--stack-gap`.
- In the `.text-truncate-multiline` helper, `--lines` is now `--text-truncate-lines`.
- The gradient `--angle` is now `--gradient-angle`.

#### Migration Guide

Update the CSS variables in your project to use the new component name prefix.

- `--gap` → `--stack-gap`
- `--lines` → `--text-truncate-lines`
- `--angle` → `--gradient-angle`

### Placement in Dropdown and Tooltip

The `Tooltip` and `Dropdown` components now support only flow-relative cross-axis placements.

1. New [placement naming][dictionary-placement]:
   1. The main placement axis (top, right, bottom, left) remains the same.
   2. The cross axis (formerly also top, right, bottom, left) is now relative to the main axis: start, end.
2. Component-specific placement CSS classes were removed. All placements in the _spirit-web_ package are now controlled
   by the `data-spirit-placement` attribute.

#### Migration Guide

See [Dropdown: Placement Control](#dropdown-placement-control) and [Tooltip: Placement Control](#tooltip-placement-control)
for more details about usage of the _spirit-web_ package implementation.

## Feature Flags

### Alert: Border

The feature flag enabling the bordered variant of alert was removed and the bordered variant
is now default.

#### Migration Guide

You can now safely delete the CSS class `.spirit-feature-alert-enable-bordered` and/or the Sass variable
`$alert-enable-bordered` from your project as they have no effect.

### Dropdown: Shadow

The feature flag enabling the dropdown shadow was removed and the enhanced
shadow is now default.

#### Migration Guide

You can now safely delete the CSS class `.spirit-feature-dropdown-enable-enhanced-shadow` and/or the Sass variable
`$dropdown-enable-enhanced-shadow` from your project as they have no effect.

### Modal: Uniform Variant

The feature flag enabling the uniform variant of modal was removed and the
uniform variant is now default.

#### Migration Guide

You can now safely delete the CSS class `.spirit-feature-modal-enable-uniform-dialog` and/or the Sass variable
`$modal-enable-uniform-dialog` from your project as they have no effect.

### Tooltip: Controlled Placement

The feature flag enabling the data-selector-controlled placement (`data-spirit-placement-controlled`) for the tooltip
was removed. The controlled placement is now default.

#### Migration Guide

You can now safely delete the CSS class `.spirit-feature-tooltip-enable-data-placement` and/or the Sass variable
`$tooltip-enable-data-placement` from your project as they have no effect.

## JavaScript Plugins

> ℹ️ Do you use the _spirit-web-react_ package? Congratulations, you are done here! 🎉
> Please refer to the migration guide for the changes in the React components.

### Tooltip: Floating UI only

Non-Floating-UI and CSS-only Tooltips are no longer supported. That's because we found out that most users want the
advanced positioning options anyway. The Tooltip component is now dependent on the [Floating UI][floating-ui] library
and has a new structure. See the updated [Tooltip documentation][readme-tooltip] for more details on how to use Tooltip
now.

#### Migration Guide

Delete the [controlled placement feature flag](#tooltip-controlled-placement) and follow the
[new Tooltip structure](#tooltip-new-structure).

## Component Changes

> ℹ️ Do you use the _spirit-web-react_ or _spirit-web-twig_ package? Congratulations, you are done here! 🎉
> Please refer to the respective migration guide for the changes in the React or Twig components.

### Dropdown: New Structure

The Dropdown component structure changed and Dropdown (formerly the optional DropdownWrapper) is now a mandatory
wrapping component. Similarly, Dropdown (the popover itself) was renamed to DropdownPopover.

#### Migration Guide

1. Rename `.Dropdown` to `.DropdownPopover`.
2. Fix the wrapper:
   1. either add a new `.Dropdown` component wrapping the `.DropdownPopover`, or
   2. rename your existing `.DropdownWrapper` to `.Dropdown`.

### Dropdown: Placement Control

The Dropdown component now supports only [flow-relative cross-axis placements](#placement-in-dropdown-and-tooltip)
controlled via the `data-spirit-placement` attribute.

#### Migration Guide

Instead of using `.Dropdown--top` or `.Dropdown--topLeft`, use a data attribute like `data-spirit-placement="top"` or
`data-spirit-placement="top-start"`.

- `.Dropdown--topLeft` → `data-spirit-placement="top-start"`
- `.Dropdown--top` → `data-spirit-placement="top"`
- `.Dropdown--topRight` → `data-spirit-placement="top-end"`
- `.Dropdown--rightTop` → `data-spirit-placement="right-start"`
- `.Dropdown--right` → `data-spirit-placement="right"`
- `.Dropdown--rightBottom` → `data-spirit-placement="right-end"`
- `.Dropdown--bottomRight` → `data-spirit-placement="bottom-end"`
- `.Dropdown--bottom` → `data-spirit-placement="bottom"`
- `.Dropdown--bottomLeft` → `data-spirit-placement="bottom-start"`
- `.Dropdown--leftBottom` → `data-spirit-placement="left-end"`
- `.Dropdown--left` → `data-spirit-placement="left"`
- `.Dropdown--leftTop` → `data-spirit-placement="left-start"`

### Dropdown: Combined Placements

Combined placement classes for Dropdown were removed.

#### Migration Guide

Instead of using `.Dropdown--bottom.Dropdown--left`, use a combined value of `bottom-start` in the placement data attribute.

- `.Dropdown--top.Dropdown--left` → `data-spirit-placement="top-start"`
- `.Dropdown--top.Dropdown--right` → `data-spirit-placement="top-end"`
- `.Dropdown--bottom.Dropdown--left` → `data-spirit-placement="bottom-start"`
- `.Dropdown--bottom.Dropdown--right` → `data-spirit-placement="bottom-end"`
- `.Dropdown--left.Dropdown--top` → `data-spirit-placement="left-start"`
- `.Dropdown--left.Dropdown--bottom` → `data-spirit-placement="left-end"`
- `.Dropdown--right.Dropdown--top` → `data-spirit-placement="right-start"`
- `.Dropdown--right.Dropdown--bottom` → `data-spirit-placement="right-end"`

### Grid: GridSpan Component

The GridSpan component was removed. Instead, you can use the more powerful GridItem component that allows you to define
the start and end columns for each breakpoint.

#### Migration Guide

1. Replace `.Grid__span` with `.GridItem`.
2. Calculate and set the CSS variable `--grid-item-column-start` value `1 + (columns - over) / 2`, in our 12-column grid, the equation is `1 + (12 - over) / 2`, where `over` is the number from the `Grid__span--over-*` modifier.
3. Set the CSS variable `--grid-item-column-end` value to `span over` or you can use calculated `--grid-item-column-start + over`.
4. If you use responsive props, repeat the process for each breakpoint and set the values to the `--grid-item-column-start-breakpoint` and `--grid-item-column-end-breakpoint` variables.
5. Remove any `.Grid__span--*` modifier classes.

##### Examples

- Centered grid item over 4 columns:
  ```diff
  -<div class="Grid__span Grid__span--over-4">…</div>
  +<div class="GridItem" style="--grid-item-column-start: 5; --grid-item-column-end: span 4;">…</div>
  ```
  `column-start` = 1 + (12 - 4) / 2 = 5
- Centered grid item over 6 columns:
  ```diff
  -<div class="Grid__span Grid__span--over-6">…</div>
  +<div class="GridItem" style="--grid-item-column-start: 4; --grid-item-column-end: span 6;">…</div>
  ```
  `column-start` = 1 + (12 - 6) / 2 = 4
- Responsive grid item centered over 8 columns on mobile, 6 columns on tablet, and 4 columns on desktop:

  ```diff
  -<div
  -  class="
  -    Grid__span
  -    Grid__span--over-8
  -    Grid__span--tablet--over-6
  -    Grid__span--desktop--over-4
  -  "
  ->…</div>
  +<div
  +  class="GridItem"
  +  style="
  +    --grid-item-column-start: 3;
  +    --grid-item-column-end: span 8;
  +    --grid-item-column-start-tablet: 4;
  +    --grid-item-column-end-tablet: span 6;
  +    --grid-item-column-start-desktop: 5;
  +    --grid-item-column-end-desktop: span 4;
  +  "
  +>…</div>
  ```

  - `column-start` = 1 + (12 - 8) / 2 = 3
  - `column-start` = 1 + (12 - 6) / 2 = 4
  - `column-start` = 1 + (12 - 4) / 2 = 5

### Header: HeaderDesktopActions Alignment

The HeaderDesktopActions component slots were simplified and the second slot alignment is now
available by using the `.HeaderDesktopActions--end` modifier.

The `.HeaderDesktopActions--primary` and `.HeaderDesktopActions--secondary` modifier classes were removed.

#### Migration Guide

Use the `.HeaderDesktopActions--end` modifier class instead of the `.HeaderDesktopActions--secondary` modifier class.

- `.HeaderDesktopActions.HeaderDesktopActions--primary` → `.HeaderDesktopActions`
- `.HeaderDesktopActions.HeaderDesktopActions--secondary` → `.HeaderDesktopActions.HeaderDesktopActions--end`

### Modal: (Non)Scrollable

The `.ModalDialog--nonScrollable` modifier was removed and the ModalDialog is made non-scrollable by default.

#### Migration Guide

In the new version, use the `.ModalDialog--scrollable` modifier class to make the ModalDialog scrollable.

If you use ScrollView for scrolling the content of your Modal, you must also add the `.ModalDialog--scrollable` class
to the `.ModalDialog` element.

- `.ModalDialog` → `.ModalDialog.ModalDialog--scrollable`

### Modal: Custom Height

The `--modal-preferred-height-mobile`, `--modal-preferred-height-tablet`, `--modal-max-height-tablet` custom properties
were renamed.

#### Migration Guide

Update the custom properties in your project to use the new names:

- `--modal-preferred-height-mobile` → `--modal-dialog-height`
- `--modal-preferred-height-tablet` → `--modal-dialog-height-tablet`
- `--modal-max-height-tablet` → `--modal-dialog-max-height-tablet`

### Tooltip: New Structure

The Tooltip component structure changed and Tooltip (formerly the optional TooltipWrapper) is now a mandatory
wrapping component. Similarly, Tooltip (the tip itself) was renamed to TooltipPopover.

#### Migration Guide

1. Rename `.Tooltip` to `.TooltipPopover`.
2. Fix the wrapper:
   1. either add a new `.Tooltip` component wrapping the `.TooltipPopover`, or
   2. rename your existing `.TooltipWrapper` to `.Tooltip`.

Also, Tooltip now has a different API and uses the [Floating UI][floating-ui] library. That's because we found out that
most users want the advanced positioning options anyway.

See [Tooltip documentation][readme-tooltip] for more details and examples.

### Tooltip: Placement Control

The Tooltip component now supports only [flow-relative cross-axis placements](#placement-in-dropdown-and-tooltip)
controlled via the `data-spirit-placement` attribute.

#### Migration Guide

Instead of using `.Tooltip--top` or `.Tooltip--topLeft`, use a data attribute like `data-spirit-placement="top"` or
`data-spirit-placement="top-start"`.

- `.Tooltip--topLeft` → `data-spirit-placement="top-start"`
- `.Tooltip--top` → `data-spirit-placement="top"`
- `.Tooltip--topRight` → `data-spirit-placement="top-end"`
- `.Tooltip--rightTop` → `data-spirit-placement="right-start"`
- `.Tooltip--right` → `data-spirit-placement="right"`
- `.Tooltip--rightBottom` → `data-spirit-placement="right-end"`
- `.Tooltip--bottomRight` → `data-spirit-placement="bottom-end"`
- `.Tooltip--bottom` → `data-spirit-placement="bottom"`
- `.Tooltip--bottomLeft` → `data-spirit-placement="bottom-start"`
- `.Tooltip--leftBottom` → `data-spirit-placement="left-end"`
- `.Tooltip--left` → `data-spirit-placement="left"`
- `.Tooltip--leftTop` → `data-spirit-placement="left-start"`

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.

[dictionary-placement]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#placement
[readme-tooltip]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Tooltip/README.md
[floating-ui]: https://floating-ui.com
