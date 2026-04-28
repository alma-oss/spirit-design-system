# TextArea

TextArea is a multiline field built from native `textarea` wrapped by [InputContainer][readme-input-container].

## Basic Usage

```html
<div>
  <label for="text-area-default" class="Label">Label</label>
  <div class="InputContainer InputContainer--medium">
    <textarea id="text-area-default" name="default" placeholder="Placeholder"></textarea>
  </div>
</div>
```

## Sizes

TextArea supports the following size modifiers on `InputContainer`:

- `InputContainer--small`
- `InputContainer--medium` (default)
- `InputContainer--large`

```html
<div>
  <label for="text-area-size-small" class="Label">Small</label>
  <div class="InputContainer InputContainer--small">
    <textarea id="text-area-size-small" name="sizeSmall" placeholder="Placeholder"></textarea>
  </div>
</div>

<div>
  <label for="text-area-size-medium" class="Label">Medium (default)</label>
  <div class="InputContainer InputContainer--medium">
    <textarea id="text-area-size-medium" name="sizeMedium" placeholder="Placeholder"></textarea>
  </div>
</div>

<div>
  <label for="text-area-size-large" class="Label">Large</label>
  <div class="InputContainer InputContainer--large">
    <textarea id="text-area-size-large" name="sizeLarge" placeholder="Placeholder"></textarea>
  </div>
</div>
```

## Required and Hidden Label

```html
<div>
  <label for="text-area-required" class="Label Label--required">Label</label>
  <div class="InputContainer InputContainer--medium">
    <textarea id="text-area-required" name="required" placeholder="Placeholder" required></textarea>
  </div>
</div>

<div>
  <label for="text-area-hidden-label" class="Label accessibility-hidden">Hidden Label</label>
  <div class="InputContainer InputContainer--medium">
    <textarea id="text-area-hidden-label" name="hiddenLabel" placeholder="Placeholder"></textarea>
  </div>
</div>
```

## Layout

TextArea is fluid by default. Use parent layout components like [Grid][readme-grid], [Stack][readme-stack], or [Container][readme-container]
to control the component width in page layouts.

## Helper Text

To add helper text, use [HelperText][readme-helper-text] and connect it with `aria-describedby`.

```html
<div>
  <label for="text-area-helper-text" class="Label">Label</label>
  <div class="InputContainer InputContainer--medium">
    <textarea
      id="text-area-helper-text"
      name="helperText"
      placeholder="Placeholder"
      aria-describedby="text-area-helper-text-helper-text"
    ></textarea>
  </div>
  <div id="text-area-helper-text-helper-text" class="HelperText">Helper text</div>
</div>
```

## Validation States

Use validation modifiers on `InputContainer`:

- `InputContainer--success`
- `InputContainer--warning`
- `InputContainer--danger`

```html
<div>
  <label for="text-area-success" class="Label">Label</label>
  <div class="InputContainer InputContainer--medium InputContainer--success">
    <textarea id="text-area-success" name="success" placeholder="Placeholder">Filled</textarea>
  </div>
</div>

<div>
  <label for="text-area-warning" class="Label">Label</label>
  <div class="InputContainer InputContainer--medium InputContainer--warning">
    <textarea
      id="text-area-warning"
      name="warning"
      placeholder="Placeholder"
      aria-describedby="text-area-warning-validation-text"
    >
Filled</textarea
    >
  </div>
  <div id="text-area-warning-validation-text" class="ValidationText ValidationText--warning">Validation text</div>
</div>

<div>
  <label for="text-area-danger" class="Label">Label</label>
  <div class="InputContainer InputContainer--medium InputContainer--danger">
    <textarea
      id="text-area-danger"
      name="danger"
      placeholder="Placeholder"
      aria-describedby="text-area-danger-validation-text"
    >
Filled</textarea
    >
  </div>
  <div id="text-area-danger-validation-text" class="ValidationText ValidationText--danger">
    <ul>
      <li>First validation text</li>
      <li>Second validation text</li>
    </ul>
  </div>
</div>

<div>
  <label for="text-area-danger-with-icon" class="Label">Label</label>
  <div class="InputContainer InputContainer--medium InputContainer--danger">
    <textarea
      id="text-area-danger-with-icon"
      name="dangerWithIcon"
      placeholder="Placeholder"
      aria-describedby="text-area-danger-with-icon-validation-text"
    >
Filled</textarea
    >
  </div>
  <div id="text-area-danger-with-icon-validation-text" class="ValidationText ValidationText--danger">
    <svg class="Icon" width="20" height="20" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#danger" />
    </svg>
    <div>Validation text with icon</div>
  </div>
</div>
```

To render validation text as a list, use `<ul>` inside `.ValidationText`. To render it with an icon, add an `<svg>` icon inside `.ValidationText`.

## Disabled State

Use the `InputContainer--disabled` modifier and `disabled` attribute on textarea:

```html
<div>
  <label for="text-area-disabled" class="Label Label--disabled">Label</label>
  <div class="InputContainer InputContainer--medium InputContainer--disabled">
    <textarea id="text-area-disabled" name="disabled" placeholder="Placeholder" disabled></textarea>
  </div>
</div>

<div>
  <label for="text-area-disabled-filled" class="Label Label--required Label--disabled">Label</label>
  <div class="InputContainer InputContainer--medium InputContainer--disabled">
    <textarea id="text-area-disabled-filled" name="disabledFilled" disabled required>Filled</textarea>
  </div>
</div>
```

## Input Width

There are several ways to adjust the textarea width:

### Rows Attribute

The visible number of lines is controlled by the native `rows` attribute (supported values are positive integers from `3` up).

```html
<div>
  <label for="text-area-rows" class="Label">Label</label>
  <div class="InputContainer InputContainer--medium">
    <textarea id="text-area-rows" name="rows" rows="3"></textarea>
  </div>
</div>
```

### Grid

For wider layouts, place TextArea into a Grid column and add `InputContainer--fluid` so the field fills available width.

## JavaScript Plugin for Auto-Resizing

To enable auto-resizing of the textarea, first include Spirit JavaScript:

```html
<script src="node_modules/@alma-oss/spirit-web/js/cjs/spirit-web.min.js" async></script>
```

Please consult the [main README][web-readme] for how to include JavaScript plugins.

Then add `data-spirit-toggle="autoResize"`:

```html
<div data-spirit-toggle="autoResize">
  <label for="text-area-auto-resize" class="Label">Label of auto-resizing TextArea</label>
  <div class="InputContainer InputContainer--medium">
    <textarea id="text-area-auto-resize" name="autoResize"></textarea>
  </div>
</div>
```

## Character Counter

TextArea counter patterns use [CharacterCounter][readme-character-counter] together with helper/validation text and screen-reader-only messages.

[readme-character-counter]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/CharacterCounter/README.md
[readme-container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Container/README.md
[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Grid/README.md
[readme-helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
[readme-input-container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/InputContainer/README.md
[readme-stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Stack/README.md
[web-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md
