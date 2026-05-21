# Select

This is React implementation of the [Select][select] component.

Basic example usage:

```tsx
<Select id="select-default" label="Label" name="selectDefault">
  <option value="" selected>
    Placeholder
  </option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

Advanced example usage:

```tsx
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
| `isLabelHidden`     | `bool`                                         | —        | ✕        | Whether is label hidden         |
| `isRequired`        | `bool`                                         | —        | ✕        | Whether is field required       |
| `label`             | `ReactNode`                                    | —        | ✕        | Label text                      |
| `name`              | `string`                                       | —        | ✕        | Select name                     |
| `ref`               | `ForwardedRef<HTMLSelectElement>`              | —        | ✕        | Select element reference        |
| `size`              | [Size dictionary][dictionary-size]             | `medium` | ✕        | Size variant                    |
| `validationState`   | [Validation dictionary][dictionary-validation] | —        | ✕        | Type of validation state        |
| `validationText`    | \[`ReactNode` \| `ReactNode[]`]                | —        | ✕        | Validation text                 |
| `variant`           | [Fill Variants dictionary][dictionary-variant] | `fill`   | ✕        | InputContainer variant          |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Icons

This component uses the `Icon` component internally. To ensure correct rendering,
please refer to the [Icon component documentation][web-react-icon-documentation] for setup instructions.

## Custom Component

Compose your own field using `Label`, `InputContainer`, `InputAddon`, `HelperText`, and `ValidationText`. Wrap with `PropsProvider` so size and validation flow into `InputContainer`, and use `useAriaDescribedBy` for accessible descriptions—same building blocks as `Select` itself.

```tsx
const CustomSelect = (props: SpiritSelectProps): JSX.Element => {
  const {
    'aria-describedby': ariaDescribedBy = '',
    children,
    hasValidationIcon,
    helperText,
    id,
    isDisabled,
    isLabelHidden,
    isRequired,
    label,
    size,
    validationState,
    validationText,
    ...restProps
  } = props;
  const { styleProps, props: transferProps } = useStyleProps(restProps);
  const [ariaDescribedByProp, register] = useAriaDescribedBy(ariaDescribedBy);
  const validationTextRole = useValidationTextRole({
    validationState,
    validationText,
  });

  return (
    <PropsProvider
      value={{
        isDisabled,
        isLabelHidden,
        isRequired,
        size,
        validationState,
      }}
    >
      <div {...styleProps}>
        <Label htmlFor={id}>{label}</Label>
        <InputContainer>
          <select {...transferProps} {...ariaDescribedByProp} id={id} disabled={isDisabled} required={isRequired}>
            {children}
          </select>
          <InputAddon>
            <Icon name="chevron-down" />
          </InputAddon>
        </InputContainer>
        <HelperText id={`${id}-helper-text`} registerAria={register} helperText={helperText} />
        {validationState && (
          <ValidationText
            id={`${id}-validation-text`}
            {...(hasValidationIcon && { hasValidationStateIcon: validationState })}
            validationText={validationText}
            registerAria={register}
            role={validationTextRole}
          />
        )}
      </div>
    </PropsProvider>
  );
};
```

For detailed information see [Select][select] component or [Select][select-element] element.

[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[dictionary-variant]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#variant
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[select-element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
[select]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Select/README.md
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
