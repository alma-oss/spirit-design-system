# ValidationText

ValidationText is a standalone component for displaying validation messages in form fields with consistent styling.

## Basic Usage

```html
<div class="ValidationText ValidationText--danger">Danger validation text</div>
```

## Validation States

```html
<div class="ValidationText ValidationText--success">Success validation text</div>
<div class="ValidationText ValidationText--warning">Warning validation text</div>
<div class="ValidationText ValidationText--danger">Danger validation text</div>
```

## Validation Text with Icon

To render validation text with an icon, add an `<svg>` icon as the first child.

```html
<div class="ValidationText ValidationText--danger">
  <svg class="Icon" width="20" height="20" aria-hidden="true">
    <use xlink:href="/assets/icons/svg/sprite.svg#danger" />
  </svg>
  <div>Danger validation text with icon</div>
</div>
```

## Validation Texts as List

To render validation texts as a list, use `<ul>` element inside.

```html
<div class="ValidationText ValidationText--danger">
  <ul>
    <li>First validation text</li>
    <li>Second validation text</li>
  </ul>
</div>
```

## Validation Text with Icon and List

You can combine an icon with a list of validation texts.

```html
<div class="ValidationText ValidationText--danger">
  <svg class="Icon" width="20" height="20" aria-hidden="true">
    <use xlink:href="/assets/icons/svg/sprite.svg#danger" />
  </svg>
  <ul>
    <li>First validation text</li>
    <li>Second validation text</li>
  </ul>
</div>
```

## Disabled

Use the `ValidationText--disabled` modifier class when the associated form control is disabled.

```html
<div class="TextField TextField--medium TextField--disabled">
  <label for="text-field-disabled" class="TextField__label">Label</label>
  <input
    type="text"
    id="text-field-disabled"
    class="TextField__input"
    name="disabled"
    placeholder="Placeholder"
    disabled
  />
  <div class="ValidationText ValidationText--disabled ValidationText--danger">Danger validation text</div>
</div>
```

## Item Variant

Use the `ValidationText--item` modifier class when ValidationText is inside an Item variant (e.g., `Checkbox--item`, `Radio--item`).

```html
<button type="button" class="Item Item--danger">
  <span class="Item__label">Item Label</span>
  <span class="ValidationText ValidationText--item ValidationText--danger">Item validation text</span>
</button>
```

## Usage with Form Components

ValidationText works seamlessly with Spirit form components:

**Box Fields:**

- [FileUploader][file-uploader] — File upload control
- [TextArea][text-area] — Multi-line text input
- [TextField][text-field] — Text input field
- [Select][select] — Dropdown selection
- [Slider][slider] — Range slider control

**Inline Fields:**

- [Checkbox][checkbox] — Single checkbox (use with `ValidationText--inline` modifier)
- [Toggle][toggle] — Toggle switch (use with `ValidationText--inline` modifier)

**Field Groups:**

- [FieldGroup][field-group] — Group of related form fields

### Box Field (FileUploader, TextArea, TextField, Select, Slider)

```html
<div class="TextField TextField--medium TextField--danger">
  <label for="example" class="TextField__label">Label</label>
  <input type="text" id="example" class="TextField__input" placeholder="Placeholder" value="Filled" />
  <div class="ValidationText ValidationText--danger">Danger validation text</div>
</div>
```

### Inline Field (Checkbox and Toggle)

Use the `ValidationText--inline` modifier class when ValidationText is inside an inline field (Checkbox and Toggle).
It creates a stacking context so the validation text sits above the stretched label, keeping the text selectable and links clickable.

```html
<div class="Checkbox Checkbox--inputPositionStart Checkbox--danger">
  <input type="checkbox" id="example" class="Checkbox__input" name="example" />
  <div class="Checkbox__text">
    <label class="Label Label--inline" for="example">Checkbox Label</label>
    <div class="ValidationText ValidationText--danger ValidationText--inline">Danger validation text</div>
  </div>
</div>
```

### FieldGroup

```html
<fieldset class="FieldGroup FieldGroup--danger">
  <legend class="FieldGroup__label">Label</legend>
  <div class="FieldGroup__fields">
    <!-- fields here -->
  </div>
  <div class="ValidationText ValidationText--danger">Danger validation text</div>
</fieldset>
```

[checkbox]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Checkbox/README.md
[field-group]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/FieldGroup/README.md
[file-uploader]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/FileUploader/README.md
[select]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Select/README.md
[slider]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Slider/README.md
[text-area]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/TextArea/README.md
[text-field]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/TextField/README.md
[toggle]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Toggle/README.md
