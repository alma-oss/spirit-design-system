# HelperText

HelperText is a component used to display helper text for form field components.

## Basic Usage

```tsx
import { HelperText } from '@alma-oss/spirit-web-react';
```

```tsx
<HelperText helperText="Helper text" />
```

When used inside TextField, Select, Checkbox, Radio, Toggle, Slider, FileUploader, FieldGroup, or Item, the parent provides context so the correct variant and disabled state are applied automatically.

## With Explicit Props

You can override context by passing props directly:

```tsx
<HelperText
  id="my-helper-text"
  helperText="Helper text"
  elementType="span"
  isDisabled
  formFieldVariant={FormFieldVariants.INLINE}
/>
```

### API

| Name               | Type                                                   | Default | Required | Description                                                   |
| ------------------ | ------------------------------------------------------ | ------- | -------- | ------------------------------------------------------------- |
| `elementType`      | `React.ElementType`                                    | `div`   | ✕        | Type of element used as main wrapper                          |
| `formFieldVariant` | `FormFieldVariant`                                     | —       | ✕        | Visual variant; when not set, taken from parent context       |
| `helperText`       | `ReactNode`                                            | —       | ✕        | Content to display                                            |
| `id`               | `string`                                               | —       | ✕        | Element id (e.g. for `aria-describedby`)                      |
| `isDisabled`       | `boolean`                                              | —       | ✕        | Disabled state; when not set, taken from parent context       |
| `registerAria`     | `(payload: { add?: string; remove?: string }) => void` | —       | ✕        | Callback to register this element's id for `aria-describedby` |

On top of the API options, the component accepts [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Variants

- **box**: Used by TextField, TextArea, Select, Slider, Toggle, FileUploader, FieldGroup.
- **inline**: Used by Checkbox and Radio (non-item). Keeps helper text above the label and selectable.
- **item**: Used by Item and by Checkbox/Radio in item variant.

[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
