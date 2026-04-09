# Migration Guide

Introducing version 5 of the _spirit-web-react_ package.

> Please follow these steps to safely upgrade to Spirit Design System v5 components.

> ℹ️ Don't forget to check the [migration guide of the _spirit-web_ package][migration-guide-web] for general changes in
> available feature flags, CSS, and other changes that might affect your project.

## Overview

- [Component Changes](#component-changes)
  - [Collapse: `hideOnCollapse` Prop Renamed to `isDisposable`](#collapse-hideoncollapse-prop-renamed-to-isdisposable)
  - [Flex: Direction Prop Values Changed](#flex-direction-prop-values-changed)
  - [Form Components: `isFluid` Prop Removed](#form-components-isfluid-prop-removed)
  - [Avatar: Component Name Stabilized](#avatar-component-name-stabilized)
  - [Slider: Component Name Stabilized](#slider-component-name-stabilized)
  - [EmptyState: Component Name Stabilized](#emptystate-component-name-stabilized)
  - [Toggle: Component Name Stabilized](#toggle-component-name-stabilized)
  - [Truncate: Component Name Stabilized and `lines` Prop Changed](#truncate-component-name-stabilized-and-lines-prop-changed)

## Component Changes

### Collapse: `hideOnCollapse` Prop Renamed to `isDisposable`

The `hideOnCollapse` prop in `UncontrolledCollapse` component was renamed to `isDisposable`.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/collapse-isDisposable-prop
```

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

Manually replace the prop in your project.

- `<UncontrolledCollapse hideOnCollapse … />` → `<UncontrolledCollapse isDisposable … />`
</details>

### Flex: Direction Prop Values Changed

The `direction` prop values in `Flex` component were changed from `row`/`column` to `horizontal`/`vertical`.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/flex-direction-values
```

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

Manually replace the prop values in your project.

- `<Flex direction="row" … />` → `<Flex direction="horizontal" … />`
- `<Flex direction="column" … />` → `<Flex direction="vertical" … />`
- `<Flex direction={{ mobile: "column", tablet: "row" }} … />` → `<Flex direction={{ mobile: 'vertical', tablet: 'horizontal' }} … />`
</details>

### Form Components: `isFluid` Prop Removed

The following form components are now fluid by default and no longer support the `isFluid` prop:

- `TextField`
- `TextArea`
- `Select`
- `Slider`
- `Toggle`
- `FieldGroup`
- `FileUploader`
- `UncontrolledFileUploader`
- `UNSTABLE_FileUpload`
- `UNSTABLE_Attachment`

Use parent layout components such as `Grid`, `Stack`, or `Container` to control width and positioning.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/forms-isFluid-prop-removal
```

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

Remove the `isFluid` prop from affected form components.

- `<TextField id="name" label="Name" isFluid />` → `<TextField id="name" label="Name" />`
- `<FileUploader id="files" isFluid … />` → `<FileUploader id="files" … />`
</details>

### Avatar: Component Name Stabilized

The `UNSTABLE_Avatar` component was stabilized and renamed to `Avatar`.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/unstable-avatar-component-name
```

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

Manually replace the component name in your project.

- `UNSTABLE_Avatar` → `Avatar`
</details>

### Slider: Component Name Stabilized

The `UNSTABLE_Slider` component was stabilized and renamed to `Slider`.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/unstable-slider-component-name
```

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

Manually replace the component name in your project.

- `UNSTABLE_Slider` → `Slider`
- `UNSTABLE_UncontrolledSlider` → `UncontrolledSlider`
</details>

### EmptyState: Component Name Stabilized

The `UNSTABLE_EmptyState` and `UNSTABLE_EmptyStateSection` components were stabilized and renamed to `EmptyState` and `EmptyStateSection`.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/unstable-emptystate-component-name
```

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

Manually replace the component names in your project.

- `UNSTABLE_EmptyState` → `EmptyState`
- `UNSTABLE_EmptyStateSection` → `EmptyStateSection`
</details>

### Toggle: Component Name Stabilized

The `UNSTABLE_Toggle` component was stabilized and renamed to `Toggle`.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/unstable-toggle-component-name
```

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

Manually replace the component name in your project.

- `UNSTABLE_Toggle` → `Toggle`
</details>

### Truncate: Component Name Stabilized and `lines` Prop Changed

The `UNSTABLE_Truncate` component was stabilized and renamed to `Truncate`. Additionally, the `lines` prop was replaced with `mode="lines"` and `limit={lines}`.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/unstable-truncate-component-name-and-lines-prop
```

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

Manually replace the component name and prop in your project.

- `UNSTABLE_Truncate` → `Truncate`
- `<Truncate lines={3} … />` → `<Truncate mode="lines" limit={3} … />`
</details>

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.

[migration-guide-web]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/web/
[readme-codemods]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/README.md
