# 8. Demos, Previews, and Stories

- **Spirit composition in demos** (minor) — Demos and README examples use `Stack`, `Flex`, `Grid`,
  `Box`, `Container`, and their spacing props instead of raw `div`/`span`, margin utilities,
  `UNSAFE_style`, or nested `DocsStack`.
- **Omit default values** (minor) — Demos, READMEs, stories, and tests do not pass props equal to the
  default; examples showcase non-default values. Usually "Applies to the whole PR".
- **Static coverage** (important) — Every new variant, state, or composition has a static demo in
  `preview.html` / `demo/` so visual tests cover it (dynamic-only examples slip through), including
  non-default themes where relevant.
- **Accurate titles** (minor) — Demo titles, filenames, and README headings describe what is shown.
- **Stories** (minor) — Stories let the playground show new props and slots (a boolean proxy arg is
  fine for a `ReactNode` slot) and drop "experimental" naming after stabilization. Report only when
  a feature cannot be shown at all.
- **Leftover utilities** (minor) — No stray utility classes (`d-inline-block`) or wrappers in
  `preview.html`.
- **Content** (minor) — Demo copy is in English; percentages follow the existing typography
  (`60 %` with a space).
