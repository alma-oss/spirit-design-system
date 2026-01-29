# Migration Guide

Introducing version 3 of the _spirit-web-twig_ package.

> Please follow these steps to safely upgrade to Spirit Design System v3 components.

> ℹ️ Don't forget to check the [migration guide of the _spirit-web_ package][migration-guide-web] for general changes in
> available feature flags, CSS, JavaScript plugins, and other changes that might affect your project.

## Overview

- [General Changes](#general-changes)
  - [Dropped Support for PHP 7.4](#dropped-support-for-php-74)
  - [Required `id` Prop in Form Components](#required-id-prop-in-form-components)
  - [Placement in Dropdown and Tooltip](#placement-in-dropdown-and-tooltip)
- [Component Changes](#component-changes)
  - [Alert: `danger` Icon](#alert-danger-icon)
  - [Alert: `role="alert"`](#alert-rolealert)
  - [Breadcrumbs: `goBackTitle` Prop](#breadcrumbs-gobacktitle-prop)
  - [Dropdown: New Structure](#dropdown-new-structure)
  - [Dropdown: `id` Prop](#dropdown-id-prop)
  - [Dropdown: Placement Control](#dropdown-placement-control)
  - [Grid: Breakpoint Props](#grid-breakpoint-props)
  - [Grid: GridSpan Component](#grid-gridspan-component)
  - [Header: Abstracts Class and Style](#header-abstracts-class-and-style)
  - [Header: HeaderDesktopActions `isAtEnd` prop](#header-headerdesktopactions-isatend-prop)
  - [Modal: ModalDialog `isScrollable` Prop](#modal-modaldialog-isscrollable-prop)
  - [Modal: ModalDialog Custom Height](#modal-modaldialog-custom-height)
  - [Modal: ModalDialog Uniform Appearance](#modal-modaldialog-uniform-appearance)
  - [Tabs: TabLink `target` Prop](#tabs-tablink-target-prop)
  - [Tooltip: New Structure](#tooltip-new-structure)
  - [Tooltip: Hidden by default](#tooltip-hidden-by-default)
  - [Tooltip: TooltipPopover `enableControlledPlacement` Prop](#tooltip-tooltippopover-enablecontrolledplacement-prop)
  - [Tooltip: TooltipPopover Default Values](#tooltip-tooltippopover-default-values)

## General Changes

### Dropped Support for PHP 7.4

The PHP 7.4 is no longer supported. The minimum required PHP version is 8.1.

### Required `id` Prop in Form Components

The `id` prop is now consistently required by all form components.

Affected components:

- Checkbox
- HelperText
- Radio
- Select
- ValidationText

#### Migration Guide

Add the `id` prop to the listed form components.

### Placement in Dropdown and Tooltip

The Dropdown and Tooltip components now support only flow-relative cross-axis placements.

New [placement naming][dictionary-placement]:

1. The main placement axis (top, right, bottom, left) remains the same.
2. The cross axis (formerly also top, right, bottom, left) is now relative to the main axis: start, end.

#### Migration Guide

See [Dropdown: Placement Control](#dropdown-placement-control) and [Tooltip: Placement Control](#tooltip-placement-control)
for more details.

## Component Changes

### Alert: `danger` Icon

The `danger` icon for `danger` color in the Alert component is now required.

#### Migration Guide

Either install newer version of the _spirit-icons_ package, or add an icon named `danger` to your project's icons.

### Alert: `role="alert"`

The `role="alert"` was removed from the default setting of the component.

As explained in the [ARIA: alert role][alert-role-documentation] documentation:

> The alert role is used to communicate an important and usually time-sensitive message to the user. When this role is
> added to an element, the browser will send out an accessible alert event to assistive technology products which can
> then notify the user. The alert role should only be used for information that requires the user's immediate attention,
> which is typically content that is dynamically displayed (such as form validation message etc.), not for content that
> appears on page load. It should not be used on HTML that the user hasn't interacted with.

#### Migration Guide

In case you need to use the component as an information that requires the user's immediate attention, you can use
`role="alert"` as an [additional attribute][readme-additional-attributes].

### Breadcrumbs: `goBackTitle` Prop

The `goBackTitle` prop is now required by the Breadcrumbs component.

#### Migration Guide

Add the `goBackTitle` prop to the Breadcrumbs component.

### Dropdown: New Structure

The Dropdown component structure changed and Dropdown (formerly the optional DropdownWrapper) is now a mandatory
wrapping component. Similarly, Dropdown (the popover itself) was renamed to DropdownPopover.

#### Migration Guide

1. Rename the DropdownWrapper component to Dropdown.
2. Rename the Dropdown component to DropdownPopover.

### Dropdown: `id` Prop

The `id` prop is now required by the Dropdown component.

#### Migration Guide

Add the `id` prop to the Dropdown component.

### Dropdown: Placement Control

The Dropdown component now supports only [flow-relative cross-axis placements](#placement-in-dropdown-and-tooltip).

#### Migration Guide

Update cross-axis names in the placement prop:

- `<Dropdown placement="top-left" … />` → `<Dropdown placement="top-start" … />`
- `<Dropdown placement="top-right" … />` → `<Dropdown placement="top-end" … />`
- `<Dropdown placement="right-top" … />` → `<Dropdown placement="right-start" … />`
- `<Dropdown placement="right-bottom" … />` → `<Dropdown placement="right-end" … />`
- `<Dropdown placement="bottom-left" … />` → `<Dropdown placement="bottom-start" … />`
- `<Dropdown placement="bottom-right" … />` → `<Dropdown placement="bottom-end" … />`
- `<Dropdown placement="left-top" … />` → `<Dropdown placement="left-start" … />`
- `<Dropdown placement="left-bottom" … />` → `<Dropdown placement="left-end" … />`

### Grid: Breakpoint Props

The `cols` prop in the `Grid` now supports object values for different breakpoints.
The `tablet` and `desktop` props were removed.

#### Migration Guide

Replace `tablet` and `desktop` props with the `cols` object prop.

- `<Grid cols="2" tablet="3" … />` → `<Grid cols={{ mobile: 2, tablet: 3 }} … />`
- `<Grid desktop="3" … />` → `<Grid cols={{ desktop: 3 }} … />`
- `<Grid cols="1" tablet="2" desktop="3" … />` → `<Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }} … />`

### Grid: GridSpan Component

The GridSpan component was removed. Instead, you can use the more powerful GridItem component that allows you to define
the start and end columns for each breakpoint.

#### Migration Guide

The hardest part in the migration is to get the `columnStart` value. The equation is `1 + (columns - over) / 2`,
where `columns` is the number of columns in the grid and `over` is the value from the GridSpan component.
The default number of columns is 12, so the equation is `1 + (12 - over) / 2` most of the time.

1. Replace `GridSpan` with `GridItem`.
2. Calculate and set the `columnStart` value `1 + (columns - over) / 2`, in our 12-column grid, the equation is `1 + (12 - over) / 2`, where `over` is the value from the GridSpan component.
3. Set the `columnEnd` value to `span over` or use `columnStart + over`.
4. If you use responsive props, calculate the values for each breakpoint and pass them to the GridItem component `columnStart` and `columnEnd` props as an object.
5. Remove the `over` prop.

##### Examples

- Centered grid item over 4 columns:
  ```diff
  -<GridSpan over="4">…</GridSpan>
  +<GridItem columnStart="5" columnEnd="span 4">…</GridItem>
  ```
  `columnStart` = 1 + (12 - 4) / 2 = 5
- Centered grid item over 6 columns:
  ```diff
  -<GridSpan over="6">…</GridSpan>
  +<GridItem columnStart="4" columnEnd="span 6">…</GridItem>
  ```
  `columnStart` = 1 + (12 - 6) / 2 = 4
- Responsive grid item centered over 8 columns on mobile, 6 columns on tablet, and 4 columns on desktop:
  ```diff
  -<GridSpan over="8" tablet="6" desktop="4">…</GridSpan>
  +<GridItem
  +  columnStart="{{ { mobile: 3, tablet: 4, desktop: 5 } }}"
  +  columnEnd="{{ { mobile: 'span 8', tablet: 'span 6', desktop: 'span 4' } }}"
  +>…</GridItem>
  ```
  - `columnStart` = 1 + (12 - 8) / 2 = 3
  - `columnStart` = 1 + (12 - 6) / 2 = 4
  - `columnStart` = 1 + (12 - 4) / 2 = 5

### Header: Abstracts Class and Style

The `style` and `class` props were removed from these Header abstracts:

- `Header/_abstracts/Button`
- `Header/_abstracts/Element`
- `Header/_abstracts/Link`

Use `UNSAFE_style` and `UNSAFE_className` instead.

#### Migration Guide

Replace `style` with `UNSAFE_style` and `class` with `UNSAFE_className`.

### Header: HeaderDesktopActions `isAtEnd` prop

The HeaderDesktopActions component slots were simplified and the second slot alignment is now available by using the
`isAtEnd` prop.

The HeaderDesktopActions `color` prop was removed.

#### Migration Guide

Use the HeaderDesktopActions component with the `isAtEnd` prop instead of the `color="secondary"` prop.
Remove the `color` prop from the HeaderDesktopActions component.

- `<HeaderDesktopActions color="secondary" … />` → `<HeaderDesktopActions isAtEnd … />`
- `<HeaderDesktopActions color="primary" … />` → `<HeaderDesktopActions … />`

### Modal: ModalDialog `isScrollable` Prop

The default value of the `isScrollable` prop is now set to `false` and the ModalDialog is non-scrollable by default.
It is possible to re-enable the inside scrolling by adding the `isScrollable` prop.

#### Migration Guide

Add `isScrollable` prop to the ModalDialog component.

If you use ScrollView for scrolling the content of your modal, you must also make the ModalDialog scrollable by setting
the `isScrollable` prop.

### Modal: ModalDialog Custom Height

The `preferredHeightOnMobile` and `preferredHeightFromTabletUp` props were removed and replaced with a single `height`
prop which accepts either a single value or object with breakpoint keys and values.

Also, the prop `maxHeightFromTabletUp` was removed and replaced with the `maxHeight` prop, which also accepts either a
single value or an object with breakpoint keys and values.

#### Migration Guide

Update the `preferredHeightOnMobile` and `preferredHeightFromTabletUp` props to the new `height` prop:

- `<ModalDialog preferredHeightOnMobile="333px" … />` → `<ModalDialog height="333px" … />`
- `<ModalDialog preferredHeightFromTabletUp="444px" … />` → `<ModalDialog height="{{ { tablet: '444px' } }}" … />`
- `<ModalDialog preferredHeightOnMobile="333px" preferredHeightFromTabletUp="444px" … />` → `<ModalDialog height="{{ { mobile: '333px', tablet: '444px' } }}" … />`

Update the `maxHeightFromTabletUp` prop to the new `maxHeight` prop:

- `<ModalDialog maxHeightFromTabletUp="555px" … />` → `<ModalDialog maxHeight="{{ { tablet: '555px' } }}" … />`

### Modal: ModalDialog Uniform Appearance

The uniform ModalDialog appearance replaced the current behavior. Current mobile appearance remains accessible via the
`isDockedOnMobile` property.

#### Migration Guide

Add the `isDockedOnMobile` prop to the ModalDialog component.

### Tabs: TabLink `target` Prop

The `target` prop was renamed to `targetPaneId` in the TabLink component.

The reason for this change is to avoid confusion with the [`target` attribute][mdn-anchor-target] of the anchor tag.

#### Migration Guide

Replace `target` with `targetPaneId` in the TabLink component.

### Tooltip: New Structure

The Tooltip component structure changed and Tooltip (formerly the optional TooltipWrapper) is now a mandatory
wrapping component. Similarly, Tooltip (the tip itself) was renamed to TooltipPopover.

#### Migration Guide

Instead of:

```twig
<TooltipWrapper>
  <Link href="#" aria-describedby="my-tooltip">
    I have a tooltip
  </Link>
  <Tooltip id="my-tooltip">
    Hello there!
  </Tooltip>
</TooltipWrapper>
```

Use:

```twig
<Tooltip>
  <a
    href="#"
    data-spirit-toggle="tooltip"
    data-spirit-target="my-tooltip"
    aria-describedby="my-tooltip"
  >
    I have a tooltip
  </a>
  <TooltipPopover id="my-tooltip">
    Hello there!
  </TooltipPopover>
</Tooltip>
```

👉 See [Tooltip documentation][tooltip-readme] for more details and examples.

### Tooltip: Hidden By Default

The TooltipPopover component is now hidden by default. Use the `isOpen` prop to show the Tooltip on initial render.

#### Migration Guide

Use `isOpen` prop in TooltipPopover instead of `UNSAFE_className="is-hidden"` for setting whether it should be opened or
closed on initial render.

Instead of:

```twig
<Tooltip>
  <a
    href="#"
    data-spirit-toggle="tooltip"
    data-spirit-target="my-tooltip"
    aria-describedby="my-tooltip"
  >
    I have a tooltip
  </a>
  <TooltipPopover id="my-tooltip" UNSAFE_className="is-hidden">
    Hello there!
  </TooltipPopover>
</Tooltip>
```

Use:

```twig
<Tooltip>
  <a
    href="#"
    data-spirit-toggle="tooltip"
    data-spirit-target="my-tooltip"
    aria-describedby="my-tooltip"
  >
    I have a tooltip
  </a>
  <TooltipPopover id="my-tooltip">
    Hello there!
  </TooltipPopover>
</Tooltip>
```

👉 See [Tooltip documentation][tooltip-readme] for more details and examples.

### Tooltip: Placement Control

The Tooltip component now supports only [flow-relative cross-axis placements](#placement-in-dropdown-and-tooltip)
controlled via the `data-spirit-placement` attribute.

#### Migration Guide

Update cross-axis names in the placement prop:

- `<Tooltip placement="top-left" … />` → `<Tooltip placement="top-start" … />`
- `<Tooltip placement="top-right" … />` → `<Tooltip placement="top-end" … />`
- `<Tooltip placement="right-top" … />` → `<Tooltip placement="right-start" … />`
- `<Tooltip placement="right-bottom" … />` → `<Tooltip placement="right-end" … />`
- `<Tooltip placement="bottom-left" … />` → `<Tooltip placement="bottom-start" … />`
- `<Tooltip placement="bottom-right" … />` → `<Tooltip placement="bottom-end" … />`
- `<Tooltip placement="left-top" … />` → `<Tooltip placement="left-start" … />`
- `<Tooltip placement="left-bottom" … />` → `<Tooltip placement="left-end" … />`

### Tooltip: TooltipPopover `enableControlledPlacement` Prop

Tooltip now has a different API and uses the [Floating UI][floating-ui] library. That's because we found out that
most users want the advanced positioning options anyway.

As a result, the `enableControlledPlacement` prop is no longer mandatory for the TooltipPopover component, as all
Tooltips now are controlled by Floating UI.

#### Migration Guide

Instead of:

```twig
<Tooltip>
  <a
    href="#"
    data-spirit-toggle="tooltip"
    data-spirit-target="my-tooltip"
    aria-describedby="my-tooltip"
  >
    I have a tooltip
  </a>
  <TooltipPopover
    id="my-tooltip"
    enableControlledPlacement
  >
    Hello there!
  </TooltipPopover>
<Tooltip>
```

Use:

```twig
<Tooltip>
  <a
    href="#"
    data-spirit-toggle="tooltip"
    data-spirit-target="my-tooltip"
    aria-describedby="my-tooltip"
  >
    I have a tooltip
  </a>
  <TooltipPopover
    id="my-tooltip"
  >
    Hello there!
  </TooltipPopover>
<Tooltip>
```

👉 See [Tooltip documentation][tooltip-readme] for more details and examples.

### Tooltip: TooltipPopover Default Values

Tooltip props `enableFlipping`, `enableFlippingCrossAxis`, `enableShifting`, and `enableSizing` are now turned on by
default. You can turn them off by setting them to `false`.

👉 See [Tooltip documentation][tooltip-readme] for more details and examples.

---

Please refer back to this guide or reach out to our team if you encounter any issues during migration.

[migration-guide-web]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/web/migration-v2.md
[alert-role-documentation]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role
[dictionary-placement]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#placement
[mdn-anchor-target]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-twig/README.md#additional-attributes
[tooltip-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-twig/src/Resources/components/Tooltip/README.md
[floating-ui]: https://floating-ui.com
