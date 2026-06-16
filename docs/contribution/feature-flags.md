# Feature Flags

## Table of Contents

- [Current feature flags](#current-feature-flags)
- [Turning on feature flags in SASS](#turning-on-feature-flags-in-sass)

The Spirit Design System codebase ships with a number of feature flags. These feature
flags enable new behavior and styling, allowing you to opt-in to new (and
sometimes breaking) changes while using the current version. A feature flag may
be configured in React, SASS, or both.

This section documents each feature flag that is available and how to configure it.
Folders and stories within this section in Storybook show components with all feature flags turned on.

## Current Feature Flags

Feature flags prefixed with `enable-*` contain features we'd like consuming projects to
test and give us feedback on. It will be made by default in the version specified in the name.
In most of the cases these features will be breaking changes - logically or visually.
They're generally stable and unlikely to change but may change based on your feedback.
We just do not want to break your application or design without your consent.

Flags prefixed with `enable-v#-*` will be removed in the next major version and their behavior will be made the default.

For more details on this approach, see the
[feature flag documentation][feature-flag-documentation]
in the Spirit Design System monorepo.

| Flag                                           | Description                                     | Default | SASS flag                                       |
| ---------------------------------------------- | ----------------------------------------------- | ------- | ----------------------------------------------- |
| `enable-v5-container-block-formatting-context` | Enforce creating a new block formatting context | `false` | `$enable-v5-container-block-formatting-context` |

## Turning on Feature Flags in SASS

In SASS, you can enable feature flags in any of your stylesheets. Most often
this is done at the root/entrypoint stylesheet.
You can enable or disable them by loading
the `feature-flags` module with a configuration.
You have to do this **before** loading any other Spirit Web SCSS file.

Example with fictional feature flag to enable fullscreen modal:

```sass
@use '~@alma-oss/spirit-web/scss/settings/feature-flags' with (
  $enable-modal-fullscreen: true
);

@use '~@alma-oss/spirit-web/scss/foundation';
```

Every feature flag should also provide a class selector that can be used to enable or disable the feature.
You can use this class if you want to limit the usage of the feature to a specific part of your application.
Place the class on any parent element of the component you want to enable the feature for.

Example:

```html
<body class="spirit-feature-enable-modal-fullscreen">
  <!-- … -->
  <div class="Modal">
    <!-- … -->
  </div>
</body>
```

[feature-flag-documentation]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/contribution/experimental-code.md#feature-flags
