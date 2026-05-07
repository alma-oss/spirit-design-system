# Migration Guide

Introducing version 5 of the _spirit-web_ package.

> Please follow these steps to safely upgrade to Spirit Design System v5 components.

## Overview

- [Component Changes](#component-changes)
  - [Flex: Direction Modifier Classes Changed](#flex-direction-modifier-classes-changed)
  - [Tag: Appearance Feature Flag Removed](#tag-appearance-feature-flag-removed)

## Component Changes

### Flex: Direction Modifier Classes Changed

The `Flex--row` and `Flex--column` CSS modifier classes were removed. Use `Flex--horizontal` and `Flex--vertical` instead.

#### Migration Guide

Manually replace the modifier classes in your project.

- `Flex--row` → `Flex--horizontal`
- `Flex--column` → `Flex--vertical`
- `Flex--{breakpoint}--row` → `Flex--{breakpoint}--horizontal`
- `Flex--{breakpoint}--column` → `Flex--{breakpoint}--vertical`

### Tag: Appearance Feature Flag Removed

The feature flag enabling the new `Tag` appearance was removed and the new appearance
(`inline-flex` layout with explicit height and inside spacing) is now default.

#### Migration Guide

You can now safely delete the Sass variable `$enable-v5-tag-appearance` and the CSS class
`spirit-feature-enable-v5-tag-appearance` from your project as they have no effect.

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.
