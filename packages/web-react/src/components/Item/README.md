# Item

The Item component is used to display a single item in a list. It can be used in Dropdown or similar.

To use Item with checkbox or radio please use components [Checkbox][checkbox] or [Radio][radio]
with `isItem` property. We do this to avoid repeating the same code and to simplify the API.

Item renders `Item__content` and `Item__slot` wrappers with `role="presentation"` so slot containers
do not introduce extra semantics into the accessibility tree. Learn more about it in the [Accessibility](#accessibility) section.

## Basic Usage

```tsx
<Item>
  <Label>Item</Label>
</Item>
```

Item provides `elementType="span"` to nested Label, HelperText, and ValidationText components, so you do not
need to set it on each component manually. Direct `elementType` props still override this inherited value.

When Item is rendered inside a `Stack` with `elementType="ul"` or `elementType="ol"`, it inherits
`elementType="li"` from the Stack context.

## Item as Button or Link

Use `elementType="button"` when the whole row triggers one action and has no other interactive descendants.
Use `elementType="a"` when the whole row navigates to one destination.

Button:

```tsx
<Item elementType="button">
  <Label>Item</Label>
</Item>
```

Link:

```tsx
<Item elementType="a" href="#">
  <Label>Item</Label>
</Item>
```

## Selected State

Use `isSelected` when the item itself should have the selected background.
This state does not render a checkmark or recolor slot icons on its own. If the selected state needs an icon,
render it in `startSlot` or `endSlot` and set `Icon color="selected"`.

Item with selected background:

```tsx
<Item isSelected>
  <Label>Item</Label>
</Item>
```

Item with selected icon only:

```tsx
<Item endSlot={<Icon name="check-plain" color="selected" />}>
  <Label>Item</Label>
</Item>
```

Item with selected background and icon:

```tsx
<Item endSlot={<Icon name="check-plain" color="selected" />} isSelected>
  <Label>Item</Label>
</Item>
```

## Slots

Use `startSlot` and `endSlot` to render optional content before or after the item label.
Slots accept any `ReactNode` — for example, an `Icon`, a badge, or custom markup.

When rendering icons in a slot, use the `Icon` component and refer to the
[Icon component documentation][web-react-icon-documentation] for setup instructions.

Leading icon:

```tsx
<Item startSlot={<Icon name="search" />}>
  <Label>Item</Label>
</Item>
```

Leading icon, trailing selected icon, and selected background:

```tsx
<Item
  startSlot={<Icon name="search" color="selected" />}
  endSlot={<Icon name="check-plain" color="selected" />}
  isSelected
>
  <Label>Item</Label>
</Item>
```

## Content with Helper Text and Metadata

Compose richer rows with [HelperText][readme-helper-text], `Text`, or other inline content.

```tsx
<Item
  startSlot={<Icon name="folder-dualtone" color="selected" />}
  endSlot={
    <ControlButton isSymmetrical size="small" aria-label="Remove Project Alpha">
      <Icon name="close" />
    </ControlButton>
  }
  isSelected
>
  <Label>Project Alpha</Label>
  <HelperText helperText="Team workspace" />
  <Text elementType="span" size="small" textColor="emotion-success-basic">
    3 updates
  </Text>
</Item>
```

Item with helper text:

```tsx
<Item>
  <Label>Item</Label>
  <HelperText helperText="Helper text" />
</Item>
```

Item with Text content instead of Label:

```tsx
<Item>
  <Text elementType="span" emphasis="semibold">
    Item title
  </Text>
  <Text elementType="span" size="small" textColor="secondary">
    Secondary text without Label
  </Text>
</Item>
```

Use Text props when Item content needs plain text styling instead of form-field label semantics:

```tsx
<Item>
  <Text elementType="span" size="small" textColor="secondary" textWordBreak="long-words">
    Long text value: customer-reference-number-2026-0000000001
  </Text>
</Item>
```

## Interactive Controls in Slots

When a slot contains an interactive control such as a `ControlButton`, keep the Item root non-interactive
or provide markup that avoids nested interactive elements. Icon-only controls need an accessible name such as `aria-label`.

```tsx
<Item
  endSlot={
    <ControlButton isSymmetrical size="small" aria-label="Remove item">
      <Icon name="close" />
    </ControlButton>
  }
>
  <Label>Dismissible item</Label>
</Item>
```

For rows where the primary action lives inside the content area, keep the Item root non-interactive
and render a stretched `Link` inside the content:

```tsx
<Stack elementType="ul" aria-label="Last searches" spacing="space-300">
  <Item
    alignmentY="top"
    startSlot={<Icon name="search" />}
    endSlot={
      <ControlButton isSymmetrical size="small" aria-label="Remove Malíř pokojů">
        <Icon name="close" />
      </ControlButton>
    }
    isSelected
  >
    <Stack elementType="span" spacing="space-300">
      <Link href="#malir-pokoj" color="inherit" underlined="never" isStretched>
        Malíř pokojů
      </Link>
      <HelperText helperText="Plný úvazek" />
    </Stack>
  </Item>
</Stack>
```

## Vertical Alignment

Use `alignmentY` when slot content and children should align differently on the cross axis.

```tsx
<Item alignmentY="center" startSlot={<Icon name="search" />}>
  <Label>Item</Label>
  <HelperText helperText="Additional helper text makes the content taller than the icon." />
</Item>
```

## Disabled State

`isDisabled` applies the native `disabled` attribute on `elementType="button"` only. For `elementType="a"`,
`role="option"`, or other non-button roots, add `aria-disabled` explicitly.

Button:

```tsx
<Item elementType="button" isDisabled>
  <Label>Item</Label>
</Item>
```

Link:

```tsx
<Item elementType="a" href="#" isDisabled aria-disabled>
  <Label>Item</Label>
</Item>
```

ℹ️ Read more about this pattern at [Scott O'Hara's blog][scott-o-hara-disabling-a-link].

Non-interactive root:

```tsx
<Item isDisabled aria-disabled>
  <Label>Item</Label>
</Item>
```

## Checkbox and Radio Item

Radio as Item:

```tsx
<Radio id="radio-item" name="example" label="Radio Label" isItem />
```

Checkbox as Item:

```tsx
<Checkbox id="checkbox-item" name="example" label="Checkbox Label" isItem />
```

## Usage in Dropdown

Usage in the [Dropdown][dropdown] component:

```tsx
const [isOpen, setIsOpen] = React.useState(false);
const onToggle = () => setIsOpen(!isOpen);

<Dropdown id="dropdown-example" isOpen={isOpen} onToggle={onToggle}>
  <DropdownTrigger elementType="button">Trigger button</DropdownTrigger>
  <DropdownPopover>
    <Item elementType="a" href="#">
      <Label>Item label</Label>
    </Item>
  </DropdownPopover>
</Dropdown>;
```

## Accessibility

Choose the Item root semantics according to what the row does:

- Use the default non-interactive `div` for static content, status rows, or visual-only rows that are not directly actionable.
- Use `elementType="button"` only when the whole row triggers one button-like action and the row has no other interactive descendants.
- Use `elementType="a"` for a single link-like row. For composed rows, keep the Item root non-interactive and render a `Link` inside the content; `isStretched` can make the whole visual row clickable without nesting a link around other controls.
- When a slot contains a removable `ControlButton`, do not render the Item root as a `button` or `a`. Keep the root non-interactive, or use the grid pattern below when the row exposes multiple actions. Icon-only remove controls need an accessible name such as `aria-label`.
- Use `role="grid"`, `role="row"`, and `role="gridcell"` when a row has multiple interactive cells or actions that should be navigated as a structured row. In this pattern, the Item itself can be `role="presentation"` and the cell content owns the interactive semantics.
- `isSelected` is visual only. It does not add `aria-selected`, `aria-current`, or a widget role. The parent widget owns those semantics because listbox options, menu items, grid rows, and links all use different markup.
- Decorative slot icons should stay hidden according to the Icon component conventions. A selected icon color is visual only and must not replace the ARIA state.
- Inline text highlighting with `<strong>` is fine for visual emphasis, but it does not announce selection or activation state.
- `isDisabled` applies the native `disabled` attribute on `elementType="button"` only. For `elementType="a"`, `role="option"`, or other non-button roots, add `aria-disabled` explicitly. See [Disabled State](#disabled-state).

For a listbox-like parent, pass [`option`][mdn-option-role] semantics and selected state explicitly.
The parent widget must implement the keyboard interaction contract for the chosen role:

```tsx
<Item role="option" aria-selected={true} isSelected>
  <Label>Item</Label>
</Item>
```

For rows with separate navigation and remove actions, use a structured [`grid`][mdn-grid-role].
The grid role requires a keyboard navigation contract implemented in JavaScript:

```tsx
<Stack role="grid" aria-label="Recent items">
  <Item
    role="row"
    startSlot={<Icon name="folder-dualtone" />}
    endSlot={
      <span role="gridcell">
        <ControlButton isSymmetrical size="small" aria-label="Remove Project Alpha">
          <Icon name="close" />
        </ControlButton>
      </span>
    }
  >
    <Stack elementType="span" role="gridcell">
      <Link href="#project-alpha" isStretched>
        Project Alpha
      </Link>
    </Stack>
  </Item>
</Stack>
```

## API

| Name          | Type                                                         | Default | Required | Description                                                                             |
| ------------- | ------------------------------------------------------------ | ------- | -------- | --------------------------------------------------------------------------------------- |
| `alignmentY`  | \[[AlignmentY dictionary][dictionary-alignment] \| `object`] | —       | ✕        | Apply vertical alignment of item slots and content, use object to set responsive values |
| `children`    | `ReactNode`                                                  | —       | ✕        | Item content                                                                            |
| `elementType` | `ElementType`                                                | `div`   | ✕        | Type of element used as wrapper                                                         |
| `endSlot`     | `ReactNode`                                                  | —       | ✕        | Content shown at the end                                                                |
| `isDisabled`  | `bool`                                                       | `false` | ✕        | Whether is the item disabled                                                            |
| `isSelected`  | `bool`                                                       | `false` | ✕        | Whether is the item selected                                                            |
| `startSlot`   | `ReactNode`                                                  | —       | ✕        | Content shown at the start                                                              |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[checkbox]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Checkbox/README.md
[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#alignment
[dropdown]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Dropdown
[mdn-grid-role]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/grid_role
[mdn-option-role]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/option_role
[radio]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Radio/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/HelperText/README.md
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[scott-o-hara-disabling-a-link]: https://www.scottohara.me/blog/2021/05/28/disabled-links.html
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
