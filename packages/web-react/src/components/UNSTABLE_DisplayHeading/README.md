# UNSTABLE_DisplayHeading

The `UNSTABLE_DisplayHeading` component provides helper classes to render display-scale headings.

> This component is UNSTABLE. It may significantly change at any time without notice. See
> [Experimental Code][docs-experimental-code].

## Basic Usage

Use the `elementType` prop to set the HTML tag of the DisplayHeading component. This prop is required.

```tsx
<UNSTABLE_DisplayHeading elementType="h1">Display heading</UNSTABLE_DisplayHeading>
```

Use `h1`–`h6` when the content is a semantic heading. Use `p` or `div` for decorative display type that is not a heading.

For heading typography styles, use [Heading][readme-heading] instead.

## Size

Use the `size` prop to set the size of the display heading.

```tsx
<UNSTABLE_DisplayHeading elementType="h1" size="large">
  Display heading
</UNSTABLE_DisplayHeading>
```

## Italic

Use the `isItalic` prop to apply italic style.

⚠️ This prop only affects styling, not the semantics of the element.

```tsx
<UNSTABLE_DisplayHeading elementType="h1" isItalic>
  Display heading
</UNSTABLE_DisplayHeading>
```

## Text Alignment

Use the `textAlignment` prop to set the alignment of the text.

```tsx
<UNSTABLE_DisplayHeading elementType="h2" textAlignment="center">Centered display heading</UNSTABLE_DisplayHeading>
<UNSTABLE_DisplayHeading elementType="h2" textAlignment="right">Right-aligned display heading</UNSTABLE_DisplayHeading>
```

You can define responsive values for the `textAlignment` prop using an object:

```tsx
<UNSTABLE_DisplayHeading elementType="h2" textAlignment={{ mobile: 'center', tablet: 'right', desktop: 'left' }}>
  Responsive text alignment
</UNSTABLE_DisplayHeading>
```

## Text Color

Use the `textColor` prop to set color of the text. When undefined, the text color
is inherited from the parent element.

```tsx
<UNSTABLE_DisplayHeading elementType="h2" textColor="secondary">
  Secondary display heading
</UNSTABLE_DisplayHeading>
```

### Text Hyphens

Use the `textHyphens` prop to set how words should be hyphenated when text wraps across multiple lines.

```tsx
<UNSTABLE_DisplayHeading elementType="h2" textHyphens="auto">
  Hyphens applied automatically when text wraps across multiple lines.
</UNSTABLE_DisplayHeading>
```

### Text Word Break

Use the `textWordBreak` prop to set how words should break when reaching the end of a line.
It's crucial to combine it with [Text Hyphens](#text-hyphens) to maintain readability, followed by typography rules in text layouts.

```tsx
<UNSTABLE_DisplayHeading elementType="h2" textWordBreak="long-words">
  Allows long words to be split and wrapped onto the next line.
</UNSTABLE_DisplayHeading>
```

### Text Balanced Wrapping

Use the `isTextBalanced` prop to enable balanced wrapping for display headings and titles.

```tsx
<UNSTABLE_DisplayHeading elementType="h2" isTextBalanced>
  Balanced wrapping optimizes the distribution of display heading text across multiple lines for better visual appeal
</UNSTABLE_DisplayHeading>
```

ℹ️ For the DisplayHeading component, `isTextBalanced` applies `text-wrap: balance`, which is specifically designed for
shorter text blocks like headings and titles. This creates more visually appealing line breaks by balancing the
text evenly across lines.

⚠️ Browser support: The [MDN documentation][mdn-text-wrap-balance] notes that balancing text is computationally
expensive and is only supported for blocks spanning a limited number of lines (six or less for Chromium, ten or
less for Firefox).

## Full Example

```tsx
<UNSTABLE_DisplayHeading
  elementType="h1"
  size="large"
  isItalic
  isTextBalanced
  textAlignment="center"
  textColor="secondary"
  textHyphens="auto"
  textWordBreak="long-words"
>
  Demonstration of a full example of the DisplayHeading component.
</UNSTABLE_DisplayHeading>
```

## API

| Name             | Type                                                                                                                                                                                                | Default  | Required | Description                             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | --------------------------------------- |
| `elementType`    | `React.Element`                                                                                                                                                                                     | —        | ✓        | HTML tag                                |
| `isItalic`       | `bool`                                                                                                                                                                                              | `false`  | ✕        | If true, the display heading is italic  |
| `isTextBalanced` | `bool`                                                                                                                                                                                              | `false`  | ✕        | If true, the text has balanced wrapping |
| `size`           | [Size dictionary][dictionary-size]                                                                                                                                                                  | `medium` | ✕        | Size of the display heading             |
| `textAlignment`  | \[[Text Alignment dictionary][dictionary-alignment] \| `Responsive<TextAlignmentDictionaryType>`]                                                                                                   | —        | ✕        | Text alignment                          |
| `textColor`      | \[[TextColorNamesType][readme-generated-types] \| [AccentColorNamesType][readme-generated-types] \| [EmotionColorNamesType][readme-generated-types] ✕ [Intensity dictionary][dictionary-intensity]] | —        | ✕        | Color of the text                       |
| `textHyphens`    | \[`none` \| `auto` \| `manual`]                                                                                                                                                                     | —        | ✕        | Hyphens strategy applied to the text    |
| `textWordBreak`  | \[`normal` \| `anywhere` \| `long-words`]                                                                                                                                                           | —        | ✕        | Word break strategy applied to the text |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[dictionary-alignment]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#alignment
[dictionary-intensity]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#intensity
[dictionary-size]: https://github.com/alma-oss/spirit-design-system/tree/main/docs/DICTIONARIES.md#size
[docs-experimental-code]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/contribution/experimental-code.md
[mdn-text-wrap-balance]: https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap#balance
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-generated-types]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#types-generated-from-design-tokens
[readme-heading]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Heading/README.md
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
