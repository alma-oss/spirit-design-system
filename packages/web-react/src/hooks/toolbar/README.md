# Toolbar

A [toolbar][apg-toolbar] groups 3 or more controls, e.g. actions for the document being edited, into a single Tab stop.
Do not use the toolbar role for one or two controls. The `Navigation` component uses these hooks when it has `role="toolbar"`.

## Features

- Roving tabindex: the active item has `tabIndex={0}`, the other items `tabIndex={-1}`
- The focused (or clicked) item becomes the active one, so Tab returns to it
- Arrow keys matching the orientation move focus with wrapping, Left and Right are swapped in right-to-left layouts
- Home/End move focus to the first/last item
- Items follow the DOM order. Disabled, hidden and non-interactive items are left out
- The hook is for button-like controls (`a` and `button`). Text fields, text areas and selects stay separate Tab stops and keep their own arrow keys
- Keys already handled by an item (`event.defaultPrevented`) are ignored

## Anatomy

`useToolbar` manages the roving tabindex and returns the value for `ToolbarContextProvider`.

`useToolbarItem` registers an item with the nearest toolbar and returns props to spread onto the item element.
Outside a toolbar, it returns the given handlers and ref untouched, so components can use it unconditionally.
`NavigationAction`, `NavigationAvatar`, `Button` and `ButtonLink` use it already.

ℹ️ Inside a toolbar, the `tabIndex` returned by `useToolbarItem` overrides the `tabIndex` of the item.

`ToolbarBoundary` stops the toolbar for its content. `Dialog` (so `Modal` and `Drawer`), `DropdownPopover`,
`TooltipPopover` and `Collapse` use it, so the controls of an overlay rendered inside a toolbar keep their own Tab order.
Use it in your own overlays, too.

## useToolbar

### API

```js
useToolbar(props: UseToolbarProps): ToolbarContextType
```

| Name          | Type                         | Default | Description                                  |
| ------------- | ---------------------------- | ------- | -------------------------------------------- |
| `isEnabled`   | `boolean`                    | `true`  | Whether the toolbar keyboard contract is set |
| `orientation` | `'horizontal' \| 'vertical'` | —       | Which arrow keys move the focus              |

## useToolbarItem

### API

```js
useToolbarItem(props: UseToolbarItemProps): ToolbarItemProps
```

| Name         | Type                   | Default | Description                                         |
| ------------ | ---------------------- | ------- | --------------------------------------------------- |
| `isDisabled` | `boolean`              | `false` | Whether the item is left out of the toolbar         |
| `onFocus`    | `FocusEventHandler`    | —       | Consumer focus handler, composed with the toolbar   |
| `onKeyDown`  | `KeyboardEventHandler` | —       | Consumer keydown handler, composed with the toolbar |
| `ref`        | `ForwardedRef`         | —       | Ref of the item element, forwarded to the consumer  |

## Example

```tsx
const ToolbarButton = forwardRef(({ children, isDisabled, onKeyDown }, ref) => {
  const toolbarItemProps = useToolbarItem({ isDisabled, onKeyDown, ref });

  return (
    <button type="button" disabled={isDisabled} {...toolbarItemProps}>
      {children}
    </button>
  );
});

const Toolbar = ({ children }) => {
  const toolbar = useToolbar({ orientation: 'horizontal' });

  return (
    <div role="toolbar" aria-label="Actions" aria-orientation="horizontal">
      <ToolbarContextProvider value={toolbar}>{children}</ToolbarContextProvider>
    </div>
  );
};
```

[apg-toolbar]: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/
