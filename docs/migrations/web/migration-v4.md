# Migration Guide

Introducing version 4 of the _spirit-web_ package.

> Please follow these steps to safely upgrade to Spirit Design System v4 components.

## Overview

- [General Changes](#general-changes)
  - [Dropped Support for Node.js 18](#dropped-support-for-nodejs-18)
  - [Change Package npm Organization to `@alma-oss`](#change-package-npm-organization-to-alma-oss)

## General Changes

### Dropped Support for Node.js 18

The Node.js v18 is no longer supported. The minimum required Node.js version is 20.

### Change Package npm Organization to `@alma-oss`

All usage of `@lmc-eu/spirit-web` should be renamed to `@alma-oss/spirit-web`.

#### Migration Guide

Update all `@forward` and `@use` directives in your SCSS files:

- `@forward '@lmc-eu/spirit-web/src/scss';` → `@forward '@alma-oss/spirit-web/src/scss';`
- `@forward '@lmc-eu/spirit-web/scss';` → `@forward '@alma-oss/spirit-web/scss';`
- `@use '@lmc-eu/spirit-web/src/scss';` → `@use '@alma-oss/spirit-web/src/scss';`
- `@use '@lmc-eu/spirit-web/scss';` → `@use '@alma-oss/spirit-web/scss';`

Also update any other imports or references to the package:

- `@lmc-eu/spirit-web` → `@alma-oss/spirit-web`
- `@lmc-eu/spirit-web/src/...` → `@alma-oss/spirit-web/src/...`

> ℹ️ Don't forget to also update the [migration guide of the _spirit-design-tokens_ package][migration-guide-design-tokens] for related changes.

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.

[migration-guide-design-tokens]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/design-tokens/migration-v4.md
