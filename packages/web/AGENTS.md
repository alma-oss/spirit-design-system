# Spirit Web Agent Instructions

## Component Folder

A component lives in `src/scss/components/<Component>/`. Use `Button` as the reference:

- `_<Component>.scss` with styles
- `_theme.scss` with theme tokens
- `_tools.scss` with the component's mixins, loaded through `@use 'tools'`
- `index.scss` forwards the partials; register the component in `src/scss/components/index.scss`
- `README.md` documents the markup; keep its examples identical to the `web-react` package README
- `preview.html` holds the bare demo content, the docsite reads it directly
- `index.html` is only the layout shell that includes the preview through a Handlebars partial

Do not add new JS plugins. Interactivity for live examples goes into a demo script next to the component,
for example `UNSTABLE_Combobox/combobox-demo.mjs`.

## Rules

- Every demo has a matching example in `packages/web-react` with the same content and markup.
- Use BEM-style classes owned by the component block (`.Component`, `.Component--modifier`, `.Component__element`).
- Never style other components' classes. If affecting another component's visual is absolutely needed,
  do it via CSS custom properties.
- Before finishing, run `yarn workspace @alma-oss/spirit-web test`. It runs lint, types, and unit tests.
