# InputAddon

InputAddon is a layout wrapper for controls placed beside an input inside [InputContainer][web-input-container] (for example a password visibility toggle or trailing icon button).

## Basic Usage

```tsx
import { InputAddon, InputContainer } from '@alma-oss/spirit-web-react';
```

```tsx
<InputContainer size="medium">
  <input id="example" type="password" name="example" placeholder="Password" />
  <InputAddon>{/* e.g. ControlButton */}</InputAddon>
</InputContainer>
```

When the addon is **non-interactive** (icon or currency text only), render it as a `<label>` so clicks focus the field:

```tsx
<InputContainer size="medium">
  <InputAddon elementType="label" htmlFor="amount-eur">
    <span aria-hidden="true">€</span>
  </InputAddon>
  <input id="amount-eur" type="text" name="amountEur" placeholder="0,00" inputMode="decimal" />
</InputContainer>
```

Do **not** use `elementType="label"` when the addon wraps a `<button>` or `<a>`.

## Size Source and Precedence

InputAddon resolves `size` in this order:

1. direct `size` prop on InputAddon
2. `size` from parent `PropsProvider` context (e.g. from TextFieldBase)
3. default `medium` size

This keeps addon content visually aligned with the surrounding InputContainer in composed form-field components,
while standalone usage can still set size explicitly.

ℹ️ Nested `Icon` and `ControlButton` components use the resolved InputAddon size by default, so explicit `boxSize` of the `Icon` or `size` of the `ControlButton` is usually unnecessary when the addon is inside a form field.

## API

| Name          | Type                               | Default  | Required | Description                                                                                        |
| ------------- | ---------------------------------- | -------- | -------- | -------------------------------------------------------------------------------------------------- |
| `children`    | `ReactNode`                        | —        | ✕        | Addon content (commonly a control button)                                                          |
| `elementType` | `ElementType`                      | `div`    | ✕        | Element used as the addon wrapper                                                                  |
| `htmlFor`     | `string`                           | —        | ✕        | Same as [label `htmlFor`][mdn-label-htmlfor]: sibling control `id`; use with `elementType="label"` |
| `size`        | [Size dictionary][dictionary-size] | `medium` | ✕        | Size of the Addon; overrides context when provided                                                 |

On top of the API options, the component accepts [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

For detailed information see [InputAddon][web-input-addon] in the web package.

[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[mdn-label-htmlfor]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[web-input-addon]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/InputAddon/README.md
[web-input-container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/InputContainer/README.md
