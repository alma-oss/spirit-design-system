# Split Button

The Split Button component groups multiple related actions a user can take, combining a button with additional options like a dropdown menu or tooltips for better usability.

👉 The buttons' **color** and **size** are defined at the `SplitButton` component level and apply uniformly to **all buttons** within it.

👉 The `SplitButton` component works exclusively with the Spirit `Button` and is not compatible with third-party or custom buttons.

Learn more about the [Button][readme-button] component in its documentation.

Simple variant:

```tsx
<SplitButton>
  <Button>Button</Button>
  <Button>Button</Button>
</SplitButton>
```

Setting **color** for **all buttons**:

```tsx
<SplitButton color="secondary">
  <Button>Button</Button>
  <Button>Button</Button>
</SplitButton>
```

Setting **size** for **all buttons**:

```tsx
<SplitButton size="large">
  <Button>Button</Button>
  <Button>Button</Button>
</SplitButton>
```

## Variant with Dropdown

You can add a Dropdown component inside a Split Button to provide additional actions.

Learn more about the [Dropdown][readme-dropdown] component in its documentation.

```tsx
const [isOpen, setIsOpen] = React.useState(false);
const onToggle = () => setIsOpen(!isOpen);

<SplitButton>
  <Button>Button</Button>
  <Dropdown id="split-button-dropdown-id" isOpen={isOpen} onToggle={onToggle}>
    <DropdownTrigger elementType={Button}>
      Dropdown
      <Icon name="chevron-down" />
    </DropdownTrigger>
    <DropdownPopover>Dropdown content</DropdownPopover>
  </Dropdown>
</SplitButton>;
```

## Variant with Tooltip

You can also add a tooltip to buttons, which is especially useful for buttons that contain only icons.

Learn more about the [Tooltip][readme-tooltip] component in its documentation.

```tsx
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

```tsx
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
      <Icon name="chevron-down" />
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

```tsx
<UncontrolledSplitButton
  id="uncontrolled-split-button-id"
  labelButton="Button"
  buttonOnClick={() => alert('Button clicked')}
>
  {/* Dropdown content */}
</UncontrolledSplitButton>
```

Full example:

```tsx
<UncontrolledSplitButton
  buttonIconName="check-plain"
  labelButton={{ key: 'actions.save' }}
  buttonOnClick={() => alert('Button clicked')}
  color="secondary"
  dropdownPlacement="bottom-start"
  dropdownTriggerIconName="more"
  strings={{ label: { dropdown: { trigger: 'More' } } }}
  id="uncontrolled-split-button"
  isDisabled={false}
  size="large"
>
  {/* Dropdown content */}
</UncontrolledSplitButton>
```

### API

| Name                           | Type                                                          | Default        | Required | Description                                                        |
| ------------------------------ | ------------------------------------------------------------- | -------------- | -------- | ------------------------------------------------------------------ |
| `buttonIconName`               | `string`                                                      | -              | ✕ \*     | Name of the icon to be displayed in the Button                     |
| `labelButton`                  | [`TranslatableString`][readme-component-strings]              | -              | ✓ \*     | Label of the Button                                                |
| `buttonLabel`                  | `string`                                                      | -              | ✓ \*     | _Deprecated, use `labelButton`_                                    |
| `buttonOnClick`                | `function`                                                    | -              | ✓        | Function to be called when the Button is clicked                   |
| `children`                     | `ReactNode`                                                   | -              | ✓        | Dropdown content                                                   |
| `color`                        | \[`primary` \| `secondary` \| `tertiary` ]                    | `primary`      | ✕        | Color variant                                                      |
| `dropdownPlacement`            | [Placement dictionary][dictionary-placement]                  | `bottom-end`   | ✕        | Placement of the Dropdown                                          |
| `dropdownTriggerIconName`      | `string`                                                      | `chevron-down` | ✕        | Name of the icon to be displayed in the Dropdown Trigger           |
| `strings`                      | `{ label?: { dropdown?: { trigger?: TranslatableString } } }` | -              | ✕        | Dropdown trigger label override; see [Translations](#translations) |
| `dropdownTriggerLabel`         | `string`                                                      | -              | ✕        | _Deprecated, use `strings.label.dropdown.trigger`_                 |
| `id`                           | `string`                                                      | -              | ✓        | Id of the Split Button and part of Dropdown id                     |
| `isButtonLabelHidden`          | `bool`                                                        | `false`        | ✕ \*     | Whether is button label hidden                                     |
| `isDisabled`                   | `bool`                                                        | `false`        | ✕        | Disables the Split Button                                          |
| `isDropdownTriggerLabelHidden` | `bool`                                                        | `false`        | ✕        | Whether is dropdown trigger label hidden                           |
| `size`                         | [Size dictionary][dictionary-size]                            | `medium`       | ✕        | Size variant                                                       |

(\*) During the v5 migration, provide either `labelButton` or deprecated `buttonLabel`. If you want only the Icon
to be visible, use `isButtonLabelHidden` to visually hide the required accessible label.

### Translations

Override optional copy with [`strings`][readme-component-strings]. Omitted keys use the built-in English default.
The dropdown trigger label is visible unless `isDropdownTriggerLabelHidden` is set.

| Key                      | Default key            | English default | Description            |
| ------------------------ | ---------------------- | --------------- | ---------------------- |
| `label.dropdown.trigger` | `splitButton.dropdown` | `More`          | Dropdown trigger label |

Required button copy stays on `labelButton` (not `strings`).

### Deprecation Notice

`buttonLabel` and `dropdownTriggerLabel` are deprecated and will be removed in v6.

### Migration Guide

```diff
- <UncontrolledSplitButton buttonLabel="Save" dropdownTriggerLabel="More" />
+ <UncontrolledSplitButton labelButton={{ key: 'actions.save' }} strings={{ label: { dropdown: { trigger: 'More' } } }} />
```

[dictionary-placement]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#placement
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#size
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Button/README.md
[readme-component-strings]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#component-strings
[readme-dropdown]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Dropdown/README.md
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[readme-tooltip]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Tooltip/README.md
