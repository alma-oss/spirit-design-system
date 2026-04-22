---
title: Migration to v3
sourceUrl: https://spirit.supernova-docs.io/latest/migrations/web-react/migration-to-v3-iqrjVWlO-iqrjVWlO
sourcePath: /latest/migrations/web-react/migration-to-v3-iqrjVWlO-iqrjVWlO
sourceSection: migrations
lastExtractedAt: 2026-04-22T22:32:38.168Z
---

# Migration Guide

Introducing version 3 of the _spirit-web-react_ package.

> Please follow these steps to safely upgrade to Spirit Design System v3 components.

> ℹ️ Don't forget to check the [migration guide of the _spirit-web_ package](https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/web/migration-v3.md) for general changes in available feature flags, CSS, and other changes that might affect your project.

## Overview

- [Component Changes](#component-changes)
  - [Button and ButtonLink: isSquare Prop Renamed to isSymmetrical](#button-and-buttonlink-issquare-prop-renamed-to-issymmetrical)
  - [Button and ButtonLink: Removed inverted Variant](#button-and-buttonlink-removed-inverted-variant)
  - [Header: Removed inverted Variant](#header-removed-inverted-variant)
  - [Heading: elementType Prop is Now Mandatory](#heading-elementtype-prop-is-now-mandatory)
  - [Link: Removed isUnderlined Prop](#link-removed-isunderlined-prop)
  - [Link: Removed inverted Variant](#link-removed-inverted-variant)
  - [Link: The hasVisitedStyleAllowed Prop](#link-the-hasvisitedstyleallowed-prop)
  - [Pill: Update Color Palette](#pill-update-color-palette)
  - [ProductLogo: Removed inverted Variant](#productlogo-removed-inverted-variant)
  - [Toast: Renamed Color Variant inverted to neutral in ToastBar](#toast-renamed-color-variant-inverted-to-neutral-in-toastbar)

## Component Changes

### Button and ButtonLink: isSquare Prop Renamed to isSymmetrical

Button isSquare prop was renamed to isSymmetrical.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh


                                                npx @lmc-eu/spirit-codemods -p <path> -t v3/web-react/button-isSquare-prop-name
                                                npx @lmc-eu/spirit-codemods -p <path> -t v3/web-react/buttonLink-isSquare-prop-name
```

👉 See [Codemods documentation](https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/README.md) for more details.

🔧 Manual Migration Steps

Manually replace the props in your project.

- <Button isSquare … /> → <Button isSymmetrical … />
- <ButtonLink isSquare … /> → <ButtonLink isSymmetrical … />

### Button and ButtonLink: Removed inverted Variant

The inverted variant was removed from the Button and ButtonLink components. Use themes instead to switch the color scheme.

### Header: Removed inverted Variant

The inverted variant was removed from the Header component. Instead the primary variant was introduced. Use themes to switch the color scheme.

### Heading: elementType Prop is Now Mandatory

The Heading component previously had a default elementType of "div". We've removed this default to encourage developers to explicitly choose a more appropriate semantic HTML element.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh


                                                npx @lmc-eu/spirit-codemods -p <path> -t v3/web-react/heading-elementType-prop
```

👉 See [Codemods documentation](https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/README.md) for more details.

⚠️ This codemod will add elementType="div" where it's missing. **We highly recommend reviewing these changes and updating them to use the most appropriate semantic HTML elements.**

🔧 Manual Migration Steps

Manually replace the props in your project.

- <Heading … /> → <Heading elementType="{/\* Your semantic HTML element here \*/}" … />

### Link: Removed isUnderlined Prop

The isUnderlined property was removed, please use underlined instead.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh


                                                npx @lmc-eu/spirit-codemods -p <path> -t v3/web-react/link-underlined-prop
```

👉 See [Codemods documentation](https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/README.md) for more details.

🔧 Manual Migration Steps

Manually replace the props in your project.

- <Link isUnderlined … /> → <Link underlined="always" … />

### Link: Removed inverted Variant

The inverted variant was removed from the Link component. Use themes instead to switch the color scheme.

### Link: The hasVisitedStyleAllowed Prop

The hasVisitedStyleAllowed property was added. This property allows the link to have visited state style. There is also a change in the use of the visited state style for the Heading component, which had previously this state set by default. Now a prop hasVisitedStyleAllowed has to be added to enable the visited state.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh


                                                npx @lmc-eu/spirit-codemods -p <path> -t v3/web-react/link-hasVisitedStyleAllowed-prop
```

👉 See [Codemods documentation](https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/README.md) for more details.

🔧 Manual Migration Steps

- <Link … /> → <Link hasVisitedStyleAllowed … />

### Pill: Update Color Palette

The color prop of the Pill component no longer supports primary, secondary, tertiary, inverted and unselected variants. Instead, the neutral variant was added. The current list of variants is:

- neutral
- danger
- informative
- success
- warning

### ProductLogo: Removed inverted Variant

The inverted variant was removed from the ProductLogo component.

### Toast: Renamed Color Variant inverted to neutral in ToastBar

The ToastBar color prop variant inverted was renamed to neutral.

#### Migration Guide

🪄 Use codemods to automatically update your codebase:

```sh


                                                npx @lmc-eu/spirit-codemods -p <path> -t v3/web-react/toastbar-inverted-neutral
```

👉 See [Codemods documentation](https://github.com/alma-oss/spirit-design-system/blob/main/packages/codemods/README.md) for more details.

🔧 Manual Migration Steps

Manually replace the ToastBar prop color in your project. Instead of using inverted, use neutral.

- <ToastBar color="inverted" … /> → <ToastBar color="neutral" … />

---

Please refer back to these instructions or reach out to our team if you encounter any issues during migration.
