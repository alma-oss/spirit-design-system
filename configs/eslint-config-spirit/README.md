# eslint-config-spirit

> ESLint configuration for Spirit Design System

## Getting Started

To install `eslint-config-spirit` in your project, you will need to run the
following command using [Yarn][yarn]:

```bash
yarn add eslint-config-spirit
```

## 🚀 Usage

You can use `eslint-config-spirit` in your project by extending it in your
`eslint` configuration. For example, if we had an `.eslintrc` file:

```js
const eslintConfig = require('eslint-config-spirit');

module.exports = {
  ...eslintConfig,
};
```

### 💅 Style

Code formatting ensures consistency across your codebase.
This config provides complementary style configurations that work alongside the base ESLint
rules to handle formatting concerns like indentation, spacing, and code structure.

> \[!NOTE]
> The base `eslint-config-spirit` configuration does not include code
> formatting rules. You must choose one of the two style rulesets below.

#### Stylistic

Use `eslint-config-spirit/style` to enable code styling using [Stylistic ESLint plugin][eslint-stylistic].

This configuration provides granular control over formatting rules while maintaining consistency.

For example:

- indentation,
- spacing
- quotes
- dangling commas
- multi-line comments
- line length limit
- etc.

Choose this if you want to customize specific style rules or don't want to add Prettier as a dependency.

```js
const eslintConfig = require('eslint-config-spirit');
const eslintConfigStyle = require('eslint-config-spirit/style');

module.exports = {
  ...eslintConfig,
  ...eslintConfigStyle,
};
```

#### Prettier

Use `eslint-config-spirit/prettier` to enable code styling using [Prettier ESLint plugin][eslint-prettier].

This configuration delegates all formatting to Prettier's opinionated rules.
Choose this if you prefer a zero-configuration approach or are already using Prettier in your project.
Note that this requires Prettier as a peer dependency.

**Prerequisites:**

- Requires `prettier` installed as a peer dependency

```js
const eslintConfig = require('eslint-config-spirit');
const eslintConfigPrettier = require('eslint-config-spirit/prettier');

module.exports = {
  ...eslintConfig,
  ...eslintConfigPrettier,
};
```

#### Switching Between Style Configurations

**Important:** Do not use both style configurations simultaneously.
They may conflict with each other.
If switching from one to another, ensure you remove the previous style configuration
from your ESLint setup.

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide][contributing]! 👀

## 📝 License

Licensed under the [MIT][license].

[contributing]: https://github.com/alma-oss/spirit-design-system/blob/main/CONTRIBUTING.md
[eslint-prettier]: https://prettier.io/docs/integrating-with-linters
[eslint-stylistic]: https://eslint.style/
[license]: https://github.com/alma-oss/spirit-design-system/blob/main/LICENSE.md
[yarn]: https://yarnpkg.com/en/
