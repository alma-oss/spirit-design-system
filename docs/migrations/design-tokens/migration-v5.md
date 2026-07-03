# Migration Guide

Introducing version 5 of the _spirit-design-tokens_ package.

> Please follow these steps to safely upgrade to Spirit Design System v5 design tokens.

> ℹ️ Don't forget to check the [migration guide of the _spirit-web_ package][migration-guide-web] and
> [migration guide of the _spirit-web-react_ package][migration-guide-web-react] for related component changes.

## Overview

- [Token Renames](#token-renames)
  - [Navigation Item Tokens Renamed from `header-item`](#navigation-item-tokens-renamed-from-header-item)
  - [Form Field Fill Tokens Renamed from `filled`](#form-field-fill-tokens-renamed-from-filled)
  - [Pagination Tokens Added (`component-pagination-*`)](#pagination-tokens-added-component-pagination-)

## Token Renames

### Navigation Item Tokens Renamed from `header-item`

Navigation item color tokens were renamed from `component-header-item-*` to `component-navigation-item-*`.
Header surface tokens (`component-header-background`, `component-header-border`) are unchanged.

#### Migration Guide

Update SCSS variables, CSS custom properties, and JavaScript token exports in your theme overrides:

| Before                                             | After                                                  |
| -------------------------------------------------- | ------------------------------------------------------ |
| `$component-header-item-background-state-active`   | `$component-navigation-item-background-state-active`   |
| `$component-header-item-background-state-default`  | `$component-navigation-item-background-state-default`  |
| `$component-header-item-background-state-hover`    | `$component-navigation-item-background-state-hover`    |
| `$component-header-item-background-state-selected` | `$component-navigation-item-background-state-selected` |
| `$component-header-item-state-active`              | `$component-navigation-item-state-active`              |
| `$component-header-item-state-default`             | `$component-navigation-item-state-default`             |
| `$component-header-item-state-hover`               | `$component-navigation-item-state-hover`               |
| `$component-header-item-state-selected`            | `$component-navigation-item-state-selected`            |
| `$component-header-item-stripe-state-selected`     | `$component-navigation-item-stripe-state-selected`     |
| `$component-header-item-stripe-state-unselected`   | `$component-navigation-item-stripe-state-unselected`   |

CSS custom properties follow the same pattern:

- `--spirit-color-component-header-item-*` → `--spirit-color-component-navigation-item-*`

JavaScript exports were renamed accordingly, for example:

- `componentHeaderItemStateDefault` → `componentNavigationItemStateDefault`

### Form Field Fill Tokens Renamed from `filled`

Form field fill tokens were renamed from `form-field-filled-*` to `form-field-fill-*`.
New `form-field-outline-*` tokens were added for the outline variant.

#### Migration Guide

Update SCSS variables and CSS custom properties in your theme overrides:

| Before                                        | After                                       |
| --------------------------------------------- | ------------------------------------------- |
| `$form-field-filled-background-state-active`  | `$form-field-fill-background-state-active`  |
| `$form-field-filled-background-state-default` | `$form-field-fill-background-state-default` |
| `$form-field-filled-background-state-hover`   | `$form-field-fill-background-state-hover`   |
| `$form-field-filled-border-state-active`      | `$form-field-fill-border-state-active`      |
| `$form-field-filled-border-state-default`     | `$form-field-fill-border-state-default`     |
| `$form-field-filled-border-state-hover`       | `$form-field-fill-border-state-hover`       |
| `$form-field-filled-border-state-selected`    | `$form-field-fill-border-state-selected`    |
| `$form-field-filled-content`                  | `$form-field-fill-content`                  |
| `$form-field-filled-placeholder`              | `$form-field-fill-placeholder`              |

CSS custom properties:

- `--spirit-color-form-field-filled-*` → `--spirit-color-form-field-fill-*`

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
