---
description: Code style guidelines including formatting tools and naming conventions
alwaysApply: true
---

# Code Style Guidelines

This document covers code formatting and naming conventions not enforced by linting tools.

## Formatting Tools

The following config files are the source of truth for code style. Do not hardcode formatting rules; instead, rely on these tools.

| Tool         | Config File                                            | Purpose                            |
| ------------ | ------------------------------------------------------ | ---------------------------------- |
| EditorConfig | `.editorconfig`                                        | Indentation, line endings, charset |
| Prettier     | `.prettierrc.mjs`                                      | Code formatting                    |
| ESLint       | `eslint.config.mjs` + `configs/eslint-config-spirit/`  | Linting and style rules            |
| Stylelint    | `.stylelintrc.js` + `configs/stylelint-config-spirit/` | SCSS/CSS linting                   |
| Remark       | `.remarkrc.js`                                         | Markdown linting                   |
| Commitlint   | `.commitlintrc.mjs`                                    | Commit message linting             |

Run `make format` to auto-format code before committing.

## Naming Conventions

These conventions are not enforced by linting tools:

| Type             | Convention                                                             |
| ---------------- | ---------------------------------------------------------------------- |
| React components | PascalCase (`Button.tsx`, `CardHeader.tsx`)                            |
| SCSS partials    | Underscore prefix (`_Button.scss`, `_theme.scss`)                      |
| Test files       | `.test.tsx` or `.test.ts` suffix                                       |
| Type files       | `types.ts`                                                             |
| Hook files       | `useComponentName.ts` or `useComponentStyleProps.ts` pattern           |
| CSS classes      | BEM/SUIT (`.Component`, `.Component--modifier`, `.Component__element`) |

## Verification

Before committing, verify code passes all checks:

```bash
make format     # Auto-format code
make test       # Run linting, type checking, and tests
```
