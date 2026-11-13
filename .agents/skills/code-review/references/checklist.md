# Spirit Review Checklist

What to look for in a Spirit diff. The checklist is split so a review loads only what it needs:

- **General Checks** ([`checklist/general.md`][general]) apply to every change that touches code, whatever the files.
- **Spirit sections 1–14** (`checklist/NN-*.md`) come from feedback that human reviewers raised repeatedly in past
  PRs. Load only the sections that "Area Selection" in `SKILL.md` picks for the diff.
- This file lists the sections and what tooling already enforces. Load it on every run.

Items already enforced by linters or CI are intentionally absent from the sections; see
[Already Enforced by Tooling][already-enforced].

Each item gives a **default severity** in parentheses. Findings follow the format in `methodology.md`.

## Sections

All files are in `.agents/skills/code-review/references/checklist/`.

| Section | File                                                  | Covers                                        |
| ------- | ----------------------------------------------------- | --------------------------------------------- |
| General | [`general.md`][general]                               | Correctness, security, silent failures, types |
| 1       | [`01-cross-package-parity.md`][s01]                   | `packages/web` ↔ `packages/web-react` parity  |
| 2       | [`02-breaking-changes-and-migrations.md`][s02]        | Breaking changes, migrations, deprecations    |
| 3       | [`03-component-api-and-react-implementation.md`][s03] | Component API and React implementation        |
| 4       | [`04-reuse-and-duplication.md`][s04]                  | Reuse and duplication in all code             |
| 5       | [`05-styles-and-tokens.md`][s05]                      | SCSS and design tokens                        |
| 6       | [`06-markup-and-accessibility.md`][s06]               | Markup and accessibility                      |
| 7       | [`07-tests-and-visual-snapshots.md`][s07]             | Tests and visual snapshots                    |
| 8       | [`08-demos-previews-and-stories.md`][s08]             | Demos, previews, and stories                  |
| 9       | [`09-documentation.md`][s09]                          | READMEs, `docs/`, and ADRs                    |
| 10      | [`10-docsite.md`][s10]                                | `apps/docsite`                                |
| 11      | [`11-comments-naming-and-leftovers.md`][s11]          | Comments, naming, and leftovers in all code   |
| 12      | [`12-commits-and-pr-scope.md`][s12]                   | Commits and PR scope                          |
| 13      | [`13-ci-workflows.md`][s13]                           | `.github/` workflows                          |
| 14      | [`14-agent-skills-and-instructions.md`][s14]          | `.agents/` and `AGENTS.md`                    |

## Already Enforced by Tooling

Do not report these; a linter or CI check catches them before a human looks. In PR mode, also skip
anything a failing check on the PR already reports.

| Theme raised by reviewers                                | Enforced by                                                                                  | Where                                 |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------- |
| `xlink:href` in SVG `<use>`                              | ESLint rule `spirit/no-xlink-href`                                                           | `configs/eslint-config-spirit/rules/` |
| Missing EOF newline, stray spaces                        | Prettier, EditorConfig, `lint-staged`                                                        | `lint.yaml` → `yarn format:check`     |
| Missing braces                                           | ESLint `curly`                                                                               | `@lmc-eu/eslint-config-base`          |
| Empty `catch` or block                                   | ESLint `no-empty`                                                                            | `packages/*/eslint.config.mjs`        |
| `target="_blank"` without `rel` in JSX                   | ESLint `react/jsx-no-target-blank`                                                           | `packages/*/eslint.config.mjs`        |
| `any` and `@ts-ignore` without a description             | ESLint `@typescript-eslint/no-explicit-any` (off in tests), `ban-ts-comment`                 | `packages/*/eslint.config.mjs`        |
| Commit format, scope list, issue reference               | Commitlint (`scope-enum`, `issue-reference-format`)                                          | `git.yaml`, `.husky/commit-msg`       |
| Fixup commits left before merge                          | Block-fixup-merge action                                                                     | `git.yaml`                            |
| Class naming (BEM/SUIT, `UNSTABLE_` prefix)              | Stylelint `selector-class-pattern`                                                           | `configs/stylelint-config-spirit/`    |
| `!important`, `transition: all`, IDs                     | Stylelint extras                                                                             | `@alma-oss/stylelint-config`          |
| Selector depth, compound selectors, and nesting patterns | Stylelint `selector-max-class`, `selector-max-compound-selectors`, `selector-nested-pattern` | `@alma-oss/stylelint-config`          |
| Import order, type imports, `useLayoutEffect`            | ESLint (`import/order`, `consistent-type-imports`, restricted imports)                       | `packages/*/eslint.config.mjs`        |
| Heading capitalization and terminology                   | Remark and textlint                                                                          | `docs-review.yaml`                    |
| Broken Markdown links                                    | Lychee (non-blocking)                                                                        | `docs-review.yaml`                    |
| Type errors                                              | `yarn types`                                                                                 | `lint.yaml`                           |
| Build output and generated files committed               | Build plus clean-tree check                                                                  | `build.yaml`                          |
| A visual mismatch itself                                 | Playwright e2e                                                                               | `e2e.yml`                             |

Some themes are only partly enforced and stay in the Spirit sections for the part tooling misses:
commitlint does not judge whether `feat` or `refactor` matches the intent, Playwright fails on a
mismatch but does not judge whether an updated snapshot is expected, and Stylelint does not forbid raw
`px` or hex values.

When a new lint rule or CI check lands, add its theme to this table and remove the matching checklist item.

[already-enforced]: #already-enforced-by-tooling
[general]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist/general.md
[s01]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist/01-cross-package-parity.md
[s02]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist/02-breaking-changes-and-migrations.md
[s03]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist/03-component-api-and-react-implementation.md
[s04]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist/04-reuse-and-duplication.md
[s05]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist/05-styles-and-tokens.md
[s06]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist/06-markup-and-accessibility.md
[s07]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist/07-tests-and-visual-snapshots.md
[s08]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist/08-demos-previews-and-stories.md
[s09]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist/09-documentation.md
[s10]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist/10-docsite.md
[s11]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist/11-comments-naming-and-leftovers.md
[s12]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist/12-commits-and-pr-scope.md
[s13]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist/13-ci-workflows.md
[s14]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist/14-agent-skills-and-instructions.md
