# Label

Label is a standalone component for form field labels with consistent styling across all form components.

## ⚠️ DEPRECATION NOTICE

The implicit `medium` typography applied by a bare `.Label` class will be removed in the next major version.
Always add an explicit size modifier.

[What are deprecations?][readme-deprecations]

### Migration Guide

Add `Label--medium` where Label currently relies on the implicit default:

```html
<!-- Before -->
<label for="example-field" class="Label">Label Text</label>

<!-- After -->
<label for="example-field" class="Label Label--medium">Label Text</label>
```

For components like [TextField][textfield], [TextArea][textarea], [Select][select], [Slider][slider], and [FileUploader][fileuploader], the label is typically placed above the input.

```html
<label for="example-field" class="Label Label--medium">Label Text</label>
```

## Sizes

Label supports `xsmall`, `small`, `medium`, `large`, and `xlarge` sizes. Use `medium` as the default size.

```html
<span class="Label Label--xsmall">XSmall</span>
<span class="Label Label--small">Small</span>
<span class="Label Label--medium">Medium (default)</span>
<span class="Label Label--large">Large</span>
<span class="Label Label--xlarge">XLarge</span>
```

## Variants

The Label component has two other variants:

### Inline Variant

Used for inline field components like [Checkbox][checkbox], [Radio][radio], and [Toggle][toggle], where the label is typically placed next to the input. Add the `cursor-pointer` helper class to show a pointer cursor.

```html
<label for="example-field" class="Label Label--medium cursor-pointer">Label Text</label>
```

### Item Variant

Used for standalone [Item][item] components (button, link, div with `.Item` class).

```html
<span class="Label Label--medium element-stretched">Item label</span>
```

For Checkbox or Radio in item mode, use the item variant with the `element-stretched` helper class:

```html
<label for="example-field" class="Label Label--medium element-stretched">Label Text</label>
```

## Modifiers

### Required

Adds an asterisk (\*) after the label text to indicate a required field.

```html
<label for="example-field" class="Label Label--medium Label--required">Label Text</label>
```

### Hidden

Visually hides the label while keeping it accessible to screen readers.

```html
<label for="example-field" class="Label Label--medium accessibility-hidden">Label Text</label>
```

### Disabled

Applies disabled styling to the label.

```html
<label for="example-field" class="Label Label--medium Label--disabled">Label Text</label>
```

## Examples

### Box Field Label

```html
<div>
  <label for="text-field" class="Label Label--medium">Label</label>
  <div class="InputContainer InputContainer--fill InputContainer--medium">
    <input type="text" id="text-field" />
  </div>
</div>
```

### Box Field Label with Required Indicator

```html
<div>
  <label for="text-field-required" class="Label Label--medium Label--required">Label</label>
  <div class="InputContainer InputContainer--fill InputContainer--medium">
    <input type="text" id="text-field-required" required />
  </div>
</div>
```

### Inline Field Label

```html
<div class="Flex Flex--horizontal Flex--inline py-500" style="--flex-spacing-x: var(--spirit-space-500);">
  <input type="checkbox" id="checkbox" class="Checkbox" />
  <div>
    <label class="Label Label--medium cursor-pointer" for="checkbox">Checkbox Label</label>
  </div>
</div>
```

### Inline Field Label with Item Modifier

```html
<div class="Item">
  <div class="Item__slot" role="presentation">
    <input type="checkbox" id="checkbox-item" class="Checkbox Checkbox--item" />
  </div>
  <div class="Item__content" role="presentation">
    <label class="Label Label--medium element-stretched" for="checkbox-item">Checkbox Label</label>
  </div>
</div>
```

### Item Label

```html
<button type="button" class="Item">
  <span class="Item__content" role="presentation">
    <span class="Label Label--medium element-stretched">Item label</span>
  </span>
</button>
```

### Disabled Label

```html
<div>
  <label for="text-field-disabled" class="Label Label--medium Label--disabled">Label</label>
  <div class="InputContainer InputContainer--fill InputContainer--medium InputContainer--disabled">
    <input type="text" id="text-field-disabled" disabled />
  </div>
</div>
```

[checkbox]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Checkbox/README.md
[fileuploader]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/FileUploader/README.md
[item]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Item/README.md
[radio]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Radio/README.md
[readme-deprecations]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md#deprecations
[select]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Select/README.md
[slider]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Slider/README.md
[textarea]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/TextArea/README.md
[textfield]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/TextField/README.md
[toggle]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Toggle/README.md
