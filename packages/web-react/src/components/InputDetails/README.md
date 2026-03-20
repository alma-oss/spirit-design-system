# InputDetails

InputDetails is a shared component for rendering supplementary content below form field labels.

It can be used internally in the form components via `details` prop.

## Basic Usage

```tsx
<InputDetails>
  <Link
    elementType="button"
    color="inherit"
    underlined="always"
    onClick={() => {
      /* Open terms and conditions modal */
    }}
  >
    See full terms and conditions
  </Link>
</InputDetails>
```

## Usage with Checkbox

```tsx
<Checkbox
  id="consent"
  label="I agree to the terms and conditions"
  isRequired
  details={
    <Link
      elementType="button"
      color="inherit"
      underlined="always"
      onClick={() => {
        /* Open terms and conditions modal */
      }}
    >
      See full terms and conditions
    </Link>
  }
/>
```

## Usage with Toggle

```tsx
<Toggle
  id="consent"
  label="I agree to the terms and privacy policy"
  details={
    <Link
      elementType="button"
      color="inherit"
      underlined="always"
      onClick={() => {
        /* Open terms and conditions modal */
      }}
    >
      See full terms and conditions
    </Link>
  }
/>
```

## Disabled State

When the parent component is disabled, the text and links inside InputDetails are automatically dimmed.
You must manually set the `isDisabled` prop on interactive elements (Link, Button) inside the `details` prop.

**Note:** The `isDisabled` prop on Link/Button components is required for proper keyboard and screen reader behavior.

### With Disabled Checkbox

```tsx
<Checkbox
  id="consent"
  label={
    <Text elementType="span" emphasis="semibold">
      I agree to the terms and conditions
    </Text>
  }
  isDisabled
  isRequired
  details={
    <>
      <Text marginBottom="space-0">We want to keep you informed</Text>
      <Link elementType="button" color="inherit" underlined="always" isDisabled>
        See full terms and conditions
      </Link>
    </>
  }
/>
```

### With Disabled Toggle

```tsx
<Toggle
  id="consent"
  label="I agree to the terms and conditions"
  isDisabled
  isRequired
  inputPosition="end"
  validationState="danger"
  helperText="Please read the documents carefully before agreeing"
  validationText="You must agree to continue"
  details={
    <>
      <Link elementType="button" color="inherit" underlined="always" isDisabled>
        See full terms and conditions
      </Link>
      <Link elementType="button" color="inherit" underlined="always" isDisabled>
        See privacy policy
      </Link>
    </>
  }
/>
```

## Accessibility

- When used inside Checkbox or Toggle, the `details` content is linked to the input via the `aria-details` attribute
- Checkbox and Toggle use the `useAriaIds` hook internally to register the InputDetails `id` and set the `aria-details` attribute on the input element
- Use `Link` component with `elementType="button"` for modal triggers (not `<a>` tags) for better accessibility
- The `aria-details` attribute is separate from `aria-describedby` used by helper text and validation text
  - `aria-describedby` announces essential information immediately (helper text, validation messages)
  - `aria-details` points to supplementary content that users can explore when needed (terms links, additional info)

## API

| Name                  | Type                  | Default | Required | Description                                        |
| --------------------- | --------------------- | ------- | -------- | -------------------------------------------------- |
| `children`            | `ReactNode`           | —       | ✓        | Content to render, such as links or modal triggers |
| `elementType`         | `ElementType`         | `div`   | ✕        | HTML element to render as                          |
| `id`                  | `string`              | —       | ✕        | Element ID for `aria-details` linking              |
| `registerAriaDetails` | `RegisterDetailsType` | —       | ✕        | Callback to register/unregister `aria-details` IDs |

The component accepts [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
