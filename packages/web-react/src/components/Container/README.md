# Container

Container centers your content horizontally and sets its max-width with horizontal paddings.

```jsx
<Container>Content</Container>
```

## Fluid Container

If you need a full-width container, you can use the `isFluid` prop.

```jsx
<Container isFluid>Content</Container>
```

## Sizes

If you need different sizes of the container, you can use the `size` prop.

```jsx
<Container size="small">Content</Container>
```

## Text Alignment

You can set the text alignment of the container using the `textAlignment` prop.

```jsx
<Container textAlignment="center">Content</Container>
<Container textAlignment="right">Content</Container>
```

You can define responsive values for the `textAlignment` prop using an object:

```jsx
<Container textAlignment={{ mobile: 'center', tablet: 'right', desktop: 'left' }}>Responsive text alignment</Container>
```

## API

| Name            | Type                                                                                              | Default  | Required | Description                 |
| --------------- | ------------------------------------------------------------------------------------------------- | -------- | -------- | --------------------------- |
| `isFluid`       | `bool`                                                                                            | `false`  | ✕        | If true, Container is fluid |
| `size`          | [ContainerSizesType][readme-generated-types]                                                      | `xlarge` | ✕        | Size variant                |
| `textAlignment` | \[[Text Alignment dictionary][dictionary-alignment] \| `Responsive<TextAlignmentDictionaryType>`] | -        | ✕        | Text alignment              |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

For detailed information see [Container][web-container] component

[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#alignment
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[web-container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Container/README.md
