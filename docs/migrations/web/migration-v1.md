# Migration Guide

Introducing version 1 of the _spirit-web_ package

> Please follow these steps to safely upgrade your Design System to Spirit Design System v1 components.

## Remove modal body padding feature class [#DS-863](https://jira.lmc.cz/browse/DS-863) ([6d5a1d1](https://github.com/alma-oss/spirit-design-system/commit/6d5a1d1))

Remove feature class `.spirit-v1-modal-body-padding`, if used.
No other actions are required.

## Add `spirit` infix to data attr names for components and JS plugins [#DS-585](https://jira.lmc.cz/browse/DS-585) ([790ffb4](https://github.com/alma-oss/spirit-design-system/commit/790ffb4))

Add `spirit` to all data-api attributes of affected components.

- `data-toggle="collapse"` → `data-spirit-toggle="collapse"`

List of affected components:

- Accordion
- Collapse
- Dropdown
- FileUploader
- Header
- Modal
- ScrollView
- Tabs
- TextArea
- TextField
- Tooltip

List of affected JS plugins:

- Collapse
- Dropdown
- FileUploader
- Header
- Modal
- Offcanvas
- Tabs
- Tooltip

To make everything work, you have to make these changes:

### Accordion

- `<section class="Accordion" data-toggle="accordion" …>` → `<section class="Accordion" data-spirit-toggle="accordion" …>`
- `<button class="Accordion__itemToggle" data-toggle="collapse" data-target="target-id" …>` → `<button class="Accordion__itemToggle" data-spirit-toggle="collapse" data-spirit-target="target-id" …>`

### Collapse

- `<button data-toggle="collapse" data-target="target-id" …>` → `<button data-spirit-toggle="collapse" data-spirit-target="target-id" …>`
- `<div id="target-id" class="Collapse" data-parent="#parent-id" …>` → `<div id="target-id" class="Collapse" data-spirit-parent="#parent-id" …>`
- `<div class="Collapse" data-breakpoint="tablet" …>` → `<div class="Collapse" data-spirit-breakpoint="tablet" …>`
- `<a data-toggle="collapse" data-more …>` → `<a data-spirit-toggle="collapse" data-spirit-more …>`

### Dropdown

- `<button data-toggle="dropdown" data-target="target-id" …>` → `<button data-spirit-toggle="dropdown" data-spirit-target="target-id" …>`
- `<button data-toggle="dropdown" data-autoclose="true" …>` → `<button data-spirit-toggle="dropdown" data-spirit-autoclose="true" …>`
- `<div class="Dropdown" data-breakpoint="tablet" …>` → `<div class="Collapse" data-spirit-breakpoint="tablet" …>`

### FileUploader

- `<div class="FileUploader" data-toggle="fileUploader" …>` → `<div class="FileUploader" data-spirit-toggle="fileUploader" …>`
- `<div class="FileUploaderInput" data-file-queue-limit="2" …>` → `<div class="FileUploaderInput" data-spirit-file-queue-limit="2" …>`

### Header

- `<button data-toggle="offcanvas" data-target="target-id" …>` → `<button data-spirit-toggle="offcanvas" data-spirit-target="target-id" …>`
- `<button class="HeaderDialogCloseButton" data-dismiss="offcanvas" data-target="target-id" …>` → `<button class="HeaderDialogCloseButton" data-spirit-dismiss="offcanvas" data-spirit-target="target-id" …>`

### Modal

- `<button data-toggle="modal" data-target="target-id" …>` → `<button data-spirit-toggle="modal" data-spirit-target="target-id" …>`
- `<button data-dismiss="modal" data-target="target-id" …>` → `<button data-spirit-dismiss="modal" data-spirit-target="target-id" …>`

### ScrollView

- `<div class="ScrollView" data-toggle="scrollView" …>` → `<div class="ScrollView" data-spirit-toggle="scrollView" …>`

### Tabs

- `<button class="Tabs__link" data-toggle="tabs" data-target="target-id" …>` → `<button class="Tabs__link" data-spirit-toggle="tabs" data-spirit-target="target-id" …>`

### TextArea

- `<div class="TextArea" data-toggle="autoResize" …>` → `<div class="TextArea" data-spirit-toggle="autoResize" …>`

### TextField

- `<button class="TextField__passwordToggle__button" data-toggle="password" …>` → `<button class="TextField__passwordToggle__button" data-spirit-toggle="password" …>`

### Tooltip

- `<button data-toggle="tooltip" data-target="target-id" …>` → `<button data-spirit-toggle="tooltip" data-spirit-target="target-id" …>`
- `<button class="Tooltip__close" data-dismiss="tooltip" data-target="target-id" …>` → `<button class="Tooltip__close" data-spirit-dismiss="tooltip" data-spirit-target="target-id" …>`
- `<div class="Tooltip" data-placement="top" …>` → `<div class="Tooltip" data-spirit-placement="top" …>`

## Remove `fullWidth` and `data-breakpoint` modifiers from `Dropdown` [#DS-588](https://jira.lmc.cz/browse/DS-588) ([8c46f4e](https://github.com/alma-oss/spirit-design-system/commit/8c46f4e))

Use `data-spirit-fullwidthmode` instead of `Dropdown--fullWidth` and `data-breakpoint` on `Dropdown` component (`spirit` infix is made mandatory in PR #935).

- `<div class="Dropdown Dropdown--fullWidth" …>` → `<div class="Dropdown" data-spirit-fullwidthmode="all" …>` (`spirit` infix is made mandatory in PR #935)
- `<div class="Dropdown Dropdown--fullWidth" data-breakpoint="mobile" …>` → `<div class="Dropdown" data-spirit-fullwidthmode="mobile-only" …>` (`spirit` infix is made mandatory in PR #935)

## Add underline to hover and active states to default links [#DS-650](https://jira.lmc.cz/browse/DS-650) ([0debd43](https://github.com/alma-oss/spirit-design-system/commit/0debd43))

Remove the feature class which enabled this behavior.

Remove feature class `.spirit-v1-links-underlined`, if used.
No other actions are required. However, if you didn't use the feature class, you might want to check if the links in your product design system components behave as expected in both hover and active states, because they are now underlined.

## Update `TextField` and `TextArea` default disabled style [#DS-649](https://jira.lmc.cz/browse/DS-649) ([a7bb986](https://github.com/alma-oss/spirit-design-system/commit/a7bb986))

Remove the feature class which enabled this behavior.

Remove feature class `.spirit-v1-box-field-disabled`, if used.

## Remove deprecated `Header` component [#DS-653](https://jira.lmc.cz/browse/DS-653) ([de76626](https://github.com/alma-oss/spirit-design-system/commit/de76626))

### HTML and CSS

The original `Header__*` classes no longer exist, and so does the original structure.

Instead, new subcomponents replace the original nested classes.

The most notable change is that the mobile and desktop navigation are now separate components that cannot be nested:

- `Header`
- `HeaderDialog`

Formerly, the desktop dialog (holding the site navigation) was a responsive CSS modification of a shared HTML code.
With the new `Header` and `HeaderDialog`, each component has its own instance of the navigation, i.e. the navigation code is duplicated.
This is because `HeaderDialog` will become an independent component in the future.

You may need to take additional measures so your SEO is not affected by the duplicate HTML code of the navigation.

While there are important changes also in the HTML structure, the old class names in `Header` can be roughly mapped onto the new subcomponents like this:

- `Header__mobileOnlyActions` → `HeaderMobileOnlyActions`
- `Header__bar` → removed without a replacement
- `Header__content` → removed without a replacement
- `Header__dialog` → `HeaderDialog`, stands outside of `Header`
- `Header__close` → removed without a replacement
- `Header__actions` → `HeaderDesktopOnlyActions`
- `Header__nav` → `HeaderNav`
- `Header__navItem` → `HeaderNavItem`
- `Header__link` → `HeaderLink`
- `Header__text` → removed without a replacement

Inside `HeaderDialog`:

- `Header__close` → `HeaderDialogCloseButton`
- `Header__actions` → `HeaderDialogActions`
- `Header__nav` → `HeaderDialogNav`
- `Header__navItem` → `HeaderDialogNavItem`
- `Header__link` → `HeaderDialogLink`
- `Header__text` → `HeaderDialogText`

### JavaScript

The deprecated `Header` JS plugin was removed in favour of the `Offcanvas` plugin.

- `import { Header } from '@lmc-eu/spirit-web'` → `import { Offcanvas } from '@lmc-eu/spirit-web'`
- `data-toggle="header"` → `data-spirit-toggle="offcanvas"` (`spirit` infix is made mandatory in PR #935)
- `data-dismiss="header"` → `data-spirit-dismiss="offcanvas"` (`spirit` infix is made mandatory in PR #935)

## Rename `RadioField` to `Radio` [#DS-521](https://jira.lmc.cz/browse/DS-521) ([f7f4778](https://github.com/alma-oss/spirit-design-system/commit/f7f4778))

Rename and use `Radio` instead of `RadioField`.

- `<div class="RadioField" …>` → `<div class="Radio" …>`
- `.RadioField__*` → `.Radio__*`

## Rename `CheckboxField` to `Checkbox` [#DS-522](https://jira.lmc.cz/browse/DS-522) ([e88afdf](https://github.com/alma-oss/spirit-design-system/commit/e88afdf))

Rename and use `Checkbox` instead of `CheckboxField`.

- `<div class="CheckboxField" …>` → `<div class="Checkbox" …>`
- `.CheckboxField__*` → `.Checkbox__*`

## Set `Stack` default spacing to zero [#DS-741](https://jira.lmc.cz/browse/DS-741) ([95656aa](https://github.com/alma-oss/spirit-design-system/commit/95656aa))

Remove the feature class which enabled this behavior.

If you need the `Stack` to have a spacing, add `hasSpacing` class. By default, `Stack` has zero inner spacing.

- `<ul class="Stack" …>` → `<ul class="Stack Stack--hasSpacing" …>`

If you already used the feature class, you can remove it and don't need to do any other changes.

## Remove `default` (now `neutral`) and `light` (`subtle`) `Tag` variants [#DS-648](https://jira.lmc.cz/browse/DS-648) ([f272c54](https://github.com/alma-oss/spirit-design-system/commit/f272c54))

Instead of the `default` color, use `neutral` in the `Tag` component.

Instead of the `light` variant, use `subtle` in the `Tag` component.

- `<span class="Tag Tag--default" …>` → `<span class="Tag Tag--neutral" …>`
- `<span class="Tag Tag--light" …>` → `<span class="Tag Tag--subtle" …>`

## Rename `validator_message` to `validation_text` [#DS-838](https://jira.lmc.cz/browse/DS-838) ([7e8ac4f](https://github.com/alma-oss/spirit-design-system/commit/7e8ac4f))

Instead of the `validator_message` value of the `data-spirit-element` attribute, use `validation_text`.

- `<div data-spirit-element="validator_message">…</div>` → `<div data-spirit-element="validation_text">…</div>`

## Composed Modal became Modal [#DS-592](https://jira.lmc.cz/browse/DS-592) ([ae346e7](https://github.com/alma-oss/spirit-design-system/commit/ae346e7))

Instead of combining both `Modal Modal--composed` classes, only `Modal` is now used.
The original `Modal__content`, `Modal__dialog` and `Modal__header` classes no longer exist, and so does the original structure.

- `Modal Modal--composed` → `Modal`
- `Modal__content` → `ModalBody`
- `Modal__dialog` → `ModalDialog`
- `Modal__header` → `ModalHeader`
- `Modal__footer` → `ModalFooter`

## Rename `message` to `validationText` in Form Fields [#DS-676](https://jira.lmc.cz/browse/DS-676) ([92bff2e](https://github.com/alma-oss/spirit-design-system/commit/92bff2e))

Instead of the `Component__message` class, use `Component__validationText`.
This applies to Checkbox, TextArea, and TextField components.

- `<span class="Checkbox__message" …>` → `<span class="Checkbox__validationText" …>`
- `<div class="TextField__message" …>` → `<div class="TextField__validationText" …>`
- `<div class="TextArea__message" …>` → `<div class="TextArea__validationText" …>`

Also, the demos of Checkbox, Radio, Select, TextArea, and TextField components
have been unified and improved.

## Remove `error` state from Checkbox, Radio, TextField, and TextArea [#DS-677](https://jira.lmc.cz/browse/DS-677) ([f93976c](https://github.com/alma-oss/spirit-design-system/commit/f93976c))

Instead of the `--error` modifier or `has-error` class, use `--danger` or `has-danger`
respectively. This applies to Checkbox, Radio, TextField and TextArea.

- `<div class="TextField--error" …>` → `<div class="TextField--danger" …>`
- `<div class="TextField has-error" …>` → `<div class="TextField has-danger" …>`

## Rename ScrollView `indicators` class to `overflowDecorators` [#DS-825](https://jira.lmc.cz/browse/DS-825) ([a7f4fd9](https://github.com/alma-oss/spirit-design-system/commit/a7f4fd9))

Replace all occurrences of `ScrollView__indicators` with `ScrollView__overflowDecorators`.
This also applies to classes with modifiers.

- `ScrollView__indicators` → `ScrollView__overflowDecorators`
- `ScrollView__indicators--shadows` → `ScrollView__overflowDecorators--shadows`
- `ScrollView__indicators--borders` → `ScrollView__overflowDecorators--borders`

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.
