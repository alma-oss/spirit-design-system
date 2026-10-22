---
name: spirit:docsite-component-detail
description: >-
  Add or change the Spirit docsite component detail page: header, playground, tabs, and documentation
  blocks. Covers ComponentsBand detail variants, page actions, playground.json, Navigation tabs, and the
  small heading scale. Use when editing a component page, playground.json, or component documentation
  headings. Page composition and SCSS rules live in spirit:docsite-composition and spirit:docsite-styles;
  do not copy those skills into this one.
category: spirit
displayName: Spirit Docsite Component Detail
---

# Docsite Component Detail

Use this skill when someone changes a component page under `/components/[component]`: the header, the
playground, the tabs, or the documentation blocks. Card pictures on `/components` belong to
`/spirit:docsite-component-preview`.

Page layout and SCSS conventions are `/spirit:docsite-composition` and `/spirit:docsite-styles`. Do not
copy those skills here.

## Page Shape

The detail layout is `ComponentHeader`, then `ComponentTabNavigation`, then the view.

- Render `ComponentPlayground` inside the header only when `getComponentPlayground` returns a file.
  `parsePlaygroundFile` returns null for an unknown component or a control that does not match the schema,
  and that component then has no playground.
- Do not put `ComponentCover` back on the detail page.
- Leave the `/components` listing as the card grid (`ComponentsBand` + `ComponentsPageHeader`). Do not
  restore the text list.

## Bands

Detail blocks use `ComponentsBand` from `features/component-list`. Do not add a second band component.

| Variant        | Use                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------- |
| `detailHeader` | Header. No full-width bottom line, so the header flows into the tabs.                    |
| `tabs`         | Tab strip. Full-width bottom line.                                                       |
| `content`      | A documentation block. The divider is inside the container, and the last block has none. |

Do not change the listing variants `header`, `heading`, and `grid`.

## Where New UI Lives

Put header and playground pieces in
`apps/docsite/src/domains/components/features/component-detail/ui/<Name>/`.

- Plain SCSS (`import './Name.scss'`) and string BEM classes. No CSS modules.
- A folder `index.ts`, and a barrel from `features/component-detail/index.ts`.

## Page Actions

Listing and detail share `PageActions`. Detail links come from `getComponentPageLinks`.

- Copy writes the page title, the description, and the URL. Show the toast only after the clipboard write
  succeeds.
- Storybook and Figma use the URLs from `playground.json`. When one is missing, use the same fallback as
  the listing.
- GitHub opens the component folder in `packages/web-react/src/components`.

## Playground

A playground component is a name in `PLAYGROUND_COMPONENTS` plus a `docs/playground.json` next to the
component docs. `parsePlaygroundFile` is the gate. Do not render a component that is not in the registry.

- One accessible name per control. Use the Spirit label. Do not add a second `<label>` and `isLabelHidden`.
- "Appearance" is `Text`, not a heading.
- Keep SCSS for what props cannot express: stage min-height, code overflow, and the fixed panel column.
  Device width is a stage modifier, not an inline style. A transition runs only inside
  `@media (prefers-reduced-motion: no-preference)`.
- Monospace copy uses the `typography-code-small-regular` utility.
- Do not select another component's elements (`> button`, `input`) and do not pass `UNSAFE_className` for
  font or margin.

## Tabs

Tabs are Spirit `Navigation` and `NavigationAction` inside the `tabs` band. `Tabs` only does in-page panes,
so do not copy `.Tabs` classes onto the route links.

Keep both filters: `hiddenTabs` from `playground.json`, and `getComponentViewsAvailability` for sources that
are not on disk.

## Headings

Component pages use `componentBlockHeadingPropsByTag`: h2 is `small`, h3–h6 are `xsmall`, margins are
`space-1200` and `space-600`. Leave `markdownHeadingPropsByTag` for every other page.

`rehypeMarkBlockTitle` marks the first heading of a block when that heading is the first element, and the
heading component then sets `fontWeight="semibold"` and `marginTop="space-0"`. Do not target `h2` from CSS.

- Do not put `createContext` in `mdx-components.tsx`. Server components import that module.
- Web and React READMEs compile through `compileCanonicalSource` with `componentBlockHeadingComponents`.
  Do not add a second `outputFileTracingIncludes` entry for those READMEs. `/components/**` already traces them.
- `splitMarkdownSections` only splits blocks, drops thematic breaks, and strips bold-only headings. Do not
  shift a heading level that `rehypeNormalizeHeadings` will shift again.

## Design.md

`design.md` is Supernova output. `yarn supernova:extract` overwrites hand edits. The Button color images
are intentionally absent on this branch. Do not put them back.

## Done

Open `/components/button` and check the header actions, the playground (controls, device, copy), the tabs,
and the doc blocks. Open `/components` and check that the listing lines and header are unchanged.

Run `yarn workspace @alma-oss/spirit-docsite test`. It runs lint, unit tests, and types.
