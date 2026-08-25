# Layout

Canonical docs: Flex, Grid, Stack, Box, Section, and Container READMEs under
`packages/web-react/src/components/`. Confirm defaults from the component implementation, not from
copied tables.

Breakpoints: `mobile` from `0`, `tablet` from `48rem`, `desktop` from `80rem`. Responsive props are
`T | Partial<Record<BreakpointToken, T>>` and cascade forward. See
`packages/web-react/src/types/shared/responsive.ts` and `docs/DICTIONARIES.md`.

## Choose a Layout Component

| Need                                  | Component   |
| ------------------------------------- | ----------- |
| One-dimensional row or column         | `Flex`      |
| Uniform repeating items that wrap     | `Grid`      |
| Vertical list, optional dividers      | `Stack`     |
| Surface only (color, padding, border) | `Box`       |
| Page/region with optional max-width   | `Section`   |
| Width constraint without Section      | `Container` |

Do not copy every Figma autolayout frame into a Spirit node. Skip frames that only name, clip, or
group for the designer. Keep wrappers that create a real gap, alignment, max-width, or semantic
region.

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
  <Box UNSAFE_style={{ maxWidth: '50rem' }}>{/* constrained child still stretches up to max-width */}</Box>
  <Grid cols={4}>{/* fills the Flex width */}</Grid>
</Flex>
```

## Grid

Defaults (`Grid.tsx`): `alignmentX="stretch"`, `alignmentY="stretch"`. The CSS grid is 12 columns
when `cols` is omitted. Do not add explicit default alignment “to be safe.”

`space-between` / `baseline` are not Grid CSS modifiers even if types currently allow them. Use
`stretch`, `left`/`top`, `center`, `right`/`bottom`.

For list semantics, set `elementType="ul"` (or `ol`) and put items in `GridItem` as `li`. See the
Grid README.

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

Section defaults: `elementType="section"`, `hasContainer={true}`. Container default size is
`xlarge`. Section `backgroundColor` is only `primary` | `secondary` | `tertiary`.

- One container layer: keep the default inner Container. If the layer is not XLarge, set
  `containerProps={{ size: 'medium' }}` (or the named size). Omit `containerProps` for XLarge.
- Two or more Container layers with **distinct** widths: `hasContainer={false}` and render that many
  `Container` components. Do not nest a second Container inside Section’s default one.
- Full-bleed backgrounds stay on Section; constrained content goes in Container.

## Spacing and Max-Width

Map Figma spacing variables to `space-*` tokens (`space-0` through `space-1700` in
`packages/design-tokens/src/js/global-tokens/spacing.ts`). Apply `UNSAFE_style={{ maxWidth }}` only
on the innermost wrapper that actually carries the constraint.

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
