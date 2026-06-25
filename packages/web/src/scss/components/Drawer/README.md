# Drawer

The Drawer component is a container that slides in from side of the screen. It can be used to display additional content or actions that are not part of the main view.

The Drawer is a composition of several subcomponents:

- [Drawer](#drawer)
  - [DrawerPanel](#drawerpanel)
    - [ControlButton](#close-button)

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

## DrawerPanel

The `DrawerPanel` component is a container for the content that will be displayed in the drawer.

By default `.DrawerPanel__content` has no inner spacing. Add the `DrawerPanel__content--hasSpacing` modifier
to apply inner spacing consistent with `.DrawerPanel__header`, so you don't have to add it yourself.

```html
<div class="DrawerPanel">
  <div class="DrawerPanel__header">
    <!-- Close button goes here -->
  </div>
  <div class="DrawerPanel__content DrawerPanel__content--hasSpacing">
    <!-- Drawer content goes here -->
  </div>
</div>
```

## Close Button

Close button is a [ControlButton][control-button] that closes the drawer when clicked.

```html
<button
  type="button"
  class="ControlButton ControlButton--large ControlButton--symmetrical dynamic-color-border dynamic-color-background-interactive accessibility-tap-target"
  data-spirit-dismiss="offcanvas"
  data-spirit-target="#my-drawer-dialog"
  aria-controls="my-drawer-dialog"
  aria-expanded="false"
>
  <svg class="Icon" width="16" height="16" aria-hidden="true">
    <use href="/icons/svg/sprite.svg#close" />
  </svg>
  <span class="accessibility-hidden">Close</span>
</button>
```

## Full Example

```html
<dialog id="drawer-example" class="Drawer Drawer--right">
  <div class="DrawerPanel">
    <div class="DrawerPanel__header">
      <button
        type="button"
        class="ControlButton ControlButton--large ControlButton--symmetrical dynamic-color-border dynamic-color-background-interactive accessibility-tap-target"
        data-spirit-dismiss="offcanvas"
        data-spirit-target="#my-drawer-dialog"
        aria-controls="my-drawer-dialog"
        aria-expanded="false"
      >
        <svg class="Icon" width="16" height="16" aria-hidden="true">
          <use href="/icons/svg/sprite.svg#close" />
        </svg>
        <span class="accessibility-hidden">Close</span>
      </button>
    </div>
    <div class="DrawerPanel__content DrawerPanel__content--hasSpacing">
      <!-- Drawer content goes here  -->
    </div>
  </div>
</dialog>
```

### Non-Modal Drawer

By default the Drawer is modal: it uses `showModal()` on the dialog, which traps focus and blocks interaction with the page. To open a non-modal drawer, pass `modal: false` to the Offcanvas plugin:

```js
const offcanvas = new Offcanvas(drawerElement, { modal: false });
```

The drawer panel will slide in as usual, but the rest of the page stays clickable and scrollable.

[control-button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/ControlButton/README.md
