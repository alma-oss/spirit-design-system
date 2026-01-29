# Stack

Stack is a component that allows you to compose elements vertically.

👉 Vertical margin of items inside Stack is reset to zero to ensure proper spacing between items. Read more about spacing in the [Variants](#variants) section.

## Basic Usage

Usage with form fields:

```html
<div class="Stack Stack--hasSpacing">
  <div class="TextField TextField--medium">
    <label for="textfield-stack-1" class="TextField__label TextField__label--required">Label</label>
    <input type="text" id="textfield-stack-1" class="TextField__input" placeholder="Placeholder" />
  </div>
  <div class="TextField TextField--medium">
    <label for="textfield-stack-2" class="TextField__label TextField__label--required">Label</label>
    <input type="text" id="textfield-stack-2" class="TextField__input" placeholder="Placeholder" />
  </div>
</div>
```

Usage with a list:

```html
<ul class="Stack">
  <li>
    <div>Block 1</div>
  </li>
  <li>
    <div>Block 2</div>
  </li>
  <li>
    <div>Block 3</div>
  </li>
</ul>
```

## Variants

⚠ `Stack--hasSpacing` with dividers uses the CSS `padding` property to be able to create dividers using the `border` property.
It is recommended to wrap the direct descendants of the `Stack` component to the proper HTML element.
Otherwise, the applied spacing via vertical padding could break the visual view of the children's items.

`Stack--hasSpacing` without dividers uses the CSS `gap` property.

### Spacing Between Items

👉 The vertical spacing between items is applied via `Stack--hasSpacing`. The size corresponds with the value of the design token `$space-600`.
In case you need another spacing, please use utility classes or add custom-defined styles to the direct descendants.
Keep in mind, that spacing is applied by the `gap` property or by `padding` property in case of dividers.

Usage with spacing:

```html
<ul class="Stack Stack--hasSpacing">
  <li>
    <div>Block 1</div>
  </li>
  <li>
    <div>Block 2</div>
  </li>
  <li>
    <div>Block 3</div>
  </li>
</ul>
```

### Dividers Between Items

👉 When using dividers, it is required to wrap the item's content with the `StackItem` class.

Usage with middle dividers:

```html
<ul class="Stack Stack--hasIntermediateDividers">
  <li class="StackItem">
    <div>Block 1</div>
  </li>
  <li class="StackItem">
    <div>Block 2</div>
  </li>
  <li class="StackItem">
    <div>Block 3</div>
  </li>
</ul>
```

Usage with inner and outer dividers:

```html
<ul class="Stack Stack--hasIntermediateDividers Stack--hasStartDivider Stack--hasEndDivider">
  <li class="StackItem">
    <div>Block 1</div>
  </li>
  <li class="StackItem">
    <div>Block 2</div>
  </li>
  <li class="StackItem">
    <div>Block 3</div>
  </li>
</ul>
```

## Advanced Usage

Usage with combination of spacing and dividers:

```html
<ul class="Stack Stack--hasSpacing Stack--hasIntermediateDividers Stack--hasStartDivider Stack--hasEndDivider">
  <li class="StackItem">
    <div>Block 1</div>
  </li>
  <li class="StackItem">
    <div>Block 2</div>
  </li>
  <li class="StackItem">
    <div>Block 3</div>
  </li>
</ul>
```

## Custom Spacing

Use CSS custom properties to define custom spacing between items in `Stack--hasSpacing`. Set the `--stack-spacing`
property to one of spacing token values defined on the `:root` element, e.g. `--stack-spacing: var(--spirit-space-800)`.
This will set the spacing to `var(--spirit-space-800)` for all breakpoints.

```html
<ul class="Stack Stack--hasSpacing" style="--stack-spacing: var(--spirit-space-1200)">
  <li>
    <div>Block 1</div>
  </li>
  <li>
    <div>Block 2</div>
  </li>
  <li>
    <div>Block 3</div>
  </li>
</ul>
```

ℹ️ We highly discourage you from using absolute values like `--stack-spacing: 1rem`. It will work, but you will lose
the consistency between the spacing and the design tokens.

If you need to set custom spacing from a specific [breakpoint][dictionary-breakpoint], use the `--stack-spacing-{breakpoint}` property,
e.g. `--stack-spacing-tablet: var(--spirit-space-800)`. The breakpoint value must be one of the breakpoint tokens
except for the `mobile` breakpoint you don't need the suffix at all. The spacing is set to all larger breakpoints
automatically if you don't set them explicitly. E.g. if you set only `--stack-spacing-tablet: var(--spirit-space-800)`
the spacing will be set to `var(--spirit-space-800)` for `tablet` and `desktop` breakpoints while on the `mobile`
breakpoint the default spacing will be used.

Custom spacing from tablet up:

```html
<ul class="Stack Stack--hasSpacing" style="--stack-spacing-tablet: var(--spirit-space-1200)">
  <li>
    <div>Block 1</div>
  </li>
  <li>
    <div>Block 2</div>
  </li>
  <li>
    <div>Block 3</div>
  </li>
</ul>
```

Custom spacing for each breakpoint:

```html
<ul
  class="Stack Stack--hasSpacing"
  style="--stack-spacing: var(--spirit-space-800); --stack-spacing-tablet: var(--spirit-space-1000); --stack-spacing-desktop: var(--spirit-space-1200)"
>
  <li>
    <div>Block 1</div>
  </li>
  <li>
    <div>Block 2</div>
  </li>
  <li>
    <div>Block 3</div>
  </li>
</ul>
```

Custom spacing works with dividers too.

```html
<ul
  class="Stack Stack--hasSpacing Stack--hasIntermediateDividers Stack--hasStartDivider Stack--hasEndDivider"
  style="--stack-spacing: var(--spirit-space-800)"
>
  <li class="StackItem">
    <div>Block 1</div>
  </li>
  <li class="StackItem">
    <div>Block 2</div>
  </li>
  <li class="StackItem">
    <div>Block 3</div>
  </li>
</ul>
```

[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
