# Heading

The Heading component provides helper classes to render headings.

## Basic Usage

Use the `elementType` prop to set the HTML tag of the Heading component.

```jsx
<Heading elementType="h1">Heading</Heading>
```

## Size

Use the `size` prop to set the size of the text.

```jsx
<Heading elementType="h1" size="large">
  Heading
</Heading>
```

## Emphasis

Use the `emphasis` prop to set the emphasis of the text.

⚠️ This prop only affects styling, not the semantics of the element.

```jsx
<Heading elementType="h1" emphasis="semibold">
  Semibold heading
</Heading>
```

## Text Alignment

Use the `textAlignment` prop to set the alignment of the text.

```jsx
<Heading elementType="h2" textAlignment="center">Centered heading</Heading>
<Heading elementType="h2" textAlignment="right">Right-aligned heading</Heading>
```

You can define responsive values for the `textAlignment` prop using an object:

```jsx
<Heading elementType="h2" textAlignment={{ mobile: 'center', tablet: 'right', desktop: 'left' }}>
  Responsive text alignment
</Heading>
```

## Text Color

Use the `textColor` prop to set color of the text. When undefined, the text color
is inherited from the parent element.

```jsx
<Heading elementType="h2" textColor="secondary">
  Secondary heading
</Heading>
```

### Text Hyphens

Use the `textHyphens` prop to set how words should be hyphenated when text wraps across multiple lines.

```jsx
<Heading elementType="h2" textHyphens="auto">
  Hyphens applied automatically when text wraps across multiple lines.
</Heading>
```

### Text Word Break

Use the `textWordBreak` prop to set how words should break when reaching the end of a line.
It's crucial to combine it with [Text Hyphens](#text-hyphens) to maintain readability, followed by typography rules in text layouts.

```jsx
<Heading elementType="h2" textWordBreak="long-words">
  Allows long words to be splitted and wrapped onto the next line.
</Heading>
```

### Text Balanced Wrapping

Use the `isTextBalanced` prop to enable balanced wrapping for headings and titles.

```jsx
<Heading elementType="h2" isTextBalanced>
  Balanced wrapping optimizes the distribution of heading text across multiple lines for better visual appeal
</Heading>
```

ℹ️ For the Heading component, `isTextBalanced` applies `text-wrap: balance`, which is specifically designed for
shorter text blocks like headings and titles. This creates more visually appealing line breaks by balancing the
text evenly across lines.

⚠️ Browser support: The [MDN documentation][mdn-text-wrap-balance] notes that balancing text is computationally
expensive and is only supported for blocks spanning a limited number of lines (six or less for Chromium, ten or
less for Firefox).

## Full Example

```jsx
<Heading
  elementType="h1"
  size="large"
  emphasis="semibold"
  isTextBalanced
  textAlignment="center"
  textColor="secondary"
  textHyphens="auto"
  textWordBreak="long-words"
>
  Demonstration of a full example of the Heading component.
</Heading>
```

## API

| Name             | Type                                                                                                                                                                                                | Default  | Required | Description                             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | --------------------------------------- |
| `elementType`    | `React.Element`                                                                                                                                                                                     | —        | ✓        | HTML tag                                |
| `emphasis`       | [Emphasis dictionary][dictionary-emphasis]                                                                                                                                                          | `bold`   | ✕        | Emphasis of the text                    |
| `isTextBalanced` | `bool`                                                                                                                                                                                              | `false`  | ✕        | If true, the text has balanced wrapping |
| `size`           | [Size Extended dictionary][dictionary-size]                                                                                                                                                         | `medium` | ✕        | Size of the text                        |
| `textAlignment`  | \[[Text Alignment dictionary][dictionary-alignment] \| `Responsive<TextAlignmentDictionaryType>`]                                                                                                   | —        | ✕        | Text alignment                          |
| `textColor`      | \[[TextColorNamesType][readme-generated-types] \| [AccentColorNamesType][readme-generated-types] \| [EmotionColorNamesType][readme-generated-types] ✕ [Intensity dictionary][dictionary-intensity]] | -        | ✕        | Color of the text                       |
| `textHyphens`    | \[`none` \| `auto` \| `manual`]                                                                                                                                                                     | —        | ✕        | Hyphens strategy applied to the text    |
| `textWordBreak`  | \[`normal` \| `anywhere` \| `long-words`]                                                                                                                                                           | —        | ✕        | Word break strategy applied to the text |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## Custom Component

Heading classes are fabricated using `useHeadingStyleProps` hook. You can use it to create your own custom Heading component.

```jsx
const CustomText = (props: SpiritHeadingProps): JSX.Element => {
  const { classProps, props: modifiedProps, children } = useHeadingStyleProps(props);

  return (
    <div className={classProps} {...modifiedProps}>
      {children}
    </div>
  );
};
```

[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#alignment
[dictionary-emphasis]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#emphasis
[dictionary-intensity]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#intensity
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#size
[mdn-text-wrap-balance]: https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap#balance
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
