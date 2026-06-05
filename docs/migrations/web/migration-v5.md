# Migration Guide

Introducing version 5 of the _spirit-web_ package.

> Please follow these steps to safely upgrade to Spirit Design System v5 components.

## Overview

- [Component Changes](#component-changes)
  - [Button: `Button--block` Modifier Removed](#button-button--block-modifier-removed)
  - [Flex: Direction Modifier Classes Changed](#flex-direction-modifier-classes-changed)
  - [Stack: Modifier Classes Without `has` Prefix](#stack-modifier-classes-without-has-prefix)
  - [Tag: Appearance Feature Flag Removed](#tag-appearance-feature-flag-removed)

## Component Changes

### Button: `Button--block` Modifier Removed

The deprecated `Button--block` CSS modifier has been removed.

To achieve full-width buttons, use CSS utility classes or the [`Grid`][readme-grid] component instead.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Remove the `Button--block` modifier class and use layout to achieve a full-width button instead.

Responsive on all breakpoints:

```html
<!-- Before -->
<button type="button" class="Button Button--primary Button--medium Button--block">Full-width Button</button>

<!-- After -->
<div class="d-grid">
  <button type="button" class="Button Button--primary Button--medium">Full-width Button</button>
</div>
```

Full-width on mobile only:

```html
<!-- Before -->
<button type="button" class="Button Button--primary Button--medium Button--block">Full-width Button</button>

<!-- After -->
<div class="d-grid d-tablet-block">
  <button type="button" class="Button Button--primary Button--medium">Full-width Button</button>
</div>
```

Responsive full-width with [`Grid`][readme-grid]:

```html
<!-- Before -->
<button type="button" class="Button Button--primary Button--medium Button--block">Responsive Button</button>

<!-- After -->
<div class="Grid Grid--cols-1 Grid--tablet--cols-2">
  <button type="button" class="Button Button--primary Button--medium">Responsive Button</button>
</div>
```

</details>

### Flex: Direction Modifier Classes Changed

The `Flex--row` and `Flex--column` CSS modifier classes were removed. Use `Flex--horizontal` and `Flex--vertical` instead.

#### Migration Guide

Manually replace the modifier classes in your project.

- `Flex--row` → `Flex--horizontal`
- `Flex--column` → `Flex--vertical`
- `Flex--{breakpoint}--row` → `Flex--{breakpoint}--horizontal`
- `Flex--{breakpoint}--column` → `Flex--{breakpoint}--vertical`

### Stack: Modifier Classes Without `has` Prefix

Stack CSS modifier classes no longer use the `has` verb prefix, consistent with other Spirit modifiers.

#### Migration Guide

Manually replace the modifier classes in your project.

- `Stack--hasSpacing` → `Stack--spacing`
- `Stack--hasIntermediateDividers` → `Stack--intermediateDividers`
- `Stack--hasStartDivider` → `Stack--startDivider`
- `Stack--hasEndDivider` → `Stack--endDivider`

```html
<!-- Before -->
<ul class="Stack Stack--hasSpacing Stack--hasIntermediateDividers Stack--hasStartDivider Stack--hasEndDivider">
  <li class="StackItem">Item 1</li>
  <li class="StackItem">Item 2</li>
</ul>

<!-- After -->
<ul class="Stack Stack--spacing Stack--intermediateDividers Stack--startDivider Stack--endDivider">
  <li class="StackItem">Item 1</li>
  <li class="StackItem">Item 2</li>
</ul>
```

### Tag: Appearance Feature Flag Removed

The feature flag enabling the new `Tag` appearance was removed and the new appearance
(`inline-flex` layout with explicit height and inside spacing) is now default.

#### Migration Guide

You can now safely delete the Sass variable `$enable-v5-tag-appearance` and the CSS class
`spirit-feature-enable-v5-tag-appearance` from your project as they have no effect.

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.

[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Grid/README.md
