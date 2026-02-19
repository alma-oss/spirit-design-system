# TextArea

Basic usage:

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-default" class="TextArea__label">Label</label>
  <textarea id="text-area-default" class="TextArea__input" name="default" placeholder="Placeholder"></textarea>
</div>
```

Sizes:

```html
<div class="TextArea TextArea--small">
  <label for="text-area-size-small" class="TextArea__label">Small</label>
  <textarea id="text-area-size-small" class="TextArea__input" name="size-small" placeholder="Placeholder"></textarea>
</div>

<div class="TextArea TextArea--medium">
  <label for="text-area-size-medium" class="TextArea__label">Medium (default)</label>
  <textarea id="text-area-size-medium" class="TextArea__input" name="size-medium" placeholder="Placeholder"></textarea>
</div>

<div class="TextArea TextArea--large">
  <label for="text-area-size-large" class="TextArea__label">Large</label>
  <textarea id="text-area-size-large" class="TextArea__input" name="size-large" placeholder="Placeholder"></textarea>
</div>
```

Required textarea:

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-required" class="TextArea__label TextArea__label--required">Label</label>
  <textarea id="text-area-required" class="TextArea__input" name="required" placeholder="Placeholder"></textarea>
</div>
```

Hidden label:

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-hidden-label" class="TextArea__label TextArea__label--hidden">Hidden Label</label>
  <textarea id="text-area-hidden-label" class="TextArea__input" name="hiddenLabel" placeholder="Placeholder">
Filled</textarea
  >
</div>
```

Fluid width:

```html
<div class="TextArea TextArea--medium TextArea--fluid">
  <label for="text-area-fluid" class="TextArea__label">Label</label>
  <textarea id="text-area-fluid" class="TextArea__input" name="fluid" placeholder="Placeholder"></textarea>
</div>
```

Helper text:

To add helper text, use the [HelperText][helper-text] component:

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-helper-text" class="TextArea__label">Label</label>
  <textarea id="text-area-helper-text" class="TextArea__input" name="helperText" placeholder="Placeholder"></textarea>
  <div class="HelperText">Helper text</div>
</div>
```

## Input Width

There are several ways to adjust the textarea width:

### Rows Attribute

The number of visible text lines for the control. Supported values are positive integers from `3` up.

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-rows" class="TextArea__label">Label</label>
  <textarea id="text-area-rows" class="TextArea__input" rows="3" name="rows"></textarea>
</div>
```

### Grid

For other use cases (wider textarea or textarea with unknown value length), we
recommend placing them inside the Grid component and using `TextArea--fluid`
modifier to fill the available space.

## JavaScript Plugin for Auto-Resizing

To enable auto-resizing of the textarea, first, you need to provide Spirit JavaScript,
which will handle the functionality:

```html
<script src="node_modules/@alma-oss/spirit-web/js/cjs/spirit-web.min.js" async></script>
```

Please consult the [main README][web-readme] for how to include JavaScript
plugins.

Then you need to add data attribute `data-spirit-toggle="autoResize"` to the component.

```html
<div class="TextArea TextArea--medium" data-spirit-toggle="autoResize">
  <label for="text-area-auto-resize" class="TextArea__label">Label of auto-resizing TextArea</label>
  <textarea id="text-area-auto-resize" class="TextArea__input" name="autoResize"></textarea>
</div>
```

## Validation States

Validation states can be presented either by adding a CSS modifier class
(`TextArea--success`, `TextArea--warning`, `TextArea--danger`), or by adding
a JS interaction class when controlled by JavaScript (`has-success`,
`has-warning`, `has-danger`). See Validation state [dictionary][dictionary-validation].

- To render validation text as a list, use `<ul>` element inside of `.TextArea__validationText`.
- To render validation text with an icon, add `<svg>` icon inside of `.TextArea__validationText`.

```html
<div class="TextArea TextArea--medium TextArea--danger">
  <label for="text-area-danger" class="TextArea__label">Label</label>
  <textarea id="text-area-danger" class="TextArea__input" name="danger" placeholder="Placeholder">Filled</textarea>
  <div class="TextArea__validationText">Danger validation text</div>
</div>

<div class="TextArea TextArea--medium has-danger">
  <label for="text-area-danger-has-danger" class="TextArea__label">Label</label>
  <textarea id="text-area-danger-has-danger" class="TextArea__input" name="hasDanger" placeholder="Placeholder">
    Filled
  </textarea>
  <div class="TextArea__validationText">Danger validation text</div>
</div>

<div class="TextArea__validationText">
  <ul>
    <li>First validation text</li>
    <li>Second validation text</li>
  </ul>
</div>

<div class="TextArea TextArea--medium has-warning">
  <label for="text-area-danger-has-warning" class="TextArea__label">Label</label>
  <textarea id="text-area-danger-has-warning" class="TextArea__input" name="hasDanger" placeholder="Placeholder">
    Filled
  </textarea>
  <div class="TextArea__validationText">
    <svg width="20" height="20" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#warning" />
    </svg>
    <div>Validation text with icon</div>
  </div>
</div>
```

### JavaScript-Controlled Validation Text

When implementing client-side form validation, use JS interaction state classes
(`has-success`, `has-warning`, `has-danger`) on the wrapping `<div>` element and
render validation texts in a `<div>` or `<ul>` with `data-spirit-element="validation_text"`
attribute. This way your JS remains disconnected from CSS that may or may not be
[prefixed][prefixed].

**Remember this approach is only valid for vanilla JS implementation. React
components mix CSS with JS by design and handle prefixes their own way.**

```html
<div class="TextArea TextArea--medium has-danger">
  <label for="text-area-js-validation" class="TextArea__label">Label</label>
  <textarea id="text-area-js-validation" class="TextArea__input" name="jsValidation" placeholder="Placeholder">
Filled</textarea
  >
  <div data-spirit-element="validation_text">Error message inserted by JS</div>
</div>
```

## Disabled State

On top of adding the `disabled` attribute to the textarea, disabled TextArea can
be marked by adding `TextArea--disabled` modifier class, or with `is-disabled`
JS interaction class when controlled by JavaScript:

```html
<div class="TextArea TextArea--medium TextArea--disabled">
  <label for="text-area-disabled" class="TextArea__label">Label</label>
  <textarea
    id="text-area-disabled"
    class="TextArea__input"
    name="disabled"
    placeholder="Placeholder"
    disabled
  ></textarea>
</div>
<div class="TextArea TextArea--medium TextArea--disabled">
  <label for="text-area-disabled-filled" class="TextArea__label">Label</label>
  <textarea
    id="text-area-disabled-filled"
    class="TextArea__input"
    name="disabledFilled"
    placeholder="Placeholder"
    disabled
  >
Filled</textarea
  >
</div>
```

👉 Please note that responsive border radius is defined by design specifications.

[web-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md
[prefixed]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md#prefixing-css-class-names
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
