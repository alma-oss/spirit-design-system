# ControlButton

ControlButton is ideal for interfaces where buttons aren't meant to draw a lot of attention.
It uses a lighter visual design than [Button][button] and adapts to its background color context.

## When to Use ControlButton

Use **ControlButton** for:

- **Close buttons** in modals, dialogs, and notifications
- **Navigation controls** like ScrollView arrows or carousel controls
- **Icon-only actions** that need minimal visual weight

Do you need size consistency with form controls or a heavier visual? Use [Button][button] instead.

## Basic Usage

```jsx
import { ControlButton, Icon } from '@alma-oss/spirit-web-react';

<ControlButton isSymmetrical aria-label="Close">
  <Icon name="close" />
</ControlButton>;
```

## Variants

### Default (With Border)

The default variant with a visible border:

```jsx
<ControlButton isSymmetrical aria-label="Close">
  <Icon name="close" />
</ControlButton>
```

### Subtle (Without Border)

Remove the border by adding `isSubtle`:

```jsx
<ControlButton isSubtle isSymmetrical aria-label="Close">
  <Icon name="close" />
</ControlButton>
```

## Sizes

ControlButton supports three sizes:

```jsx
<ControlButton size="small" isSymmetrical aria-label="Close">
  <Icon name="close" />
</ControlButton>

{/* Default, i.e. medium size */}
<ControlButton isSymmetrical aria-label="Close">
  <Icon name="close" />
</ControlButton>

<ControlButton size="large" isSymmetrical aria-label="Close">
  <Icon name="close" />
</ControlButton>
```

## Symmetrical ControlButton

Use the `isSymmetrical` prop to make the control button have equal width and height. This is typically used for icon-only buttons.

```jsx
<ControlButton isSymmetrical aria-label="Close">
  <Icon name="close" />
</ControlButton>
```

You can define responsive values for the `isSymmetrical` prop using an object:

```jsx
<ControlButton isSymmetrical={{ tablet: true }} aria-label="Close">
  <Icon name="close" />
</ControlButton>
```

To turn off symmetrical from a specific breakpoint onwards, set the value to `false`:

```jsx
<ControlButton isSymmetrical={{ mobile: true, tablet: false }} aria-label="Close">
  <Icon name="close" />
</ControlButton>
```

## Adapting to Background Colors

ControlButtons automatically adapt to their parent's background color using the dynamic color system.
Set a background and text color on the parent element:

```jsx
<Box backgroundColor="emotion-informative-basic" textColor="emotion-informative-subtle">
  <ControlButton isSymmetrical aria-label="Close">
    <Icon name="close" />
  </ControlButton>
</Box>
```

This works with any pair of available background and text colors.

## Accessibility

For icon-only buttons, always include an accessible label using the `aria-label` attribute:

```jsx
<ControlButton isSymmetrical aria-label="Close dialog">
  <Icon name="close" />
</ControlButton>
```

## API

| Name            | Type                               | Default  | Required | Description                                                                                                           |
| --------------- | ---------------------------------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `children`      | `ReactNode`                        | `null`   | ✕        | Content of the button                                                                                                 |
| `elementType`   | `ElementType`                      | `button` | ✕        | HTML element type or React component                                                                                  |
| `isDisabled`    | `bool`                             | `false`  | ✕        | Whether the button is disabled                                                                                        |
| `isSubtle`      | `bool`                             | `false`  | ✕        | Whether the button is in subtle variant (no border)                                                                   |
| `isSymmetrical` | \[`bool` \| `Responsive<bool>`]    | `false`  | ✕        | Whether the button should be symmetrical, use object to set responsive values, e.g. `{ mobile: true, tablet: false }` |
| `onClick`       | `(event: ClickEvent) => void`      | —        | ✕        | Click handler                                                                                                         |
| `ref`           | `ForwardedRef<HTMLButtonElement>`  | —        | ✕        | Button element reference                                                                                              |
| `size`          | [Size dictionary][dictionary-size] | `medium` | ✕        | Size of the button                                                                                                    |
| `type`          | \[`button` \| `submit` \| `reset`] | `button` | ✕        | Type of the button                                                                                                    |

Check the web implementation of the [ControlButton][web-control-button] component for more information.
Depending on `elementType`, more props and attributes may be passed to the component.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Custom Element

The ControlButton component can be rendered as a custom element using the `elementType` prop.
This is useful when you need the styling of a ControlButton but the semantics of another element, such as a link:

```jsx
<ControlButton elementType="a" href="/close" isSymmetrical aria-label="Close">
  <Icon name="close" />
</ControlButton>
```

You can even use a custom component, such as a Link component from a routing library:

```jsx
import { Link } from 'react-router-dom';

<ControlButton elementType={Link} to="/close" isSymmetrical aria-label="Close">
  <Icon name="close" />
</ControlButton>;
```

[button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Button/README.md
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[web-control-button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/ControlButton/README.md
