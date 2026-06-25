# Migration Guide

Introducing version 5 of the _spirit-web_ package.

> Please follow these steps to safely upgrade to Spirit Design System v5 components.

## Overview

- [General Changes](#general-changes)
  - [Dropped Support for Node.js 20](#dropped-support-for-nodejs-20)
- [Component Changes](#component-changes)
  - [Button: `Button--block` Modifier Removed](#button-button--block-modifier-removed)
  - [Checkbox: Composition Markup Changed](#checkbox-composition-markup-changed)
  - [Radio: Composition Markup Changed](#radio-composition-markup-changed)
  - [Toggle: Composition Markup Changed](#toggle-composition-markup-changed)
  - [Flex: Direction Modifier Classes Changed](#flex-direction-modifier-classes-changed)
  - [FileUpload and File: Stabilized (FileUploader Removed)](#fileupload-and-file-stabilized-fileuploader-removed)
  - [ScrollView: Arrows Renamed to Controls](#scrollview-arrows-renamed-to-controls)
  - [Stack: Modifier Classes Without `has` Prefix](#stack-modifier-classes-without-has-prefix)
  - [Stack: Wrap Direct Children in `StackItem` When Using Dividers](#stack-wrap-direct-children-in-stackitem-when-using-dividers)
  - [Tag: Appearance Feature Flag Removed](#tag-appearance-feature-flag-removed)
  - [Header: `UNSTABLE_Header` Stabilized, Previous `Header` CSS Removed](#header-unstable_header-stabilized-previous-header-css-removed)
  - [Item: Composable Content and Slots](#item-composable-content-and-slots)
  - [ControlButton: Expanded Size Scale Feature Flag Removed](#controlbutton-expanded-size-scale-feature-flag-removed)
  - [Disabled Utility for Color-Scheme Components](#disabled-utility-for-color-scheme-components)
  - [Toggle: Input Before Label in HTML](#toggle-input-before-label-in-html)
  - [DrawerPanel: Restructured with Sub-components](#drawerpanel-restructured-with-sub-components)

## General Changes

### Dropped Support for Node.js 20

The Node.js v20 is no longer supported. The minimum required Node.js version is 22.

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

### Checkbox: Composition Markup Changed

The Checkbox component no longer provides the outer wrapper and text element classes.
Compose checkbox rows from the `Checkbox`, `Label`, and layout utilities instead.

Vertical spacing is controlled by the layout wrapper. Add margin utilities when the checkbox row owns its own spacing,
and omit them when the row is already spaced by a parent layout such as `Stack`.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Replace the old Checkbox wrapper markup with a `Flex` row and add the required vertical spacing utility when the row is
not already spaced by a parent layout:

```html
<!-- Before -->
<div class="Checkbox">
  <input type="checkbox" id="checkbox-default" class="Checkbox__input" />
  <div class="Checkbox__text">
    <label for="checkbox-default" class="Checkbox__label">Checkbox Label</label>
  </div>
</div>

<!-- After -->
<div class="Flex Flex--horizontal my-500" style="--flex-spacing-x: var(--spirit-space-500);">
  <input type="checkbox" id="checkbox-default" class="Checkbox" />
  <div>
    <label for="checkbox-default" class="Label Label--inline">Checkbox Label</label>
  </div>
</div>
```

For item-style checkboxes, use the `Item` composition and the `Checkbox--item` and `Label--item` modifiers:

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
    <label for="checkbox-item" class="Label Label--item">Checkbox Label</label>
  </div>
</div>
```

</details>

### Radio: Composition Markup Changed

The Radio component no longer provides the outer wrapper and text element classes.
Compose radio rows from the `Radio`, `Label`, and layout utilities instead.

Vertical spacing is controlled by the layout wrapper. Add margin utilities when the radio row owns its own spacing,
and omit them when the row is already spaced by a parent layout such as `Stack`.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Replace the old Radio wrapper markup with a `Flex` row and add the required vertical spacing utility when the row is
not already spaced by a parent layout:

```html
<!-- Before -->
<div class="Radio">
  <input type="radio" id="radio-default" class="Radio__input" />
  <div class="Radio__text">
    <label for="radio-default" class="Label Label--inline">Radio Label</label>
  </div>
</div>

<!-- After -->
<div class="Flex Flex--horizontal my-500" style="--flex-spacing-x: var(--spirit-space-500);">
  <input type="radio" id="radio-default" class="Radio" />
  <div>
    <label for="radio-default" class="Label Label--inline">Radio Label</label>
  </div>
</div>
```

For item-style radios, use the `Item` composition and the `Radio--item` and `Label--item` modifiers:

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
    <label for="radio-item" class="Label Label--item">Radio Label</label>
  </div>
</div>
```

</details>

### Toggle: Composition Markup Changed

The Toggle component no longer provides the outer wrapper and text element classes.
Compose toggle rows from the `Toggle`, `Label`, and layout utilities instead.

Add margin utilities when the row owns its own spacing, and omit them when the row is already spaced by a parent layout such as `Stack`.

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

Replace the old Toggle wrapper markup with a `Flex` row and add the required vertical spacing utility when the row is
not already spaced by a parent layout:

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
  class="Flex Flex--horizontalReversed Flex--inline Flex--alignmentXSpaceBetween my-500"
  style="--flex-spacing-x: var(--spirit-space-500);"
>
  <input type="checkbox" id="toggle-default" class="Toggle" />
  <div>
    <label for="toggle-default" class="Label Label--inline">Toggle Label</label>
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

### Flex: Direction Modifier Classes Changed

The `Flex--row` and `Flex--column` CSS modifier classes were removed. Use `Flex--horizontal` and `Flex--vertical` instead.

#### Migration Guide

Manually replace the modifier classes in your project.

- `Flex--row` → `Flex--horizontal`
- `Flex--column` → `Flex--vertical`
- `Flex--{breakpoint}--row` → `Flex--{breakpoint}--horizontal`
- `Flex--{breakpoint}--column` → `Flex--{breakpoint}--vertical`

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
| `Item--selected` selected background                    | `color-scheme-on-selected-subtle` selected background                                       |
| Implicit `<button>` as the only documented root         | Use `<div class="Item">` for static rows; choose `<button>` or `<a>` explicitly when needed |

#### Migration Guide

<details>
  <summary>🔧 Manual Migration Steps</summary>

1. Wrap the main label and supporting text in `Item__content` with `role="presentation"`.
2. Replace `Item__icon` with `Item__slot` (`role="presentation"`).
3. Remove the `HelperText--item` modifier; place plain `HelperText` inside `Item__content`.
4. Add `Icon--selected` to trailing selection icons and use `color-scheme-on-selected-subtle` when the background should show.
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
    <span class="Label Label--item">Item</span>
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
    <span class="Label Label--item">Item</span>
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
    <label class="Label Label--inline" for="toggle">Toggle Label</label>
  </div>
</div>
```

If you provided any custom CSS depending on the order of Toggle children, you will need to update it.

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

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.

[readme-drawer]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Drawer/README.md
[readme-grid]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Grid/README.md
[readme-header]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Header/README.md
[readme-item]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/Item/README.md
