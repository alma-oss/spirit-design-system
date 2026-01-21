# Experimental Code

Date: 2024-06-03

Status: proposed

## Context

The team occasionally authors code or accepts contributions, that are considered experimental or unstable.
The goal for this code is to ship it as unstable for sponsor products to leverage.
During this time, the team can get feedback on what is working and what does not work so that changes can be made before an official release.

## Decision

Experimental code is made available in the following ways:

- Components and exports prefixed with `UNSTABLE_`
- Feature flags

In all cases, experimental code should be treated as unstable and can change between release versions for the package that it is being imported from.

We decided to use the `UNSTABLE_` prefix for experimental or unstable exports.

We also decided to use feature flags for some packages. These feature flags enable new behavior and styling, allowing you to opt-in to new breaking changes while remaining on the current major version.

New experimental functionality can sometimes be added without the need for an `UNSTABLE_` export or a feature flag.
Oftentimes this ends up being a new prop on a component.

## Consequences

For teams using these features, they will need to import the functionality by using the `UNSTABLE_` prefix.

The documentation associated with experimental prop (TypeScript types, Storybook controls, etc.) will state that it's experimental, mainly in th component README.

The API is not fixed and is likely to change.
The API is not bound by semver. The component, export, feature, etc. may change, be renamed, or removed in the future without warning.

Over time it becomes apparent an experimental API has stabilized and suits the needs of most users. If it isn't a breaking change, and there hasn't been much movement, it can be moved from "experimental" status to "stable".

Note: Details on how to document experimental components and exports prefixed with `UNSTABLE_` can be found in the [documentation][docs-experimental-code].

[docs-experimental-code]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/contribution/experimental-code.md
