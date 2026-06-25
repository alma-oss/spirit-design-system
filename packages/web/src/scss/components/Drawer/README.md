# Drawer

The Drawer component is a container that slides in from side of the screen. It can be used to display additional content or actions that are not part of the main view.

The Drawer is a composition of several subcomponents:

- [Drawer](#drawer)
  - [DrawerPanel](#drawerpanel)
    - [DrawerPanelHeader](#drawerpanelheader)
    - [DrawerPanelBody](#drawerpanelcontent)

## Drawer

```html
<dialog id="my-drawer-dialog" class="Drawer Drawer--right" aria-label="Drawer">
  <!-- Drawer panel goes here  -->
</dialog>
```

### Alignment

The `Drawer` component allows aligning the content panel horizontally to the left or right side of the screen using `--left` or `--right` modifier. The default alignment of the drawer content panel is to the right.

```html
<dialog id="my-drawer-dialog" class="Drawer Drawer--left" aria-label="Drawer">
  <!-- Drawer panel goes here  -->
</dialog>
```

## DrawerPanel

The `DrawerPanel` component is a container for the content that will be displayed in the drawer.
It is composed from the `DrawerPanelHeader` and `DrawerPanelBody` sub-components.

```html
<div class="DrawerPanel">
  <header class="DrawerPanelHeader">
    <!-- Close button goes here -->
  </header>
  <div class="DrawerPanelBody DrawerPanelBody--spacing">
    <!-- Drawer content goes here -->
  </div>
</div>
```

## DrawerPanelHeader

The `DrawerPanelHeader` component is a container rendered at the top of the `DrawerPanel`.
It is typically used to hold the close button.

```html
<header class="DrawerPanelHeader">
  <!-- Close button goes here -->
</header>
```

### Close Button

Close button is a [ControlButton][readme-control-button] that closes the drawer when clicked.

```html
<button
  type="button"
  class="ControlButton ControlButton--large text-color-scheme dynamic-color-background-interactive accessibility-tap-target ControlButton--hasBackground dynamic-color-border ControlButton--symmetrical"
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

## DrawerPanelBody

The `DrawerPanelBody` component is a container for the main content of the `DrawerPanel`.

By default it has no inner spacing. Add the `DrawerPanelBody--spacing` modifier
to apply inner spacing consistent with `DrawerPanelHeader`, so you don't have to add it yourself.

```html
<div class="DrawerPanelBody DrawerPanelBody--spacing">
  <!-- Drawer content goes here -->
</div>
```

👉 For examples with `Navigation` content inside `DrawerPanelBody`, see the [Header][readme-header] component.

## Accessibility

Always provide an accessible name for the `Drawer` using the `aria-label` attribute so screen readers can announce what the dialog contains:

```html
<dialog id="drawer-example" class="Drawer Drawer--right" aria-label="Navigation">
  <!-- … -->
</dialog>
```

ℹ️ The animation effect of this component is dependent on the
`prefers-reduced-motion` media query.

## Full Example

```html
<dialog id="drawer-example" class="Drawer Drawer--right" aria-label="Drawer">
  <div class="DrawerPanel">
    <header class="DrawerPanelHeader">
      <button
        type="button"
        class="ControlButton ControlButton--large text-color-scheme dynamic-color-background-interactive accessibility-tap-target ControlButton--hasBackground dynamic-color-border ControlButton--symmetrical"
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
    </header>
    <div class="DrawerPanelBody DrawerPanelBody--spacing">
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

[readme-control-button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/ControlButton/README.md
[readme-header]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Header/README.md
