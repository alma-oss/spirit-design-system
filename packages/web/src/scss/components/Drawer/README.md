# Drawer

The Drawer component is a container that slides in from side of the screen. It can be used to display additional content or actions that are not part of the main view.

The Drawer is a composition of several subcomponents:

- [Drawer](#drawer)
  - [DrawerCloseButton](#drawerclosebutton)
  - [DrawerPanel](#drawerpanel)

👉 The animation effect of this component is dependent on the
`prefers-reduced-motion` media query.

## Drawer

```html
<dialog id="my-drawer-dialog" class="Drawer Drawer--right">
  <!-- Drawer panel goes here  -->
</dialog>
```

### Alignment

The `Drawer` component allows aligning the content panel horizontally to the left or right side of the screen using `--left` or `--right` modifier. The default alignment of the drawer content panel is to the right.

```html
<dialog id="my-drawer-dialog" class="Drawer Drawer--left">
  <!-- Drawer panel goes here  -->
</dialog>
```

## DrawerCloseButton

The `DrawerCloseButton` component is a button that closes the drawer when clicked.

```html
<button
  type="button"
  class="Button Button--tertiary Button--medium Button--symmetrical DrawerCloseButton"
  data-spirit-dismiss="offcanvas"
  data-spirit-target="#my-drawer-dialog"
  aria-controls="my-drawer-dialog"
  aria-expanded="false"
>
  <svg class="Icon" width="24" height="24" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#close" />
  </svg>
  <span class="accessibility-hidden">Close</span>
</button>
```

## DrawerPanel

The `DrawerPanel` component is a container for the content that will be displayed in the drawer.

```html
<div class="DrawerPanel">
  <div class="DrawerPanel__content">
    <!-- Drawer content goes here -->
  </div>
</div>
```

## Full Example

```html
<dialog id="drawer-example" class="Drawer Drawer--right">
  <div class="DrawerPanel">
    <div class="DrawerPanel__content">
      <button
        type="button"
        aria-expanded="false"
        class="Button Button--tertiary Button--medium Button--symmetrical DrawerCloseButton"
        data-spirit-dismiss="offcanvas"
        data-spirit-target="#drawer-example"
        aria-controls="drawer-example"
      >
        <svg class="Icon" width="24" height="24" aria-hidden="true">
          <use xlink:href="/icons/svg/sprite.svg#close" />
        </svg>
        <span class="accessibility-hidden">Close</span>
      </button>
      <!-- Drawer content goes here  -->
    </div>
  </div>
</dialog>
```
