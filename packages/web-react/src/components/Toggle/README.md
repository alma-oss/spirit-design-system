# Toggle

Toggle is a form control that allows users to switch between two states.

## Basic Usage

The Toggle component implements the HTML [checkbox input][mdn-checkbox] element. It uses
the native input element and styles it to look like a toggle switch.

```tsx
<Toggle id="toggle-default" label="Toggle Label" />
```

## Indicators

If you need to indicate the state of the toggle, you can add the `hasIndicators` prop. This will add a visual indicators to the toggle switch.

```tsx
<Toggle id="toggle-indicators" label="Toggle Label" hasIndicators />
```

## Required

Add the `isRequired` prop to mark it as required.

```tsx
<Toggle id="toggle-required" label="Toggle Label" isRequired />
```

## Hidden Label

```tsx
<Toggle id="toggle-hidden-label" label="Toggle Label" isLabelHidden />
```

## Fluid

```tsx
<Toggle id="toggle-fluid" label="Toggle Label" isFluid />
```

## Helper Text

```tsx
<Toggle id="toggle-helper-text" label="Toggle Label" helperText="Helper text" />
```

## Validation States

Validation states can be presented by prop `validationState`. See Validation state [dictionary][dictionary-validation].

```tsx
<Toggle id="toggle-success" label="Toggle Label" validationState="success" />
<Toggle
  hasValidationIcon
  id="toggle-warning"
  label="Toggle Label"
  validationText="Validation text"
  validationState="warning"
  isChecked
/>
<Toggle
  id="toggle-danger"
  label="Toggle Label"
  validationText={[ 'First validation text', 'Second validation text' ]}
  validationState="danger"
/>
```

## Disabled State

You can add `isDisabled` prop to disable Toggle.

```tsx
<Toggle id="toggle-disabled" label="Toggle Label" isDisabled />
```

## Input Position

The `inputPosition` prop allows you to position the toggle switch to the `start` or `end` (default) of the label:

```tsx
<Toggle id="toggle-start" label="Toggle at Start" inputPosition="start" />
<Toggle id="toggle-end" label="Toggle at End (default)" inputPosition="end" />
```

### Responsive Input Position

Pass an object to adjust the toggle position based on the [breakpoint][dictionary-breakpoint]:

```tsx
<Toggle id="toggle-responsive" label="Responsive Toggle Position" inputPosition={{ mobile: 'end', tablet: 'start' }} />
```

## Consent with Details

For consent scenarios where users need access to terms and conditions or privacy policies, use the `details` prop
to render supplementary content (such as link or modal triggers) below the label.

### Emphasized Label

```tsx
<Toggle
  id="consent"
  label={<span className="typography-body-medium-semibold">I agree to the terms and conditions</span>}
  isRequired
  details={
    <Link href="#" color="inherit" underlined="always">
      See full terms and conditions
    </Link>
  }
/>
```

### Full Example

```tsx
import React, { useState } from 'react';
import { Link, Modal, Toggle } from '@alma-oss/spirit-web-react';

const Example = () => {
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <>
      <Toggle
        id="consent"
        label="I agree to the terms and privacy policy"
        isRequired
        helperText="Please read the documents carefully before agreeing"
        validationState="danger"
        validationText="You must agree to continue"
        details={
          <>
            <Link elementType="button" color="inherit" underlined="always" onClick={() => setTermsOpen(true)}>
              See full terms and conditions
            </Link>
            <Link elementType="button" color="inherit" underlined="always" onClick={() => setPrivacyOpen(true)}>
              See privacy policy
            </Link>
          </>
        }
      />
      <Modal id="toggle-terms-modal" isOpen={isTermsModalOpen} onClose={() => setTermsModalOpen(false)}>
        {/* Modal content */}
      </Modal>
      <Modal id="toggle-privacy-modal" isOpen={isPrivacyModalOpen} onClose={() => setPrivacyModalOpen(false)}>
        {/* Modal content */}
      </Modal>
    </>
  );
};
```

**Accessibility notes:**

- The `details` content is linked to the toggle via the `aria-details` attribute
- Use `Link` component with `elementType="button"` for modal triggers (not `<a>` tags) for better accessibility

## API

| Name                | Type                                           | Default | Required | Description                                                                               |
| ------------------- | ---------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------- |
| `autoComplete`      | `string`                                       | -       | ✕        | [Automated assistance in filling][autocomplete-attr]                                      |
| `details`           | `ReactNode`                                    | —       | ✕        | Details content, typically containing modal triggers                                      |
| `hasIndicators`     | `bool`                                         | `false` | ✕        | Whether has visual indicators                                                             |
| `hasValidationIcon` | `bool`                                         | `false` | ✕        | Whether to show validation icon                                                           |
| `helperText`        | `string`                                       | -       | ✕        | Helper text                                                                               |
| `id`                | `string`                                       | -       | ✓        | Input and label identification                                                            |
| `inputPosition`     | \[`string` \| `object`]                        | `end`   | ✕        | Position of the input (`start` or `end`), supports [responsive][readme-responsive] values |
| `isChecked`         | `bool`                                         | `false` | ✕        | Whether is toggle checked                                                                 |
| `isDisabled`        | `bool`                                         | `false` | ✕        | Whether is toggle disabled                                                                |
| `isFluid`           | `bool`                                         | `false` | ✕        | Whether is toggle fluid                                                                   |
| `isLabelHidden`     | `bool`                                         | `false` | ✕        | Whether is label hidden                                                                   |
| `label`             | `ReactNode`                                    | -       | ✓        | Label text                                                                                |
| `name`              | `string`                                       | -       | ✕        | Input name                                                                                |
| `onChange`          | (event: ChangeEvent<HTMLInputElement>) => void | -       | ✕        | Change event handler                                                                      |
| `ref`               | `ForwardedRef<HTMLInputElement>`               | -       | ✕        | Input element reference                                                                   |
| `validationState`   | [Validation dictionary][dictionary-validation] | -       | ✕        | Type of validation state                                                                  |
| `validationText`    | \[`ReactNode` \| `ReactNode[]`]                | -       | ✕        | Validation text                                                                           |

The components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[autocomplete-attr]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[mdn-checkbox]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-responsive]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#responsive-props
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
