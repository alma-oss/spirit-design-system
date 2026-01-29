# Dropdown

## Usage

```jsx
import { Dropdown, DropdownTrigger, DropdownPopover } from '@alma-oss/spirit-web-react';
```

```jsx
const [isOpen, setIsOpen] = React.useState(false);
const onToggle = () => setIsOpen(!isOpen);

<Dropdown id="dropdown-example" isOpen={isOpen} onToggle={onToggle}>
  <DropdownTrigger elementType="button">Trigger button</DropdownTrigger>
  <DropdownPopover>…</DropdownPopover>
</Dropdown>;
```

### Dropdown with Item

Enhance your DropdownPopover by incorporating the versatile [Item][item] component.
Explore additional examples and insights within the dedicated documentation for the [Item][item] component.

```jsx
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);
const onToggle = () => setIsOpen(!isOpen);

<Dropdown id="dropdown-example" isOpen={isOpen} onToggle={onToggle}>
  <DropdownTrigger elementType="button">Trigger button</DropdownTrigger>
  <DropdownPopover>
    <Item elementType="a" href="#" label="Item label" />
  </DropdownPopover>
</Dropdown>;
```

### Uncontrolled Dropdown

```jsx
import { UncontrolledDropdown, DropdownTrigger, DropdownPopover } from '@alma-oss/spirit-web-react';
```

```jsx
<UncontrolledDropdown id="uncontrolled-dropdown-example">
  <DropdownTrigger elementType="button">Trigger button</DropdownTrigger>
  <DropdownPopover>…</DropdownPopover>
</UncontrolledDropdown>
```

## API

### Dropdown

| Name              | Type                                                                  | Default        | Required | Description                                                                                                                               |
| ----------------- | --------------------------------------------------------------------- | -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `alignmentX`      | \[ [AlignmentXExtended dictionary][dictionary-alignment] \| `object`] | `null`         | ✕        | Apply vertical alignment to trigger, use object to set responsive values, e.g. `{ mobile: 'left', tablet: 'center', desktop: 'right' }`   |
| `alignmentY`      | \[ [AlignmentYExtended dictionary][dictionary-alignment] \| `object`] | `null`         | ✕        | Apply horizontal alignment to trigger, use object to set responsive values, e.g. `{ mobile: 'top', tablet: 'center', desktop: 'bottom' }` |
| `enableAutoClose` | `bool`                                                                | `true`         | ✕        | Enables close on click outside of Dropdown                                                                                                |
| `fullWidthMode`   | [`DropdownFullWidthMode`][dropdown-fullwidth-mode]                    | `off`          | ✕        | Full-width mode                                                                                                                           |
| `id`              | `string`                                                              | —              | ✓        | Component id                                                                                                                              |
| `isOpen`          | `bool`                                                                | `false`        | ✓        | Open state                                                                                                                                |
| `onAutoClose`     | `(event: Event) => void`                                              | —              | ✕        | Callback on close on click outside of Dropdown                                                                                            |
| `onToggle`        | `() => void`                                                          | —              | ✓        | Function for toggle open state of dropdown                                                                                                |
| `placement`       | [Placement dictionary][dictionary-placement]                          | `bottom-start` | ✕        | Alignment of the component                                                                                                                |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

#### Alignment

Dropdown supports the extended [Alignment Dictionary][dictionary-alignment] for alignment on both axes. To use it, set the
specific prop to the `Dropdown` component, e.g. `<Dropdown alignmentX="right" />` or `<Dropdown alignmentY="stretch" />`. Adding
any of these props will make the element display as `flex`.

We also support responsive alignment props. To use them, set the prop as an object,
e.g. `<Dropdown alignmentX={{ mobile: 'right', tablet: 'left', desktop: 'center' }} />`.

ℹ️ This controls only the alignment inside the wrapping `Dropdown` element. And even with alignment, the popover will still be positioned
at edge of the `Dropdown` element and on the place defined by the placement attribute.

```jsx
<Dropdown alignmentX={{ mobile: 'right', tablet: 'left', desktop: 'center' }} alignmentY="center" id="#dropdown-alignment">
  <DropdownTrigger elementType={Button}>Button as anchor</DropdownTrigger>
  <DropdownPopover>
    <!-- ... -->
  </DropdownPopover>
</Dropdown>
```

### DropdownTrigger

| Name          | Type                       | Default  | Required | Description                      |
| ------------- | -------------------------- | -------- | -------- | -------------------------------- |
| `children`    | \[`string` \| `ReactNode`] | —        | ✓        | Content of trigger element       |
| `elementType` | \[`string` \| `ReactNode`] | `button` | ✕        | Element type of dropdown trigger |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

### DropdownPopover

| Name       | Type                       | Default | Required | Description                |
| ---------- | -------------------------- | ------- | -------- | -------------------------- |
| `children` | \[`string` \| `ReactNode`] | —       | ✓        | Content of trigger element |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

### UncontrolledDropdown

| Name              | Type                                                                  | Default        | Required | Description                                                                                                                               |
| ----------------- | --------------------------------------------------------------------- | -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `alignmentX`      | \[ [AlignmentXExtended dictionary][dictionary-alignment] \| `object`] | `null`         | ✕        | Apply vertical alignment to trigger, use object to set responsive values, e.g. `{ mobile: 'left', tablet: 'center', desktop: 'right' }`   |
| `alignmentY`      | \[ [AlignmentYExtended dictionary][dictionary-alignment] \| `object`] | `null`         | ✕        | Apply horizontal alignment to trigger, use object to set responsive values, e.g. `{ mobile: 'top', tablet: 'center', desktop: 'bottom' }` |
| `enableAutoClose` | `bool`                                                                | `true`         | ✕        | Enables close on click outside of Dropdown                                                                                                |
| `fullWidthMode`   | [`DropdownFullWidthMode`][dropdown-fullwidth-mode]                    | `off`          | ✕        | Full-width mode                                                                                                                           |
| `id`              | `string`                                                              | `<random>`     | ✕        | Component id                                                                                                                              |
| `onAutoClose`     | `(event: Event) => void`                                              | —              | ✕        | Callback on close on click outside of Dropdown                                                                                            |
| `placement`       | [Placement dictionary][dictionary-placement]                          | `bottom-start` | ✕        | Alignment of the component                                                                                                                |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#alignment
[dictionary-placement]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#placement
[dropdown-fullwidth-mode]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/types/dropdown.ts#L19
[item]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Item/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
