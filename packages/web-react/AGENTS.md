# Spirit Web React Agent Instructions

## Component Folder

A component lives in `src/components/<Component>/`. Use `Button` as the reference:

- `<Component>.tsx` with `use<Component>Props.ts` and `use<Component>StyleProps.ts` hooks
- `index.ts` exports the public API and makes the folder a package entry point
- `README.md` documents the API; keep its examples identical to the `web` package README
- `demo/` holds one file per example and `demo/preview.tsx`, which renders them in `DocsSection`s
- `stories/<Component>.stories.tsx` holds the Storybook stories
- `__tests__/` holds the unit tests (`<Component>.test.tsx`, hook tests) and `<Component>.accessibility.test.tsx`
- `index.html` (Handlebars `web-react/demo` partial) and `preview/index.ts` (re-exports `demo/preview`) register the component in the dev demo
- `docs/` holds the docsite pages
- `figma/<Component>.figma.ts` holds the Figma Code Connect mapping

## Rules

- Export a new component from `src/components/index.ts`.
  Then run `yarn workspace @alma-oss/spirit-web-react exports:regenerate` and commit the updated `exports` in `package.json`.
- Every demo has a matching example in `packages/web` with the same content and markup.
- After editing Code Connect files, run `yarn figma connect publish --dry-run` in this package. Never publish.
- Before finishing, run `yarn workspace @alma-oss/spirit-web-react test`. It runs lint, types, and unit tests.
