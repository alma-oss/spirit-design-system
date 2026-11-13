# Spirit Codemods Agent Instructions

## Codemod Folder

A codemod lives in `src/transforms/<version>/<package>/`, for example `src/transforms/v6/web-react/`:

- `<component>-<purpose>.ts` is the transform, named in kebab case (`component-strings-prop.ts`)
- `__testfixtures__/` holds `<name>.input.tsx` and `<name>.output.tsx` pairs, one pair per scenario
- `__tests__/<name>.test.ts` calls `testTransform(__dirname, '<name>')` for the default fixture pair
  and `testTransform(__dirname, '<name>', options, '<fixture-name>')` for each additional scenario
- `README.md` in the package folder documents every codemod with its `npx @alma-oss/spirit-codemods` command

## Rules

- Use the `spirit:breaking-change-checklist` skill to decide whether a breaking change needs a codemod, or when the issue or user asks for one.
- Add a fixture pair for each option or scenario, such as `<name>.import-sources.input.tsx` for a custom option.
- Before finishing, run `yarn workspace @alma-oss/spirit-codemods test`. It runs lint, unit tests, and types.
- More detail is in [Contributing][contributing].

[contributing]: CONTRIBUTING.md
