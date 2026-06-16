# Drawer

The Drawer component is a container that slides in from side of the screen. It can be used to display additional content or actions that are not part of the main view.

The Drawer is a composition of several subcomponents:

- [Drawer](#drawer)
  - [DrawerPanel](#drawerpanel)
    - [DrawerCloseButton](#close-button)

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

Pass the `DrawerCloseButton` through the `closeButton` prop; it is rendered automatically inside the
panel header. The `children` are rendered in the panel content area.

```tsx
<DrawerPanel closeButton={<DrawerCloseButton />}>{/* Drawer content goes here */}</DrawerPanel>
```

### API

| Name          | Type          | Default | Required | Description                                      |
| ------------- | ------------- | ------- | -------- | ------------------------------------------------ |
| `children`    | `ReactNode`   | —       | ✕        | Children node rendered in the panel content area |
| `closeButton` | `ReactNode`   | —       | ✕        | Close button rendered inside the panel header    |
| `elementType` | `ElementType` | `div`   | ✕        | Type of element used as drawer panel             |

## Close Button

`DrawerCloseButton` is a [ControlButton][control-button] that closes the drawer when clicked.
It reads the drawer context to wire up `aria-controls`, `aria-expanded`, and the `onClick` handler automatically.

```tsx
<DrawerCloseButton />
```

### API

| Name    | Type     | Default | Required | Description                    |
| ------- | -------- | ------- | -------- | ------------------------------ |
| `label` | `string` | `Close` | ✕        | Accessible label of the button |

The component further inherits properties from the [`<button>`][mdn-button-element] element.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Full Example

```tsx
import React, { useState } from 'react';
import { Button, Drawer, DrawerPanel, DrawerCloseButton } from '@alma-oss/spirit-web-react';

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
        <DrawerPanel closeButton={<DrawerCloseButton />}>
          <div>Drawer content</div>
        </DrawerPanel>
      </Drawer>
    </>
  );
};
```

[control-button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ControlButton/README.md
[mdn-button-element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
[mdn-dialog-element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
