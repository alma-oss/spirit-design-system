# Migration Guide

Introducing version 1 of the _spirit-web-react_ package

> Please follow these steps to safely upgrade your Design System to Spirit Design System v1 components.

## Remove align prop in ModalFooter ([7fbb4c1](https://github.com/alma-oss/spirit-design-system/commit/7fbb4c1))

Use `alignmentX` instead of `align` prop on ModalFooter component.

- `<ModalFooter align="right" />` → `<ModalFooter alignmentX="right" />`

## Add `spirit` infix to data-placement in Tooltip [#DS-585](https://jira.lmc.cz/browse/DS-585) ([187076b](https://github.com/alma-oss/spirit-design-system/commit/187076b))

Also added `spirit` infix to internal implementations of components where it controls CSS behavior.

If you need advanced positioning of Tooltip with Floating UI, you need to change `data-placement` prop to `data-spirit-placement`.

- `<Tooltip data-placement={placement} …>` → `<Tooltip data-spirit-placement={placement} …>`

See updated README of the Tooltip component.

## Remove `isFullWidth` and `breakpoint` props from `Dropdown` [#DS-588](https://jira.lmc.cz/browse/DS-588) ([b52103b](https://github.com/alma-oss/spirit-design-system/commit/b52103b))

Use `fullWidthMode` prop instead of `isFullWidth` and `breakpoint` on `Dropdown` component.

- `<Dropdown isFullWidth …>` → `<Dropdown fullWidthMode="all" …>`
- `<Dropdown isFullWidth breakpoint="mobile" …>` → `<Dropdown fullWidthMode="mobile-only" …>`

## Rename RadioField component to Radio [#DS-521](https://jira.lmc.cz/browse/DS-521) ([dc3066a](https://github.com/alma-oss/spirit-design-system/commit/dc3066a))

Rename and use `Radio` component instead of `RadioField`.

- `<RadioField …>` → `<Radio …>`

## Rename CheckboxField component to `Checkbox` [#DS-522](https://jira.lmc.cz/browse/DS-522) ([950b981](https://github.com/alma-oss/spirit-design-system/commit/950b981))

Rename and use `Checkbox` component instead of `CheckboxField`.

- `<CheckboxField …>` → `<Checkbox …>`

## Rename `message` prop to `validationText` in Form Fields [#DS-676](https://jira.lmc.cz/browse/DS-676) ([26b59c0](https://github.com/alma-oss/spirit-design-system/commit/26b59c0))

- Instead of the `message` prop, use `validationText`.
- The `validationState` prop is now required when using `validationText`.
  If `validationState` is not set, `validationText` won't render.
- To show a permanent helper, use `helperText`.

- `<… validationState="danger" message="error" …>` → `<… validationState="danger" validationText="error" …>`
- `<… message="Check this field" …>` → `<… helperText="Check this field" …>`

List of affected components:

- Checkbox
- TextField
- TextArea
- TextFieldBase
- Select

## Remove Header deprecations [#DS-651](https://jira.lmc.cz/browse/DS-651) ([f7e04d6](https://github.com/alma-oss/spirit-design-system/commit/f7e04d6))

Instead of `HeaderModern`, now use `Header` and its structure.

The most notable change is that the mobile and desktop navigation are now separate components that cannot be nested:

- `Header`
- `HeaderDialog`

Formerly, the desktop dialog (holding the site navigation) was a responsive CSS modification of a shared HTML code.
With the new `Header` and `HeaderDialog`, each component has its own instance of the navigation, i.e. the navigation code is duplicated.
This is because `HeaderDialog` will become an independent component in the future.

You may need to take additional measures so your SEO is not affected by the duplicate HTML code of the navigation.

The old components in `Header` can be roughly mapped onto the new subcomponents like this:

- `NavbarToggler` → `HeaderMobileOnlyActions`
- `Navbar` → removed without a replacement
- `Navbar variant="dialog"` → `HeaderDialog`, stands outside `Header`
- `NavbarClose` → removed without a replacement
- `HeaderActions` → `HeaderDesktopOnlyActions`
- `HeaderBackdrop` → removed without a replacement
- `Nav` → `HeaderNav`
- `NavItem` → `HeaderNavItem`
- `NavLink` → `HeaderLink`
- `Header__text` → removed without a replacement

## Set `Stack` default spacing to zero [#DS-741](https://jira.lmc.cz/browse/DS-741) ([774fa78](https://github.com/alma-oss/spirit-design-system/commit/774fa78))

The feature class enabling this behavior was removed.

If you need the `Stack` to have a spacing, add `hasSpacing` prop. By default, `Stack` has zero inner spacing.

- `<Stack …>` → `<Stack hasSpacing …>`

If you already used the feature class, you can remove it and don't need to do any other changes.

## Remove `theme` and `tag` props and `default` color from `Tag` [#DS-648](https://jira.lmc.cz/browse/DS-648) ([f2f26eb](https://github.com/alma-oss/spirit-design-system/commit/f2f26eb))

Instead of the `default` color, use `neutral` in the `Tag` component.

Instead of the `theme` prop, use `isSubtle` in the `Tag` component.

Instead of `tag` prop use `elementType` in `Tag` component.

- `<Tag color="default" …>` → `<Tag color="neutral" …>`
- `<Tag theme="light" …>` → `<Tag isSubtle …>`
- `<Tag theme="dark" …>` → `<Tag …>` (default)
- `<Tag tag="div" …>` → `<Tag elementType="div" …>`

## Remove `size` prop from `Icon` in favor of `boxSize` [#DS-647](https://jira.lmc.cz/browse/DS-647) ([4cf8e36](https://github.com/alma-oss/spirit-design-system/commit/4cf8e36))

Instead of the `size` prop, use `boxSize` in `Icon` component.

- `<Icon size="333" …>` → `<Icon boxSize="333" …>`

## Remove old Modal and rename ModalComposed to Modal [#DS-617](https://jira.lmc.cz/browse/DS-617) ([283ac62](https://github.com/alma-oss/spirit-design-system/commit/283ac62))

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

## Remove `error` Validation State in favor of `danger` [#DS-677](https://jira.lmc.cz/browse/DS-677) ([ad2c2fb](https://github.com/alma-oss/spirit-design-system/commit/ad2c2fb))

Instead of the `error` value of the validationState prop, use `danger`.
This applies to Checkbox, Radio, TextField, TextArea and TextFieldBase.

- `<TextField validationState="error" …>` → `<TextField validationState="danger" …>`

## Rename ScrollView `indicators` prop to `overflowDecorators` [#DS-825](https://jira.lmc.cz/browse/DS-825) ([a4237a9](https://github.com/alma-oss/spirit-design-system/commit/a4237a9))

Rename `indicators` prop to `overflowDecorators` on all ScrollView component usages.

- `<ScrollView indicators="shadows" …>` → `<ScrollView overflowDecorators="shadows" …>`
- `<ScrollView indicators="borders" …>` → `<ScrollView overflowDecorators="borders" …>`
- `<ScrollView indicators="both" …>` → `<ScrollView overflowDecorators="both" …>`

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.
