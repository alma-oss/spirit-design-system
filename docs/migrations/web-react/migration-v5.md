# Migration Guide

Introducing version 5 of the _spirit-web-react_ package.

> Please follow these steps to safely upgrade to Spirit Design System v5 components.

> ℹ️ Don't forget to check the [migration guide of the _spirit-web_ package][migration-guide-web] for general changes in
> available feature flags, CSS, and other changes that might affect your project.

## Overview

- [General Changes](#general-changes)
  - [Dropped Support for Node.js 20](#dropped-support-for-nodejs-20)
- [Component Changes](#component-changes)
  - [Dropdown: `DropdownPopover` Now Has `role="dialog"` by Default](#dropdown-dropdownpopover-now-has-roledialog-by-default)
  - [Collapse: `hideOnCollapse` Prop Renamed to `isDisposable`](#collapse-hideoncollapse-prop-renamed-to-isdisposable)
  - [Checkbox: Composition Markup Changed](#checkbox-composition-markup-changed)
  - [Radio: Composition Markup Changed](#radio-composition-markup-changed)
  - [Toggle: Composition Markup Changed](#toggle-composition-markup-changed)
  - [Flex: Direction Prop Values Changed](#flex-direction-prop-values-changed)
  - [Form Components: `isFluid` Prop Removed](#form-components-isfluid-prop-removed)
  - [FileUpload and File: Stabilized (FileUploader Removed)](#fileupload-and-file-stabilized-fileuploader-removed)
  - [Button and ButtonLink: `isBlock` Prop Removed](#button-and-buttonlink-isblock-prop-removed)
  - [ScrollView: Arrows Renamed to Controls](#scrollview-arrows-renamed-to-controls)
  - [Tag: Appearance Feature Flag Removed](#tag-appearance-feature-flag-removed)
  - [Tag: `ControlButton` Size Mapping Updated](#tag-controlbutton-size-mapping-updated)
  - [Header: `UNSTABLE_Header` has been stabilized and renamed to `Header`, previous implementation has been removed](#header-stabilization-of-unstable_header-to-header-previous-implementation-removed)
  - [Item: Composable Content and Slots](#item-composable-content-and-slots)
  - [Stack: Wrap Direct Children in `StackItem` When Using Dividers](#stack-wrap-direct-children-in-stackitem-when-using-dividers)
  - [ControlButton: Expanded Size Scale Feature Flag Removed](#controlbutton-expanded-size-scale-feature-flag-removed)

## General Changes

### Dropped Support for Node.js 20

The Node.js v20 is no longer supported. The minimum required Node.js version is 22.

> ℹ️ See also the [migration guide of the _spirit-web_ package][migration-guide-web] for the same Node.js requirement.

## Component Changes

### Dropdown: `DropdownPopover` Now Has `role="dialog"` by Default

`DropdownPopover` now renders as a non-modal anchored dialog (`role="dialog"`) by default, and
`DropdownTrigger` now has `aria-haspopup="dialog"` by default. Keyboard behavior is applied
automatically:

- **Escape** closes the popover and returns focus to the trigger (from anywhere inside, including the trigger itself)
- **Tab** past the last focusable element closes the popover and returns focus to the trigger
- **Shift+Tab** before the first focusable element closes the popover and returns focus to the trigger
- When the popover opens, focus moves automatically to the first interactive element inside it

#### What You Need to Do

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

### Checkbox: Composition Markup Changed

Checkbox now composes its layout from Spirit components and applies the `Checkbox` class directly to the input.
Vertical spacing is no longer applied by default.

When Checkbox is rendered outside a `Stack` with `hasSpacing`, add `marginY="space-500"` to preserve the previous
default vertical spacing. Omit it when the row is already spaced by a parent layout such as `Stack` with `hasSpacing`.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/checkbox-margin-y
```

The codemod adds `marginY="space-500"` to Checkbox instances outside `Stack` with `hasSpacing`.
It skips checkboxes that already define `marginY`, `margin`, `marginTop`, or `marginBottom`, and item-style checkboxes
with `isItem`.

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

Add Checkbox vertical spacing when the row is not already spaced by a parent layout:

```tsx
// Before
<Checkbox id="checkbox-default" label="Checkbox Label" />

// After
<Checkbox id="checkbox-default" label="Checkbox Label" marginY="space-500" />
```

Inside `Stack` with `hasSpacing`, no extra spacing is needed:

```tsx
<Stack hasSpacing>
  <Checkbox id="checkbox-default" label="Checkbox Label" />
</Stack>
```

</details>

### Radio: Composition Markup Changed

Radio now composes its layout from Spirit components and applies the `Radio` class directly to the input.
Vertical spacing is no longer applied by default.

When Radio is rendered outside a `Stack` with `hasSpacing`, add `marginY="space-500"` to preserve the previous
default vertical spacing. Omit it when the row is already spaced by a parent layout such as `Stack` with `hasSpacing`.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/radio-margin-y
```

The codemod adds `marginY="space-500"` to Radio instances outside `Stack` with `hasSpacing`.
It skips radios that already define `marginY`, `margin`, `marginTop`, or `marginBottom`, and item-style radios
with `isItem`.

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

Add Radio vertical spacing when the row is not already spaced by a parent layout:

```tsx
// Before
<Radio id="radio-default" label="Radio Label" />

// After
<Radio id="radio-default" label="Radio Label" marginY="space-500" />
```

Inside `Stack` with `hasSpacing`, no extra spacing is needed:

```tsx
<Stack hasSpacing>
  <Radio id="radio-default" label="Radio Label" />
</Stack>
```

</details>

### Toggle: Composition Markup Changed

Toggle now composes its layout from Spirit components and applies the `Toggle` class directly to the input.
Vertical spacing is no longer applied by default.

When Toggle is rendered outside a `Stack` with `hasSpacing`, add `marginY="space-500"` to preserve the previous
default vertical spacing. Omit it when the row is already spaced by a parent layout such as `Stack` with `hasSpacing`.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/toggle-margin-y
```

The codemod adds `marginY="space-500"` to Toggle instances outside `Stack` with `hasSpacing`.
It skips toggles that already define `marginY`, `margin`, `marginTop`, or `marginBottom`.

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

Add Toggle vertical spacing when the row is not already spaced by a parent layout:

```tsx
// Before
<Toggle id="toggle-default" label="Toggle Label" />

// After
<Toggle id="toggle-default" label="Toggle Label" marginY="space-500" />
```

Inside `Stack` with `hasSpacing`, no extra spacing is needed:

```tsx
<Stack hasSpacing>
  <Toggle id="toggle-default" label="Toggle Label" />
</Stack>
```

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
- `FileUpload`
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
</details>

### FileUpload and File: Stabilized (FileUploader Removed)

`UNSTABLE_FileUpload` and `UNSTABLE_File` (including `UNSTABLE_FileImagePreview`) are now stable as `FileUpload`, `File`, and `FileImagePreview`.

The `FileUploader` compound component and its subcomponents (`FileUploaderInput`, `FileUploaderList`, `FileUploaderAttachment`, `UncontrolledFileUploader`) were removed in v5. Use `FileUpload` + `File` instead.

`FileUpload` is visual-first: queue handling, validation, and form integration are your responsibility.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/unstable-fileupload-component-name
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/unstable-file-component-name
```

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

**Stabilized component names:**

- `UNSTABLE_FileUpload` → `FileUpload`
- `UNSTABLE_File` → `File`
- `UNSTABLE_FileImagePreview` → `FileImagePreview`
- `UnstableFileUploadProps` → `FileUploadProps`
- `UnstableFileItem` → `FileItem`

**FileUploader → FileUpload / File:**

1. Replace the `FileUploader` composition with `FileUpload` for the upload input and `File` for each uploaded file row.
2. Move queue logic (`addToQueue`, `onDismiss`, duplicate checks, limits) to your application state.
3. Keep validation in your app and pass only visual validation props to `FileUpload`.

**Basic example:**

```tsx
// Before
const { fileQueue, addToQueue, clearQueue, onDismiss } = useFileQueue();

<FileUploader
  id="file-uploader"
  fileQueue={fileQueue}
  addToQueue={addToQueue}
  onDismiss={onDismiss}
  clearQueue={clearQueue}
>
  <FileUploaderInput id="file-uploader-input" name="attachments" label="Label" inputUploadText="Upload your file(s)" />
  <FileUploaderList
    id="file-uploader-list"
    inputName="attachments"
    label="Attachments"
    attachmentComponent={(props) => <FileUploaderAttachment key={props.id} {...props} />}
  />
</FileUploader>;

// After
const [items, setItems] = useState<FileItem[]>([]);

const onFilesSelected = (files: File[]) => {
  setItems((current) => [...current, ...files.map((file) => ({ id: file.name, label: file.name }))]);
};

const onDismiss = (id: string) => {
  setItems((current) => current.filter((item) => item.id !== id));
};

<Stack hasSpacing>
  <FileUpload
    id="file-upload"
    name="attachments"
    label="Label"
    inputUploadText="Upload your file(s)"
    inputDragAndDropText="or drag and drop here"
    onFilesSelected={onFilesSelected}
  />
  <Stack elementType="ul" aria-label="Uploaded files" hasSpacing>
    {items.map((item) => (
      <File key={item.id} id={item.id} label={item.label} onDismiss={() => onDismiss(item.id)} />
    ))}
  </Stack>
</Stack>;
```

For image previews, validation states, and edit actions, see the [File][readme-file] and [FileUpload][readme-file-upload] component documentation.

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

### Tag: `ControlButton` Size Mapping Updated

The recommended `ControlButton` size to use inside a `Tag` has changed to better align with the
updated size scale. The previous guidance mapped Tag sizes to larger `ControlButton` values; the new
mapping uses smaller ones:

| Tag Size | Previous `ControlButton` Size | New `ControlButton` Size |
| -------- | ----------------------------- | ------------------------ |
| xsmall   | xsmall                        | xsmall (unchanged)       |
| small    | small                         | xsmall                   |
| medium   | small                         | xsmall                   |
| large    | medium                        | small                    |
| xlarge   | medium                        | small                    |

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/tag-controlbutton-size
```

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
<summary>🔧 Manual Migration Steps</summary>

Update the `size` prop on any `ControlButton` nested inside a `Tag`:

```diff
  <Tag elementType="div" size="medium" color="selected">
    <span>Tag label</span>
-   <ControlButton size="small" isSymmetrical aria-label="Remove Tag label">…</ControlButton>
+   <ControlButton size="xsmall" isSymmetrical aria-label="Remove Tag label">…</ControlButton>
  </Tag>
  <Tag elementType="div" size="large" color="selected">
    <span>Tag label</span>
-   <ControlButton size="medium" isSymmetrical aria-label="Remove Tag label">…</ControlButton>
+   <ControlButton size="small" isSymmetrical aria-label="Remove Tag label">…</ControlButton>
  </Tag>
```

</details>

### Header: Stabilization of `UNSTABLE_Header` to `Header`, Previous Implementation Removed

`UNSTABLE_Header` and `UNSTABLE_HeaderLogo` have been stabilized and renamed to `Header` and `HeaderLogo`.
The previous `Header` component (with `HeaderNav`, `HeaderDialog`, `HeaderMobileActions`, etc.) has been **removed**.

#### Migration from `UNSTABLE_Header` to `Header`

We provide a codemod to automatically rename `UNSTABLE_Header` → `Header` and `UNSTABLE_HeaderLogo` → `HeaderLogo`
in your imports and JSX:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/header-unstable-to-stable
```

<details>
<summary>Manual Migration</summary>

**Rename imports and JSX tags:**

```diff
- import { UNSTABLE_Header, UNSTABLE_HeaderLogo } from '@alma-oss/spirit-web-react';
+ import { Header, HeaderLogo } from '@alma-oss/spirit-web-react';

- <UNSTABLE_Header hasBottomDivider>
-   <UNSTABLE_HeaderLogo href="/">Logo</UNSTABLE_HeaderLogo>
- </UNSTABLE_Header>
+ <Header hasBottomDivider>
+   <HeaderLogo href="/">Logo</HeaderLogo>
+ </Header>
```

**Rename TypeScript types:**

```diff
- import { UnstableHeaderProps, SpiritHeaderLogoProps } from '@alma-oss/spirit-web-react';
+ import { HeaderProps, SpiritHeaderLogoProps } from '@alma-oss/spirit-web-react';
```

</details>

#### Migrating from the Previous `Header`

> ⚠️ This migration must be done **manually**. No codemod is available for this step.

If you were using the previous `Header` with its sub-components (`HeaderNav`, `HeaderDialog`,
`HeaderMobileActions`, etc.), migrate to a composition using the current `Header`, `Navigation`,
and `Drawer` components.

See [Header README][readme-header] for full composition examples.

---

### Item: Composable Content and Slots

`Item` no longer accepts `label`, `helperText`, `iconName`, or `selectionDecorator` props. Compose labels,
helper text, validation text, icons, and selection indicators with `children`, `startSlot`, and `endSlot`
instead.

`Item` now renders as a `div` by default. Set `elementType="button"` or `elementType="a"` when button or
link semantics are required.

#### What Changed

| Before                                              | After                                                                |
| --------------------------------------------------- | -------------------------------------------------------------------- |
| `label` prop                                        | `children` with `Label`                                              |
| `helperText` prop                                   | `children` with `HelperText`                                         |
| `iconName` prop                                     | `startSlot={<Icon name="…" />}`                                      |
| `selectionDecorator` (`icon`, `background`, `both`) | `isSelected` plus explicit `endSlot` icon when needed                |
| Implicit `button` default                           | `div` default; set `elementType="button"` explicitly for button rows |

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/item-props
```

👉 See [Codemods documentation][readme-codemods] for more details.

The codemod adds `elementType="button"` where the old implicit button default was used, migrates `iconName`
to `startSlot`, converts `label` and `helperText` to `Label` and `HelperText` children, and replaces
`selectionDecorator` with explicit `endSlot` content where possible.

<details>
  <summary>🔧 Manual Migration Steps</summary>

**Removed props:**

- `label` → `<Label>…</Label>` in `children`
- `helperText` → `<HelperText helperText="…" />` in `children`
- `iconName` → `startSlot={<Icon name="…" />}`
- `selectionDecorator` → compose `isSelected` and `endSlot` explicitly

**`selectionDecorator` mapping:**

- omitted or `"icon"` → trailing check icon in `endSlot` when selected
- `"background"` → `isSelected` only
- `"both"` → `isSelected` plus trailing check icon in `endSlot`

```tsx
// Before
<Item label="Item" iconName="search" helperText="Helper text" isSelected />

// After
<Item
  elementType="button"
  startSlot={<Icon name="search" color="selected" />}
  endSlot={<Icon name="check-plain" color="selected" />}
  isSelected
>
  <Label>Item</Label>
  <HelperText helperText="Helper text" />
</Item>
```

```tsx
// Before
<Item label="Item" isSelected selectionDecorator="background" />

// After
<Item elementType="button" isSelected>
  <Label>Item</Label>
</Item>
```

`isDisabled` still applies the native `disabled` attribute on `elementType="button"` only. For
`elementType="a"`, `role="option"`, or other non-button roots, add `aria-disabled` explicitly.
See [Item README][readme-item] for examples.

</details>

---

### Stack: Wrap Direct Children in `StackItem` When Using Dividers

The CSS fallback that allowed arbitrary direct children (elements that are not `StackItem`) to receive divider styling has been removed.
If your `Stack` uses `hasIntermediateDividers`, `hasStartDivider`, or `hasEndDivider`, you must wrap each direct child in a `StackItem` component.

We provide a codemod to automate the wrapping:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/stack-wrap-children-in-stack-item
```

<details>
<summary>Manual Migration</summary>

**Wrap each direct child of a divider Stack in `StackItem` and add the import:**

```diff
- import { Stack } from '@alma-oss/spirit-web-react';
+ import { Stack, StackItem } from '@alma-oss/spirit-web-react';

- <Stack hasIntermediateDividers>
-   <>Item 1</>
-   <>Item 2</>
- </Stack>
+ <Stack hasIntermediateDividers>
+   <StackItem>Item 1</StackItem>
+   <StackItem>Item 2</StackItem>
+ </Stack>
```

When `Stack` has `elementType="ul"` or `elementType="ol"`, `StackItem` defaults to `elementType="li"` automatically.

</details>

---

### ControlButton: Expanded Size Scale Feature Flag Removed

The feature flag enabling the expanded size scale was removed and the expanded size scale is now default.
`ControlButton` now accepts five `size` values by default — `xsmall`, `small`, `medium`, `large`, and
`xlarge` — and the existing sizes were remapped to smaller heights:

| `size`   | Height before | Height now |
| -------- | ------------- | ---------- |
| `xsmall` | —             | 16px       |
| `small`  | 24px          | 20px       |
| `medium` | 32px          | 24px       |
| `large`  | 40px          | 32px       |
| `xlarge` | —             | 40px       |

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/control-button-size-scale
```

👉 See [Codemods documentation][readme-codemods] for more details.

⚠️ This is a **visual breaking change**, so run the codemod only if you relied on the previous heights. It
shifts every `ControlButton` `size` up by one step to keep the same rendering, so review the result and
update snapshot tests accordingly.

<details>
  <summary>🔧 Manual Migration Steps</summary>

You can now safely delete the `spirit-feature-enable-v5-control-button-expanded-size-scale` CSS class
from any wrapper elements in your project as it has no effect.

If you relied on the previous heights, shift the `size` prop up to keep the same rendering: `small` →
`medium`, `medium` → `large`, and `large` → `xlarge`. An omitted `size` (previously `medium`) becomes
`large`.

- `<ControlButton … />` → `<ControlButton size="large" … />`
- `<ControlButton size="small" … />` → `<ControlButton size="medium" … />`
- `<ControlButton size="medium" … />` → `<ControlButton size="large" … />`
- `<ControlButton size="large" … />` → `<ControlButton size="xlarge" … />`
</details>

### Navigation: Slots, Open State, and Removed Selected Indicator

`NavigationAction` now supports `startSlot`/`endSlot` props for optional content around the label. Expanded
category triggers in vertical navigation get the open visual state automatically from the
`aria-expanded="true"` attribute. The vertical selected-state indicator (the active stripe in the `box`
variant) was removed.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

- Migrate from manually appending icons in `NavigationAction` children to the `startSlot` and `endSlot` props.
- For expanded category triggers, set `aria-expanded="true"` on the action to get the open visual state.
- For second-level items, use structural nesting and keep icons on parent category actions only.
- If you relied on the vertical selected-state indicator, note that it has been removed; selection is now
communicated through the action's background and color only.
</details>

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.

[migration-guide-web]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/web/migration-v5.md
[readme-codemods]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/README.md
[readme-file]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/File/README.md
[readme-file-upload]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/FileUpload/README.md
[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Grid/README.md
[readme-header]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Header/README.md
[readme-item]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Item/README.md
