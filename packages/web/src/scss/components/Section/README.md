# Section

The `Section` component is a fundamental building block to group related content into
semantically meaningful areas, enhancing both the structure and readability of your pages.

There is no dedicated CSS class for the Section. Use a `<div>` or a `<section>` element (see [Semantics](#semantics))
with [utility classes][utilities] for paddings, background color and text alignment.

```html
<div class="py-1100 py-tablet-1300">Content</div>
```

In most cases, you will want to place a [Container][container] inside the Section to center and limit
the width of the content:

```html
<div class="py-1100 py-tablet-1300">
  <div class="Container">Content</div>
</div>
```

Later examples use `<section>` for brevity.

## Semantics

Section is a layout band with padding, background and a Container. Whether it should be a `<section>` element
depends on its content — not on how it looks, nor on a frame named "Section" in Figma.

### When to Use the `section` Element

A `<section>` with an accessible name becomes a landmark that screen reader users can jump to. Use `section`
only when the band:

- has its own heading (`h2`, `h3`, …), and
- holds content worth jumping to, e.g. search results.

Link the heading using `aria-labelledby`:

```html
<section class="py-1100 py-tablet-1300" aria-labelledby="similar-jobs-heading">
  <div class="Container">
    <h2 id="similar-jobs-heading">Similar jobs</h2>
    …
  </div>
</section>
```

Otherwise, use a `<div>`, e.g. for a background stripe, a breadcrumb strip or a padding wrapper. This also
applies to a band holding the page's `h1`: the `h1` heads the whole page, not a subsection.

```html
<div class="py-1000 py-tablet-1100 bg-secondary">
  <div class="Container">
    <h1>My CV</h1>
  </div>
</div>
```

### One Section or Several

Start a new Section only where the background changes or a new region with its own heading begins. Otherwise,
keep the content in one Section and space it inside, e.g. with [utility classes][utilities] or [Stack][stack].

```html
<!-- ❌ Two Sections for one band -->
<section class="py-1000 py-tablet-1100">
  <div class="Container"><nav aria-label="Breadcrumb" class="Breadcrumbs">…</nav></div>
</section>
<section class="py-1000 py-tablet-1100">
  <div class="Container"><form>…</form></div>
</section>

<!-- ✅ One Section, rendered as `div` -->
<div class="py-1000 py-tablet-1100">
  <div class="Container">
    <nav aria-label="Breadcrumb" class="Breadcrumbs mb-1000">…</nav>
    <form>…</form>
  </div>
</div>
```

## Padding

Use the `py-*`, `pt-*` or `pb-*` utility classes to set the vertical padding.

```html
<section class="py-200">…</section>
```

Responsive values can be defined using the `tablet` and `desktop` infixes:

```html
<section class="pt-200 pt-tablet-300 pt-desktop-400">…</section>
```

## Background Color

Use the `bg-*` utility classes to set the background color. The examples below use `primary`,
`secondary` and `tertiary` from the [Background Color dictionary][dictionary-color]; see the
[utility classes][utilities] for additional generated background values.

```html
<section class="py-900 py-tablet-1000 bg-primary">…</section>
<section class="py-900 py-tablet-1000 bg-secondary">…</section>
<section class="py-900 py-tablet-1000 bg-tertiary">…</section>
```

## Sizes

We suggest these sizes for the section component. They match the `size` prop of the [React Section][react-section].

```html
<section class="py-900 py-tablet-1000">XSmall Size</section>
<section class="py-1000 py-tablet-1100">Small Size</section>
<section class="py-1100 py-tablet-1300">Medium Size</section>
<section class="py-1200 py-tablet-1400">Large Size</section>
<section class="py-1400 py-tablet-1600">XLarge Size</section>
```

| Size     | Padding y-axis (mobile) | Padding y-axis (tablet/desktop) |
| -------- | ----------------------- | ------------------------------- |
| `xsmall` | `py-900`                | `py-tablet-1000`                |
| `small`  | `py-1000`               | `py-tablet-1100`                |
| `medium` | `py-1100`               | `py-tablet-1300`                |
| `large`  | `py-1200`               | `py-tablet-1400`                |
| `xlarge` | `py-1400`               | `py-tablet-1600`                |

### Padding on One Side Only

When the Section needs padding on one side only, e.g. the last Section on the page placed right above
the footer, use the `pt-*` or `pb-*` utility classes with the values of the chosen size:

```html
<section class="pt-1100 pt-tablet-1300">
  <div class="Container">Last section before the footer</div>
</section>
```

Avoid combining `py-*` with a reset such as `pb-0`. Responsive utility classes take precedence from their
breakpoint upwards, so `pb-0` removes the bottom padding on mobile only, while `py-tablet-1300` still applies
from tablet upwards.

## Text Alignment

Use utility classes to align the text inside the `Section` component.

```html
<section class="text-center">Centered Text</section>
<section class="text-right">Right Aligned Text</section>
```

Responsive values can be defined using the `tablet` and `desktop` infixes.

```html
<section class="text-center text-tablet-right text-desktop-left">Responsive Text Alignment</section>
```

[container]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Container/README.md
[dictionary-color]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/DICTIONARIES.md#color
[react-section]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Section/README.md
[stack]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Stack/README.md
[utilities]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/settings/_utilities.scss
