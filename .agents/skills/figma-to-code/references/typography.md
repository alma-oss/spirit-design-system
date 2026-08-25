# Typography

Canonical docs: Heading, Text, CaptionText, ActionText, and Link READMEs under
`packages/web-react/src/components/`. Color unions live in
`packages/web-react/src/types/shared/colors.ts` and `dictionaries.ts`.

Visual style and HTML semantics are independent decisions.

## Map Figma Text Styles

| Figma style                    | Component                 | Default element            | Default size / weight                          |
| ------------------------------ | ------------------------- | -------------------------- | ---------------------------------------------- |
| Display/\*                     | `UNSTABLE_DisplayHeading` | **required** `elementType` | `size="medium"`; no `fontWeight`               |
| Heading/\*                     | `Heading`                 | **required** `elementType` | `size="medium"`, `fontWeight="bold"`           |
| Body/\* (not Link)             | `Text`                    | `p`                        | `size="medium"`, `fontWeight="regular"`        |
| Caption/\*                     | `CaptionText`             | `span`                     | caption tokens; do not use `Text size="small"` |
| Action/\* standalone           | `ActionText`              | `span`                     | `size="medium"`                                |
| \*/Link\* or `themed/link/...` | `Link`                    | `a`                        | `color="primary"`, `underlined="hover"`        |

Never put a Body, Caption, or Display style on `Heading` just because the design looks large. Never
put a Heading style on `Text` just to avoid picking an `h*` tag. Never use `Heading` for Figma
**Display/\*** styles.

`elementType` accepts any React element type. Choose it from the document outline:

- Real headings: `h1`–`h6` on `Heading`, `UNSTABLE_DisplayHeading`, or `CardTitle`
- Body copy: `p` (Text default) or `span` for inline
- Visually heading-like stats or labels that are not outline headings: `div` or `span`
- Body typography that **is** a heading in the outline: `Text elementType="h4"` is valid (see Card
  title alternatives)

## Display Type

Figma **Display/\*** styles map to `UNSTABLE_DisplayHeading`, not `Heading`. `elementType` is
required. Display tokens have no weight axis — do not pass `fontWeight` or `emphasis`. Omit `size`
when it is `medium`. `isItalic` is styling only.

Canonical docs: `packages/web-react/src/components/UNSTABLE_DisplayHeading/`.

## Weight and Italic

`emphasis` is deprecated. Use:

- `fontWeight="regular" | "semibold" | "bold"`
- `isItalic` for italic

Omit `fontWeight` when it matches the component default (Heading bold, Text regular). `isItalic`
defaults to false — set it only when the design is italic. Do not pass `fontWeight` on
`UNSTABLE_DisplayHeading`.

If Code Connect still emits `emphasis`, replace it and mention the mapping to the user.

## Color

When `textColor` is omitted, text inherits from the parent.

Heading, Text, CaptionText, ActionText, and `UNSTABLE_DisplayHeading` accept the text-color union:
`primary`, `secondary`, `tertiary`, `neutral-basic`, `neutral-subtle`, `accent-*-basic|subtle`, and
`emotion-{danger|informative|success|warning}-{basic|subtle}`.

Do **not** use `inverted`, `disabled`, or bare emotion names (`success`, `danger`) on these
components.

```tsx
<Heading elementType="h2" textColor="accent-02-basic">
  Accent heading
</Heading>
```

Link uses a different dictionary: `primary` (default), `secondary`, `tertiary`, `inherit`.
`color="inherit"` should usually pair with `underlined="always"`.

## Link

Figma often represents a link as a text node with a `link` style — that is the DS `Link`, not a
styled `p`.

```tsx
<Link href="/path">Show more</Link>
```

Other current Link props: `underlined` (`hover` | `always` | `never`), `hasVisitedStyleAllowed`,
`isDisabled`, `isStretched`. There is no `isExternal`; use `target` and `rel` on the anchor when
needed. Confirm `href` from product context — do not invent routes.

Inside a Card title, prefer `CardLink` over `Link`. See [cards](cards.md).

## Margin Next to Flex/Grid Spacing

Reset foundation `margin-bottom` only on typography nodes that have a following sibling inside
Flex or Grid. Leave the last child alone. Stack already resets direct-child margins.

## Action Labels

Button, ButtonLink, Link, and similar controls ship their own action typography. Do not wrap their
children in `ActionText` unless the design shows standalone action text outside a control.
