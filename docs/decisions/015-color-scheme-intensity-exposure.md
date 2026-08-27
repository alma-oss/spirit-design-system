# Color Scheme Intensity Exposure

Date: 2026-09-03

Status: accepted

Amends: [012](012-color-schemes.md)

## Context

[Color Schemes](012-color-schemes.md) established that a `color-scheme-on-<category>-<intensity>` class pairs one
background intensity with the contrasting content intensity, and exposes that single pair as `--spirit-local-color`,
`--spirit-local-border-color`, and `--spirit-local-background-color`.

That pairing covers components whose colored region is visually flat. It does not cover components whose colored
region combines both intensities at once — a subtle surface with a basic-colored element drawn on top of it, for
example. With only the picked intensity exposed, such a component has to either nest a second color scheme class on
the inner element, or reach for the raw design tokens and re-implement the whole category matrix in its own CSS.
Both defeat the purpose of color schemes: one class per colored region, tokens resolved centrally.

Border colors already had this problem and had already been solved ad hoc — the subtle border color is exposed
regardless of the intensity picked, because the dynamic color helpers always want the subtle border so that it stands
out on a basic background.

## Decision

1. **Both intensities are always exposed.** In addition to the paired properties from
   [Color Schemes](012-color-schemes.md), every `color-scheme-on-*` class sets both intensities of the background
   and content colors as local custom properties, regardless of which intensity the class name picks:
   - `--spirit-local-background-color-basic` and `--spirit-local-background-color-subtle`
   - `--spirit-local-color-basic` and `--spirit-local-color-subtle`

   The paired properties keep the semantics they have in [Color Schemes](012-color-schemes.md):
   `--spirit-local-color` and `--spirit-local-background-color` continue to resolve to the pair implied by the
   `<intensity>` in the class name. The new properties are additive; nothing about the existing contract changes.

2. **Sass accessors mirror the custom properties.** The `tools/color-scheme` module exposes `color-basic()`,
   `color-subtle()`, `background-color-basic()`, and `background-color-subtle()` alongside the existing `color()` and
   `background-color()`, each taking an optional fallback. Component CSS reads the intensities through these rather
   than writing the custom property names by hand.

3. **Categories without a pair reuse what they have.** The `disabled` category has no background pair of its own, so
   the disabled foreground stands in for the basic background: it is the color of a filled element sitting on a
   disabled surface. It likewise has a single content color, which therefore serves as both content intensities.
   This keeps `color-scheme-on-disabled` substitutable for any other scheme class without a component having to
   special-case it.

## Consequences

### Single Class for the Whole Colored Region

A component that combines both intensities within one colored region can be colored by one scheme class on its root,
with the inner parts reading the intensity they need. No nested scheme classes, no per-category CSS in the component.

### Intensities Are Available Before They Are Consumed

The properties are emitted for every category whether or not any component reads them today. This is deliberate: the
generator has no way to know which intensities a consumer needs, and making the set conditional would reintroduce the
per-component branching that color schemes exist to remove.

### Larger Generated CSS

Each scheme class emits four more declarations. The cost is bounded — it scales with the number of categories, not
with the number of components — and is paid back as soon as it removes one component's hand-rolled color matrix.

### Substitutability Is a Constraint on New Categories

Because components may now read any intensity from any scheme class, a new category has to provide all of them. Where
tokens do not exist for one, an explicit stand-in must be chosen, as done for `disabled`. A category that silently
omits an intensity would render a component that reads it uncolored.
