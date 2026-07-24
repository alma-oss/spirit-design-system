---
title: Migration to v4
sourceUrl: https://spirit.supernova-docs.io/latest/migrations/web-react/migration-to-v4-tRDhfgZK-tRDhfgZK
sourcePath: /latest/migrations/web-react/migration-to-v4-tRDhfgZK-tRDhfgZK
sourceSection: migrations
lastExtractedAt: 2026-04-22T22:32:38.231Z
---

# Migration Guide

Introducing version 4 of the _spirit-web-react_ package.

> Please follow these steps to safely upgrade to Spirit Design System v4 components.

> ℹ️ Don't forget to check the [migration guide of the _spirit-web_ package](https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/web/) for general changes in available feature flags, CSS, and other changes that might affect your project.

## Overview

- [General Changes](#general-changes)
  - [Dropped Support for Node.js 18](#dropped-support-for-nodejs-18)
  - [Change Package npm Organization to @alma-oss](#change-package-npm-organization-to-alma-oss)

## General Changes

### Dropped Support for Node.js 18

The Node.js v18 is no longer supported. The minimum required Node.js version is 20.

### Dropped Support for React.js 17

The React.js v17 is no longer supported. The minimum required React.js version is 18.

### Change Package npm Organization to @alma-oss

All usage of @lmc-eu/spirit-web-react should be renamed to @alma-oss/spirit-web-react.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh


                                                npx @alma-oss/spirit-codemods -p <path> -t v4/web-react/package-scope-change
```

👉 See [Codemods documentation](https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/README.md) for more details.

🔧 Manual Migration Steps

Manually replace the package name in all import statements in your project.

- @lmc-eu/spirit-web-react → @alma-oss/spirit-web-react
- @lmc-eu/spirit-web-react/components/... → @alma-oss/spirit-web-react/components/...
- @lmc-eu/spirit-web-react/src → @alma-oss/spirit-web-react/src

> ℹ️ Don't forget to also update the [migration guide of the _spirit-design-tokens_ package](https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/design-tokens/migration-v4.md) for related changes.

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.
