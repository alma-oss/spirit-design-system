# Grid

Single column on all [breakpoints][dictionary-breakpoint]:

```html
<div class="Grid Grid--cols-1 Grid--alignmentXStretch Grid--alignmentYStretch">
  <span>col 1</span>
  <span>col 2</span>
  <span>col 3</span>
  <span>col 4</span>
  …
</div>
```

Multiple columns on all breakpoints:

```html
<div class="Grid Grid--cols-2 Grid--alignmentXStretch Grid--alignmentYStretch">
  <span>col 1</span>
  …
</div>
<div class="Grid Grid--cols-3 Grid--alignmentXStretch Grid--alignmentYStretch">
  <span>col 1</span>
  …
</div>
<div class="Grid Grid--cols-4 Grid--alignmentXStretch Grid--alignmentYStretch">
  <span>col 1</span>
  …
</div>
<div class="Grid Grid--cols-5 Grid--alignmentXStretch Grid--alignmentYStretch">
  <span>col 1</span>
  …
</div>
<div class="Grid Grid--cols-6 Grid--alignmentXStretch Grid--alignmentYStretch">
  <span>col 1</span>
  …
</div>
<div class="Grid Grid--cols-12 Grid--alignmentXStretch Grid--alignmentYStretch">
  <span>col 1</span>
  …
</div>
```

Responsive columns:

```html
<div
  class="Grid Grid--cols-2 Grid--tablet--cols-3 Grid--desktop--cols-4 Grid--alignmentXStretch Grid--alignmentYStretch"
>
  <span>col 1</span>
  <span>col 2</span>
  <span>col 3</span>
  <span>col 4</span>
  <span>col 5</span>
  <span>col 6</span>
</div>
```

👉 Please note the 5-column modifier is not aligned with the underlying
12-column guides. This behavior is intentional as the 5-column grid serves to
equally distribute 5 items in a row.

## Custom Spacing

Use CSS custom properties to define custom gutters between items. Set the `--grid-spacing-x` or the `--grid-spacing-y`
property to one of spacing token values defined on the `:root` element, e.g. `--grid-spacing-y: var(--spirit-space-1200)`.
This will set the spacing between rows to `var(--spirit-space-1200)` for all breakpoints.

```html
<div class="Grid Grid--cols-2 Grid--tablet--cols-3 Grid--alignmentXStretch Grid--alignmentYStretch" style="--grid-spacing-y: var(--spirit-space-1200)">
  <span>col 1</span>
  <span>col 2</span>
  <span>col 3</span>
  <span>col 4</span>
  <span>col 5</span>
  <span>col 6</span>
</ul>
```

ℹ️ We highly discourage you from using absolute values like `--grid-spacing-y: 1rem`. It will work, but you will lose
the consistency between the spacing and the design tokens.

If you need to set custom spacing from a specific breakpoint, use the `--grid-spacing-x-{breakpoint}` or the `--grid-spacing-y-{breakpoint}` property,
e.g. `--grid-spacing-y-tablet: var(--spirit-space-900)`. The breakpoint value must be one of the breakpoint tokens
except for the `mobile` breakpoint where you don't need the suffix at all. The spacing is set to all larger breakpoints
automatically if you don't set them explicitly. E.g. if you set only `--grid-spacing-y-tablet: var(--spirit-space-900)`
the spacing will be set to `var(--spirit-space-900)` for `tablet` and `desktop` breakpoints while on the `mobile`
breakpoint the default spacing will be used.

Custom responsive spacing:

```html
<div
  class="Grid Grid--cols-2 Grid--tablet--cols-3 Grid--alignmentXStretch Grid--alignmentYStretch"
  style="--grid-spacing-x: var(--spirit-space-1000); --grid-spacing-y: var(--spirit-space-1000); --grid-spacing-x-tablet: var(--spirit-space-1100); --grid-spacing-y-tablet: var(--spirit-space-1100); --grid-spacing-x-desktop: var(--spirit-space-1200); --grid-spacing-y-desktop: var(--spirit-space-1200)"
>
  <span>col 1</span>
  <span>col 2</span>
  <span>col 3</span>
  <span>col 4</span>
  <span>col 5</span>
  <span>col 6</span>
</ul>
```

Custom vertical (y-axis) spacing from tablet up:

```html
<div class="Grid Grid--cols-2 Grid--tablet--cols-3 Grid--alignmentXStretch Grid--alignmentYStretch" style="--grid-spacing-y-tablet: var(--spirit-space-1200)">
  <span>col 1</span>
  <span>col 2</span>
  <span>col 3</span>
  <span>col 4</span>
  <span>col 5</span>
  <span>col 6</span>
</ul>
```

## Item Alignment

The `Grid--alignmentX*` and `Grid--alignmentY*` classes are used to control the alignment of items within a container.
The available values for these classes can be found in our [alignment dictionary][alignment-dictionary].

`Grid--alignmentX*`: Manages horizontal alignment, allowing you to position items to the left, center, or right of the container. It can also be configured with responsive values for different breakpoints.
`Grid--alignmentY*`: Manages vertical alignment, enabling you to position items at the top, center, or bottom of the container. It supports responsive values for various breakpoints as well.

Horizontal alignment:

```html
<div class="Grid Grid--alignmentXLeft">
  <!-- Grid content -->
</div>
```

Horizontal and Vertical alignment:

```html
<div class="Grid Grid--alignmentXLeft Grid--alignmentYTop">
  <!-- Grid content -->
</div>
```

Responsive Horizontal and Vertical alignment:

```html
<div
  class="
    Grid
    Grid--alignmentXLeft
    Grid--tablet--alignmentXCenter
    Grid--desktop--alignmentXRight
    Grid--alignmentYTop
    Grid--tablet--alignmentYCenter
    Grid--desktop--alignmentYBottom
  "
>
  <!-- Grid content -->
</div>
```

## Grid Item

Grid Item is a wrapper for Grid items. It allows you to configure your Grid structure
as you wish. Use CSS variables to set a column where the Grid Item should start or end.
If you want to set how to item should span, set the value as `span X` where X is the
number of columns the item should span, like this `--grid-item-column-start: span 2`.

These variables are available:

- `--grid-item-column-start`
- `--grid-item-column-end`

Add suffixes to these variables to set them for specific breakpoints:

- `--grid-item-column-start-tablet`
- `--grid-item-column-end-desktop`
- etc.

Mobile suffix is not needed as it is the default. If no breakpoint value is set for
current breakpoint, the previous breakpoint value will be used.

All nested Grid Items have their CSS variables firstly reset to the default values.
This allows you to nest Grids with Grid Items and set their column values independently.
Please note that every, even nested, Grid has 12 columns if not specified otherwise.

### Grid Placement Props: `--grid-item-column-start`, `--grid-item-column-end`, `--grid-item-row-start`, `--grid-item-row-end`

These props control the placement of grid items within a CSS Grid layout by specifying where the item starts and ends in rows and columns:

- `--grid-item-column-start`: Specifies the vertical grid line where the item begins.
- `--grid-item-column-end`: Specifies the vertical grid line where the item ends. The item spans up to, but does not include, this grid line. For example, if columnEnd is "3", the item ends at the line before the third column.
- `--grid-item-row-start`: Specifies the horizontal grid line where the item begins.
- `--grid-item-row-end`: Specifies the horizontal grid line where the item ends. The item spans up to, but does not include, this grid line. For example, if rowEnd is "4", the item ends at the line before the fourth row.

#### Grid Placement Example

```html
<div
  class="GridItem"
  style="
      --grid-item-column-start: 2;
      --grid-item-column-end: 5; <!-- or --grid-item-column-end: span 3; -->
      --grid-item-row-start: 1;
      --grid-item-row-end: 3; <!-- or --grid-item-row-end: span 2; -->
    "
>
  …
</div>
```

<img src="https://raw.githubusercontent.com/lmc-eu/spirit-design-system/refs/heads/main/packages/web-react/src/components/Grid/static/GridExample.svg" alt="Grid example" width="400" />

<!--lint ignore no-emphasis-as-heading-->

_The image is taken from the [CSS Grid Layout Guide][css-tricks-grid]._

Learn more about grid placement in the [MDN CSS Grid][grid-mdn] documentation.

Basic Grid Item example:

```html
<div class="Grid Grid--alignmentXStretch Grid--alignmentYStretch">
  <div
    class="GridItem"
    style="
      --grid-item-column-start: 1;
      --grid-item-column-end: 10;
    "
  >
    <div class="docs-Box docs-Box--small">Content</div>
  </div>
  <div
    class="GridItem"
    style="
      --grid-item-column-start: 11;
      --grid-item-column-end: span 2;
    "
  >
    <div class="docs-Box docs-Box--small">Sidebar</div>
  </div>
</div>
```

Example with responsive columns:

```html
<div class="Grid Grid--alignmentXStretch Grid--alignmentYStretch">
  <div
    class="GridItem"
    style="
      --grid-item-column-start: 1;
      --grid-item-column-end: 5;
      --grid-item-column-end-tablet: 9;
    "
  >
    <div class="docs-Box docs-Box--small">Content</div>
  </div>
  <div
    class="GridItem"
    style="
      --grid-item-column-start: 10;
      --grid-item-column-end: span 3;
      --grid-item-column-start-tablet: 11;
      --grid-item-column-end-tablet: span 2;
    "
  >
    <div class="docs-Box docs-Box--small">Sidebar</div>
  </div>
</div>
```

Nested Grids with Grid Items:

```html
<div class="Grid Grid--alignmentXStretch Grid--alignmentYStretch">
  <div
    class="GridItem"
    style="
      --grid-item-column-start: 1;
      --grid-item-column-end: 10;
    "
  >
    <div class="Grid Grid--alignmentXStretch Grid--alignmentYStretch">
      <div
        class="GridItem"
        style="
          --grid-item-column-start: 1;
          --grid-item-column-end: span 4;
        "
      >
        <div class="docs-Box docs-Box--small">First Nested Content</div>
      </div>
      <div
        class="GridItem"
        style="
          --grid-item-column-start: 5;
          --grid-item-column-end: span 4;
        "
      >
        <div class="docs-Box docs-Box--small">Second Nested Content</div>
      </div>
    </div>
  </div>
  <div
    class="GridItem"
    style="
      --grid-item-column-start: 11;
      --grid-item-column-end: span 2;
    "
  >
    <div class="docs-Box docs-Box--small">Sidebar</div>
  </div>
</div>
```

You can also set rows of the Grid Item. Use `--grid-item-row-start` and
`--grid-item-row-end` variables. These variables work the same as the column and breakpoint
variables.

```html
<div class="Grid Grid--alignmentXStretch Grid--alignmentYStretch">
  <div
    class="GridItem"
    style="
      --grid-item-column-start: 1;
      --grid-item-column-end: 8;
    "
  >
    <div class="docs-Box docs-Box--small">Content</div>
  </div>
  <div
    class="GridItem"
    style="
      --grid-item-column-start: 9;
      --grid-item-column-end: span 4;
      --grid-item-row-start-desktop: 2;
    "
  >
    <div class="docs-Box docs-Box--small">Sidebar</div>
  </div>
</div>
```

[alignment-dictionary]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#alignment
[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[css-tricks-grid]: https://css-tricks.com/snippets/css/complete-guide-grid/
[grid-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
