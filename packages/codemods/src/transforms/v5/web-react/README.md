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

### `v5/web-react/unstable-avatar-component-name` — UNSTABLE_Avatar to Avatar Component Name

This codemod updates the `UNSTABLE_Avatar` component name to `Avatar`.
Use this codemod if you were already using the `UNSTABLE_Avatar` component.

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v5/web-react/unstable-avatar-component-name
```

#### Example

```diff
- import { UNSTABLE_Avatar } from '@lmc-eu/spirit-web-react';
+ import { Avatar } from '@lmc-eu/spirit-web-react';
…
- <UNSTABLE_Avatar … />
+ <Avatar … />
```

### `v5/web-react/unstable-slider-component-name` — UNSTABLE_Slider to Slider Component Name

This codemod updates the `UNSTABLE_Slider` component name to `Slider`.
Use this codemod if you were already using the `UNSTABLE_Slider` component.

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v5/web-react/unstable-slider-component-name
```

#### Example

```diff
- import { UNSTABLE_Slider } from '@lmc-eu/spirit-web-react';
+ import { Slider } from '@lmc-eu/spirit-web-react';
…
- <UNSTABLE_Slider … />
+ <Slider … />
```

### `v5/web-react/unstable-emptystate-component-name` — UNSTABLE_EmptyState to EmptyState Component Name

This codemod updates the `UNSTABLE_EmptyState` component name to `EmptyState` and `UNSTABLE_EmptyStateSection` subcomponent name to `EmptyStateSection`.
Use this codemod if you were already using the `UNSTABLE_EmptyState` and `UNSTABLE_EmptyStateSection` component.

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v5/web-react/unstable-emptystate-component-name
```

#### Example

```diff
- import { UNSTABLE_EmptyState } from '@lmc-eu/spirit-web-react';
+ import { EmptyState } from '@lmc-eu/spirit-web-react';
…
- <UNSTABLE_EmptyState … />
+ <EmptyState … />
```

```diff
- import { UNSTABLE_EmptyStateSection } from '@lmc-eu/spirit-web-react';
+ import { EmptyStateSection } from '@lmc-eu/spirit-web-react';
…
- <UNSTABLE_EmptyStateSection … />
+ <EmptyStateSection … />
```

### `v5/web-react/unstable-toggle-component-name` — UNSTABLE_Toggle to Toggle Component Name

This codemod updates the `UNSTABLE_Toggle` component name to `Toggle`.
Use this codemod if you were already using the `UNSTABLE_Toggle` component.

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v5/web-react/unstable-toggle-component-name
```

#### Example

```diff
- import { UNSTABLE_Toggle } from '@lmc-eu/spirit-web-react';
+ import { Toggle } from '@lmc-eu/spirit-web-react';
…
- <UNSTABLE_Toggle … />
+ <Toggle … />
```

<!--lint disable maximum-heading-length-->

### `v5/web-react/unstable-truncate-component-name-and-lines-prop` — UNSTABLE_Truncate to Truncate Component Name and `lines` Prop Change

<!--lint enable maximum-heading-length-->

This codemod updates the `UNSTABLE_Truncate` component name to `Truncate` and replaces the deprecated `lines` prop with `mode="lines"` and `limit={lines}`.
Use this codemod if you were already using the `UNSTABLE_Truncate` component.

#### Usage

```sh
npx @lmc-eu/spirit-codemods -p <path> -t v5/web-react/unstable-truncate-component-name-and-lines-prop
```

#### Example

```diff
- import { UNSTABLE_Truncate } from '@lmc-eu/spirit-web-react';
+ import { Truncate } from '@lmc-eu/spirit-web-react';
…
- <UNSTABLE_Truncate lines={3} … />
+ <Truncate mode="lines" limit={3} … />
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

### `v5/web-react/forms-isFluid-prop-removal` — Remove `isFluid` Prop From Form Components

This codemod removes the `isFluid` prop from form components that are now fluid by default.

Updated components:

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

[mdn-column-gap]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/column-gap
