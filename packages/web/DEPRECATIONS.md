# Deprecations List

This document lists all deprecations that will be removed in the next major version of the _spirit-web_ package.

> Please follow the migration guides to safely upgrade your design system components.

## Deprecations

👉 [What are deprecations?][readme-deprecations]

### Label Without a Size Modifier

The implicit `medium` typography applied by a bare `.Label` class is deprecated and will be removed in the next major
version. Add an explicit `Label--medium` modifier, or another size modifier, to every Label.

#### Migration Guide

- `<label class="Label">Label</label>` → `<label class="Label Label--medium">Label</label>`

[readme-deprecations]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/README.md#deprecations
