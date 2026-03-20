# Field

## ValidationText

The ValidationText subcomponent displays validation texts for Field components like TextField, TextArea, Checkbox, FileUploader, etc.

Basic example usage:

```tsx
<ValidationText UNSAFE_className="Component__validationText" validationText="Danger validation text" />
```

Advanced example:

```tsx
<ValidationText
  hasValidationStateIcon
  id="component__validationText"
  UNSAFE_className="Component__validationText"
  elementType="span"
  validationText="Danger validation text"
  role="alert"
/>
```

## Role Attribute

When displaying text dynamically, set [`role="alert"`][aria-alert-role] on the `ValidationText` component to improve accessibility. This will help screen readers notify users about content updates.

### API

| Name                     | Type                                           | Default | Required | Description                                                                                    |
| ------------------------ | ---------------------------------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------- |
| `elementType`            | \[`span` \| `div`]                             | `div`   | ✕        | Type of element used as main wrapper (applied only for single validation text, otherwise `ul`) |
| `hasValidationStateIcon` | [Validation dictionary][dictionary-validation] | -       | ✕        | Whether to show validation icon                                                                |
| `id`                     | `string`                                       | -       | ✕        | Component id                                                                                   |
| `role`                   | `string`                                       | -       | ✕        | The role attribute that describes the role of an element                                       |
| `validationText`         | \[`ReactNode` \| `ReactNode[]`]                | -       | ✕        | Validation text                                                                                |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## HelperText

The HelperText subcomponent displays helper texts for Field components like TextField, TextArea, Checkbox, FileUploader, etc.

```tsx
<HelperText UNSAFE_className="Component__helperText" helperText="Helper text" />
```

Advanced example:

```tsx
<HelperText
  id="component__helperText"
  UNSAFE_className="Component__helperText"
  elementType="span"
  helperText="Helper text"
/>
```

### API

| Name          | Type                            | Default | Required | Description                                                                                    |
| ------------- | ------------------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------- |
| `elementType` | \[`span` \| `div`]              | `div`   | ✕        | Type of element used as main wrapper (applied only for single validation text, otherwise `ul`) |
| `helperText`  | \[`ReactNode` \| `ReactNode[]`] | —       | ✕        | Validation text, only visible if validationState is                                            |
| `id`          | `string`                        | —       | ✕        | Component id                                                                                   |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Label

The `Label` component is used to associate text with a form control, such as an input, checkbox, or radio button.
It improves accessibility by allowing users to click the label to interact with the corresponding input.
This component can be customized using various props to fit different use cases.

Simple Label example:

```tsx
<Label>Label content</Label>
```

### Full Example

```tsx
<Label elementType="span" htmlFor="input-id">
  Label content
</Label>
```

### API

| Name          | Type          | Default | Required | Description                                     |
| ------------- | ------------- | ------- | -------- | ----------------------------------------------- |
| `elementType` | `ElementType` | `label` | ✕        | Type of element used as wrapper                 |
| `htmlFor`     | `string`      | —       | ✕        | ID of the associated form element (e.g., input) |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## useAriaIds

The `useAriaIds` hook manages a dynamic list of ARIA IDs used for attributes like `aria-describedby` and `aria-details`.
Form field subcomponents (HelperText, ValidationText, [InputDetails][readme-input-details]) register their IDs through
the returned `register` callback, and the hook provides the current list of IDs to apply on the input element.

### Usage

```tsx
const [ids, register] = useAriaIds();
```

The `register` callback accepts an object with optional `add` and `remove` keys:

```tsx
register({ add: 'helper-text-id' }); // adds an ID
register({ remove: 'helper-text-id' }); // removes an ID
```

### String Format

By default, `useAriaIds` returns an array of IDs. Pass `{ format: 'string' }` to get a space-separated string
(or `undefined` when empty) — useful for `aria-details` which needs a single string value:

```tsx
const [detailsId, registerDetails] = useAriaIds(undefined, { format: 'string' });
// detailsId is `string | undefined`
```

### Initializing with Existing IDs

Pass an existing space-separated ID string to preserve consumer-provided ARIA attributes:

```tsx
const [ids, register] = useAriaIds(props['aria-describedby']);
```

### API

| Name           | Type                             | Default              | Required | Description                            |
| -------------- | -------------------------------- | -------------------- | -------- | -------------------------------------- |
| `otherAriaIds` | `string`                         | —                    | ✕        | Space-separated initial IDs to include |
| `options`      | `{ format: 'list' \| 'string' }` | `{ format: 'list' }` | ✕        | Output format: array or joined string  |

### Return Value

| Format     | Return Type                           | Description                                   |
| ---------- | ------------------------------------- | --------------------------------------------- |
| `'list'`   | `[string[], RegisterType]`            | Array of IDs and register callback            |
| `'string'` | `[string \| undefined, RegisterType]` | Joined IDs string (or undefined) and callback |

[aria-alert-role]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role
[readme-input-details]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/InputDetails/README.md
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
