# Flex

Flex is a component that allows you to create a flexible one-dimensional layout.

## ⚠️ DEPRECATION NOTICE

CSS modifiers `Flex--row` and `Flex--column` are deprecated and will be removed in the next major release.
Use `Flex--horizontal` and `Flex--vertical` CSS modifiers instead.

## Basic Usage

Horizontal layout:

```html
<div class="Flex Flex--horizontal Flex--noWrap Flex--alignmentXStretch Flex--alignmentYStretch">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

Horizontal reversed layout:

```html
<div class="Flex Flex--horizontalReversed Flex--noWrap Flex--alignmentXStretch Flex--alignmentYStretch">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

Vertical layout:

```html
<div class="Flex Flex--vertical Flex--noWrap Flex--alignmentXStretch Flex--alignmentYStretch">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

Usage with a list:

```html
<ul class="Flex Flex--vertical Flex--noWrap Flex--alignmentXStretch Flex--alignmentYStretch">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

ℹ️ For the row layout, the Flex component uses the [`display: flex`][mdn-display-flex] CSS property. For the column
layout, [`display: grid`][mdn-display-grid] is used because of technical advantages: better overflow control or
alignment API consistency.

## Responsive Direction

To create a responsive layout, use the `tablet` and `desktop` infixes, e.g. `Flex--tablet--horizontal` or `Flex--desktop--vertical`.

```html
<div class="Flex Flex--vertical Flex--tablet--horizontal Flex--noWrap Flex--alignmentXStretch Flex--alignmentYStretch">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Wrapping

By default, Flex items will not wrap (the `Flex--noWrap` modifier). To enable wrapping on all breakpoints, use the
`Flex--wrap` modifier class instead.

```html
<div class="Flex Flex--horizontal Flex--wrap Flex--alignmentXStretch Flex--alignmentYStretch">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Responsive Wrapping

To create a responsive layout, use the `tablet` and `desktop` infixes, e.g. `Flex--tablet--wrap` or `Flex--desktop--wrap`.

```html
<div
  class="
    Flex
    Flex--horizontal
    Flex--wrap
    Flex--tablet--noWrap
    Flex--desktop--wrap
    Flex--alignmentXStretch
    Flex--alignmentYStretch
  "
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Alignment

### Horizontal Alignment

Flex can be horizontally aligned as stretched (default), or justified to the left, center, or right. Additionally, you
can evenly distribute the items using the space-between value. These values come from the extended
[alignmentX dictionary][dictionary-alignment]. Using a corresponding modifier class will align the Flex items accordingly:

- `Flex--alignmentXStretch` (default)
- `Flex--alignmentXLeft`
- `Flex--alignmentXCenter`
- `Flex--alignmentXRight`
- `Flex--alignmentXSpaceBetween`

### Vertical Alignment

Similarly to the horizontal alignment, Flex can be vertically aligned as stretched (default), or justified to the top,
center, or bottom. There is also an option to align the items to the baseline. These values come from the extended
[alignmentY dictionary][dictionary-alignment]. Using a corresponding modifier class will align the Flex items accordingly:

- `Flex--alignmentYStretch` (default)
- `Flex--alignmentYTop`
- `Flex--alignmentYCenter`
- `Flex--alignmentYBottom`
- `Flex--alignmentYBaseline`

Example:

```html
<div class="Flex Flex--horizontal Flex--noWrap Flex--alignmentXRight Flex--alignmentYBaseline">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Responsive Alignment

To create a responsive layout, use the `tablet` and `desktop` infixes, e.g. `Flex--tablet--alignmentXRight` or
`Flex--desktop--alignmentYBaseline`.

Example:

```html
<div
  class="
    Flex
    Flex--horizontal
    Flex--noWrap
    Flex--alignmentXLeft
    Flex--alignmentYStretch
    Flex--tablet--alignmentXSpaceBetween
    Flex--tablet--alignmentYBaseline
  "
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Custom Spacing

Use CSS custom properties to define custom spacing between items. Set the `--flex-spacing-x` or the `--flex-spacing-y`
property to one of the spacing token values defined on the `:root` element, e.g. `--flex-spacing-x: var(--spirit-space-800)`.
This will set the spacing to `var(--spirit-space-800)` for all breakpoints.

```html
<div
  class="Flex Flex--horizontal Flex--noWrap Flex--alignmentXStretch Flex--alignmentYStretch"
  style="--flex-spacing-x: var(--spirit-space-1200)"
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

ℹ️ We highly discourage from using absolute values like `--flex-spacing-x: 1rem`. It will work, but you will lose
the consistency between the spacing and the design tokens.

If you need to set custom spacing from a specific [breakpoint][dictionary-breakpoint], use the `--flex-spacing-x-{breakpoint}` or the `--flex-spacing-y-{breakpoint}`
property, e.g. `--flex-spacing-x-tablet: var(--spirit-space-800)`. The breakpoint value must be one of the breakpoint tokens
except for the `mobile` breakpoint you don't need the suffix at all. The spacing is set to all larger breakpoints
automatically if you don't set them explicitly. E.g. if you set only `--flex-spacing-x-tablet: var(--spirit-space-800)`
the spacing will be set to `var(--spirit-space-800)` for `tablet` and `desktop` breakpoints while on the `mobile`
breakpoint the default spacing will be used.

Custom spacing from tablet up:

```html
<div
  class="Flex Flex--horizontal Flex--noWrap Flex--alignmentXStretch Flex--alignmentYStretch"
  style="--flex-spacing-x-tablet: var(--spirit-space-1200)"
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

Custom spacing for each breakpoint:

```html
<div
  class="Flex Flex--horizontal Flex--noWrap Flex--alignmentXStretch Flex--alignmentYStretch"
  style="--flex-spacing-x: var(--spirit-space-800); --flex-spacing-y: var(--spirit-space-1000); --flex-spacing-x-tablet: var(--spirit-space-1000); --flex-spacing-y-tablet: var(--spirit-space-1000); --flex-spacing-x-desktop: var(--spirit-space-1200); --flex-spacing-y-desktop: var(--spirit-space-1200)"
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[mdn-display-flex]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout
[mdn-display-grid]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#alignment
