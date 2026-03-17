# Label

Label is a standalone component for form field labels with consistent styling across all form components.

## Basic Usage

```tsx
import { Label } from '@alma-oss/spirit-web-react';
```

```tsx
<Label htmlFor="my-input">Label text</Label>
```

When used inside TextFieldBase, Checkbox, Radio, Toggle, Select, Slider, FileUploader, or UNSTABLE_FileUpload, the parent provides context so the correct variant (box, inline, item), required indicator, disabled state, and hidden state are applied automatically.

## With Explicit Props

You can override context by passing props directly:

```tsx
<Label htmlFor="my-input" formFieldVariant={FormFieldVariants.BOX} isRequired isDisabled={false} isLabelHidden={false}>
  Label text
</Label>
```

### API

| Name               | Type                | Default | Required | Description                                                                 |
| ------------------ | ------------------- | ------- | -------- | --------------------------------------------------------------------------- |
| `children`         | `ReactNode`         | —       | ✕        | Label content                                                               |
| `elementType`      | `React.ElementType` | `label` | ✕        | Type of element used as root (e.g. `label`, `span`)                         |
| `formFieldVariant` | `FormFieldVariant`  | `BOX`   | ✕        | Visual variant (box, inline, item); when not set, taken from parent context |
| `for` / `htmlFor`  | `string`            | —       | ✕        | ID of the associated form control (for `elementType="label"`)               |
| `isDisabled`       | `boolean`           | `false` | ✕        | Disabled state; when not set, taken from parent context                     |
| `isItem`           | `boolean`           | `false` | ✕        | When true with inline variant, applies both inline and item label modifiers |
| `isLabelHidden`    | `boolean`           | `false` | ✕        | Visually hide label while keeping it accessible; from parent context        |
| `isRequired`       | `boolean`           | `false` | ✕        | Shows required indicator; when not set, taken from parent context           |

On top of the API options, the component accepts [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Variants

- **box**: Used by TextFieldBase, Select, Slider, FileUploader, UNSTABLE_FileUpload. Label above the input.
- **inline**: Used by Checkbox, Radio, Toggle. Label next to the input.
- **item**: Used by Checkbox/Radio in item mode; combined with inline for `Label--inline Label--item`.

[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
