# Segmented Control

A Segmented Control is a linear set of two or more segments, each of which functions as a button. It allows users to select one or more options from a set of options, providing a clear and intuitive way to navigate or filter content.

The `SegmentedControl` is a composition of several subcomponents:

- [SegmentedControl](#segmentedcontrol)
  - [SegmentedControlItem](#segmentedcontrolitem)

## SegmentedControl

```jsx
import { SegmentedControl } from '@alma-oss/spirit-web-react';

<SegmentedControl name="segmented-control-example" label="Label">
  <!-- SegmentedControlItems go here-->
</SegmentedControl>
```

For a complete usage example, see [Full Example](#full-example).

⚠️ Please note that the components are designed to support up to 10 items for proper operation.

### Design Variants

You can set the design variant of the `SegmentedControl` using the `variant` prop. The default variant is `outline`.

```jsx
<SegmentedControl name="segmented-control-example" label="Label" variant="fill">
  <!-- SegmentedControlItems go here-->
</SegmentedControl>
```

### Multiple Selection

You can enable multiple selection by setting the `isMultiselect` prop.

```jsx
<SegmentedControl name="segmented-control-example" label="Label" isMultiselect>
  <!-- SegmentedControlItems go here-->
</SegmentedControl>
```

### Fluid Alignment

To make the `SegmentedControl` adjust to the size of its container, use the `isFluid` prop.

```jsx
<SegmentedControl name="segmented-control-example" label="Label" isFluid>
  <!-- SegmentedControlItems go here-->
</SegmentedControl>
```

### API

| Name                | Type                                           | Default   | Required | Description                                           |
| ------------------- | ---------------------------------------------- | --------- | -------- | ----------------------------------------------------- |
| `children`          | `ReactNode`                                    | —         | ✓        | Children node                                         |
| `isFluid`           | `bool`                                         | `false`   | ✕        | Fluid alignment                                       |
| `isMultiselect`     | `bool`                                         | `false`   | ✕        | Allow multiple selection                              |
| `label`             | `string`                                       | —         | ✓        | Accessible label for the control (rendered as legend) |
| `name`              | `string`                                       | —         | ✓        | Name attribute for the input group                    |
| `onSelectionChange` | `(value: string \| string[]) => void`          | —         | ✓        | On input change callback                              |
| `selectedValue`     | \[`string` \| `string[]`]                      | —         | ✓        | Selected value(s)                                     |
| `setSelectedValue`  | `function`                                     | —         | ✓        | Function to set the selected value(s)                 |
| `variant`           | [Fill Variants dictionary][dictionary-variant] | `outline` | ✕        | Visual style variant of the control                   |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Uncontrolled Segmented Control

```jsx
<UncontrolledSegmentedControl label="Label" name="uncontrolled-example" defaultSelectedValue="value-1" isFluid>
  <SegmentedControlItem key="item-1" id="uncontrolled-segmented-control-1" value="value-1">
    <Icon name="file" boxSize={20} />
    <Truncate mode="lines" limit={1}>
      Item 1 Label
    </Truncate>
  </SegmentedControlItem>
  <SegmentedControlItem key="item-2" id="uncontrolled-segmented-control-2" value="value-2">
    <Icon name="file" boxSize={20} />
    <Truncate mode="lines" limit={1}>
      Item 2 Label
    </Truncate>
  </SegmentedControlItem>
</UncontrolledSegmentedControl>
```

### API

| Name                   | Type                                           | Default   | Required | Description                                           |
| ---------------------- | ---------------------------------------------- | --------- | -------- | ----------------------------------------------------- |
| `children`             | `ReactNode`                                    | —         | ✓        | Children node                                         |
| `defaultSelectedValue` | \[`string` \| `string[]`]                      | —         | ✓        | Default selected value                                |
| `isFluid`              | `bool`                                         | `false`   | ✕        | Fluid alignment                                       |
| `isMultiselect`        | `bool`                                         | `false`   | ✕        | Allow multiple selection                              |
| `label`                | `string`                                       | —         | ✓        | Accessible label for the control (rendered as legend) |
| `name`                 | `string`                                       | —         | ✓        | Name attribute for the input group                    |
| `onSelectionChange`    | `(value: string \| string[]) => void`          | —         | ✓        | On input change callback                              |
| `variant`              | [Fill Variants dictionary][dictionary-variant] | `outline` | ✕        | Visual style variant of the control                   |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## SegmentedControlItem

The `SegmentedControlItem` component is a single item in the segmented control. It can be used to create a segmented control with multiple items.

```jsx
import { SegmentedControl, SegmentedControlItem } from '@alma-oss/spirit-web-react';

<SegmentedControl name="segmented-control-example" label="Label">
  <SegmentedControlItem id="segmented-control-item-1" value="value-1">
    Label
  </SegmentedControlItem>
  <SegmentedControlItem id="segmented-control-item-2" value="value-2">
    Label
  </SegmentedControlItem>
  <SegmentedControlItem id="segmented-control-item-3" value="value-3">
    Label
  </SegmentedControlItem>
</SegmentedControl>;
```

### Disabled Item

To disable a `SegmentedControlItem`, you can use the `isDisabled` prop.

```jsx
<SegmentedControl name="segmented-control-example" label="Label">
  <SegmentedControlItem id="segmented-control-item-1" value="value-1" isDisabled>
    Label
  </SegmentedControlItem>
  <SegmentedControlItem id="segmented-control-item-2" value="value-2">
    Label
  </SegmentedControlItem>
</SegmentedControl>
```

### Item Content Guidelines

While technically any `ReactNode` can be passed as children, the `SegmentedControlItem` should follow
one of the recommended content patterns to ensure correct appearance, alignment, and accessibility:

If your labels are truncating, the content may be too long for this component. Consider shortening the label text, using abbreviations, descriptive icons or switching to a different component (e.g., Select, Radio buttons).

For detailed guidance on handling text truncation, translations, and multiple string length scenarios, see the [Content Truncating Guidelines][truncation].

#### Text Label Only

A simple short text label without any icons or additional elements. We recommend wrapping the label in the `<Truncate>` component with `mode="lines"` and `limit={1}` to prevent overflow.

```jsx
<SegmentedControlItem id="segmented-control-item-content-example-1" value="value-1">
  <Truncate mode="lines" limit={1}>
    Label
  </Truncate>
</SegmentedControlItem>
```

#### Icon + Text Label

An icon followed by a short text label. We recommend wrapping the label in the `<Truncate>` component with `mode="lines"` and `limit={1}` to prevent overflow.

```jsx
<SegmentedControlItem id="segmented-control-item-content-example-2" value="value-2">
  <Icon name="file" boxSize={20} />
  <Truncate mode="lines" limit={1}>
    Label
  </Truncate>
</SegmentedControlItem>
```

#### Icon Only

For cases where only an icon is shown visually, use `<VisuallyHidden>` component to provide an accessible label.

```jsx
<SegmentedControlItem id="segmented-control-item-content-example-3" value="value-3">
  <Icon name="file" boxSize={20} />
  <VisuallyHidden>Label</VisuallyHidden>
</SegmentedControlItem>
```

### API

| Name         | Type        | Default | Required | Description                                               |
| ------------ | ----------- | ------- | -------- | --------------------------------------------------------- |
| `children`   | `ReactNode` | —       | ✓        | Content of the item                                       |
| `id`         | `string`    | —       | ✓        | ID for the input and label pair                           |
| `isDisabled` | `bool`      | `false` | ✕        | If true, the item will be disabled and cannot be selected |
| `value`      | `string`    | —       | ✓        | Value attribute for the input                             |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Full Example

```jsx
import { Icon, SegmentedControl, SegmentedControlItem, Truncate, VisuallyHidden } from '@alma-oss/spirit-web-react';

const [selectedValue, setSelectedValue] = useState('value-1');

<SegmentedControl
  label="Label"
  name="segmented-control-full-example"
  selectedValue={selectedValue}
  setSelectedValue={setSelectedValue}
>
  <SegmentedControlItem id="segmented-control-full-example-item-1" value="value-1">
    <Truncate mode="lines" limit={1}>
      Label 1
    </Truncate>
  </SegmentedControlItem>
  <SegmentedControlItem id="segmented-control-full-example-item-2" value="value-2">
    <Icon name="file" boxSize={20} />
    <Truncate mode="lines" limit={1}>
      Label 2
    </Truncate>
  </SegmentedControlItem>
  <SegmentedControlItem id="segmented-control-full-example-item-3" value="value-3">
    <Icon name="file" boxSize={20} />
    <VisuallyHidden>Label 3</VisuallyHidden>
  </SegmentedControlItem>
</SegmentedControl>;
```

## Usage with Tooltip

```jsx
const [activeTooltipIndex, setActiveTooltipIndex] = (useState < number) | (null > null);
const [selectedValue, setSelectedValue] = useState('value-1');

<SegmentedControl
  label="Label"
  name="segmented-control-tooltip-example"
  selectedValue={selectedValue}
  setSelectedValue={setSelectedValue}
>
  <Tooltip
    id="tooltip-1"
    isOpen={activeTooltipIndex === 0}
    onToggle={() => setActiveTooltipIndex(activeTooltipIndex === 0 ? null : 0)}
  >
    <TooltipTrigger elementType={SegmentedControlItem} value="value-1" id="segmented-control-tooltip-1">
      <Icon name="file" boxSize={20} />
      <TooltipPopover>Label 1</TooltipPopover>
    </TooltipTrigger>
  </Tooltip>
  <Tooltip
    id="tooltip-2"
    isOpen={activeTooltipIndex === 1}
    onToggle={() => setActiveTooltipIndex(activeTooltipIndex === 1 ? null : 1)}
  >
    <TooltipTrigger elementType={SegmentedControlItem} value="value-2" id="segmented-control-tooltip-2">
      <Icon name="file" boxSize={20} />
    </TooltipTrigger>
    <TooltipPopover>Label 2</TooltipPopover>
  </Tooltip>
</SegmentedControl>;
```

[dictionary-variant]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#variant
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[truncation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/TRUNCATING.md#segmented-control
