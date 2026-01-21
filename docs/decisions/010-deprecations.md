# Deprecations

Date: 2024-11-18

Status: proposed

## Context

Starting the development of our design system from scratch, we had been using version 0 for a long time.
As [SEMVER suggests][semver-zero-version], we wanted to communicate to our users that the design system was at an early stage and any feature was not considered stable.
However, from the time our users started to use the design system and tested it, they wanted the components that would not change under the hands.
They wanted the API to be more stable and predictable.

Starting the first production usage of the design system, we had to stabilize the API and find another way how to further improve and develop our components, but without breaking the existing API.

So, we began with the research on how other libraries are solving this problem.
In various libraries like ESLint or [Twig][twig-deprecated] we have found the concept of deprecations.

This suits well to our needs, because we can mark the features we want to change or remove in the future and give our users a clear path how to migrate to the new version.

## Decision

Every feature that will significantly change or be removed in the next major version must be marked as deprecated.

We will implement the following deprecation strategy:

1. All deprecations must use warning messages in development environments
2. Warnings must be disabled in production environments
3. Each deprecation warning must include:
   - What is being deprecated
   - When it will be removed (usually the next major version)
   - What to use instead
4. Deprecation warnings will be shown in the browser console or the terminal

## Consequences

We will mark any feature that will be considered as a breaking change as deprecated.
We will maintain DEPRECATIONS-v\*.md files for each major version documenting all deprecations.
We will include a deprecation notice in the commit message as well as in the release notes.
We will provide a [migration guides][migration-guides] for each deprecation.
There will be a "Deprecations" section in each package README.md file pointing to the deprecations list.
When there will be a deprecation notice in the component's README file it will be pointing to the related deprecation notice in the deprecations list mentioned above.
Developers will have clear visibility of deprecated features during development.
Production builds won't be impacted by deprecation warnings.
Migration to new versions will be easier with clear upgrade paths.
Testing environments may need to handle warning suppression.
Additional maintenance effort is required to keep deprecation documentation up to date.

### Breaking Changes Without Deprecation

When delivering a new Major version, deprecating some features may not be possible or there will be a very short period to adapt.
In such cases, the breaking changes can be introduced without deprecation as a standard part of the major version upgrade.
We consider there is a no less than 1 month period between the release of the deprecation notice and the release of the new major version.
When the gap is longer, we should deprecate the feature first.

[migration-guides]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/migrations/README.md
[semver-zero-version]: https://semver.org/#spec-item-4
[twig-deprecated]: https://twig.symfony.com/doc/3.x/tags/deprecated.html
