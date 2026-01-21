# Toast

This is the React implementation of the [Toast][web-toast] component.

Toast displays a brief, temporary notification that appears at a prescribed location of an application window.

Toast is a composition of a few subcomponents:

- [Toast](#toast)
  - [ToastBar](#toastbar)
    - [ToastBarMessage](#toastbarmessage)
    - [ToastBarLink](#toastbarlink)
- [UncontrolledToast](#uncontrolledToast)

## Toast

The Toast component is a container responsible for positioning the [ToastBar](#toastbar) component. It is capable of
handling even multiple toast messages at once, stacking them in a [queue](#toast-queue).

```jsx
import { Toast } from '@alma-oss/spirit-web-react';
```

```jsx
<Toast>
  <!-- ToastBar components go here -->
</Toast>
```

### Accessibility

The wrapping Toast container has the [`role="log"`][mdn-role-log] attribute set (which results in an implicit
[`aria-live`][mdn-aria-live] value of `polite`). Assistive technologies then announce any **dynamic changes** inside the
container as they happen. In order for this to work, the Toast component **must be present in the DOM** on the initial
page load, even when empty.

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

Use the `alignmentX` and `alignmentY` options to change the alignment of the Toast component.

ℹ️ The `center` vertical alignment is not supported, as it would not make sense for a toast notification to be in the
middle of the screen.

Example:

```jsx
<Toast alignmentX="right" alignmentY="top">
  <!-- ToastBar components go here -->
</Toast>
```

### Responsive Alignment

Pass an object to props to set different values for different [breakpoints][dictionary-breakpoint]. The values will be applied from mobile to
desktop and if not set for a breakpoint, the value from the previous breakpoint will be used.

Example:

```jsx
<Toast alignmentX="{{ mobile: 'center', tablet: 'right' }}" alignmentY="top">
  <!-- ToastBar components go here -->
</Toast>
```

### Mobile Screens

Positioning becomes trickier on mobile screens due to the presence of notches, rounded corners, and the virtual
keyboard. The Toast component tries to find the best position to be visible using the following detection mechanisms:

1. On **devices with rounded displays and/or notches** (e.g. iPhone X and newer), the Toast component is pushed inwards
   to avoid the rounded corners. The `viewport-fit="cover"` meta tag is required for this feature to work:

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
   ```

2. **Android Chrome only:** When the vertical alignment is set to `bottom` and the virtual keyboard is open, the Toast
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

#### Collapsing

The collapsible Toast queue is turned on by default and can hold up to 3 ToastBar components.
When the queue is full, the oldest ToastBar components are collapsed at the start of
the queue and are only accessible by closing the newer ones.

#### Scrolling

By default, the Toast queue collapses when there are more than 3 ToastBars. To turn off this behavior and make the queue scrollable when it does not fit the screen,
set the `isCollapsible` prop to `false`.

⚠️ Please note that scrolling is not available on iOS devices due to a limitation in the WebKit engine.

👉 Please note that the initial scroll position is always at the **top** of the queue.

```jsx
<Toast isCollapsible={false}>
  <!-- ToastBar components go here -->
</Toast>
```

#### Toast Queue Limitations

👉 Please note only the _visible_ ToastBar components are scrollable. Collapsed items are not accessible until visible
items are dismissed.

👉 For the sake of simplicity, the collapsible items limit cannot be configured at the moment.

### API

| Name            | Type                                                         | Default  | Required | Description                                                       |
| --------------- | ------------------------------------------------------------ | -------- | -------- | ----------------------------------------------------------------- |
| `alignmentX`    | \[[AlignmentX dictionary][dictionary-alignment] \| `object`] | `center` | ✕        | Horizontal alignment of the toast queue                           |
| `alignmentY`    | \[`top` \| `bottom` \| `object`]                             | `bottom` | ✕        | Vertical alignment of the toast queue                             |
| `isCollapsible` | `bool`                                                       | `true`   | ✕        | If true, Toast queue collapses if there are more than 3 ToastBars |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## ToastBar

The ToastBar component is the actual toast notification. It is a simple container with a message and a few optional
elements.

Minimum example:

```jsx
import { ToastBar, ToastBarMessage } from '@alma-oss/spirit-web-react';

<ToastBar id="my-toast">
  <ToastBarMessage>Message only</ToastBarMessage>
</ToastBar>;
```

### Optional Icon

An icon can be displayed in the ToastBar component, depending on the color of the ToastBar:

```jsx
<ToastBar id="my-toast" color="success" hasIcon>
  <ToastBarMessage>Message with icon</ToastBarMessage>
</ToastBar>
```

Alternatively, a custom icon can be used:

```jsx
<ToastBar id="my-toast" iconName="download">
  <ToastBarMessage>Message with custom icon</ToastBarMessage>
</ToastBar>
```

#### Default Icons According to Color Variant

| Color name    | Icon name     |
| ------------- | ------------- |
| `danger`      | `danger`      |
| `informative` | `info`        |
| `neutral`     | `info`        |
| `success`     | `check-plain` |
| `warning`     | `warning`     |

### ToastBar Components

The content of `ToastBar` can be assembled from the following subcomponents:

#### ToastBarMessage

`ToastBarMessage` is a subcomponent designated for the main message in `ToastBar`.

Usage example:

```jsx
<ToastBar id="my-toast" isOpen={isOpen} onClose={() => setIsOpen(false)} isDismissible>
  <ToastBarMessage>This is the main toast message.</ToastBarMessage>
</ToastBar>
```

#### API

| Name       | Type        | Default | Required | Description                    |
| ---------- | ----------- | ------- | -------- | ------------------------------ |
| `children` | `ReactNode` | —       | ✓        | Content of the ToastBarMessage |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

#### ToastBarLink

`ToastBarLink` is a subcomponent designated to create an action link within `ToastBar`.

Usage example:

```jsx
<ToastBar id="my-toast" isOpen={isOpen} onClose={() => setIsOpen(false)} isDismissible>
  <ToastBarLink href="#">This is the action link.</ToastBarLink>
</ToastBar>
```

#### API

| Name          | Type                              | Default | Required | Description                   |
| ------------- | --------------------------------- | ------- | -------- | ----------------------------- |
| `children`    | `ReactNode`                       | —       | ✓        | Content of the ToastBarLink   |
| `elementType` | `ElementType`                     | `a`     | ✕        | Type of element used as       |
| `href`        | `string`                          | —       | ✕        | ToastBarLink's href attribute |
| `ref`         | `ForwardedRef<HTMLAnchorElement>` | —       | ✕        | Link element reference        |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

👉 **Do not put any important actions** like "Undo" in the ToastBar component (unless there are other means to perform
said action), as it is very hard (if not impossible) to reach for users with assistive technologies. Read more about
[Toast accessibility][scott-o-hara-toast] at Scott O'Hara's blog.

### Colors

The ToastBar component is available in all emotion colors, plus the `neutral` variant (default).
Use the `color` option to change the color of the ToastBar component.

For example:

```jsx
import { ToastBarMessage } from '@alma-oss/spirit-web-react';

<ToastBar id="my-toast" color="success">
  <ToastBarMessage>Success message</ToastBarMessage>
</ToastBar>;
```

### Opening the ToastBar

Set `isOpen` prop to `true` to open a Toast **that is present in the DOM,** e.g.:

```jsx
<ToastBar id="my-toast" isOpen>
  <ToastBarMessage>Opened ToastBar</ToastBarMessage>
</ToastBar>
```

👉 Advanced toast queue control is not yet implemented.

### Dismissible ToastBar

To make the ToastBar dismissible, add the `isDismissible` prop along with a `onClose` function:

```jsx
<ToastBar id="my-toast" onClose={() => {}} isDismissible>
  <ToastBarMessage>Dismissible message</ToastBarMessage>
</ToastBar>
```

### API

| Name            | Type                                                            | Default    | Required | Description                                         |
| --------------- | --------------------------------------------------------------- | ---------- | -------- | --------------------------------------------------- |
| `closeLabel`    | `string`                                                        | `Close`    | ✕        | Close label                                         |
| `color`         | \[[EmotionColorNamesType][readme-generated-types] \| `neutral`] | `neutral`  | ✕        | Color variant                                       |
| `hasIcon`       | `bool`                                                          | `false` \* | ✕        | If true, an icon is shown along the message         |
| `iconName`      | `string`                                                        | `info` \*  | ✕        | Name of a custom icon to be shown along the message |
| `id`            | `string`                                                        | —          | ✓        | ToastBar ID                                         |
| `isDismissible` | `bool`                                                          | `false`    | ✕        | If true, ToastBar can be dismissed by user          |
| `isOpen`        | `bool`                                                          | `true`     | ✕        | If true, ToastBar is visible                        |
| `onClose`       | `function`                                                      | —          | ✕        | Close button callback                               |

(\*) For each emotion color, a default icon is defined.
The icons come from the [Icon package][icon-package], or from your custom source of icons.
Read the section [Default Icons according to Color Variant](#default-icons-according-to-color-variant).

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Full Example

```jsx
import { Button, Toast, ToastBar, ToastBarMessage, ToastBarLink } from '@alma-oss/spirit-web-react';

const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)} aria-expanded={isOpen} aria-controls="my-toast">
  {buttonLabel}
</Button>

<Toast>
  <ToastBar id="my-toast" isOpen={isOpen} onClose={() => setIsOpen(false)} isDismissible>
    <ToastBarMessage>Toast message</ToastBarMessage>
    <ToastBarLink href="#">Action</ToastBarLink>
  </ToastBar>
</Toast>
```

## UncontrolledToast

```jsx
import { ToastProvider, UncontrolledToast } from '@alma-oss/spirit-web-react';
```

### Minimal Props

```jsx
const { show } = useToast(); // must be inside ToastProvider

<ToastProvider>
  <Button type="button" onClick={() => show(ToastTextWithLink, 'toast-id')}>
    Show Toast
  </Button>

  <UncontrolledToast />
</ToastProvider>;
```

### All Possible Props

```jsx
const { show } = useToast(); // must be inside ToastProvider

<ToastProvider>
  <Button
    type="button"
    onClick={() =>
      show('Toast message', 'toast-id', {
        color: 'danger',
        iconName: 'download',
      })
    }
  >
    Show Toast
  </Button>

  <UncontrolledToast alignmentX="right" alignmentY="top" closeLabel="Close toast" hasIcon isDismissible isCollapsible />
</ToastProvider>;
```

### `useToast` Hook

Hook that provides information on `UncontrolledToast` and functions for opening and closing.
What is uncontrolled component you can find [here][react-uncontrolled]

This hook returns:

| Name       | Type                                                            | Default   | Description                                         |
| ---------- | --------------------------------------------------------------- | --------- | --------------------------------------------------- |
| `clear`    | `() => void`                                                    | () => {}  | Function that will clear toast queue                |
| `color`    | \[[EmotionColorNamesType][readme-generated-types] \| `neutral`] | `neutral` | Color variant                                       |
| `hide`     | `(toastId) => void`                                             | () => {}  | Function that will hide UncontrolledToast           |
| `iconName` | `string`                                                        | —         | Name of a custom icon to be shown along the message |
| `id`       | `string`                                                        | `''`      | ToastBar ID                                         |
| `isOpen`   | `bool`                                                          | `false`   | Open state of UncontrolledToast                     |
| `message`  | \[`string` \| `ReactNode`]                                      | null      | Message inside UncontrolledToast                    |
| `show`     | `(message, toastId, options?) => void`                          | () => {}  | Function that will show UncontrolledToast           |

#### How to Use `show` Function

This function has two required parameters: message and ID.
All other options are not required and can be omitted entirely.

```jsx
const { show } = useToast();

                            ┌─⫸ Message inside UncontrolledToast (required)
                            │                       ┌─⫸ Link text inside UncontrolledToast (required)
                            │                       │                ┌─⫸ ToastBar ID (required)
                            │                       │                │
show({content: { message: 'Toast message', link: 'Link action' }}, 'toast-id', {
  autoCloseInterval: 3000,  // Set interval in ms after ToastBar will be closed, default: 3000
  color: 'danger',         // Color variant, default: 'neutral'
  enableAutoClose: true,    // If true, ToastBar will close after `autoCloseInterval`, default: true
  hasIcon: true,            // If true, an icon is shown along the message, default: false \*
  iconName: 'download',    // Name of a custom icon to be shown along the message, default: undefined
  isDismissible: true      // If true, ToastBar can be dismissed by user, default: false
  linkProps: {             // Props for the link
    href: 'https://example.com', // Link URL
    target: '_blank',      // Optional link target attribute
    elementType: 'a',      // Optional link element type, default: 'a'
  },
});
```

(\*) For each emotion color, a default icon is defined.
The icons come from the [Icon package][icon-package], or from your custom source of icons.
Read the section [Default Icons according to Color Variant](#default-icons-according-to-color-variant).

### API

| Name            | Type                                                         | Default  | Required | Description                                                       |
| --------------- | ------------------------------------------------------------ | -------- | -------- | ----------------------------------------------------------------- |
| `alignmentX`    | \[[AlignmentX dictionary][dictionary-alignment] \| `object`] | `center` | ✕        | Horizontal alignment of the toast queue                           |
| `alignmentY`    | \[`top` \| `bottom` \| `object`]                             | `bottom` | ✕        | Vertical alignment of the toast queue                             |
| `closeLabel`    | `string`                                                     | `Close`  | ✕        | Close label                                                       |
| `isCollapsible` | `bool`                                                       | `true`   | ✕        | If true, Toast queue collapses if there are more than 3 ToastBars |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Icons

This component uses the `Icon` component internally. To ensure correct rendering,
please refer to the [Icon component documentation][web-react-icon-documentation] for setup instructions.

[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#alignment
[dictionary-breakpoint]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#breakpoint
[icon-package]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/icons
[mdn-aria-live]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live
[mdn-role-log]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/log_role
[react-uncontrolled]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#controlled-vs-uncontrolled-components
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[scott-o-hara-toast]: https://www.scottohara.me/blog/2019/07/08/a-toast-to-a11y-toasts.html
[web-react-icon-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
[web-toast]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Toast
