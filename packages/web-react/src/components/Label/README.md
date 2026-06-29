# Label

Label is a standalone component used to display labels for form field components.

## Basic Usage

```tsx
import { Label } from '@alma-oss/spirit-web-react';
```

```tsx
<Label htmlFor="my-input">Label text</Label>
```

When used inside form field components such as [Checkbox][readme-checkbox], [Radio][readme-radio], [TextField][readme-textfield], or [Toggle][readme-toggle], the parent provides context so the correct styling, required indicator, disabled state, and hidden state are applied automatically.

## With Explicit Props

You can override context by passing props directly:

```tsx
<Label htmlFor="my-input" hasPointerCursor isRequired isDisabled={false} isLabelHidden={false}>
  Label text
</Label>
```

### API

| Name               | Type          | Default | Required | Description                                                                |
| ------------------ | ------------- | ------- | -------- | -------------------------------------------------------------------------- |
| `children`         | `ReactNode`   | —       | ✕        | Label content                                                              |
| `elementType`      | `ElementType` | `label` | ✕        | Type of element used as root (e.g. `label`, `span`)                        |
| `for` / `htmlFor`  | `string`      | —       | ✕        | ID of the associated form control (for `elementType="label"`)              |
| `hasPointerCursor` | `bool`        | `false` | ✕        | Applies a pointer cursor; set automatically by Checkbox, Radio, and Toggle |
| `isDisabled`       | `bool`        | `false` | ✕        | Disabled state; when not set, taken from parent context                    |
| `isLabelHidden`    | `bool`        | `false` | ✕        | Visually hide label while keeping it accessible; from parent context       |
| `isRequired`       | `bool`        | `false` | ✕        | Shows required indicator; when not set, taken from parent context          |
| `isStretched`      | `bool`        | `false` | ✕        | Applies `element-stretched` helper; set automatically in item mode         |

On top of the API options, the component accepts [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Pointer Cursor

When used inside [Checkbox][readme-checkbox], [Radio][readme-radio], or [Toggle][readme-toggle],
the label automatically receives a pointer cursor via `hasPointerCursor`. The cursor is suppressed
when the field is disabled.

You can also set it explicitly on a standalone Label:

```tsx
<Label htmlFor="my-input" hasPointerCursor>
  Label text
</Label>
```

[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-checkbox]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Checkbox/README.md
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-radio]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Radio/README.md
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[readme-textfield]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/TextField/README.md
[readme-toggle]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Toggle/README.md
