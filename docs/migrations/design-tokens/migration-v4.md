# Migration Guide

Introducing version 4 of the _spirit-design-tokens_ package.

> Please follow these steps to safely upgrade to Spirit Design System v4 design tokens.

## Overview

- [General Changes](#general-changes)
  - [Change Package npm Organization to `@alma-oss`](#change-package-npm-organization-to-alma-oss)

## General Changes

### Change Package npm Organization to `@alma-oss`

All usage of `@lmc-eu/spirit-design-tokens` should be renamed to `@alma-oss/spirit-design-tokens`.

#### Migration Guide

Update all `@forward` and `@use` directives in your SCSS files:

- `@forward '@lmc-eu/spirit-design-tokens/scss';` → `@forward '@alma-oss/spirit-design-tokens/scss';`
- `@use '@lmc-eu/spirit-design-tokens/scss';` → `@use '@alma-oss/spirit-design-tokens/scss';`
- `@use '@lmc-eu/spirit-design-tokens/scss/@tokens';` → `@use '@alma-oss/spirit-design-tokens/scss/@tokens';`
- `@use '@lmc-eu/spirit-design-tokens/scss/@themes';` → `@use '@alma-oss/spirit-design-tokens/scss/@themes';`

Update `includePaths` in your build configuration (e.g., Next.js, Webpack, Vite):

```js
// Before
includePaths: [
  path.join(pathDir, '../../node_modules'),
  path.join(pathDir, '../../node_modules/@lmc-eu/spirit-design-tokens/scss'),
],

// After
includePaths: [
  path.join(pathDir, '../../node_modules'),
  path.join(pathDir, '../../node_modules/@alma-oss/spirit-design-tokens/scss'),
],
```

Also update any other imports or references to the package:

- `@lmc-eu/spirit-design-tokens` → `@alma-oss/spirit-design-tokens`
- `@lmc-eu/spirit-design-tokens/scss/...` → `@alma-oss/spirit-design-tokens/scss/...`

> ℹ️ Don't forget to also update the [migration guide of the _spirit-web_ package][migration-guide-web] and [migration guide of the _spirit-web-react_ package][migration-guide-web-react] for related changes.

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.

[migration-guide-web]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/web/migration-v4.md
[migration-guide-web-react]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/web-react/migration-v4.md
