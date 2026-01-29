# TextField

TextField enables the user to type in text information. It has an input, a
label, and an optional helper text. It supports several input types like `text` or
`password` etc. It can be disabled or have a validation state. The label can be
hidden or show if the input is required.

Basic example usage:

```jsx
<TextField id="text-field-default" label="Label" name="textFieldDefault" />
```

Advanced example usage:

```jsx
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

TextField with password toggle (button to reveal the password):

```jsx
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

## API

| Name                | Type                                                                         | Default  | Required | Description                                                             |
| ------------------- | ---------------------------------------------------------------------------- | -------- | -------- | ----------------------------------------------------------------------- |
| `autoComplete`      | `string`                                                                     | —        | ✕        | [Automated assistance in filling][autocomplete-attr]                    |
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
| `type`              | \[`email` \| `number` \| `password` \| `search` \| `tel` \| `text` \| `url`] | `text`   | ✕        | Input type                                                              |
| `validationState`   | [Validation dictionary][dictionary-validation]                               | —        | ✕        | Type of validation state                                                |
| `validationText`    | \[`ReactNode` \| `ReactNode[]`]                                              | —        | ✕        | Validation text                                                         |
| `value`             | `string`                                                                     | —        | ✕        | Input value \*                                                          |

(\*) When `value` is provided, the component acts as an controlled component and requires an native `onChange` handler to update the value. For more information, please read [React documentation][react-input]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Custom Component

Text field classes are fabricated using `useTextFieldStyleProps` hook. You can use it to create your own custom TextField component.

```jsx
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

For detailed information see [TextField](https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/TextField/README.md) component.

[autocomplete-attr]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[react-input]: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
