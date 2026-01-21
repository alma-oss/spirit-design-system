# Toast

Toast displays a brief, temporary notification that appears at a prescribed location of an application window.

Toast is a composition of a few subcomponents:

- [Toast](#toast-1)
  - [ToastBar](#toastbar)
    - [ToastBarMessage](#toastbarmessage)
    - [ToastBarLink](#toastbarlink)

## JavaScript Plugin

For full functionality, you need to provide Spirit JavaScript, which will handle toggling of the Toast component:

```html
<script src="node_modules/@alma-oss/spirit-web/js/cjs/spirit-web.min.js" async></script>
```

You will find the [full documentation](#javascript-plugin-api) of the plugin below on this page.

Please consult the [main README][web-readme] for how to include JavaScript plugins.

Or, feel free to write the controlling script yourself.

## Toast

The Toast component is a container responsible for positioning the [ToastBar](#toastbar) component. It is capable of
handling even multiple toast messages at once, stacking them in a [queue](#toast-queue).

```html
<div class="Toast" role="log">
  <div class="Toast__queue">
    <!-- ToastBar components go here -->
  </div>
</div>
```

### Accessibility

The wrapping Toast container has the [`role="log"`][mdn-role-log] attribute set (which results in an implicit
[`aria-live`][mdn-aria-live] value of `polite`). Assistive technologies then announce any **dynamic changes** inside the
container as they happen. In order for this to work, the Toast component **must be present in the DOM** on the initial
page load, even when empty.

👉 Unless you are absolutely sure that your toast messages are critical to interrupt the user, you should not change the
(implicit) `polite` value of the [`aria-live`][mdn-aria-live] attribute. When set to `assertive`, assistive technologies
immediately notify the user, potentially clearing the speech queue of previous updates.

### Alignment

The Toast component is positioned at the bottom of the screen by default. It is also fixed to the bottom of the screen,
so it will always be visible, even when the user scrolls. Available alignment options are derived from the
[AlignmentX and AlignmentY][dictionary-alignment] dictionaries and are as follows:

- `top` `left`,
- `top` `center`,
- `top` `right`,
- `bottom` `left`,
- `bottom` `center` (default),
- `bottom` `right`.

Use the `Toast--<alignmentX>` and `Toast--<alignmentY>` modifiers to change the alignment of the Toast component:

| AlignmentX/Y | left                        | center                        | right                        |
| ------------ | --------------------------- | ----------------------------- | ---------------------------- |
| top          | `Toast--top Toast--left`    | `Toast--top Toast--center`    | `Toast--top Toast--right`    |
| bottom       | `Toast--bottom Toast--left` | `Toast--bottom Toast--center` | `Toast--bottom Toast--right` |

ℹ️ The `center` vertical alignment is not supported, as it would not make sense for a toast notification to be in the
middle of the screen.

Example:

```html
<div class="Toast Toast--top Toast--right" role="log">
  <div class="Toast__queue">
    <!-- ToastBar components go here -->
  </div>
</div>
```

### Responsive Alignment

The Toast container can be aligned differently on different screen sizes. Use the `Toast--<breakpoint>--<alignmentX/Y>`
modifiers to change the alignment of the Toast component starting on a specific [breakpoint][dictionary-breakpoint], e.g. `Toast--tablet--top`,
`Tablet--desktop--left`, etc. (leave the breakpoint empty for alignment on all screen sizes, including mobile screens).

Example:

```html
<div class="Toast Toast--bottom Toast--center Toast--tablet--right" role="log">
  <div class="Toast__queue">
    <!-- ToastBar components go here -->
  </div>
</div>
```

### Mobile Screens

Positioning becomes trickier on mobile screens due to the presence of notches, rounded corners, and the virtual
keyboard. The Toast component tries to find the best position to be visible using the following detection mechanisms:

1. On devices with rounded displays and/or notches (e.g. iPhone X and newer), the Toast component is pushed inwards to
   avoid the rounded corners. The `viewport-fit="cover"` meta tag is required for this feature to work:

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
   ```

2. Android Chrome only: When the vertical alignment is set to `bottom` and the virtual keyboard is open, the Toast
   component is pushed upwards to avoid being covered by the keyboard. This feature requires the following JavaScript
   snippet and is currently supported only in Chrome 94 on Android and later.

   ```js
   // Enable CSS to detect the presence of virtual keyboard:
   if ('virtualKeyboard' in navigator) {
     navigator.virtualKeyboard.overlaysContent = true;
   }
   ```

### Toast Queue

When multiple ToastBar components are present, they stack up in a queue, separated by a gap. The ToastBar components are
sorted from top to bottom for the `top` vertical alignment, and from bottom to top for the `bottom` vertical alignment.

👉 Please note the _actual_ order in the DOM is followed when users tab over the interface, no matter the _visual_
order of the toast queue.

#### Scrolling

By default, the Toast queue becomes scrollable when it does not fit the screen.

⚠️ Please note that scrolling is not available on iOS devices due to a limitation in the WebKit engine.

👉 Please note that the initial scroll position is always at the **top** of the queue.

#### Collapsing

To make the queue collapsible, just add the `.Toast--collapsible` modifier class. The collapsible Toast queue can then
hold up to 3 ToastBar components. When the queue is full, the oldest ToastBar components are collapsed at the start of
the queue and are only accessible by closing the newer ones.

```html
<div class="Toast Toast--collapsible" role="log">
  <div class="Toast__queue">
    <!-- ToastBar components go here -->
  </div>
</div>
```

#### Toast Queue Limitations

👉 Please note only the _visible_ ToastBar components are scrollable. Collapsed items are not accessible until visible
items are dismissed.

👉 For the sake of simplicity, the collapsible items limit cannot be configured at the moment.

## ToastBar

The ToastBar component is the actual toast notification. It is a simple container with a message and a few optional
elements.

Minimum example:

```html
<div class="ToastBar ToastBar--neutral">
  <div class="ToastBar__box">
    <div class="ToastBar__container">
      <div class="ToastBar__content">
        <div class="text-truncate-multiline" data-spirit-populate-field="message">Message only</div>
      </div>
    </div>
  </div>
</div>
```

### Optional Icon

An icon can be added to the ToastBar component:

```html
<div class="ToastBar ToastBar--neutral">
  <div class="ToastBar__box">
    <div class="ToastBar__container">
      <svg width="20" height="20" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#info" />
      </svg>
      <div class="ToastBar__content">
        <div class="text-truncate-multiline" data-spirit-populate-field="message">Message with icon</div>
      </div>
    </div>
  </div>
</div>
```

### ToastBar Components

The content of `ToastBar` can be assembled from the following subcomponents:

#### ToastBarMessage

`ToastBarMessage` is a subcomponent designated for the main message in `ToastBar`.

Usage example:

```html
<div class="ToastBar ToastBar--neutral">
  <div class="ToastBar__box">
    <div class="ToastBar__container">
      <div class="ToastBar__content">
        <div class="text-truncate-multiline">Message with action</div>
      </div>
    </div>
  </div>
</div>
```

#### ToastBarLink

`ToastBarLink` is a subcomponent designated to create an action link within `ToastBar`.

Usage example:

```html
<div class="ToastBar ToastBar--neutral">
  <div class="ToastBar__box">
    <div class="ToastBar__container">
      <div class="ToastBar__content">
        <div class="text-truncate-multiline">Message with action</div>
        <a href="#" class="ToastBar__link link-underlined">Action</a>
      </div>
    </div>
  </div>
</div>
```

👉 **Do not put any important actions** like "Undo" in the ToastBar component (unless there are other means to perform
said action), as it is very hard (if not impossible) to reach for users with assistive technologies. Read more about
[Toast accessibility][scott-o-hara-toast] at Scott O'Hara's blog.

### Colors

The ToastBar component is available in all [emotion colors][dictionary-color], plus the `neutral` variant (default).
Use the `ToastBar--<color>` modifier class to change the color of the ToastBar component.

For example:

```html
<div class="ToastBar ToastBar--success">
  <div class="ToastBar__box">
    <div class="ToastBar__container">
      <div class="ToastBar__content">
        <div class="text-truncate-multiline">Success message</div>
      </div>
    </div>
  </div>
</div>
```

### Basic Interactions

For basic use cases, you can simply place the ToastBar component inside the Toast container and show/hide it using our
JavaScript plugin.

#### Showing the Static ToastBar

Use our JavaScript plugin to show a Toast **that is present in the DOM,** e.g.:

```html
<button
  type="button"
  class="Button Button--primary Button--medium"
  data-spirit-toggle="toast"
  data-spirit-target="#my-hidden-toast"
  aria-controls="my-hidden-toast"
  aria-expanded="false"
>
  Show hidden toast
</button>
```

#### Dismissible ToastBar

To make the ToastBar dismissible, add the `ToastBar--dismissible` modifier class, a unique `id` attribute, and a close
button:

```html
<div id="my-dismissible-toast" class="ToastBar ToastBar--neutral ToastBar--dismissible">
  <div class="ToastBar__box">
    <div class="ToastBar__container">
      <div class="ToastBar__content">
        <div class="ToastBar__message">Dismissible message</div>
      </div>
    </div>
    <button
      type="button"
      class="ToastBar__close"
      data-spirit-dismiss="toast"
      data-spirit-target="#my-dismissible-toast"
      aria-controls="my-dismissible-toast"
      aria-expanded="true"
    >
      <svg width="24" height="24" aria-hidden="true">
        <use xlink:href="/icons/svg/sprite.svg#close" />
      </svg>
      <span class="accessibility-hidden">Close</span>
    </button>
  </div>
</div>
```

#### Full Example

```html
<button
  type="button"
  class="Button Button--primary Button--medium"
  data-spirit-toggle="toast"
  data-spirit-target="#my-dismissible-toast"
  aria-controls="my-dismissible-toast"
  aria-expanded="false"
>
  Show hidden toast
</button>

<!-- Toast: start -->
<div class="Toast Toast--bottom Toast--center" role="log">
  <div class="Toast__queue">
    <!-- ToastBar: start -->
    <div id="my-dismissible-toast" class="ToastBar ToastBar--neutral ToastBar--dismissible is-hidden">
      <div class="ToastBar__box">
        <div class="ToastBar__container">
          <svg width="20" height="20" aria-hidden="true">
            <use xlink:href="/icons/svg/sprite.svg#info" />
          </svg>
          <div class="ToastBar__content">
            <div class="text-truncate-multiline">Toast message</div>
            <a href="#" class="ToastBar__link link-underlined">Action</a>
          </div>
        </div>
        <button
          type="button"
          class="ToastBar__close"
          data-spirit-dismiss="toast"
          aria-controls="my-dismissible-toast"
          aria-expanded="true"
        >
          <svg width="24" height="24" aria-hidden="true">
            <use xlink:href="/icons/svg/sprite.svg#close" />
          </svg>
          <span class="accessibility-hidden">Close</span>
        </button>
      </div>
    </div>
    <!-- ToastBar: end -->
  </div>
</div>
<!-- Toast: end -->
```

### Creating Dynamic ToastBars

To create ToastBar components dynamically, make sure you have the `data-spirit-element="toast-queue"` attribute set on
the `.Toast__queue` element, with just the ToastBar template inside the [`<template>`][mdn-template] tag.
The `<template>` tag must be inserted anywhere inside the Toast container. Our JavaScript Toast plugin will then pick up
the template and apply it on any toasts to be shown to the user, using the configuration provided.

```html
<div id="toast-example" class="Toast Toast--bottom Toast--center" role="log">
  <div class="Toast__queue" data-spirit-element="toast-queue">
    <!-- This is the template for new ToastBar components: -->
    <template data-spirit-snippet="item">
      <div class="ToastBar is-hidden" data-spirit-color="neutral" data-spirit-populate-field="item">
        <div class="ToastBar__box">
          <div class="ToastBar__container">
            <svg width="20" height="20" aria-hidden="true" data-spirit-populate-field="icon">
              <use xlink:href="/icons/svg/sprite.svg#info" />
            </svg>
            <div class="ToastBar__content">
              <div class="text-truncate-multiline" data-spirit-populate-field="message"></div>
              <a href="#" class="ToastBar__link link-underlined" data-spirit-populate-field="link"></a>
            </div>
          </div>
          <button
            type="button"
            class="ToastBar__close"
            data-spirit-populate-field="close-button"
            data-spirit-dismiss="toast"
            aria-expanded="true"
          >
            <svg width="24" height="24" aria-hidden="true">
              <use xlink:href="/icons/svg/sprite.svg#close" />
            </svg>
            <span class="accessibility-hidden">Close</span>
          </button>
        </div>
      </div>
    </template>
  </div>
</div>
```

Then configure and create a new Toast instance and call the `show` method on it, for example:

```js
import Toast from '@alma-oss/spirit-web/dist/js/Toast';

const toast = new Toast(null, {
  autoCloseInterval: 3000, // Set interval after ToastBar will be closed in ms, default: 3000
  color: 'informative', // One of ['neutral' (default), 'success', 'warning, 'danger', 'informative']
  containerId: 'toast-example', // Must match the ID of the Toast container in HTML
  enableAutoClose: true, // If true, ToastBar will close after `autoCloseInterval`, default: true
  message: 'Hello, this is my toast message!', // Can be plain text or HTML
  linkContent: 'Action', // Link text
  linkProps: {
    href: 'https://example.com', // Link URL
    target: '_blank', // Optional link target attribute
    underlined: false, // Optional link underlining, one of ['always' (default), 'hover', 'never']
    isDisabled: false, // Optional link disabling, default: false
    elementType: 'a', // Optional link element type, default: 'a'
  },
  hasIcon: true,
  iconName: 'info', // Optional icon name used as the #fragment in the SVG sprite URL
  id: 'my-toast', // An ID is required for dismissible ToastBar
  isDismissible: true,
});

toast.show();
```

## JavaScript Plugin API

| Method                | Description                                                                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `getInstance`         | _Static_ method which allows you to get the Toast instance associated with a ToastBar DOM element.                                                     |
| `getOrCreateInstance` | _Static_ method which allows you to get the Toast instance associated with a ToastBar DOM element, or create a new one in case it wasn’t initialized.  |
| `hide`                | Hides the toast element. Returns to the caller before the toast has actually been hidden (i.e. before the `hidden.toast` event occurs).                |
| `show`                | Reveals or creates the toast element. **Returns to the caller before the toast has actually been shown** (i.e. before the `shown.toast` event occurs). |

```js
const toast = Toast.getInstance('#example'); // Returns a toast instance

toast.show();
```

### JavaScript Events

| Method         | Description                                                                           |
| -------------- | ------------------------------------------------------------------------------------- |
| `hidden.toast` | This event is fired when the `hide` instance has finished being hidden from the user. |
| `hide.toast`   | This event is fired immediately when the `hide` instance method has been called.      |
| `show.toast`   | This event fires immediately when the `show` instance method is called.               |
| `shown.toast`  | This event is fired when the `show` instance has finished being shown to the user.    |

```js
const myToastEl = document.getElementById('my-toast');
const toast = Toast.getOrCreateInstance(myToastEl);

myToastEl.addEventListener('hidden.toast', () => {
  // Do something…
});

toast.hide();
```

[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[mdn-role-log]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/log_role
[mdn-aria-live]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live
[mdn-template]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#alignment
[dictionary-color]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#color
[scott-o-hara-toast]: https://www.scottohara.me/blog/2019/07/08/a-toast-to-a11y-toasts.html
[web-readme]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md
