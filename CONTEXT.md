# Domain glossary

Terms used when talking about design tokens in this repository.

## SnapshotV1

Versioned JSON captured from a Figma file. It stores collections, variables, styles, bindings, and the remote alias closure without transforming values. Snapshots are ephemeral and gitignored. Processing happens in Node.

## Collection

A Figma variable collection. Spirit uses three names with a fixed contract:

- `Global tokens` — non-themed tokens (borders, radii, spacing, shadows, gradients, typography, other)
- `Theme tokens` — colors; each collection mode is a theme
- `Device` — breakpoints and per-device dimensions; modes are `mobile`, `tablet`, `desktop`

Unknown collections may contribute primitive dependencies. Valid uncategorized primitives land in `other`. Malformed names fail the export.

Config files share this path contract (examples from SPIRIT Config):

- Global: `radius/radius-100`, `spacing/space-700`, `border/width-100`, `grid/Columns`, `container/padding/mobile`
- Theme: `accent/01/background-basic`, `shadow/shadow-100/color-01`
- Device: `breakpoint`, `font-size-base`, `typography/body/large/font-size`
- Styles: `Shadow/shadow-100`, `Focus/focus-ring`, `Gradient/primary`, `Body/Large/Bold`

The same collection names appear in SPIRIT, PRÁCE.CZ, JOBS.CZ, CV ONLINE, and WIREFRAME Config libraries. Each brand is a separate Figma file and config. Export Config files, not the UI Kit.

## Theme

A named mode of the Theme tokens collection, for example `theme-light-default` or `theme-light-on-brand`. The first mode is the default theme. A theme is not a brand.

## Brand

One product’s token file, configured by `fileKey` plus font stacks. One brand per Figma file. Spirit is the first configured brand in this repository (`packages/design-tokens/figma-tokens.config.json`). Other Config libraries (PRÁCE.CZ, JOBS.CZ, CV ONLINE, WIREFRAME) use the same exporter with their own config and snapshot.

## Alias

A variable value that points at another variable (`VARIABLE_ALIAS`). The exporter follows the local and remote closure, records provenance, and generates only from local roots. Cycles and missing targets fail the export.

## Style

A Figma text, paint, or effect style. Typography comes from text styles, shadows from effect styles, gradients from paint styles. Grid styles are out of scope. Bindings are stored in the snapshot and evaluated per relevant theme or device mode in Node.

## Font stack

A versioned, per-brand map from a Figma font family to a CSS `font-family` list. Unmapped families fail the export.
