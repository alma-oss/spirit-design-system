# `web-react` v5 Codemods

This is a collection of codemods for updating Web-React v5 components.

You can find instructions on how to run these codemods in the main package [README](https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/README.md).

## Included Scripts

### `v5/web-react/collapse-isDisposable-prop` — UncontrolledCollapse `hideOnCollapse` to `isDisposable` Prop Change

This codemod updates the `UncontrolledCollapse` component by replacing the `hideOnCollapse` prop with a new `isDisposable` prop.

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v5/web-react/collapse-isDisposable-prop
```

#### Example

```diff
- <UncontrolledCollapse hideOnCollapse … />
+ <UncontrolledCollapse isDisposable … />
```

### `v5/web-react/checkbox-margin-y` — Add Checkbox Vertical Spacing Outside Stack

This codemod adds `marginY="space-500"` to `Checkbox` components that are not rendered inside `Stack` with `hasSpacing`.
It skips checkboxes that already define `marginY`, `margin`, `marginTop`, or `marginBottom`, and item-style checkboxes with `isItem`.
This preserves the previous default vertical spacing after Checkbox stopped applying it internally.

#### Usage

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/checkbox-margin-y
```

#### Example

```diff
- <Checkbox id="checkbox-default" label="Checkbox Label" />
+ <Checkbox id="checkbox-default" label="Checkbox Label" marginY="space-500" />
```

### `v5/web-react/radio-margin-y` — Add Radio Vertical Spacing Outside Stack

This codemod adds `marginY="space-500"` to `Radio` components that are not rendered inside `Stack` with `hasSpacing`.
It skips radios that already define `marginY`, `margin`, `marginTop`, or `marginBottom`, and item-style radios with `isItem`.
This preserves the previous default vertical spacing after Radio stopped applying it internally.

#### Usage

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/radio-margin-y
```

#### Example

```diff
- <Radio id="radio-default" label="Radio Label" />
+ <Radio id="radio-default" label="Radio Label" marginY="space-500" />
```

### `v5/web-react/flex-direction-values` - Replace Flex Direction Prop Values `row` with `horizontal` and `column` with `vertical`

This codemod updates `direction` values of `Flex` component by replacing `row` to `horizontal` and `column` to `vertical`.

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v5/web-react/flex-direction-values
```

#### Example

```diff
- <Flex direction="row" … />
- <Flex direction="column" … />
- <Flex direction={{ mobile: "column", tablet: "row" }} … />
+ <Flex direction="horizontal" … />
+ <Flex direction="vertical" … />
+ <Flex direction={{ mobile: 'vertical', tablet: 'horizontal' }} … />
```

### `v5/web-react/button-icon-margin-removal` — Remove Margin Props From Icons Inside Button, ButtonLink, and ControlButton

This codemod removes the `marginRight`, `marginLeft`, and `marginX` props from `Icon` components that are children of `Button`, `ButtonLink`, or `ControlButton` components. This is necessary because these components now automatically provide spacing between their children using [`column-gap`][mdn-column-gap], so manual spacing is no longer needed.

If the margin value used is not equal to the default spacing (`space-400`), the codemod will automatically set the `spacing` prop on the button component to preserve the original spacing behavior.

ℹ️ This codemod only updates margin-related props (`marginRight`, `marginLeft`, `marginX`) applied directly to children `Icon` components. If you are applying spacing or margins via other means (for example offset the text, not the icon), you will need to review and update those cases manually, as this codemod will not cover them.

#### Usage

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/button-icon-margin-removal
```

#### Example

When margin value is the default (`space-400`), it's simply removed:

```diff
- <Button>
-   <Icon name="hamburger" marginRight="space-400" />
+ <Button>
+   <Icon name="hamburger" />
   Menu
 </Button>
```

When margin value is different from the default, the `spacing` prop is set on the button:

```diff
- <Button>
-   <Icon name="hamburger" marginRight="space-600" />
+ <Button spacing="space-600">
+   <Icon name="hamburger" />
   Menu
 </Button>
```

Responsive margin values are also converted:

```diff
- <ButtonLink href="#">
-   <Icon name="link" marginRight={{ mobile: 'space-400', tablet: 'space-600' }} />
+ <ButtonLink href="#" spacing={{ mobile: 'space-400', tablet: 'space-600' }}>
+   <Icon name="link" />
   Link
 </ButtonLink>
```

Note: If all values in a responsive object are `space-400`, the spacing prop is not set (default behavior).

### `v5/web-react/scrollview-arrows-to-controls` — ScrollView Arrows Renamed to Controls

This codemod updates ScrollView-related props, subcomponents, hooks, types, and constants after the arrows-to-controls rename.

#### Usage

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/scrollview-arrows-to-controls
```

#### Example

```diff
- import { ScrollView, ScrollViewArrows, useScrollViewArrows } from '@alma-oss/spirit-web-react';
+ import { ScrollView, ScrollViewControls, useScrollViewControls } from '@alma-oss/spirit-web-react';
…
- const { arrows } = useScrollViewArrows(true);
+ const { controls } = useScrollViewControls(true);
…
- <ScrollView hasArrows arrowsScrollStep={200} ariaLabelArrows={labels} … />
+ <ScrollView hasControls controlsScrollStep={200} ariaLabelControls={labels} … />
…
- <ScrollViewArrows ariaLabelArrows={labels} … />
+ <ScrollViewControls ariaLabelControls={labels} … />
```

### `v5/web-react/item-props` — Update Item Props to the New Composable API

This codemod updates `Item` usage for the new composable API.
It adds `elementType="button"` where the old implicit button default was used, migrates `iconName` to `startSlot`, converts `label` and `helperText` props to `Label` and `HelperText` children, and replaces selected icon behavior from `selectionDecorator` with explicit `endSlot` content where possible.
When migrating a selected item with `iconName`, it also sets the generated start icon to `color="selected"` unless the item is disabled; dynamic disabled expressions generate a conditional `color` prop.

#### Usage

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/item-props
```

#### Example

```diff
- <Item label="Item label" iconName="search" isSelected />
+ <Item elementType="button" startSlot={<Icon name="search" color="selected" />} endSlot={<Icon name="check-plain" />} isSelected>
+   <Label elementType="span">Item label</Label>
+ </Item>
```

### `v5/web-react/forms-isFluid-prop-removal` — Remove `isFluid` Prop From Form Components

This codemod removes the `isFluid` prop from form components that are now fluid by default.

Updated components:

- `FieldGroup`
- `FileUploader`
- `Select`
- `Slider`
- `TextArea`
- `TextField`
- `Toggle`
- `UncontrolledFileUploader`
- `UNSTABLE_FileUpload`
- `UNSTABLE_Picker`
- `UNSTABLE_UncontrolledPicker`

The codemod intentionally does not touch non-form components such as `Container`, `PartnerLogo`, and `SegmentedControl`.

#### Usage

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/forms-isFluid-prop-removal
```

#### Example

```diff
- <TextField id="name" label="Name" isFluid />
+ <TextField id="name" label="Name" />
```

### `v5/web-react/header-unstable-to-stable` — Rename `UNSTABLE_Header` to `Header` and `UNSTABLE_HeaderLogo` to `HeaderLogo`

This codemod renames `UNSTABLE_Header` and `UNSTABLE_HeaderLogo` to their stable names `Header` and `HeaderLogo`.
It also updates type identifiers (`UnstableHeaderProps` → `HeaderProps`) and the hook (`useUnstableHeaderStyleProps` → `useHeaderStyleProps`).

#### Usage

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/header-unstable-to-stable
```

#### Example

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

### `v5/web-react/stack-wrap-children-in-stack-item` — Wrap `Stack` Children in `StackItem` When Using Dividers

This codemod wraps direct children of `Stack` components that use dividers (`hasIntermediateDividers`, `hasStartDivider`, `hasEndDivider`) in a `StackItem` component.
JSX fragments are replaced with `StackItem`; other JSX elements are wrapped inside `StackItem`.
If `StackItem` is not already imported, it is added to the existing `@alma-oss/spirit-web-react` import.

> **Note:** Expression-container children (e.g. `{condition && <Item />}`, `{/* comments */}`) are intentionally not transformed and may require manual adjustment.

ℹ️ This codemod handles JSX-level transformations. If you use the `Stack` HTML class directly (vanilla CSS), update your markup manually — see the [migration guide][migration-guide-web-v5-stack].

#### Usage

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/stack-wrap-children-in-stack-item
```

#### Example

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

### `v5/web-react/control-button-size-scale` — Shift `ControlButton` `size` Values Up by One Step

This codemod remaps the `size` prop of the `ControlButton` component to keep the previous rendered heights after the expanded size scale became the default: `small` → `medium`, `medium` → `large`, and `large` → `xlarge`. The `xsmall` and `xlarge` values are left untouched.

Because the previous default `size` was `medium`, a `ControlButton` with no `size` prop is given an explicit `size="large"` so it keeps its original height.

⚠️ Run this codemod **only if you relied on the previous `ControlButton` heights**. It is a visual change and shifts every `ControlButton` `size` up by one step regardless of intent, so review the result afterwards.

ℹ️ A `ControlButton` that uses a JSX spread (e.g. `<ControlButton {...props} />`) is skipped, since the spread might already provide a `size`. Review those cases manually. The same applies if you set the `size` through a `PropsProvider` context instead of the prop directly.

#### Usage

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/control-button-size-scale
```

#### Example

```diff
- <ControlButton … />
- <ControlButton size="small" … />
- <ControlButton size="medium" … />
- <ControlButton size="large" … />
- <ControlButton size={{ mobile: "small", tablet: "large" }} … />
+ <ControlButton size="large" … />
+ <ControlButton size="medium" … />
+ <ControlButton size="large" … />
+ <ControlButton size="xlarge" … />
+ <ControlButton size={{ mobile: 'medium', tablet: 'xlarge' }} … />
```

### `v5/web-react/unstable-fileupload-component-name` — Stabilize `UNSTABLE_FileUpload` to `FileUpload`

This codemod renames `UNSTABLE_FileUpload` imports and JSX tags to `FileUpload`, updates related type names, and renames `linkText` → `inputUploadText` and `labelText` → `inputDragAndDropText` on `FileUpload` JSX props.

#### Usage

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/unstable-fileupload-component-name
```

#### Example

```diff
- import { UNSTABLE_FileUpload, type UnstableFileUploadProps } from '@alma-oss/spirit-web-react';
+ import { FileUpload, type FileUploadProps } from '@alma-oss/spirit-web-react';
…
- <UNSTABLE_FileUpload id="upload" name="attachments" linkText="Upload your file(s)" labelText="or drag and drop here" … />
+ <FileUpload id="upload" name="attachments" inputUploadText="Upload your file(s)" inputDragAndDropText="or drag and drop here" … />
```

### `v5/web-react/unstable-file-component-name` — Stabilize `UNSTABLE_File` to `File`

This codemod renames `UNSTABLE_File` and `UNSTABLE_FileImagePreview` imports and JSX tags to `File` and `FileImagePreview`, and updates related type names.

#### Usage

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/unstable-file-component-name
```

#### Example

```diff
- import { UNSTABLE_File, UNSTABLE_FileImagePreview, type UnstableFileItem } from '@alma-oss/spirit-web-react';
+ import { File, FileImagePreview, type FileItem } from '@alma-oss/spirit-web-react';
…
- <UNSTABLE_File id="file-1" label="file.pdf" … />
+ <File id="file-1" label="file.pdf" … />
```

[mdn-column-gap]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/column-gap
[migration-guide-web-v5-stack]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/web/migration-v5.md#stack-wrap-direct-children-in-stackitem-when-using-dividers
