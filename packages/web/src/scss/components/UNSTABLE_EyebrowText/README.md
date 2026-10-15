# UNSTABLE EyebrowText

`UNSTABLE_EyebrowText` is a short label that sits above a heading.

> This component is UNSTABLE. It may significantly change at any time without notice. See
> [Experimental Code][docs-experimental-code].

`CardEyebrow` is the label inside a card. Use `UNSTABLE_EyebrowText` when the label stands on its own.

## Basic Usage

```html
<p class="typography-eyebrow">EyebrowText</p>
```

## Element Type

EyebrowText is a `p`. Use a `span` when the label sits in a phrasing context. Use a heading element only when the text
is a heading in the document outline.

```html
<span class="typography-eyebrow">EyebrowText</span>
```

## Text Alignment

Alignment uses the text utilities. The label is aligned to the start when no utility is set.

```html
<p class="typography-eyebrow text-center">Centered EyebrowText</p>
<p class="typography-eyebrow text-right">Right-aligned EyebrowText</p>
```

Responsive alignment uses the breakpoint utilities:

```html
<p class="typography-eyebrow text-center text-tablet-right text-desktop-left">Responsive text alignment</p>
```

## Text Color

Add a text color utility to set color of the text. When undefined, the text color
is inherited from the parent element.

```html
<p class="typography-eyebrow text-secondary">Secondary EyebrowText</p>
```

## Text Hyphens

Use a text hyphens utility to set how words hyphenate when the label wraps.

```html
<p class="typography-eyebrow text-hyphens-auto">Hyphens applied automatically when text wraps across multiple lines.</p>
```

## Text Word Break

Use a text word break utility to set how words break at the end of a line. Combine it with
[Text Hyphens](#text-hyphens).

```html
<p class="typography-eyebrow text-word-break-long-words">
  Allows long words to be split and wrapped onto the next line.
</p>
```

## Text Balanced Wrapping

Add `text-wrap-balance` for balanced line breaks. It is meant for short text such as labels and titles.

```html
<p class="typography-eyebrow text-wrap-balance">
  Balanced wrapping optimizes the distribution of EyebrowText across multiple lines for better visual appeal
</p>
```

⚠️ Browser support: The [MDN documentation][mdn-text-wrap-balance] notes that balancing text is computationally
expensive and is only supported for blocks spanning a limited number of lines (six or less for Chromium, ten or
less for Firefox).

[docs-experimental-code]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/contribution/experimental-code.md
[mdn-text-wrap-balance]: https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap#balance
