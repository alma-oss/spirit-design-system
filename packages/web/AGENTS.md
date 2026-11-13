# Spirit Web Agent Instructions

## Component Folder

A component lives in `src/scss/components/<Component>/`. Use `Button` as the reference:

- `_<Component>.scss` with styles and `_theme.scss` with theme tokens
- `index.scss` forwards the partials; register the component in `src/scss/components/index.scss`
- `README.md` documents the markup; keep its examples identical to the `web-react` package README
- `preview.html` holds the bare demo content, the docsite reads it directly
- `index.html` is only the layout shell that includes the preview through a Handlebars partial

Interactive components have a JS plugin in `src/js/<Component>.ts`, tested in `src/js/__tests__/`.

## Rules

- Every demo has a matching example in `packages/web-react` with the same content and markup.
- Use BEM-style classes owned by the component block (`.Component`, `.Component--modifier`, `.Component__element`).
  Do not style other components' classes.
- Before finishing, run `yarn workspace @alma-oss/spirit-web test`. It runs lint, types, and unit tests.
