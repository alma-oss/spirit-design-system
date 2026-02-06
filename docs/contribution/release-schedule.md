# Spirit Design System Release Schedule

This is a living document outlining the plan for previous, current, and future
major versions of the Spirit Design System.

| Release       | Status      | Initial release | Begin Active | Begin Maintenance | End of Life |
| ------------- | ----------- | --------------- | ------------ | ----------------- | ----------- |
| `main`        | unstable    | unstable        | unstable     | unstable          | unstable    |
| v0            | End of Life | 2021-09-20      | 2021-09-20   | 2023-07-21        | 2024-06-10  |
| v1 🌟 Aura    | End of Life | 2023-07-21      | 2023-07-21   | 2024-06-10        | 2024-10-17  |
| v2 🍃 Breeze  | End of Life | 2024-06-10      | 2024-06-10   | 2024-11-25        | 2026-01-08  |
| v3 ✨ Charm   | Maintenance | 2024-10-17      | 2024-11-25   | 2026-01-08        | -/-         |
| v4 🌈 Divine  | Active      | 2025-12-15      | 2026-01-08   | -/-               | -/-         |
| v5 💫 Essence | Unreleased  | -/-             | -/-          | -/-               | -/-         |

> Dates are subject to change

![schedule][release-schedule-static]

## Next Major Release Plans

👉 See [Releases in Jira Board][release-jira-board] and [Quarterly Goals][quarterly-goals] in the Notion.

## Release Phases

### Prerelease

The prerelease phase is intended to be the opportunity for early adopters,
library authors, and other strategic ecosystem partners to begin to evaluate and
integrate new changes into their codebases. For v3, this phase was more than a one month
long and spanned five prerelease/alpha releases. We hope to extend this timeframe
even further for our next major version.

### Active

Consuming projects should always aim to follow the Active release.

A release in the Active phase receives biweekly minor releases containing new
features and fixes. The work we deliver into `main` every day is considered
unstable. Almost every two weeks we package up these changes into a new minor version
that is published from `main` as the current Active version.

### Maintenance

For a release in the Maintenance phase, patch releases are published containing
security patches and critical bug fixes. When a version moves from Active to
Maintenance, consuming projects should begin migrating to the new Active major
version. During Maintenance we also consider adding non-critical bug fixes on an
ad hoc basis, by request only. To request a fix be back-ported to a Maintenance
release, please
[open an issue][spirit-jira-board] or let us know in [support Slack channel][spirit-support-slack-channel].

Changes required for critical security and bug fixes may lead to semver-major
changes landing within a release stream, such situations will be rare and will
land as semver-minor. Although, those changes should have a revert option
included.

## Release Cycle Duration

There is no fixed release lifetime yet.
However, based on our experience to date, we estimate the length of the **active phase** to be **between six months and a year**.
We anticipate that this life phase will be extended.

## Release Support Policy

We provide an active support for the current Active release and previous Maintenance release.

To get support for a specific version, please refer to the [support Slack channel][spirit-support-slack-channel].

## Release Names

To get more information about the release names, please refer to the [Release Names Decision][release-names-decision].

## Assets Managed Under This Release Schedule

This plan covers the design and development assets under maintenance of the
Spirit Design System core team. This includes the `@alma-oss/spirit-web`, `@alma-oss/spirit-web-react` and
`@alma-oss/spirit-design-tokens` packages, as well as all other packages within the
[`spirit` monorepo][spirit-github-monorepo].

This plan also includes all design guidance and design kit assets (figma, etc.)
present in the
[`spirit-docs-website`][spirit-docs] and
[`spirit-ui-kit`][spirit-figma]
repositories.

## Acknowledgements

This document was heavily inspired by the work of the
[NodeJS Release Working Group][node-js-release-working-group] and [Carbon Design System Release Schedule][carbon-release-schedule].

The schedule graph was generated using
[our fork][spirit-lts-schedule] of
[`nodejs/lts-schedule`][node-lts-schedule]

[carbon-release-schedule]: https://github.com/carbon-design-system/carbon/blob/main/docs/release-schedule.md
[node-js-release-working-group]: https://github.com/nodejs/release
[node-lts-schedule]: https://github.com/nodejs/lts-schedule
[release-jira-board]: https://jira.almacareer.tech/projects/DS?selectedItem=com.atlassian.jira.jira-projects-plugin%3Arelease-page&status=released-unreleased
[release-names-decision]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/decisions/007-release-names.md
[release-schedule-static]: https://raw.githubusercontent.com/alma-oss/spirit-design-system/refs/heads/main/static/release-schedule.svg
[spirit-docs]: https://spirit.design
[spirit-figma]: https://www.figma.com/design/w9Ca4hvkuYLshsrHu1bYwT/Spirit-UI-KIT?node-id=22776-26259&node-type=canvas&t=JIF1i6Yfp9rGUA35-0
[spirit-github-monorepo]: https://github.com/alma-oss/spirit-design-system
[spirit-jira-board]: https://jira.almacareer.tech/secure/RapidBoard.jspa?rapidView=366&projectKey=DS
[spirit-lts-schedule]: https://github.com/alma-oss/spirit-design-system/tree/main/scripts/lts-schedule
[spirit-support-slack-channel]: https://almamedia.slack.com/archives/C068XPSDWQN
[quarterly-goals]: https://www.notion.so/almacareer/Spirit-Design-System-Quarterly-Goals-878e92d5b74543039e513c0160fb9117
