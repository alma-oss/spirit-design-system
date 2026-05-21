# TextField

TextField enables the user to type in text information. It has an input, a
label, and optional helper text. It supports several input types like `text` and
`password`. It can be disabled or have a validation state. The label can be
hidden or shown while the field remains correctly marked as required.

## Usage

### Basic

```tsx
<TextField id="text-field-default" label="Label" name="textFieldDefault" />
```

### Advanced

```tsx
<TextField
  hasValidationIcon
  helperText="custom helper text"
  id="text-field-advanced"
  isRequired
  label="Label"
  name="textFieldAdvanced"
  placeholder="Placeholder"
  type="text"
  size="large"
  validationState="danger"
  validationText="validation failed"
/>
```

### Password Toggle

```tsx
<TextField
  hasPasswordToggle
  id="text-field-password-toggle"
  isRequired
  label="Password"
  name="textFieldPasswordToggle"
  placeholder="Placeholder"
  validationState="danger"
  validationText="validation failed"
/>
```

### InputAddon

Use [InputAddon][readme-input-addon] with `startAddon` and `endAddon` to render
non-input content inside the same input row. Addons are rendered as provided.
For consistent spacing, sizing, and alignment with the input, use InputAddon as
the wrapper for icon, symbol, and control content.

`InputAddon` resolves `size` from field context, so nested `Icon` and
`ControlButton` components use that resolved addon size by default.

For non-interactive icon or symbol addons rendered as `label`, decide whether the
visible content is decorative or semantic:

- Decorative content: keep it `aria-hidden="true"` and include descriptive hidden text.
- Semantic content: keep it exposed and do not force `aria-hidden`.

#### Label-Based Search Addon

```tsx
<TextField
  id="text-field-addon-search"
  label="Search"
  name="textFieldAddonSearch"
  placeholder="Search"
  startAddon={
    <InputAddon elementType="label" htmlFor="text-field-addon-search">
      <Icon name="search" />
      <VisuallyHidden>Use search to find jobs for you</VisuallyHidden>
    </InputAddon>
  }
/>
```

#### Interactive End Addon

```tsx
<TextField
  id="text-field-addon-clear"
  label="Search"
  name="textFieldAddonClear"
  placeholder="Search"
  defaultValue="Filled"
  endAddon={
    <InputAddon>
      <ControlButton isSymmetrical isSubtle>
        <Icon name="close" />
        <VisuallyHidden>Clear</VisuallyHidden>
      </ControlButton>
    </InputAddon>
  }
/>
```

Do not use `elementType="label"` when the addon wraps an interactive element
such as a `button` or link.

#### Multiple Addons

```tsx
<TextField
  id="text-field-addon-multiple"
  label="Username"
  name="textFieldAddonMultiple"
  placeholder="spirit-design-system"
  size="large"
  startAddon={
    <>
      <InputAddon elementType="label" htmlFor="text-field-addon-multiple">
        <Icon name="link" />
        <VisuallyHidden>Profile URL</VisuallyHidden>
      </InputAddon>
      <InputAddon elementType="label" htmlFor="text-field-addon-multiple">
        <span aria-hidden="true">@</span>
        <VisuallyHidden>Insert your username without the @ symbol</VisuallyHidden>
      </InputAddon>
    </>
  }
  endAddon={
    <InputAddon>
      <ControlButton isSymmetrical isSubtle>
        <Icon name="close" />
        <VisuallyHidden>Clear</VisuallyHidden>
      </ControlButton>
    </InputAddon>
  }
/>
```

## API

| Name                | Type                                                                         | Default  | Required | Description                                                             |
| ------------------- | ---------------------------------------------------------------------------- | -------- | -------- | ----------------------------------------------------------------------- |
| `autoComplete`      | `string`                                                                     | —        | ✕        | [Automated assistance in filling][autocomplete-attr]                    |
| `endAddon`          | `ReactNode`                                                                  | —        | ✕        | Addon rendered after the input                                          |
| `hasPasswordToggle` | `bool`                                                                       | —        | ✓        | If true, the `type` is set to `password` and a password toggle is shown |
| `hasValidationIcon` | `bool`                                                                       | `false`  | ✕        | Whether to show validation icon                                         |
| `helperText`        | `string`                                                                     | —        | ✕        | Custom helper text                                                      |
| `id`                | `string`                                                                     | —        | ✓        | Input and label identification                                          |
| `inputWidth`        | `number`                                                                     | —        | ✕        | Input width                                                             |
| `isDisabled`        | `bool`                                                                       | —        | ✕        | Whether is field disabled                                               |
| `isLabelHidden`     | `bool`                                                                       | —        | ✕        | Whether is label hidden                                                 |
| `isRequired`        | `bool`                                                                       | —        | ✕        | Whether is field required                                               |
| `label`             | `ReactNode`                                                                  | —        | ✓        | Label text                                                              |
| `name`              | `string`                                                                     | —        | ✕        | Input name                                                              |
| `pattern`           | `string`                                                                     | —        | ✕        | Defines regular expressions for allowed value types                     |
| `placeholder`       | `string`                                                                     | —        | ✕        | Input placeholder                                                       |
| `ref`               | `ForwardedRef<HTMLInputElement>`                                             | —        | ✕        | Input element reference                                                 |
| `size`              | [Size dictionary][dictionary-size]                                           | `medium` | ✕        | Size variant                                                            |
| `startAddon`        | `ReactNode`                                                                  | —        | ✕        | Addon rendered before the input                                         |
| `type`              | \[`email` \| `number` \| `password` \| `search` \| `tel` \| `text` \| `url`] | `text`   | ✕        | Input type                                                              |
| `validationState`   | [Validation dictionary][dictionary-validation]                               | —        | ✕        | Type of validation state                                                |
| `validationText`    | \[`ReactNode` \| `ReactNode[]`]                                              | —        | ✕        | Validation text                                                         |
| `value`             | `string`                                                                     | —        | ✕        | Input value \*                                                          |
| `variant`           | [Fill Variants dictionary][dictionary-variant]                               | `fill`   | ✕        | InputContainer variant                                                  |

(\*) When `value` is provided, the component acts as an controlled component and requires an native `onChange` handler to update the value. For more information, please read [React documentation][react-input]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Custom Component

Text field classes are fabricated using `useTextFieldStyleProps` hook. You can use it to create your own custom TextField component.

```tsx
const CustomTextField = (props: SpiritTextFieldProps): JSX.Element => {
  const { classProps, props: modifiedProps } = useTextFieldStyleProps(props);

  return (
    <div className={classProps.root}>
      <input {...modifiedProps} className={classProps.input} />
      <label htmlFor={props.id} className={styleProps.label}>
        {props.label}
      </label>
    </div>
  );
};
```

For detailed information see [TextField][readme-web-textfield] component.

[autocomplete-attr]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[dictionary-variant]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#variant
[react-input]: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-input-addon]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/InputAddon/README.md
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[readme-web-textfield]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/TextField/README.md
