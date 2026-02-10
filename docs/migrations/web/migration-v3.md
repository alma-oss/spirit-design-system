# Migration Guide

Introducing version 3 of the _spirit-web_ package.

> Please follow these steps to safely upgrade to Spirit Design System v3 components.

## Overview

- [General Changes](#general-changes)
  - [Themes](#themes)
  - [Spacing Values](#spacing-values)
  - [Helpers: Inverted Link](#helpers-inverted-link)
  - [Helpers: Typography and Headings](#helpers-typography-and-headings)
  - [Utilities: Removed and New Classes](#utilities-removed-and-new-classes)
  - [Migrating Your Own Components](#migrating-your-own-components)
- [Component Changes](#component-changes)
  - [Button: Renamed `square` Modifier](#button-square-modifier-renamed-to-symmetrical)
  - [Button: The `inverted` Modifier Removed](#button-the-inverted-modifier-removed)
  - [Field Group: Alignment](#field-group-alignment)
  - [Flex: Change in Spacing Property](#flex-change-in-spacing-property)
  - [Header: The `inverted` Variant Removed](#header-the-inverted-variant-removed)
  - [Link: The `link-allow-visited` class added](#link-the-link-allow-visited-class-added)
  - [Partner Logo: Stabilized](#partner-logo-stabilized)
  - [Pill: Renamed and Removed Variants](#pill-renamed-and-removed-variants)
  - [Product Logo: The `inverted` Modifier Removed](#product-logo-the-inverted-modifier-removed)
  - [Product Logo: Stabilized](#product-logo-stabilized)
  - [TextField: CSS Variables Renamed](#textfield-css-variables-renamed)
  - [Toast: The `inverted` Variant Removed](#toast-the-inverted-variant-removed)
  - [Toast: Link and Close Button](#toast-link-and-close-button)

## General Changes

### Themes

Starting from version 3, the design system now supports multiple themes based on the
theme tokens.

See our [Themes decision][themes-decision] for more information and why we decided to implement this feature.

#### Introduction

The design system now supports multiple themes based on the theme tokens. As in
[Figma][spirit-figma-file] where the first theme column is the default, the first theme in the
`@themes` tokens map is the **default**.

We use CSS variables to apply colors to the components. The CSS variables of the default theme
are set on the `:root` element.

To switch themes, we also generate CSS classes that can be applied to any element.
Theme names are the key names of the `$themes` map in the `@themes` file in the _design-tokens_ package.

#### Component Changes

We did all the work and our components are now using CSS variables to
apply colors.

Also, all your components or any custom styles you have that previously used
color tokens should be updated to use CSS variables. See [Migrating Your Own Components](#migrating-your-own-components) for more information.

#### Inverted Variants

Using themes, we were able to remove the `inverted` design tokens and component variants, and also some `brand` tokens.

### Spacing Values

New spacing values were added to the design system, updating spacing design tokens and affecting all spacing props and utility classes.

#### Migration Guide

Use this table to update the spacing tokens in your project.

|       | **Old tokens** | **New tokens** |
| ----- | -------------- | -------------- |
| 0     | space-0        | space-0        |
| 1 px  | space-100      | space-100      |
| 2 px  | space-200      | space-200      |
| 4 px  | space-300      | space-300      |
| 6 px  | —              | space-400      |
| 8 px  | space-400      | space-500      |
| 12 px | space-500      | space-600      |
| 16 px | space-600      | space-700      |
| 20 px | —              | space-800      |
| 24 px | space-700      | space-900      |
| 32 px | space-800      | space-1000     |
| 40 px | space-900      | space-1100     |
| 48 px | space-1000     | space-1200     |
| 56 px | —              | space-1300     |
| 64 px | space-1100     | space-1400     |
| 72 px | —              | space-1500     |
| 80 px | space-1200     | space-1600     |
| 96 px | —              | space-1700     |

If you are going to use fulltext search-and-replace in your project, we suggest you to
start from the largest values and work your way down to the smallest ones.
This way you will avoid replacing values you already replaced.

### Helpers: Inverted Link

The `link-inverted` helper was removed. Use themes to switch the link colors.

### Helpers: Typography and Headings

As the word `text` was omitted from the typography tokens, the typography helpers
were updated to reflect this change. Also, the `heading` helpers were updated to
support the emphasis.

#### Migration Guide

Remove the `text` infix from `body` typography helpers.

For example:

- `.typography-body-large-text-bold` → `.typography-body-large-bold`
- `.typography-body-xsmall-text-regular` → `.typography-body-xsmall-regular`

More font weights are now available for headings.
Rename `text` to `bold` in the `heading` helpers.

For example:

- `.typography-heading-xlarge-text` → `.typography-heading-xlarge-bold`
- `.typography-heading-xsmall-text` → `.typography-heading-xsmall-bold`

### Utilities: Removed and New Classes

Some utility classes were removed and new ones were added.

Removed utility classes:

- `.text-brand-primary`
- `.text-brand-secondary`
- `.bg-basic`
- `.bg-cover`
- `.bg-inverted`
- `.bg-brand-primary`
- `.bg-brand-secondary`

New utility classes:

- `.text-tertiary`
- `.bg-primary`
- `.bg-secondary`
- `.bg-tertiary`

### Migrating Your Own Components

First, you need to update your design tokens. You can either use Supernova to export
your design tokens in new structure, or you can manually update your tokens, or update
our tokens package if you are using it.

Here are the steps to migrate your own components to use the new design tokens and themes:

1. If you load `foundation`, `components`, `helpers`, and `utilities` separately, you need
   to `@forward 'themes'` before them in your main SCSS file. If you load the whole `scss` folder,
   you don't need to do anything.
2. Rename all the tokens in your components to use the new structure.
   1. Replace all spacing tokens with new values. See [Spacing Values](#spacing-values) for more information.
   2. Replace all radius tokens with new values. We added a new radius token in between, so you need to update all of them.
   3. Replace all typography tokens with new values. We removed the `text` infix from typography tokens and added emphasized headings.
   4. Revisit all color tokens to use the new structure.
   5. If you used `$border-style` tokens, you need to replace them with direct values (`solid`, `dashed`, etc.).
   6. If you used the `$focus` token, you need to replace it with the `$focus-ring` token.
   7. If you used `$grid-gutter` tokens, you need to replace them with equivalent `$grid-spacing` tokens.
3. That's it! You should now have your components updated to use the new design tokens and themes. 🎉

Here is a simple example of how to update your component styles:

Before:

```scss
// _theme.scss

@use '@tokens' as tokens;

$border-style: tokens.$border-style-100;
$border-color: tokens.$border-secondary-default;
$background-color: tokens.$background-cover;
$gap: tokens.$space-400;
```

After:

```scss
// _theme.scss

@use '@tokens' as tokens;

$border-style: solid;
$border-color: tokens.$border-basic;
$background-color: tokens.$background-primary; // This may require using the "light-on-brand" theme in HTML/JSX. Check with your designer.
$gap: tokens.$space-500;
```

## Component Changes

### Button: `square` Modifier Renamed to `symmetrical`

Button `square` modifier was renamed to `symmetrical`.

#### Migration Guide

Instead of using `.Button--square`, use a `.Button--symmetrical`.

- `.Button--square` → `.Button--symmetrical`

### Button: The `inverted` Modifier Removed

Button `inverted` modifier was removed. Use themes to switch the button colors.

### Field Group: Alignment

Field Group component children are not aligned to `start` except when the `FieldGroup--fluid` modifier is used.

### Flex: Change in Spacing Property

The original property `--flex-spacing` has been replaced to allow separate control over spacing on the x and y axes.
You can now use the properties `--flex-spacing-x` and `--flex-spacing-y` to apply spacing only on the x-axis or y-axis, respectively.

Similarly, when applying responsive spacing for a specific breakpoint, the previous property `--flex-spacing-{breakpoint}` has been replaced.
You should now use `--flex-spacing-x-{breakpoint}` for horizontal spacing or `--flex-spacing-y-{breakpoint}` for vertical spacing from that specific breakpoint upwards.

#### Migration Guide

To separate spacing on the x and y axes, please manually replace the original `--flex-spacing` property with `--flex-spacing-x` and/or `--flex-spacing-y`,
depending on the axis you want to apply the spacing to.

- `<div class="Flex …" style="--flex-spacing: var(--spirit-space-1200)">` → `<div class="Flex …" style="--flex-spacing-x: var(--spirit-space-1200)">`

- For breakpoint-specific spacing, replace `--flex-spacing-{breakpoint}` with `--flex-spacing-x-{breakpoint}` and/or `--flex-spacing-y-{breakpoint}`.

- `<div class="Flex …" style="--flex-spacing-tablet: var(--spirit-space-1000)">` → `<div class="Flex …" style="--flex-spacing-x-tablet: var(--spirit-space-1000); --flex-spacing-y-tablet: var(--spirit-space-1000);">`

### Header: The `inverted` Variant Removed

Header `inverted` variant was removed. Instead, the `primary` variant was added to be further adjusted with themes.

### Link: The `link-allow-visited` class added

The `link-allow-visited` class was added. This class allows the link to have visited state style. There is also
a change in the use of the visited state style for the typography heading classes, which had previously this state set by default.

#### Migration Guide

If you want to enable the visited state style, please manually add the `link-allow-visited-style` class.

- `<a href="#" class="link-primary">` → `<a href="#" class="link-primary link-allow-visited-style">`

### Partner Logo: Stabilized

Partner Logo component was stabilized.

#### Migration Guide

Rename all usages of `UNSTABLE_PartnerLogo` to `PartnerLogo`.

- `<div class="PartnerLogo PartnerLogo--small PartnerLogo--safeArea">` → `<div class="PartnerLogo PartnerLogo--small PartnerLogo--safeArea">`

### Pill: Renamed and Removed Variants

Pill component variants `primary`, `secondary`, `tertiary`, `inverted` and `unselected` were removed.
Instead, the `neutral` variant was added. The current list of variants is:

- `neutral`
- `danger`
- `informative`
- `success`
- `warning`

#### Migration Guide

Use the `neutral` or emotion variants. If you need more variants, please, let us know.

### Product Logo: The `inverted` Modifier Removed

Product Logo `inverted` modifier was removed. Use themes to switch the logo colors.

### Product Logo: Stabilized

Product Logo component was stabilized.

#### Migration Guide

Rename all usages of `UNSTABLE_ProductLogo` to `ProductLogo`.

- `<div class="UNSTABLE_ProductLogo">` → `<div class="ProductLogo">`

### TextField: CSS Variables Renamed

TextField CSS variable `--width` was renamed to `--text-field-input-width`.

#### Migration Guide

Replace all usages of `--width` with `--text-field-input-width` in TextField component.

- `<input class="TextField__input" style="--width: 4em;" />` → `<input class="TextField__input" style="--text-field-input-width: 4em;" />`

### Toast: The `inverted` Variant Removed

Toast `inverted` variant was removed. Use the `neutral` variant instead.

#### Migration Guide

Replace all usages of `ToastBar--inverted` with `ToastBar--neutral`.

- `<div class="ToastBar ToastBar--inverted">` → `<div class="ToastBar ToastBar--neutral">`

### Toast: Link and Close Button

The Toast component now has its own close button and link.

#### Migration Guide

1. Remove the `link-inverted` class from links inside a Toast.
   - `<a href="#" class="ToastBar__link link-inverted link-underlined">` → `<a href="#" class="ToastBar__link link-underlined">`

2. Replace `Button` classes with `Toast__close` class at the close button.
   - `<button class="Button Button--square Button--inverted">` → `<button class="ToastBar__close">`

---

[spirit-figma-file]: https://www.figma.com/design/w9Ca4hvkuYLshsrHu1bYwT/
[themes-decision]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/decisions/008-themes.md
