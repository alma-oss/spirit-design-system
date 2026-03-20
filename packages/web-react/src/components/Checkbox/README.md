# Checkbox

Checkbox enables the user to check/uncheck choice.
It has input, a label, and an optional helperText.
It could be disabled or have a validation state.
The label could be hidden and show if the input is required.

Basic example usage:

```tsx
<Checkbox id="checkbox-default" label="Label" name="checkboxDefault" />
```

Advanced example usage:

```tsx
<Checkbox
  hasValidationIcon
  id="checkbox-advanced"
  isChecked
  isRequired
  name="checkboxAdvanced"
  validationText="validation text"
  validationState="danger"
  helperText="Helper text"
/>
```

## Input Position

The `inputPosition` prop allows you to position the input to the `start` (default) or `end` of the label:

```tsx
<Checkbox id="checkbox-start" label="Input at Start (default)" inputPosition="start" />
<Checkbox id="checkbox-end" label="Input at End" inputPosition="end" />
```

### Responsive Input Position

Pass an object to adjust the input position based on the [breakpoint][dictionary-breakpoint]:

```tsx
<Checkbox
  id="checkbox-responsive"
  label="Responsive Input Position"
  inputPosition={{ mobile: 'end', tablet: 'start' }}
/>
```

## Consent with Details

For consent scenarios where users need access to terms and conditions or privacy policies, use the `details` prop
to render supplementary content (such as link or modal triggers) below the label.

### Emphasized Label

```tsx
<Checkbox
  id="consent"
  label={
    <Text elementType="span" emphasis="semibold">
      I agree to the terms and conditions
    </Text>
  }
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

### Full Example

```tsx
import React, { useState } from 'react';
import { Checkbox, Link, Modal } from '@alma-oss/spirit-web-react';

const Example = () => {
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <>
      <Checkbox
        id="consent"
        label="I agree to the terms and privacy policy"
        isRequired
        helperText="Please read the documents carefully before agreeing"
        validationState="danger"
        validationText="You must agree to continue"
        details={
          <>
            <Link elementType="button" color="inherit" underlined="always" onClick={() => setTermsModalOpen(true)}>
              See full terms and conditions
            </Link>
            <Link elementType="button" color="inherit" underlined="always" onClick={() => setPrivacyModalOpen(true)}>
              See privacy policy
            </Link>
          </>
        }
      />
      <Modal id="checkbox-terms-modal" isOpen={isTermsModalOpen} onClose={() => setTermsModalOpen(false)}>
        {/* Modal content */}
      </Modal>
      <Modal id="checkbox-privacy-modal" isOpen={isPrivacyModalOpen} onClose={() => setPrivacyModalOpen(false)}>
        {/* Modal content */}
      </Modal>
    </>
  );
};
```

## Accessibility

- The `details` content is linked to the checkbox via the `aria-details` attribute
- Use `Link` component with `elementType="button"` for modal triggers (not `<a>` tags) for better accessibility
- The `aria-details` attribute is separate from `aria-describedby`:
  - `aria-describedby` announces essential information immediately (helper text, validation messages)
  - `aria-details` points to supplementary content that users can explore when needed (terms links, additional info)

## API

| Name                | Type                                           | Default | Required | Description                                                                               |
| ------------------- | ---------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------- |
| `autoComplete`      | `string`                                       | -       | ✕        | [Automated assistance in filling][autocomplete-attr]                                      |
| `details`           | `ReactNode`                                    | —       | ✕        | Details content                                                                           |
| `hasValidationIcon` | `bool`                                         | `false` | ✕        | Whether to show validation icon                                                           |
| `helperText`        | `ReactNode`                                    | —       | ✕        | Custom helper text                                                                        |
| `id`                | `string`                                       | -       | ✓        | Input and label identification                                                            |
| `indeterminate`     | `bool`                                         | -       | ✕        | Whether the checkbox is indeterminate                                                     |
| `inputPosition`     | \[`string` \| `object`]                        | `start` | ✕        | Position of the input (`start` or `end`), supports [responsive][readme-responsive] values |
| `isDisabled`        | `bool`                                         | -       | ✕        | Whether is field disabled                                                                 |
| `isChecked`         | `bool`                                         | -       | ✕        | Whether is field checked                                                                  |
| `isItem`            | `bool`                                         | -       | ✕        | To render in [Item][item] mode                                                            |
| `isLabelHidden`     | `bool`                                         | -       | ✕        | Whether is label hidden                                                                   |
| `isRequired`        | `bool`                                         | -       | ✕        | Whether is field required                                                                 |
| `label`             | `ReactNode`                                    | -       | ✕        | Label text                                                                                |
| `name`              | `string`                                       | -       | ✕        | Input name                                                                                |
| `ref`               | `ForwardedRef<HTMLInputElement>`               | -       | ✕        | Input element reference                                                                   |
| `validationState`   | [Validation dictionary][dictionary-validation] | -       | ✕        | Type of validation state.                                                                 |
| `validationText`    | \[`ReactNode` \| `ReactNode[]`]                | -       | ✕        | Validation text                                                                           |
| `value`             | `string`                                       | -       | ✕        | Input value                                                                               |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Custom Component

Text field classes are fabricated using `useCheckboxStyleProps` hook. You can use it to create your own custom Checkbox component.

```tsx
const CustomCheckbox = (props: SpiritCheckboxProps): JSX.Element => {
  const { id } = props;
  const { classProps, props: modifiedProps } = useCheckboxStyleProps(props);

  const helperTextId = `${id}-helper-text`;
  const validationTextId = `${id}-validation-text`;

  return (
    <div className={classProps.root}>
      <input
        {...modifiedProps}
        id={id}
        className={classProps.input}
        aria-describedby={`${validationTextId} ${helperTextId}`}
      />
      <div className={styleProps.text}>
        <label className={styleProps.label} htmlFor={props.id}>
          {props.label}
        </label>
        <div className={styleProps.helperText} id={helperTextId}>
          {props.helperText}
        </div>
        <div className={styleProps.validationText} id={validationTextId}>
          {props.validationText}
        </div>
      </div>
    </div>
  );
};
```

For detailed information see [Checkbox](https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Checkbox/README.md) component

[autocomplete-attr]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[item]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Item/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-responsive]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#responsive-props
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
