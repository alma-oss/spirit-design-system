# InputDetails

InputDetails is a shared subcomponent for rendering supplementary content below form field labels.

It is used internally by [Checkbox][readme-checkbox] and [Toggle][readme-toggle] via their `details` prop.

## Basic Usage

```tsx
<InputDetails>
  <Link href="#" color="inherit" underlined="always">
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
    <Link href="#" color="inherit" underlined="always">
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
    <Link href="#" color="inherit" underlined="always">
      See full terms and conditions
    </Link>
  }
/>
```

## Disabled State

When the parent component (Checkbox or Toggle) is disabled, the text and links inside InputDetails are automatically dimmed via a CSS custom property.
You must manually set the `isDisabled` prop on interactive elements (Link, Button) inside the `details` prop.

**Note:** The `isDisabled` prop on Link/Button components is required for proper keyboard and screen reader behavior.

### With Disabled Checkbox

```tsx
<Checkbox
  id="consent"
  label={<span className="typography-body-medium-semibold">I agree to the terms and conditions</span>}
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
- Checkbox and Toggle use the `useAriaDetails` hook internally to register the InputDetails `id` and set the `aria-details` attribute on the input element
- Use `Link` component with `elementType="button"` for modal triggers (not `<a>` tags) for better accessibility
- The `aria-details` attribute is separate from `aria-describedby` used by helper text and validation text

## API

| Name                  | Type                  | Default | Required | Description                                        |
| --------------------- | --------------------- | ------- | -------- | -------------------------------------------------- |
| `children`            | `ReactNode`           | —       | ✓        | Content to render, typically modal trigger links   |
| `elementType`         | `ElementType`         | `div`   | ✕        | HTML element to render as                          |
| `id`                  | `string`              | —       | ✕        | Element ID for `aria-details` linking              |
| `registerAriaDetails` | `RegisterDetailsType` | —       | ✕        | Callback to register/unregister `aria-details` IDs |

The component accepts [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-checkbox]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Checkbox/README.md
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[readme-toggle]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Toggle/README.md
