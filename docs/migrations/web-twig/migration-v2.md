# Migration Guide

Introducing version 2 of the _spirit-web-twig_ package

> Please follow these steps to safely upgrade your Design System to Spirit Design System v2 components.

## Remove modal body padding feature class [#DS-863](https://jira.almacareer.tech/browse/DS-863) ([ba8b949](https://github.com/alma-oss/spirit-design-system/commit/ba8b949))

Remove feature class `.spirit-v1-modal-body-padding`, if used.
No other actions are required.

## Add `spirit` infix to data attr names in components [#DS-585](https://jira.almacareer.tech/browse/DS-585) ([d1f6215](https://github.com/alma-oss/spirit-design-system/commit/d1f6215))

Add `spirit` infix to all affected APIs.

- `data-toggle="collapse"` → `data-spirit-toggle="collapse"`

You have to modify these component APIs or usages:

- Collapse
- Dropdown
- FileUploader
- Header
- Modal
- ScrollView
- Tooltip

To make everything work, you have to make these changes:

### Collapse

- `<Button data-toggle="collapse" data-target="target-id" …>`
  → `<Button data-spirit-toggle="collapse" data-spirit-target="target-id" …>`
- `<ButtonLink data-toggle="collapse" data-more …>`
  → `<ButtonLink data-spirit-toggle="collapse" data-spirit-more …>`

### Dropdown

- `<Button data-toggle="dropdown" data-target="target-id" …>`
  → `<Button data-spirit-toggle="dropdown" data-spirit-target="target-id" …>`
- `<Button data-toggle="dropdown" data-autoclose="true" …>`
  → `<Button data-spirit-toggle="dropdown" data-spirit-autoclose="true" …>`

### FileUploader

- `<FileUploader data-toggle="fileUploader" …>`
  → `<FileUploader data-spirit-toggle="fileUploader" …>`

### Header

- `<HeaderButton data-toggle="offcanvas" data-target="target-id" …>`
  → `<HeaderButton data-spirit-toggle="offcanvas" data-spirit-target="target-id" …>`

### Modal

- `<Button data-toggle="modal" data-target="target-id" …>`
  → `<Button data-spirit-toggle="modal" data-spirit-target="target-id" …>`
- `<Button data-dismiss="modal" data-target="target-id" …>`
  → `<Button data-spirit-dismiss="modal" data-spirit-target="target-id" …>`

### ScrollView

- `<ScrollView data-toggle="scrollView" …>`
  → `<ScrollView data-spirit-toggle="scrollView" …>`

### Tabs

- `<button class="Tabs__link" data-toggle="tabs" data-target="target-id" …>` → `<button class="Tabs__link" data-spirit-toggle="tabs" data-spirit-target="target-id" …>`

### Tooltip

- `<Button data-toggle="tooltip" data-target="target-id" …>` → `<Button data-spirit-toggle="tooltip" data-spirit-target="target-id" …>`

## Remove Twig `boolprop` filter and its extension [#DS-798](https://jira.almacareer.tech/browse/DS-798) ([a113bbb](https://github.com/alma-oss/spirit-design-system/commit/a113bbb))

You should rely on the default Twig types to manage your boolean props.
Eliminate the use of the `boolprop` filter and ensure that your props are correctly set where your components are used.

## Remove boolprop filter from Twig components [#DS-798](https://jira.almacareer.tech/browse/DS-798) ([3f41123](https://github.com/alma-oss/spirit-design-system/commit/3f41123))

Let Twig solve the boolean values by itself.

You should set the boolean props using boolean values.
If you used string for example, switch to boolean.

- `<Button isDisabled="false">` → `<Button isDisabled={false}>`

Type casting is generally considered an anti-pattern.
We are removing this functionality to enforce stricter type adherence.

Now, the correct type usage in all components is necessary but not yet enforced (this will require future functionality).
For instance, a string value will be interpreted strictly as a string, and vice versa.

## Remove data-toggle from TabLink component refs [#DS-840](https://jira.almacareer.tech/browse/DS-840) ([042a21c](https://github.com/alma-oss/spirit-design-system/commit/042a21c))

Use `data-spirit-toggle="tabs"` to initialize Tabs functionality (`spirit` infix is made mandatory in PR #935).

- `<TabLink …>` → `<TabLink data-spirit-toggle="tabs" …>`

The original data attribute was removed due to unwanted initialization of Tabs which was not under control of the developer.

## Remove old Modal and rename ModalComposed to Modal [#DS-616](https://jira.almacareer.tech/browse/DS-616) ([3988758](https://github.com/alma-oss/spirit-design-system/commit/3988758))

Also remove ModalFooter alignment deprecation.

1. **Discontinue the old `Modal` component:**
   The old `Modal` component has been entirely removed and is no longer available for use.

2. **Adopt the new `Modal` in place of `ModalComposed`:**
   The `ModalComposed` component has been renamed to `Modal`.
   Thus, replace all instances of `ModalComposed` in your codebase with `Modal`.

3. **Update Component Tags:**
   Make sure to modify the component tags in your codebase as outlined below:

   - `<ModalComposed …>` → `<Modal …>`
   - `<ModalComposedBody …>` → `<ModalBody …>`
   - `<ModalComposedDialog …>` → `<ModalDialog …>`
   - `<ModalComposedFooter …>` → `<ModalFooter …>`
   - `<ModalComposedHeader …>` → `<ModalHeader …>`

4. **Rename `ModalFooter` Align prop:**
   Instead of `align` use `alignmentX`.

   - `<ModalFooter align="left" …>` → `<ModalFooter alignmentX="left" …>`

## Remove `isFullWidth` and `breakpoint` props from `Dropdown` [#DS-588](https://jira.almacareer.tech/browse/DS-588) ([d3a550e](https://github.com/alma-oss/spirit-design-system/commit/d3a550e))

Also improved demo and docs.

Use `fullWidthMode` prop instead of `isFullWidth` and `breakpoint` on `Dropdown` component.

- `<Dropdown isFullWidth …>` → `<Dropdown fullWidthMode="all" …>`
- `<Dropdown isFullWidth breakpoint="mobile" …>` → `<Dropdown fullWidthMode="mobile-only" …>`

## Remove deprecated `Header` component [#DS-652](https://jira.almacareer.tech/browse/DS-652) ([db98d7e](https://github.com/alma-oss/spirit-design-system/commit/db98d7e))

The deprecated `Header` JS plugin was removed in favour of the `Offcanvas` plugin.

- `import { Header } from '@lmc-eu/spirit-web'` → `import { Offcanvas } from '@lmc-eu/spirit-web'`
- `data-toggle="header"` → `data-spirit-toggle="offcanvas"` (`spirit` infix is made mandatory in PR #935)
- `data-dismiss="header"` → `data-spirit-dismiss="offcanvas"` (`spirit` infix is made mandatory in PR #935)

## Rename `RadioField` component to `Radio` [#DS-521](https://jira.almacareer.tech/browse/DS-521) ([c0f9f82](https://github.com/alma-oss/spirit-design-system/commit/c0f9f82))

Rename and use `Radio` component instead of `RadioField`.

- `<RadioField …>` → `<Radio …>`

## Rename `CheckboxField` component to `Checkbox` [#DS-522](https://jira.almacareer.tech/browse/DS-522) ([e9f7498](https://github.com/alma-oss/spirit-design-system/commit/e9f7498))

Rename and use `Checkbox` component instead of `CheckboxField`.

- `<CheckboxField …>` → `<Checkbox …>`

## Set `Stack` default spacing to zero [#DS-741](https://jira.almacareer.tech/browse/DS-741) ([e892eab](https://github.com/alma-oss/spirit-design-system/commit/e892eab))

The feature class enabling this behavior was removed.

If you need the `Stack` to have a spacing, add `hasSpacing` prop. By default, `Stack` has zero inner spacing.

- `<Stack …>` → `<Stack hasSpacing …>`

If you already used the feature class, you can remove it and don't need to do any other changes.

## Remove `onClick` prop [#DS-686](https://jira.almacareer.tech/browse/DS-686) ([836e826](https://github.com/alma-oss/spirit-design-system/commit/836e826))

Instead of the `onClick` prop, use native `onclick` in the `Button`, `ButtonLink`, `HeaderLink`, `HeaderDialogLink` and `Link` components.

- `<Button onClick="alert('alert');" …>` → `<Button onclick="alert('alert');" …>`
- `<ButtonLink onClick="alert('alert');" …>` → `<ButtonLink onclick="alert('alert');" …>`
- `<HeaderLink onClick="alert('alert');" …>` → `<HeaderLink onclick="alert('alert');" …>`
- `<HeaderDialogLink onClick="alert('alert');" …>` → `<HeaderDialogLink onclick="alert('alert');" …>`
- `<Link onClick="alert('alert');" …>` → `<Link onclick="alert('alert');" …>`

## Remove `theme` prop and `default` color from `Tag` [#DS-648](https://jira.almacareer.tech/browse/DS-648) ([ef6bce4](https://github.com/alma-oss/spirit-design-system/commit/ef6bce4))

Instead of the `default` color, use `neutral` in the `Tag` component.

Instead of the `theme` prop, use `isSubtle` in the `Tag` component.

- `<Tag color="default" …>` → `<Tag color="neutral" …>`
- `<Tag theme="light" …>` → `<Tag isSubtle …>`
- `<Tag theme="dark" …>` → `<Tag …>` (default)

## Remove `size` prop from `Icon` in favor of `boxSize` [#DS-647](https://jira.almacareer.tech/browse/DS-647) ([8e2d319](https://github.com/alma-oss/spirit-design-system/commit/8e2d319))

Instead of the `size` prop, use `boxSize` in `Icon` component.

- `<Icon size="333" …>` → `<Icon boxSize="333" …>`

## Rename message prop to validationText in Form Fields [#DS-676](https://jira.almacareer.tech/browse/DS-676) ([8719ba3](https://github.com/alma-oss/spirit-design-system/commit/8719ba3))

- Instead of the `message` prop, use `validationText`.
- The `validationState` prop is now required when using `validationText`.
  If `validationState` is not set, `validationText` won't render.
- To show a permanent helper, use `helperText`.

### Other Notable Changes

- Introduce `ValidationText` component.
- Improve demos of related components.

- `<… validationState="danger" message="error" …>` → `<… validationState="danger" validationText="error" …>`
- `<… message="Check this field" …>` → `<… helperText="Check this field" …>`

List of affected components:

- Checkbox
- TextField
- TextArea
- TextFieldBase
- Select

## Remove `error` Validation State in favor of `danger` [#DS-677](https://jira.almacareer.tech/browse/DS-677) ([7d4077f](https://github.com/alma-oss/spirit-design-system/commit/7d4077f))

Instead of the `error` value of the validationState prop, use `danger`.
This applies to Checkbox, Radio, TextField, TextArea and TextFieldBase.

- `<TextField validationState="error" …>` → `<TextField validationState="danger" …>`

## Remove `class` prop from all components [#DS-678](https://jira.almacareer.tech/browse/DS-678) ([77e5618](https://github.com/alma-oss/spirit-design-system/commit/77e5618))

Rename `class` prop to `UNSAFE_className` on all components.

- `<Alert class="d-none" …>` → `<Alert UNSAFE_className="d-none" …>`

## Rename ScrollView `indicators` prop to `overflowDecorators` [#DS-825](https://jira.almacareer.tech/browse/DS-825) ([c753b19](https://github.com/alma-oss/spirit-design-system/commit/c753b19))

Rename `indicators` prop to `overflowDecorators` on all ScrollView component usages.

- `<ScrollView indicators="shadows" …>` → `<ScrollView overflowDecorators="shadows" …>`
- `<ScrollView indicators="borders" …>` → `<ScrollView overflowDecorators="borders" …>`
- `<ScrollView indicators="both" …>` → `<ScrollView overflowDecorators="both" …>`

---

Please refer back to this guide or reach out to our team if you encounter any issues during migration.
