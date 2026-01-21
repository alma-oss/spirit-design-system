# Radio

Use Radio when you have a group of mutually exclusive choices and only one selection from the group is allowed.
It has input and label.
It can be disabled or have a validation state.
The label can be hidden.

Basic example usage:

```jsx
<Radio id="radio-default" isChecked label="Label" name="radioDefault" />
```

Advanced example usage:

```jsx
<Radio
  autocomplete="off"
  helperText="Helper text"
  id="radio-advanced"
  isChecked
  label="some label"
  name="radioAdvanced"
  validationState="danger"
/>
```

## Input Position

The `inputPosition` prop allows you to position the input to the `start` (default) or `end` of the label:

```jsx
<Radio id="radio-start" label="Input at Start (default)" inputPosition="start" />
<Radio id="radio-end" label="Input at End" inputPosition="end" />
```

### Responsive Input Position

Pass an object to adjust the input position based on the [breakpoint][dictionary-breakpoint]:

```jsx
<Radio id="radio-responsive" label="Responsive Input Position" inputPosition={{ mobile: 'end', tablet: 'start' }} />
```

## API

| Name              | Type                                           | Default | Required | Description                                                                               |
| ----------------- | ---------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------- |
| `autoComplete`    | `string`                                       | -       | ✕        | [Automated assistance in filling][autocomplete-attr]                                      |
| `helperText`      | `ReactNode`                                    | -       | ✕        | Helper text                                                                               |
| `id`              | `string`                                       | -       | ✓        | Input and label identification                                                            |
| `inputPosition`   | \[`string` \| `object`]                        | `start` | ✕        | Position of the input (`start` or `end`), supports [responsive][readme-responsive] values |
| `isDisabled`      | `boolean`                                      | -       | ✕        | Whether is field disabled                                                                 |
| `isChecked`       | `boolean`                                      | -       | ✕        | Whether is field checked                                                                  |
| `isItem`          | `boolean`                                      | -       | ✕        | To render in [Item][item] mode                                                            |
| `isLabelHidden`   | `boolean`                                      | -       | ✕        | Whether is label hidden                                                                   |
| `label`           | `ReactNode`                                    | -       | ✕        | Label text                                                                                |
| `name`            | `string`                                       | -       | ✕        | Input name                                                                                |
| `ref`             | `ForwardedRef<HTMLInputElement>`               | -       | ✕        | Input element reference                                                                   |
| `validationState` | [Validation dictionary][dictionary-validation] | -       | ✕        | Type of validation state                                                                  |
| `value`           | `string`                                       | -       | ✕        | Input value                                                                               |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Custom Component

Text field classes are fabricated using `useRadioStyleProps` hook. You can use it to create your own custom Radio component.

```jsx
const CustomRadio = (props: SpiritRadioProps): JSX.Element => {
  const { id } = props;
  const { classProps, props: modifiedProps } = useRadioStyleProps(props);

  const labelId = `${id}-label`;
  const helperTextId = `${id}-helper-text`;

  return (
    <div className={classProps.root}>
      <input {...modifiedProps} id={id} className={classProps.input} aria-describedby={helperTextId} />
      <div className={styleProps.text}>
        <label className={styleProps.label} htmlFor={id}>{props.label}</label>
        <div className={styleProps.helperText} id={helperTextId}>{props.helperText}</div>
      </div>
    </div>
  );
};
```

For detailed information see [Radio](https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Radio/README.md) component

[autocomplete-attr]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[item]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Item/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-responsive]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#responsive-props
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
