# Radio

## Basic Usage

Radio buttons should be wrapped in a [FieldGroup][field-group] when used as a group:

```html
<fieldset class="border-0">
  <legend class="accessibility-hidden">Choose an option</legend>
  <div class="FieldGroup__label" aria-hidden="true">Choose an option</div>
  <div class="Flex Flex--vertical Flex--alignmentXLeft" style="--flex-spacing-y: var(--spirit-space-500);">
    <div class="Flex Flex--horizontal Flex--inline" style="--flex-spacing-x: var(--spirit-space-500);">
      <input type="radio" id="radio-default" class="Radio" name="default" />
      <div>
        <label class="Label Label--inline" for="radio-default">Radio Label</label>
      </div>
    </div>
  </div>
</fieldset>
```

For a single Radio button example:

```html
<div class="Flex Flex--horizontal Flex--inline" style="--flex-spacing-x: var(--spirit-space-500);">
  <input type="radio" id="radio-default" class="Radio" name="default" />
  <div>
    <label class="Label Label--inline" for="radio-default">Radio Label</label>
  </div>
</div>
```

## Selected State

```html
<div class="Flex Flex--horizontal Flex--inline" style="--flex-spacing-x: var(--spirit-space-500);">
  <input type="radio" id="radio-default-checked" class="Radio" name="default" checked />
  <div>
    <label class="Label Label--inline" for="radio-default-checked">Radio Label</label>
  </div>
</div>
```

## Disabled State

```html
<div class="Flex Flex--horizontal Flex--inline" style="--flex-spacing-x: var(--spirit-space-500);">
  <input type="radio" id="radio-disabled" class="Radio" name="default" disabled />
  <div>
    <label class="Label Label--inline Label--disabled" for="radio-disabled">Radio Label</label>
  </div>
</div>
```

## Hidden Label

```html
<div class="Flex Flex--horizontal Flex--inline" style="--flex-spacing-x: var(--spirit-space-0);">
  <input type="radio" id="radio-hidden-label" class="Radio" name="default" />
  <div>
    <label class="Label Label--inline accessibility-hidden" for="radio-hidden-label">Radio Label</label>
  </div>
</div>
```

## Validation States

See Validation state [dictionary][dictionary-validation].

```html
<div class="Stack Stack--spacing">
  <div class="Flex Flex--horizontal Flex--inline" style="--flex-spacing-x: var(--spirit-space-500);">
    <input type="radio" id="radio-success" class="Radio Radio--success" name="validation" />
    <div>
      <label class="Label Label--inline" for="radio-success">Radio Label</label>
    </div>
  </div>

  <div class="Flex Flex--horizontal Flex--inline" style="--flex-spacing-x: var(--spirit-space-500);">
    <input type="radio" id="radio-warning" class="Radio Radio--warning" name="validation" />
    <div>
      <label class="Label Label--inline" for="radio-warning">Radio Label</label>
    </div>
  </div>

  <div class="Flex Flex--horizontal Flex--inline" style="--flex-spacing-x: var(--spirit-space-500);">
    <input type="radio" id="radio-danger" class="Radio Radio--danger" name="validation" />
    <div>
      <label class="Label Label--inline" for="radio-danger">Radio Label</label>
    </div>
  </div>
</div>
```

## Helper Text

To add helper text, use the [HelperText][readme-helper-text] component:

```html
<div class="Flex Flex--horizontal Flex--inline" style="--flex-spacing-x: var(--spirit-space-500);">
  <input
    type="radio"
    id="radio-helper-text"
    class="Radio"
    name="helperText"
    aria-describedby="radio-helper-text-helper-text"
  />
  <div>
    <label class="Label Label--inline" for="radio-helper-text">Radio Label</label>
    <div class="HelperText" id="radio-helper-text-helper-text">Helper text</div>
  </div>
</div>
```

## As an Item

Use the [Item][readme-item] component to render Radio in item mode:

```html
<div class="Item">
  <div class="Item__slot" role="presentation">
    <input type="radio" id="radio-item-default" class="Radio Radio--item" name="item" />
  </div>
  <div class="Item__content" role="presentation">
    <label class="Label Label--item" for="radio-item-default">Radio Label</label>
  </div>
</div>
```

### As an Item with Helper Text

```html
<div class="Item">
  <div class="Item__slot" role="presentation">
    <input
      type="radio"
      id="radio-item-helper-text"
      class="Radio Radio--item"
      name="item"
      aria-describedby="radio-item-helper-text-helper-text"
    />
  </div>
  <div class="Item__content" role="presentation">
    <label class="Label Label--item" for="radio-item-helper-text">Radio Label</label>
    <div class="HelperText" id="radio-item-helper-text-helper-text">Helper text</div>
  </div>
</div>
```

## Input Position

The input position can be set using [Flex][readme-flex] component with direction.

### Input on End

```html
<div class="Flex Flex--horizontalReversed Flex--inline" style="--flex-spacing-x: var(--spirit-space-500);">
  <input type="radio" id="radio-position-end" class="Radio" name="position" />
  <div>
    <label class="Label Label--inline" for="radio-position-end">Radio Label</label>
  </div>
</div>
```

### Responsive Input Position

Use responsive breakpoint modifiers to change input position at different screen sizes:

```html
<div
  class="Flex Flex--horizontal Flex--inline Flex--tablet--horizontalReversed Flex--desktop--horizontal"
  style="--flex-spacing-x: var(--spirit-space-500);"
>
  <input type="radio" id="radio-position-responsive" class="Radio" name="position" />
  <div>
    <label class="Label Label--inline" for="radio-position-responsive">Radio Label</label>
  </div>
</div>
```

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[field-group]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/FieldGroup/README.md
[readme-flex]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Flex/README.md
[readme-helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
[readme-item]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Item/README.md
