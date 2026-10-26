# Toolbar

Hooks behind the [`Toolbar`][toolbar] component, implementing the [toolbar pattern][apg-toolbar].
Use the `Toolbar` component; reach for the hooks only to build your own toolbar container or item.

## Features

- Roving tabindex: the control of the active item has `tabindex="0"`, the other item controls `tabindex="-1"`
- The focused (or clicked) item becomes the active one, so Tab returns to it
- Arrow keys matching the orientation move focus with wrapping, Left and Right are swapped in right-to-left layouts
- Home/End move focus to the first/last item
- Items follow the DOM order. Disabled items, hidden items, and items with no link or button are left out
- An item takes part through its first link or button. Other content in the item, such as a popover, is left alone
- If an item calls `event.preventDefault()`, the toolbar ignores that key

## Anatomy

`useToolbarState` keeps the registered items and applies the roving tabindex to their controls.

`useToolbarAria` returns the props of the toolbar element: `role`, `aria-orientation`, and the focus and keyboard
handlers. It also keeps the state in sync when an item changes without the toolbar rendering again.

`useToolbarItem` registers an item element with the nearest toolbar. `NavigationItem` uses it.
Outside a toolbar, it does nothing.

## useToolbarState

```js
useToolbarState(): ToolbarState
```

## useToolbarAria

```js
useToolbarAria(props: UseToolbarAriaProps, state: ToolbarState, ref: RefObject<HTMLElement>): UseToolbarAriaReturn
```

| Name          | Type                         | Default      | Description                                      |
| ------------- | ---------------------------- | ------------ | ------------------------------------------------ |
| `onFocus`     | `FocusEventHandler`          | —            | Consumer focus handler, composed with the hook   |
| `onKeyDown`   | `KeyboardEventHandler`       | —            | Consumer keydown handler, composed with the hook |
| `orientation` | `'horizontal' \| 'vertical'` | `horizontal` | Which arrow keys move the focus                  |

## useToolbarItem

```js
useToolbarItem(ref: RefObject<HTMLElement>): { isInToolbar: boolean }
```

## Example

```tsx
const MyToolbarItem = ({ children }) => {
  const ref = useRef(null);
  useToolbarItem(ref);

  return <div ref={ref}>{children}</div>;
};

const MyToolbar = ({ children }) => {
  const ref = useRef(null);
  const state = useToolbarState();
  const { toolbarProps } = useToolbarAria({ orientation: 'horizontal' }, state, ref);
  const contextValue = useMemo(() => ({ orientation: 'horizontal', register: state.register }), [state.register]);

  return (
    <div {...toolbarProps} aria-label="Actions" ref={ref}>
      <ToolbarContextProvider value={contextValue}>{children}</ToolbarContextProvider>
    </div>
  );
};
```

[apg-toolbar]: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/
[toolbar]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Toolbar/README.md
