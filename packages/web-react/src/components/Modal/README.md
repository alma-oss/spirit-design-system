# Modal

This is the React implementation of the [Modal][modal] component.

Modal is a composition of several subcomponents:

- [Modal](#modal)
  - [Modal](#modal-1)
    - [Vertical Alignment](#vertical-alignment)
    - [API](#api)
  - [ModalDialog](#modaldialog)
    - [Forms in Modal](#forms-in-modal)
    - [Dropdowns in Modal](#dropdowns-in-modal)
    - [Docked Modals on Mobile Screens](#docked-modals-on-mobile-screens)
      - [Expanded Variant](#expanded-variant)
    - [API](#api-1)
  - [ModalHeader](#modalheader)
    - [Hidden Title](#hidden-title)
    - [API](#api-2)
  - [ModalBody](#modalbody)
    - [API](#api-3)
  - [ModalFooter](#modalfooter)
    - [Footer Description](#footer-description)
    - [Footer Alignment](#footer-alignment)
    - [API](#api-4)
  - [Opening the Modal](#opening-the-modal)
  - [Scrolling Long Content](#scrolling-long-content)
    - [Enable Scrolling Inside ModalDialog](#enable-scrolling-inside-modaldialog)
    - [Scrolling with ScrollView](#scrolling-with-scrollview)
    - [Custom Height](#custom-height)
    - [Custom Max Height](#custom-max-height)
  - [Stacking Modals](#stacking-modals)
  - [Full Example](#full-example)

## Modal

Modal establishes the top layer with a backdrop. Under the hood it uses the [`<dialog>` element][mdn-dialog] which
provides several accessibility advantages.

```jsx
<Modal id="modal-example">…</Modal>
```

### Vertical Alignment

Modal can be aligned to the center (default), top, or bottom. These values come from the
[alignment dictionary][dictionary-alignment]. Using a corresponding alignment option will align the modal accordingly:

- `top`
- `center` (default)
- `bottom`

Example:

```jsx
<Modal alignmentY="top" id="modal-example">
  …
</Modal>
```

### API

| Name                   | Type                                           | Default  | Required | Description                                             |
| ---------------------- | ---------------------------------------------- | -------- | -------- | ------------------------------------------------------- |
| `alignmentY`           | [AlignmentY dictionary][dictionary-alignment]  | `center` | ✕        | Vertical alignment of modal                             |
| `children`             | `ReactNode`                                    | —        | ✕        | Children node                                           |
| `closeOnBackdropClick` | `bool`                                         | `true`   | ✕        | Whether the modal will close when backdrop is clicked   |
| `closeOnEscapeKeyDown` | `bool`                                         | `true`   | ✕        | Whether the modal will close when escape key is pressed |
| `id`                   | `string`                                       | —        | ✓        | Modal ID                                                |
| `isOpen`               | `bool`                                         | `false`  | ✓        | Open state                                              |
| `onClose`              | `(event: ClickEvent or KeyboardEvent) => void` | —        | ✓        | Callback on dialog closed                               |

Also, all properties of the [`<dialog>` element][mdn-dialog] are supported.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## ModalDialog

ModalDialog is the actual dialog window, a place for the header, body, and footer of the dialog.

```jsx
<ModalDialog>…</ModalDialog>
```

### Forms in Modal

Modal can also contain interactive content like forms. For such cases, you may find it convenient to use the `<form>`
element with the attribute `method="dialog"`. Buttons with `type="submit"` then [handle both][mdn-dialog-form] saving
the state of the form and closing the dialog.

```jsx
<ModalDialog elementType="form" method="dialog" name="modal-example">
  …<Button type="submit">Save</Button>
</ModalDialog>
```

### Dropdowns in Modal

Dropdowns can be safely used inside **non-scrollable** Modals so that the Dropdown popover is not clipped by the Modal's
boundaries.

👉 See the [Scrolling Long Content](#scrolling-long-content) section for more information on scroll control of Modals.

### Docked Modals on Mobile Screens

On mobile screens, Modal can be docked to the bottom of the viewport using the `isDockedOnMobile` option.

```jsx
<ModalDialog isDockedOnMobile>…</ModalDialog>
```

#### Expanded Variant

By default, the docked dialog on mobile screens shrinks to fit the height of its content
(if smaller than the viewport). Use the `isExpandedOnMobile` option to expand the dialog on mobile.

```jsx
<ModalDialog isDockedOnMobile isExpandedOnMobile>
  …
</ModalDialog>
```

### API

| Name                 | Type                    | Default   | Required | Description                                                                                                                       |
| -------------------- | ----------------------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `children`           | `ReactNode`             | —         | ✕        | Children node                                                                                                                     |
| `elementType`        | \[`article` \| `form`]  | `article` | ✕        | ModalDialog element type                                                                                                          |
| `height`             | \[`string` \| `object`] | `null`    | ✕        | Height of the modal. Accepts any valid CSS value or an object with [breakpoint][dictionary-breakpoint] keys for responsive values |
| `isDockedOnMobile`   | `bool`                  | `false`   | ✕        | Dock the ModalDialog to the bottom of the screen on mobile                                                                        |
| `isExpandedOnMobile` | `bool`                  | `false`   | ✕        | If true, ModalDialog expands to fit the viewport on mobile                                                                        |
| `isScrollable`       | `bool`                  | `true`    | ✕        | If the ModalDialog should be scrollable. If set to `false`, the dialog will not scroll and will expand to fit the content         |
| `maxHeight`          | \[`string` \| `object`] | `null`    | ✕        | Max height of the modal. Accepts any valid CSS value or an object with breakpoint keys for responsive values                      |

Also, all properties of the [`<article>` element][mdn-article] and [`<form>` element][mdn-form] are supported.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## ModalHeader

ModalHeader contains the title of the dialog and the close button.

ℹ️ We strongly recommend providing the ModalHeader in every use case to ensure the dialog is accessible
and allows users to easily close it.

```jsx
<ModalHeader>Modal Title</ModalHeader>
```

### Hidden Title

Even in cases where you don't need the title to be visible you should provide an
accessible name for the dialog, e.g. using the `aria-label` attribute on
`<Modal>` component:

```jsx
<Modal id="modal-example" aria-label="Accessible Modal Title">
  <ModalDialog>
    <ModalHeader />
    <ModalBody>…</ModalBody>
  </ModalDialog>
</Modal>
```

### Hidden Close Button

To render the `ModalHeader` component without the close button set the `hasCloseButton` prop to false.

```jsx
<Modal id="modal-hidden-close-button">
  <ModalDialog>
    <ModalHeader hasCloseButton={false} />
    <ModalBody>…</ModalBody>
  </ModalDialog>
</Modal>
```

### API

| Name             | Type        | Default | Required | Description                      |
| ---------------- | ----------- | ------- | -------- | -------------------------------- |
| `children`       | `ReactNode` | —       | ✕        | Children node                    |
| `closeLabel`     | `string`    | `Close` | ✕        | Close button label               |
| `hasCloseButton` | `bool`      | `true`  | ✕        | Whether close button is rendered |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## ModalBody

ModalBody holds the actual content of the Modal.

```jsx
<ModalBody>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam mollitia
    perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus perferendis provident
    unde. Eveniet, iste, molestiae?
  </p>
</ModalBody>
```

### API

| Name       | Type        | Default | Required | Description   |
| ---------- | ----------- | ------- | -------- | ------------- |
| `children` | `ReactNode` | —       | ✕        | Children node |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## ModalFooter

ModalFooter is the place for actions represented by the Button component. While there always must be a primary Button,
secondary actions are optional.

👉 Please note the actions are _visually_ ordered from right to left from the tablet breakpoint up. However, the
_actual_ order in code is followed when users tab over the interface.

ℹ️ We strongly recommend including the ModalFooter with at least one primary action in every use case to facilitate
user interaction and ensure consistent spacing within the dialog. Should the ModalFooter be omitted, please ensure
to compensate for the lost spacing by applying utility spacing classes to the ModalBody.

```jsx
<ModalFooter>
  <Button color="primary">Primary action</Button>
  <Button color="secondary">Secondary action</Button>
</ModalFooter>
```

### Footer Description

Optionally, you can add a description to the footer:

```jsx
<ModalFooter description="Optional description">…</ModalFooter>
```

### Footer Alignment

ModalFooter can be aligned to the right (default), center, or left. These values come from the
[alignment dictionary][dictionary-alignment]. Using a corresponding alignment option will align the footer actions
accordingly:

- `right` (default)
- `center`
- `left`

```jsx
<ModalFooter alignmentX="right">…</ModalFooter>
```

### API

| Name          | Type                                          | Default | Required | Description                 |
| ------------- | --------------------------------------------- | ------- | -------- | --------------------------- |
| `alignmentX`  | [AlignmentX dictionary][dictionary-alignment] | `right` | ✕        | ModalFooter alignment       |
| `children`    | `ReactNode`                                   | —       | ✕        | Children node               |
| `description` | `string`                                      | `null`  | ✕        | Optional Footer Description |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Opening the Modal

Use a hook to open your Modal, e.g.:

```jsx
const [isOpen, setOpen] = useState(false);
const toggleModal = () => setOpen(!isOpen);
const handleClose = () => setOpen(false);

<Button onClick={toggleModal} aria-controls="modal-example" aria-expanded={isOpen}>
  Open Modal
</Button>;
```

## Scrolling Long Content

In case the content is longer than user's viewport or device, the ModalBody will expand to fit the height of its content
and the whole ModalDialog will scroll.

### Enable Scrolling Inside ModalDialog

Scrolling inside ModalDialog can be turned on by adding the `isScrollable` prop:

```jsx
<ModalDialog isScrollable>…</ModalDialog>
```

### Scrolling with ScrollView

To make content overflow more obvious to users, you can wrap the `ModalBody` content in a [ScrollView][scroll-view] that
takes over the responsibility for scrolling and provides visual overflow decorators, e.g.:

```jsx
<ModalDialog isScrollable>
  …
  <ScrollView overflowDecorators="both">
    <ModalBody>…Long content…</ModalBody>
  </ScrollView>
  …
</ModalDialog>
```

### Custom Height

By default, ModalDialog grows to the height of its content until it reaches the [maximum height](#custom-max-height)
limit.

You can set a custom preferred height of ModalDialog using the `height` prop.
The prop accepts any valid CSS length value, either as a string or an object with breakpoints as keys.

The height property falls back to the previous breakpoint using the mobile-first approach. For example, if you set
`height={{ tablet: '500px' }}` while not setting the `desktop` breakpoint, the value will be used for
both tablet and desktop screens. The single non-object value will be used for all breakpoints.
This is useful for Modals with dynamic content, e.g. a list of items that can be added or removed, or a multistep wizard.

```jsx
<ModalDialog isScrollable height="500px">
  …
</ModalDialog>
<ModalDialog isScrollable height={{ mobile: '300px', tablet: '500px', desktop: '600px' }}>
  …
</ModalDialog>
```

⚠️ This feature is only available for ModalDialogs with the `isScrollable` prop.

👉 Please note the custom height values are considered **preferred**. Scrollable ModalDialog will never expand beyond
the viewport height. See the [Custom Max Height](#custom-max-height) section for more information.

### Custom Max Height

The default maximum height of a scrollable ModalDialog is **600 px**, as long as it can fit the viewport.

If the viewport is smaller, scrollable ModalDialog will shrink to fit the viewport. In such case, the ModalDialog height
will calculate as "viewport height (`100dvh`) minus 1100 spacing".

You can use the `maxHeight` prop to override the default maximum height limit.

The max height property falls back to the previous breakpoint using the mobile-first approach. For example, if you set
`maxHeight={{ tablet: '500px' }}` while not setting the `desktop` breakpoint, the value will be used for
both tablet and desktop screens. The single non-object value will be used for all breakpoints.

```jsx
<ModalDialog isScrollable maxHeight="700px">
  …
</ModalDialog>
<ModalDialog isScrollable maxHeight={{ mobile: '500px', tablet: '700px', desktop: '800px' }}>
  …
</ModalDialog>
```

⚠️ This feature is only available for ModalDialogs with the `isScrollable` prop.

👉 If a [custom height](#custom-height) is set, the custom max height is only applied if it's smaller than the custom
height.

## Stacking Modals

Multiple Modals can be open at the same time. That means, you can open a Modal from another Modal, and they will display
stacked on top of each other. The topmost Modal is always the one that is **last in the DOM**.

```jsx
<!-- First Modal: -->
<Modal id="modal-first"></Modal>
<!-- This Modal will stack up on the previous Modal: -->
<Modal id="modal-topmost"></Modal>
```

👉 Please note that Modals **cannot be nested** into each other **in the DOM**.

## Full Example

When you put it all together:

```jsx
import {
  Button,
  Modal,
  ModalBody,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ScrollView,
} from '@alma-oss/spirit-web-react';

const [isOpen, setOpen] = useState(false);
const toggleModal = () => setOpen(!isOpen);
const handleClose = () => setOpen(false);

<Button
  onClick={toggleModal}
  aria-controls="modal-example"
  aria-expanded={isOpen}
>
  Open Modal
</Button>

<Modal id="modal-example" isOpen={isOpen} onClose={handleClose}>
  <ModalDialog>
    <ModalHeader>Title of the Modal</ModalHeader>
    <ScrollView overflowDecorators="both">
      <ModalBody>Modal body</ModalBody>
    </ScrollView>
    <ModalFooter description="Modal footer description">
      <Button color="primary" onClick={handleClose}>
        Submit
      </Button>
      <Button color="tertiary" onClick={handleClose}>
        Cancel
      </Button>
    </ModalFooter>
  </ModalDialog>
</Modal>
```

## Icons

This component uses the `Icon` component internally. To ensure correct rendering,
please refer to the [Icon component documentation][web-react-icon-documentation] for setup instructions.

[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#alignment
[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[mdn-article]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article
[mdn-dialog-form]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#usage_notes
[mdn-dialog]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
[mdn-form]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
[modal]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Modal
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[scroll-view]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ScrollView/README.md
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
