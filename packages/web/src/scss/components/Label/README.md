# Label

Label is a standalone component for form field labels with consistent styling across all form components.

## Variants

The Label component has three variants:

### Box Variant

Used for box field components like [TextField][textfield], [TextArea][textarea], [Select][select], [Slider][slider], and [FileUploader][fileuploader], where the label is typically placed above the input.

```html
<label for="example-field" class="Label Label--box">Label Text</label>
```

### Inline Variant

Used for inline field components like [Checkbox][checkbox], [Radio][radio], and [Toggle][toggle], where the label is typically placed next to the input.

```html
<label for="example-field" class="Label Label--inline">Label Text</label>
```

### Item Variant

Used for standalone [Item][item] components (button, link, div with `.Item` class).

```html
<span class="Label Label--item">Item label</span>
```

For Checkbox or Radio with the `--item` modifier, combine both inline and item variants:

```html
<label for="example-field" class="Label Label--inline Label--item">Label Text</label>
```

## Modifiers

### Required

Adds an asterisk (\*) after the label text to indicate a required field.

```html
<label for="example-field" class="Label Label--box Label--required">Label Text</label>
```

### Hidden

Visually hides the label while keeping it accessible to screen readers.

```html
<label for="example-field" class="Label Label--box accessibility-hidden">Label Text</label>
```

### Disabled

Applies disabled styling to the label.

```html
<label for="example-field" class="Label Label--box Label--disabled">Label Text</label>
```

## Examples

### Box Field Label

```html
<div class="TextField">
  <label for="text-field" class="Label Label--box">Label</label>
  <input type="text" id="text-field" class="TextField__input" />
</div>
```

### Box Field Label with Required Indicator

```html
<div class="TextField">
  <label for="text-field-required" class="Label Label--box Label--required">Label</label>
  <input type="text" id="text-field-required" class="TextField__input" required />
</div>
```

### Inline Field Label

```html
<div class="Checkbox">
  <input type="checkbox" id="checkbox" class="Checkbox__input" />
  <div class="Checkbox__text">
    <label class="Label Label--inline" for="checkbox">Checkbox Label</label>
  </div>
</div>
```

### Inline Field Label with Item Modifier

```html
<div class="Checkbox Checkbox--item">
  <input type="checkbox" id="checkbox-item" class="Checkbox__input" />
  <div class="Checkbox__text">
    <label class="Label Label--inline Label--item" for="checkbox-item">Checkbox Label</label>
  </div>
</div>
```

### Item Label

```html
<button type="button" class="Item">
  <span class="Label Label--item">Item label</span>
</button>
```

### Disabled Label

```html
<div class="TextField TextField--disabled">
  <label for="text-field-disabled" class="Label Label--box Label--disabled">Label</label>
  <input type="text" id="text-field-disabled" class="TextField__input" disabled />
</div>
```

[checkbox]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Checkbox/README.md
[fileuploader]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/FileUploader/README.md
[item]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Item/README.md
[radio]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Radio/README.md
[select]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Select/README.md
[slider]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Slider/README.md
[textarea]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/TextArea/README.md
[textfield]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/TextField/README.md
[toggle]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Toggle/README.md
