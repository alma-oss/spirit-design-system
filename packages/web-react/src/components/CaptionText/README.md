# CaptionText

The CaptionText component provides helper classes to render caption text.

## Basic Usage

```tsx
<CaptionText>Caption label</CaptionText>
```

## Element Type

Use the `elementType` prop to set the HTML tag of the CaptionText component.

```tsx
<CaptionText elementType="p">Caption label</CaptionText>
```

## Text Alignment

Use the `textAlignment` prop to set the alignment of the text.

```tsx
<CaptionText textAlignment="center">Centered caption text</CaptionText>
<CaptionText textAlignment="right">Right-aligned caption text</CaptionText>
```

You can also define responsive values for the `textAlignment` prop using an object:

```tsx
<CaptionText textAlignment={{ mobile: 'center', tablet: 'right', desktop: 'left' }}>
  Responsive caption text alignment
</CaptionText>
```

## Text Color

Use the `textColor` prop to set color of the text. When undefined, the text color
is inherited from the parent element.

```tsx
<CaptionText textColor="secondary">Secondary caption text</CaptionText>
```

### Text Hyphens

Use the `textHyphens` prop to set how words should be hyphenated when text wraps across multiple lines.

```tsx
<CaptionText textHyphens="auto">Hyphens applied automatically when text wraps across multiple lines.</CaptionText>
```

### Text Word Break

Use the `textWordBreak` prop to set how words should break when reaching the end of a line.
It's crucial to combine it with [Text Hyphens](#text-hyphens) to maintain readability, followed by typography rules in text layouts.

```tsx
<CaptionText textWordBreak="long-words">Allows long words to be split and wrapped onto the next line.</CaptionText>
```

### Text Balanced Wrapping

Use the `isTextBalanced` prop to enable improved text wrapping for better readability.

```tsx
<CaptionText isTextBalanced>
  Text wrapping optimizes the distribution of text across multiple lines, enhancing readability and visual appeal by
  avoiding orphans and awkward line breaks.
</CaptionText>
```

ℹ️ For the CaptionText component, `isTextBalanced` applies `text-wrap: pretty`, which is optimized for body text and longer
paragraphs. This wrapping style minimizes orphans and improves overall readability.

⚠️ Browser support: The `text-wrap: pretty` property has [limited browser support][mdn-text-wrap-pretty].
As a fallback, browsers that don't support it will use `text-wrap: balance`.

## Full Example

```tsx
<CaptionText
  elementType="div"
  isTextBalanced
  textAlignment="center"
  textColor="secondary"
  textHyphens="auto"
  textWordBreak="long-words"
>
  Demonstration of a full example of the CaptionText component.
</CaptionText>
```

## API

| Name             | Type                                                                                                                                                                                                | Default | Required | Description                             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- | --------------------------------------- |
| `elementType`    | `React.Element`                                                                                                                                                                                     | `span`  | ✕        | HTML tag                                |
| `isTextBalanced` | `bool`                                                                                                                                                                                              | `false` | ✕        | If true, the text has balanced wrapping |
| `textAlignment`  | \[[Text Alignment dictionary][dictionary-alignment] \| `Responsive<TextAlignmentDictionaryType>`]                                                                                                   | —       | ✕        | Alignment of the text                   |
| `textColor`      | \[[TextColorNamesType][readme-generated-types] \| [AccentColorNamesType][readme-generated-types] \| [EmotionColorNamesType][readme-generated-types] ✕ [Intensity dictionary][dictionary-intensity]] | —       | ✕        | Color of the text                       |
| `textHyphens`    | \[`none` \| `auto` \| `manual`]                                                                                                                                                                     | —       | ✕        | Hyphens strategy applied to the text    |
| `textWordBreak`  | \[`normal` \| `anywhere` \| `long-words`]                                                                                                                                                           | —       | ✕        | Word break strategy applied to the text |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#alignment
[dictionary-intensity]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#intensity
[mdn-text-wrap-pretty]: https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap#pretty
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
