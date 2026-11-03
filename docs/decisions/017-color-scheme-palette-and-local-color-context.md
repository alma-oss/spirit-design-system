# Color Scheme Palette and Local Color Context

Date: 2026-11-12

Status: accepted

Amends: [012](012-color-schemes.md), [016](016-color-scheme-intensity-exposure.md)

👉 This is the decision record. For a practical guide to using color schemes, see [Color Schemes][color-schemes-guide].

## Context

[Color Schemes](012-color-schemes.md) and [Color Scheme Intensity Exposure](016-color-scheme-intensity-exposure.md)
let a `color-scheme-on-*` class write its colors directly into the `--spirit-local-*` CSS custom properties. The same
properties were also written by surface components, background utilities, component color overrides, and `.disabled`.

One set of properties therefore carried two different meanings: the palette picked by the scheme class, and the color
that is actually rendered right now. That broke down for interactive surfaces. When a surface changed its background
on `:hover` or `:active`, it had to either overwrite the scheme palette, or publish the state color in an extra
state-specific property that nested elements had to know about. Surfaces that do not consume a color scheme at all
(e.g. `Card`, `ModalDialog`, or a hovered `Item`) did not declare their background, so nested dynamic colors were
computed against the wrong background.

## Decision

1. **The color scheme palette is read only.** A `color-scheme-on-*` class sets `--spirit-color-scheme-*` CSS custom
   properties and nothing else. These keep the names and pairing semantics from [012](012-color-schemes.md), including
   both intensities from [016](016-color-scheme-intensity-exposure.md), e.g. `--spirit-color-scheme-color`,
   `--spirit-color-scheme-background-color`, and `--spirit-color-scheme-background-color-basic`. They never change
   during interactive states. The `tools/color-scheme` Sass module exposes getters only; its setters are private.

2. **The local color context is always the current color.** `--spirit-local-*` CSS custom properties hold the colors
   effectively rendered on an element and inherited by its subtree. Surface components and background utilities
   establish them, component color overrides and `.disabled` override them, and interactive surfaces write their
   `:hover` and `:active` backgrounds into `--spirit-local-background-color` itself. There are no state-specific local
   properties.

   The intensity variants from [016](016-color-scheme-intensity-exposure.md) remain in the local color context
   (`--spirit-local-color-basic`, `--spirit-local-background-color-subtle`, etc.). They are fixed colors of a single
   surface that shows both intensities at once, e.g. the track and the indicator of a `ProgressBar`. States (hover,
   active, and selected) are transient, so they never get a variant of their own and are always written into
   `--spirit-local-background-color`.

3. **Components set and read the local context in pairs.** A component that consumes a color scheme copies the
   palette into the local context and paints from it, so overrides on the same element win. A surface that declares
   its background in the local context paints from it as well. A local property that is declared but not painted by
   the component itself is reserved for nested elements and must be explained in the component styles. The
   `tools/local` Sass module provides the getters and setters.

## Consequences

### Nested Elements Follow the Rendered Surface

Dynamic colors and nested components such as `ControlButton` read `--spirit-local-background-color` only, so they
follow any surface underneath them, including its hover and active states, without knowing which component it is.

### Interactive Surfaces Derive States From Their Resting Color

A surface that writes its state into `--spirit-local-background-color` must not derive that state from the same
property, otherwise the custom property would depend on itself. Interactive surfaces therefore keep their resting
background in a separate source, e.g. the color scheme palette or a component custom property.

### The Local Color Context Is Internal

The `--spirit-local-*` CSS custom properties are an implementation detail of Spirit components and utilities, not a
public API. Writing the palette directly into them was a bug, because it made the local context lie about the rendered
color, so this change is a fix rather than a breaking change. Custom CSS should use the color scheme classes, the
utilities, or the read-only `--spirit-color-scheme-*` palette.

[color-schemes-guide]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/content/color-schemes.md
