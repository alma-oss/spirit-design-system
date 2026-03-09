# Toggle

Toggle is a form control that allows users to switch between two states.

## Basic Usage

The Toggle component implements the HTML [checkbox input][mdn-checkbox] element. It uses
the native input element and styles it to look like a toggle switch.

```html
<div class="Toggle Toggle--inputPositionEnd">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-default">Toggle Label</label>
  </span>
  <input type="checkbox" id="toggle-default" class="Toggle__input" name="default" />
</div>
```

## Indicators

If you need to indicate the state of the toggle, you can add the `Toggle__input--indicators`
modifier class to the input. This will add a visual indicators to the toggle switch.

```html
<div class="Toggle Toggle--inputPositionEnd">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-indicators">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle-indicators" class="Toggle__input Toggle__input--indicators" name="default" />
</div>
```

## Required

Add the `required` attribute to the input to mark it as required and add the
`Label--required` modifier class to the label to indicate the state.

```html
<div class="Toggle Toggle--inputPositionEnd">
  <div class="Toggle__text">
    <label class="Label Label--inline Label--required" for="toggle-required">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle-required" class="Toggle__input" name="required" required />
</div>
```

## Hidden Label

```html
<div class="Toggle Toggle--inputPositionEnd">
  <div class="Toggle__text">
    <label class="Label Label--inline accessibility-hidden" for="toggle-hidden-label">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle-hidden-label" class="Toggle__input" name="hidden-label" />
</div>
```

## Fluid

```html
<div class="Toggle Toggle--inputPositionEnd Toggle--fluid">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-fluid">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle-fluid" class="Toggle__input" name="fluid" />
</div>
```

## Helper Text

To add helper text, use the [HelperText][helper-text] component:

```html
<div class="Toggle Toggle--inputPositionEnd">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-helper-text">Toggle Label</label>
    <div class="HelperText" id="toggle-helper-text-helper-text">Helper text</div>
  </div>
  <input
    type="checkbox"
    id="toggle-helper-text"
    class="Toggle__input"
    name="helper-text"
    aria-describedby="toggle-helper-text-helper-text"
  />
</div>
```

## Validation States

Validation states can be presented either by adding a CSS modifier class
(`Toggle--success`, `Toggle--warning`, `Toggle--danger`), or by adding
a JS interaction class when controlled by JavaScript (`has-success`,
`has-warning`, `has-danger`). See Validation state [dictionary][dictionary-validation].

- To render validation text as a list, use `<ul>` element inside of `.ValidationText`.
- To render validation text with an icon, add `<svg>` icon inside of `.ValidationText`.

```html
<div class="Toggle Toggle--inputPositionEnd Toggle--success">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-success">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle-success" class="Toggle__input" name="default" />
</div>

<div class="Toggle Toggle--inputPositionEnd Toggle--warning">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-warning">Toggle Label</label>
    <div class="ValidationText ValidationText--warning ValidationText--inline" id="toggle-warning-validation-text">
      Validation text
    </div>
  </div>
  <input
    type="checkbox"
    id="toggle-warning"
    class="Toggle__input"
    name="default"
    aria-describedby="toggle-warning-validation-text"
    checked
  />
</div>

<div class="Toggle Toggle--inputPositionEnd Toggle--danger">
  <div class="Toggle__text">
    <label for="toggle-danger" class="Label Label--inline">Toggle Label</label>
    <ul class="ValidationText ValidationText--danger ValidationText--inline" id="toggle-danger-validation-text">
      <li>First validation text</li>
      <li>Second validation text</li>
    </ul>
  </div>
  <input
    type="checkbox"
    id="toggle-danger"
    class="Toggle__input"
    name="default"
    aria-describedby="toggle-danger-validation-text"
  />
</div>

<div class="Toggle Toggle--inputPositionEnd Toggle--warning">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-warning">Toggle Label</label>
    <div class="ValidationText ValidationText--warning ValidationText--inline" id="toggle-warning-validation-text">
      <svg class="Icon" width="20" height="20" aria-hidden="true">
        <use xlink:href="/assets/icons/svg/sprite.svg#warning" />
      </svg>
      <span>Validation text with icon</span>
    </div>
  </div>
  <input
    type="checkbox"
    id="toggle-warning"
    class="Toggle__input"
    name="default"
    aria-describedby="toggle-warning-validation-text"
    checked
  />
</div>
```

## Disabled State

On top of adding the `disabled` attribute to the input, disabled Toggle needs to
be marked by adding `Toggle--disabled` modifier class, or with `is-disabled`
JS interaction class when controlled by JavaScript:

```html
<div class="Toggle Toggle--inputPositionEnd Toggle--disabled">
  <div class="Toggle__text">
    <label class="Label Label--inline Label--disabled" for="toggle-disabled">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle-disabled" class="Toggle__input" name="default" disabled />
</div>
```

## Input Position

The input position can be set to `end` (default) or `start`.

### Input on Start

```html
<div class="Toggle Toggle--inputPositionStart">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-position-start">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle-position-start" class="Toggle__input" name="position" />
</div>
```

### Responsive Input Position

Use responsive breakpoint modifiers to change input position at different screen sizes:

```html
<div class="Toggle Toggle--tablet--inputPositionStart">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle-position-responsive">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle-position-responsive" class="Toggle__input" name="position" />
</div>
```

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
[mdn-checkbox]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
