# UNSTABLE_Tile

`UNSTABLE_Tile` is a decorated surface that fences off a region of a page. It carries a background, a border, a
radius and padding, and imposes no structure on its content.

> This component is UNSTABLE. It may significantly change at any time without notice. See
> [Experimental Code][docs-experimental-code].

## Basic Usage

A plain tile already renders the full surface, so none of the props below are needed to get the intended look.

```tsx
<UNSTABLE_Tile>{/* Content goes here */}</UNSTABLE_Tile>
```

Reach for `Box` when a region needs styling primitives and nothing else, for `UNSTABLE_Tile` when it needs the
shared surface but no content structure, and for `Card` when the region really is a card composition with
artwork, a body and a footer.

## Custom Background

The tile renders the default surface. To recolor it, reach for a background utility class through the
[`UNSAFE_className` escape hatch][readme-escape-hatches]. Components nested in the tile, such as
[`ControlButton`][control-button], pick the new background up.

```tsx
<UNSTABLE_Tile UNSAFE_className="bg-secondary">{/* Content goes here */}</UNSTABLE_Tile>
```

ℹ️ Color schemes are not part of the tile's API. A tile keeps the default surface even inside a region
carrying a color scheme.

## Shadow

The tile is flat by default. Use the `hasShadow` prop to raise it off the page.

```tsx
<UNSTABLE_Tile hasShadow>{/* Content goes here */}</UNSTABLE_Tile>
```

## Padding

The tile is padded by default. Use the `padding` prop to override it.

```tsx
<UNSTABLE_Tile padding="space-1200">{/* Content goes here */}</UNSTABLE_Tile>
```

Horizontal and vertical padding can be set separately with the `paddingX` and `paddingY` props, and each side
individually with `paddingTop`, `paddingRight`, `paddingBottom` and `paddingLeft`. Setting one axis leaves the
other at its default.

```tsx
<UNSTABLE_Tile paddingX="space-1200" paddingY="space-600">
  {/* Content goes here */}
</UNSTABLE_Tile>
```

Responsive values can be set using an object:

```tsx
<UNSTABLE_Tile padding={{ mobile: 'space-600', tablet: 'space-1000', desktop: 'space-1200' }}>
  {/* Content goes here */}
</UNSTABLE_Tile>
```

## Element Type

A tile renders a `div`, because a surface is a visual device and not sectioning content on its own.

Use `elementType="section"` together with an accessible name when the tile has its own heading and holds content a
user would plausibly navigate to, such as one step of a form a reader may jump between. A tile that exists only to
group or decorate should stay a `div`.

```tsx
<UNSTABLE_Tile elementType="section" aria-labelledby="personal-details-heading">
  <Heading elementType="h2" id="personal-details-heading" size="small">
    Personal details
  </Heading>
  {/* Content goes here */}
</UNSTABLE_Tile>
```

ℹ️ A `section` element takes on the `region` role only once it has an accessible name. A `section` without
`aria-labelledby` or `aria-label` is not exposed as a region at all, so it adds nothing but markup.

## Inner Spacing

`UNSTABLE_Tile` has no spacing prop and does not lay its children out. Nest a [`Stack`][stack] or a [`Flex`][flex]
to space them.

```tsx
<UNSTABLE_Tile>
  <Stack spacing="space-600">{/* Content goes here */}</Stack>
</UNSTABLE_Tile>
```

## API

| Name            | Type                                        | Default     | Required | Description                    |
| --------------- | ------------------------------------------- | ----------- | -------- | ------------------------------ |
| `children`      | `ReactNode`                                 | -           | ✕        | Content of the Tile            |
| `elementType`   | `ElementType`                               | `div`       | ✕        | Type of element                |
| `hasShadow`     | `bool`                                      | `false`     | ✕        | Whether the Tile has a shadow  |
| `padding`       | \[`SpaceToken` \| `Responsive<SpaceToken>`] | `space-800` | ✕        | Padding of the Tile            |
| `paddingX`      | \[`SpaceToken` \| `Responsive<SpaceToken>`] | -           | ✕        | Horizontal padding of the Tile |
| `paddingY`      | \[`SpaceToken` \| `Responsive<SpaceToken>`] | -           | ✕        | Vertical padding of the Tile   |
| `paddingTop`    | \[`SpaceToken` \| `Responsive<SpaceToken>`] | -           | ✕        | Padding top of the Tile        |
| `paddingRight`  | \[`SpaceToken` \| `Responsive<SpaceToken>`] | -           | ✕        | Padding right of the Tile      |
| `paddingBottom` | \[`SpaceToken` \| `Responsive<SpaceToken>`] | -           | ✕        | Padding bottom of the Tile     |
| `paddingLeft`   | \[`SpaceToken` \| `Responsive<SpaceToken>`] | -           | ✕        | Padding left of the Tile       |

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

[control-button]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web-react/src/components/ControlButton
[docs-experimental-code]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/contribution/experimental-code.md
[flex]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web-react/src/components/Flex
[readme-additional-attributes]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[stack]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web-react/src/components/Stack
