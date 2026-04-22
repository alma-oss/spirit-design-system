---
title: Helpers
sourceUrl: https://spirit.supernova-docs.io/latest/development/helpers/text-i8vjtUWA
sourcePath: /latest/development/helpers/text-i8vjtUWA
sourceSection: development
lastExtractedAt: 2026-04-22T22:32:09.662Z
---

- [Accessibility](/latest/development/helpers/accessibility-jta1KKl2)
- [Animations](/latest/development/helpers/animations-tVOnNgsh)
- [Breakout](/latest/development/helpers/breakout-PLiXPOiR)
- [Dynamic Colors](/latest/development/helpers/dynamic-colors-x52GUUDZ-x52GUUDZ)
- [Images](/latest/development/helpers/images-vlaxk4d0)
- [Links](/latest/development/helpers/links-NZFXo0p5)
- [Lists](/latest/development/helpers/lists-mVCJdzWk)
- [Scroll Control](/latest/development/helpers/scroll-control-zxYuC39k)
- [Text](/latest/development/helpers/text-i8vjtUWA)
- [Typography](/latest/development/helpers/typography-Y8J6vWR5)

Embedded content: \[iframe\](https://spirit-design-system.netlify.app/packages/web/src/scss/helpers/text/)

## Truncate

| Class name              | Purpose                                                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text-truncate           | Trim single-line text from the right and append an ellipsis (…)                                                                                                                    |
| text-truncate-multiline | Trim multi-line text from right and append an ellipsis (…). The desired number of lines can be set via the \`--text-truncate-lines\` custom property on the element (default is 3) |

Example:

```html
<p class="text-truncate">This text will be truncated to 1 line.</p>
<p class="text-truncate-multiline" style="--text-truncate-lines: 5">
  This text will be truncated to 5 lines should it exceed this limit.
</p>
```

## Underline

| Class name             | Purpose                                |
| ---------------------- | -------------------------------------- |
| text-underlined-dotted | Underlines the text with a dotted line |

### Rendering of Dotted Underline

| Browser     | 1-3px thickness  | 4px+ thickness |
| ----------- | ---------------- | -------------- |
| Chrome/Edge | Squares          | Circles        |
| Firefox     | Circles          | Larger Circles |
| Safari      | Squares (mostly) | Minimal change |

Example:

```html
<p class="text-underlined-dotted">This text will be underlined with a dotted line</p>
```

On this page

- [Truncate](#section-truncate-46)
- [Underline](#section-underline-3a)
- [Rendering of Dotted Underline](#section-rendering-of-dotted-underline-e3)
