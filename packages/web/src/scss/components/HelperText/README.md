# HelperText

HelperText is a component used to display helper text for form field components.

## Basic Usage

```html
<div>
  <label for="text-field-helper-text" class="Label">Label</label>
  <div class="InputContainer InputContainer--fill InputContainer--medium">
    <input type="text" id="text-field-helper-text" name="helperText" placeholder="Placeholder" />
  </div>
  <div class="HelperText">Helper text</div>
</div>
```

### Radio and Checkbox

Place HelperText inside the **Radio** or **Checkbox** text area:

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
    <div class="HelperText" id="radio-helper-text-helper-text">Helper text</div>
  </div>
</div>

<!-- Checkbox -->
<div class="Flex Flex--horizontal Flex--inline my-500" style="--flex-spacing-x: var(--spirit-space-500);">
  <input
    type="checkbox"
    id="checkbox-helper-text"
    class="Checkbox"
    name="example"
    aria-describedby="checkbox-helper-text-helper-text"
  />
  <div>
    <label class="Label Label--inline" for="checkbox-helper-text">Checkbox Label</label>
    <div class="HelperText" id="checkbox-helper-text-helper-text">Helper text</div>
  </div>
</div>
```

### Item

Place HelperText inside `Item__content`, including in Checkbox/Radio item variants (`Checkbox--item`, `Radio--item`):

```html
<button type="button" class="Item">
  <span class="Item__content" role="presentation">
    <span class="Label Label--item">Item label</span>
    <span class="HelperText">Helper text</span>
  </span>
</button>
```

## Disabled State

Use the `HelperText--disabled` modifier class for disabled helper text. Add it whenever the associated form control is disabled.

```html
<div>
  <label for="text-field-disabled" class="Label Label--disabled">Label</label>
  <div class="InputContainer InputContainer--fill InputContainer--medium InputContainer--disabled">
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
  <div class="InputContainer InputContainer--fill InputContainer--medium">
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
