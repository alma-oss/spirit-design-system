# Icon

## Basic Usage

```html
<svg class="Icon" width="24" height="24" style="--spirit-icon-size: 1.5rem;">
  <use href="/assets/icons/svg/sprite.svg#info" />
</svg>
```

## Color

You can change the icon color by using the CSS class name `Icon--{color}`.
Available colors include `text`, `emotion`, `selected`, and `accent` colors.

- `Icon--primary`
- `Icon--secondary`
- `Icon--tertiary`
- `Icon--danger`
- `Icon--informative`
- `Icon--success`
- `Icon--warning`
- `Icon--selected`
- `Icon--{accent-color-name}`

```html
<svg class="Icon Icon--success" width="24" height="24">
  <use href="/assets/icons/svg/sprite.svg#shield-dualtone" />
</svg>
```

## Responsive Size

Use CSS custom properties to define the `size` of the icon.

- `--spirit-icon-size: number{rem};`
- `--spirit-icon-size-tablet: number{rem}`
- `--spirit-icon-size-desktop: number{rem}`

Always express icon sizes in `rem` (not `px`). `rem` is relative to the root font size, so icons:

- scale with the user's browser/OS font-size preference, which is essential for accessibility,
- stay visually proportional to the surrounding typography,
- follow the same scale as the rest of Spirit's design tokens (spacing, typography, sizing), which are all defined in `rem`.

Fixed `px` values ignore the user's root font-size setting and break this consistency.

For a single (non-responsive) size, use inline style with `--spirit-icon-size`.

```html
<svg class="Icon" width="24" height="24" style="--spirit-icon-size: 1.5rem;">
  <use href="/assets/icons/svg/sprite.svg#info" />
</svg>
```

The prefix `spirit-` is `css-variable-prefix` defined in the `design tokens` and can vary depending on the project.
Always refer to your project's design tokens for the correct prefix.

⚠️ To ensure responsive sizes work correctly, the icon must have the class `.Icon`.

The `width` and `height` attributes of the `<svg>` should correspond to the mobile breakpoint when using responsive sizes.
If only tablet or desktop is set, width and height is used for smaller breakpoints.

```html
<svg
  class="Icon"
  width="20"
  height="20"
  style="
    --spirit-icon-size: 1.25rem;
    --spirit-icon-size-tablet: 1.875rem;
    --spirit-icon-size-desktop: 2.5rem;
  "
>
  <use href="/assets/icons/svg/sprite.svg#info" />
</svg>
```
