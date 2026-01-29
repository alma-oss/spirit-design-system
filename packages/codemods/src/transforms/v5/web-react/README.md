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
