# TextField

Basic usage:

```html
<div>
  <label for="text-field-default" class="Label">Label</label>
  <div class="InputContainer InputContainer--medium">
    <input type="text" id="text-field-default" name="default" placeholder="Placeholder" />
  </div>
</div>
```

Sizes:

```html
<div>
  <label for="text-field-size-small" class="Label">Small</label>
  <div class="InputContainer InputContainer--small">
    <input type="text" id="text-field-size-small" name="size-small" placeholder="Placeholder" />
  </div>
</div>

<div>
  <label for="text-field-size-medium" class="Label">Medium (default)</label>
  <div class="InputContainer InputContainer--medium">
    <input type="text" id="text-field-size-medium" name="size-medium" placeholder="Placeholder" />
  </div>
</div>

<div>
  <label for="text-field-size-large" class="Label">Large</label>
  <div class="InputContainer InputContainer--large">
    <input type="text" id="text-field-size-large" name="size-large" placeholder="Placeholder" />
  </div>
</div>
```

Required input:

```html
<div>
  <label for="text-field-required" class="Label Label--required">Label</label>
  <div class="InputContainer InputContainer--medium">
    <input type="text" id="text-field-required" name="required" placeholder="Placeholder" required />
  </div>
</div>
```

Hidden label:

```html
<div>
  <label for="text-field-hidden-label" class="Label accessibility-hidden">Label</label>
  <div class="InputContainer InputContainer--medium">
    <input type="text" id="text-field-hidden-label" name="hiddenLabel" placeholder="Placeholder" />
  </div>
</div>
```

## Layout

TextField is fluid by default. Use parent layout components like [Grid][readme-grid], [Stack][readme-stack], or [Container][readme-container]
to control the component width in page layouts.

Helper Text:

To add helper text, use the [HelperText][readme-helper-text] component. When helper text is present, give the helper element an `id` and set `aria-describedby` on the input to that id so assistive technologies can associate the description with the field:

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

## Supported Type Attribute Values

TextField supports the following input types:

- `email`
- `number`
- `password`
- `search`
- `tel`
- `text`
- `url`

Other meaningful values (e.g. `date`, `file`) will work but the design of the
input field will not be consistent across platforms/browsers.

## Input Width

There are several ways to adjust the input width:

### Input Size Attribute

The `size` attribute is supported on inputs of the following types: `email`,
`password`, `tel`, `text`, `url`.

This option is generally recommended for inputs with a limited value length
(e.g. numeric representation of day, month, year). Supported values are `2`, `3`
and `4` (characters). If you need any other value or prefer using `em` unit
instead of default `ch`, define a `--spirit-input-container-input-width` CSS custom property on the `<input>`
element:

```html
<div>
  <label for="text-field-size" class="Label">4000 (in Roman numerals)</label>
  <div class="InputContainer InputContainer--medium">
    <input type="text" size="4" id="text-field-size" name="size" placeholder="Placeholder" />
  </div>
</div>
<div>
  <label for="text-field-size-em" class="Label">4000 (in Roman numerals)</label>
  <div class="InputContainer InputContainer--medium">
    <input
      type="text"
      size="4"
      id="text-field-size-em"
      name="sizeEm"
      placeholder="Placeholder"
      style="--spirit-input-container-input-width: 4em;"
    />
  </div>
</div>
```

### Grid

For other use cases (wider input or input with unknown value length), we
recommend placing inputs inside the Grid component to control their width.

## JavaScript Plugin for Password Toggle

TextField with `type="password"` can have a toggle button. When toggling don't
forget to change not only the input type but also `aria-checked` and
`aria-label`.

To enable password toggle, first, you need to provide Spirit JavaScript,
which will handle the functionality:

```html
<script src="node_modules/@alma-oss/spirit-web/js/cjs/spirit-web.min.js" async></script>
```

Please consult the [main README][web-readme] for how to include JavaScript
plugins.

Then you need to add data attribute `data-spirit-toggle="password"` to the input.

```html
<div>
  <label for="text-field-password-toggle" class="Label">Password Toggle</label>
  <div class="InputContainer InputContainer--medium">
    <input
      type="password"
      id="text-field-password-toggle"
      name="passwordToggle"
      placeholder="Password must be at least 6 characters long"
    />
    <div class="InputAddon InputAddon--medium">
      <button
        type="button"
        class="ControlButton ControlButton--medium ControlButton--symmetrical accessibility-tap-target dynamic-color-background-interactive"
        role="switch"
        aria-checked="false"
        aria-label="Show password"
        data-spirit-toggle="password"
      >
        <span class="accessibility-unchecked">
          <svg class="Icon" width="20" height="20" aria-hidden="true">
            <use xlink:href="/assets/icons/svg/sprite.svg#visibility-on" />
          </svg>
        </span>
        <span class="accessibility-checked">
          <svg class="Icon" width="20" height="20" aria-hidden="true">
            <use xlink:href="/assets/icons/svg/sprite.svg#visibility-off" />
          </svg>
        </span>
      </button>
    </div>
  </div>
</div>
```

## Validation States

Validation states can be presented either by adding a CSS modifier class on
[InputContainer][readme-input-container] (`InputContainer--success`, `InputContainer--warning`,
`InputContainer--danger`), or by adding a JS interaction class when controlled by JavaScript (`has-success`,
`has-warning`, `has-danger`). See Validation state [dictionary][dictionary-validation].

- To render validation text as a list, use `<ul>` element inside of `.ValidationText`.
- To render validation text with an icon, add `<svg>` icon inside of `.ValidationText`.

```html
<div>
  <label for="text-field-success" class="Label">Label</label>
  <div class="InputContainer InputContainer--medium InputContainer--success">
    <input type="text" id="text-field-success" name="success" placeholder="Placeholder" value="Filled" />
  </div>
</div>

<div>
  <label for="text-field-warning" class="Label">Label</label>
  <div class="InputContainer InputContainer--medium InputContainer--warning">
    <input
      type="text"
      id="text-field-warning"
      name="warningValidationText"
      placeholder="Placeholder"
      value="Filled"
      aria-describedby="text-field-warning-validation-text"
    />
  </div>
  <div class="ValidationText ValidationText--warning" id="text-field-warning-validation-text">Validation text</div>
</div>

<div>
  <label for="text-field-danger" class="Label">Label</label>
  <div class="InputContainer InputContainer--medium InputContainer--danger">
    <input
      type="text"
      id="text-field-danger"
      name="dangerValidationText"
      placeholder="Placeholder"
      value="Filled"
      aria-describedby="text-field-danger-validation-text"
    />
  </div>
  <div class="ValidationText ValidationText--danger" id="text-field-danger-validation-text">
    <ul>
      <li>Validation text</li>
      <li>Second validation text</li>
    </ul>
  </div>
</div>

<div>
  <label for="text-field-warning-validation-icon" class="Label">Label</label>
  <div class="InputContainer InputContainer--medium InputContainer--warning">
    <input
      type="text"
      id="text-field-warning-validation-icon"
      name="warningValidationIcon"
      placeholder="Placeholder"
      value="Filled"
      aria-describedby="text-field-warning-validation-icon-validation-text"
    />
  </div>
  <div class="ValidationText ValidationText--warning" id="text-field-warning-validation-icon-validation-text">
    <svg class="Icon" width="20" height="20" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#warning" />
    </svg>
    <div>Validation text with icon</div>
  </div>
</div>
```

## Disabled State

On top of adding the `disabled` attribute to the input, use the
`InputContainer--disabled` modifier on [InputContainer][readme-input-container], or with `is-disabled`
JS interaction class when controlled by JavaScript:

```html
<div>
  <label for="text-field-disabled" class="Label">Label</label>
  <div class="InputContainer InputContainer--medium InputContainer--disabled">
    <input type="text" id="text-field-disabled" name="disabled" placeholder="Placeholder" disabled />
  </div>
</div>

<div>
  <label for="text-field-disabled-filled" class="Label Label--required">Label</label>
  <div class="InputContainer InputContainer--medium InputContainer--disabled">
    <input
      type="text"
      id="text-field-disabled-filled"
      name="disabledFilled"
      placeholder="Placeholder"
      disabled
      required
      value="Filled"
    />
  </div>
</div>
```

👉 Please note that responsive border radius is defined by design specifications.

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[readme-container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Container/README.md
[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Grid/README.md
[readme-helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
[readme-input-container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/InputContainer/README.md
[readme-stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Stack/README.md
