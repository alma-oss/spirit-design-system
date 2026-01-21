# Button

Button allows users to take actions.

## Basic Usage

```jsx
import { Button } from '@alma-oss/spirit-web-react';
```

```jsx
<Button color="primary">Click me</Button>
```

## Color Variants

There are several color variants of Button to choose from:

- primary, secondary, tertiary
- plain (with a transparent background)
- emotion colors: success, informative, warning, danger

```jsx
<Button>Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="tertiary">Tertiary</Button>
<Button color="plain">Plain</Button>
<Button color="success">Success</Button>
<Button color="informative">Informative</Button>
<Button color="warning">Warning</Button>
<Button color="danger">Danger</Button>
```

## Sizes

Button comes in three available sizes:

```jsx
<Button size="small">Small</Button>
<Button>Medium</Button>
<Button size="large">Large</Button>
```

## Icons

To insert an icon into a button, use the [Icon][readme-icon] component with proper spacing:

```jsx
<Button>
  <Icon name="hamburger" marginRight="space-400" />
  Menu
</Button>
```

### Icon-Only Button

Use the `isSymmetrical` prop when you only need a compact, icon-only button:

```jsx
<Button isSymmetrical>
  <Icon name="hamburger" />
  <VisuallyHidden>Menu</VisuallyHidden>
</Button>
```

⚠️ **Accessibility note:** Remember to always provide an accessible label anytime you are hiding the text label.
Learn more about it in the [Accessibility](#accessibility) section.

### Default Icon Sizes

Button automatically sets a default size for the [Icon][readme-icon] component used inside.

| Button Size | Icon Size |
| ----------- | --------- |
| small       | 20 px     |
| medium      | 20 px     |
| large       | 24 px     |

You can always set your desired size of an Icon with the [`boxSize`][readme-icon-api] prop.

## Responsive Button

Responsive buttons are buttons that toggle between displaying icon or text label depending on the viewport size.
They combine the usage of:

- [Icon][readme-icon] component
- `isSymmetrical` prop to make the button symmetrical when only the icon is visible
- [Hidden][readme-hidden] component to control visibility of a visual text label
- [VisuallyHidden][readme-visually-hidden] component to provide an accessible label

⚠️ **Accessibility note:** Remember to always provide an accessible label anytime you are hiding the text label.
Learn more about it in the [Accessibility](#accessibility) section.

### Examples

Icon on mobile, text label from tablet onwards:

```jsx
<Button isSymmetrical={{ mobile: true, tablet: false }}>
  <Icon name="hamburger" marginRight={{ tablet: 'space-400' }} />
  <VisuallyHidden>Menu</VisuallyHidden>
  <Hidden on="mobile" aria-hidden="true">
    Menu
  </Hidden>
</Button>
```

Text label on mobile, icon from tablet onwards:

```jsx
<Button isSymmetrical={{ tablet: true }}>
  <Icon name="hamburger" marginRight={{ mobile: 'space-400', tablet: 'space-0' }} />
  <VisuallyHidden>Menu</VisuallyHidden>
  <Hidden from="tablet" aria-hidden="true">
    Menu
  </Hidden>
</Button>
```

## Full-Width Button

To span a `Button` to the full width of its parent, you can use CSS utility classes or `Grid` to achieve the desired layout.

Responsive on all breakpoints:

```jsx
<div className="d-grid">
  <Button>Full-width Button</Button>
</div>
```

Full-width on mobile:

```jsx
<div className="d-grid d-tablet-block">
  <Button>Responsive full-width Button</Button>
</div>
```

Responsive full-width buttons with [Grid][readme-grid]:

```jsx
<Grid cols={{ mobile: 1, tablet: 2 }} spacing="space-1100">
  <Button>Primary responsive full-width Button</Button>
  <Button color="secondary">Secondary responsive full-width Button</Button>
</Grid>
```

### DEPRECATION NOTICE

Property `isBlock` is deprecated and will be removed in the next major release.

For more information, please read the [Full-Width Button](#full-width-button) section.

## Accessibility

⚠️ **Accessibility note:** Always use `VisuallyHidden` for the accessible label and add `aria-hidden="true"` to the
visible text or add `aria-label` to the button. Using `display: none` utility classes (like `d-tablet-none`)
hides content from screen readers, so the `VisuallyHidden` component ensures the label is always accessible
regardless of viewport size.

⚠️ Even when just the icon is meant to be visible, remember to include an accessible button label
for users with assistive technologies:

### Using `aria-label`

For example, add the `aria-label` attribute to the Button:

```jsx
<Button isSymmetrical aria-label="Menu">
  <Icon name="hamburger" />
  <Hidden on="mobile" aria-hidden="true">
    Menu
  </Hidden>
</Button>
```

### Using VisuallyHidden

Alternatively, use the [VisuallyHidden][readme-visually-hidden] component:

```jsx
<Button isSymmetrical>
  <Icon name="hamburger" />
  <VisuallyHidden>Menu</VisuallyHidden>
</Button>
```

### Using Tooltip

[Icon-only buttons](#icon-only-button) should be only used for familiar, easily recognizable actions.
In other cases, consider displaying the button label in a [Tooltip][readme-tooltip]:

```jsx
const [open, setOpen] = React.useState(false);

<Tooltip id="tooltip" isOpen={open} onToggle={setOpen}>
  <TooltipTrigger elementType={Button}>I have a tooltip!</TooltipTrigger>
  <TooltipPopover>Hello there!</TooltipPopover>
</Tooltip>;
```

👉 See the [Tooltip][readme-tooltip] documentation for more examples.

## Using a Third-Party Router

When using a third-party component, the Button will inherit all of its attributes.

```jsx
import { RouterLink } from 'react-router-dom';
import { Button } from '@alma-oss/spirit-web-react';

<Button elementType={RouterLink} to="/">
  Link to home
</Button>;
```

## API

| Name            | Type                                                                                           | Default   | Required | Description                                                                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`      | `ReactNode`                                                                                    | `null`    | ✕        | Content of the Button                                                                                                                       |
| `color`         | [ComponentButtonColorType][readme-generated-types], [EmotionColorType][readme-generated-types] | `primary` | ✕        | Color variant                                                                                                                               |
| `elementType`   | `ElementType`                                                                                  | `button`  | ✕        | Type of element                                                                                                                             |
| `isBlock`       | `bool`                                                                                         | `false`   | ✕        | [**DEPRECATED**](#deprecation-notice) Span the element to the full width of its parent, see [Full-Width Button](#full-width-button) section |
| `isDisabled`    | `bool`                                                                                         | `false`   | ✕        | If true, Button is disabled                                                                                                                 |
| `isLoading`     | `bool`                                                                                         | `false`   | ✕        | If true, Button is in a loading state, disabled and the Spinner is visible                                                                  |
| `isSymmetrical` | `bool` \| `Responsive<bool>`                                                                   | `false`   | ✕        | If true, Button has symmetrical dimensions, use object to set responsive values, e.g. `{ mobile: true, tablet: false }`                     |
| `name`          | `string`                                                                                       | —         | ✕        | For use a button as a form data reference                                                                                                   |
| `onClick`       | `(event: ClickEvent) => void`                                                                  | —         | ✕        | JS function to call on click                                                                                                                |
| `ref`           | `ForwardedRef<HTMLButtonElement>`                                                              | —         | ✕        | Button element reference                                                                                                                    |
| `size`          | [Size dictionary][dictionary-size]                                                             | `medium`  | ✕        | Size variant                                                                                                                                |
| `type`          | `string`                                                                                       | `button`  | ✕        | Type of the Button                                                                                                                          |

For more information see the [Button][button] component. Button can also bear any appropriate
attributes according to the type of element. The default element type for Button is `<button>`.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[button]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Button
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Grid/README.md
[readme-hidden]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Hidden/README.md
[readme-icon]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md
[readme-icon-api]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#api
[readme-tooltip]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Tooltip/README.md
[readme-visually-hidden]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/VisuallyHidden/README.md
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
