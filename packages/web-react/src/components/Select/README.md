# Select

This is React implementation of the [Select][select] component.

Basic example usage:

```jsx
<Select id="select-default" label="Label" name="selectDefault">
  <option value="" selected>
    Placeholder
  </option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

Advanced example usage:

```jsx
<Select
  hasValidationIcon
  id="select-advanced"
  name="selectAdvanced"
  size="large"
  validationState="danger"
  validationText="validation failed"
  isRequired
>
  <option value="" selected disabled>
    Placeholder
  </option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

## API

| Name                | Type                                           | Default  | Required | Description                     |
| ------------------- | ---------------------------------------------- | -------- | -------- | ------------------------------- |
| `children`          | `ReactNode`                                    | `null`   | ✕        | Content of the Select           |
| `hasValidationIcon` | `bool`                                         | `false`  | ✕        | Whether to show validation icon |
| `helperText`        | `string`                                       | —        | ✕        | Custom helper text              |
| `id`                | `string`                                       | —        | ✓        | Select and label identification |
| `isDisabled`        | `bool`                                         | —        | ✕        | Whether is field disabled       |
| `isFluid`           | `bool`                                         | —        | ✕        | Whether is field is fluid       |
| `isLabelHidden`     | `bool`                                         | —        | ✕        | Whether is label hidden         |
| `isRequired`        | `bool`                                         | —        | ✕        | Whether is field required       |
| `label`             | `ReactNode`                                    | —        | ✕        | Label text                      |
| `name`              | `string`                                       | —        | ✕        | Select name                     |
| `ref`               | `ForwardedRef<HTMLSelectElement>`              | —        | ✕        | Select element reference        |
| `size`              | [Size dictionary][dictionary-size]             | `medium` | ✕        | Size variant                    |
| `validationState`   | [Validation dictionary][dictionary-validation] | —        | ✕        | Type of validation state        |
| `validationText`    | \[`ReactNode` \| `ReactNode[]`]                | —        | ✕        | Validation text                 |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Icons

This component uses the `Icon` component internally. To ensure correct rendering,
please refer to the [Icon component documentation][web-react-icon-documentation] for setup instructions.

## Custom Component

Select classes are fabricated using `useSelectStyleProps` hook. You can use it to create your own custom Select component.

```jsx
const CustomSelect = (props: SpiritSelectProps): JSX.Element => {
  const { classProps, props: modifiedProps } = useSelectStyleProps(props);
  const { styleProps, props: transferProps } = useStyleProps(restProps);

  const renderValidationText = useValidationText({
    validationTextClassName: classProps.validationText,
    validationState,
    validationText,
    requireValidationState: false,
  });

  return (
    <div {...styleProps} className={classNames(classProps.root, styleProps.className)}>
      <label htmlFor={id} className={classProps.label}>
        {label}
      </label>
      <div className={classProps.container}>
        <select {...transferProps} id={id} className={classProps.input} ref={ref}>
          {children}
        </select>
        <div className={classProps.icon}>
          <Icon name={iconName} />
        </div>
      </div>
      {helperText && <div className={classProps.helperText}>{helperText}</div>}
      {renderValidationText}
    </div>
  );
};
```

For detailed information see [Select][select] component or [Select][select-element] element.

[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[select-element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
[select]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Select/README.md
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
