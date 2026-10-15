# UNSTABLE_EyebrowText

The `UNSTABLE_EyebrowText` component renders a short label above a heading.

> This component is UNSTABLE. It may significantly change at any time without notice. See
> [Experimental Code][docs-experimental-code].

`CardEyebrow` is the label inside a card. Use `UNSTABLE_EyebrowText` when the label stands on its own.

For body copy, use [Text][readme-text]. For heading typography, use [Heading][readme-heading].

## Basic Usage

```tsx
<UNSTABLE_EyebrowText>EyebrowText</UNSTABLE_EyebrowText>
```

## Element Type

EyebrowText renders a `p`. Use the `elementType` prop to change the HTML tag.

Use a `span` when the label sits in a phrasing context (e.g. inside a link or inline text). Use a heading element only when the text is a heading in the
document outline.

```tsx
<UNSTABLE_EyebrowText elementType="span">EyebrowText</UNSTABLE_EyebrowText>
```

## Text Alignment

Use the `textAlignment` prop to set the alignment of the text.

```tsx
<UNSTABLE_EyebrowText textAlignment="center">Centered EyebrowText</UNSTABLE_EyebrowText>
<UNSTABLE_EyebrowText textAlignment="right">Right-aligned EyebrowText</UNSTABLE_EyebrowText>
```

You can define responsive values for the `textAlignment` prop using an object:

```tsx
<UNSTABLE_EyebrowText textAlignment={{ mobile: 'center', tablet: 'right', desktop: 'left' }}>
  Responsive text alignment
</UNSTABLE_EyebrowText>
```

## Text Color

Use the `textColor` prop to set color of the text. When undefined, the text color
is inherited from the parent element.

```tsx
<UNSTABLE_EyebrowText textColor="secondary">Secondary EyebrowText</UNSTABLE_EyebrowText>
```

## Text Hyphens

Use the `textHyphens` prop to set how words should be hyphenated when text wraps across multiple lines.

```tsx
<UNSTABLE_EyebrowText textHyphens="auto">
  Hyphens applied automatically when text wraps across multiple lines
</UNSTABLE_EyebrowText>
```

## Text Word Break

Use the `textWordBreak` prop to set how words should break when reaching the end of a line.
It's crucial to combine it with [Text Hyphens](#text-hyphens) to maintain readability, followed by typography rules in text layouts.

```tsx
<UNSTABLE_EyebrowText textWordBreak="long-words">
  Allows long words to be split and wrapped onto the next line
</UNSTABLE_EyebrowText>
```

## Text Balanced Wrapping

Use the `isTextBalanced` prop to enable balanced wrapping for short labels and titles.

```tsx
<UNSTABLE_EyebrowText isTextBalanced>
  Balanced wrapping optimizes the distribution of EyebrowText across multiple lines for better visual appeal
</UNSTABLE_EyebrowText>
```

ℹ️ For the EyebrowText component, `isTextBalanced` applies `text-wrap: balance`, which is specifically designed for
shorter text blocks like headings and titles. This creates more visually appealing line breaks by balancing the
text evenly across lines.

⚠️ Browser support: The [MDN documentation][mdn-text-wrap-balance] notes that balancing text is computationally
expensive and is only supported for blocks spanning a limited number of lines (six or less for Chromium, ten or
less for Firefox).

## Full Example

```tsx
<UNSTABLE_EyebrowText
  isTextBalanced
  textAlignment="center"
  textColor="secondary"
  textHyphens="auto"
  textWordBreak="long-words"
>
  Demonstration of a full example of the EyebrowText component
</UNSTABLE_EyebrowText>
```

## API

| Name             | Type                                                                                                                                                                                                | Default | Required | Description                             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | --------------------------------------- |
| `elementType`    | `React.Element`                                                                                                                                                                                     | `p`     | ✕        | HTML tag                                |
| `isTextBalanced` | `bool`                                                                                                                                                                                              | `false` | ✕        | If true, the text has balanced wrapping |
| `textAlignment`  | \[[Text Alignment dictionary][dictionary-alignment] \| `Responsive<TextAlignmentDictionaryType>`]                                                                                                   | —       | ✕        | Text alignment                          |
| `textColor`      | \[[TextColorNamesType][readme-generated-types] \| [AccentColorNamesType][readme-generated-types] \| [EmotionColorNamesType][readme-generated-types] ✕ [Intensity dictionary][dictionary-intensity]] | —       | ✕        | Color of the text                       |
| `textHyphens`    | \[`none` \| `auto` \| `manual`]                                                                                                                                                                     | —       | ✕        | Hyphens strategy applied to the text    |
| `textWordBreak`  | \[`normal` \| `anywhere` \| `long-words`]                                                                                                                                                           | —       | ✕        | Word break strategy applied to the text |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#alignment
[dictionary-intensity]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#intensity
[docs-experimental-code]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/contribution/experimental-code.md
[mdn-text-wrap-balance]: https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap#balance
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-heading]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Heading/README.md
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[readme-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Text/README.md
