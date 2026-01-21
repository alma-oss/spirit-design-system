# Modal

Modal is a composition of several subcomponents:

- [Modal](#modal-1)
  - [ModalDialog](#modaldialog)
    - [ModalHeader](#modalheader)
    - [ModalBody](#modalbody)
    - [ModalFooter](#modalfooter)

## Modal

Modal establishes the top layer with a backdrop. Under the hood it uses the [`<dialog>` element][mdn-dialog] which
provides several accessibility advantages.

```html
<dialog id="modal-example" class="Modal Modal--center" aria-labelledby="modal-example-title">
  <!-- ModalDialog -->
</dialog>
```

👉 Please note the `aria-labelledby` attribute is linked to the title inside [ModalHeader](#modalheader) and provides an
accessible name for the dialog.

### Vertical Alignment

Modal can be aligned to the center (default), top, or bottom. These values come from the
[alignment dictionary][dictionary-alignment]. Using a corresponding modifier class will align the modal accordingly:

- `Modal--top`
- `Modal--center` (default)
- `Modal--bottom`

Example:

```html
<dialog id="modal-example" class="Modal Modal--top" aria-labelledby="modal-example-title">
  <!-- ModalDialog -->
</dialog>
```

## ModalDialog

ModalDialog is the actual dialog window, a place for the header, body, and footer of the dialog.

```html
<article class="ModalDialog">
  <!-- ModalHeader -->
  <!-- ModalBody -->
  <!-- ModalFooter -->
</article>
```

### Forms in Modal

Modal can also contain interactive content like forms. For such cases, you may find it convenient to use the `<form>`
element with the attribute `method="dialog"`. Buttons with `type="submit"` then [handle both][mdn-dialog-form] saving
the state of the form and closing the dialog.

```html
<form class="ModalDialog" method="dialog">
  <!-- … -->
  <button type="submit" class="Button Button--primary Button--medium">Save</button>
</form>
```

### Dropdowns in Modal

Dropdowns can be safely used inside **non-scrollable** Modals so that the Dropdown popover is not clipped by the Modal's
boundaries.

👉 See the [Scrolling Long Content](#scrolling-long-content) section for more information on scroll control of Modals.

### Docked Modals on Mobile Screens

On mobile screens, Modal can be docked to the bottom of the viewport using the `ModalDialog--dockOnMobile` modifier
class.

```html
<article class="ModalDialog ModalDialog--dockOnMobile">
  <!-- … -->
</article>
```

#### Expanded Variant

By default, the docked dialog on mobile screens shrinks to fit the height of its content
(if smaller than the viewport). Use the `ModalDialog--expandOnMobile` class to expand the dialog on mobile.

```html
<article class="ModalDialog ModalDialog--dockOnMobile ModalDialog--expandOnMobile">
  <!-- … -->
</article>
```

## ModalHeader

ModalHeader contains the title of the dialog and the close button.

ℹ️ We strongly recommend providing the ModalHeader in every use case to ensure the dialog is accessible
and allows users to easily close it.

```html
<div class="ModalHeader">
  <h2 id="modal-example-title" class="ModalHeader__title">Modal Title</h2>
  <button
    type="button"
    class="Button Button--tertiary Button--symmetrical Button--medium"
    data-spirit-dismiss="modal"
    data-spirit-target="#modal-example"
    aria-controls="modal-example"
    aria-expanded="false"
  >
    <svg width="24" height="24" aria-hidden="true">
      <use xlink:href="/icons/svg/sprite.svg#close" />
    </svg>
    <span class="accessibility-hidden">Close</span>
  </button>
</div>
```

### Hidden Title

Even in cases you don't need the title to be visible you should provide an accessible name for the dialog, e.g. using
the `aria-label` attribute on the `<dialog>` element:

```html
<dialog id="modal-example" class="Modal" aria-label="Accessible Modal Title">
  <!-- … -->
</dialog>
```

## ModalBody

ModalBody holds the actual content of the Modal.

```html
<div class="ModalBody">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam mollitia
    perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus perferendis provident
    unde. Eveniet, iste, molestiae?
  </p>
</div>
```

## ModalFooter

ModalFooter is the place for actions represented by the Button component. While there always must be a primary Button,
secondary actions are optional.

👉 Please note the actions are _visually_ ordered from right to left from the tablet [breakpoint][dictionary-breakpoint] up. However, the
_actual_ order in code is followed when users tab over the interface.

ℹ️ We strongly recommend including the ModalFooter with at least one primary action in every use case to facilitate
user interaction and ensure consistent spacing within the dialog. Should the ModalFooter be omitted, please ensure
to compensate for the lost spacing by applying utility spacing classes to the ModalBody.

```html
<div class="ModalFooter ModalFooter--right">
  <div class="ModalFooter__actions">
    <button
      type="button"
      class="Button Button--primary Button--medium"
      data-spirit-dismiss="modal"
      data-spirit-target="#modal-example"
    >
      Primary action
    </button>
    <button
      type="button"
      class="Button Button--secondary Button--medium"
      data-spirit-dismiss="modal"
      data-spirit-target="#modal-example"
    >
      Secondary action
    </button>
  </div>
</div>
```

### Footer Description

Optionally, you can add a description to the footer:

```html
<div class="ModalFooter ModalFooter--right">
  <div class="ModalFooter__description">Optional description</div>
  <div class="ModalFooter__actions">
    <!-- Actions… -->
  </div>
</div>
```

### Footer Alignment

ModalFooter can be aligned to the right (default), center, or left. These values come from the
[alignment dictionary][dictionary-alignment]. Using a corresponding modifier class will align the footer actions
accordingly:

- `ModalFooter--right` (default)
- `ModalFooter--center`
- `ModalFooter--left`

## Opening the Modal

Use our JavaScript plugin to open your Modal, e.g.:

```html
<button
  type="button"
  class="Button Button--primary Button--medium"
  data-spirit-toggle="modal"
  data-spirit-target="#modal-example"
  aria-controls="modal-example"
  aria-expanded="false"
>
  Open Modal
</button>
```

## Disable Modal Closing on Backdrop Click

Disable modal close when clicking on the backdrop.
You can still close modal with close buttons or ESC key.

```html
<dialog id="modal-example" class="Modal Modal--center" data-spirit-backdrop-close-disabled="true">
  <!-- … -->
</dialog>
```

## Scrolling Long Content

In case the content is longer than user's viewport or device, the ModalBody will expand to fit the height of its content
and the whole ModalDialog will scroll.

### Enable Scrolling Inside ModalDialog

Scrolling inside ModalDialog can be turned on by adding the `ModalDialog--scrollable` modifier class:

```html
<article class="ModalDialog ModalDialog--scrollable">
  <!-- … -->
</article>
```

### Scrolling with ScrollView

Additionally, you can wrap the ModalBody content in a [ScrollView][scroll-view] to take over the responsibility for
scrolling, e.g.:

```html
<article class="ModalDialog ModalDialog--scrollable">
  <!-- ModalHeader -->
  <div class="ScrollView ScrollView--vertical" data-spirit-toggle="scrollView">
    <div class="ScrollView__viewport" data-spirit-element="viewport">
      <div class="ScrollView__content" data-spirit-element="content">
        <div class="ModalBody">
          <!-- … -->
        </div>
      </div>
    </div>
    <div class="ScrollView__overflowDecorators ScrollView__overflowDecorators--borders" aria-hidden="true"></div>
  </div>
  <!-- ModalFooter -->
</article>
```

### Custom Height

By default, ModalDialog grows to the height of its content until it reaches the [maximum height](#custom-max-height)
limit.

You can set a custom preferred height of ModalDialog using a custom property:

- `--modal-dialog-height` for mobile screens and up,
- `--modal-dialog-height-tablet` for tablet screens and up.
- `--modal-dialog-height-desktop` for desktop screens and up.

The custom properties fall back to the previous breakpoint using the mobile-first approach. For example, if you set
`--modal-dialog-height-tablet` while leaving `--modal-dialog-height-desktop` unset, the value will be used for
both tablet and desktop screens.

This is useful for Modals with dynamic content, e.g. a list of items that can be added or removed, or a multistep wizard.

```html
<article
  class="ModalDialog ModalDialog--scrollable"
  style="--modal-dialog-height: 400px; --modal-dialog-height-tablet: 500px; --modal-dialog-height-desktop: 600px;"
>
  <!-- … -->
</article>
```

⚠️ This feature is only available for ModalDialogs with the `ModalDialog--scrollable` modifier class.

👉 Please note the custom height values are considered **preferred**. Scrollable ModalDialog will never expand beyond
the viewport height. See the [Custom Max Height](#custom-max-height) section for more information.

### Custom Max Height

The default maximum height of a scrollable ModalDialog is **600 px**, as long as it can fit the viewport.

If the viewport is smaller, scrollable ModalDialog will shrink to fit the viewport. In such case, the ModalDialog height
will calculate as "viewport height (`100dvh`) minus 1100 spacing".

You can set a custom preferred height of ModalDialog using a custom property:

- `--modal-dialog-max-height` for mobile screens and up,
- `--modal-dialog-max-height-tablet` for tablet screens and up.
- `--modal-dialog-max-height-desktop` for desktop screens and up.

The custom properties fall back to the previous breakpoint using the mobile-first approach. For example, if you set
`--modal-dialog-max-height-tablet` while leaving `--modal-dialog-max-height-desktop` unset, the value will be used for both tablet and
desktop screens.

```html
<article
  class="ModalDialog ModalDialog--scrollable"
  style="--modal-dialog-max-height: 300px; --modal-dialog-max-height-tablet: 400px; --modal-dialog-max-height-desktop: 500px;"
>
  <!-- … -->
</article>
```

⚠️ This feature is only available for ModalDialogs with the `ModalDialog--scrollable` modifier class.

👉 If a [custom height](#custom-height) is set, the custom max height is only applied if it's smaller than the custom
height.

## Stacking Modals

Multiple Modals can be open at the same time. That means, you can open a Modal from another Modal, and they will display
stacked on top of each other. The topmost Modal is always the one that is **last in the DOM**.

```html
<!-- First Modal: -->
<dialog id="modal-first" class="Modal Modal--center" aria-labelledby="modal-first-title"></dialog>
<!-- This Modal will stack up on the previous Modal: -->
<dialog id="modal-topmost" class="Modal Modal--center" aria-labelledby="modal-topmost-title"></dialog>
```

👉 Please note that Modals **cannot be nested** into each other **in the DOM**.

## Full Example

When you put it all together:

```html
<!-- Modal Trigger: start -->
<button
  type="button"
  class="Button Button--primary Button--medium"
  data-spirit-toggle="modal"
  data-spirit-target="#modal-example"
  aria-controls="modal-example"
  aria-expanded="false"
>
  Open Modal
</button>
<!-- Modal Trigger: end -->

<!-- Modal: start -->
<dialog id="modal-example" class="Modal Modal--center" aria-labelledby="modal-example-title">
  <!-- ModalDialog: start -->
  <article class="ModalDialog">
    <!-- ModalHeader: start -->
    <div class="ModalHeader">
      <h2 id="modal-example-title" class="ModalHeader__title">Modal Title</h2>
      <button
        type="button"
        class="Button Button--tertiary Button--symmetrical Button--medium"
        data-spirit-dismiss="modal"
        data-spirit-target="#modal-example"
        aria-controls="modal-example"
        aria-expanded="false"
      >
        <svg width="24" height="24" aria-hidden="true">
          <use xlink:href="/icons/svg/sprite.svg#close" />
        </svg>
        <span class="accessibility-hidden">Close</span>
      </button>
    </div>
    <!-- ModalHeader: end -->

    <!-- ModalBody: start -->
    <div class="ModalBody">
      <!-- Content: start -->
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam mollitia
        perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus perferendis provident
        unde. Eveniet, iste, molestiae?
      </p>
      <!-- Content: end -->
    </div>
    <!-- ModalBody: end -->

    <!-- ModalFooter: start -->
    <div class="ModalFooter ModalFooter--right">
      <div class="ModalFooter__description">Optional description</div>
      <div class="ModalFooter__actions">
        <button
          type="button"
          class="Button Button--primary Button--medium"
          data-spirit-dismiss="modal"
          data-spirit-target="#modal-example"
        >
          Primary action
        </button>
        <button
          type="button"
          class="Button Button--secondary Button--medium"
          data-spirit-dismiss="modal"
          data-spirit-target="#modal-example"
        >
          Secondary action
        </button>
      </div>
    </div>
    <!-- ModalFooter: end -->
  </article>
  <!-- ModalDialog: end -->
</dialog>
<!-- Modal: end -->
```

## Toggle Attributes

Both trigger and close buttons use `data` attributes to open and close the Modal.

| Name                                   | Type     | Default | Required | Description                                             |
| -------------------------------------- | -------- | ------- | -------- | ------------------------------------------------------- |
| `aria-controls`                        | `string` | —       | ✕        | Aria controls state (auto)                              |
| `aria-expanded`                        | `string` | —       | ✕        | Aria expanded state (auto)                              |
| `data-spirit-close-on-backdrop-click`  | `bool`   | `true`  | ✕        | Whether the modal will close when backdrop is clicked   |
| `data-spirit-close-on-escape-key-down` | `bool`   | `true`  | ✕        | Whether the modal will close when escape key is pressed |
| `data-spirit-dismiss`                  | `string` | `modal` | ✕        | Iterable selector                                       |
| `data-spirit-target`                   | `string` | —       | ✓        | Target selector                                         |
| `data-spirit-toggle`                   | `string` | `modal` | ✕        | Iterable selector                                       |

## JavaScript Plugin

For full functionality you need to provide JavaScript which will handle the toggling of the Modal dialog component.

```html
<script src="node_modules/@alma-oss/spirit-web/js/cjs/spirit-web.min.js" async></script>
```

Please consult the [main package README][web-readme] for how to include JavaScript plugins.

Or feel free to write controlling scripts yourself.

[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[mdn-dialog]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
[mdn-dialog-form]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#usage_notes
[scroll-view]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/ScrollView/README.md
[web-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md
[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#alignment
