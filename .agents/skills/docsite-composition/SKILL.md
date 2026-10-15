---
name: spirit:docsite-composition
description: >-
  Build or refactor any docsite page or component under apps/docsite/src (routes in src/app, domains,
  shared UI) with @alma-oss/spirit-web-react composition instead of custom CSS or UNSAFE_className.
  Use when adding or changing a docsite page, section, or component in TSX, replacing custom CSS with
  Spirit props, or editing docsite content, Lottie, or logo assets.
---

# Docsite Composition

How to build docsite pages and components from Spirit components and props. The always-on rules are in
[`apps/docsite/AGENTS.md`][docsite-agents]. For SCSS rules, use `spirit:docsite-styles`.

## Structure

- Routes in `apps/docsite/src/app/` stay thin. They import pages and sections from a domain.
- Each domain lives in `apps/docsite/src/domains/<name>/`, with its shared pieces in `ui/` (for example `domains/content/ui/`).
- App-wide UI lives in `apps/docsite/src/ui/`.
- Homepage example: shared pieces live in `domains/homepage/ui/` (`PageSection`, `SectionHeader`, `Stats`, `Stamp`, `HoverLottie`, `FeatureGrid`).
  Each section lives in `features/<name>/`, for example `features/hero/Hero.tsx` with `features/hero/Hero.scss`.
  The barrel `domains/homepage/index.ts` re-exports only the sections the page mounts.
  Follow the same `ui/` and `features/<name>/` split when another domain grows into separate sections.
- Do not put a flat pile of section files in a domain root.

## Decision Order

Before writing anything custom, check the [Known Spirit Limits](#known-spirit-limits). Then pick the first option that works:

1. A Spirit prop on the component you already have.
2. Composition of Spirit components (`Section`, `Grid`, `GridItem`, `Container`, `Stack`, `Flex`, `Box`, `Heading`, `Text`, `Link`, `UNSTABLE_EyebrowText`, `UNSTABLE_Tile`).
3. The block's own BEM class for what props cannot express (see `spirit:docsite-styles`).
4. `UNSAFE_className`. Passing the block's own BEM class through `UNSAFE_className` (for example `UNSAFE_className="LogoStrip__grey"`) is acceptable only when the gap is named in the Known Spirit Limits.
   If the gap is not listed, follow the missing-API rule in [`apps/docsite/AGENTS.md`][docsite-agents].

## Composition Patterns

The examples come from the homepage. The patterns apply to every docsite page.

| Need                       | Spirit pattern                                                                                                                      | Do not                                                                    |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Section spacing and header | `Section` `size`, or the homepage `PageSection` and `SectionHeader` (`Grid`, `Stack`, `Heading`, `Text`, `UNSTABLE_EyebrowText`)    | Add stylesheets to recreate Spirit spacing                                |
| Centered narrow intro      | `Container` with `size="small"`                                                                                                     | Nest `Container` inside `Container`                                       |
| Card column with actions   | Vertical `Flex`, with `marginTop="auto"` on the bottom `ActionGroup` (see `EducationForm.tsx`)                                      | —                                                                         |
| Text measure               | `Grid` column placement (`GridItem` `columnStart`/`columnEnd`), as in the homepage FAQ                                              | Add a max-width class                                                     |
| Tiles                      | `Flex`, `Box`, and `UNSTABLE_Tile`, as in the homepage building blocks                                                              | Override the Tile radius                                                  |
| Full-width child           | `Stack`, a single-column grid that stretches its children, as in the homepage hero search                                           | Set `width: 100%` on a child of a vertical `Flex`                         |
| Stacked layers (crossfade) | `Grid` `cols={1}` with two `GridItem`s, both `columnStart={1}` and `rowStart={1}`. The opacity fade can stay in CSS                 | —                                                                         |
| Link-colored text or title | `Link` with `underlined="never" \| "hover" \| "always"` (default `"hover"`). Use `elementType="span"` when it must not be an anchor | Pass a boolean to `underlined`, or color `Text` like a link               |
| Eyebrow label              | `UNSTABLE_EyebrowText` with an explicit `textColor`, for example `textColor="accent-01-basic"`                                      | Add a local eyebrow or its stylesheet, or target `Text` from another file |
| Monospace caption          | `typography-code-small-regular` utility class (Roboto Mono, 14px)                                                                   | Use `Text` `size="small"`                                                 |

## Known Spirit Limits

Do not "fix" these with the wrong API. Styling-only limits are in the
[`spirit:docsite-styles` Known Spirit Limits][styles-limits].

- A vertical `Flex` is a grid. `alignmentX="stretch"` does not widen a single child the way a block-level flex item would. Full-bleed width inside a vertical `Flex` needs an explicit track (`minmax(0, 1fr)`) or a width on the child.
- `Flex` has no vertical-reversed direction. A stamp's dashed connector grows with `flex: 1`. A vertical `Flex` is a grid, so it cannot draw that connector.
- `Container` with `size="small"` is narrower than the `container-small-max-width` token because the container adds its own padding. `Container` `size="small"` is the accepted choice for a narrow intro.
- `Box` has no height, min-height, max-width, position, or overflow. Reserved tile heights and sticky panels stay in that block's own CSS. `Box` also has no interactive hover background, so the custom-asset tiles keep their own hover fade.
- `Text` has no eyebrow size and no link color. `accent-02-basic` text is the same hex as the default link color in the default theme, and it is still the wrong token.
- `UNSTABLE_EyebrowText` has no default text color.
- `Text` has no code typography. `Text` `size="small"` is Inter at 14px.
- `Checkbox` and `Radio` do not accept a class on their inner label. The required asterisk is hardcoded `content: '*'`. Do not restyle those labels or asterisks from a parent stylesheet. Change the demo so the API gap is unnecessary. Do not pretend a class prop exists.
- Toast viewport positioning and `Label` weight or required-asterisk suppression are API gaps. Do not restyle them with another component's class name from a foreign stylesheet.
- `PartnerLogo` `size="small"` is 32px and `ProductLogo` is 44px. The logo strip uses designed heights (about 29px and 30px) and a hover crossfade between grey and color artwork. Those components have no height prop and no stacked-image prop.

## Assets

- Lottie files live in `apps/docsite/public/lottie/`. Their colors are baked into the JSON.
  Edit the JSON to recolor. Do not recolor with CSS attribute selectors.
  The homepage hero persona animations are `building-blocks.json`, `working-on-a-laptop.json`, `business-growth.json`, and `analysis.json`.
- Logos use `PartnerLogo` and `ProductLogo`, with artwork in `apps/docsite/public/logos/grey/` and `apps/docsite/public/logos/color/`.
  When a logo does not fit, edit the SVG files to fit. Do not override the logo size in CSS.

## Content

- Each page has exactly one `h1`, its title. Sections start at `h2`. On the homepage, the hero title is the `h1`.
- Do not link to routes that do not exist. Use an existing route such as `routes.components` until the real page exists. Do not point at `/components/status`.
- Count-up numbers stay at 0 until they are on screen, then play once. Reduced motion shows the final numbers immediately. The homepage `Stats` follows this.

## Done Check

Run the checks in [`apps/docsite/AGENTS.md`][docsite-agents].

[docsite-agents]: ../../../apps/docsite/AGENTS.md
[styles-limits]: ../docsite-styles/SKILL.md#known-spirit-limits
