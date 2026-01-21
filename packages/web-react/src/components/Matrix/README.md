# Matrix

The Matrix component distributes nested components in equal columns and allows
their content to be aligned. It's especially useful for multiple stacked layouts
where content needs to be organized in a uniform grid pattern.

## Basic Usage

```jsx
<Matrix>{/* Content items */}</Matrix>
```

### Compatible Components

As of now, the following components are compatible with the Matrix layout:

- [Stack][stack]

## Custom Spacing

You can use the `spacing` prop to apply custom spacing between items in both horizontal and vertical directions. The prop
accepts either a spacing token (e.g. `space-100`) or an object with [breakpoint][dictionary-breakpoint] keys and spacing token values.

You can set custom spacing in the horizontal (x-axis) and vertical (y-axis) direction separately using the `spacingX` and `spacingY` props.

```jsx
<Matrix spacing="space-1200">{/* Content items */}</Matrix>
```

### Custom Responsive Spacing

```jsx
<Matrix spacing={{ mobile: 'space-400', tablet: 'space-800' }}>{/* Content items */}</Matrix>
```

### Custom Responsive Horizontal (x-Axis) Spacing

```jsx
<Matrix spacingX={{ mobile: 'space-400', tablet: 'space-800' }}>{/* Content items */}</Matrix>
```

### Custom Responsive Vertical (y-Axis) Spacing

```jsx
<Matrix spacingY={{ mobile: 'space-400', tablet: 'space-800' }}>{/* Content items */}</Matrix>
```

## Scrollable Matrix

For scrollable Matrix, you can use the `ScrollView` component to wrap the `Matrix` component. This allows the content to be scrolled horizontally.

```jsx
<ScrollView direction="horizontal">
  <Matrix>{/* Content items */}</Matrix>
</ScrollView>
```

## Responsive Matrix

To create a responsive Matrix, use the `cols` prop to define the number of columns for each breakpoint.
You need to explicitly set the `itemRows` prop to specify the number of items per row and the `rows` prop to define the number of Matrix rows for each breakpoint.

By default, the number of `rows` in the `Matrix` component is automatically calculated based on the `number of items`, `itemRows`, and `cols`. The formula used is `number of items * itemRows / cols`.

```jsx
<Matrix cols={{ mobile: 1, tablet: 2 }} itemRows={3}>
  {/* Content items */}
</Matrix>
```

However, you can also explicitly set the `rows` prop if you want to control the number of rows manually.

```jsx
<Matrix cols={{ mobile: 1, tablet: 2 }} itemRows={3} rows={{ mobile: 12, tablet: 6 }}>
  {/* Content items */}
</Matrix>
```

⚠️ For multi-line Matrix layouts, the number of item rows `itemRows` must be set explicitly. This is required by the [`subgrid`][mdn-subgrid] feature.

⚠️ Be careful when adding margin to Matrix items. It is a known issue that
adding a top margin to an item causes a [rendering bug][jira-pricing-safari-bug]
in Safari.

## Matrix Vs. Grid

The key difference of [Grid][grid] and Matrix is that Matrix is capable of
**aligning the content of nested components**. For this to work, the nested
components must use [CSS grid layout][mdn-grid] at the root level.

## Implementation Notes

- Matrix uses [CSS Grid][mdn-grid] and forces [`subgrid`][mdn-subgrid] for direct
  descendants.
- All direct descendants of Matrix span the Matrix layout vertically and
  inherit its grid rows and row gap.

## Accessibility

When using Matrix for content organization, ensure that the reading order makes
sense for screen reader users. This should be already guaranteed by the
implementation of the nested components.

## Known Limitations

As of now, only **single-column components** are supported in Matrix.

## API

| Name          | Type                                                          | Default     | Required | Description                                                                                                     |
| ------------- | ------------------------------------------------------------- | ----------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `cols`        | \[`1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `12` \| `object`] | `3`         | ✕        | Number of columns to use, use object to set responsive values, e.g. `{ mobile: 1, tablet: 2, desktop: 3 }`      |
| `elementType` | HTML element                                                  | `div`       | ✕        | Element type to use for the Matrix                                                                              |
| `itemRows`    | \[ `number` \| `object`]                                      | `100`       | ✕        | Number of items in row to use, use object to set responsive values, e.g. `{ mobile: 1, tablet: 2, desktop: 3 }` |
| `rows`        | \[ `number` \| `object`]                                      | `100`       | ✕        | Number of rows to use, use object to set responsive values, e.g. `{ mobile: 1, tablet: 2, desktop: 3 }`         |
| `spacing`     | \[`SpaceToken` \| `Responsive<SpaceToken>`]                   | —           | ✕        | Apply [custom spacing](#custom-spacing) in both horizontal and vertical directions between items                |
| `spacingX`    | \[`SpaceToken` \| `Responsive<SpaceToken>`]                   | `space-700` | ✕        | Apply horizontal [custom spacing](#custom-spacing) between items                                                |
| `spacingY`    | \[`SpaceToken` \| `Responsive<SpaceToken>`]                   | `space-0`   | ✕        | Apply vertical [custom spacing](#custom-spacing) between items                                                  |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Grid/README.md
[jira-pricing-safari-bug]: https://jira.almacareer.tech/browse/DS-2051
[mdn-grid]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
[mdn-subgrid]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Stack/README.md
