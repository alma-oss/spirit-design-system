# @alma-oss/spirit-icons

[![ESM only](https://img.shields.io/badge/ESM-only-green)][esm-only]

> Icons of Spirit Design System.

## Install

🙋🏻‍♂️ **Hold on! Do you already use [`spirit-web`][spirit-web]?** Then you don't need to
install this package because `spirit-icons` is installed automatically
as a dependency of [`spirit-web`][spirit-web].

If you want to use just `spirit-icons` alone in your project, run:

```shell
yarn add @alma-oss/spirit-icons
```

or

```shell
npm install --save @alma-oss/spirit-icons
```

## Colors

Icons with the suffix `-colored` come with predefined colors, so no additional coloring is needed.
In contrast, icons without this suffix inherit the color from the `currentColor` CSS property of their parent element
or themselves.

## Usage

### SVG Files

You can use SVG files directly from `@alma-oss/spirit-icons/svg` directory by importing them or copying them to your app structure.

### React

You can import SVG files directly from `@alma-oss/spirit-icons/svg` directory in React components using a library like [React SVGR][react-svgr].

Example configuration for Webpack:

```js
rules.unshift({
  test: /\.svg$/,
  enforce: 'pre',
  use: ['@svgr/webpack'],
});
```

```tsx
import Warning from '@alma-oss/spirit-icons/svg/warning.svg';

export const Example = () => {
  return <Warning />;
};
```

Or you can import React components directly from `@alma-oss/spirit-icons/react`.

⚠️ Beware of naming, as all React component does, they are named using **PascalCase** and `Icon` suffix.

```tsx
import { WarningIcon } from '@alma-oss/spirit-icons/react';
// or
import WarningIcon from '@alma-oss/spirit-icons/react/WarningIcon';

export const Example = () => {
  return <WarningIcon />;
};
```

### Icons Paths

Alternatively you can use an `icons` object which consists of an icon name and SVG content. Thus you can fabricate your icon yourself.

```tsx
import icons from '@alma-oss/spirit-icons/icons';

export const Icon = ({ name, size }) => {
  return <svg fill="currentColor" width={size} height={size} dangerouslySetInnerHTML={{ __html: icons[name] }} />;
};
```

### Next.js with Pages Router

If you are using Next.js with the Pages Router, it is necessary to add the following configuration to your Next.js configuration file
to transpile the `@alma-oss/spirit-web-react` package, ensuring the correct functionality of the icons:

```javascript
const nextConfig = {
  transpilePackages: ['@alma-oss/spirit-web-react'],
  // other configurations...
};

export default nextConfig;
```

This configuration is not required if you are using the Next.js App Router.

For more information, please see the [Next.js documentation][nextjs-transpile-packages].

## Synchronizing Icons From Figma

The [Figma Assets file][figma-assets] is the source of truth for icons. Component sets named `Icons/{icon-name}` contain
Brand variants; this repository synchronizes only the `Brand=Spirit` variant into `src/svg`.

To synchronize locally, create a Figma personal access token with the `file_content:read` scope and access to the Assets
file, then run:

```shell
FIGMA_ACCESS_TOKEN=your-token yarn icons:sync
```

The command adds, updates, and deletes SVGs so the directory exactly matches Figma. It does not rewrite icon colors;
color normalization remains part of the package build.

Maintainers can run the **Sync Figma Assets** workflow from GitHub Actions. An external automation such as Make can
also start the same workflow after a Figma `LIBRARY_PUBLISH` event. It opens or updates a pull request when the
generated SVGs differ.

[esm-only]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[figma-assets]: https://www.figma.com/design/UMd06VnGrAE5xheb4C8QEg/Assets
[nextjs-transpile-packages]: https://nextjs.org/docs/pages/api-reference/next-config-js/transpilePackages
[react-svgr]: https://react-svgr.com/
[spirit-web]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web
