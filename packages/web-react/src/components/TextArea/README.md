# TextArea

TextArea enables the user to add longer text to a form.
It could be disabled or have a validation state with optional validation text.
The label could be hidden and show if the textarea is required.

Basic example usage:

```jsx
<TextArea id="text-area-default" label="Label" name="textAreaDefault" />
```

Advanced example usage:

```jsx
<TextArea
  hasValidationIcon
  helperText="custom helper text"
  id="text-area-advanced"
  isRequired
  label="Label"
  maxlength="180"
  name="textAreaAdvanced"
  placeholder="Placeholder"
  rows="10"
  size="large"
  validationState="danger"
  validationText="validation failed"
  value="TextArea"
/>
```

Example with Auto-Height Adjustment

```jsx
<TextArea id="example" label="Label" name="example" isAutoResizing autoResizingMaxHeight={500} />
```

## API

| Name                    | Type                                           | Default  | Required | Description                                                          |
| ----------------------- | ---------------------------------------------- | -------- | -------- | -------------------------------------------------------------------- |
| `autoComplete`          | `string`                                       | -        | ✕        | [Automated assistance in filling][autocomplete-attr]                 |
| `autoResizingMaxHeight` | `number`                                       | `400`    | ✕        | Maximum field height with automatic height control                   |
| `hasValidationIcon`     | `bool`                                         | `false`  | ✕        | Whether to show validation icon                                      |
| `helperText`            | `string`                                       | —        | ✕        | Custom helper text                                                   |
| `id`                    | `string`                                       | —        | ✓        | Textarea and label identification                                    |
| `isAutoResizing`        | `bool`                                         | —        | ✕        | Whether is field auto resizing which adjusts its height while typing |
| `isDisabled`            | `bool`                                         | —        | ✕        | Whether is field disabled                                            |
| `isLabelHidden`         | `bool`                                         | —        | ✕        | Whether is label hidden                                              |
| `isRequired`            | `bool`                                         | —        | ✕        | Whether is field required                                            |
| `label`                 | `ReactNode`                                    | —        | ✓        | Label text                                                           |
| `maxLength`             | `number`                                       | —        | ✕        | Maximum number of characters                                         |
| `name`                  | `string`                                       | —        | ✕        | Textarea name                                                        |
| `placeholder`           | `string`                                       | —        | ✕        | Textarea placeholder                                                 |
| `ref`                   | `ForwardedRef<HTMLTextAreaElement>`            | —        | ✕        | Textarea element reference                                           |
| `rows`                  | `number`                                       | —        | ✕        | Number of visible rows                                               |
| `size`                  | [Size dictionary][dictionary-size]             | `medium` | ✕        | Size variant                                                         |
| `validationState`       | [Validation dictionary][dictionary-validation] | —        | ✕        | Type of validation state                                             |
| `validationText`        | \[`ReactNode` \| `ReactNode[]`]                | —        | ✕        | Validation text                                                      |
| `value`                 | `string`                                       | —        | ✕        | Textarea value                                                       |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Custom Component

Text field classes are fabricated using `useTextAreaStyleProps` hook. You can use it to create your own custom TextArea component.

```jsx
const CustomTextArea = (props: SpiritTextAreaProps): JSX.Element => {
  const { classProps, props: modifiedProps } = useTextAreaStyleProps(props);

  return (
    <div className={classProps.root}>
      <textarea {...modifiedProps} className={classProps.input}></textarea>
      <label htmlFor={props.id} className={styleProps.label}>
        {props.label}
      </label>
    </div>
  );
};
```

For detailed information see [TextArea](https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/TextArea/README.md) component.

[autocomplete-attr]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
