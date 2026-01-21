# typescript-config-spirit

> TypeScript configuration and utilities for Spirit Design System.

## Getting Started

To install `typescript-config-spirit` in your project, you will need to run the
following command using [Yarn][yarn]:

```bash
yarn add typescript-config-spirit
```

## 👨‍💻 Usage

```json
// tsconfig.json
{
  "extends": "../../configs/typescript-config-spirit/base",
  "compilerOptions": {
    // ...
  }
}
```

It is worth noting that when you extend a `tsconfig.json` file, the properties in `compilerOptions` are merged.
And **when both files define the same property, the child `tsconfig.json` wins**.

However, this is not the case with `include` and `exclude`.
If you define them in the child `tsconfig.json` file, that **exact value will be used; it won’t be merged** with the value from the base `tsconfig.json` file.

### Base Configuration

> `typescript-config-spirit/base`

This configuration is the base TypeScript configuration.
It is fine to use this configuration when you need to transpile Node.js code.

### DOM Configuration

> `typescript-config-spirit/dom`

This configuration extends the base configuration.
It is fine to use this configuration for the code that is running in the DOM.

For most of the packages this configuration will be the best choice.

```json
// tsconfig.json
{
  "extends": "../../configs/typescript-config-spirit/dom",
  "exclude": ["./dist"],
  "include": ["./src/**/*", "./tests/**/*"]
}
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
