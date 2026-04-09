# FieldGroup

FieldGroup is a component that groups form fields together.
Additionally, it provides a common label, helper text, and validation messages for all fields in the group.

## Basic Usage

```tsx
<FieldGroup id="example-field-group" label="Label">
  {/* Form fields… */}
</FieldGroup>
```

⚠️ **The FieldGroup component does not provide all necessary semantics and any styling to its child fields. It is up
to the developer to configure the child fields correctly.**

👉 The FieldGroup component implements the `<fieldset>` HTML element. Read more about the advantages and limitations in
the [`web` implementation][gh-web-field-group-html] of `FieldGroup`.

## Required Fields

To render FieldGroup as required, add the `isRequired` prop:

```tsx
<FieldGroup id="example-field-group" label="Label" isRequired>
  {/* Form fields… */}
</FieldGroup>
```

⚠️ The `isRequired` prop is only used to indicate visually that all fields in the group are required. The individual
fields themselves need to be marked as required using the `isRequired` prop.

## Hidden Label

To visually hide the FieldGroup label, add the `isLabelHidden` prop:

```tsx
<FieldGroup id="example-field-group" label="Label" isLabelHidden>
  {/* Form fields… */}
</FieldGroup>
```

⚠️ Remember the `label` prop should be always set to provide an accessible label for the group.

## Helper Text

To render helper text, add the `helperText` prop:

```tsx
<FieldGroup helperText="Helper text" id="example-field-group" label="Label">
  {/* Form fields… */}
</FieldGroup>
```

## Layout

FieldGroup is fluid by default. Use parent layout components such as [`Grid`][readme-grid], [`Stack`][readme-stack], or [`Container`][readme-container] to control the rendered width and positioning.

## Disabled State

To render FieldGroup as required, add the `isDisabled` prop:

```tsx
<FieldGroup id="example-field-group" label="Label" isDisabled>
  {/* Form fields… */}
</FieldGroup>
```

⚠️ Remember to also disable all fields in the group using the `isDisabled` prop.

👉 Read more about the disabled state in the [`web` implementation][gh-web-field-group-disabled] of `FieldGroup`.

## Validation States

Just like any other form component in Spirit, FieldGroup implements the
[Validation state dictionary][dictionary-validation].

Validation states can be presented either by adding the `validationState` attribute.

```tsx
<FieldGroup
  hasValidationIcon
  id="example-field-group"
  label="Label"
  validationState="success"
  validationText="Success validation message"
/>
```

## API

| Name                | Type                                           | Default | Required | Description                              |
| ------------------- | ---------------------------------------------- | ------- | -------- | ---------------------------------------- |
| `form`              | `string`                                       | `null`  | ✕        | Parent form ID                           |
| `hasValidationIcon` | `bool`                                         | `false` | ✕        | Whether to show validation icon          |
| `helperText`        | `ReactNode`                                    | `null`  | ✕        | Custom helper text                       |
| `id`                | `string`                                       | —       | ✓        | Group and label identification           |
| `isDisabled`        | `bool`                                         | `false` | ✕        | If true, the group is disabled           |
| `isLabelHidden`     | `bool`                                         | `false` | ✕        | If true, label is hidden                 |
| `isRequired`        | `bool`                                         | `false` | ✕        | If true, the group is marked as required |
| `label`             | `ReactNode`                                    | —       | ✓        | Label text                               |
| `name`              | `string`                                       | `null`  | ✕        | Group name                               |
| `validationState`   | [Validation dictionary][dictionary-validation] | `null`  | ✕        | Type of validation state                 |
| `validationText`    | \[`ReactNode` \| `ReactNode[]`]                | `null`  | ✕        | Validation text                          |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[gh-web-field-group-disabled]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/FieldGroup#disabled-state
[gh-web-field-group-html]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/FieldGroup#html-semantics
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Container/README.md
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Grid/README.md
[readme-stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Stack/README.md
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
