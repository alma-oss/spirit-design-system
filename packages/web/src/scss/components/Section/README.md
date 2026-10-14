# Section

The `Section` component is a fundamental building block to group related content into
semantically meaningful areas, enhancing both the structure and readability of your pages.

There is no dedicated CSS class for the Section. It is composed of a semantic `<section>` element,
an inner [Container][container] and [utility classes][utilities] for paddings, background color
and text alignment.

```html
<section class="py-1100 py-tablet-1300">
  <div class="Container">Content</div>
</section>
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

## Container

Place the [Container][container] component inside the Section to center the content horizontally and
limit its width.

```html
<section class="py-1100 py-tablet-1300">
  <div class="Container">Content</div>
</section>
```

You can use any Container modifier, e.g. a fluid or a smaller Container:

```html
<section class="py-1100 py-tablet-1300">
  <div class="Container Container--fluid">Content</div>
</section>
<section class="py-1100 py-tablet-1300">
  <div class="Container Container--medium">Content</div>
</section>
```

Omit the Container when the content should span the whole width of the Section, e.g. for full-bleed images
or nested layouts that already contain their own Container.

```html
<section class="py-1100 py-tablet-1300">Content without Container</section>
```

## Sizes

We suggest these sizes for the section component. They match the `size` prop of the React `Section`.

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

### Breakpoint Caveat

Responsive utility classes are defined in media queries placed after the base classes, so they take
precedence from their breakpoint upwards. A base class such as `pb-0` therefore overrides `py-1100` on mobile
only, while `py-tablet-1300` still applies from tablet upwards.

```html
<section class="py-1100 py-tablet-1300 pb-0">
  ⚠️ Bottom padding is removed on mobile only, tablet and desktop keep `space-1300`.
</section>
```

To override the size padding on all screen sizes, add the override for both the base and the `tablet`
breakpoint.

### Removing Bottom Padding

A common case is the last Section on the page, e.g. one placed right above the footer, that needs no bottom
padding. Reset it for all breakpoints the size defines:

```html
<section class="py-1100 py-tablet-1300 pb-0 pb-tablet-0">
  <div class="Container">Last section before the footer</div>
</section>
```

Alternatively, set only the top padding instead of combining `py-*` with a reset:

```html
<section class="pt-1100 pt-tablet-1300">
  <div class="Container">Last section before the footer</div>
</section>
```

The same applies to the top padding.

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
[utilities]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/settings/_utilities.scss
