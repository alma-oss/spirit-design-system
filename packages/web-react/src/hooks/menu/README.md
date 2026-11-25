# Menu

Hooks behind the [`Menu`][menu] component, implementing the [menu button pattern][apg-menu-button].
Use the `Menu` component; reach for the hooks only to build your own menu container or item.

## Features

- Roving tabindex: the active menu item has `tabindex="0"`, the other items `tabindex="-1"`
- The focused (or clicked) item becomes the active one
- Arrow Up/Down move focus with wrapping, Home/End move focus to the first/last item
- Typeahead: typed characters move focus to the next item whose label starts with them
- Items follow the DOM order. Disabled and hidden items are left out
- Callbacks for item activation and for Tab moving focus out of the menu
- If an item calls `event.preventDefault()`, the menu ignores that key

The roving tabindex is shared with the [toolbar hooks][toolbar-hooks]. A menu item is the focusable element itself,
while a toolbar item is a wrapper whose first link or button takes focus.

## Anatomy

`useMenuState` keeps the registered items and applies the roving tabindex to them.

`useMenuAria` returns the props of the menu element: `role`, `aria-orientation`, and the focus, keyboard and click
handlers. It also keeps the state in sync when an item changes without the menu rendering again.

`useMenuItem` registers an item element with the nearest menu. `Item` uses it. Outside a menu, it does nothing.

## useMenuState

```js
useMenuState(): MenuState
```

## useMenuAria

```js
useMenuAria(props: UseMenuAriaProps, state: MenuState, ref: RefObject<HTMLElement>): UseMenuAriaReturn
```

| Name        | Type                   | Default | Description                                                    |
| ----------- | ---------------------- | ------- | -------------------------------------------------------------- |
| `onAction`  | `() => void`           | —       | Called after an item is activated with a click, Enter or Space |
| `onClick`   | `MouseEventHandler`    | —       | Consumer click handler, composed with the hook                 |
| `onFocus`   | `FocusEventHandler`    | —       | Consumer focus handler, composed with the hook                 |
| `onKeyDown` | `KeyboardEventHandler` | —       | Consumer keydown handler, composed with the hook               |
| `onTabOut`  | `() => void`           | —       | Called when Tab or Shift+Tab moves focus out of the menu       |

## useMenuItem

```js
useMenuItem(ref: RefObject<HTMLElement>): { isInMenu: boolean }
```

## Example

```tsx
const MyMenuItem = ({ children }) => {
  const ref = useRef(null);
  useMenuItem(ref);

  return (
    <button type="button" role="menuitem" ref={ref}>
      {children}
    </button>
  );
};

const MyMenu = ({ children, onClose }) => {
  const ref = useRef(null);
  const state = useMenuState();
  const { menuProps } = useMenuAria({ onAction: onClose, onTabOut: onClose }, state, ref);
  const contextValue = useMemo(() => ({ register: state.register }), [state.register]);

  return (
    <div {...menuProps} aria-label="Actions" ref={ref}>
      <MenuContextProvider value={contextValue}>{children}</MenuContextProvider>
    </div>
  );
};
```

[apg-menu-button]: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
[menu]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Menu/README.md
[toolbar-hooks]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/hooks/toolbar/README.md
