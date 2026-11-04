# 1. Cross-Package Parity (`packages/web` ↔ `packages/web-react`)

Spirit ships every component twice. A per-file reading cannot see drift, so check the pair.

- **Mirrored change** (important) — A new or changed React prop has the matching class, modifier, or
  `data-*` attribute in `packages/web`, and vice versa. Behavior matches for the same input (for
  example, arrow-key navigation that clamps in one and wraps in the other).
- **Classes React adds by default** (important) — Web markup in READMEs and demos includes what React
  renders implicitly (size modifiers such as `Item--medium`, `text-color-scheme`, `cursor-pointer`,
  `Icon` class with `aria-hidden="true"`).
- **README sync** (important) — Both package READMEs describe the same API and sections. A section
  added to one belongs in the other unless it is package-specific.
- **Demo sync** (important) — A demo added to one package exists in the other, or is excluded from
  visual comparison with the `hide-from-visual-tests` class. The e2e compare tests otherwise fail or
  silently miss it.
- **Sibling components** (minor) — A change to one member of a family (Text, Heading, EyebrowText;
  Checkbox, Radio, Toggle; HelperText, ValidationText) is applied to the siblings or the PR says why not.
