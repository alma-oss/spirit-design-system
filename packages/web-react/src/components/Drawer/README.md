# Drawer

The Drawer component is a container that slides in from side of the screen. It can be used to display additional content or actions that are not part of the main view.

The Drawer is a composition of several subcomponents:

- [Drawer](#drawer)
  - [DrawerPanel](#drawerpanel)
    - [DrawerPanelHeader](#drawerpanelheader)
      - [DrawerCloseButton](#close-button)
    - [DrawerPanelContent](#drawerpanelcontent)

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
It is composed from the `DrawerPanelHeader` and `DrawerPanelContent` sub-components.

```tsx
<DrawerPanel>
  <DrawerPanelHeader>
    <DrawerCloseButton />
  </DrawerPanelHeader>
  <DrawerPanelContent hasSpacing>{/* Drawer content goes here */}</DrawerPanelContent>
</DrawerPanel>
```

### API

| Name          | Type          | Default | Required | Description                          |
| ------------- | ------------- | ------- | -------- | ------------------------------------ |
| `children`    | `ReactNode`   | —       | ✕        | Children node                        |
| `elementType` | `ElementType` | `div`   | ✕        | Type of element used as drawer panel |

## DrawerPanelHeader

The `DrawerPanelHeader` component is a container rendered at the top of the `DrawerPanel`.
It is typically used to hold the `DrawerCloseButton`.

```tsx
<DrawerPanelHeader>
  <DrawerCloseButton />
</DrawerPanelHeader>
```

### API

| Name       | Type        | Default | Required | Description   |
| ---------- | ----------- | ------- | -------- | ------------- |
| `children` | `ReactNode` | —       | ✕        | Children node |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## DrawerPanelContent

The `DrawerPanelContent` component is a container for the main content of the `DrawerPanel`.

By default it has no inner spacing. Set the `hasSpacing` prop to apply inner spacing consistent with
`DrawerPanelHeader`, so you don't have to add it yourself.

```tsx
<DrawerPanelContent hasSpacing>{/* Drawer content goes here */}</DrawerPanelContent>
```

### API

| Name         | Type        | Default | Required | Description                                               |
| ------------ | ----------- | ------- | -------- | --------------------------------------------------------- |
| `children`   | `ReactNode` | —       | ✕        | Children node                                             |
| `hasSpacing` | `bool`      | `false` | ✕        | Whether the content has inner spacing matching the header |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

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
import {
  Button,
  Drawer,
  DrawerPanel,
  DrawerPanelHeader,
  DrawerPanelContent,
  DrawerCloseButton,
} from '@alma-oss/spirit-web-react';

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
        <DrawerPanel>
          <DrawerPanelHeader>
            <DrawerCloseButton />
          </DrawerPanelHeader>
          <DrawerPanelContent hasSpacing>Drawer content</DrawerPanelContent>
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
