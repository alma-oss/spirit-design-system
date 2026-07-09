# ButtonLink

## Basic Example Usage

```tsx
<ButtonLink href="#" color="primary">Button primary</ButtonLink>
<ButtonLink href="#" color="secondary">Button secondary</ButtonLink>
<ButtonLink href="#" color="tertiary">Button tertiary</ButtonLink>
<ButtonLink href="#" color="plain">Button plain</ButtonLink>
<ButtonLink href="#" color="success">Button success</ButtonLink>
<ButtonLink href="#" color="informative">Button informative</ButtonLink>
<ButtonLink href="#" color="warning">Button warning</ButtonLink>
<ButtonLink href="#" color="danger">Button danger</ButtonLink>
```

### Symmetrical ButtonLink

Use the `isSymmetrical` prop to make the button link have equal width and height. This is typically used for icon-only buttons.

```tsx
<ButtonLink href="#" isSymmetrical>
  <Icon name="hamburger" />
  <VisuallyHidden>Menu</VisuallyHidden>
</ButtonLink>
```

You can define responsive values for the `isSymmetrical` prop using an object:

```tsx
<ButtonLink href="#" isSymmetrical={{ tablet: true }}>
  <Icon name="hamburger" />
  <VisuallyHidden>Menu</VisuallyHidden>
  <Hidden from="tablet" aria-hidden="true">
    Menu
  </Hidden>
</ButtonLink>
```

To turn off symmetrical from a specific breakpoint onwards, set the value to `false`:

```tsx
<ButtonLink href="#" isSymmetrical={{ mobile: true, tablet: false }}>
  <Icon name="hamburger" />
  <VisuallyHidden>Menu</VisuallyHidden>
  <Hidden on="mobile" aria-hidden="true">
    Menu
  </Hidden>
</ButtonLink>
```

⚠️ **Accessibility note:** Always use `VisuallyHidden` for the accessible label and add `aria-hidden="true"` to the
visible text or add `aria-label` to the button. Using the `Hidden` component (like `<Hidden on="mobile">Menu</Hidden>`)
hides content from screen readers, so the `VisuallyHidden` component ensures the label is always accessible
regardless of viewport size.

### Custom Spacing

You can use the `spacing` prop to apply custom spacing between button link content items (icons and text). The prop
accepts either a spacing token (e.g. `space-600`) or an object with breakpoint keys and spacing token values.

Custom spacing:

```tsx
<ButtonLink href="#" spacing="space-600">
  <Icon name="link" />
  Menu
</ButtonLink>
```

Custom responsive spacing:

```tsx
<ButtonLink href="#" spacing={{ mobile: 'space-400', tablet: 'space-600', desktop: 'space-800' }}>
  <Icon name="link" />
  Menu
</ButtonLink>
```

### How to Make a Fluid ButtonLink

To span a `ButtonLink` to the full width of its parent, you can use display utility classes or `Grid` to achieve the desired layout.

```tsx
<div className="d-grid">
  <ButtonLink href="#">Primary block-level Button</ButtonLink>
</div>
<div className="d-grid d-tablet-block">
  <ButtonLink href="#">Primary responsive block-level Button</ButtonLink>
</div>
<Grid
  cols={{ mobile: 1, tablet: 2 }}
  spacing="space-1100"
>
  <ButtonLink href="#">Primary responsive block-level Button</ButtonLink>
  <ButtonLink href="#" color="secondary">Secondary responsive block-level Button</ButtonLink>
</Grid>
```

### API

| Name            | Type                                                                                          | Default     | Required | Description                                                                                                                 |
| --------------- | --------------------------------------------------------------------------------------------- | ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `children`      | `ReactNode`                                                                                   | `null`      | ✕        | Content of the ButtonLink                                                                                                   |
| `color`         | [Component Button dictionary][dictionary-color], [Emotion Color dictionary][dictionary-color] | `primary`   | ✕        | Color variant                                                                                                               |
| `elementType`   | `ElementType`                                                                                 | `a`         | ✕        | Type of element                                                                                                             |
| `href`          | `string`                                                                                      | —           | ✓        | Link URL                                                                                                                    |
| `isDisabled`    | `bool`                                                                                        | `false`     | ✕        | If true, ButtonLink is disabled                                                                                             |
| `isLoading`     | `bool`                                                                                        | `false`     | ✕        | If true, ButtonLink is in a loading state, disabled and the Spinner is visible                                              |
| `isSymmetrical` | `bool` \| `Responsive<bool>`                                                                  | `false`     | ✕        | If true, ButtonLink has symmetrical dimensions, use object to set responsive values, e.g. `{ mobile: true, tablet: false }` |
| `onClick`       | `(event: ClickEvent) => void`                                                                 | —           | ✕        | JS function to call on click                                                                                                |
| `ref`           | `ForwardedRef<HTMLAnchorElement>`                                                             | —           | ✕        | Anchor element reference                                                                                                    |
| `size`          | [Size dictionary][dictionary-size]                                                            | `medium`    | ✕        | Size variant                                                                                                                |
| `spacing`       | `SpaceToken` \| `Responsive<SpaceToken>`                                                      | `space-400` | ✕        | Apply [custom spacing](#custom-spacing) between button link content items                                                   |
| `target`        | `string`                                                                                      | `null`      | ✕        | Link target                                                                                                                 |

For more information see [Button][button] component. ButtonLink also contain all the appropriate
attributes according to the type of element.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Icons

This component uses the `Icon` component internally. To ensure correct rendering,
please refer to the [Icon component documentation][readme-icon-usage] for setup instructions.

Icon sizes differ based on button size.
You can always set your desired size of an icon with `boxSize` prop.

### Button and Icon Sizes

| Button Size | Icon Size |
| ----------- | --------- |
| small       | 20px      |
| medium      | 20px      |
| large       | 24px      |

You can always set your desired size of an icon with the [`boxSize`][readme-icon-api] prop.

[button]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/Button
[dictionary-color]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#color
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#size
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-icon-api]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#api
[readme-icon-usage]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#usage
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
