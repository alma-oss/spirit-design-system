# Cards

Canonical docs: `packages/web-react/src/components/Card/README.md`, types in
`packages/web-react/src/types/card.ts`, exports in `packages/web-react/src/components/Card/index.ts`.

There is **no** `CardDescription`. Put supporting copy in `CardBody` as `Text`, `<p>`, or `Truncate`.

## Card vs Box

Choose by composition and behavior, not by the Figma layer name.

Use `Card` when the block is a **topic container**: artwork or media, eyebrow/title, supporting copy,
optional footer actions, and optionally a stretched `CardLink`. `isBoxed` is a visual modifier on
that composition, not a reason to pick Card.

Use `Box` (with Flex or Grid if layout is needed) for padded surfaces, settings panels, form field
groups, and other chrome that only needs background, border, or radius. A Figma component named
"Card" that has no Card subcomponents is still a `Box`.

## Composition

Keep this order. Extra wrappers and reordering break Card grid areas, spacing, and accessibility:

1. `CardArtwork` **or** `CardMedia` (optional)
2. `CardLogo` (optional)
3. `CardBody` (with `CardEyebrow`, `CardTitle`, body copy)
4. `CardFooter` (optional)

```tsx
<Card>
  <CardArtwork>
    <Icon name="file" />
  </CardArtwork>
  <CardBody>
    <CardEyebrow>Eyebrow</CardEyebrow>
    <CardTitle>
      <CardLink href="/article">Title</CardLink>
    </CardTitle>
    <p>Supporting copy goes here. Do not use CardDescription.</p>
  </CardBody>
  <CardFooter>
    <Button size="small">Action</Button>
    <Button color="secondary" size="small">
      Secondary
    </Button>
  </CardFooter>
</Card>
```

Card defaults (`Card.tsx`): `direction="vertical"`, `elementType="article"`, `isBoxed={false}`.
`direction` may be `horizontal` or `horizontal-reversed`, including responsive objects.
`alignmentY` aligns artwork/media and body together.

## CardTitle

Defaults: `elementType="h4"`, `isHeading={true}`.

- `elementType` controls the HTML heading (or non-heading) tag. Pick the rank from the page outline.
- `isHeading` only switches heading vs body **typography**. It does not change the rendered element.
- There is no `headingProps`.
- Omit `isHeading` when the title should look like a heading (the default). Set `isHeading={false}`
  only for body-styled titles, and then set `elementType` if `h4` is the wrong tag.

## CardLink

`CardLink` is a stretched overlay link. Put it around the title text. Props are native anchor
attributes plus `href` — there is no `isExternal`. For a new tab, use
`target="_blank" rel="noopener noreferrer"`.

A Card may contain **one** stretched `CardLink` plus separately interactive footer buttons or other
links. Card raises those controls above the overlay. Do not add a second full-card link, and do not
nest buttons inside the overlay link. Use `CardBody isSelectable` when body text must remain
selectable.

Detect CardLink from Figma: title uses a link text style or `themed/link/...` tokens, or Code
Connect maps to `CardLink`.

## Artwork and Media

- `CardArtwork` default `alignmentX="left"` (responsive allowed). The class is always generated;
  on horizontal cards a visible effect needs leftover space in the artwork track.
- Prefer Card `alignmentY` when artwork and body share vertical alignment.
- Use an inner Flex only when artwork alignment must differ from the rest of the Card.
- `CardMedia` owns image/video presentation (size, fit, filled height, background). The source prop
  is `hasFilledHeight` (not a class-name prop from older README wording).
- Images: use Figma MCP assets, repo files, or the product CDN. Do not use `picsum.photos`. Decide
  informative vs decorative `alt` explicitly (`alt=""` when decorative).

## Footer and Lists

`CardFooter` supports `alignmentX` and `hasDivider`. Button color is `color="secondary"`, not
`variant="secondary"`.

Card grids that are lists should use Grid/Flex `elementType="ul"` with each Card in an `li`, as in
the Card README list example.
