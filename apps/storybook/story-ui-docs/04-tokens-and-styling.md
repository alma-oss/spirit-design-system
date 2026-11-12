# Design Tokens and Styling

Design tokens live in `@alma-oss/spirit-design-tokens`. Components consume them through **props with token names**.
Never write raw values (px, rem, hex, rgb) and never reference token CSS variables yourself. Token values differ per
configuration, so only token names are stable.

## Token Families and the Props That Use Them

- **Space** `space-0`, `space-100` … `space-1700` (steps of 100): `spacing`, `spacingX`, `spacingY`, `margin*`,
  `padding*` (Box), `paddingY` / `paddingTop` / `paddingBottom` (Section).
- **Breakpoints** `mobile`, `tablet`, `desktop`: keys of responsive objects, `hideOn`, `hideFrom`.
- **Border radius** `0`, `100` … `500`, `full`; **border width** `0`, `100`, `200`; **shadow** `100` … `400`:
  `borderRadius`, `borderWidth`, `boxShadow` on Box.
- **Text color** `primary`, `secondary`, `tertiary`, `neutral-basic`, `neutral-subtle`, `accent-01-basic` …
  `accent-06-subtle`, `emotion-danger-basic` …: `textColor` on Text, Heading and Box.
- **Background color** `primary`, `secondary`, `tertiary` (Box, Section, CardMedia); Box also takes `neutral-basic`,
  `neutral-subtle`, `accent-0X-basic/subtle` and `emotion-*-basic/subtle`.
- **Emotion names** `success`, `informative`, `warning`, `danger`: `color` of Button, ButtonLink, Alert, Tag, Icon.
- **Theme** `theme-light-default`, `theme-light-on-brand`: `theme` on any component.

Emotion intensity suffix is `basic` or `subtle`, for example `emotion-warning-subtle`. Accent colors go from `01` to
`06`.

## Spacing Rules

- Gaps between siblings come from the parent: `Stack spacing`, `Flex spacing`, `Grid spacing`.
- Inner space comes from `Box padding*` or `Section size` / `paddingY`.
- Use `margin*` only for a single exception, for example `marginBottom="space-800"` under a page title.
- Typical rhythm: `space-400`–`space-600` between fields, `space-800`–`space-1000` between blocks.

```tsx
<Box padding={{ mobile: 'space-600', tablet: 'space-800' }} backgroundColor="secondary" borderRadius="300">
  <Stack spacing="space-600">…</Stack>
</Box>
```

## Typography

Use `Heading` for headings and `Text` for body copy. Both accept:

- `size`: `xsmall` | `small` | `medium` (default) | `large` | `xlarge`.
- `fontWeight`: `regular` | `semibold` | `bold` (headings are bold by default). `isItalic` for italic.
- `textColor` (see the table), `textAlignment` (`left` | `center` | `right`, responsive allowed), `isTextBalanced`.
- `elementType`: required on Heading (`h1`–`h6`), defaults to `p` on Text. Pick the element by document outline and
  the look by `size`; they are independent.

```tsx
<Heading elementType="h2" size="small">Account</Heading>
<Text size="small" textColor="secondary">Last change 2 days ago</Text>
```

⚠️ `emphasis` on Heading and Text is deprecated. Use `fontWeight` and `isItalic`.

Smaller helpers: `CaptionText` and `ActionText` (both take `textColor`). Links use `Link` with `color`
(`primary` (default) | `secondary` | `tertiary` | `inherit`) and `underlined` (`hover` (default) | `always` |
`never`). For a display-size hero title, `UNSTABLE_DisplayHeading` exists.

## Colors Through Component Props

- Actions: `Button` / `ButtonLink` `color` (`primary`, `secondary`, `tertiary`, `plain`, or an emotion name).
- Status: `Alert color`, `Tag color` (`neutral` (default) | `selected` | emotion name) with `isSubtle`.
- Icons: `Icon color` takes a text color name (`primary`, `secondary`, `tertiary`), an emotion name, an accent number
  (`01` … `06`) or `selected`. Without `color`, a single-tone icon inherits the text color.
- Surfaces: prefer `Box colorScheme` (for example `neutral-subtle`, `emotion-informative-subtle`) over separate
  background and text colors, because it keeps text, background and border consistent.

## Theming

Spirit ships the themes `theme-light-default` and `theme-light-on-brand`. Switch a subtree with the `theme` prop,
usually on a `Box` or `Section` together with a background:

```tsx
<Box theme="theme-light-on-brand" backgroundColor="primary" padding="space-800" borderRadius="300">
  <Heading elementType="h2" size="small">
    Branded panel
  </Heading>
</Box>
```
