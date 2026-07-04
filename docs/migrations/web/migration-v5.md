# Migration Guide

Introducing version 5 of the _spirit-web_ package.

> Please follow these steps to safely upgrade to Spirit Design System v5 components.

## Overview

- [General Changes](#general-changes)
  - [Dropped Support for Node.js 20](#dropped-support-for-nodejs-20)
  - [Color Schemes](#color-schemes)
  - [Form Fields: Composition Markup Changed](#form-fields-composition-markup-changed)
  - [Helper: `link-stretched` Renamed to `element-stretched`](#helper-link-stretched-renamed-to-element-stretched)
- [Component Changes](#component-changes)
  - [Button: `Button--block` Modifier Removed](#button-button--block-modifier-removed)
  - [Checkbox, Radio, and Toggle: Vertical Spacing Uses Padding](#checkbox-radio-and-toggle-vertical-spacing-uses-padding)
  - [Checkbox: Composition Markup Changed](#checkbox-composition-markup-changed)
  - [Radio: Composition Markup Changed](#radio-composition-markup-changed)
  - [Toggle: Composition Markup Changed](#toggle-composition-markup-changed)
  - [Collapse: `data-spirit-more` Removed, Use `data-spirit-is-disposable`](#collapse-data-spirit-more-removed-use-data-spirit-is-disposable)
  - [Form Field Components: Vertical Spacing Removed](#form-field-components-vertical-spacing-removed)
  - [Flex: Direction Modifier Classes Changed](#flex-direction-modifier-classes-changed)
  - [Success State Icons Renamed from `check-plain` to `success`](#success-state-icons-renamed-from-check-plain-to-success)
  - [FieldGroup: Component Styles Removed](#fieldgroup-component-styles-removed)
  - [FileUpload and File: Stabilized (FileUploader Removed)](#fileupload-and-file-stabilized-fileuploader-removed)
  - [ScrollView: Arrows Renamed to Controls](#scrollview-arrows-renamed-to-controls)
  - [Stack: Modifier Classes Without `has` Prefix](#stack-modifier-classes-without-has-prefix)
  - [Stack: Wrap Direct Children in `StackItem` When Using Dividers](#stack-wrap-direct-children-in-stackitem-when-using-dividers)
  - [Tag: Appearance Feature Flag Removed](#tag-appearance-feature-flag-removed)
  - [Alert: Deprecated Link Color Styles Removed](#alert-deprecated-link-color-styles-removed)
  - [Tag: `ControlButton` Size Mapping Updated](#tag-controlbutton-size-mapping-updated)
  - [Header: `UNSTABLE_Header` Stabilized, Previous `Header` CSS Removed](#header-unstable_header-stabilized-previous-header-css-removed)
  - [Item: Composable Content and Slots](#item-composable-content-and-slots)
  - [ControlButton: Expanded Size Scale Feature Flag Removed](#controlbutton-expanded-size-scale-feature-flag-removed)
  - [Disabled Utility for Color-Scheme Components](#disabled-utility-for-color-scheme-components)
  - [Navigation: Slots, Open State, and Removed Selected Indicator](#navigation-slots-open-state-and-removed-selected-indicator)
  - [Toggle: Input Before Label in HTML](#toggle-input-before-label-in-html)
  - [Pagination: Previous and Next Links Use Small Button](#pagination-previous-and-next-links-use-small-button)
  - [DrawerPanel: Restructured with Sub-components](#drawerpanel-restructured-with-sub-components)
  - [Checkbox and Toggle: Emphasized Label No Longer Documented](#checkbox-and-toggle-emphasized-label-no-longer-documented)

## General Changes

### Dropped Support for Node.js 20

The Node.js v20 is no longer supported. The minimum required Node.js version is 22.

### Color Schemes

Multiple components now use color scheme utility classes (`color-scheme-on-*`) for surface colors
instead of component-specific color modifiers. This affects: Box, Button, ControlButton, Item, Pill, Tag, Toast, and Tooltip.
See [Color Schemes][decision-color-schemes] for the utility class naming and pairing logic.

### Form Fields: Composition Markup Changed

Form fields no longer use the monolithic `TextField`, `Select`, or `TextArea` wrapper markup.
Compose fields from `Label`, `InputContainer`, `InputAddon`, `HelperText`, `ValidationText`, and `InputDetails` instead.

Supported `InputContainer` variants:

- `InputContainer--fill` (default)
- `InputContainer--outline`

Supported sizes: `InputContainer--small`, `InputContainer--medium`, `InputContainer--large`.

When helper text, validation text, or `InputDetails` content should appear disabled, add the
`InputDetails--disabled` modifier to the `InputDetails` wrapper.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

```html
<!-- Before -->
<div class="TextField TextField--medium">
  <label for="text-field-default" class="TextField__label">Label</label>
  <input type="text" id="text-field-default" class="TextField__input" name="default" placeholder="Placeholder" />
</div>

<!-- After -->
<div>
  <label for="text-field-default" class="Label">Label</label>
  <div class="InputContainer InputContainer--fill InputContainer--medium">
    <input type="text" id="text-field-default" name="default" placeholder="Placeholder" />
  </div>
</div>
```

For fields with addons (icons, buttons), wrap the input and addon inside `InputContainer` and place each addon in
`InputAddon`.

When supplementary details should look disabled:

```html
<!-- Before -->
<div id="consent-details" class="InputDetails">
  <button type="button" class="link-underlined link-inherit" disabled>See terms</button>
</div>

<!-- After -->
<div id="consent-details" class="InputDetails InputDetails--disabled">
  <button type="button" class="link-underlined link-inherit" disabled>See terms</button>
</div>
```

See [TextField README][readme-textfield], [InputAddon README][readme-input-addon], [Label README][readme-label],
[HelperText README][readme-helper-text], [ValidationText README][readme-validation-text], and
[InputDetails README][readme-input-details] for full examples.

</details>
### Helper: `link-stretched` Renamed to `element-stretched`

The `.link-stretched` helper class has been replaced by the more general `.element-stretched` utility.
Both classes apply a pseudo-element that expands the clickable area of an element to fill its nearest
positioned ancestor, but the new name reflects that the utility is not limited to links.

The class now lives in `helpers/elements/` instead of `helpers/links/`.

#### Migration Guide

Replace every occurrence of `link-stretched` with `element-stretched`.

```html
<!-- Before -->
<a href="/product/123" class="link-primary link-stretched">Product name</a>

<!-- After -->
<a href="/product/123" class="link-primary element-stretched">Product name</a>
```

The parent element must still have `position: relative` for the stretch to take effect.

## Component Changes

### Button: `Button--block` Modifier Removed

The deprecated `Button--block` CSS modifier has been removed.

To achieve full-width buttons, use CSS utility classes or the [`Grid`][readme-grid] component instead.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Remove the `Button--block` modifier class and use layout to achieve a full-width button instead.

Responsive on all breakpoints:

```html
<!-- Before -->
<button type="button" class="Button Button--primary Button--medium Button--block">Full-width Button</button>

<!-- After -->
<div class="d-grid">
  <button type="button" class="Button Button--primary Button--medium">Full-width Button</button>
</div>
```

Full-width on mobile only:

```html
<!-- Before -->
<button type="button" class="Button Button--primary Button--medium Button--block">Full-width Button</button>

<!-- After -->
<div class="d-grid d-tablet-block">
  <button type="button" class="Button Button--primary Button--medium">Full-width Button</button>
</div>
```

Responsive full-width with [`Grid`][readme-grid]:

```html
<!-- Before -->
<button type="button" class="Button Button--primary Button--medium Button--block">Responsive Button</button>

<!-- After -->
<div class="Grid Grid--cols-1 Grid--tablet--cols-2">
  <button type="button" class="Button Button--primary Button--medium">Responsive Button</button>
</div>
```

</details>

### Checkbox, Radio, and Toggle: Vertical Spacing Uses Padding

Non-item Checkbox, Radio, and Toggle rows previously set their own vertical **margin** for default row spacing.

`Stack` with spacing (`Stack--spacing`) resets vertical margin on direct children (`margin-block: 0`) so gap-based
spacing between items stays predictable. Margin on checkbox, radio, or toggle rows inside a spaced Stack was therefore
often removed — row spacing could disappear in stacked lists.

These rows now use vertical **padding** on the layout wrapper (`py-500`) instead. Padding is not reset by Stack, so
spacing stays consistent inside and outside stacked layouts.

#### Migration Guide

Review your Checkbox, Radio, and Toggle usages and remove any `my-500` on row wrappers — use `py-500` instead. When
stacking multiple checkbox, radio, or toggle rows alone, use `Stack` **without** `Stack--spacing` — the built-in
padding already provides row spacing; combining `Stack--spacing` with these rows adds redundant gap on top of padding.
When mixing these rows with other form fields (for example inside [FieldGroup][readme-fieldgroup]), you may still want
`Stack--spacing` or vertical Flex spacing so every field gets consistent gap — unlike React FieldGroup, the web
FieldGroup does not add spacing between children by default.

### Checkbox: Composition Markup Changed

The Checkbox component no longer provides the outer wrapper and text element classes.
Compose checkbox rows from the `Checkbox`, `Label`, and layout utilities instead.

See also [Checkbox, Radio, and Toggle: Vertical Spacing Uses Padding](#checkbox-radio-and-toggle-vertical-spacing-uses-padding)
for more details about Checkbox vertical spacing.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Replace the old Checkbox wrapper markup with a `Flex` row and add `py-500` vertical padding on the wrapper:

```html
<!-- Before -->
<div class="Checkbox">
  <input type="checkbox" id="checkbox-default" class="Checkbox__input" />
  <div class="Checkbox__text">
    <label for="checkbox-default" class="Checkbox__label">Checkbox Label</label>
  </div>
</div>

<!-- After -->
<div class="Flex Flex--horizontal Flex--inline py-500" style="--flex-spacing-x: var(--spirit-space-500);">
  <input type="checkbox" id="checkbox-default" class="Checkbox" />
  <div>
    <label for="checkbox-default" class="Label cursor-pointer">Checkbox Label</label>
  </div>
</div>
```

For item-style checkboxes, use the `Item` composition and the `Checkbox--item` modifier:

```html
<!-- Before -->
<div class="Checkbox Checkbox--item">
  <input type="checkbox" id="checkbox-item" class="Checkbox__input" />
  <div class="Checkbox__text">
    <label for="checkbox-item" class="Checkbox__label">Checkbox Label</label>
  </div>
</div>

<!-- After -->
<div class="Item">
  <div class="Item__slot" role="presentation">
    <input type="checkbox" id="checkbox-item" class="Checkbox Checkbox--item" />
  </div>
  <div class="Item__content" role="presentation">
    <label for="checkbox-item" class="Label element-stretched cursor-pointer">Checkbox Label</label>
  </div>
</div>
```

</details>

### Radio: Composition Markup Changed

The Radio component no longer provides the outer wrapper and text element classes.
Compose radio rows from the `Radio`, `Label`, and layout utilities instead.

See also [Checkbox, Radio, and Toggle: Vertical Spacing Uses Padding](#checkbox-radio-and-toggle-vertical-spacing-uses-padding)
for more details about Radio vertical spacing.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Replace the old Radio wrapper markup with a `Flex` row and add `py-500` vertical padding on the wrapper:

```html
<!-- Before -->
<div class="Radio">
  <input type="radio" id="radio-default" class="Radio__input" />
  <div class="Radio__text">
    <label for="radio-default" class="Label Label--inline">Radio Label</label>
  </div>
</div>

<!-- After -->
<div class="Flex Flex--horizontal Flex--inline py-500" style="--flex-spacing-x: var(--spirit-space-500);">
  <input type="radio" id="radio-default" class="Radio" />
  <div>
    <label for="radio-default" class="Label cursor-pointer">Radio Label</label>
  </div>
</div>
```

For item-style radios, use the `Item` composition and the `Radio--item` modifier:

```html
<!-- Before -->
<div class="Radio Radio--item">
  <input type="radio" id="radio-item" class="Radio__input" />
  <div class="Radio__text">
    <label for="radio-item" class="Label Label--item">Radio Label</label>
  </div>
</div>

<!-- After -->
<div class="Item">
  <div class="Item__slot" role="presentation">
    <input type="radio" id="radio-item" class="Radio Radio--item" />
  </div>
  <div class="Item__content" role="presentation">
    <label for="radio-item" class="Label element-stretched cursor-pointer">Radio Label</label>
  </div>
</div>
```

</details>

### Toggle: Composition Markup Changed

The Toggle component no longer provides the outer wrapper and text element classes.
Compose toggle rows from the `Toggle`, `Label`, and layout utilities instead.

See also [Checkbox, Radio, and Toggle: Vertical Spacing Uses Padding](#checkbox-radio-and-toggle-vertical-spacing-uses-padding)
for more details about Toggle vertical spacing.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Replace the old Toggle wrapper markup with a `Flex` row and add `py-500` vertical padding on the wrapper:

```html
<!-- Before -->
<div class="Toggle Toggle--inputPositionEnd">
  <div class="Toggle__text">
    <label for="toggle-default" class="Label Label--inline">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle-default" class="Toggle__input" />
</div>

<!-- After -->
<div
  class="Flex Flex--horizontalReversed Flex--inline Flex--alignmentXSpaceBetween py-500"
  style="--flex-spacing-x: var(--spirit-space-500);"
>
  <input type="checkbox" id="toggle-default" class="Toggle" />
  <div>
    <label for="toggle-default" class="Label cursor-pointer">Toggle Label</label>
  </div>
</div>
```

For toggles with indicators, move `Toggle__input--indicators` to `Toggle--indicators` on the input:

```html
<!-- Before -->
<input type="checkbox" class="Toggle__input Toggle__input--indicators" />

<!-- After -->
<input type="checkbox" class="Toggle Toggle--indicators" />
```

</details>

### Form Field Components: Vertical Spacing Removed

`Label`, `HelperText`, and `ValidationText` no longer carry their own `margin-top` or `margin-bottom`.
Previously those margins provided automatic spacing inside form field compositions.
If you compose custom fields from these components directly (without using Spirit's built-in field
components such as `TextField`, `Checkbox`, or `FileUploadInput`), you must now provide spacing
explicitly via a layout wrapper.

#### Migration Guide

Wrap your field parts in a `Stack` with the appropriate spacing token:

```html
<!-- Before — spacing came from Label/HelperText/ValidationText margins -->
<label for="my-input" class="Label">Label</label>
<div class="InputContainer InputContainer--fill InputContainer--medium">
  <input type="text" id="my-input" />
</div>
<div class="HelperText">Helper text</div>
<div class="ValidationText ValidationText--danger">Error text</div>

<!-- After — wrap in Stack to restore spacing -->
<div class="Stack Stack--spacing" style="--stack-spacing: var(--spirit-space-400);">
  <label for="my-input" class="Label">Label</label>
  <div class="InputContainer InputContainer--fill InputContainer--medium">
    <input type="text" id="my-input" />
  </div>
  <div class="HelperText">Helper text</div>
  <div class="ValidationText ValidationText--danger">Error text</div>
</div>
```

Use `--stack-spacing: var(--spirit-space-400)` for the gap between the label and its helper/validation
text inside the text area (e.g. inside a Radio or Checkbox row), or `--stack-spacing: var(--spirit-space-500)` for the gap between the label and the input container.

### Flex: Direction Modifier Classes Changed

The `Flex--row` and `Flex--column` CSS modifier classes were removed. Use `Flex--horizontal` and `Flex--vertical` instead.

#### Migration Guide

Manually replace the modifier classes in your project.

- `Flex--row` → `Flex--horizontal`
- `Flex--column` → `Flex--vertical`
- `Flex--{breakpoint}--row` → `Flex--{breakpoint}--horizontal`
- `Flex--{breakpoint}--column` → `Flex--{breakpoint}--vertical`

### Collapse: `data-spirit-more` Removed, Use `data-spirit-is-disposable`

The `data-spirit-more` attribute was removed from Collapse triggers. Use `data-spirit-is-disposable` instead.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Replace the attribute on collapse triggers:

```html
<!-- Before -->
<button type="button" data-spirit-toggle="collapse" data-spirit-target="collapse" data-spirit-more>More</button>

<!-- After -->
<button type="button" data-spirit-toggle="collapse" data-spirit-target="collapse" data-spirit-is-disposable>
  More
</button>
```

</details>

### Success State Icons Renamed from `check-plain` to `success`

Success validation and status icons now use the `success` sprite icon instead of `check-plain`.
This affects `ValidationText`, `Alert`, and `Toast` in success states. Selection indicators on `Item`, `PricingPlan`, and similar components still use `check-plain`.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Update custom sprite references in success validation or status states:

```html
<!-- Before -->
<svg class="Icon" width="24" height="24" aria-hidden="true">
  <use href="/icons/svg/sprite.svg#check-plain" />
</svg>

<!-- After (success validation/status only) -->
<svg class="Icon" width="24" height="24" aria-hidden="true">
  <use href="/icons/svg/sprite.svg#success" />
</svg>
```

</details>

### FieldGroup: Component Styles Removed

The `FieldGroup` component styles were removed. Compose grouped fields with `Flex` and border utilities instead.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Replace `FieldGroup` markup with a `Flex` row and a border utility on the group wrapper.
See [FieldGroup README][readme-fieldgroup] for current composition examples.

</details>

### FileUpload and File: Stabilized (FileUploader Removed)

`UNSTABLE_FileUpload` and `UNSTABLE_File` CSS classes are now stable as `FileUpload`, `FileUploadInput`, and `File`.

The `FileUploader` composition (HTML/CSS classes and the `fileUploader` JavaScript plugin) was removed in v5. Use `FileUpload` and `File` instead.

#### Migration Guide

Manually replace the class names in your project.

- `UNSTABLE_FileUpload` → `FileUpload`
- `UNSTABLE_FileUploadInput` → `FileUploadInput`
- `UNSTABLE_File` → `File`

<details>
  <summary>🔧 Manual Migration Steps (FileUploader → FileUpload / File)</summary>

1. Replace `FileUploader`/`FileUploaderInput`/`FileUploaderList`/`FileUploaderAttachment` markup with `FileUpload` and `File`.
2. Remove dependency on the `fileUploader` plugin (`data-spirit-toggle="fileUploader"` and related behavior).
3. Move queue and validation logic to your own JavaScript.

```html
<!-- Before -->
<div class="FileUploader" data-spirit-toggle="fileUploader">
  <div class="FileUploaderInput" data-spirit-element="wrapper"><!-- … --></div>
  <ul class="FileUploaderList" data-spirit-element="list">
    <!-- … -->
  </ul>
</div>

<!-- After -->
<div class="FileUpload"><!-- upload input/dropzone --></div>
<ul class="Stack Stack--spacing" aria-label="Uploaded files">
  <li class="File"><!-- file row --></li>
</ul>
```

</details>

### ScrollView: Arrows Renamed to Controls

ScrollView scroll navigation markup was renamed from “arrows” to “controls”.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Manually replace the BEM class in your project.

- `ScrollView__arrows` → `ScrollView__controls`

If you customized internal Sass variables in your project, rename them as well:

- `$start-shadow-size-arrow` → `$start-shadow-size-controls`
- `$start-shadow-initial-offset-arrow` → `$start-shadow-initial-offset-controls`
- `$end-shadow-size-arrow` → `$end-shadow-size-controls`
- `$end-shadow-initial-offset-arrow` → `$end-shadow-initial-offset-controls`
- `$arrow-spacing` → `$controls-spacing`

</details>

### Stack: Modifier Classes Without `has` Prefix

Stack CSS modifier classes no longer use the `has` verb prefix, consistent with other Spirit modifiers.

#### Migration Guide

Manually replace the modifier classes in your project.

- `Stack--hasSpacing` → `Stack--spacing`
- `Stack--hasIntermediateDividers` → `Stack--intermediateDividers`
- `Stack--hasStartDivider` → `Stack--startDivider`
- `Stack--hasEndDivider` → `Stack--endDivider`

```html
<!-- Before -->
<ul class="Stack Stack--hasSpacing Stack--hasIntermediateDividers Stack--hasStartDivider Stack--hasEndDivider">
  <li class="StackItem">Item 1</li>
  <li class="StackItem">Item 2</li>
</ul>

<!-- After -->
<ul class="Stack Stack--spacing Stack--intermediateDividers Stack--startDivider Stack--endDivider">
  <li class="StackItem">Item 1</li>
  <li class="StackItem">Item 2</li>
</ul>
```

### Stack: Wrap Direct Children in `StackItem` When Using Dividers

The CSS fallback that allowed direct children without the `StackItem` class to receive divider styling has been removed.
If your `Stack` uses `Stack--intermediateDividers`, `Stack--startDivider`, or `Stack--endDivider`, each direct child must carry the `StackItem` class.

#### Migration Guide

Add the `StackItem` class to each direct child of a divider Stack:

```html
<!-- Before -->
<ul class="Stack Stack--intermediateDividers">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<!-- After -->
<ul class="Stack Stack--intermediateDividers">
  <li class="StackItem">Item 1</li>
  <li class="StackItem">Item 2</li>
</ul>
```

### Tag: Appearance Feature Flag Removed

The feature flag enabling the new `Tag` appearance was removed and the new appearance
(`inline-flex` layout with explicit height and inside spacing) is now default.

#### Migration Guide

You can now safely delete the Sass variable `$enable-v5-tag-appearance` and the CSS class
`spirit-feature-enable-v5-tag-appearance` from your project as they have no effect.

### Alert: Deprecated Link Color Styles Removed

The deprecated `.Alert :where(a)` CSS rule that forced links inside `Alert` to inherit the
alert's content color has been removed. Links inside `Alert` now use the default link color
from your project styles.

#### Migration Guide

If your project relies on links inside `Alert` matching the alert's content color, add the
`link-inherit` class to each link or button element. Use `link-underlined` as well so links
remain distinguishable from surrounding text:

```html
<!-- Before -->
<div class="Alert Alert--success">
  <div>See <a href="/faq">FAQ</a> for more info.</div>
</div>

<!-- After -->
<div class="Alert Alert--success">
  <div>See <a href="/faq" class="link-inherit link-underlined">FAQ</a> for more info.</div>
</div>
```

See [Alert README][readme-alert] for the full links-in-alert pattern.

### Tag: `ControlButton` Size Mapping Updated

The recommended `ControlButton` size to use inside a `Tag` has changed to better align with the
updated size scale. The previous guidance mapped Tag sizes to larger `ControlButton` values; the new
mapping uses smaller ones:

| Tag class     | Previous `ControlButton` class | New `ControlButton` class           |
| ------------- | ------------------------------ | ----------------------------------- |
| `Tag--xsmall` | `ControlButton--xsmall`        | `ControlButton--xsmall` (unchanged) |
| `Tag--small`  | `ControlButton--small`         | `ControlButton--xsmall`             |
| `Tag--medium` | `ControlButton--small`         | `ControlButton--xsmall`             |
| `Tag--large`  | `ControlButton--medium`        | `ControlButton--small`              |
| `Tag--xlarge` | `ControlButton--medium`        | `ControlButton--small`              |

#### Migration Guide

Update the `ControlButton--*` modifier class on any `ControlButton` nested inside a `Tag`:

```diff
  <div class="Tag Tag--selected Tag--medium color-scheme-on-selected-basic">
    <span>Tag label</span>
    <button
      type="button"
-     class="ControlButton ControlButton--small ControlButton--symmetrical"
+     class="ControlButton ControlButton--xsmall ControlButton--symmetrical"
      aria-label="Remove Tag label"
    >…</button>
  </div>
  <div class="Tag Tag--selected Tag--large color-scheme-on-selected-basic">
    <span>Tag label</span>
    <button
      type="button"
-     class="ControlButton ControlButton--medium ControlButton--symmetrical"
+     class="ControlButton ControlButton--small ControlButton--symmetrical"
      aria-label="Remove Tag label"
    >…</button>
  </div>
```

### Header: `UNSTABLE_Header` Stabilized, Previous `Header` CSS Removed

The `UNSTABLE_Header` CSS classes have been stabilized and renamed. The previous `Header` component CSS
(`.Header`, `.HeaderNav`, `.HeaderDialog`, etc.) has been **removed**.

#### CSS Class Renames

| Old class                         | New class                |
| --------------------------------- | ------------------------ |
| `.UNSTABLE_Header`                | `.Header`                |
| `.UNSTABLE_Header--bottomDivider` | `.Header--bottomDivider` |
| `.UNSTABLE_HeaderLogo`            | `.HeaderLogo`            |

```diff
- <header class="UNSTABLE_Header">
-   <a class="UNSTABLE_HeaderLogo" href="/">Logo</a>
- </header>
+ <header class="Header">
+   <a class="HeaderLogo" href="/">Logo</a>
+ </header>

- <header class="UNSTABLE_Header UNSTABLE_Header--bottomDivider">
+ <header class="Header Header--bottomDivider">
```

The `--spirit-header-height` CSS variable is still set by `.Header` and can be used by nested components.

#### Migrating from the Previous `Header`

If you were using the previous `Header` with its sub-components (`.HeaderNav`, `.HeaderDialog`,
`.HeaderMobileActions`, etc.), the composition can vary significantly depending on your use case.
See [Header README][readme-header] for the current `Header` implementation and composition examples.

### Item: Composable Content and Slots

Item markup was restructured around explicit `Item__content` and `Item__slot` wrappers. Labels, helper text,
icons, and selection indicators are no longer positioned by Item-specific grid styles — compose them inside
`Item__content` and `Item__slot` instead.

#### What Changed

| Before                                                  | After                                                                                       |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `Item__icon Item__icon--start` / `Item__icon--end`      | `Item__slot`                                                                                |
| `Item__label` or direct `Label` / `HelperText` children | `Item__content` wrapping label and supporting text                                          |
| `HelperText HelperText--item`                           | `HelperText` inside `Item__content`                                                         |
| Selected trailing icon without `Icon--selected`         | Trailing icon in `Item__slot` with `Icon--selected` when selected                           |
| `Item--selected` selected background                    | `color-scheme-on-selected-subtle` and `bg-color-scheme` selected background                 |
| Implicit `<button>` as the only documented root         | Use `<div class="Item">` for static rows; choose `<button>` or `<a>` explicitly when needed |

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

1. Wrap the main label and supporting text in `Item__content` with `role="presentation"`.
2. Replace `Item__icon` with `Item__slot` (`role="presentation"`).
3. Remove the `HelperText--item` modifier; place plain `HelperText` inside `Item__content`.
4. Add `Icon--selected` to trailing selection icons and use `color-scheme-on-selected-subtle` and `bg-color-scheme` when the background should show.
5. Use a non-interactive `<div class="Item">` for static or composed rows; keep `<button>` or `<a>` only when the whole row is a single action.

Simple item:

```html
<!-- Before -->
<button type="button" class="Item">
  <span class="Label Label--item">Item</span>
</button>

<!-- After -->
<div class="Item">
  <span class="Item__content" role="presentation">
    <span class="Label element-stretched">Item</span>
  </span>
</div>
```

Item with icon and helper text:

```html
<!-- Before -->
<button type="button" class="Item Item--selected">
  <span class="Item__icon Item__icon--start">
    <svg class="Icon" width="24" height="24" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#search" />
    </svg>
  </span>
  <span class="Label Label--item">Item</span>
  <span class="HelperText HelperText--item">Helper text</span>
  <span class="Item__icon Item__icon--end">
    <svg class="Icon" width="24" height="24" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#check-plain" />
    </svg>
  </span>
</button>

<!-- After -->
<button type="button" class="Item color-scheme-on-selected-subtle">
  <span class="Item__slot" role="presentation">
    <svg class="Icon Icon--selected" width="24" height="24" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#search" />
    </svg>
  </span>
  <span class="Item__content" role="presentation">
    <span class="Label element-stretched">Item</span>
    <span class="HelperText">Helper text</span>
  </span>
  <span class="Item__slot" role="presentation">
    <svg class="Icon Icon--selected" width="24" height="24" aria-hidden="true">
      <use href="/icons/svg/sprite.svg#check-plain" />
    </svg>
  </span>
</button>
```

See [Item README][readme-item] for disabled state, vertical alignment, accessibility, and composed-row patterns.

</details>

### ControlButton: Expanded Size Scale Feature Flag Removed

The feature flag enabling the expanded size scale was removed and the expanded size scale is now default.
`ControlButton` now ships five sizes (`xsmall`, `small`, `medium`, `large`, `xlarge`) and the existing
sizes were remapped to smaller heights:

| CSS Class               | Height before | Height now |
| ----------------------- | ------------- | ---------- |
| `ControlButton--xsmall` | —             | 16px       |
| `ControlButton--small`  | 24px          | 20px       |
| `ControlButton--medium` | 32px          | 24px       |
| `ControlButton--large`  | 40px          | 32px       |
| `ControlButton--xlarge` | —             | 40px       |

#### Migration Guide

You can now safely delete the Sass variable `$enable-v5-control-button-expanded-size-scale` and the CSS
class `spirit-feature-enable-v5-control-button-expanded-size-scale` from your project as they have no
effect.

This is a **visual breaking change** — if you relied on the previous heights, shift the size modifier up
to keep the same rendering: `ControlButton--small` → `ControlButton--medium`,
`ControlButton--medium` → `ControlButton--large`, and `ControlButton--large` → `ControlButton--xlarge`.

### Disabled Utility for Color-Scheme Components

The `--disabled` BEM modifier classes were removed from `Button`, `ControlButton`, and `Tag`. Use the global
`disabled` utility class together with the native `disabled` attribute (or `aria-disabled="true"` for links).

The `disabled` utility sets disabled color tokens with `!important`, blocks pointer interaction, and applies disabled
cursors. Loading buttons keep `Button--loading` only and must not use the `disabled` utility.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Replace the component `--disabled` modifier with the `disabled` utility class and keep the native disabled state on
interactive elements.

```html
<!-- Before -->
<button type="button" class="Button Button--primary Button--medium Button--disabled" disabled>Disabled Button</button>
<span class="Tag Tag--neutral Tag--small Tag--disabled">Disabled tag</span>

<!-- After -->
<button type="button" class="Button Button--primary Button--medium disabled" disabled>Disabled Button</button>
<span class="Tag Tag--neutral Tag--small disabled">Disabled tag</span>
```

For `ControlButton`, add the `text-color-scheme` utility on the button itself so content colors apply when disabled:

```html
<!-- Before -->
<button
  type="button"
  class="ControlButton ControlButton--medium ControlButton--symmetrical ControlButton--disabled"
  disabled
>
  …
</button>

<!-- After -->
<button
  type="button"
  class="ControlButton ControlButton--medium ControlButton--symmetrical text-color-scheme dynamic-color-background-interactive accessibility-tap-target disabled"
  disabled
>
  …
</button>
```

</details>

### Navigation: Slots, Open State, and Removed Selected Indicator

`NavigationAction` now supports `NavigationAction__slot` wrappers for optional content around the
action label. Expanded category triggers in vertical navigation get the open visual state
automatically from the `aria-expanded="true"` attribute. The vertical selected-state indicator (the
active stripe in the `box` variant) was removed.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

- Migrate from manually appending icons in `NavigationAction` children to explicit `NavigationAction__slot` wrappers.
- For expanded category triggers, set `aria-expanded="true"` on the action to get the open visual state.
- For second-level items, use structural nesting and keep slot icons on parent category actions only.
- If you relied on the vertical selected-state indicator, note that it has been removed; selection is now
communicated through the action's background and color only.
</details>

### Toggle: Input Before Label in HTML

Toggle markup now places the `<input class="Toggle__input">` element **before** the
`<div class="Toggle__text">` block, matching Checkbox and Radio. Visual layout and
`inputPosition` modifier classes are unchanged.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Swap the order of the input and text wrapper in your Toggle HTML.

```html
<!-- Before -->
<div class="Toggle Toggle--inputPositionEnd">
  <div class="Toggle__text">
    <label class="Label Label--inline" for="toggle">Toggle Label</label>
  </div>
  <input type="checkbox" id="toggle" class="Toggle__input" name="toggle" />
</div>

<!-- After -->
<div class="Toggle Toggle--inputPositionEnd">
  <input type="checkbox" id="toggle" class="Toggle__input" name="toggle" />
  <div class="Toggle__text">
    <label class="Label cursor-pointer" for="toggle">Toggle Label</label>
  </div>
</div>
```

If you provided any custom CSS depending on the order of Toggle children, you will need to update it.

</details>

### Pagination: Previous and Next Links Use Small Button

The previous and next navigation links in Pagination now use `Button--small` instead of
`Button--medium`. This aligns the arrow buttons with the height of the page number items.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Replace `Button--medium` with `Button--small` on the previous and next navigation links.

```html
<!-- Before -->
<a href="#" class="Button Button--secondary Button--medium Button--symmetrical">
  <svg class="Icon" width="24" height="24" aria-hidden="true">
    <use href="/icons/svg/sprite.svg#chevron-left" />
  </svg>
  <span class="accessibility-hidden">Previous</span>
</a>

<!-- After -->
<a href="#" class="Button Button--secondary Button--small Button--symmetrical">
  <svg class="Icon" width="24" height="24" aria-hidden="true">
    <use href="/icons/svg/sprite.svg#chevron-left" />
  </svg>
  <span class="accessibility-hidden">Previous</span>
</a>
```

</details>

---

### DrawerPanel: Restructured with Sub-components

The `DrawerPanel` interior has been restructured. The old `DrawerPanel__content` element — which previously
wrapped both the close button and the drawer body — has been replaced by two explicit sub-components:
`DrawerPanelHeader` for the close button and `DrawerPanelBody` for the scrollable body.

| Old class              | New classes                             |
| ---------------------- | --------------------------------------- |
| `DrawerPanel__content` | `DrawerPanelHeader` + `DrawerPanelBody` |

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

```diff
  <div class="DrawerPanel">
-   <div class="DrawerPanel__content">
-     <!-- close button -->
-     <!-- drawer body -->
-   </div>
+   <header class="DrawerPanelHeader">
+     <!-- close button -->
+   </header>
+   <div class="DrawerPanelBody">
+     <!-- drawer body -->
+   </div>
  </div>
```

</details>

### Checkbox and Toggle: Emphasized Label No Longer Documented

The "Emphasized Label" pattern — wrapping label text in a `<span class="typography-body-medium-semibold">`
(or any other `typography-*` utility) inside a `Label` — is no longer documented for Checkbox and Toggle.

`Label` already applies `label-medium` typography. Nesting a different typography utility inside the label
overrides those styles and can push the label text out of vertical alignment with the input control.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Remove the inner `<span class="typography-*">` wrapper and pass the label text directly to the `Label`:

```html
<!-- Before -->
<label class="Label Label--required cursor-pointer" for="consent">
  <span class="typography-body-medium-semibold">I agree to the terms and conditions</span>
</label>

<!-- After -->
<label class="Label Label--required cursor-pointer" for="consent">I agree to the terms and conditions</label>
```

Search your project for `Label` elements that contain a `<span>` with a `typography-*` class and replace them with plain label text.
Pay special attention to consent checkboxes and toggles, where this pattern was most commonly used.

</details>

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.

> ℹ️ If you override design tokens in your project, see the [design tokens v5 migration guide][migration-guide-design-tokens].

[decision-color-schemes]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/decisions/012-color-schemes.md
[migration-guide-design-tokens]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/design-tokens/migration-v5.md
[readme-alert]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Alert/README.md
[readme-drawer]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Drawer/README.md
[readme-fieldgroup]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/FieldGroup/README.md
[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Grid/README.md
[readme-header]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Header/README.md
[readme-helper-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/HelperText/README.md
[readme-input-addon]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/InputAddon/README.md
[readme-input-details]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/InputDetails/README.md
[readme-item]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Item/README.md
[readme-label]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Label/README.md
[readme-textfield]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/TextField/README.md
[readme-validation-text]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/ValidationText/README.md
