# Toggle

Toggle is a form control that allows users to switch between two states.

## Basic Usage

The Toggle component implements the HTML [checkbox input][mdn-checkbox] element. It uses
the native input element and styles it to look like a toggle switch.

```jsx
import { Toggle } from '@alma-oss/spirit-web-react';

<Toggle id="toggle-default" label="Toggle Label" />;
```

## Indicators

If you need to indicate the state of the toggle, you can add the `hasIndicators` prop. This will add a visual indicators to the toggle switch.

```jsx
<Toggle id="toggle-indicators" label="Toggle Label" hasIndicators />
```

## Required

Add the `isRequired` prop to mark it as required.

```jsx
<Toggle id="toggle-required" label="Toggle Label" isRequired />
```

## Hidden Label

```jsx
<Toggle id="toggle-hidden-label" label="Toggle Label" isLabelHidden />
```

## Fluid

```jsx
<Toggle id="toggle-fluid" label="Toggle Label" isFluid />
```

## Helper Text

```jsx
<Toggle id="toggle-helper-text" label="Toggle Label" helperText="Helper text" />
```

## Validation States

Validation states can be presented by prop `validationState`. See Validation state [dictionary][dictionary-validation].

```jsx
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

```jsx
<Toggle id="toggle-disabled" label="Toggle Label" isDisabled />
```

## Input Position

The `inputPosition` prop allows you to position the toggle switch to the `start` or `end` (default) of the label:

```jsx
<Toggle id="toggle-start" label="Toggle at Start" inputPosition="start" />
<Toggle id="toggle-end" label="Toggle at End (default)" inputPosition="end" />
```

### Responsive Input Position

Pass an object to adjust the toggle position based on the [breakpoint][dictionary-breakpoint]:

```jsx
<Toggle id="toggle-responsive" label="Responsive Toggle Position" inputPosition={{ mobile: 'end', tablet: 'start' }} />
```

## API

| Name                | Type                                           | Default | Required | Description                                                                               |
| ------------------- | ---------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------- |
| `autoComplete`      | `string`                                       | -       | ✕        | [Automated assistance in filling][autocomplete-attr]                                      |
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
