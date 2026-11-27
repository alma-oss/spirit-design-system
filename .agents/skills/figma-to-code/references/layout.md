# Layout

Canonical docs: Flex, Grid, Stack, Box, Section, and Container READMEs under
`packages/web-react/src/components/`. Confirm defaults from the component implementation, not from
copied tables.

Breakpoints: `mobile` from `0`, `tablet` from `48rem`, `desktop` from `80rem`. Responsive props are
`T | Partial<Record<BreakpointToken, T>>` and cascade forward. See
`packages/web-react/src/types/shared/responsive.ts` and `docs/DICTIONARIES.md`.

## Choose a Layout Component

| Need                                     | Component    |
| ---------------------------------------- | ------------ |
| One-dimensional row or column            | `Flex`       |
| Uniform repeating items that wrap        | `Grid`       |
| Equal-width columns in one row           | `Grid`       |
| Vertical list, optional dividers         | `Stack`      |
| Overflow region (horizontal or vertical) | `ScrollView` |
| Local surface (color, padding, border)   | `Box`        |
| Layout band (padding, background, width) | `Section`    |
| Width constraint without Section         | `Container`  |

A page band is `Section`, including when it renders `div`. `Box` is a local surface inside a band
or component.

Do not copy every Figma autolayout frame into a Spirit node. Skip frames that only name, clip, or
group for the designer. Keep wrappers that create a real gap, alignment, max-width, padding,
background, or semantic region.

## Flex

Implementation defaults (`Flex.tsx`): `direction="horizontal"`, `alignmentX="stretch"`,
`alignmentY="stretch"`, `elementType="div"`, `isInline={false}`, `isWrapping={false}`. Omit them
unless Figma differs.

- Direction values: `horizontal`, `vertical`, `horizontal-reversed`. `row` and `column` are removed.
- `isInline` renders `inline-flex` / `inline-grid`.
- `space-between` and `baseline` are Flex alignment values. Do not rely on them for Grid.
- Vertical Flex: Figma `align-items` → `alignmentX`, `justify-content` → `alignmentY`.
- Horizontal Flex: Figma `justify-content` → `alignmentX`, `align-items` → `alignmentY`.
- Children marked full-width in Figma need a stretching cross axis (`alignmentX="stretch"` on
  vertical Flex). Stretch is already the default — only set it when you must override a non-default
  parent.

```tsx
<Flex direction="vertical" spacing="space-1000">
  <Heading elementType="h2">Title</Heading>
  <Text>Stretches on the cross axis by default.</Text>
</Flex>
```

## Grid

Defaults (`Grid.tsx`): `alignmentX="stretch"`, `alignmentY="stretch"`. The CSS grid is 12 columns
when `cols` is omitted. Do not add explicit default alignment “to be safe.”

`space-between` / `baseline` are not Grid CSS modifiers even if types currently allow them. Use
`stretch`, `left`/`top`, `center`, `right`/`bottom`.

For list semantics, set `elementType="ul"` (or `ol`) and put items in `GridItem` as `li`. See the
Grid README.

Equal-width siblings in Figma (including exports that look like flex-grow) are Grid columns, not
Flex children with a grow or fixed-basis style. Two Figma rows of identical items are one Grid
over all of them, unless the rows genuinely differ.

### Mapping Figma Widths Onto Grid

Container max-widths and Grid gutters are **design tokens** (`container-*-max-width`, `space-*`),
not a frozen pixel formula. Infer columns from how the frame divides the parent, then express that
with `Grid` / `GridItem` on the twelve-column system:

- Equal repeating items: `cols` is the item count at that breakpoint (1, 2, 3, 4, 6, 12).
- One item that takes half the row: `GridItem columnEnd="span 6"` (or `cols={2}` when every sibling is equal).
- An asymmetric block: pick a span that matches its share of the 12-column track, not a measured px/rem.

Confirm Container size from the `size` token (`small` … `xlarge`), not from inspecting a screenshot width.

```tsx
// Measured or flex-grow widths on Flex children
<Flex spacing="space-1000">
  {cards.map((card) => (
    <Box key={card.id} UNSAFE_style={{ flex: '1 0 0' }}>
      <Card>{card.content}</Card>
    </Box>
  ))}
</Flex>

// Same layout as equal Grid columns
<Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }} spacing="space-1000">
  {cards.map((card) => (
    <Card key={card.id}>{card.content}</Card>
  ))}
</Grid>

// Asymmetric share of the twelve-column grid
<Grid cols={12} spacing="space-1000">
  <GridItem columnEnd="span 7">
    <Heading elementType="h1">…</Heading>
  </GridItem>
</Grid>
```

When items overflow the parent and the frame shows a clipped next item or previous/next controls,
wrap the overflowing content in `ScrollView` and set `direction` to match the scroll axis. Size the
children with Grid, Flex, or other layout components rather than a one-off width.

Count all siblings and inspect each instance override before mapping an array. Repeated columns can
differ independently in background, border, badge visibility, spacing, or content.

## Stack

Use for vertical rhythm and dividers (`hasIntermediateDividers`, start/end dividers). Stack resets
margins on direct children that are not `StackItem`. Content inside `StackItem` follows normal
typography margin rules.

For `ul`/`ol`, Stack can supply `li` to `StackItem`. See the Stack README.

## Box

Box does not lay out children. Combine with Flex or Grid:

```tsx
<Box colorScheme="neutral-subtle" padding="space-700" elementType={Flex} direction="vertical" spacing="space-500">
  {children}
</Box>
```

- Prefer `colorScheme` for semantic surfaces. Explicit `backgroundColor`, `backgroundGradient`,
  `textColor`, and `borderColor` override the matching scheme utilities.
- `backgroundColor` is a **scalar**. `backgroundGradient`, padding, and `borderRadius` may be
  responsive.
- Border color/radius/style apply only when `borderWidth` is greater than `0`. `0` is valid for
  width and radius.
- `focus` is not a Box border color. Allowed borders come from the border dictionaries plus accent
  and emotion border tokens — check `packages/web-react/src/types/box.ts`.

## Section and Container

A layer named Section or Container is usually a detached or expanded Design block: a ready-made
composition of `Section` and `Container`. Use that name to pick the component. Choose the element
from what the band contains.

Section defaults: `elementType="section"`, `hasContainer={true}`. Container default size is
`xlarge`. Section `backgroundColor` is only `primary` | `secondary` | `tertiary`. Omit
`elementType` when the default is the right element.

- Content worth jumping to, such as a headed region: keep `<section>`. Prefer a visible heading
  (`h2` and below) and set `aria-labelledby` to its id. With no visible heading, set `aria-label`.
- Background stripe, breadcrumb strip, padding wrapper, or the band that holds the page `h1`:
  set `elementType="div"`. Leave the `h1` inside that `Section`. It heads the page.
- Start a new `Section` only where the background changes or a new headed region begins.
  Otherwise keep one `Section` and space the content inside it.
- Keep sibling bands as siblings. A nested Figma frame is not a reason to nest `Section`.
- One container layer: keep the default inner Container. If the layer is not XLarge, set
  `containerProps={{ size: 'medium' }}` (or the named size). Omit `containerProps` for XLarge.
- Two or more Container layers with **distinct** widths: `hasContainer={false}` and render that many
  `Container` components. Do not nest a second Container inside Section’s default one.
- Full-bleed backgrounds stay on Section; constrained content goes in Container.

See the Semantics section in `packages/web-react/src/components/Section/README.md`.

## Spacing

Map Figma spacing variables to `space-*` tokens (`space-0` through `space-1700` in
`packages/design-tokens/src/js/global-tokens/spacing.ts`).

## Max-Width

Before applying `maxWidth`, check whether `Grid` can express the constraint (uniform repeating
items, column counts). Prefer `Section` or `Container` (with a `size` token) when the design is a
page/region width limit. A max-width on a block that starts at the container’s left edge is usually
a column span — use `GridItem` instead of a one-off width.

Drop a max-width that is larger than the column the block already sits in; it is inert design
metadata and should not be copied into code.

Apply `UNSAFE_style={{ maxWidth: 'x' }}` only on the innermost wrapper that actually carries the
constraint, and only when Grid, Section, or Container cannot. If a one-off cap is required, prefer
a spacing or container token over a raw pixel value. `flex`, `maxWidth`, `margin: 0 auto`, and
`borderTop` in `UNSAFE_style` usually mean a layout component was skipped.

## Typography Inside Flex and Grid

Spirit foundation adds margin to typography nodes that are **not** `:last-child`. In Flex/Grid with
an explicit `spacing`/`gap`, reset that margin only on siblings that have a following sibling:

```tsx
<Flex direction="vertical" spacing="space-700">
  <Heading elementType="h2" marginBottom="space-0">
    Title
  </Heading>
  <Text>Body that is last; do not reset.</Text>
</Flex>
```

Do not reset the last child. Do not reset Stack’s direct children.

## ActionGroup

ActionGroup is Flex with opinionated defaults: `direction={{ mobile: 'vertical', tablet: 'horizontal' }}`
and `alignmentX={{ mobile: 'stretch', tablet: 'left' }}`. Use it for button clusters instead of a
one-off Flex unless the design differs. For a reversed cluster, also set `alignmentX` to `right` on
tablet+. For submit/cancel, put submit first in DOM and reverse on tablet+. See [Forms](forms.md).
