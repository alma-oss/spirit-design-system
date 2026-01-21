# Split Button

The Split Button component groups multiple related actions a user can take, combining a button with additional options like a dropdown menu or tooltips for better usability.

👉 The buttons' **color** and **size** are defined at the `SplitButton` component level and apply uniformly to **all buttons** within it.

👉 The `SplitButton` component works exclusively with the Spirit `Button` and is not compatible with third-party or custom buttons.

Learn more about the [Button][readme-button] component in its documentation.

Simple variant:

```jsx
<SplitButton>
  <Button>Button</Button>
  <Button>Button</Button>
</SplitButton>
```

Setting **color** for **all buttons**:

```jsx
<SplitButton color="secondary">
  <Button>Button</Button>
  <Button>Button</Button>
</SplitButton>
```

Setting **size** for **all buttons**:

```jsx
<SplitButton size="large">
  <Button>Button</Button>
  <Button>Button</Button>
</SplitButton>
```

## Variant with Dropdown

You can add a Dropdown component inside a Split Button to provide additional actions.

Learn more about the [Dropdown][readme-dropdown] component in its documentation.

```jsx
const [isOpen, setIsOpen] = React.useState(false);
const onToggle = () => setIsOpen(!isOpen);

<SplitButton>
  <Button>Button</Button>
  <Dropdown id="split-button-dropdown-id" isOpen={isOpen} onToggle={onToggle}>
    <DropdownTrigger elementType={Button}>
      Dropdown
      <Icon name="chevron-down" marginLeft="space-400" />
    </DropdownTrigger>
    <DropdownPopover>Dropdown content</DropdownPopover>
  </Dropdown>
</SplitButton>;
```

## Variant with Tooltip

You can also add a tooltip to buttons, which is especially useful for buttons that contain only icons.

Learn more about the [Tooltip][readme-tooltip] component in its documentation.

```jsx
const [isOpen, setIsOpen] = React.useState(false);

<SplitButton>
  <Button>Button</Button>
  <Tooltip id="split-button-tooltip-id" isOpen={isOpen} onToggle={setIsOpen}>
    <TooltipTrigger elementType={Button}>
      Tooltip button
      <Icon name="download" />
    </TooltipTrigger>
    <TooltipPopover>Hello there!</TooltipPopover>
  </Tooltip>
</SplitButton>;
```

## Full Example

```jsx
const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
const onDropdownToggle = () => setIsOpen(!isOpen);

<SplitButton color="secondary" size="large">
  <Button>Button</Button>
  <Tooltip id="split-button-tooltip-id" isOpen={isTooltipOpen} onToggle={setIsTooltipOpen}>
    <TooltipTrigger elementType={Button}>
      <VisuallyHidden>download</VisuallyHidden>
      <Icon name="download" />
    </TooltipTrigger>
    <TooltipPopover>Hello there!</TooltipPopover>
  </Tooltip>
  <Dropdown id="split-button-dropdown-id" isOpen={isDropdownOpen} onToggle={onDropdownToggle}>
    <DropdownTrigger elementType={Button}>
      Dropdown
      <Icon name="chevron-down" marginLeft="space-400" />
    </DropdownTrigger>
    <DropdownPopover>Dropdown content</DropdownPopover>
  </Dropdown>
</SplitButton>;
```

## API

| Name    | Type                                       | Default   | Required | Description   |
| ------- | ------------------------------------------ | --------- | -------- | ------------- |
| `color` | \[`primary` \| `secondary` \| `tertiary` ] | `primary` | ✕        | Color variant |
| `size`  | [Size dictionary][dictionary-size]         | `medium`  | ✕        | Size variant  |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Uncontrolled Split Button

The Uncontrolled Split Button is a combination of the Button component and the Dropdown component.
It is used when you want to have a button with additional actions in a dropdown menu.

Simple variant:

```jsx
<UncontrolledSplitButton
  id="uncontrolled-split-button-id"
  buttonLabel="Button"
  buttonOnClick={() => alert('Button clicked')}
>
  {/* Dropdown content */}
</UncontrolledSplitButton>
```

Full example:

```jsx
<UncontrolledSplitButton
  buttonIconName="check-plain"
  buttonLabel="Button"
  buttonOnClick={() => alert('Button clicked')}
  color="secondary"
  dropdownPlacement="bottom-start"
  dropdownTriggerIconName="more"
  dropdownTriggerLabel="More"
  id="uncontrolled-split-button"
  isDisabled={false}
  size="large"
>
  {/* Dropdown content */}
</UncontrolledSplitButton>
```

### API

| Name                           | Type                                         | Default        | Required | Description                                              |
| ------------------------------ | -------------------------------------------- | -------------- | -------- | -------------------------------------------------------- |
| `buttonIconName`               | `string`                                     | -              | ✕ \*     | Name of the icon to be displayed in the Button           |
| `buttonLabel`                  | `string`                                     | -              | ✓        | Label of the Button                                      |
| `buttonOnClick`                | `function`                                   | -              | ✓        | Function to be called when the Button is clicked         |
| `children`                     | `ReactNode`                                  | -              | ✓        | Dropdown content                                         |
| `color`                        | \[`primary` \| `secondary` \| `tertiary` ]   | `primary`      | ✕        | Color variant                                            |
| `dropdownPlacement`            | [Placement dictionary][dictionary-placement] | `bottom-end`   | ✕        | Placement of the Dropdown                                |
| `dropdownTriggerIconName`      | `string`                                     | `chevron-down` | ✕        | Name of the icon to be displayed in the Dropdown Trigger |
| `dropdownTriggerLabel`         | `string`                                     | `More`         | ✕        | Label of the Dropdown Trigger                            |
| `id`                           | `string`                                     | -              | ✓        | Id of the Split Button and part of Dropdown id           |
| `isButtonLabelHidden`          | `bool`                                       | `false`        | ✕ \*     | Whether is button label hidden                           |
| `isDisabled`                   | `bool`                                       | `false`        | ✕        | Disables the Split Button                                |
| `isDropdownTriggerLabelHidden` | `bool`                                       | `false`        | ✕        | Whether is dropdown trigger label hidden                 |
| `size`                         | [Size dictionary][dictionary-size]           | `medium`       | ✕        | Size variant                                             |

(\*) Conditionally required: either `buttonIconName` or `buttonLabel` must be visible. If you want only the Icon to be visible, use the `isButtonLabelHidden` prop to visually hide the `buttonLabel`, which is required for accessibility reasons.

[dictionary-placement]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#placement
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#size
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Button/README.md
[readme-dropdown]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Dropdown/README.md
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[readme-tooltip]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Tooltip/README.md
