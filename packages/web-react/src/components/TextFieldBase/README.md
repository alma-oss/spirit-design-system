# TextFieldBase

This is React implementation of the abstract component TextFieldBase for the purposes of the form components [TextField][textfield] and [TextArea][textarea].

Basic example usage:

```jsx
<TextFieldBase id="text-field-base-default" label="Example TextFieldBase" name="textFieldBaseDefault" />
```

Advanced example usage:

```jsx
<TextFieldBase
  hasValidationIcon
  helperText="custom helper text"
  id="text-field-base-advanced"
  isMultiline
  isRequired
  label="Example multiline TextFieldBase"
  name="textFieldBaseAdvanced"
  placeholder="Placeholder"
  validationState="danger"
  validationText="validation failed"
/>
```

TextFieldBase with password toggle (button to reveal the password):

```jsx
<TextFieldBase
  hasPasswordToggle
  id="text-field-base-password-toggle"
  isRequired
  label="Password"
  name="textFieldBasePasswordToggle"
  placeholder="Placeholder"
  validationState="danger"
  validationText="validation failed"
/>
```

## API

| Name                | Type                                                                         | Default | Required | Description                                                             |
| ------------------- | ---------------------------------------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------- |
| `autoComplete`      | `string`                                                                     | —       | ✕        | [Automated assistance in filling][autocomplete-attr]                    |
| `hasPasswordToggle` | `bool`                                                                       | —       | ✕        | If true, the `type` is set to `password` and a password toggle is shown |
| `hasValidationIcon` | `bool`                                                                       | `false` | ✕        | Whether to show validation icon                                         |
| `helperText`        | `string`                                                                     | —       | ✕        | Custom helper text                                                      |
| `id`                | `string`                                                                     | —       | ✓        | Input and label identification                                          |
| `isDisabled`        | `bool`                                                                       | —       | ✕        | Whether is field disabled                                               |
| `isLabelHidden`     | `bool`                                                                       | —       | ✕        | Whether is label hidden                                                 |
| `isMultiline`       | `bool`                                                                       | —       | ✕        | Whether is DOM element `textarea`                                       |
| `isRequired`        | `bool`                                                                       | —       | ✕        | Whether is field required                                               |
| `label`             | `string`                                                                     | —       | ✕        | Label text                                                              |
| `name`              | `string`                                                                     | —       | ✕        | Input name                                                              |
| `pattern`           | `string`                                                                     | —       | ✕        | Defines regular expressions for allowed value types                     |
| `placeholder`       | `string`                                                                     | —       | ✕        | Input placeholder                                                       |
| `ref`               | `ForwardedRef<HTMLInputElement or HTMLTextAreaElement>`                      | —       | ✕        | Field element reference                                                 |
| `type`              | \[`email` \| `number` \| `password` \| `search` \| `tel` \| `text` \| `url`] | —       | ✕        | Input type                                                              |
| `validationState`   | [Validation dictionary][dictionary-validation]                               | —       | ✕        | Type of validation state.                                               |
| `validationText`    | \[`string` \| `string[]`]                                                    | —       | ✕        | Validation text                                                         |
| `value`             | `string`                                                                     | —       | ✕        | Input value                                                             |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[autocomplete-attr]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[textarea]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/TextArea/README.md
[textfield]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/TextField/README.md
