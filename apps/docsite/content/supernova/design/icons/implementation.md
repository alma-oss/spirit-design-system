---
title: Icons
sourceUrl: https://spirit.supernova-docs.io/latest/design/icons/implementation-3bAINmba-3bAINmba
sourcePath: /latest/design/icons/implementation-3bAINmba-3bAINmba
sourceSection: design
lastExtractedAt: 2026-04-22T22:32:08.057Z
---

- [Overview](/latest/design/icons/overview-fE7VPYjB)
- [Customisation](/latest/design/icons/customisation-176yGC1R)
- [Implementation](/latest/design/icons/implementation-3bAINmba-3bAINmba)
- [Library](/latest/design/icons/library-a8H50lxc-a8H50lxc)

Here you can find general info on how to use Spirit Icons. There is also a README file for each implementation — [icons in Web](https://github.com/lmc-eu/spirit-design-system/tree/main/packages/web/src/icons) and [React Icon](https://github.com/lmc-eu/spirit-design-system/tree/main/packages/web-react/src/components/Icon).

## Package

You can find spirit icons in a separate package called [\`icons\`](https://github.com/lmc-eu/spirit-design-system/tree/main/packages/icons). This package is connected to Supernova using the version release hook. Supernova outputs raw SVGs and we process them. First colors are switched to \`currentColor\` and then an SVG sprite is generated. Lastly, we generate react components from SVGs.

## Install

```bash



                                                            yarn add @lmc-eu/spirit-web


```

or

```bash



                                                            npm install --save @lmc-eu/spirit-web


```

## Web

You can use the SVG sprite for simple HTML implementation. No CSS is needed. Just copy the SVG sprite to your project and load it in the SVG using \`<use>\`.

```html
<svg width="24" height="24" aria-hidden="true">
  <use xlink:href="path/to/sprite.svg#warning" />
</svg>
```

## React

[React Icon component](https://github.com/lmc-eu/spirit-design-system/tree/main/packages/web-react/src/components/Icon) depends on IconsProvider. Pass icon objects from the package to the Provider and use them to wrap your app or a component. Then you can just pass the name of the icon to the Icon component.

```jsx
import { Icon, IconsProvider } from '@lmc-eu/spirit-web-react/components';
import icons from '@lmc-eu/spirit-icons/icons';

export default function AppWithIcons(props) {
  return (
    <IconsProvider value={icons}>
      <Icon name="warning" />
    </IconsProvider>
  );
}
```

## Using a different icon set

For Web implementation just generate your own sprite, for React create an object with contents of the SVGs.

On this page

- [Package](#section-package-f9)
- [Install](#section-install-11)
- [Web](#section-web-e7)
- [React](#section-react-fb)
- [Using a different icon set](#section-using-a-different-icon-set-52)
