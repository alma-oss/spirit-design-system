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

## ARIA ID Ref Hooks

The ARIA ID ref hooks manage dynamic lists of ARIA ID references used for relationship attributes like
`aria-describedby` and `aria-details`. Form field subcomponents (HelperText, ValidationText,
[InputDetails][readme-input-details]) register their IDs through the returned `register` callback,
and the hook returns ready-to-spread props for the input element.

### useAriaDescribedBy

Manages IDs for the `aria-describedby` attribute:

```tsx
const [ariaDescribedByProp, register] = useAriaDescribedBy(props['aria-describedby']);
// ariaDescribedByProp is `{ 'aria-describedby': 'id1 id2' }` or `{}`
```

### useAriaDetails

Manages IDs for the `aria-details` attribute:

```tsx
const [ariaDetailsProp, registerDetails] = useAriaDetails(props['aria-details']);
// ariaDetailsProp is `{ 'aria-details': 'id1' }` or `{}`
```

### Register Callback

The `register` callback accepts an object with optional `add` and `remove` keys:

```tsx
register({ add: 'helper-text-id' }); // adds an ID
register({ remove: 'helper-text-id' }); // removes an ID
```

### useAriaIdRefs (generic)

Both hooks above are convenience wrappers around the generic `useAriaIdRefs` hook:

```tsx
const [ariaProps, register] = useAriaIdRefs('aria-describedby', initialIds);
```

### API

| Name            | Type                                   | Default | Required | Description                            |
| --------------- | -------------------------------------- | ------- | -------- | -------------------------------------- |
| `ariaAttribute` | `'aria-describedby' \| 'aria-details'` | —       | ✓        | ARIA relationship attribute to manage  |
| `initialIds`    | `string`                               | —       | ✕        | Space-separated initial IDs to include |

### Return Value

Returns a tuple `[AriaProps, RegisterType]`:

| Index | Type           | Description                                              |
| ----- | -------------- | -------------------------------------------------------- |
| `0`   | `AriaProps`    | Object to spread on the input (`{}` when no IDs present) |
| `1`   | `RegisterType` | Callback to add/remove IDs                               |

[aria-alert-role]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role
[readme-input-details]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/InputDetails/README.md
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
