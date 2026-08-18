# Device Component Radius Tokens

Date: 2026-08-18

Status: accepted

## Context

Product design systems sometimes need a component radius that differs from Spirit's default radius. Button and form fields
already consume size-specific radius tokens from the devices collection, but their existing Sass generator emits responsive
custom properties for every configured size. Applying that pattern to every rounded component would generate unused CSS when
a product does not define component radius tokens.

Some components also accept a radius from their composition. For example, Picker supplies a Tag radius and SplitButton
supplies individual Button corner radii. A component token must not prevent those instance and composition overrides.

## Decision

- Optional component radius tokens belong to the devices collection:
  - `device/{component}/radius` for every size;
  - `device/{component}/{size}/radius` for one size.
- Every token slot must define all device modes.
- Precedence: size-specific slot, then component-level slot, then the component's Spirit default.
- The web package emits responsive CSS only for slots that exist.

## Consequences

The web package discovers these tokens during Sass compilation. The responsive cascade is emitted on the selector that owns
the slot, so a missing size slot cannot invalidate another size's fallback.

Components keep public or composition custom properties for instance overrides and a component-scoped local custom property
for the resolved device-token value. The local property follows `--spirit-local-{component}-border-radius`; breakpoint
source properties such as `--spirit-{component}-border-radius-mobile` remain separate. The effective radius resolves in this
order:

1. individual corner override;
2. instance or composition override;
3. size-specific device token;
4. component-level device token;
5. Spirit default.

Only a component's primary surface participates. Internal parts, decorative shapes, and composition seams require a separate
token-model decision if customization is needed later. `CardMedia` inherits the Card radius so unboxed cards round their
media. `FileUploadInput__dropZone` consumes the medium form-field radius so the drop zone follows other inputs.
`Skeleton` consumes `device/skeleton/radius` for text, heading, and shape surfaces; `--spirit-skeleton-shape-radius`
remains the instance override for shapes.

Products can add Device Component Radius Tokens without changing Spirit's component APIs. Components without those tokens
receive no related CSS; Button and Form Field radius CSS is always generated because their slots ship with Spirit.

Button and form fields use the same optional generator as other components, while preserving their existing default token
values and public custom-property names.

The token prefix can differ from the CSS class that owns the radius. For example, `device/form-field/*` is consumed by
`InputContainer` and `FileUploadInput__dropZone`, while `device/dropdown/radius` is consumed by `DropdownPopover`.

The devices collection must provide all breakpoint modes for a slot. Partial slots fail Sass compilation instead of creating
an ambiguous fallback cascade.
