# Box

The Box component is a simple container around content or other components.

```jsx
<Box>{/* Content goes here */}</Box>
```

## Border

You can define border color, radius, style and width using the `borderColor`, `borderRadius`, `borderStyle` and `borderWidth` props.

```jsx
<Box borderColor="basic" borderRadius="200" borderWidth="100" borderStyle="dashed">
  {/* Content goes here */}
</Box>
```

If you need set responsive border radius, you can use an object:

```jsx
<Box borderRadius={{ mobile: '200', tablet: '300', desktop: '400' }}>{/* Content goes here */}</Box>
```

The borderColor, borderRadius, and borderStyle props are applied only if borderWidth is greater than `0`.

## Padding

You can define padding using the `padding` prop.

```jsx
<Box padding="space-200">{/* Content goes here */}</Box>
```

It is also possible to define padding for horizontal and vertical sides using the `paddingX` and `paddingY` props.

```jsx
<Box paddingX="space-200" paddingY="space-300">
  {/* Content goes here */}
</Box>
```

You can also define padding for each side using the `paddingTop`, `paddingRight`, `paddingBottom`, and `paddingLeft` props.

```jsx
<Box paddingTop="space-200" paddingRight="space-300" paddingBottom="space-400" paddingLeft="space-500">
  {/* Content goes here */}
</Box>
```

Responsive values can be set for each prop using an object:

```jsx
<Box padding={{ mobile: 'space-200', tablet: 'space-300', desktop: 'space-400' }}>{/* Content goes here */}</Box>
```

## Background Color

You can define background color using the `backgroundColor` prop.

```jsx
<Box backgroundColor="primary">{/* Content goes here */}</Box>
```

## Background Gradient

You can define background gradient using the `backgroundGradient` prop.

```jsx
<Box backgroundGradient="primary">{/* Content goes here */}</Box>
<Box backgroundGradient="secondary">{/* Content goes here */}</Box>
```

Responsive values can be set for each prop using an object:

```jsx
<Box backgroundGradient={{ mobile: 'primary', tablet: 'secondary', desktop: 'primary' }}>{/* Content goes here */}</Box>
```

## Text Color

You can define text color using the `textColor` prop.

```jsx
<Box textColor="primary">{/* Content goes here */}</Box>
```

## API

| Name                 | Type                                                                                                                                                                                                                                                                                                              | Default | Required | Description                    |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | ------------------------------ |
| `backgroundColor`    | \[[Background Color dictionary][dictionary-color] \| `neutral` ✕ [Intensity dictionary][dictionary-intensity] \| [AccentColorNamesType][readme-generated-types] ✕ [Intensity dictionary][dictionary-intensity] \| [EmotionColorNamesType][readme-generated-types] ✕ [Intensity dictionary][dictionary-intensity]] | -       | ✕        | Background color of the Box    |
| `backgroundGradient` | [Background Gradient dictionary][dictionary-gradient]                                                                                                                                                                                                                                                             | -       | ✕        | Background gradient of the Box |
| `borderColor`        | \[[Border Color dictionary][dictionary-border] \| [AccentColorNamesType][readme-generated-types] ✕ [Intensity dictionary][dictionary-intensity] \| [EmotionColorNamesType][readme-generated-types] ✕ [Intensity dictionary][dictionary-intensity]]                                                                | -       | ✕        | Border color of the Box        |
| `borderRadius`       | \[[BorderRadiiTokenType][readme-generated-types] \| `Responsive<BorderRadiiTokenType>`]                                                                                                                                                                                                                           | -       | ✕        | Border radius of the Box       |
| `borderStyle`        | [Border Style dictionary][dictionary-border]                                                                                                                                                                                                                                                                      | `solid` | ✕        | Border style of the Box        |
| `borderWidth`        | [Border Width dictionary][dictionary-border]                                                                                                                                                                                                                                                                      | -       | ✕        | Border width of the Box        |
| `elementType`        | `ElementType`                                                                                                                                                                                                                                                                                                     | `div`   | ✕        | Type of element                |
| `padding`            | \[`SpaceToken` \| `Responsive<SpaceToken>`]                                                                                                                                                                                                                                                                       | -       | ✕        | Padding of the Box             |
| `paddingX`           | \[`SpaceToken` \| `Responsive<SpaceToken>`]                                                                                                                                                                                                                                                                       | -       | ✕        | Horizontal padding of the Box  |
| `paddingY`           | \[`SpaceToken` \| `Responsive<SpaceToken>`]                                                                                                                                                                                                                                                                       | -       | ✕        | Vertical padding of the Box    |
| `paddingTop`         | \[`SpaceToken` \| `Responsive<SpaceToken>`]                                                                                                                                                                                                                                                                       | -       | ✕        | Padding top of the Box         |
| `paddingRight`       | \[`SpaceToken` \| `Responsive<SpaceToken>`]                                                                                                                                                                                                                                                                       | -       | ✕        | Padding right of the Box       |
| `paddingBottom`      | \[`SpaceToken` \| `Responsive<SpaceToken>`]                                                                                                                                                                                                                                                                       | -       | ✕        | Padding bottom of the Box      |
| `paddingLeft`        | \[`SpaceToken` \| `Responsive<SpaceToken>`]                                                                                                                                                                                                                                                                       | -       | ✕        | Padding left of the Box        |
| `textColor`          | \[[TextColorNamesType][readme-generated-types] \| `neutral` ✕ [Intensity dictionary][dictionary-intensity] \| [AccentColorNamesType][readme-generated-types] ✕ [Intensity dictionary][dictionary-intensity] \| [EmotionColorNamesType][readme-generated-types] ✕ [Intensity dictionary][dictionary-intensity]]    | -       | ✕        | Color of the text              |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[dictionary-border]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#border
[dictionary-color]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#color
[dictionary-gradient]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#gradient
[dictionary-intensity]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#intensity
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
