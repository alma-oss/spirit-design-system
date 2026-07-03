# Migration Guide

Introducing version 5 of the _spirit-design-tokens_ package.

> Please follow these steps to safely upgrade to Spirit Design System v5 design tokens.

> ℹ️ Don't forget to check the [migration guide of the _spirit-web_ package][migration-guide-web] and
> [migration guide of the _spirit-web-react_ package][migration-guide-web-react] for related component changes.

## Overview

- [Token Renames](#token-renames)
  - [Pagination Tokens Added (`component-pagination-*`)](#pagination-tokens-added-component-pagination-)

## Token Renames

### Pagination Tokens Added (`component-pagination-*`)

Pagination page number items now use dedicated `component-pagination-*` design tokens instead of
reusing `component-button-*` tokens. The selected item switched from primary button tokens to
`component-pagination-selected-*` tokens.

If you were overriding Pagination appearance via CSS custom properties, update those overrides to
use the new token names.

#### Migration Guide

| State                           | Before                                                    | After                                                          |
| ------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------- |
| Unselected — content            | `--spirit-color-component-button-secondary-content`       | `--spirit-color-component-pagination-unselected-content`       |
| Unselected — border             | `--spirit-color-component-button-secondary-border`        | `--spirit-color-component-pagination-unselected-border`        |
| Unselected default — background | `--spirit-color-component-button-secondary-state-default` | `--spirit-color-component-pagination-unselected-state-default` |
| Unselected hover — background   | `--spirit-color-component-button-secondary-state-hover`   | `--spirit-color-component-pagination-unselected-state-hover`   |
| Unselected active — background  | `--spirit-color-component-button-secondary-state-active`  | `--spirit-color-component-pagination-unselected-state-active`  |
| Selected — content              | `--spirit-color-component-button-primary-content`         | `--spirit-color-component-pagination-selected-content`         |
| Selected — border               | `--spirit-color-component-button-primary-border`          | `--spirit-color-component-pagination-selected-border`          |
| Selected — background           | `--spirit-color-component-button-primary-state-default`   | `--spirit-color-component-pagination-selected-state-default`   |

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.

[migration-guide-web]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/web/migration-v5.md
[migration-guide-web-react]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/web-react/migration-v5.md
