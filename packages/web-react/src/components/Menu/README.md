# Menu

The `Menu` is a list of actions that opens from a trigger and closes once one is chosen, for example the actions for an
item in a list. Use it inside a [`Dropdown`][dropdown] to build a menu button.

Use a menu only for actions. For other content in a popover, such as form fields, text, or links mixed with other
content, use the `DropdownPopover` on its own, which is a dialog. For actions that stay visible, use a
[`Toolbar`][toolbar].

Do not use a menu for site navigation, not even for a subnavigation. A menu item is not announced as a link, and Tab
skips the whole menu. Keep the links of a [`Navigation`][navigation] as links and show a subnavigation with a button
that has `aria-expanded`, following the [disclosure navigation pattern][apg-disclosure-navigation].

## Usage

```tsx
import { Menu } from '@alma-oss/spirit-web-react';
```

The `Menu` renders a `div` with `role="menu"` and `aria-orientation="vertical"`. It owns the keyboard interaction and
the state its items join. Each [`Item`][item] inside it renders as a `button` with `role="menuitem"`.

```tsx
<Dropdown id="item-actions" isOpen={isOpen} onToggle={toggle} placement="bottom-end">
  <DropdownTrigger elementType={ControlButton} isSymmetrical>
    <VisuallyHidden>Show actions</VisuallyHidden>
    <Icon name="more" />
  </DropdownTrigger>
  <DropdownPopover>
    <Menu aria-label="Actions">
      <Item startSlot={<Icon name="edit" />}>Edit</Item>
      <Item startSlot={<Icon name="download" />}>Download</Item>
      <Item startSlot={<Icon name="link" />} isDisabled>
        Copy link
      </Item>
    </Menu>
  </DropdownPopover>
</Dropdown>
```

Name the menu with `aria-label` or `aria-labelledby`.

Inside a `Dropdown`, the `Menu` is the popup of the trigger: the `DropdownTrigger` gets `aria-haspopup="menu"` and
`aria-controls` pointing at the menu, and the `DropdownPopover` becomes presentational, so it is not announced as a
dialog around the menu. Do not set `role` on the `DropdownPopover`.

## Items

Each `Item` inside the `Menu` joins the menu. The `Menu` passes `elementType="button"` and `role="menuitem"` to them
through the `item` [context props][readme-props-context] namespace. A direct `elementType` prop overrides it, for
example `elementType="a"` for an item that navigates.

- Activating an item closes the menu and returns focus to the trigger.
- Disabled items are skipped by the arrow keys and typeahead.

ℹ️ Inside a menu, the `Menu` overrides the `tabindex` of the items.

To build your own item, register its element with [`useMenuItem`][menu-hooks].

## Keyboard Interaction

The `Menu` implements the [menu button keyboard interaction][apg-menu-button]:

- **Enter**, **Space**, or **Arrow Down** on the trigger opens the menu and moves focus to the first item.
  **Arrow Up** opens it and moves focus to the last item.
- **Arrow Down/Up** move focus between items and wrap around.
- **Home/End** move focus to the first/last item.
- Typing a character moves focus to the next item whose label starts with it. Typing several characters quickly
  matches a longer label.
- **Enter** or **Space** activates the focused item, closes the menu, and returns focus to the trigger.
- **Escape** closes the menu and returns focus to the trigger.
- **Tab** and **Shift+Tab** close the menu and move focus on, out of the menu.
- If an item calls `event.preventDefault()` on a key, the menu leaves that key alone.

## API

| Name       | Type                           | Default | Required | Description                   |
| ---------- | ------------------------------ | ------- | -------- | ----------------------------- |
| `children` | `ReactNode`                    | —       | ✓        | Items of the Menu             |
| `id`       | `string`                       | —       | ✕        | Menu ID, generated if not set |
| `ref`      | `ForwardedRef<HTMLDivElement>` | —       | ✕        | Menu element reference        |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[apg-disclosure-navigation]: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
[apg-menu-button]: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
[dropdown]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Dropdown/README.md
[item]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Item/README.md
[menu-hooks]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/hooks/menu/README.md
[navigation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Navigation/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-props-context]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#shared-and-inherited-props
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[toolbar]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Toolbar/README.md
