# IconBox

The `IconBox` component is a composition of the `Icon` inside the `Box` component.

```jsx
<IconBox name="search" />
```

## Shape

You can define shape using the `shape` prop.

```jsx
<IconBox name="search" shape="circle" />
```

## Has Border

You can set `hasBorder` prop to render the `IconBox` without a border.

```jsx
<IconBox name="search" hasBorder={false} />
```

## Size

You can define size using the `size` prop.

```jsx
<IconBox name="search" size="large" />
```

You can also define responsive values for the `size` prop using an object:

```jsx
<IconBox name="search" size={{ mobile: 'small', tablet: 'medium', desktop: 'large' }} />
```

## Color

The `color` prop defines the visual style of the IconBox by applying a combination of background color, border color, and icon color.

```jsx
<IconBox name="search" color="primary" />
```

Each predefined color value automatically maps to a set of design token-based styles, providing a cohesive appearance aligned with the design system.

## Subtle Color Variant

The `isSubtle` prop allows you to render the IconBox with a subtle color variant. Default value is `true`.

```jsx
<IconBox name="search" isSubtle={false} />
```

## Icons

The `iconName` prop specifies the name of the icon to render within the IconBox. You can use any icon from the available icon set.

> ⚠️ Dualtone Icons are not supported. Do not try to pass the icon name with the `-dualtone` suffix.

```jsx
<IconBox iconName="search" />
```

## Implementation Notes

IconBox is a composed component built from [Box][box-component] and [Icon][icon-component] components, designed to streamline the presentation of icons within a consistent visual container.
Its purpose is to improve the user experience by providing sensible defaults for padding, border radius, size, and color, so that icons align visually across the UI with minimal effort.

To keep the API simple and opinionated, some styles and layout options are generalized or preset.
If you encounter limitations or need finer control, you can always use Box and Icon directly for full customization.

When composing your own version using Box and Icon, make sure the icon behaves as a block-level element to maintain the correct sizing and alignment. This can be achieved by:

- adding `UNSAFE_className="d-block"` directly to the Icon component, or
- applying appropriate styling to its parent container (e.g `UNSAFE_className="d-flex"` on Box component).

```jsx
import { Box, Icon } from '@alma-oss/spirit-web-react';

<Box backgroundColor="primary" borderRadius="200" borderWidth="100" padding="space-600">
  <Icon name="search" UNSAFE_className="d-block" />
</Box>;
```

## API

| Name          | Type                                                                                                                                                | Default  | Required | Description                                                                                                              |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `color`       | \[[AccentColorNamesType][readme-generated-types] \| [EmotionColorNamesType][readme-generated-types] ✕ [Intensity dictionary][dictionary-intensity]] | -        | ✕        | Color variant of the IconBox                                                                                             |
| `elementType` | `ElementType`                                                                                                                                       | `div`    | ✕        | Type of element                                                                                                          |
| `hasBorder`   | `bool`                                                                                                                                              | `true`   | ✕        | Whether the IconBox has a border                                                                                         |
| `iconName`    | `string`                                                                                                                                            | ✓        | ✕        | Name of the icon to render                                                                                               |
| `isSubtle`    | `bool`                                                                                                                                              | `true`   | ✕        | Whether the IconBox has a subtle color variant                                                                           |
| `shape`       | \[`rounded` \| `circle` \| `square`]                                                                                                                | `circle` | ✕        | Shape of the IconBox                                                                                                     |
| `size`        | \[[Size Extended dictionary][dictionary-size] \| `Responsive<`[Size Extended dictionary][dictionary-size]`>`]                                       | `medium` | ✕        | Size of the IconBox, use object to set responsive values, e.g. `{ mobile: 'small', tablet: 'medium', desktop: 'large' }` |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[box-component]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Box/README.md
[dictionary-intensity]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#intensity
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#size
[icon-component]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
