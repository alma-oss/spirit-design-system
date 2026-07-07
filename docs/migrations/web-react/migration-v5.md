# Migration Guide

Introducing version 5 of the _spirit-web-react_ package.

> Please follow these steps to safely upgrade to Spirit Design System v5 components.

> ℹ️ Don't forget to check the [migration guide of the _spirit-web_ package][migration-guide-web] for general changes in
> available feature flags, CSS, and other changes that might affect your project.

## Overview

- [General Changes](#general-changes)
  - [Dropped Support for Node.js 20](#dropped-support-for-nodejs-20)
- [Component Changes](#component-changes)
  - [Alert: Deprecated Link Color Styles Removed](#alert-deprecated-link-color-styles-removed)
  - [Button and ButtonLink: `isBlock` Prop Removed](#button-and-buttonlink-isblock-prop-removed)
  - [Button, ButtonLink, and ControlButton: Icon Spacing via `spacing` Prop](#button-buttonlink-and-controlbutton-icon-spacing-via-spacing-prop)
  - [Checkbox, Radio, and Toggle: Vertical Spacing Uses Padding](#checkbox-radio-and-toggle-vertical-spacing-uses-padding)
  - [Checkbox: Composition Markup Changed](#checkbox-composition-markup-changed)
  - [Checkbox and Toggle: Emphasized Label No Longer Documented](#checkbox-and-toggle-emphasized-label-no-longer-documented)
  - [Close Buttons Unified Into `CloseButton`](#close-buttons-unified-into-closebutton)
  - [Collapse: `hideOnCollapse` Prop Removed, Use `isDisposable`](#collapse-hideoncollapse-prop-removed-use-isdisposable)
  - [ControlButton: Expanded Size Scale Feature Flag Removed](#controlbutton-expanded-size-scale-feature-flag-removed)
  - [DrawerPanel: Restructured with Sub-components](#drawerpanel-restructured-with-sub-components)
  - [Dropdown: `DropdownPopover` Now Has `role="dialog"` by Default](#dropdown-dropdownpopover-now-has-roledialog-by-default)
  - [FileUpload and File: Stabilized (FileUploader Removed)](#fileupload-and-file-stabilized-fileuploader-removed)
  - [Flex: Direction Prop Values Changed](#flex-direction-prop-values-changed)
  - [Form Components: `isFluid` Prop Removed](#form-components-isfluid-prop-removed)
  - [Header: Stabilized as `Header`](#header-stabilization-of-unstable_header-to-header-previous-implementation-removed)
  - [Item: Composable Content and Slots](#item-composable-content-and-slots)
  - [Navigation: Slots, Open State, and Removed Selected Indicator](#navigation-slots-open-state-and-removed-selected-indicator)
  - [Radio: Composition Markup Changed](#radio-composition-markup-changed)
  - [ScrollView: Arrows Renamed to Controls](#scrollview-arrows-renamed-to-controls)
  - [Stack: Wrap Direct Children in `StackItem` When Using Dividers](#stack-wrap-direct-children-in-stackitem-when-using-dividers)
  - [Success State Icons Renamed from `check-plain` to `success`](#success-state-icons-renamed-from-check-plain-to-success)
  - [Tag: Appearance Feature Flag Removed](#tag-appearance-feature-flag-removed)
  - [Tag: `ControlButton` Size Mapping Updated](#tag-controlbutton-size-mapping-updated)
  - [Toggle: Composition Markup Changed](#toggle-composition-markup-changed)
  - [ValidationText: `hasValidationStateIcon` Renamed to `validationStateIcon`](#validationtext-hasvalidationstateicon-renamed-to-validationstateicon)

## General Changes

### Dropped Support for Node.js 20

The Node.js v20 is no longer supported. The minimum required Node.js version is 22.

> ℹ️ See also the [migration guide of the _spirit-web_ package][migration-guide-web] for the same Node.js requirement.
> If you override design tokens, see the [design tokens v5 migration guide][migration-guide-design-tokens].

## Component Changes

### Alert: Deprecated Link Color Styles Removed

The deprecated automatic link color inheritance inside `Alert` has been removed. Links inside
`Alert` now use the default link color from your project styles.

#### Migration Guide

🪄 Use codemods to automatically add `color="inherit"` to `Link` components inside `Alert`:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/alert-link-color-inherit
```

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

If your project relies on links inside `Alert` matching the alert's content color, use the
`Link` component with `color="inherit"`. Add `underlined="always"` so links remain
distinguishable from surrounding text:

```tsx
// Before
<Alert color="success">
  See <a href="/faq">FAQ</a> for more info.
</Alert>

// After
<Alert color="success">
  See{' '}
  <Link href="/faq" color="inherit" underlined="always">
    FAQ
  </Link>{' '}
  for more info.
</Alert>
```

See [Alert README][readme-alert] for the full links-in-alert pattern.

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

### Button, ButtonLink, and ControlButton: Icon Spacing via `spacing` Prop

`Button`, `ButtonLink`, and `ControlButton` now set spacing between their children automatically using `column-gap`.
Remove manual margin props from child `Icon` components and use the `spacing` prop on the button when you need a non-default gap.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/button-icon-margin-removal
```

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

Remove `marginRight`, `marginLeft`, and `marginX` from `Icon` children inside buttons.
When the previous margin was not the default (`space-400`), set `spacing` on the button instead.

```tsx
// Before
<Button>
  <Icon name="hamburger" marginRight="space-600" />
  Menu
</Button>

// After
<Button spacing="space-600">
  <Icon name="hamburger" />
  Menu
</Button>
```

</details>

### Checkbox, Radio, and Toggle: Vertical Spacing Uses Padding

Non-item Checkbox, Radio, and Toggle rows previously used vertical **margin** for default row spacing (for example
`marginY="space-500"` on the component, or `my-500` on a vanilla `Flex` wrapper).

`Stack` with `hasSpacing` resets vertical margin on direct children so gap-based spacing between items stays
predictable. Margin on these rows inside a spaced Stack was therefore often removed — row spacing could disappear in
stacked lists.

Checkbox, Radio, and Toggle now apply vertical **padding** on the layout wrapper (`py-500`) instead. Padding is not
reset by Stack, so spacing stays consistent inside and outside stacked layouts.

**What to do:** Review your Checkbox, Radio, and Toggle usages and remove any `marginY="space-500"` you added
manually. For vanilla HTML/SCSS markup, replace `my-500` with `py-500` on the row wrapper. When stacking multiple
rows, use `<Stack>` **without** `hasSpacing` — the built-in padding already provides row spacing; combining
`hasSpacing` with these components adds redundant gap on top of padding. See
[Checkbox, Radio, and Toggle: Vertical Spacing Uses Padding][migration-guide-web-vertical-spacing] in the
_spirit-web_ migration guide for HTML examples.

### Checkbox: Composition Markup Changed

Checkbox now composes its layout from Spirit components and applies the `Checkbox` class directly to the input.
Built-in `py-500` padding on the non-item wrapper replaces the previous margin-based spacing — see
[Checkbox, Radio, and Toggle: Vertical Spacing Uses Padding](#checkbox-radio-and-toggle-vertical-spacing-uses-padding).

<details>
  <summary>🔧 Manual Migration Steps</summary>

Stack multiple rows with plain `Stack` — do not add `hasSpacing` (built-in padding already spaces rows):

```tsx
<Stack>
  <Checkbox id="checkbox-default" label="Checkbox Label" />
  <Checkbox id="checkbox-default-checked" label="Checkbox Label" isChecked />
</Stack>
```

</details>

### Checkbox and Toggle: Emphasized Label No Longer Documented

The "Emphasized Label" pattern — passing a `<Text emphasis="semibold">` element as the `label` prop of `Checkbox` or `Toggle` — is no longer documented.

`Label` already applies `label-medium` typography. Wrapping the label in a `Text` component with a different emphasis
overrides those styles and can cause the label text to misalign vertically relative to the input control.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Replace the `Text`-wrapped label with a plain string:

```diff
- <Checkbox
-   id="consent"
-   label={
-     <Text elementType="span" emphasis="semibold">
-       I agree to the terms and conditions
-     </Text>
-   }
-   isRequired
- />
+ <Checkbox id="consent" label="I agree to the terms and conditions" isRequired />
```

The same applies to `Toggle`:

```diff
- <Toggle
-   id="consent"
-   label={
-     <Text elementType="span" emphasis="semibold">
-       I agree to the terms and conditions
-     </Text>
-   }
-   isRequired
- />
+ <Toggle id="consent" label="I agree to the terms and conditions" isRequired />
```

Search your project for `Checkbox` and `Toggle` usages where the `label` prop
receives a `<Text>` (or any other element) with custom typography and replace them with plain strings.

</details>

### Close Buttons Unified Into `CloseButton`

The component-specific close buttons — `ModalCloseButton` and `TooltipCloseButton` — have been **removed** in
favor of the single shared [`CloseButton`][readme-close-button] component. Their prop types
(`ModalCloseButtonProps`, `TooltipCloseButtonProps`) were removed as well.

The Modal and Tooltip close buttons are rendered internally (through `ModalHeader`'s `hasCloseButton` and
`TooltipPopover`'s `isDismissible`), so most projects only need to migrate direct usages.

`DrawerCloseButton` was also removed — see [DrawerPanel: Restructured with Sub-components](#drawerpanel-restructured-with-sub-components) for the complete Drawer migration.

| Removed                    | Replacement                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| `<ModalCloseButton … />`   | `<CloseButton size="xlarge" aria-controls={id} aria-expanded={isOpen} onClick={onClose} … />` |
| `<TooltipCloseButton … />` | `<CloseButton aria-expanded="true" onClick={onClose} … />`                                    |

#### Migration Guide

🪄 Use codemods to migrate:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/close-buttons-to-close-button
```

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

**`ModalCloseButton`** — only if you used it directly; `ModalHeader` still renders it for you via `hasCloseButton`:

```diff
- <ModalCloseButton id={id} isOpen={isOpen} onClose={onClose} label="Close" />
+ <CloseButton size="xlarge" aria-controls={id} aria-expanded={isOpen} onClick={onClose} label="Close" />
```

**`TooltipCloseButton`** — only if you used it directly; `TooltipPopover` still renders it for you via
`isDismissible`:

```diff
- <TooltipCloseButton onClick={onClose} label="Close" />
+ <CloseButton aria-expanded="true" onClick={onClose} label="Close" />
```

</details>

### Collapse: `hideOnCollapse` Prop Removed, Use `isDisposable`

The `hideOnCollapse` prop was removed from `UncontrolledCollapse`. Use `isDisposable` instead.

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

### DrawerPanel: Restructured with Sub-components

`DrawerCloseButton` has been removed. The panel's interior is now structured with two explicit sub-components:

- **`DrawerPanelHeader`** — renders the top bar; place the close button (and any title) here.
- **`DrawerPanelBody`** — renders the scrollable body; accepts `hasSpacing` for built-in padding.

Additionally, `<Drawer>` now requires an `aria-label` so the underlying `<dialog>` element has an accessible name.

| Removed                       | Replacement                                                   |
| ----------------------------- | ------------------------------------------------------------- |
| `<DrawerCloseButton />`       | `<CloseButton size="large" … />` inside `<DrawerPanelHeader>` |
| `hasSpacing` on `DrawerPanel` | `hasSpacing` on `DrawerPanelBody`                             |

#### Migration Guide

🪄 Use the codemod to migrate automatically:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/drawer-panel-close-button-composition
```

ℹ️ The codemod replaces `DrawerCloseButton` with a scaffolded `CloseButton size="large"` carrying
`TODO_drawerIsOpen`, `TODO_drawerId`, and `TODO_drawerOnClose` placeholder identifiers. They are intentionally
undefined — your build fails until you replace them with the drawer's open state, `id`, and `onClose` handler.

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

```diff
- <Drawer id="my-drawer" isOpen={isOpen} onClose={handleClose}>
+ <Drawer id="my-drawer" isOpen={isOpen} onClose={handleClose} aria-label="Navigation">
    <DrawerPanel
-     closeButton={<DrawerCloseButton />}
-     hasSpacing
    >
+     <DrawerPanelHeader>
+       <CloseButton size="large" aria-expanded={isOpen} aria-controls="my-drawer" onClick={handleClose} />
+     </DrawerPanelHeader>
+     <DrawerPanelBody hasSpacing>
        {/* drawer body */}
+     </DrawerPanelBody>
    </DrawerPanel>
  </Drawer>
```

Update your imports:

```diff
- import { Drawer, DrawerCloseButton, DrawerPanel } from '@alma-oss/spirit-web-react';
+ import { CloseButton, Drawer, DrawerPanel, DrawerPanelHeader, DrawerPanelBody } from '@alma-oss/spirit-web-react';
```

</details>

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
- `linkText` → `inputUploadText`
- `labelText` → `inputDragAndDropText`

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

### Radio: Composition Markup Changed

Radio now composes its layout from Spirit components and applies the `Radio` class directly to the input.
Built-in `py-500` padding on the non-item wrapper replaces the previous margin-based spacing — see
[Checkbox, Radio, and Toggle: Vertical Spacing Uses Padding](#checkbox-radio-and-toggle-vertical-spacing-uses-padding).

<details>
  <summary>🔧 Manual Migration Steps</summary>

Stack multiple rows with plain `Stack` — do not add `hasSpacing` (built-in padding already spaces rows):

```tsx
<Stack>
  <Radio id="radio-default" label="Radio Label" />
  <Radio id="radio-default-checked" label="Radio Label" isChecked />
</Stack>
```

</details>

### ScrollView: Arrows Renamed to Controls

ScrollView scroll navigation was renamed from "arrows" to "controls" across props, subcomponents, hooks, and exported constants.

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

### Success State Icons Renamed from `check-plain` to `success`

Components that render a success validation or status icon now use the `success` icon instead of `check-plain`.
This affects `ValidationText`, `Alert`, and `Toast` when `validationState` or equivalent is `success`.
Selection indicators on `Item`, `PricingPlan`, and similar components still use `check-plain`.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Update custom icon names in success validation or status states:

```tsx
// Before
<Icon name="check-plain" />

// After (success validation/status only)
<Icon name="success" />
```

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

### Toggle: Composition Markup Changed

Toggle now composes its layout from Spirit components and applies the `Toggle` class directly to the input.
Built-in `py-500` padding on the wrapper replaces the previous margin-based spacing — see
[Checkbox, Radio, and Toggle: Vertical Spacing Uses Padding](#checkbox-radio-and-toggle-vertical-spacing-uses-padding).

<details>
  <summary>🔧 Manual Migration Steps</summary>

Stack multiple rows with plain `Stack` — do not add `hasSpacing` (built-in padding already spaces rows):

```tsx
<Stack>
  <Toggle id="toggle-default" label="Toggle Label" />
  <Toggle id="toggle-default-checked" label="Toggle Label" isChecked />
</Stack>
```

</details>

### ValidationText: `hasValidationStateIcon` Renamed to `validationStateIcon`

The `hasValidationStateIcon` prop on standalone `ValidationText` was renamed to `validationStateIcon`.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/validation-state-icon-prop
```

👉 See [Codemods documentation][readme-codemods] for more details.

<details>
  <summary>🔧 Manual Migration Steps</summary>

Rename the prop wherever you pass it directly to `ValidationText`:

```tsx
// Before
<ValidationText validationText="Saved successfully." hasValidationStateIcon="success" />

// After
<ValidationText validationText="Saved successfully." validationStateIcon="success" />
```

Form field components still expose `hasValidationIcon`; they map it to `validationStateIcon` on `ValidationText` internally.

</details>

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.

[migration-guide-design-tokens]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/design-tokens/migration-v5.md
[migration-guide-web]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/web/migration-v5.md
[migration-guide-web-vertical-spacing]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/web/migration-v5.md#checkbox-radio-and-toggle-vertical-spacing-uses-padding
[readme-alert]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Alert/README.md
[readme-close-button]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/CloseButton/README.md
[readme-codemods]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/README.md
[readme-drawer]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Drawer/README.md
[readme-file]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/File/README.md
[readme-file-upload]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/FileUpload/README.md
[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Grid/README.md
[readme-header]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Header/README.md
[readme-item]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Item/README.md
