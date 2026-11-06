# Toolbar

The `Toolbar` puts a group of actions into one Tab stop. Use it for three or more actions that stay visible, for example
the actions for the document being edited.

Do not use a toolbar for one or two controls, or for site navigation.

## Usage

```tsx
import { Toolbar } from '@alma-oss/spirit-web-react';
```

The `Toolbar` renders a `div` with `role="toolbar"` and `aria-orientation`. It owns the keyboard interaction and the
state its items join.

Compose it with a [`Navigation`][navigation]. Inside a toolbar, `Navigation` renders as a `div`, so it is not a landmark.

```tsx
<Toolbar orientation="vertical" aria-label="CV actions">
  <Navigation>
    <NavigationItem>
      <NavigationAction href="#">Preview</NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <Button color="secondary">Download</Button>
    </NavigationItem>
    <NavigationItem>
      <NavigationAction href="#" isDisabled>
        Disabled
      </NavigationAction>
    </NavigationItem>
    <NavigationItem>
      <Dropdown id="more" isOpen={isOpen} onToggle={toggle}>
        <DropdownTrigger elementType={ControlButton} isSymmetrical aria-label="More actions">
          <Icon name="more" />
        </DropdownTrigger>
        <DropdownPopover aria-label="Options">{/* … */}</DropdownPopover>
      </Dropdown>
    </NavigationItem>
  </Navigation>
</Toolbar>
```

Name the toolbar with `aria-label` or `aria-labelledby`. A name is required when the page has more than one toolbar.
Inside a `Toolbar`, `Navigation` takes its layout from the toolbar `orientation` and renders as a `div`. The `Toolbar`
passes these defaults, and the `role="presentation"` of the list and its items, through the `toolbar` and `toolbarItem`
[context props][readme-props-context] namespaces. A direct `direction` or `elementType` prop overrides them. Do not set
`direction`, so the layout stays in line with `aria-orientation` and the arrow keys, and do not set `elementType="nav"`,
because a toolbar is not a navigation landmark.

## Items

Each `NavigationItem` joins the toolbar through its first link or button. That can be a `NavigationAction`,
`NavigationAvatar`, `Button`, `ButtonLink`, or `DropdownTrigger`. The controls themselves do not know about the toolbar.

- Disabled and hidden items are skipped.
- Other content in an item keeps its own Tab order and keys. An open `DropdownPopover`, `Collapse`, or `Modal` is an
  example.
- An item with no link or button stays out of the toolbar. Content outside a `NavigationItem`, such as a form field,
  stays its own Tab stop and keeps its own arrow keys.

ℹ️ Inside a toolbar, the `Toolbar` overrides the `tabindex` of the item controls.

To build your own item, register its element with [`useToolbarItem`][toolbar-hooks].

## Keyboard Interaction

The `Toolbar` implements the [toolbar keyboard interaction][apg-toolbar]:

- **Tab** moves focus into and out of the toolbar. The toolbar is a single Tab stop and remembers the last focused item.
- **Arrow Left/Right** (horizontal) or **Arrow Up/Down** (vertical) move focus between items and wrap around.
  Left and Right are swapped in right-to-left layouts.
- **Home/End** move focus to the first/last item.
- **Enter** activates the focused item natively, **Space** activates buttons.
- If an item calls `event.preventDefault()`, the toolbar leaves that key alone.

## API

| Name          | Type                           | Default      | Required | Description                                                     |
| ------------- | ------------------------------ | ------------ | -------- | --------------------------------------------------------------- |
| `children`    | `ReactNode`                    | —            | ✓        | Content of the Toolbar                                          |
| `orientation` | `'horizontal' \| 'vertical'`   | `horizontal` | ✕        | Sets `aria-orientation` and which arrow keys move between items |
| `ref`         | `ForwardedRef<HTMLDivElement>` | —            | ✕        | Toolbar element reference                                       |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[apg-toolbar]: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/
[navigation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Navigation/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-props-context]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#shared-and-inherited-props
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[toolbar-hooks]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/hooks/toolbar/README.md
