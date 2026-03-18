# TextArea

TextArea enables the user to add longer text to a form.
It could be disabled or have a validation state with optional validation text.
The label could be hidden and show if the textarea is required.

Basic example usage:

```tsx
<TextArea id="text-area-default" label="Label" name="textAreaDefault" />
```

Advanced example usage:

```tsx
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

```tsx
<TextArea id="example" label="Label" name="example" isAutoResizing autoResizingMaxHeight={500} />
```

## Counter

The counter displays the current character count. It can be shown in two modes:

1. **With threshold** (`counterThreshold`): Shows `current/threshold` (e.g. `5/200`). Setting `counterThreshold` automatically enables the counter.
2. **Count only** (`hasCounter`): Shows just the current count (e.g. `5`).

The counter itself is purely informational — it does not set any validation state or validation text.
If you need to show an error when the limit is exceeded, control `validationState` and `validationText` yourself.

### Native `maxLength` (counter On)

When the counter is shown (`counterThreshold` and/or `hasCounter`), Spirit applies HTML `maxLength` as a safety net (very long input can hurt browser performance).

- If you **do not** pass `maxLength`, the textarea uses the library's internal upper bound (`10000`).
- If you **do** pass `maxLength`, your value is used directly.
- Default behavior we want: keep `maxLength` open (or high) and handle over-limit UI via `counterThreshold` + your own validation state/text.
- If you set `maxLength` to the same value as `counterThreshold` (e.g. both `200`), native hard cap applies: users cannot paste/type over the limit and over-limit validation state will not be reached.

Without the counter, Spirit does not add `maxLength`; you can still set it yourself via the normal textarea attribute.

Counter with threshold (default, soft-limit behavior):

```tsx
<TextArea id="text-area-counter" label="Label" counterThreshold={200} />
```

Counter showing only the count:

```tsx
<TextArea id="text-area-counter-only" label="Label" hasCounter />
```

Counter with minimum length hint — use `helperText` to communicate the expected range:

```tsx
<TextArea id="text-area-range" label="Label" counterThreshold={200} helperText="Write between 100 and 200 characters" />
```

or just a minimum:

```tsx
<TextArea id="text-area-min" label="Label" counterThreshold={500} helperText="Write at least 100 characters" />
```

Counter with threshold and hard cap (less preferred, use only when you want strict native blocking):

```tsx
<TextArea id="text-area-counter-hard-cap" label="Label" counterThreshold={200} maxLength={200} />
```

### Counter Accessibility

The counter uses a two-element pattern so that sighted users and screen reader users each get
an optimized experience:

1. **Visible counter** (`.TextArea__counter`): Displays the compact `current/max` or count-only format with `aria-hidden="true"`
   so screen readers skip it.
2. **Screen reader message** (`VisuallyHidden`): A human-readable, debounced message (e.g.
   "195 characters remaining" or "5 characters entered") linked to the textarea via `aria-describedby`
   and announced through `aria-live="polite"`.

## API

| Name                    | Type                                           | Default  | Required | Description                                                                     |
| ----------------------- | ---------------------------------------------- | -------- | -------- | ------------------------------------------------------------------------------- |
| `autoComplete`          | `string`                                       | -        | ✕        | [Automated assistance in filling][autocomplete-attr]                            |
| `autoResizingMaxHeight` | `number`                                       | `400`    | ✕        | Maximum field height with automatic height control                              |
| `counterThreshold`      | `number`                                       | —        | ✕        | Character threshold; shows `current/threshold` counter                          |
| `hasCounter`            | `bool`                                         | —        | ✕        | Show character counter (count only); auto `true` with `counterThreshold`        |
| `maxLength`             | `number`                                       | —        | ✕        | Native textarea hard cap; with `counterThreshold`, prefer `>= counterThreshold` |
| `hasValidationIcon`     | `bool`                                         | `false`  | ✕        | Whether to show validation icon                                                 |
| `helperText`            | `string`                                       | —        | ✕        | Custom helper text                                                              |
| `id`                    | `string`                                       | —        | ✓        | Textarea and label identification                                               |
| `isAutoResizing`        | `bool`                                         | —        | ✕        | Whether is field auto resizing which adjusts its height while typing            |
| `isDisabled`            | `bool`                                         | —        | ✕        | Whether is field disabled                                                       |
| `isLabelHidden`         | `bool`                                         | —        | ✕        | Whether is label hidden                                                         |
| `isRequired`            | `bool`                                         | —        | ✕        | Whether is field required                                                       |
| `label`                 | `ReactNode`                                    | —        | ✓        | Label text                                                                      |
| `name`                  | `string`                                       | —        | ✕        | Textarea name                                                                   |
| `placeholder`           | `string`                                       | —        | ✕        | Textarea placeholder                                                            |
| `ref`                   | `ForwardedRef<HTMLTextAreaElement>`            | —        | ✕        | Textarea element reference                                                      |
| `rows`                  | `number`                                       | —        | ✕        | Number of visible rows                                                          |
| `size`                  | [Size dictionary][dictionary-size]             | `medium` | ✕        | Size variant                                                                    |
| `validationState`       | [Validation dictionary][dictionary-validation] | —        | ✕        | Type of validation state                                                        |
| `validationText`        | \[`ReactNode` \| `ReactNode[]`]                | —        | ✕        | Validation text                                                                 |
| `value`                 | `string`                                       | —        | ✕        | Textarea value                                                                  |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Custom Component

Text field classes are fabricated using `useTextAreaStyleProps` hook. You can use it to create your own custom TextArea component.

```tsx
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
