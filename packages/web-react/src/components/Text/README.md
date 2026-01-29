# Text

The Text component provides helper classes to render text.

## Basic Usage

```jsx
<Text>This is a text</Text>
```

## Element Type

Use the `elementType` prop to set the HTML tag of the Text component.

```jsx
<Text elementType="span">Text</Text>
```

## Size

Use the `size` prop to set the size of the text.

```jsx
<Text size="large">Text</Text>
```

## Emphasis

Use the `emphasis` prop to set the emphasis of the text.

⚠️ This prop only affects styling, not the semantics of the element.

```jsx
<Text emphasis="bold">Bold text</Text>
```

## Text Alignment

Use the `textAlignment` prop to set the alignment of the text.

```jsx
<Text textAlignment="center">Centered text</Text>
<Text textAlignment="right">Right-aligned text</Text>
```

You can also define responsive values for the `textAlignment` prop using an object:

```jsx
<Text textAlignment={{ mobile: 'center', tablet: 'right', desktop: 'left' }}>Responsive text alignment</Text>
```

## Text Color

Use the `textColor` prop to set color of the text. When undefined, the text color
is inherited from the parent element.

```jsx
<Text textColor="secondary">Secondary text</Text>
```

### Text Hyphens

Use the `textHyphens` prop to set how words should be hyphenated when text wraps across multiple lines.

```jsx
<Text textHyphens="auto">Hyphens applied automatically when text wraps across multiple lines.</Text>
```

### Text Word Break

Use the `textWordBreak` prop to set how words should break when reaching the end of a line.
It's crucial to combine it with [Text Hyphens](#text-hyphens) to maintain readability, followed by typography rules in text layouts.

```jsx
<Text textWordBreak="break-word">Allows long words to be splitted and wrapped onto the next line.</Text>
```

### Text Balanced Wrapping

Use the `isTextBalanced` prop to enable improved text wrapping for better readability.

```jsx
<Text isTextBalanced>
  Text wrapping optimizes the distribution of text across multiple lines, enhancing readability and visual appeal by
  avoiding orphans and awkward line breaks in body text.
</Text>
```

ℹ️ For the Text component, `isTextBalanced` applies `text-wrap: pretty`, which is optimized for body text and longer
paragraphs. This wrapping style minimizes orphans and improves overall readability.

⚠️ Browser support: The `text-wrap: pretty` property has [limited browser support][mdn-text-wrap-pretty].
As a fallback, browsers that don't support it will use `text-wrap: balance`.

## Full Example

```jsx
<Text
  elementType="div"
  emphasis="bold"
  isTextBalanced
  size="large"
  textAlignment="center"
  textColor="secondary"
  textHyphens="auto"
  textWordBreak="long-words"
>
  Demonstration of a full example of the Text component.
</Text>
```

## API

| Name             | Type                                                                                                                                                                                                | Default   | Required | Description                             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | --------------------------------------- |
| `elementType`    | `React.Element`                                                                                                                                                                                     | `p`       | ✕        | HTML tag                                |
| `emphasis`       | [Emphasis dictionary][dictionary-emphasis]                                                                                                                                                          | `regular` | ✕        | Emphasis of the text                    |
| `size`           | [Size Extended dictionary][dictionary-size]                                                                                                                                                         | `medium`  | ✕        | Size of the text                        |
| `isTextBalanced` | `bool`                                                                                                                                                                                              | `false`   | ✕        | If true, the text has balanced wrapping |
| `textAlignment`  | \[[Text Alignment dictionary][dictionary-alignment] \| `Responsive<TextAlignmentDictionaryType>`]                                                                                                   | —         | ✕        | Alignment of the text                   |
| `textColor`      | \[[TextColorNamesType][readme-generated-types] \| [AccentColorNamesType][readme-generated-types] \| [EmotionColorNamesType][readme-generated-types] ✕ [Intensity dictionary][dictionary-intensity]] | —         | ✕        | Color of the text                       |
| `textHyphens`    | \[`none` \| `auto` \| `manual`]                                                                                                                                                                     | —         | ✕        | Hyphens strategy applied to the text    |
| `textWordBreak`  | \[`normal` \| `anywhere` \| `long-words`]                                                                                                                                                           | —         | ✕        | Word break strategy applied to the text |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Custom Component

Text classes are fabricated using `useTextStyleProps` hook. You can use it to create your own custom Text component.

```jsx
const CustomText = (props: SpiritTextProps): JSX.Element => {
  const { classProps, props: modifiedProps, children } = useTextStyleProps(props);

  return (
    <p className={classProps} {...modifiedProps}>
      {children}
    </p>
  );
};
```

[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#alignment
[dictionary-emphasis]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#emphasis
[dictionary-intensity]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#intensity
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#size
[mdn-text-wrap-pretty]: https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap#pretty
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
