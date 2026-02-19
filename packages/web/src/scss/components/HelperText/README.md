# HelperText

HelperText is a component used to display helper text for form field components like TextField, TextArea, Checkbox, Radio, Toggle, Select, Slider, FieldGroup, Item, and FileUploader.

## Basic Usage

```html
<div class="TextField TextField--medium">
  <label for="text-field-helper-text" class="TextField__label">Label</label>
  <input type="text" id="text-field-helper-text" class="TextField__input" name="helperText" placeholder="Placeholder" />
  <div class="HelperText">Helper text</div>
</div>
```

## With Form Field Components

HelperText can be used with various form field components:

### TextField

```html
<div class="TextField TextField--medium">
  <label for="text-field-helper-text" class="TextField__label">Label</label>
  <input type="text" id="text-field-helper-text" class="TextField__input" name="helperText" placeholder="Placeholder" />
  <div class="HelperText">Helper text</div>
</div>
```

### TextArea

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-helper-text" class="TextArea__label">Label</label>
  <textarea id="text-area-helper-text" class="TextArea__input" name="helperText" placeholder="Placeholder"></textarea>
  <div class="HelperText">Helper text</div>
</div>
```

### Checkbox

```html
<div class="Checkbox Checkbox--inputPositionStart">
  <input
    type="checkbox"
    id="checkbox-helper-text"
    class="Checkbox__input"
    name="helperText"
    aria-describedby="checkbox-helper-text-helper-text"
  />
  <div class="Checkbox__text">
    <label class="Checkbox__label" for="checkbox-helper-text">Checkbox Label</label>
    <div class="HelperText" id="checkbox-helper-text-helper-text">Helper text</div>
  </div>
</div>
```

### Radio

```html
<div class="Radio Radio--inputPositionStart">
  <input
    type="radio"
    id="radio-helper-text"
    class="Radio__input"
    name="helperText"
    aria-describedby="radio-helper-text-helper-text"
  />
  <div class="Radio__text">
    <label class="Radio__label" for="radio-helper-text">Radio Label</label>
    <div class="HelperText" id="radio-helper-text-helper-text">Helper text</div>
  </div>
</div>
```

### Toggle

```html
<div class="Toggle Toggle--inputPositionEnd">
  <div class="Toggle__text">
    <label class="Toggle__label" for="toggle-helper-text">Toggle Label</label>
    <div class="HelperText" id="toggle-helper-text-helper-text">Helper text</div>
  </div>
  <input
    type="checkbox"
    id="toggle-helper-text"
    class="Toggle__input"
    name="default"
    aria-describedby="toggle-helper-text-helper-text"
  />
</div>
```

### Select

```html
<div class="Select Select--medium">
  <label for="select-helper-text" class="Select__label">Label</label>
  <div class="Select__inputContainer">
    <select id="select-helper-text" name="helperText" class="Select__input">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
    <div class="Select__icon">
      <svg width="20" height="20" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#chevron-down" />
      </svg>
    </div>
  </div>
  <div class="HelperText">Helper text</div>
</div>
```

### Slider

```html
<div class="Slider">
  <label for="slider-helper-text" class="Slider__label">Slider</label>
  <input
    class="Slider__input"
    id="slider-helper-text"
    aria-describedby="slider-helper-text-helper-text"
    type="range"
    value="30"
  />
  <div class="HelperText" id="slider-helper-text-helper-text">Helper text</div>
</div>
```

### FieldGroup

```html
<fieldset class="FieldGroup" aria-describedby="field-group-helper-text">
  <legend class="accessibility-hidden">Label</legend>
  <div class="FieldGroup__label" aria-hidden="true">Label</div>
  <div class="FieldGroup__fields">
    <!-- Form fields... -->
  </div>
  <div class="HelperText" id="field-group-helper-text">Helper text</div>
</fieldset>
```

### Item

```html
<button type="button" class="Item">
  <span class="Item__label">Item label</span>
  <span class="HelperText">Helper text</span>
</button>
```

## Disabled State

HelperText automatically applies disabled styling when it's inside a disabled parent component. The disabled state is handled automatically for:

- Components with `--disabled` modifier class (e.g., `TextField--disabled`)
- Components with `.is-disabled` class
- Elements with `[disabled]` attribute (e.g., `<fieldset disabled>`)

```html
<!-- Disabled TextField -->
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
  <div class="HelperText">Helper text</div>
</div>

<!-- Disabled FieldGroup -->
<fieldset class="FieldGroup" disabled>
  <legend class="accessibility-hidden">Label</legend>
  <div class="FieldGroup__label" aria-hidden="true">Label</div>
  <div class="FieldGroup__fields">
    <!-- Form fields... -->
  </div>
  <div class="HelperText">Helper text</div>
</fieldset>
```

You can also explicitly apply the disabled state using the `HelperText--disabled` modifier class:

```html
<div class="HelperText HelperText--disabled">Helper text</div>
```

## Accessibility

When using HelperText with form inputs, associate it with the input using the `aria-describedby` attribute:

```html
<div class="TextField TextField--medium">
  <label for="text-field-helper-text" class="TextField__label">Label</label>
  <input
    type="text"
    id="text-field-helper-text"
    class="TextField__input"
    name="helperText"
    placeholder="Placeholder"
    aria-describedby="text-field-helper-text-helper-text"
  />
  <div class="HelperText" id="text-field-helper-text-helper-text">Helper text</div>
</div>
```

## Element Types

HelperText can be used with different HTML elements. By default, it uses a `<div>` element, but it can also be used as a `<span>` for inline contexts:

```html
<!-- Default: div element -->
<div class="HelperText">Helper text</div>

<!-- Span element for inline contexts (e.g., Item component) -->
<span class="HelperText">Helper text</span>
```

## Integration with Form Components

HelperText is designed to work seamlessly with form field components. When used within form components, it automatically:

- Applies appropriate spacing and typography
- Inherits disabled state from parent components
- Maintains proper visual hierarchy

## CSS Classes

| Class                   | Description                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| `.HelperText`           | Base class for helper text                                                                                 |
| `.HelperText--disabled` | Disabled state modifier (optional, as disabled state is automatically applied when inside disabled parent) |
