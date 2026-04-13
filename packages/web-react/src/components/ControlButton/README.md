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

```tsx
<ControlButton isSymmetrical aria-label="Close">
  <Icon name="close" />
</ControlButton>
```

## Variants

### Default (With Border)

The default variant with a visible border:

```tsx
<ControlButton isSymmetrical aria-label="Close">
  <Icon name="close" />
</ControlButton>
```

### Subtle (Without Border)

Remove the border by adding `isSubtle`:

```tsx
<ControlButton isSubtle isSymmetrical aria-label="Close">
  <Icon name="close" />
</ControlButton>
```

## Sizes

ControlButton supports three sizes:

```tsx
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

## Feature Flag: Expanded Size Scale

Enable the expanded size scale by wrapping ControlButton in an element with the
`spirit-feature-enable-v5-control-button-expanded-size-scale` CSS class. When enabled, the size scale
shifts to include `xsmall` and `xlarge` sizes while remapping the existing sizes.

```tsx
<div className="spirit-feature-enable-v5-control-button-expanded-size-scale">
  <ControlButton size="xsmall" isSymmetrical aria-label="Close">
    <Icon name="close" />
  </ControlButton>
</div>
```

## Symmetrical ControlButton

Use the `isSymmetrical` prop to make the control button have equal width and height. This is typically used for icon-only buttons.

```tsx
<ControlButton isSymmetrical aria-label="Close">
  <Icon name="close" />
</ControlButton>
```

You can define responsive values for the `isSymmetrical` prop using an object:

```tsx
<ControlButton isSymmetrical={{ tablet: true }} aria-label="Close">
  <Icon name="close" />
</ControlButton>
```

To turn off symmetrical from a specific breakpoint onwards, set the value to `false`:

```tsx
<ControlButton isSymmetrical={{ mobile: true, tablet: false }} aria-label="Close">
  <Icon name="close" />
</ControlButton>
```

## Adapting to Background Colors

ControlButtons automatically adapt to their parent's background color using the dynamic color system.
Set a background and text color on the parent element:

```tsx
<Box backgroundColor="emotion-informative-basic" textColor="emotion-informative-subtle">
  <ControlButton isSymmetrical aria-label="Close">
    <Icon name="close" />
  </ControlButton>
</Box>
```

This works with any pair of available background and text colors.

## Disabled State

Use the `isDisabled` prop to disable a ControlButton:

```tsx
<ControlButton isSymmetrical isDisabled aria-label="Close">
  <Icon name="close" />
</ControlButton>
```

The `isDisabled` prop sets both the native `disabled` attribute and the `ControlButton--disabled` class,
ensuring proper behavior. To achieve proper styles, use `color-scheme-on-disabled` class on the parent element or directly on the ControlButton.

### Color Scheme for Disabled State

**Parent component handles the color scheme:**

```tsx
<Box UNSAFE_className="color-scheme-on-disabled">
  <ControlButton isSymmetrical isDisabled aria-label="Previous">
    <Icon name="chevron-left" />
  </ControlButton>
  <span>Disabled content</span>
  <ControlButton isSymmetrical isDisabled aria-label="Next">
    <Icon name="chevron-right" />
  </ControlButton>
</Box>
```

**Standalone ControlButton:**

```tsx
<ControlButton isSymmetrical isDisabled aria-label="Close" UNSAFE_className="color-scheme-on-disabled">
  <Icon name="close" />
</ControlButton>
```

## Custom Spacing

You can use the `spacing` prop to apply custom spacing between control button content items (icons and text). The prop
accepts either a spacing token (e.g. `space-600`) or an object with breakpoint keys and spacing token values.

Custom spacing:

```jsx
<ControlButton spacing="space-600" aria-label="Close">
  <Icon name="close" />
  Close
</ControlButton>
```

Custom responsive spacing:

```jsx
<ControlButton spacing={{ mobile: 'space-400', tablet: 'space-600', desktop: 'space-800' }} aria-label="Close">
  <Icon name="close" />
  Close
</ControlButton>
```

## Accessibility

For icon-only buttons, always include an accessible label using the `aria-label` attribute:

```tsx
<ControlButton isSymmetrical aria-label="Close dialog">
  <Icon name="close" />
</ControlButton>
```

## API

| Name            | Type                                        | Default     | Required | Description                                                                                                           |
| --------------- | ------------------------------------------- | ----------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `children`      | `ReactNode`                                 | `null`      | ✕        | Content of the button                                                                                                 |
| `elementType`   | `ElementType`                               | `button`    | ✕        | HTML element type or React component                                                                                  |
| `isDisabled`    | `bool`                                      | `false`     | ✕        | Whether the button is disabled, see [Disabled State](#disabled-state)                                                 |
| `isSubtle`      | `bool`                                      | `false`     | ✕        | Whether the button is in subtle variant (no border)                                                                   |
| `isSymmetrical` | \[`bool` \| `Responsive<bool>`]             | `false`     | ✕        | Whether the button should be symmetrical, use object to set responsive values, e.g. `{ mobile: true, tablet: false }` |
| `onClick`       | `(event: ClickEvent) => void`               | —           | ✕        | Click handler                                                                                                         |
| `ref`           | `ForwardedRef<HTMLButtonElement>`           | —           | ✕        | Button element reference                                                                                              |
| `size`          | [Size dictionary][dictionary-size]          | `medium`    | ✕        | Size of the button                                                                                                    |
| `spacing`       | \[`SpaceToken` \| `Responsive<SpaceToken>`] | `space-400` | ✕        | Apply [custom spacing](#custom-spacing) between control button content items                                          |
| `type`          | \[`button` \| `submit` \| `reset`]          | `button`    | ✕        | Type of the button                                                                                                    |

Check the web implementation of the [ControlButton][web-control-button] component for more information.
Depending on `elementType`, more props and attributes may be passed to the component.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Custom Element

The ControlButton component can be rendered as a custom element using the `elementType` prop.
This is useful when you need the styling of a ControlButton but the semantics of another element, such as a link:

```tsx
<ControlButton elementType="a" href="/close" isSymmetrical aria-label="Close">
  <Icon name="close" />
</ControlButton>
```

You can even use a custom component, such as a Link component from a routing library:

```tsx
import { Link } from 'react-router-dom';
import { ControlButton, Icon } from '@alma-oss/spirit-web-react';

export const Example = () => {
  return (
    <ControlButton elementType={Link} to="/close" isSymmetrical aria-label="Close">
      <Icon name="close" />
    </ControlButton>
  );
};
```

[button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Button/README.md
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#size
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[web-control-button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/ControlButton/README.md
