# Matrix

The Matrix component distributes nested components in equal columns and allows
their content to be aligned. It's especially useful for multiple stacked layouts
where content needs to be organized in a uniform grid pattern.

## Glossary

For the purpose of this documentation, we use the following terms:

- **line:** a single row of content, for example, a single row of
  [`Stack`][stack] components
- **row:** [CSS grid rows][mdn-grid-row]

## Basic Usage

By default, the Matrix component creates a [grid-based][mdn-grid] layout with
even columns:

```html
<div class="Matrix">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

As you may have noticed, you can achieve the same result for a single row with
our [Grid][grid] component. Let's take a look at a better example.

## Aligning Nested Components

To really unlock the power of the Matrix layout, use it with **nested components
that use single-column [CSS grid layout][mdn-grid]**. For example, you can use
Matrix to align multiple [Stack][stack] layouts:

```html
<div class="Matrix">
  <div class="Stack Stack--hasSpacing">
    <div>Stack 1</div>
    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.</div>
    <div>Lorem ipsum</div>
  </div>
  <div class="Stack Stack--hasSpacing">
    <div>Stack 2</div>
    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.</div>
  </div>
  <div class="Stack Stack--hasSpacing">
    <div>Stack 3</div>
    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.</div>
    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.</div>
  </div>
</div>
```

### Compatible Components

As of now, the following components are compatible with the Matrix layout:

- [PricingPlan][pricing-plan]
- [Stack][stack]

👉 Use Matrix with multiple [Pricing Plan][pricing-plan] components to create
aligned, easy-to-read pricing overviews.

## Customization

By default, Matrix creates a 3-column grid with 100 rows (safe enough!),
a standard column gap, and a zero row gap.

ℹ️ The reason for the zero-row-gap default is that you don't need to specify the
number of item rows, which is necessary for the [CSS subgrid][mdn-subgrid] to
work (see [Implementation Notes](#implementation-notes)). With the zero-row gap,
the unused rows automatically collapse. Vertical spacing is then handled by the
nested components which can set their own row gap in the grid.

Matrix allows customization of columns, rows, item rows, column gap, and row gap
through CSS variables:

- `--spirit-matrix-item-rows`
- `--spirit-matrix-columns`
- `--spirit-matrix-rows`
- `--spirit-matrix-spacing-x`
- `--spirit-matrix-spacing-y`

Furthermore, all values can be set for each breakpoint independently.
For example:

- `--spirit-matrix-item-rows-tablet` (yes, you can specify the number of your
  content lines for each breakpoint!)
- `--spirit-matrix-columns-tablet`
- `--spirit-matrix-rows-tablet`
- … etc.

👉 This section covers the customization of single-line Matrix layouts.
For responsive multi-line layouts, see the
[Responsive Matrix](#responsive-matrix) section.

### Custom Columns

Adjust the number of columns in your Matrix:

```html
<div class="Matrix" style="--spirit-matrix-columns: 4;">
  <!-- Content items -->
</div>
```

### Custom Horizontal Spacing

Customize the spacing between columns:

```html
<div class="Matrix" style="--spirit-matrix-spacing-x: var(--spirit-space-1000);">
  <!-- Content items -->
</div>
```

Responsive configuration:

```html
<div
  class="Matrix"
  style="--spirit-matrix-spacing-x: var(--spirit-space-1000); --spirit-matrix-spacing-x-tablet: var(--spirit-space-1200);"
>
  <!-- Content items -->
</div>
```

## Scrollable Matrix

For comparison layouts like pricing overviews, we recommend using Matrix wrapped
in a horizontal [Scroll View][scroll-view] to create scrollable content on all
breakpoints.

```html
<div class="d-grid">
  <div class="ScrollView ScrollView--horizontal" data-spirit-toggle="scrollView" data-spirit-direction="horizontal">
    <div class="ScrollView__viewport" data-spirit-element="viewport" tabindex="0">
      <div class="ScrollView__content" data-spirit-element="content">
        <div class="Matrix">
          <!-- Content items -->
        </div>
      </div>
    </div>
    <div class="ScrollView__overflowDecorators ScrollView__overflowDecorators--shadows" aria-hidden="true"></div>
  </div>
</div>
```

👉 Head over to the [ScrollView documentation][scroll-view] to see how to
achieve edge-to-edge horizontal scrolling.

## Responsive Matrix

Using the Matrix layout for a single line of content is very straightforward.
However, for multi-line layouts, things can get a bit more complicated.
You need to set the number of Matrix rows `--spirit-matrix-rows` explicitly for
each breakpoint, depending on the number of Matrix item rows
`--spirit-matrix-item-rows` and the number of Matrix items per line.

This is a complex example that demonstrates how to create a 2-by-2 Matrix layout
for tablets and larger screens, with a single column of content on mobile:

```html
<div
  class="Matrix"
  style="
    --my-items-count: 4; /* Custom CSS variable to make the example more comprehensible. */

    --spirit-matrix-item-rows: 3;
    --spirit-matrix-columns: 1;
    --spirit-matrix-columns-tablet: 2;
    --spirit-matrix-rows: calc(var(--spirit-matrix-item-rows) * var(--my-items-count) / var(--spirit-matrix-columns));
    --spirit-matrix-rows-tablet: calc(var(--spirit-matrix-item-rows) * var(--my-items-count) / var(--spirit-matrix-columns-tablet));
    --spirit-matrix-spacing-x-tablet: var(--spirit-space-1200);
  "
>
  <!-- Content items -->
</div>
```

⚠️ For multi-line Matrix layouts, the number of item rows
`--spirit-matrix-item-rows` must be set explicitly. This is required by the
[`subgrid`][mdn-subgrid] feature.

⚠️ Be careful when adding margin to Matrix items. It is a known issue that
adding a top margin to an item causes a [rendering bug][jira-pricing-safari-bug]
in Safari.

### Custom Vertical Spacing

By default, Matrix creates a zero-row gap, which is probably what you want for
single-line layouts because the unused Matrix rows automatically collapse.

For multi-line layouts, the number of Matrix rows must be explicitly set.
Collapsing of empty Matrix rows is not expected, so you can use a non-zero row
gap to provide vertical spacing between the lines of your Matrix content:

```html
<div
  class="Matrix"
  style="
    --spirit-matrix-spacing-y: var(--spirit-space-1200);
    /* my Matrix configuration… */
  "
>
  <!-- Content items -->
</div>
```

ℹ️ You can still adjust the vertical spacing of your content items by overriding
their `row-gap` CSS property.

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

[grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Grid/README.md
[pricing-plan]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/PricingPlan/README.md
[scroll-view]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/ScrollView/README.md#horizontal-scrolling
[stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Stack/README.md
[jira-pricing-safari-bug]: https://jira.almacareer.tech/browse/DS-2051
[mdn-grid]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
[mdn-grid-row]: https://developer.mozilla.org/en-US/docs/Glossary/Grid_Row
[mdn-subgrid]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid
