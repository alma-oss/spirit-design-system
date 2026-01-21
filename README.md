<div align="center">
<img src="https://github.com/alma-oss/spirit-design-system/blob/main/static/spirit.svg?raw=true" width="400" height="230" alt="Spirit Design System" />

### Spirit Design System

[![Maintained with Lerna][lerna-svg]][lerna]
[![Code Quality Checks][code-quality-checks-svg]][code-quality-checks]
[![Coverage Status][coverage-status-svg]][coverage-status]

Spirit is an open-source design system developed by [Alma Career (formerly LMC)][alma-career].

</div>

## Getting Started

See individual [packages](#packages) to learn how to get started.

## Packages

| Package name                                               | Description                                                   | Version                                                 |
| ---------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------- |
| [`@alma-oss/spirit-analytics`][packages-analytics]         | Analytic tools for Spirit Design System                       | [![@alma-oss/spirit-analytics][sa-badge]][sa-npm]       |
| [`@alma-oss/spirit-codemods`][packages-codemods]           | Codemod transforms for Spirit Design System version migration | [![@alma-oss/spirit-codemods][sc-badge]][sc-npm]        |
| [`@alma-oss/spirit-common`][packages-common]               | Common scripts for Spirit Design System                       | Private                                                 |
| [`@alma-oss/spirit-design-tokens`][packages-design-tokens] | Design tokens for Spirit Design System                        | [![@alma-oss/spirit-design-tokens][sdt-badge]][sdt-npm] |
| [`@alma-oss/spirit-icons`][packages-icons]                 | Icons for Spirit Design System                                | [![@alma-oss/spirit-icons][si-badge]][si-npm]           |
| [`@alma-oss/spirit-web`][packages-web]                     | CSS and vanilla JS implementation of Spirit Design System     | [![@alma-oss/spirit-web][sw-badge]][sw-npm]             |
| [`@alma-oss/spirit-web-react`][packages-web-react]         | React implementation of Spirit Design System components       | [![@alma-oss/spirit-web-react][swr-badge]][swr-npm]     |

<details>
<summary>Packages Before 🌈 Divine Release (v4)</summary>

## `lmc-eu` Scope Packages

| Package name                                                          | Description                                                   | Version                                                                |
| --------------------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`@lmc-eu/spirit-analytics`][lmc-eu-packages-analytics]               | Analytic tools for Spirit Design System                       | [![@lmc-eu/spirit-analytics][lmc-eu-sa-badge]][lmc-eu-sa-npm]          |
| [`@lmc-eu/spirit-codemods`][lmc-eu-packages-codemods]                 | Codemod transforms for Spirit Design System version migration | [![@lmc-eu/spirit-codemods][lmc-eu-sc-badge]][lmc-eu-sc-npm]           |
| [`@lmc-eu/spirit-common`][lmc-eu-packages-common]                     | Common scripts for Spirit Design System                       | Private                                                                |
| [`@lmc-eu/spirit-design-tokens`][lmc-eu-packages-design-tokens]       | Design tokens for Spirit Design System                        | [![@lmc-eu/spirit-design-tokens][lmc-eu-sdt-badge]][lmc-eu-sdt-npm]    |
| [`@lmc-eu/spirit-form-validations`][lmc-eu-packages-form-validations] | Form Validations for Spirit Design System                     | [![@lmc-eu/spirit-form-validations][lmc-eu-sfv-badge]][lmc-eu-sfv-npm] |
| [`@lmc-eu/spirit-icons`][lmc-eu-packages-icons]                       | Icons for Spirit Design System                                | [![@lmc-eu/spirit-icons][lmc-eu-si-badge]][lmc-eu-si-npm]              |
| [`@lmc-eu/spirit-web`][lmc-eu-packages-web]                           | CSS and vanilla JS implementation of Spirit Design System     | [![@lmc-eu/spirit-web][lmc-eu-sw-badge]][lmc-eu-sw-npm]                |
| [`@lmc-eu/spirit-web-react`][lmc-eu-packages-web-react]               | React implementation of Spirit Design System components       | [![@lmc-eu/spirit-web-react][lmc-eu-swr-badge]][lmc-eu-swr-npm]        |
| [`@lmc-eu/spirit-web-twig`][lmc-eu-packages-web-twig]                 | Twig implementation of Spirit Design System components        | [![@lmc-eu/spirit-web-twig][lmc-eu-swt-badge]][lmc-eu-swt-packagist]   |

</details>

## Development

### Prerequisites

- [NodeJS][nodejs]
- [Corepack][corepack]
- [Yarn][yarn]
- [Lerna][lerna]
- [Docker][docker]
- [Docker Compose][docker-compose]

### 🚀 Start Development

- `git clone ssh://git@github.com:alma-oss/spirit-design-system.git`
- `cd spirit-design-system`

Using Make (recommended):

- `make install`
- `make start`

or using Yarn:

- `corepack enable`
- `corepack install`
- `yarn install`
- `yarn start`

See [`package.json`][package.json] for all available tasks.

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide][contributing]! 👀

## 📝 License

See the [LICENSE][license] file for information.

[alma-career]: https://github.com/lmc-eu
[code-quality-checks]: https://github.com/alma-oss/spirit-design-system/actions
[code-quality-checks-svg]: https://github.com/alma-oss/spirit-design-system/actions/workflows/test.yaml/badge.svg?branch=main
[contributing]: https://github.com/alma-oss/spirit-design-system/blob/main/CONTRIBUTING.md
[coverage-status]: https://coveralls.io/github/lmc-eu/spirit-design-system?branch=main
[coverage-status-svg]: https://coveralls.io/repos/github/lmc-eu/spirit-design-system/badge.svg?branch=main
[corepack]: https://yarnpkg.com/corepack#installation
[docker]: https://www.docker.com
[docker-compose]: https://docs.docker.com/compose/
[lerna]: https://lerna.js.org
[lerna-svg]: https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg
[license]: https://github.com/alma-oss/spirit-design-system/blob/main/LICENSE.md
[nodejs]: https://nodejs.org
[packages-analytics]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/analytics
[packages-codemods]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/codemods
[packages-common]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/common
[packages-design-tokens]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/design-tokens
[packages-icons]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/icons
[packages-web]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web
[packages-web-react]: https://github.com/alma-oss/spirit-design-system/tree/main/packages/web-react
[package.json]: https://github.com/alma-oss/spirit-design-system/blob/main/package.json
[sa-badge]: https://img.shields.io/npm/v/%40alma-oss/spirit-analytics.svg?style=flat-square
[sa-npm]: https://www.npmjs.com/package/@alma-oss/spirit-analytics
[sc-badge]: https://img.shields.io/npm/v/%40alma-oss/spirit-codemods.svg?style=flat-square
[sc-npm]: https://www.npmjs.com/package/@alma-oss/spirit-codemods
[sdt-badge]: https://img.shields.io/npm/v/%40alma-oss/spirit-design-tokens.svg?style=flat-square
[sdt-npm]: https://www.npmjs.com/package/@alma-oss/spirit-design-tokens
[si-badge]: https://img.shields.io/npm/v/%40alma-oss/spirit-icons.svg?style=flat-square
[si-npm]: https://www.npmjs.com/package/@alma-oss/spirit-icons
[sw-badge]: https://img.shields.io/npm/v/%40alma-oss/spirit-web.svg?style=flat-square
[sw-npm]: https://www.npmjs.com/package/@alma-oss/spirit-web
[swr-badge]: https://img.shields.io/npm/v/%40alma-oss/spirit-web-react.svg?style=flat-square
[swr-npm]: https://www.npmjs.com/package/@alma-oss/spirit-web-react
[lmc-eu-packages-web-twig]: https://github.com/lmc-eu/spirit-design-system/tree/%40lmc-eu/spirit-web-twig%405.0.0/packages/web-twig
[lmc-eu-packages-analytics]: https://github.com/lmc-eu/spirit-design-system/tree/%40lmc-eu/spirit-analytics%401.0.17/packages/analytics
[lmc-eu-packages-codemods]: https://github.com/lmc-eu/spirit-design-system/tree/%40lmc-eu/spirit-codemods%401.7.2/packages/codemods
[lmc-eu-packages-common]: https://github.com/lmc-eu/spirit-design-system/tree/%40lmc-eu/spirit-common%400.4.4/packages/common
[lmc-eu-packages-design-tokens]: https://github.com/lmc-eu/spirit-design-system/tree/%40lmc-eu/spirit-design-tokens%403.7.4/packages/design-tokens
[lmc-eu-packages-form-validations]: https://github.com/lmc-eu/spirit-design-system/tree/%40lmc-eu/spirit-form-validations%402.1.5/packages/form-validations
[lmc-eu-packages-icons]: https://github.com/lmc-eu/spirit-design-system/tree/%40lmc-eu/spirit-icons%402.3.7/packages/icons
[lmc-eu-packages-web]: https://github.com/lmc-eu/spirit-design-system/tree/%40lmc-eu/spirit-web%403.23.0/packages/web
[lmc-eu-packages-web-react]: https://github.com/lmc-eu/spirit-design-system/tree/%40lmc-eu/spirit-web-react%403.25.0/packages/web-react
[lmc-eu-sa-badge]: https://img.shields.io/npm/v/%40lmc-eu/spirit-analytics.svg?style=flat-square
[lmc-eu-sa-npm]: https://www.npmjs.com/package/@lmc-eu/spirit-analytics
[lmc-eu-sc-badge]: https://img.shields.io/npm/v/%40lmc-eu/spirit-codemods.svg?style=flat-square
[lmc-eu-sc-npm]: https://www.npmjs.com/package/@lmc-eu/spirit-codemods
[lmc-eu-sdt-badge]: https://img.shields.io/npm/v/%40lmc-eu/spirit-design-tokens.svg?style=flat-square
[lmc-eu-sdt-npm]: https://www.npmjs.com/package/@lmc-eu/spirit-design-tokens
[lmc-eu-sfv-badge]: https://img.shields.io/npm/v/%40lmc-eu/spirit-form-validations.svg?style=flat-square
[lmc-eu-sfv-npm]: https://www.npmjs.com/package/@lmc-eu/spirit-form-validations
[lmc-eu-si-badge]: https://img.shields.io/npm/v/%40lmc-eu/spirit-icons.svg?style=flat-square
[lmc-eu-si-npm]: https://www.npmjs.com/package/@lmc-eu/spirit-icons
[lmc-eu-sw-badge]: https://img.shields.io/npm/v/%40lmc-eu/spirit-web.svg?style=flat-square
[lmc-eu-sw-npm]: https://www.npmjs.com/package/@lmc-eu/spirit-web
[lmc-eu-swr-badge]: https://img.shields.io/npm/v/%40lmc-eu/spirit-web-react.svg?style=flat-square
[lmc-eu-swr-npm]: https://www.npmjs.com/package/@lmc-eu/spirit-web-react
[lmc-eu-swt-badge]: https://img.shields.io/packagist/v/lmc/spirit-web-twig-bundle.svg?style=flat-square
[lmc-eu-swt-packagist]: https://packagist.org/packages/lmc/spirit-web-twig-bundle
[yarn]: https://yarnpkg.com
