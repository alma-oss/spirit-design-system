# InputContainer

InputContainer is a shared wrapper for box-field inputs.

## Basic Usage

```tsx
import { InputContainer } from '@alma-oss/spirit-web-react';
```

```tsx
<InputContainer size="medium">
  <input id="input-container-default" name="default" type="text" placeholder="Placeholder" />
</InputContainer>
```

## Size Source and Precedence

InputContainer resolves `size` in this order:

1. direct `size` prop on InputContainer
2. `size` from parent `PropsProvider` context (e.g. from TextFieldBase)

This lets standalone usage set size explicitly while composed form-field components
can share size through context.

The same precedence applies to `variant`, `isDisabled`, and `validationState` (for example from
`TextFieldBase` via `PropsProvider`).

## Variants

InputContainer supports `fill` (default) and `outline` variants:

```tsx
<InputContainer variant="fill" size="medium">
  <input id="input-container-variant-fill" name="variantFill" type="text" placeholder="Placeholder" />
</InputContainer>

<InputContainer variant="outline" size="medium">
  <input id="input-container-variant-outline" name="variantOutline" type="text" placeholder="Placeholder" />
</InputContainer>
```

## Input Width

You can use the native input `size` attribute to set width by character count:

```tsx
<InputContainer size="medium">
  <input id="input-container-input-size" name="inputSize" type="text" size={4} placeholder="MMYY" />
</InputContainer>
```

## API

| Name              | Type                                           | Default  | Required | Description                                                                 |
| ----------------- | ---------------------------------------------- | -------- | -------- | --------------------------------------------------------------------------- |
| `children`        | `ReactNode`                                    | —        | ✓        | Content rendered inside InputContainer                                      |
| `elementType`     | `ElementType`                                  | `div`    | ✕        | HTML element or React component used as wrapper                             |
| `isDisabled`      | `bool`                                         | —        | ✕        | Disabled styling (`InputContainer--disabled`); can come from parent context |
| `size`            | [Size dictionary][dictionary-size]             | `medium` | ✕        | Size modifier; overrides context when provided                              |
| `validationState` | [Validation dictionary][dictionary-validation] | —        | ✕        | Border validation styling; can come from parent context                     |
| `variant`         | [Fill Variants dictionary][dictionary-variant] | `fill`   | ✕        | Variant modifier; overrides context when provided                           |

On top of the API options, the component accepts [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[dictionary-variant]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#variant
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
