# Setting Up a Next.js Application with Spirit Design System

This document describes the steps to set up a Next.js application using the Spirit Design System.

## Getting Started

- [Creating a Next.js Application](#creating-a-nextjs-application)
- [Running the Development Server](#running-the-development-server)
- [Installing Dependencies](#installing-dependencies)
- [Configuring Next.js for Design Tokens Support](#configuring-nextjs-for-design-tokens-support)
- [Adding and Configure Global Styles](#adding-and-configure-global-styles)
- [Updating the Application Layout](#updating-the-application-layout)
- [Adding a Spirit Component](#adding-a-spirit-component)
- [Running the Application](#running-the-application)

### Creating a Next.js Application

First, create a new Next.js application using the following command:

`npx create-next-app@latest`

During the setup, you can configure the application as required for your project.

We recommend using the following settings:

```text
✔ What is your project named? … your-project-name
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … No
✔ Would you like your code inside a `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to use Turbopack for `next dev`? … Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No
```

### Running the Development Server

After creating the application, navigate to the project folder and start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

<!--lint disable no-undefined-references-->

> [!WARNING]
> In case of error `npm error ERR! code ENOWORKSPACES`, please use `npx another telemetry disable`.
> For more information, see [NPM error code ENOWORKSPACES with NextJS][npm-error-enoworkspaces].

### Installing Dependencies

Install the necessary packages to support Spirit Design System:

```bash
npm install sass-embedded
```

or

```bash
yarn add sass-embedded
```

and the following packages:

```bash
npm install @alma-oss/spirit-design-tokens @alma-oss/spirit-icons @alma-oss/spirit-web @alma-oss/spirit-web-react
```

or

```bash
yarn add @alma-oss/spirit-design-tokens @alma-oss/spirit-icons @alma-oss/spirit-web @alma-oss/spirit-web-react
```

<!--lint disable no-undefined-references-->

> [!NOTE]
> This setup applies only if you don’t want to use your own custom design tokens and/or icons. If you can use your own design tokens and/or icons,
> you can skip the installation of `@alma-oss/spirit-design-tokens` and/or `@alma-oss/spirit-icons`.
> For more information, see [Rebranding Spirit][rebranding-spirit].

### Configuring Next.js for Design Tokens Support

Open the `next.config.mjs` file and update the configuration to support Spirit Design Tokens and Sass:

```ts
import type { NextConfig } from 'next';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const pathDir = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  transpilePackages: ['@alma-oss/spirit-web-react'],
  reactStrictMode: true,
  sassOptions: {
    implementation: 'sass-embedded',
    // Suppresses warnings related to the deprecated legacy JS API in Sass.
    silenceDeprecations: ['legacy-js-api'],
    includePaths: [
      path.join(pathDir, './node_modules'),
      path.join(pathDir, './node_modules/@alma-oss/spirit-design-tokens/scss'),
    ],
  },
};

export default nextConfig;
```

### Adding and Configure Global Styles

Create a file `src/app/globals.scss` and add the following import:

```scss
@forward '@alma-oss/spirit-web/scss';
```

### PostCSS Configuration

If you encounter the following warning:

`autoprefixer: start value has mixed support, consider using flex-start instead`

If you don't need to support older browsers (e.g. Internet Explorer 11), you can suppress this warning by customizing the PostCSS configuration.
The following configuration disables support for the outdated 2009 flexbox specification, which helps prevent compatibility warnings related to legacy flexbox syntax.

Create a `postcss.config.js` file in the root of your project with the following content:

```js
module.exports = {
  plugins: {
    autoprefixer: {
      flexbox: 'no-2009',
    },
  },
};
```

Alternatively, you can use a JSON configuration by creating a `postcss.config.json` file:

```json
{
  "plugins": {
    "autoprefixer": {
      "flexbox": "no-2009"
    }
  }
}
```

For more information see [Next.js PostCSS documentation][nextjs-postcss-documentation].

### Updating the Application Layout

Open `src/app/layout.tsx` and modify it as follows:

```tsx
import { ReactNode } from 'react';
import './globals.scss';

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
```

### Adding a Spirit Component

Open `src/app/page.tsx` and add a sample Spirit component:

```tsx
import { Heading } from '@alma-oss/spirit-web-react';
import { NextPage } from 'next';

const Home: NextPage = () => (
  <Heading elementType="h2" size="large">
    Hello Spirit Design System!
  </Heading>
);

export default Home;
```

### Running the Application

After completing the configuration please run the development server.
For instructions, see [Running the Development Server](#running-the-development-server).

Congratulation! The application will now be running at http://localhost:3000 and using the Spirit Design System.

[nextjs-postcss-documentation]: https://nextjs.org/docs/pages/building-your-application/configuring/post-css
[npm-error-enoworkspaces]: https://github.com/vercel/turborepo/issues/4183
[rebranding-spirit]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/design-tokens/README.md#rebranding-spirit
