# Label

Label is a standalone component for form field labels with consistent styling across all form components.

For components like [TextField][textfield], [TextArea][textarea], [Select][select], [Slider][slider], and [FileUploader][fileuploader], the label is typically placed above the input.

```html
<label for="example-field" class="Label">Label Text</label>
```

## Variants

The Label component has two other variants:

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
<label for="example-field" class="Label Label--required">Label Text</label>
```

### Hidden

Visually hides the label while keeping it accessible to screen readers.

```html
<label for="example-field" class="Label accessibility-hidden">Label Text</label>
```

### Disabled

Applies disabled styling to the label.

```html
<label for="example-field" class="Label Label--disabled">Label Text</label>
```

## Examples

### Box Field Label

```html
<div>
  <label for="text-field" class="Label">Label</label>
  <div class="InputContainer InputContainer--medium">
    <input type="text" id="text-field" />
  </div>
</div>
```

### Box Field Label with Required Indicator

```html
<div>
  <label for="text-field-required" class="Label Label--required">Label</label>
  <div class="InputContainer InputContainer--medium">
    <input type="text" id="text-field-required" required />
  </div>
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
<div>
  <label for="text-field-disabled" class="Label Label--disabled">Label</label>
  <div class="InputContainer InputContainer--medium InputContainer--disabled">
    <input type="text" id="text-field-disabled" disabled />
  </div>
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
