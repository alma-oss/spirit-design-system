# Icon

## Basic Usage

```html
<svg class="Icon" width="24" height="24">
  <use xlink:href="/assets/icons/svg/sprite.svg#info" />
</svg>
```

## Color

You can change the icon color by using the CSS class name `Icon--{color}`.  
Available colors include `text`, `emotion`, and `accent` colors.

- `Icon--primary`
- `Icon--secondary`
- `Icon--tertiary`
- `Icon--danger`
- `Icon--informative`
- `Icon--success`
- `Icon--warning`
- `Icon--{accent-color-name}`

```html
<svg class="Icon Icon--success" width="24" height="24">
  <use xlink:href="/assets/icons/svg/sprite.svg#shield-dualtone" />
</svg>
```

## Responsive Size

Use CSS custom properties to define the `size` of the icon.

- `--spirit-icon-size: number{px};`
- `--spirit-icon-size-tablet: number{px}`
- `--spirit-icon-size-desktop: number{px}`

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
    --spirit-icon-size: 20px;
    --spirit-icon-size-tablet: 30px;
    --spirit-icon-size-desktop: 40px;
  "
>
  <use xlink:href="/assets/icons/svg/sprite.svg#info" />
</svg>
```
