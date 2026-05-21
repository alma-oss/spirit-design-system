# HelperText

HelperText is a component used to display helper text for form field components.

## Basic Usage

```html
<div>
  <label for="text-field-helper-text" class="Label">Label</label>
  <div class="InputContainer InputContainer--medium">
    <input type="text" id="text-field-helper-text" name="helperText" placeholder="Placeholder" />
  </div>
  <div class="HelperText">Helper text</div>
</div>
```

### Inline (Radio, Checkbox)

Use the `HelperText--inline` modifier when HelperText is inside a **Radio** or **Checkbox** (non-item variant). It creates a stacking context so the helper text sits above the stretched label, keeping the text selectable and links clickable.

```html
<!-- Radio -->
<div class="Radio Radio--inputPositionStart">
  <input
    type="radio"
    id="radio-helper-text"
    class="Radio__input"
    name="example"
    aria-describedby="radio-helper-text-helper-text"
  />
  <div class="Radio__text">
    <label class="Radio__label" for="radio-helper-text">Radio Label</label>
    <div class="HelperText HelperText--inline" id="radio-helper-text-helper-text">Helper text</div>
  </div>
</div>

<!-- Checkbox -->
<div class="Checkbox Checkbox--inputPositionStart">
  <input
    type="checkbox"
    id="checkbox-helper-text"
    class="Checkbox__input"
    name="example"
    aria-describedby="checkbox-helper-text-helper-text"
  />
  <div class="Checkbox__text">
    <label class="Checkbox__label" for="checkbox-helper-text">Checkbox Label</label>
    <div class="HelperText HelperText--inline" id="checkbox-helper-text-helper-text">Helper text</div>
  </div>
</div>
```

Do not use `HelperText--inline` for the item variant; use `HelperText--item` there instead.

### Item

Use the `HelperText--item` modifier when HelperText is inside an Item or inside a Checkbox/Radio with the item variant (`Checkbox--item`, `Radio--item`):

```html
<button type="button" class="Item">
  <span class="Item__label">Item label</span>
  <span class="HelperText HelperText--item">Helper text</span>
</button>
```

## Disabled State

Use the `HelperText--disabled` modifier class for disabled helper text. Add it whenever the associated form control is disabled.

```html
<div>
  <label for="text-field-disabled" class="Label Label--disabled">Label</label>
  <div class="InputContainer InputContainer--medium InputContainer--disabled">
    <input type="text" id="text-field-disabled" name="disabled" placeholder="Placeholder" disabled />
  </div>
  <div class="HelperText HelperText--disabled">Helper text</div>
</div>
```

## Accessibility

When using HelperText with form inputs, associate it with the input using the `aria-describedby` attribute:

```html
<div>
  <label for="text-field-helper-text" class="Label">Label</label>
  <div class="InputContainer InputContainer--medium">
    <input
      type="text"
      id="text-field-helper-text"
      name="helperText"
      placeholder="Placeholder"
      aria-describedby="text-field-helper-text-helper-text"
    />
  </div>
  <div class="HelperText" id="text-field-helper-text-helper-text">Helper text</div>
</div>
```
