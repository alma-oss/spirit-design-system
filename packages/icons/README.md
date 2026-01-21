# @alma-oss/spirit-icons

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

```jsx
import Warning from '@alma-oss/spirit-icons/svg/warning.svg';

<Warning />;
```

Or you can import React components directly from `@alma-oss/spirit-icons/react`.

⚠️ Beware of naming, as all React component does, they are named using **PascalCase** and `Icon` suffix.

```jsx
import { WarningIcon } from '@alma-oss/spirit-icons/react';
// or
import WarningIcon from '@alma-oss/spirit-icons/react/WarningIcon';

<WarningIcon />;
```

### Icons Paths

Alternatively you can use an `icons` object which consists of an icon name and SVG content. Thus you can fabricate your icon yourself.

```jsx
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

[spirit-web]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web
[nextjs-transpile-packages]: https://nextjs.org/docs/pages/api-reference/next-config-js/transpilePackages
[react-svgr]: https://react-svgr.com/
