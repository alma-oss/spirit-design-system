# HelperText

HelperText is a component used to display helper text for form field components.

## Basic Usage

```tsx
import { HelperText } from '@alma-oss/spirit-web-react';
```

```tsx
<HelperText helperText="Helper text" />
```

When used inside form components like ([TextField][readme-textfield], [Checkbox][readme-checkbox], [Toggle][readme-toggle], [Item][readme-item], etc.), the parent provides context so the correct variant and disabled state are applied automatically.

## With Explicit Props

You can override context by passing props directly:

```tsx
<HelperText id="my-helper-text" helperText="Helper text" elementType="span" isDisabled formFieldVariant="inline" />
```

### API

| Name               | Type                                                   | Default | Required | Description                                                                                             |
| ------------------ | ------------------------------------------------------ | ------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `elementType`      | `ElementType`                                          | `div`   | ✕        | Type of element used as main wrapper                                                                    |
| `formFieldVariant` | `FormFieldVariant`                                     | —       | ✕        | Explicit visual variant (`inline`, `item`); omit for the default layout, or take it from parent context |
| `helperText`       | `ReactNode`                                            | —       | ✓        | Content to display                                                                                      |
| `id`               | `string`                                               | —       | ✕        | Element id (e.g. for `aria-describedby`)                                                                |
| `isDisabled`       | `bool`                                                 | `false` | ✕        | Disabled state; when omitted, taken from parent context                                                 |
| `registerAria`     | `(payload: { add?: string; remove?: string }) => void` | —       | ✕        | Callback to register this element's id for `aria-describedby`                                           |

On top of the API options, the component accepts [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Variants

- **inline**: Used by Toggle, Checkbox, and Radio (non-item). Keeps helper text above the label and selectable.
- **item**: Used by Item and by Checkbox or Radio in item variant.

[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[readme-checkbox]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Checkbox/README.md
[readme-textfield]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/TextField/README.md
[readme-toggle]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Toggle/README.md
