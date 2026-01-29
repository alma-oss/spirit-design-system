# Offcanvas

Offcanvas is a sidebar component that can be toggled via JavaScript to appear from the right edge of the viewport.
Buttons or anchors are used as triggers that are attached to specific elements you toggle, and data attributes are used to invoke JavaScript plugin.

## JavaScript Plugin

For full functionality, you need to [provide Spirit JavaScript][js-plugin-readme], which will handle
toggling of the Offcanvas component:

```html
<script src="node_modules/@alma-oss/spirit-web/js/cjs/spirit-web.min.js" async></script>
```

## Usage

### Via Data Attributes

Add `data-spirit-toggle="offcanvas"` and a `data-spirit-target` to the element to automatically assign control of one Offcanvas element.
The `data-spirit-target` attribute accepts a CSS selector to apply the Offcanvas to.

```html
<button
  type="button"
  class="Button Button--inverted Button--medium Button--symmetrical"
  data-spirit-toggle="offcanvas"
  data-spirit-target="#offcanvas-example"
  aria-controls="offcanvas-example"
  aria-expanded="false"
>
  <svg width="24" height="24" aria-hidden="true">
    <use xlink:href="/icons/svg/sprite.svg#hamburger" />
  </svg>
  <span class="accessibility-hidden">Menu</span>
</button>

<dialog id="offcanvas-example">…</dialog>
```

### Via JavaScript

Enable manually with:

```js
const offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'));
const offcanvasList = offcanvasElementList.map(function (offcanvasElement) {
  return new Offcanvas(offcanvasElement);
});
```

### Options

Options can be passed via data attributes or JavaScript.
For data attributes, append the option name to `data-spirit-`, as in `data-spirit-breakpoint-desktop="1280"`.

| Name                      | Type      | Default | Description                                                                                |
| ------------------------- | --------- | ------- | ------------------------------------------------------------------------------------------ |
| `breakpoint-desktop`      | `string`  | 1280 \* | Desktop [breakpoint][dictionary-breakpoint] on which opened Offcanvas automatically closes |
| `closableOnBackdropClick` | `boolean` | `true`  | Whether clicking on the backdrop closes the Offcanvas                                      |
| `closableOnEscapeKey`     | `boolean` | `true`  | Whether pressing the Escape key closes the Offcanvas                                       |

\*: Default value of the design token `other.breakpoint.desktop`. Can be also changed via `--spirit-breakpoint-desktop` CSS custom property.
This CSS property is pre-defined in our foundation CSS.

### Methods

Activates your content as an Offcanvas element. Accepts an optional options object.

You can create an Offcanvas instance with the constructor, for example:

```js
const customOffcanvas = document.getElementById('custom-offcanvas');
const spiritOffcanvas = new Offcanvas(customOffcanvas);
```

| Method                | Description                                                                                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `toggle`              | Toggles an Offcanvas element to shown or hidden. Returns to the caller before the Offcanvas element has actually been shown or hidden (i.e. before the `show.offcanvas` or `hidden.offcanvas` event occurs). |
| `show`                | Shows an Offcanvas element. Returns to the caller before the Offcanvas element has actually been shown (i.e. before the `shown.offcanvas` event occurs).                                                     |
| `hide`                | Hides an Offcanvas element. Returns to the caller before the Offcanvas element has actually been hidden (i.e. before the `hidden.offcanvas` event occurs).                                                   |
| `getInstance`         | Static method which allows you to get the Offcanvas instance associated with a DOM element                                                                                                                   |
| `getOrCreateInstance` | Static method which allows you to get the Offcanvas instance associated with a DOM element, or create a new one in case it wasn’t initialised                                                                |

### Events

Spirit's Offcanvas class exposes a few events for hooking into Offcanvas functionality.

| Event type         | Description                                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `show.offcanvas`   | This event fires immediately when the show instance method is called.                                                        |
| `shown.offcanvas`  | This event is fired when an offcanvas element has been made visible to the user (will wait for CSS transitions to complete). |
| `hide.offcanvas`   | This event is fired immediately when the hide method has been called.                                                        |
| `hidden.offcanvas` | This event is fired when an offcanvas element has been hidden from the user (will wait for CSS transitions to complete)      |

```js
const myOffcanvas = document.getElementById('custom-offcanvas');
myOffcanvas.addEventListener('hidden.offcanvas', function () {
  // do something...
});
```

[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[js-plugin-readme]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web#javascript
