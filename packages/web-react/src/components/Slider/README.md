# Slider

Slider is a form control that allows users to select a value from a range of values.

## Basic Usage

The Slider component implements the HTML [range input][mdn-range] element.

```jsx
import { useState } from 'react';
import { Slider } from '@alma-oss/spirit-web-react';

const [value, setValue] = useState();

const handleChange = (event) => {
  setValue(Number(event.target.value));
};

<Slider id="slider" label="Slider" value={value} onChange={handleChange} />;
```

### Slider Steps and Value

You can specify the Slider steps and value range by setting the `min`, `max`, and `step` props.

```jsx
import { useState } from 'react';
import { Slider } from '@alma-oss/spirit-web-react';

const [value, setValue] = useState();

const handleChange = (event) => {
  setValue(Number(event.target.value));
};

<Slider id="slider" label="Slider" min={3} max={12} value={value} onChange={handleChange} />;
```

## Required

ℹ️ As per the [HTML specification][html-spec-range], the Slider component does not support the `required` state.

## Hidden Label

```jsx
<Slider id="slider" label="Slider" value={value} onChange={handleChange} isLabelHidden />
```

## Fluid Width

```jsx
<Slider id="slider" label="Slider" value={value} onChange={handleChange} isFluid />
```

## Helper Text

```jsx
<Slider id="slider" label="Slider" value={value} onChange={handleChange} helperText="Helper text" />
```

## Validation States

Validation states implement the Validation state [dictionary][dictionary-validation].

```jsx
<Slider
  id="slider-success"
  label="Slider"
  value={value}
  onChange={handleChange}
  validationState="success"
  validationText="Validation text"
/>
<Slider
  hasValidationIcon
  id="slider-warning"
  label="Slider"
  value={value}
  onChange={handleChange}
  validationState="warning"
  validationText="Validation text with icon"
/>
<Slider
  id="slider-danger"
  label="Slider"
  value={value}
  onChange={handleChange}
  validationState="danger"
  validationText={['First validation text', 'Second validation text']}
/>
```

## Disabled State

```jsx
<Slider id="slider-disabled" label="Slider" value={value} onChange={handleChange} isDisabled />
```

## API

| Attribute           | Type                                           | Default | Required | Description                                               |
| ------------------- | ---------------------------------------------- | ------- | -------- | --------------------------------------------------------- |
| `hasValidationIcon` | `bool`                                         | `false` | ✕        | Whether to show validation icon                           |
| `helperText`        | `string`                                       | -       | ✕        | Custom helper text                                        |
| `id`                | `string`                                       | -       | ✓        | Input and label identification                            |
| `isDisabled`        | `bool`                                         | `false` | ✕        | Whether is the input disabled                             |
| `isFluid`           | `bool`                                         | `false` | ✕        | Whether the element spans to the full width of its parent |
| `isLabelHidden`     | `bool`                                         | `false` | ✕        | Whether the label is hidden                               |
| `label`             | `ReactNode`                                    | -       | ✓        | Label text                                                |
| `max`               | `number`                                       | 100     | ✕        | Max value of slider input                                 |
| `min`               | `number`                                       | 0       | ✕        | Min value of slider input                                 |
| `onChange`          | `() => void`                                   | -       | ✓        | On input change callback                                  |
| `step`              | `number`                                       | 1       | ✕        | Sets the stepping interval                                |
| `validationState`   | [Validation dictionary][dictionary-validation] | -       | ✕        | Type of validation state                                  |
| `validationText`    | \[`ReactNode` \| `ReactNode[]`]                | -       | ✕        | Validation text                                           |
| `value`             | `number`                                       | -       | ✓        | Input value                                               |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UncontrolledSlider

### Basic Usage

```jsx
import { UncontrolledSlider } from '@alma-oss/spirit-web-react';

<UncontrolledSlider id="slider-uncontrolled" label="UncontrolledSlider" />;
```

### API

| Attribute           | Type                            | Default | Required | Description                                               |
| ------------------- | ------------------------------- | ------- | -------- | --------------------------------------------------------- |
| `hasValidationIcon` | `boolean`                       | `false` | ✕        | Whether to show validation icon                           |
| `helperText`        | `string`                        | -       | ✕        | Custom helper text                                        |
| `id`                | `string`                        | -       | ✓        | Input and label identification                            |
| `isDisabled`        | `bool`                          | `false` | ✕        | Whether is the input disabled                             |
| `isFluid`           | `bool`                          | `false` | ✕        | Whether the element spans to the full width of its parent |
| `isLabelHidden`     | `bool`                          | `false` | ✕        | Whether the label is hidden                               |
| `label`             | `ReactNode`                     | -       | ✓        | Label text                                                |
| `max`               | `number`                        | 100     | ✕        | Max value of slider input                                 |
| `min`               | `number`                        | 0       | ✕        | Min value of slider input                                 |
| `onChange`          | `() => void`                    | -       | ✕        | On input change callback                                  |
| `step`              | `number`                        | 1       | ✕        | Sets the stepping interval                                |
| `validationText`    | \[`ReactNode` \| `ReactNode[]`] | -       | ✕        | Validation text                                           |
| `value`             | `number`                        | 0       | ✕        | Input value                                               |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[dictionary-validation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#validation
[html-spec-range]: https://html.spec.whatwg.org/multipage/input.html#range-state-(type=range)
[mdn-range]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
