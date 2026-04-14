# InputContainer

InputContainer is a shared wrapper for native box-field inputs and other form elements.

## Basic Usage

```html
<div class="InputContainer InputContainer--medium">
  <input />
</div>
```

## Sizes

InputContainer supports the following size modifiers:

- `InputContainer--small`
- `InputContainer--medium` (default)
- `InputContainer--large`

```html
<div class="InputContainer InputContainer--small">
  <input type="text" id="input-container-size-small" name="sizeSmall" placeholder="Placeholder" />
</div>

<div class="InputContainer InputContainer--medium">
  <input type="text" id="input-container-size-medium" name="sizeMedium" placeholder="Placeholder" />
</div>

<div class="InputContainer InputContainer--large">
  <input type="text" id="input-container-size-large" name="sizeLarge" placeholder="Placeholder" />
</div>
```

## Validation States

Use validation modifier classes to change border color:

- `InputContainer--success`
- `InputContainer--warning`
- `InputContainer--danger`

```html
<div class="InputContainer InputContainer--medium InputContainer--warning">
  <input type="text" id="input-container-warning" name="warning" placeholder="Placeholder" />
</div>
```

## Disabled State

Use the `InputContainer--disabled` modifier and `disabled` attribute on the input:

```html
<div class="InputContainer InputContainer--medium InputContainer--disabled">
  <input type="text" id="input-container-disabled" name="disabled" placeholder="Placeholder" disabled />
</div>
```

## Input Width

Use the native `size` attribute when you need width based on character count:

```html
<div class="InputContainer InputContainer--medium">
  <input type="text" id="input-container-input-size" name="inputSize" size="4" placeholder="MMYY" />
</div>
```

## TextArea

Use the `textarea` element to create a multi-line input:

```html
<div class="InputContainer InputContainer--medium">
  <textarea id="input-container-textarea" name="textarea" placeholder="Placeholder"></textarea>
</div>
```

## InputAddon

Use the [InputAddon][readme-input-addon] component to add additional content to the input.

```html
<div class="InputContainer InputContainer--medium">
  <input type="text" id="input-container-input-addon" name="inputAddon" placeholder="Placeholder" />
  <label class="InputAddon InputAddon--medium" for="input-container-input-addon">
    <span aria-hidden="true">€</span>
    <span class="accessibility-hidden">in EUR</span>
  </label>
</div>
```

See [InputAddon][readme-input-addon] for more details.

[readme-input-addon]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/InputAddon/README.md
