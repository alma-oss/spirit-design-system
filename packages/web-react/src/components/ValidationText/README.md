# ValidationText

ValidationText is a standalone component used to display validation messages for form field components.

## Basic Usage

```tsx
import { ValidationText } from '@alma-oss/spirit-web-react';
```

```tsx
<ValidationText validationText="Danger validation text" />
```

When used inside form field components such as [Checkbox][readme-checkbox], [Radio][readme-radio], [TextField][readme-textfield], or [Toggle][readme-toggle], the parent provides context so the correct variant and disabled state are applied automatically. Validation state can also be taken from the parent context for styling, but the icon is rendered only when `validationStateIcon` is set. When composing fields manually, pass `validationStateIcon` from the field's `validationState` when `hasValidationIcon` is enabled — the same pattern built-in form fields use.

## With Explicit Props

You can override context by passing props directly:

```tsx
<ValidationText
  elementType="span"
  id="my-validation-text"
  isDisabled={false}
  validationStateIcon="danger"
  validationText="Danger validation text"
/>
```

## Role Attribute

When displaying validation text dynamically, set [`role="alert"`][aria-alert-role] on the component so screen readers announce updates. Use the `useValidationTextRole` hook to get the role value when validation state or text changes.

### API

| Name                  | Type                                                   | Default | Required | Description                                                                                                      |
| --------------------- | ------------------------------------------------------ | ------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `elementType`         | `ElementType`                                          | `div`   | ✕        | Element used as main wrapper. When `validationText` is an array, the component renders a `ul` inside the wrapper |
| `id`                  | `string`                                               | —       | ✕        | Element id (e.g. for `aria-describedby`)                                                                         |
| `isDisabled`          | `bool`                                                 | `false` | ✕        | Disabled state; when omitted, taken from parent context                                                          |
| `registerAria`        | `(payload: { add?: string; remove?: string }) => void` | —       | ✕        | Callback to register this element's id for `aria-describedby`                                                    |
| `role`                | `AriaRole`                                             | —       | ✕        | ARIA role (e.g. `alert` for dynamic validation)                                                                  |
| `validationStateIcon` | [Validation dictionary][dictionary-validation]         | —       | ✕        | When set, shows validation icon and applies state styling (e.g. `danger`)                                        |
| `validationText`      | `ReactNode` \| `ReactNode[]`                           | —       | ✕        | Validation message or messages to display                                                                        |

On top of the API options, the component accepts [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[aria-alert-role]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-checkbox]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Checkbox/README.md
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-radio]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Radio/README.md
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[readme-textfield]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/TextField/README.md
[readme-toggle]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Toggle/README.md
