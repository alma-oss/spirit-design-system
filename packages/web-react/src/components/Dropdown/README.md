# Dropdown

## Usage

```tsx
import React, { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownPopover } from '@alma-oss/spirit-web-react';

export const Example = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen(!isOpen);

  return (
    <Dropdown id="dropdown-example" isOpen={isOpen} onToggle={onToggle}>
      <DropdownTrigger elementType="button">Trigger button</DropdownTrigger>
      <DropdownPopover aria-label="Options">…</DropdownPopover>
    </Dropdown>
  );
};
```

### Keyboard Behavior (Dialog Pattern)

`DropdownPopover` follows the non-modal anchored dialog pattern:

- When the popover **opens**, focus automatically moves to the **first interactive element** inside it.
- **Escape** – closes the popover and returns focus to the trigger (works from both the trigger and items inside the popover)
- **Tab** from the last focusable element inside the popover – closes the popover and returns focus to the trigger (no focus trap)
- **Shift+Tab** from the first focusable element inside the popover – closes the popover and returns focus to the trigger

Because the popover renders with `role="dialog"`, it must have an accessible name. Provide it via `aria-label` or `aria-labelledby`:

```tsx
<DropdownPopover aria-label="Options">…</DropdownPopover>;

// or reference a visible heading inside the popover
<DropdownPopover aria-labelledby="my-dropdown-title">
  <h3 id="my-dropdown-title">Options</h3>…
</DropdownPopover>;
```

### Dropdown with Item

Enhance your DropdownPopover by incorporating the versatile [Item][item] component.
Explore additional examples and insights within the dedicated documentation for the [Item][item] component.

```tsx
import React, { useState } from 'react';

export const Example = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen(!isOpen);

  return (
    <Dropdown id="dropdown-example" isOpen={isOpen} onToggle={onToggle}>
      <DropdownTrigger elementType="button">Trigger button</DropdownTrigger>
      <DropdownPopover aria-label="Options">
        <Item elementType="a" href="#" label="Item label" />
      </DropdownPopover>
    </Dropdown>
  );
};
```

### Uncontrolled Dropdown

```tsx
import { UncontrolledDropdown, DropdownTrigger, DropdownPopover } from '@alma-oss/spirit-web-react';

export const Example = () => {
  /* … */
  return (
    <UncontrolledDropdown id="uncontrolled-dropdown-example">
      <DropdownTrigger elementType="button">Trigger button</DropdownTrigger>
      <DropdownPopover aria-label="Options">…</DropdownPopover>
    </UncontrolledDropdown>
  );
};
```

## API

### Dropdown

| Name              | Type                                                                  | Default        | Required | Description                                                                                                                                           |
| ----------------- | --------------------------------------------------------------------- | -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alignmentX`      | \[ [AlignmentXExtended dictionary][dictionary-alignment] \| `object`] | `null`         | ✕        | Apply vertical alignment to trigger, use object to set responsive values, e.g. `{ mobile: 'left', tablet: 'center', desktop: 'right' }`               |
| `alignmentY`      | \[ [AlignmentYExtended dictionary][dictionary-alignment] \| `object`] | `null`         | ✕        | Apply horizontal alignment to trigger, use object to set responsive values, e.g. `{ mobile: 'top', tablet: 'center', desktop: 'bottom' }`             |
| `enableAutoClose` | `bool`                                                                | `true`         | ✕        | Enables close on click outside of Dropdown                                                                                                            |
| `fullWidthMode`   | [`DropdownFullWidthMode`][dropdown-fullwidth-mode]                    | `off`          | ✕        | Full-width mode                                                                                                                                       |
| `id`              | `string`                                                              | —              | ✓        | Component id                                                                                                                                          |
| `isOpen`          | `bool`                                                                | `false`        | ✓        | Open state                                                                                                                                            |
| `onAutoClose`     | `(event: Event) => void`                                              | —              | ✕        | Callback on close on click outside of Dropdown                                                                                                        |
| `onToggle`        | `() => void`                                                          | —              | ✓        | Function for toggle open state of dropdown                                                                                                            |
| `placement`       | [Placement dictionary][dictionary-placement]                          | `bottom-start` | ✕        | Alignment of the component                                                                                                                            |
| `triggerRef`      | `MutableRefObject<HTMLElement \| null \| undefined>`                  | —              | ✕        | External trigger ref; supply when the trigger element is outside `DropdownTrigger` (e.g. custom pickers) so focus returns correctly on keyboard close |

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

```tsx
<Dropdown alignmentX={{ mobile: 'right', tablet: 'left', desktop: 'center' }} alignmentY="center" id="#dropdown-alignment">
  <DropdownTrigger elementType={Button}>Button as anchor</DropdownTrigger>
  <DropdownPopover aria-label="Options">
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

`DropdownPopover` renders as a non-modal anchored dialog (`role="dialog"`) by default.
**An accessible name is required** — provide it via `aria-label` or `aria-labelledby`.

Keyboard behavior is applied automatically: **Escape** closes the popover and returns focus to the
trigger, and **Tab** / **Shift+Tab** out of the popover close it as focus leaves the dialog.

When you override `role` (e.g. `role="menu"`), also pass the matching `aria-haspopup` value to
`DropdownTrigger` to keep the trigger and popover semantics consistent:

```tsx
<Dropdown …>
  <DropdownTrigger aria-haspopup="menu" elementType="button">Trigger</DropdownTrigger>
  <DropdownPopover role="menu">…</DropdownPopover>
</Dropdown>
```

| Name       | Type                       | Default    | Required | Description            |
| ---------- | -------------------------- | ---------- | -------- | ---------------------- |
| `children` | \[`string` \| `ReactNode`] | —          | ✓        | Content of the popover |
| `role`     | `string`                   | `"dialog"` | ✕        | Override the ARIA role |

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
