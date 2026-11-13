# 4. Reuse and Duplication (All Code)

- **Existing Spirit building blocks** (important) — Do not re-implement what exists:
  `CloseButton` for remove and dismiss actions, `UncontrolledTooltip`, `useToggle`, `useButtonLinkProps`,
  `mergeProps`, `filterDOMProps`, `ContextPropsProvider`, shared string helpers. Search with
  `git grep` before accepting a new helper.
- **Exported constants over literals** (minor) — Demos, stories, `*.figma.ts`, docsite and exporters
  use exported constants (`BackgroundColors`, `EmotionColors`, `Sizes`, key and asset-type constants)
  instead of string literals. Story `options` list real values plus `undefined`.
- **Derived and shared types** (minor) — Reuse component prop types (`SpiritTileProps`) instead of
  copying; derive unions from constants; compose types bottom-up with `extends` instead of `Omit`
  from a larger type; keep types in the component's `types.ts`.
- **Fix at the source** (important) — Update the owning component instead of aliasing or patching
  it in a consumer or demo. Generic code (`Collapse`, selection utilities) knows nothing about
  specific components. Unwanted generated tokens are removed in Figma or Supernova, not only in the
  output.
- **New dependencies** (question) — A new runtime dependency is justified against existing ones
  (the repository already uses zod, cosmiconfig, sade, Jest) and the platform.
