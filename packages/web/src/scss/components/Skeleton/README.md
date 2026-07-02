# Skeleton

On the parent element, you must use `aria-busy` and `aria-live` attributes to indicate that the content inside is loading.
The `aria-busy` is set to `true` when the content is loading, and `aria-live` is set to `polite` to announce the loading
state to screen readers.

## Text

The `Skeleton--text` class is used to create a text skeleton.

- Number of lines is defined by the number of `Skeleton__item` elements
- Minimum number of lines is 1

```html
<div class="Skeleton Skeleton--text Skeleton--small">
  <div class="Skeleton__item" aria-hidden="true"></div>
  <div class="Skeleton__item" aria-hidden="true"></div>
</div>
```

## Heading

The `Skeleton--heading` class is used to create a heading skeleton.

```html
<div class="Skeleton Skeleton--heading Skeleton--small">
  <div class="Skeleton__item" aria-hidden="true"></div>
  <div class="Skeleton__item" aria-hidden="true"></div>
</div>
```

### Text, Heading Sizes

The Skeleton component supports the following sizes for text and heading skeletons:

- `Skeleton--xsmall`
- `Skeleton--small`
- `Skeleton--medium` (default)
- `Skeleton--large`
- `Skeleton--xlarge`

```html
<div class="Skeleton Skeleton--heading Skeleton--medium"></div>
```

## Shapes

Use CSS custom properties to define the width, height, and radius of the shape.

- The default radius is `--spirit-radius-300`

- `--spirit-skeleton-shape-width: number{rem};`
- `--spirit-skeleton-shape-height: number{rem};`
- `--spirit-skeleton-shape-radius: var(--spirit-radius-200);`
- `--spirit-skeleton-shape-radius-tablet: var(--spirit-radius-300);`
- `--spirit-skeleton-shape-radius-desktop: var(--spirit-radius-400);`

Always express shape dimensions in `rem` (not `px`). `rem` is relative to the root font size, so shapes:

- scale with the user's browser/OS font-size preference, which is essential for accessibility,
- stay visually proportional to the surrounding typography,
- follow the same scale as the rest of Spirit's design tokens (spacing, typography, sizing), which are all defined in `rem`.

Fixed `px` values ignore the user's root font-size setting and break this consistency.

```html
<div
  class="Skeleton Skeleton--shape"
  style="--spirit-skeleton-shape-width: 6.25rem; --spirit-skeleton-shape-height: 6.25rem; --spirit-skeleton-shape-radius: var(--spirit-radius-400)"
></div>
```

```html
<div
  class="Skeleton Skeleton--shape"
  style="--spirit-skeleton-shape-width: 6.25rem; --spirit-skeleton-shape-height: 6.25rem"
></div>
```

⚠️ Make sure that you have properly set up the `skeleton-gradient` token in your project. Without it, Skeleton will not be available.
