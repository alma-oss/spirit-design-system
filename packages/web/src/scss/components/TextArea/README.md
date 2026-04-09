# TextArea

Basic usage:

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-default" class="Label">Label</label>
  <textarea id="text-area-default" class="TextArea__input" name="default" placeholder="Placeholder"></textarea>
</div>
```

Sizes:

```html
<div class="TextArea TextArea--small">
  <label for="text-area-size-small" class="Label">Small</label>
  <textarea id="text-area-size-small" class="TextArea__input" name="size-small" placeholder="Placeholder"></textarea>
</div>

<div class="TextArea TextArea--medium">
  <label for="text-area-size-medium" class="Label">Medium (default)</label>
  <textarea id="text-area-size-medium" class="TextArea__input" name="size-medium" placeholder="Placeholder"></textarea>
</div>

<div class="TextArea TextArea--large">
  <label for="text-area-size-large" class="Label">Large</label>
  <textarea id="text-area-size-large" class="TextArea__input" name="size-large" placeholder="Placeholder"></textarea>
</div>
```

Required textarea:

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-required" class="Label Label--required">Label</label>
  <textarea id="text-area-required" class="TextArea__input" name="required" placeholder="Placeholder"></textarea>
</div>
```

Hidden label:

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-hidden-label" class="Label accessibility-hidden">Hidden Label</label>
  <textarea id="text-area-hidden-label" class="TextArea__input" name="hiddenLabel" placeholder="Placeholder">
Filled</textarea
  >
</div>
```

## Layout

TextArea is fluid by default. Use parent layout components like [Grid][readme-grid], [Stack][readme-stack], or [Container][readme-container]
to control the component width in page layouts.

Helper text:

To add helper text, use the [HelperText][readme-helper-text] component:

```html
<div class="TextArea TextArea--medium">
  <label for="text-area-helper-text" class="Label">Label</label>
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
  <label for="text-area-rows" class="Label">Label</label>
  <textarea id="text-area-rows" class="TextArea__input" rows="3" name="rows"></textarea>
</div>
```

### Grid

For other use cases (wider textarea or textarea with unknown value length), we
recommend placing textareas inside the Grid component to control their width.

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
  <label for="text-area-auto-resize" class="Label">Label of auto-resizing TextArea</label>
  <textarea id="text-area-auto-resize" class="TextArea__input" name="autoResize"></textarea>
</div>
```

## Validation States

Validation states can be presented either by adding a CSS modifier class
(`TextArea--success`, `TextArea--warning`, `TextArea--danger`), or by adding
a JS interaction class when controlled by JavaScript (`has-success`,
`has-warning`, `has-danger`). See Validation state [dictionary][dictionary-validation].

- To render validation text as a list, use `<ul>` element inside of `.ValidationText`.
- To render validation text with an icon, add `<svg>` icon inside of `.ValidationText`.

```html
<div class="TextArea TextArea--medium TextArea--danger">
  <label for="text-area-danger" class="Label">Label</label>
  <textarea id="text-area-danger" class="TextArea__input" name="danger" placeholder="Placeholder">Filled</textarea>
  <div class="ValidationText ValidationText--danger">Danger validation text</div>
</div>

<div class="TextArea TextArea--medium has-danger">
  <label for="text-area-danger-has-danger" class="Label">Label</label>
  <textarea id="text-area-danger-has-danger" class="TextArea__input" name="hasDanger" placeholder="Placeholder">
    Filled
  </textarea>
  <div class="ValidationText ValidationText--danger">Danger validation text</div>
</div>

<div class="ValidationText ValidationText--danger">
  <ul>
    <li>First validation text</li>
    <li>Second validation text</li>
  </ul>
</div>

<div class="TextArea TextArea--medium has-warning">
  <label for="text-area-danger-has-warning" class="Label">Label</label>
  <textarea id="text-area-danger-has-warning" class="TextArea__input" name="hasDanger" placeholder="Placeholder">
    Filled
  </textarea>
  <div class="ValidationText ValidationText--warning">
    <svg width="20" height="20" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#warning" />
    </svg>
    <div>Validation text with icon</div>
  </div>
</div>
```

## Disabled State

On top of adding the `disabled` attribute to the textarea, disabled TextArea can
be marked by adding `TextArea--disabled` modifier class, or with `is-disabled`
JS interaction class when controlled by JavaScript:

```html
<div class="TextArea TextArea--medium TextArea--disabled">
  <label for="text-area-disabled" class="Label Label--disabled">Label</label>
  <textarea
    id="text-area-disabled"
    class="TextArea__input"
    name="disabled"
    placeholder="Placeholder"
    disabled
  ></textarea>
</div>
<div class="TextArea TextArea--medium TextArea--disabled">
  <label for="text-area-disabled-filled" class="Label Label--disabled">Label</label>
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

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[readme-container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Container/README.md
[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Grid/README.md
[readme-helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
[readme-stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Stack/README.md
[web-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md
