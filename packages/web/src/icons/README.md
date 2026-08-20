# Icons

The Spirit icon set is synchronized directly from the Figma Assets file into the standalone
[`spirit-icons`][spirit-icons] package.
Icons are available both as SVG symbols and individual SVG files.

The preferred way to display an icon from Spirit icon set is to use the `<svg>` element:

```html
<svg class="Icon" width="24" height="24" aria-hidden="true">
  <use href="/icons/svg/sprite.svg#warning" />
</svg>
```

[spirit-icons]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/icons
