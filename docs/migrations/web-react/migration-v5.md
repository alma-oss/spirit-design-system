# Migration Guide

Introducing version 5 of the _spirit-web-react_ package.

> Please follow these steps to safely upgrade to Spirit Design System v5 components.

> ℹ️ Don't forget to check the [migration guide of the _spirit-web_ package][migration-guide-web] for general changes in
> available feature flags, CSS, and other changes that might affect your project.

## Overview

- [Component Changes](#component-changes)
  - [Dropdown: `DropdownPopover` Now Has `role="dialog"` by Default](#dropdown-dropdownpopover-now-has-roledialog-by-default)
  - [Collapse: `hideOnCollapse` Prop Renamed to `isDisposable`](#collapse-hideoncollapse-prop-renamed-to-isdisposable)
  - [Flex: Direction Prop Values Changed](#flex-direction-prop-values-changed)
  - [Form Components: `isFluid` Prop Removed](#form-components-isfluid-prop-removed)
  - [Button and ButtonLink: `isBlock` Prop Removed](#button-and-buttonlink-isblock-prop-removed)
  - [ScrollView: Arrows Renamed to Controls](#scrollview-arrows-renamed-to-controls)
  - [Tag: Appearance Feature Flag Removed](#tag-appearance-feature-flag-removed)

## Component Changes

### Dropdown: `DropdownPopover` Now Has `role="dialog"` by Default

`DropdownPopover` now renders as a non-modal anchored dialog (`role="dialog"`) by default, and
`DropdownTrigger` now has `aria-haspopup="dialog"` by default. Keyboard behavior is applied
automatically:

- **Escape** closes the popover and returns focus to the trigger (from anywhere inside, including the trigger itself)
- **Tab** past the last focusable element closes the popover and returns focus to the trigger
- **Shift+Tab** before the first focusable element closes the popover and returns focus to the trigger
- When the popover opens, focus moves automatically to the first interactive element inside it

#### What you need to do

1. **Add an accessible name** to every `DropdownPopover` via `aria-label` or `aria-labelledby`.
   ARIA dialogs are required to have an accessible name:

   ```tsx
   <DropdownPopover aria-label="Options">…</DropdownPopover>
   ```

2. **Update snapshot tests** — the rendered HTML now includes `role="dialog"` on the popover and
   `aria-haspopup="dialog"` on the trigger.

3. If you were manually setting `role="dialog"` on `DropdownPopover` (e.g. as a feature-flag workaround),
   you can now remove that explicit prop.

4. If you need to **opt out** of the dialog role for a specific popover (e.g. a navigation menu), override
   both the popover role and the trigger's `aria-haspopup` to keep them consistent:

   ```tsx
   <Dropdown …>
     <DropdownTrigger aria-haspopup="menu" elementType="button">Trigger</DropdownTrigger>
     <DropdownPopover role="menu">…</DropdownPopover>
   </Dropdown>
   ```

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
- `UNSTABLE_Picker`
- `UNSTABLE_UncontrolledPicker`

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

### Button and ButtonLink: `isBlock` Prop Removed

The deprecated `isBlock` prop has been removed from `Button` and `ButtonLink` components.

To achieve full-width buttons, use CSS utility classes or the `Grid` component instead.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Remove the `isBlock` prop and use layout to achieve a full-width button instead.

Responsive on all breakpoints:

```tsx
// Before
<Button isBlock>Full-width Button</Button>

// After
<div className="d-grid">
  <Button>Full-width Button</Button>
</div>
```

Full-width on mobile only:

```tsx
// Before
<Button isBlock>Full-width on mobile</Button>

// After
<div className="d-grid d-tablet-block">
  <Button>Full-width on mobile</Button>
</div>
```

Responsive full-width with [`Grid`][readme-grid]:

```tsx
// Before
<Button isBlock>Responsive Button</Button>

// After
<Grid cols={{ mobile: 1, tablet: 2 }}>
  <Button>Responsive Button</Button>
</Grid>
```

</details>

### ScrollView: Arrows Renamed to Controls

ScrollView scroll navigation was renamed from “arrows” to “controls” across props, subcomponents, hooks, and exported constants.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/scrollview-arrows-to-controls
```

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

Manually replace the props, component names, hooks, and constants in your project.

**ScrollView props:**

- `<ScrollView hasArrows … />` → `<ScrollView hasControls … />`
- `<ScrollView arrowsScrollStep={200} … />` → `<ScrollView controlsScrollStep={200} … />`
- `<ScrollView ariaLabelArrows={…} … />` → `<ScrollView ariaLabelControls={…} … />`

**ScrollViewControls subcomponent (formerly `ScrollViewArrows`):**

- `ScrollViewArrows` → `ScrollViewControls`
- `<ScrollViewArrows ariaLabelArrows={…} … />` → `<ScrollViewControls ariaLabelControls={…} … />`

**Hooks and types:**

- `useScrollViewArrows` → `useScrollViewControls`
- `{ arrows }` return value → `{ controls }`
- `ScrollViewArrowsAriaLabelType` → `ScrollViewControlsAriaLabelType`
- `ScrollViewArrowsScrollStepType` → `ScrollViewControlsScrollStepType`
- `SpiritScrollViewArrowsProps` → `SpiritScrollViewControlsProps`
- `UseScrollViewArrowsReturn` → `UseScrollViewControlsReturn`

**Constants:**

- `SCROLL_VIEW_ARROWS_LABEL_*` → `SCROLL_VIEW_CONTROLS_LABEL_*`

**Style props from `useScrollViewStyleProps`:**

- `classProps.arrows` → `classProps.controls`

</details>

### Tag: Appearance Feature Flag Removed

The feature flag enabling the new `Tag` appearance was removed and the new appearance
(`inline-flex` layout with explicit height and inside spacing) is now default.

#### Migration Guide

You can now safely delete the `spirit-feature-enable-v5-tag-appearance` CSS class from any wrapper
elements in your project as it has no effect.

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.

[migration-guide-web]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/web/
[readme-codemods]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/README.md
[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Grid/README.md
