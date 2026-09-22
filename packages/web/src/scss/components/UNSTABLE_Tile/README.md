# UNSTABLE Tile

`UNSTABLE_Tile` is a decorated surface that fences off a region of a page. It carries a background, a border, a
radius and padding, and imposes no structure on its content.

> This component is UNSTABLE. It may significantly change at any time without notice.

The radius matches `Card`. The default radius can be customized with an optional device token. See
[Component Radius Overrides][component-radius-overrides].

## Basic Usage

A plain tile already renders the full surface, so no utility classes are needed to get the intended look.

```html
<div class="UNSTABLE_Tile">Content</div>
```

Reach for `Box` utility classes when a region needs styling primitives and nothing else, for `UNSTABLE_Tile` when
it needs the shared surface but no content structure, and for `Card` when the region really is a card composition
with artwork, a body and a footer.

## Custom Background

The tile renders the default surface. Add a background utility class to recolor it. Components nested in the
tile, such as [`ControlButton`][control-button], pick the new background up.

```html
<div class="UNSTABLE_Tile bg-secondary">Content</div>
```

ℹ️ Color schemes are not part of the tile's API. A tile keeps the default surface even inside a region
carrying a color scheme.

## Shadow

The tile is flat by default. Add the `UNSTABLE_Tile--shadow` modifier to raise it off the page.

```html
<div class="UNSTABLE_Tile UNSTABLE_Tile--shadow">Content</div>
```

The shadow can be overridden with the `--spirit-tile-box-shadow` custom property.

## Padding

The tile is padded by default. Use the padding utility classes to override it.

```html
<div class="UNSTABLE_Tile p-1200">Content</div>
```

Horizontal and vertical padding can be set separately with `px-*` and `py-*`, and each side individually with
`pt-*`, `pr-*`, `pb-*` and `pl-*`. Setting one axis leaves the other at its default.

```html
<div class="UNSTABLE_Tile px-1200 py-600">Content</div>
```

## Element Type

A tile is a `div`, because a surface is a visual device and not sectioning content on its own.

Use a `section` element together with an accessible name when the tile has its own heading and holds content a user
would plausibly navigate to, such as one step of a form a reader may jump between. A tile that exists only to group
or decorate should stay a `div`.

```html
<section class="UNSTABLE_Tile" aria-labelledby="personal-details-heading">
  <h2 id="personal-details-heading" class="typography-heading-small">Personal details</h2>
  Content
</section>
```

ℹ️ A `section` element takes on the `region` role only once it has an accessible name. A `section` without
`aria-labelledby` or `aria-label` is not exposed as a region at all, so it adds nothing but markup.

## Inner Spacing

`UNSTABLE_Tile` does not lay its children out. Nest a `Stack` or a `Flex` to space them.

```html
<div class="UNSTABLE_Tile">
  <div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-600)">Content</div>
</div>
```

[component-radius-overrides]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/design-tokens/README.md#component-radius-overrides
[control-button]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web/src/scss/components/ControlButton
