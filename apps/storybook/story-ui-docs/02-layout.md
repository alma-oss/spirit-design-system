# Layout

All layout is done with Spirit layout components and token-based props. Gaps, padding and margins take a **space
token** (`space-0` to `space-1700`, in steps of 100).

## Responsive Values

Most layout props accept a single value or an object with breakpoint keys `mobile`, `tablet` and `desktop`. Values
apply from the given breakpoint up (mobile first).

```tsx
<Stack spacing={{ mobile: 'space-400', tablet: 'space-800' }}>…</Stack>
<Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }}>…</Grid>
```

## Section and Container

`Section` is a page band with vertical padding, an optional background, and an inner `Container` (rendered by
default). `Container` centers content and limits its width.

- `Section`: `size` (`xsmall` | `small` | `medium` | `large` | `xlarge`, sets vertical padding),
  `paddingY` / `paddingTop` / `paddingBottom` (space tokens), `backgroundColor` (`primary` | `secondary` |
  `tertiary`), `textAlignment`, `hasContainer`, `containerProps`, `elementType` (default `section`).
- `Container`: `size` (`xsmall` | `small` | `medium` | `large` | `xlarge` (default)), `isFluid`, `textAlignment`.

Use `elementType="div"` for a Section without its own heading. Narrow a form with
`containerProps={{ size: 'small' }}`.

```tsx
<Section elementType="div" size="medium" containerProps={{ size: 'small' }}>
  <Heading elementType="h1">Page title</Heading>
</Section>
```

## Stack

Vertical composition. `spacing` (space token), or `hasSpacing` for the default gap. Dividers:
`hasIntermediateDividers`, `hasStartDivider`, `hasEndDivider`. Dividers need every child wrapped in `StackItem`;
without it, there are no dividers and no gap. For a list, use `elementType="ul"` and wrap each child in
`StackItem`, which then renders an `li`.

```tsx
<Stack spacing="space-600">
  <Heading elementType="h2" size="small">
    Profile
  </Heading>
  <Text>Short description.</Text>
</Stack>
```

## Flex

Row or column of items.

- `direction`: `horizontal` (default) | `vertical` | `horizontal-reversed`, or a responsive object.
- `alignmentX`: `left` | `center` | `right` | `space-between` | `stretch` (default).
- `alignmentY`: `top` | `center` | `bottom` | `baseline` | `stretch` (default).
- `spacing`, `spacingX`, `spacingY`: space tokens. `isWrapping`: boolean or responsive object. `isInline`.

```tsx
<Flex alignmentX="space-between" alignmentY="center" spacing="space-400">
  <Heading elementType="h2" size="small">
    Applicants
  </Heading>
  <Button size="small">Add</Button>
</Flex>
```

## Grid

Column grid. `cols`: `1` | `2` | `3` | `4` | `5` | `6` | `12`, or a responsive object. `spacing`, `spacingX`,
`spacingY`, `alignmentX`, `alignmentY` like Flex. Place items with `GridItem` (`columnStart`, `columnEnd`,
`rowStart`, `rowEnd`; a number, `'span 2'`, or a responsive object).

```tsx
<Grid cols={{ mobile: 1, tablet: 2 }} spacing="space-600">
  <TextField id="first-name" label="First name" name="firstName" />
  <TextField id="last-name" label="Last name" name="lastName" />
  <GridItem columnStart={1} columnEnd="span 2">
    <TextArea id="note" label="Note" name="note" />
  </GridItem>
</Grid>
```

## Box

A plain surface: padding, border, background, shadow, color scheme. Use it for panels and settings groups.

- Padding: `padding`, `paddingX`, `paddingY`, `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`.
- `backgroundColor`: `primary` | `secondary` | `tertiary` | `neutral-basic` | `neutral-subtle` |
  `accent-01-subtle` … | `emotion-success-subtle` ….
- Border: `borderWidth` (`0` | `100` | `200`), `borderColor` (`basic` default …), `borderRadius` (`0` | `100` …
  `500` | `full`), `borderStyle` (`solid` default | `dashed` | `dotted`). Color and style apply only with
  `borderWidth`; with `colorScheme`, the border color follows the scheme.
- `boxShadow`: `100` | `200` | `300` | `400`.
- `colorScheme`: `neutral-basic` | `neutral-subtle` | `selected-basic` | `selected-subtle` |
  `emotion-success-basic` … | `accent-01-subtle` … | `disabled`. Preferred for semantic surfaces.

```tsx
<Box padding="space-800" borderWidth="100" borderRadius="300">
  <Stack spacing="space-600">…</Stack>
</Box>
```

## Card

Use Card for one topic composed of Card parts, in this order: `CardArtwork` or `CardMedia` (optional), `CardLogo`
(optional), `CardBody` (required, contains `CardEyebrow` and `CardTitle`), `CardFooter` (optional). Props:
`direction` (`vertical` default | `horizontal` | `horizontal-reversed`), `alignmentY`, `isBoxed`. `CardTitle`
renders an `h4` by default, change it with `elementType`. Make the whole card clickable with `CardLink` inside
`CardTitle`. A panel without these parts is a `Box`, not a Card.

```tsx
<Grid cols={{ mobile: 1, tablet: 3 }} spacing="space-600">
  <Card isBoxed>
    <CardBody>
      <CardEyebrow>Plan</CardEyebrow>
      <CardTitle elementType="h3">
        <CardLink href="#">Basic</CardLink>
      </CardTitle>
      <Text>For small teams.</Text>
    </CardBody>
    <CardFooter>
      <Button color="secondary">Choose</Button>
    </CardFooter>
  </Card>
</Grid>
```

## Spacing Around Any Component

Every component accepts style props `margin`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft`, `marginX`,
`marginY` (space token or `auto`, responsive allowed). Prefer the parent's `spacing` over margins on children.

```tsx
<Heading elementType="h1" marginBottom="space-800">
  Settings
</Heading>
```

Hide content per breakpoint with `hideOn` (`mobile` | `tablet` | `desktop`, or an array) and `hideFrom`.
