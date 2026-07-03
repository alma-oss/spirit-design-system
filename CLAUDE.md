# Spirit Design System - AI Instructions

This file provides AI assistants with context and guidelines for working with this codebase.

## Quick Links

- [Main Readme][readme]
- [Contributing Guide][contributing]
- [Git Workflow Guidelines][agents-git-workflow] – branch naming, commit messages, and PRs
- [Code Style Guidelines][agents-code-style] – formatting tools and naming conventions

## Project Overview

Spirit Design System is an open-source design system developed by Alma Career (formerly LMC). It's a comprehensive monorepo containing React components, vanilla JS/CSS implementations, design tokens, icons, and tooling.

## Working with the Codebase

- This project is using `yarn` as the package manager.
  Use `yarn` commands for installing dependencies, running scripts, and managing packages. Do not use `npm` or `pnpm`.
- This project uses **Yarn Catalogs** for centralized dependency version management.
  Never use `yarn add <package>` directly — it bypasses the catalog system. Instead:
  1. Add the version to the appropriate catalog in `.yarnrc.yml` under the `catalogs:` section.
  2. Reference it in `package.json` as `"<package>": "catalog:<catalog-name>"`.
  3. Run `yarn install`.
- When starting working with the codebase, refer to the
  [Getting Started section of the Development Guide][development-guide-getting-started] for base tooling
  and repository management.
  Always use these tools for working with packages and gaining insights into the project structure and dependencies.
- When verifying your changes, refer to the [Common Tasks section of the Development Guide][development-guide-common-tasks]
  for running tests and linters. Always run the appropriate tests and linters before finishing your work.

## Breaking Changes

Every breaking change must have:

1. An entry (TOC + section) in both `docs/migrations/web/migration-v5.md` and `docs/migrations/web-react/migration-v5.md`.
2. A codemod at `packages/codemods/src/transforms/v5/web-react/<name>.ts` with `__testfixtures__/<name>.input.tsx`, `<name>.output.tsx`, and `__tests__/<name>.test.ts`.

### Migration Guides

- Only document stable → stable migrations. Never include intermediate unreleased API states (e.g., a prop that existed only between two unreleased BC changes).
- After squashing multiple BC changes into one section, verify that every item in the "Removed" table actually existed in a stable release.

### Codemods

- Generate output fixtures with `npx jscodeshift --dry --print -t <transform> <input>` — never hand-write them.
  jscodeshift's exact whitespace, blank lines between top-level declarations, and import ordering must match the fixture; any deviation causes the test to fail.

## Additional Resources

For comprehensive guidelines, see:

- `docs/contribution/` - Development and contribution guides
- `docs/decisions/` - Architecture decision records

[agents-code-style]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/instructions/code-style.md
[agents-git-workflow]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/instructions/git-workflow.md
[contributing]: https://github.com/alma-oss/spirit-design-system/blob/main/CONTRIBUTING.md
[development-guide-getting-started]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/contribution/development.md#getting-started
[development-guide-common-tasks]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/contribution/development.md#common-tasks
[readme]: https://github.com/alma-oss/spirit-design-system/blob/main/README.md
