# Migration Guide

Introducing version 5 of the _spirit-design-tokens_ package.

> Please follow these steps to safely upgrade to Spirit Design System v5 design tokens.

> ℹ️ Don't forget to also update the [migration guide of the _spirit-web_ package][migration-guide-web] and [migration guide of the _spirit-web-react_ package][migration-guide-web-react] for related component and CSS changes.

## Overview

- [General Changes](#general-changes)
  - [Dropped Support for Node.js 20](#dropped-support-for-nodejs-20)
- [Token Changes](#token-changes)
  - [Form Field: `filled` Renamed to `fill`](#form-field-filled-renamed-to-fill)
  - [Form Field: New `outline` Tokens](#form-field-new-outline-tokens)
  - [Navigation Item Tokens Moved Out of `header`](#navigation-item-tokens-moved-out-of-header)
  - [`componentColors` Group Structure](#componentcolors-group-structure)

## General Changes

### Dropped Support for Node.js 20

The Node.js v20 is no longer supported. The minimum required Node.js version is 22 for `@alma-oss/spirit-design-tokens` and all Spirit v5 packages.

## Token Changes

### Form Field: `filled` Renamed to `fill`

Form field fill-style tokens were renamed from `filled` to `fill` across JavaScript exports, SCSS variables, and CSS custom properties. This aligns with `InputContainer--fill` in the web package.

**What breaks:** Custom theming or Sass that references `formFieldFilled*`, `filled`, or `--spirit-color-form-field-filled-*`.

#### Migration Guide

Rename identifiers in your JavaScript/TypeScript theme code:

| Before                                  | After                                 |
| --------------------------------------- | ------------------------------------- |
| `formFieldFilledBackgroundStateDefault` | `formFieldFillBackgroundStateDefault` |
| `formFieldFilledBorderStateDefault`     | `formFieldFillBorderStateDefault`     |
| `formFieldFilledContent`                | `formFieldFillContent`                |
| `formFieldFilledPlaceholder`            | `formFieldFillPlaceholder`            |
| `--spirit-color-form-field-filled-*`    | `--spirit-color-form-field-fill-*`    |

In `formFieldColors`, access fill tokens via `formFieldColors.fill` instead of `formFieldColors.filled`:

```diff
- formFieldColors.filled.backgroundStateDefault
+ formFieldColors.fill.backgroundStateDefault
```

Review fill token **values** after upgrading — some theme values changed in v5, not only identifiers.

### Form Field: New `outline` Tokens

v5 adds a dedicated `outline` token group for `InputContainer--outline` fields. Use `formFieldOutline*` exports, `--spirit-color-form-field-outline-*` CSS variables, or `formFieldColors.outline` in JavaScript.

No migration is required unless you theme outline fields — then bind the new tokens instead of reusing fill values.

### Navigation Item Tokens Moved Out of `header`

Navigation item tokens were renamed from `componentHeaderItem*` to `componentNavigationItem*` and moved to a dedicated navigation token namespace.

**What breaks:** Custom theming referencing `componentHeaderItem*` or `--spirit-color-component-header-item-*`.

#### Migration Guide

| Before                                       | After                                            |
| -------------------------------------------- | ------------------------------------------------ |
| `componentHeaderItemStateDefault`            | `componentNavigationItemStateDefault`            |
| `componentHeaderItemBackgroundStateSelected` | `componentNavigationItemBackgroundStateSelected` |
| `componentHeaderItemStripeStateSelected`     | `componentNavigationItemStripeStateSelected`     |
| `--spirit-color-component-header-item-*`     | `--spirit-color-component-navigation-item-*`     |

### `componentColors` Group Structure

`componentColors.header` no longer contains navigation item tokens. Navigation item colors live under the new `componentColors.navigation` group:

```diff
- componentColors.header.itemStateDefault
+ componentColors.navigation.itemStateDefault
```

`componentColors.header` now exposes only header chrome tokens (`background`, `border`).

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.

[migration-guide-web]: ./../web/migration-v5.md
[migration-guide-web-react]: ./../web-react/migration-v5.md
