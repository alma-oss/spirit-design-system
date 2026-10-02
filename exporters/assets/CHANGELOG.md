# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.1.0 (2026-10-02)

### Features

- **exporter-assets:** add direct Figma icon synchronization ([8728204](https://github.com/alma-oss/spirit-design-system/commit/87282049048c8a1f2957f2d0bf3a93cc28df43e6))
- **exporter-assets:** discover opted-in repositories and confine outputs ([f53ab01](https://github.com/alma-oss/spirit-design-system/commit/f53ab01ebafa9ee82d752a70ba49842a1528f038))
- **exporter-assets:** make assets-sync git templates configurable ([1a4d69f](https://github.com/alma-oss/spirit-design-system/commit/1a4d69fe64c0712400cae88eb026b7669c177745))

### Bug Fixes

- **ci:** include Figma publish notes in the sync PR ([9888d29](https://github.com/alma-oss/spirit-design-system/commit/9888d29a993560cacb3a115df91a30e1db236f97))
- **exporter-assets:** authenticate git add on existing sync branches #DS-2804 ([41c4f05](https://github.com/alma-oss/spirit-design-system/commit/41c4f054af09db99526410fb18ba770776b220fc)), references [#DS-2804](https://github.com/alma-oss/spirit-design-system/issues/DS-2804)
- **exporter-assets:** authenticate promisor fetches #DS-2804 ([e635ab0](https://github.com/alma-oss/spirit-design-system/commit/e635ab0f5c671a16952e1c7c0260de433a53a8af)), references [#DS-2804](https://github.com/alma-oss/spirit-design-system/issues/DS-2804)
- **exporter-assets:** fully mirror Figma asset output ([bbf24de](https://github.com/alma-oss/spirit-design-system/commit/bbf24dec2a59893bcb832ef4412e88c3d30eb1be))
- **exporter-assets:** preserve asset sync pull requests ([6198542](https://github.com/alma-oss/spirit-design-system/commit/6198542cbcfd325acc3e966435055e04bdea531d))
- **exporter-assets:** request installation auth type from octokit ([3c56b00](https://github.com/alma-oss/spirit-design-system/commit/3c56b002a5ac5789665b06993025730789f5b4a6))
- **exporter-assets:** skip branded assets missing the requested brand ([68d822e](https://github.com/alma-oss/spirit-design-system/commit/68d822e1d974cb6130d613c678912e3000bde156))
- **exporter-assets:** support static configs and preserve PR commits ([00e4e4f](https://github.com/alma-oss/spirit-design-system/commit/00e4e4f66e429fea689069df4132254ad66c3057))

### Performance Improvements

- **exporter-assets:** skip clones and monorepo installs in assets-sync ([d38f4c2](https://github.com/alma-oss/spirit-design-system/commit/d38f4c21aece59d1c76d47e04422c88b6834d94b))

### Styles

- **exporters, docs, examples:** Fix docs by markdown linter ([1915a9f](https://github.com/alma-oss/spirit-design-system/commit/1915a9f53d47e6e6ecf8576fa870819a0b0dcae2)), references [#DS-1100](https://github.com/alma-oss/spirit-design-system/issues/DS-1100)

### Code Refactoring

- **exporter-assets:** Copy svg exporter to assets exporter ([771d2cd](https://github.com/alma-oss/spirit-design-system/commit/771d2cd3e80b8f9a0401b57d001ea7f1c488c089))

### Tests

- **exporter-assets:** collocate unit tests with source files ([5ceed7b](https://github.com/alma-oss/spirit-design-system/commit/5ceed7bdbbd553b95a37cfc502b7574309477d41))
