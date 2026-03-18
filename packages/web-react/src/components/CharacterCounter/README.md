# CharacterCounter

Renders the visible character count for a textarea (e.g. `5/200` or `5`) and a debounced, polite screen reader message. It is composed by [TextArea][readme-text-area] (through **TextFieldBase**) when `hasCounter` or `counterThreshold` is set. You can also use it directly if you wire `currentLength`, ARIA registration, and the live region `id` yourself.

## Usage

```tsx
import { CharacterCounter } from '@alma-oss/spirit-web-react';
```

Example aligned with field helpers (visible count + describedby registration):

```tsx
import { CharacterCounter, useAriaIds } from '@alma-oss/spirit-web-react';

const [, registerAria] = useAriaIds();

return (
  <CharacterCounter
    id="my-text-area"
    registerAria={registerAria}
    UNSAFE_className="TextArea__counter"
    counterThreshold={200}
    currentLength={value.length}
  />
);
```

With count only (no max in the visible label), reuse the same `registerAria` as in the previous example:

```tsx
return (
  <CharacterCounter
    id="my-text-area"
    registerAria={registerAria}
    UNSAFE_className="TextArea__counter"
    hasCounter
    currentLength={value.length}
  />
);
```

### API

| Name               | Type                                                  | Default | Required | Description                                                                                                       |
| ------------------ | ----------------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `counterThreshold` | `number`                                              | —       | no       | When set, shows `currentLength/threshold` and drives max-oriented screen reader copy.                             |
| `currentLength`    | `number`                                              | —       | yes      | Current number of characters.                                                                                     |
| `hasCounter`       | `bool`                                                | —       | no       | When true, shows the count without a threshold segment.                                                           |
| `id`               | `string`                                              | —       | yes      | Base id for the field; used to build the screen reader message element id (`\${id}__counterScreenReaderMessage`). |
| `registerAria`     | `(params: { add?: string; remove?: string }) => void` | —       | yes      | Adds/removes the screen reader message id from `aria-describedby` (same pattern as helper/validation text).       |

The component renders nothing if neither `hasCounter` nor `counterThreshold` is set.

On top of the API above, the visible counter `div` accepts [style props][readme-style-props], [additional attributes][readme-additional-attributes], and [escape hatches][readme-escape-hatches] (`UNSAFE_className` / `UNSAFE_style`), consistent with other Spirit helpers such as **HelperText**.

[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[readme-text-area]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/TextArea/README.md
