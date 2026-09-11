---
title: Text
---

<iframe src="https://spirit-design-system.netlify.app/packages/web/src/scss/helpers/text/" title="Embedded content" />

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
