# jest-config-spirit

> Jest configuration and preset for Spirit Design System

## Getting Started

This preset is part of this monorepo only and thus it is accessible for every package.

To install `jest-config-spirit` in your project, you will need to run the following command using [Yarn][yarn]:

```bash
yarn add jest-config-spirit
```

## ⚙️ Configurations

### `jest-preset-spirit/node`

The default Jest configuration for Node.js projects.

### `jest-preset-spirit/jsdom`

The extension of the default preset for projects that require a browser-like (DOM) environment.

## 🚀 Usage

```js
// jest.config.js

const config = {
  preset: 'jest-config-spirit/jsdom',
};

export default config;
```

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide][contributing]! 👀

## 📝 License

Licensed under the [MIT][license].

[yarn]: https://yarnpkg.com/en/
[contributing]: https://github.com/alma-oss/spirit-design-system/blob/main/CONTRIBUTING.md
[license]: https://github.com/alma-oss/spirit-design-system/blob/main/LICENSE.md
