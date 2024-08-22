# Grid

Use Grid to build multiple column layouts. This Grid works on twelve column system, and it contains variants of 12, 6, 4, 3, 2, and 1 column for each [breakpoint][dictionary-breakpoint].

**Custom layout**

```tsx
<Grid cols={{ mobile: 2, tablet: 3, desktop: 4 }}>
  <span>col 1</span>
  <span>col 2</span>
  <span>col 3</span>
  <span>col 4</span>
  <span>col 5</span>
  <span>col 6</span>
</Grid>
```

## Custom Spacing

You can use the `spacing` prop to apply custom spacing between items in both horizontal and vertical directions. The prop
accepts either a spacing token (for example `space-100`) or an object with breakpoint keys and spacing token values.

You can set custom spacing in the horizontal (x-axis) and vertical (y-axis) direction separately using the `spacingX` and `spacingY` props.

Custom spacing:

```tsx
<Grid spacing="space-1200">
  <!-- Grid content -->
</Grid>
```

Custom responsive spacing:

```tsx
<Grid spacing={{ mobile: 'space-400', tablet: 'space-800' }}>
  <!-- Grid content -->
</Grid>
```

Custom horizontal (x-axis) spacing:

```tsx
<Grid spacingX={{ mobile: 'space-400', tablet: 'space-800' }}>
  <!-- Grid content -->
</Grid>
```

Custom vertical (y-axis) spacing:

```tsx
<Grid spacingY={{ mobile: 'space-400', tablet: 'space-800' }}>
  <!-- Grid content -->
</Grid>
```

## Item Alignment

The `alignmentX` and `alignmentY` props are used to control the alignment of items within the `Grid` container.
The available values for these properties can be found in our [alignment dictionary][alignment-dictionary].

`alignmentX`: Manages horizontal alignment, allowing you to position items to the left, center, or right of the container. It can also be configured with responsive values for different breakpoints.
`alignmentY`: Manages vertical alignment, enabling you to position items at the top, center, or bottom of the container. It supports responsive values for various breakpoints as well.

Both props can be set using either fixed values or objects with breakpoint-specific settings to ensure the alignment adapts across different screen sizes.

Horizontal alignment:

```tsx
<Grid alignmentX="left">
  <!-- Grid content -->
</Grid>
```

Horizontal and vertical alignment:

```tsx
<Grid alignmentX="left" alignmentY="top">
  <!-- Grid content -->
</Grid>
```

Responsive horizontal and vertical alignment:

```tsx
<Grid
  alignmentX={{ mobile: 'left', tablet: 'center', desktop: 'right' }}
  alignmentY={{ mobile: 'top', tablet: 'center', desktop: 'bottom' }}
>
  <!-- Grid content -->
</Grid>
```

👉 Please note that the `stretch` option may have undesired impact on elements with a defined size or aspect ratio. The dimensions (or the ratio) will not be respected by `Grid` and the element will be stretched just like any other item.

## API

| Name          | Type                                                                 | Default   | Required | Description                                                                                                                             |
| ------------- | -------------------------------------------------------------------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `alignmentX`  | \[[AlignmentXExtended dictionary][alignment-dictionary] \| `object`] | `stretch` | ✕        | Apply horizontal alignment of items, use object to set responsive values, e.g. `{ mobile: 'left', tablet: 'center', desktop: 'right' }` |
| `alignmentY`  | \[[AlignmentYExtended dictionary][alignment-dictionary] \| `object`] | `stretch` | ✕        | Apply vertical alignment of items, use object to set responsive values, e.g. `{ mobile: 'top', tablet: 'center', desktop: 'bottom' }`   |
| `cols`        | \[`1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `12` \| `object`]        | —         | ✕        | Number of columns to use, use object to set responsive values, e.g. `{ mobile: 1, tablet: 2, desktop: 3 }`                              |
| `elementType` | HTML element                                                         | `div`     | ✕        | Element type to use for the Grid                                                                                                        |
| `spacing`     | \[`SpaceToken` \| `Responsive<SpaceToken>`]                          | —         | ✕        | Apply [custom spacing](#custom-spacing) in both horizontal and vertical directions between items                                        |
| `spacingX`    | \[`SpaceToken` \| `Responsive<SpaceToken>`]                          | —         | ✕        | Apply horizontal [custom spacing](#custom-spacing) between items                                                                        |
| `spacingY`    | \[`SpaceToken` \| `Responsive<SpaceToken>`]                          | —         | ✕        | Apply vertical [custom spacing](#custom-spacing) between items                                                                          |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

For detailed information see [Grid][grid] component.

## GridItem

Grid Item is a wrapper for Grid items. It allows you to configure your Grid structure
as you wish. Use props to set a column and rows where the Grid Item should start or end.
Numeric values are used as a coordinates in the grid.

To set how to item should span over columns or rows, set the value as `span X`
where X is the number of columns or rows the item should span, like this `columnStart="span 2"`
or `rowEnd="span 3"`. Span could be used with responsive props as well and for both start and end.
To understand how to use `span` read one of many articles about CSS Grid,
for example [CSS Grid Layout: The Span Keyword][digitalocean-span].

To set a layout with repetitive columns, you can set this on the `Grid`
component itself using the [`cols` prop](#api) and might not need to set columns on the items. For example, an article
listing with 3 columns is easier to set using `cols="3"` on the `Grid` component than setting
`columnStart` and `columnEnd` on each `GridItem`.

### Grid Placement Props: `columnStart`, `columnEnd`, `rowStart`, `rowEnd`

These props control the placement of grid items within a CSS Grid layout by specifying where the item starts and ends in rows and columns:

- `columnStart`: Specifies the vertical grid line where the item begins.
- `columnEnd`: Specifies the vertical grid line where the item ends. The item spans up to, but does not include, this grid line. For example, if columnEnd is "3", the item ends at the line before the third column.
- `rowStart`: Specifies the horizontal grid line where the item begins.
- `rowEnd`: Specifies the horizontal grid line where the item ends. The item spans up to, but does not include, this grid line. For example, if rowEnd is "4", the item ends at the line before the fourth row.

#### Grid Placement Example

```tsx
<GridItem
  columnStart={2}
  columnEnd={5} // or columnEnd="span 3"
  rowStart={1}
  rowEnd={3} // or rowEnd="span 2"
>
  …
</GridItem>
```

<img src="https://raw.githubusercontent.com/lmc-eu/spirit-design-system/refs/heads/main/packages/web-react/src/components/Grid/static/GridExample.svg" alt="Grid example" width="400" />

<!--lint ignore no-emphasis-as-heading-->

_The image is taken from the [CSS Grid Layout Guide][css-tricks-grid]._

These props align with their respective CSS Grid properties, providing precise control over grid item placement. Learn more in the [MDN CSS Grid][grid-mdn] documentation.

Basic example usage:

```tsx
<Grid>
  <GridItem columnStart={1} columnEnd={4}>
    1–4
  </GridItem>
  <GridItem columnStart={5} columnEnd={9}>
    5–9
  </GridItem>
  <GridItem columnStart={10} columnEnd="span 2" rowStart={2}>
    10–12
  </GridItem>
</Grid>
```

### Responsive Example Usage

Pass an object to props to set different values for different breakpoints. The values will
be applied from mobile to desktop and if not set for a breakpoint, the value from the
previous breakpoint will be used.

```tsx
<Grid elementType="ul">
  <GridItem elementType="li" columnStart={1} columnEnd={4}>
    1–4
  </GridItem>
  <GridItem elementType="li" columnStart={5} columnEnd={{ mobile: 8, tablet: 9 }}>
    5–9 (5–8 on mobile)
  </GridItem>
  <GridItem elementType="li" columnStart={{ mobile: 9, tablet: 10 }} columnEnd={{ mobile: 'span 3', tablet: 'span 2' }}>
    10–12 (9–12 on mobile)
  </GridItem>
</Grid>
```

### Content and Sidebar Layout

The most common use of `GridItem` placement is a main content column with a sidebar next to it.

Basic content and sidebar:

```tsx
<Grid>
  <GridItem columnStart={1} columnEnd={10}>
    Content
  </GridItem>
  <GridItem columnStart={11} columnEnd="span 2">
    Sidebar
  </GridItem>
</Grid>
```

👉 `columnEnd` is a grid line, not a column, so `columnEnd={10}` covers columns 1–9. Column 10 is left empty on
purpose to create a gap between the content and the sidebar. To have no gap, start the sidebar on the same line
where the content ends (e.g. `columnStart={10}`).

Content and sidebar with responsive columns:

```tsx
<Grid>
  <GridItem columnStart={1} columnEnd={{ mobile: 5, tablet: 9 }}>
    Content
  </GridItem>
  <GridItem columnStart={{ mobile: 10, tablet: 11 }} columnEnd={{ mobile: 'span 3', tablet: 'span 2' }}>
    Sidebar
  </GridItem>
</Grid>
```

Nested Grids with GridItems:

```tsx
<Grid>
  <GridItem columnStart={1} columnEnd={10}>
    <Grid>
      <GridItem columnStart={1} columnEnd="span 4">
        First Nested Content
      </GridItem>
      <GridItem columnStart={5} columnEnd="span 4">
        Second Nested Content
      </GridItem>
    </Grid>
  </GridItem>
  <GridItem columnStart={11} columnEnd="span 2">
    Sidebar
  </GridItem>
</Grid>
```

Every nested `Grid` has 12 columns if not specified otherwise, and the placement props of nested
`GridItem`s are independent of their parents.

Sidebar moved to the second row on desktop:

```tsx
<Grid>
  <GridItem columnStart={1} columnEnd={8}>
    Content
  </GridItem>
  <GridItem columnStart={9} columnEnd="span 4" rowStart={{ desktop: 2 }}>
    Sidebar
  </GridItem>
</Grid>
```

#### Sidebar First in Source Order

Placement props let you show the items in a different order than they appear in the DOM. In the following
example, the sidebar comes first in the source, so it stacks above the content on mobile and tablet,
while on desktop it is placed on the right side of the content. Setting `rowStart` on both items keeps
them on the same row on desktop.

```tsx
<Grid>
  <GridItem
    columnStart={{ mobile: 1, desktop: 9 }}
    columnEnd={{ mobile: 'span 12', desktop: 'span 4' }}
    rowStart={{ desktop: 1 }}
  >
    Sidebar
  </GridItem>
  <GridItem columnStart={1} columnEnd={{ mobile: 'span 12', desktop: 9 }} rowStart={{ desktop: 1 }}>
    Content
  </GridItem>
</Grid>
```

👉 Reordering items visually does not change the reading or focus order. Please read the
[Accessibility](#accessibility) section before using this pattern.

### API

| Name          | Type                                  | Default | Required | Description                        |
| ------------- | ------------------------------------- | ------- | -------- | ---------------------------------- |
| `elementType` | `string`                              | `div`   | ✕        | HTML tag to render                 |
| `columnEnd`   | \[`number` \| `span \d+` \| `object`] | `null`  | ✕        | Column where the item should end   |
| `columnStart` | \[`number` \| `span \d+` \| `object`] | `null`  | ✕        | Column where the item should start |
| `rowEnd`      | \[`number` \| `span \d+` \| `object`] | `null`  | ✕        | Row where the item should end      |
| `rowStart`    | \[`number` \| `span \d+` \| `object`] | `null`  | ✕        | Row where the item should start    |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Accessibility

`Grid` and `GridItem` are layout components and do not add any semantics. Use the `elementType` prop to render
meaningful elements (e.g. `ul` and `li` for lists, `aside` for a sidebar) where it fits the content.

### Source Order and Visual Order

The `columnStart`, `columnEnd`, `rowStart`, and `rowEnd` props only change where an item is displayed. They do not
change its position in the DOM, which is what determines:

- the reading order for screen readers,
- the keyboard focus (<kbd>Tab</kbd>) order,
- the stacking order on breakpoints where the items span the full width and use automatic row placement.

When the visual order differs from the source order, keyboard and screen reader users experience the page in a different
sequence than sighted mouse users. For example, in the [sidebar first](#sidebar-first-in-source-order) layout, keyboard
focus moves through the sidebar first, even though it is displayed on the right side of the content on desktop.

To keep the layout accessible (see WCAG [1.3.2 Meaningful Sequence][wcag-meaningful-sequence] and
[2.4.3 Focus Order][wcag-focus-order]):

- Prefer a DOM order that matches the logical reading order and use placement props to adjust the layout only.
- Reorder items visually only when both orders make sense, e.g. a sidebar with a summary that is relevant before the
  main content.
- Do not use positive `tabindex` values to fix the focus order.
- Test the layout with the keyboard on all breakpoints.

[alignment-dictionary]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#alignment
[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[css-tricks-grid]: https://css-tricks.com/snippets/css/complete-guide-grid/
[digitalocean-span]: https://www.digitalocean.com/community/tutorials/css-css-grid-layout-span-keyword
[grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Grid/README.md
[grid-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[wcag-focus-order]: https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html
[wcag-meaningful-sequence]: https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html
