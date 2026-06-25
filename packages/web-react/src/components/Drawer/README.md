# Drawer

The Drawer component is a container that slides in from side of the screen. It can be used to display additional content or actions that are not part of the main view.

The Drawer is a composition of several subcomponents:

- [Drawer](#drawer)
  - [DrawerPanel](#drawerpanel)
    - [CloseButton](#closebutton)

## Accessibility Guidelines

👉 The animation effect of this component is dependent on the
`prefers-reduced-motion` media query.

## Drawer

```tsx
const [isOpen, setOpen] = useState(false);

<Drawer id="drawer-dialog-example" isOpen={isOpen} onClose={() => setOpen(false)}>
  {/* Drawer Panel goes here */}
</Drawer>;
```

### Alignment

The `Drawer` component allows aligning the content panel horizontally to the left or right side of the screen using `alignmentX` prop. By default, the drawer content panel is aligned to the right.

```tsx
<Drawer id="drawer-dialog-example" isOpen={isOpen} onClose={() => setOpen(false)} alignmentX="left">
  {/* Drawer Panel goes here */}
</Drawer>
```

### Close on Backdrop Click

By default, the drawer will close when the backdrop is clicked. You can disable this behavior by setting the `closeOnBackdropClick` prop to `false`.

```tsx
<Drawer id="drawer-dialog-example" isOpen={isOpen} onClose={() => setOpen(false)} closeOnBackdropClick={false}>
  {/* Drawer content goes here */}
</Drawer>
```

### Close on Escape Key Down

By default, the drawer will close when the escape key is pressed. You can disable this behavior by setting the `closeOnEscapeKeyDown` prop to `false`.

```tsx
<Drawer id="drawer-dialog-example" isOpen={isOpen} onClose={() => setOpen(false)} closeOnEscapeKeyDown={false}>
  {/* Drawer content goes here */}
</Drawer>
```

### API

| Name                   | Type                                           | Default | Required | Description                                              |
| ---------------------- | ---------------------------------------------- | ------- | -------- | -------------------------------------------------------- |
| `alignmentX`           | `left` \| `right`                              | `right` | ✕        | Drawer horizontal alignment                              |
| `children`             | `ReactNode`                                    | —       | ✕        | Children node                                            |
| `closeOnBackdropClick` | `bool`                                         | `true`  | ✕        | Whether the drawer will close when backdrop is clicked   |
| `closeOnEscapeKeyDown` | `bool`                                         | `true`  | ✕        | Whether the drawer will close when escape key is pressed |
| `id`                   | `string`                                       | —       | ✓        | ID to be linked                                          |
| `isOpen`               | `bool`                                         | `false` | ✓        | Open state                                               |
| `onClose`              | `(event: ClickEvent or KeyboardEvent) => void` | —       | ✓        | Callback for drawer when closed                          |

The component further inherits properties from the [`<dialog>`][mdn-dialog-element] element.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## DrawerPanel

The `DrawerPanel` component is a container for the content that will be displayed in the drawer.
Should there be any spacing around the content of `DrawerPanel`, you need to provide it yourself.
The `children` are rendered in the panel content area, and the `closeButton` is rendered automatically
inside the panel header.

### CloseButton

Pass the shared [`CloseButton`][close-button] through the `closeButton` prop. It is **not** wired up
automatically, so provide:

- `onClick` — your drawer's `onClose` handler
- `aria-controls` — the drawer's `id`
- `aria-expanded` — the drawer's open state
- `size="large"` — to match the drawer close-button size

```tsx
<DrawerPanel
  closeButton={
    <CloseButton
      size="large"
      aria-expanded={isOpen}
      aria-controls="drawer-dialog-example"
      onClick={() => setOpen(false)}
    />
  }
>
  {/* Drawer content goes here */}
</DrawerPanel>
```

See the [`CloseButton`][close-button] documentation for its full API.

### API

| Name          | Type          | Default | Required | Description                                      |
| ------------- | ------------- | ------- | -------- | ------------------------------------------------ |
| `children`    | `ReactNode`   | —       | ✕        | Children node rendered in the panel content area |
| `closeButton` | `ReactNode`   | —       | ✕        | Close button rendered inside the panel header    |
| `elementType` | `ElementType` | `div`   | ✕        | Type of element used as drawer panel             |

## Full Example

```tsx
import React, { useState } from 'react';
import { Button, CloseButton, Drawer, DrawerPanel } from '@alma-oss/spirit-web-react';

export const Example = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button onClick={handleOpen} aria-controls="drawer-example">
        Open Drawer
      </Button>

      <Drawer id="drawer-example" isOpen={isOpen} onClose={handleClose}>
        <DrawerPanel
          closeButton={
            <CloseButton size="large" aria-expanded={isOpen} aria-controls="drawer-example" onClick={handleClose} />
          }
        >
          <div>Drawer content</div>
        </DrawerPanel>
      </Drawer>
    </>
  );
};
```

[close-button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/CloseButton/README.md
[mdn-dialog-element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
