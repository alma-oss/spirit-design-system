# `web-react` v2 Codemods

This is a collection of codemods for updating Web-React v2 components.

You can find instructions on how to run these codemods in the main package [README](https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/README.md).

## Included Scripts

### `v2/web-react/dropdown-tooltip-flow-placement` — Dropdown & Tooltip Flow Placements

This codemod updates the placement props in `Dropdown` and `Tooltip` components.
It transforms removed non-flow-related placements to their flow-related counterparts.

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v2/web-react/dropdown-tooltip-flow-placement
```

#### Example

```diff
- <Tooltip placement="top-left" … />
+ <Tooltip placement="top-start" … />
```

### `v2/web-react/dropdownmodern-component-name` — DropdownModern to Dropdown Component Name

This codemod updates the `DropdownModern` component name to `Dropdown`.
Use this codemod if you were already using the `DropdownModern` component.

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v2/web-react/dropdownmodern-component-name
```

#### Example

```diff
- import { DropdownModern } from '@lmc-eu/spirit-web-react';
+ import { Dropdown } from '@lmc-eu/spirit-web-react';
…
- <DropdownModern … />
+ <Dropdown … />
```

### `v2/web-react/fileuploader-prop-names` — FileUploader Prop Names

This codemod updates these renamed prop names in the `FileUploader` component:

- buttonLabel → removeText
- editButtonLabel → editText

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v2/web-react/fileuploader-prop-names
```

#### Example

```diff
- <FileUploader buttonLabel="Upload" editButtonLabel="Edit" … />
+ <FileUploader removeText="Upload" editText="Edit" … />
```

### `v2/web-react/grid-breakpoint-props` — Grid Breakpoint Props

This codemod transforms `tablet` and `desktop` `Grid` props to
object passed to the `cols` prop. Because the `tablet` and `desktop`
props have been removed.

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v2/web-react/grid-breakpoint-props
```

#### Example

```diff
- <Grid tablet={6} desktop={4} … />
+ <Grid cols={{ tablet: 6, desktop: 4 }} … />
```

### `v2/web-react/grid-gridspan` — GridSpan to GridItem

This codemod transforms `GridSpan` components to `GridItem` components,
because the `GridSpan` component has been removed.

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v2/web-react/grid-gridspan
```

#### Example

```diff
- <GridSpan over={4} … />
+ <GridItem columnStart={5} columnEnd="span 4" … />
```

### `v2/web-react/header-headerdesktopactions-isatend` — HeaderDesktopActions `isAtEnd` Prop

This codemod sets the `isAtEnd` prop instead of the removed `color="secondary"` prop.
Also it removes the `color="primary"` prop from the `HeaderDesktopActions` component
because it is not needed anymore.

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v2/web-react/header-headerdesktopactions-isatend
```

#### Example

```diff
- <HeaderDesktopActions color="secondary" … />
+ <HeaderDesktopActions isAtEnd … />

- <HeaderDesktopActions color="primary" … />
+ <HeaderDesktopActions … />
```

### `v2/web-react/modal-custom-height` — Modal Custom Height

This codemod updates the `ModalDialog` component to use the `height` and
`maxHeight` props instead of the removed `preferredHeightOnMobile`,
`preferredHeightFromTabletUp` and `maxHeightFromTabletUp` props.

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v2/web-react/modal-custom-height
```

#### Example

```diff
- <ModalDialog preferredHeightOnMobile="300px" preferredHeightFromTabletUp="400px" maxHeightFromTabletUp="500px" … />
+ <ModalDialog height={{ mobile: "300px", tablet: "400px" }} maxHeight={{ tablet: "500px" }} … />
```

### `v2/web-react/modal-isdockedonmobile-prop` — Modal `isDockedOnMobile` Prop

This codemod adds the `isDockedOnMobile` prop to the `ModalDialog` component,
if it is missing. The purpose of this is to maintain the same behaviour as
before the `ModalDialog` was made uniform across all breakpoints.

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v2/web-react/modal-isdockedonmobile-prop
```

#### Example

```diff
- <ModalDialog … />
+ <ModalDialog isDockedOnMobile … />
```

### `v2/web-react/modal-isscrollable-prop` — Modal `isScrollable` Prop

This codemod adds the `isScrollable` prop to the `ModalDialog` component,
if it is missing. The purpose of this is to maintain the same behaviour as
before the `ModalDialog` was made non-scrollable by default.

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v2/web-react/modal-isscrollable-prop
```

#### Example

```diff
- <ModalDialog … />
+ <ModalDialog isScrollable … />
```

### `v2/web-react/tabs-tabitem-tabpane-props` — TabItem and TabPane Props

This codemod updates the `TabItem` and `TabPane` components to use the
`forTabPane` and `id` props instead of the renamed `forTab` and `tabId` props

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v2/web-react/tabs-tabitem-tabpane-props
```

#### Example

```diff
- <TabItem forTab="tab1" … />
+ <TabItem forTabPane="tab1" … />

- <TabPane tabId="tab1" … />
+ <TabPane id="tab1" … />
```

### `v2/web-react/tooltipmodern-component-name` — TooltipModern to Tooltip Component Name

This codemod updates the `TooltipModern` component name to `Tooltip`.
Use this codemod if you were already using the `TooltipModern` component.

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v2/web-react/tooltipmodern-component-name
```

#### Example

```diff
- import { TooltipModern } from '@lmc-eu/spirit-web-react';
+ import { Tooltip } from '@lmc-eu/spirit-web-react';

- <TooltipModern … />
+ <Tooltip … />
```
