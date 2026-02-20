# Radio

## Basic Usage

Radio buttons should be wrapped in a [FieldGroup][field-group] when used as a group:

```html
<fieldset class="FieldGroup">
  <legend class="accessibility-hidden">Choose an option</legend>
  <div class="FieldGroup__label" aria-hidden="true">Choose an option</div>
  <div class="FieldGroup__fields">
    <div class="Radio Radio--inputPositionStart">
      <input type="radio" id="radio-default" class="Radio__input" name="default" />
      <div class="Radio__text">
        <label class="Label Label--inline" for="radio-default">Radio Label</label>
      </div>
    </div>
  </div>
</fieldset>
```

For a single Radio button example:

```html
<div class="Radio">
  <input type="radio" id="radio-default" class="Radio__input" name="default" />
  <div class="Radio__text">
    <label class="Label Label--inline" for="radio-default">Radio Label</label>
  </div>
</div>
```

## Selected State

```html
<div class="Radio">
  <input type="radio" id="radio-default-checked" class="Radio__input" name="default" checked />
  <div class="Radio__text">
    <label class="Label Label--inline" for="radio-default-checked">Radio Label</label>
  </div>
</div>
```

## Disabled State

```html
<div class="Radio Radio--inputPositionStart Radio--disabled">
  <input type="radio" id="radio-disabled" class="Radio__input" name="default" disabled />
  <div class="Radio__text">
    <label class="Label Label--inline" for="radio-disabled">Radio Label</label>
  </div>
</div>
```

## Validation States

See Validation state [dictionary][dictionary-validation].

```html
<div class="Radio Radio--inputPositionStart Radio--success">
  <input type="radio" id="radio-success" class="Radio__input" name="validation" />
  <div class="Radio__text">
    <label class="Label Label--inline" for="radio-success">Radio Label</label>
  </div>
</div>

<div class="Radio Radio--inputPositionStart Radio--warning">
  <input type="radio" id="radio-warning" class="Radio__input" name="validation" />
  <div class="Radio__text">
    <label class="Label Label--inline" for="radio-warning">Radio Label</label>
  </div>
</div>

<div class="Radio Radio--inputPositionStart Radio--danger">
  <input type="radio" id="radio-danger" class="Radio__input" name="validation" />
  <div class="Radio__text">
    <label class="Label Label--inline" for="radio-danger" for="radio-danger">Radio Label</label>
  </div>
</div>
```

## With Helper Text

```html
<div class="Radio">
  <input
    type="radio"
    id="radio-helper-text"
    class="Radio__input"
    name="helperText"
    aria-describedby="radio-helper-text-helper-text"
  />
  <div class="Radio__text">
    <label class="Label Label--inline" for="radio-helper-text" for="radio-helper-text">Radio Label</label>
    <div class="Radio__helperText" id="radio-helper-text-helper-text">Helper text</div>
  </div>
</div>
```

## As an Item

```html
<div class="Radio Radio--inputPositionStart Radio--item">
  <input type="radio" id="radio-item-default" class="Radio__input" name="item" />
  <div class="Radio__text">
    <label class="Label Label--inline Label--item" for="radio-item-default">Radio Label</label>
  </div>
</div>
```

## As an Item Wrapped with Helper Text

```html
<div class="Radio Radio--inputPositionStart Radio--item">
  <input
    type="radio"
    id="radio-item-helper-text"
    class="Radio__input"
    name="item"
    aria-describedby="radio-item-helper-text-helper-text"
  />
  <div class="Radio__text">
    <label class="Label Label--inline" for="radio-item-helper-text">Radio Label</label>
    <div class="Radio__helperText" id="radio-item-helper-text-helper-text">Helper text</div>
  </div>
</div>
```

## Input Position

The input position can be set to `start` (default) or `end`.

### Input on End

```html
<div class="Radio Radio--inputPositionEnd">
  <input type="radio" id="radio-position-end" class="Radio__input" name="position" />
  <div class="Radio__text">
    <label class="Label Label--inline" for="radio-position-end">Radio Label</label>
  </div>
</div>
```

### Responsive Input Position

Use responsive breakpoint modifiers to change input position at different screen sizes:

```html
<div class="Radio Radio--tablet--inputPositionEnd">
  <input type="radio" id="radio-position-responsive" class="Radio__input" name="position" />
  <div class="Radio__text">
    <label class="Label Label--inline" for="radio-position-responsive">Radio Label</label>
  </div>
</div>
```

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[field-group]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/FieldGroup/README.md
