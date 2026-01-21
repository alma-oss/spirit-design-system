# Migration Guide

Introducing version 4 of the _spirit-web-twig_ package.

> Please follow these steps to safely upgrade to Spirit Design System v4 components.

> ℹ️ Don't forget to check the [migration guide of the _spirit-web_ package][migration-guide-web] for general changes in
> available feature flags, CSS, JavaScript plugins, and other changes that might affect your project.

## Overview

- [Component Changes](#component-changes)
  - [Button and ButtonLink: `isSquare` Prop Renamed to `isSymmetrical`](#button-and-buttonlink-issquare-prop-renamed-to-issymmetrical)
  - [Button and ButtonLink: Removed `inverted` Variant](#button-and-buttonlink-removed-inverted-variant)
  - [Header: Removed `inverted` Variant](#header-removed-inverted-variant)
  - [Heading: `elementType` Prop is Now Mandatory](#heading-elementtype-prop-is-now-mandatory)
  - [Link: Removed `isUnderlined` Prop](#link-removed-isunderlined-prop)
  - [Link: Removed `inverted` Variant](#link-removed-inverted-variant)
  - [Link: The`hasVisitedStyleAllowed` Props](#link-the-hasvisitedstyleallowed-prop)
  - [Pill: Update Color Palette](#pill-update-color-palette)
  - [ProductLogo: Removed `inverted` Variant](#productlogo-removed-inverted-variant)
  - [Toast: Link `underlined` Prop](#toast-link-underlined-prop)
  - [Toast: Renamed Color Variant `inverted` to `neutral` in `ToastBar`](#toast-renamed-color-variant-inverted-to-neutral-in-toastbar)

## Component Changes

### Button and ButtonLink: `isSquare` Prop Renamed to `isSymmetrical`

Button `isSquare` prop was renamed to `isSymmetrical`.

#### Migration Guide

- `<Button isSquare … />` → `<Button isSymmetrical … />`
- `<ButtonLink isSquare … />` → `<ButtonLink isSymmetrical … />`

### Button and ButtonLink: Removed `inverted` Variant

The `inverted` variant was removed from the `Button` and `ButtonLink` components.
Use themes instead to switch the color scheme.

### Header: Removed `inverted` Variant

The `inverted` variant was removed from the `Header` component. Instead the `primary` variant
was introduced. Use themes to switch the color scheme.

### Heading: `elementType` Prop is Now Mandatory

The `Heading` component previously had a default `elementType` of `"div"`.
We've removed this default to encourage developers to explicitly choose a more appropriate semantic HTML element.

#### Migration Guide

- `<Heading … />` → `<Heading elementType="{/* Your semantic HTML element here */}" … />`

### Link: Removed `isUnderlined` Prop

The `isUnderlined` property was removed, please use `underlined` instead.

#### Migration Guide

- `<Link isUnderlined … />` → `<Link underlined="always" … />`

### Link: Removed `inverted` Variant

The `inverted` variant was removed from the `Link` component.
Use themes instead to switch the color scheme.

### Link: The `hasVisitedStyleAllowed` Prop

The `hasVisitedStyleAllowed` property was added. This property allows the link to have visited state style. There is also a change in the use of the visited state style for the `Heading` component, which had previously this state set by default.
Now a prop `hasVisitedStyleAllowed` has to be added to enable the visited state.

#### Migration Guide

If you want to enable the visited state style for the `Link` component, please manually add the `hasVisitedStyleAllowed` prop.

- `<Link … />` → `<Link hasVisitedStyleAllowed … />`

### Pill: Update Color Palette

The `color` prop of the `Pill` component no longer supports `primary`, `secondary`, `tertiary`, `inverted`
and `unselected` variants. Instead, the `neutral` variant was added. The current list of variants is:

- `neutral`
- `danger`
- `informative`
- `success`
- `warning`

### ProductLogo: Removed `inverted` Variant

The `inverted` variant was removed from the `ProductLogo` component.

### Toast: Link `underlined` Prop

The `isUnderlined` prop was removed from the `Link` component therefore it is not available in the `Toast` component
JS plugin. Use `underlined` instead.

#### Migration Guide

Replace the `isUnderlined` prop with `underlined` in the JS plugin configuration:

```diff
linkProps: {
  href: 'https://example.com', // Link URL
  target: '_blank', // Optional link target attribute
- isUnderlined: false, // Optional link underlining, default: true
+ underlined: 'never', // Optional link underlining, one of ['always' (default), 'hover', 'never']
  isDisabled: false, // Optional link disabling, default: false
  elementType: 'a', // Optional link element type, default: 'a'
},
```

### Toast: Renamed Color Variant `inverted` to `neutral` in `ToastBar`

The `ToastBar` `color` prop variant `inverted` was renamed to `neutral`.

#### Migration Guide

Replace the `inverted` variant with `neutral`:

- `<ToastBar color="inverted" … />` → `<ToastBar color="neutral" … />`

---

Please refer back to this guide or reach out to our team if you encounter any issues during migration.

[migration-guide-web]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/web/migration-v3.md
