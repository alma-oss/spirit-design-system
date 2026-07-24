# Web CSS Feature Flag Cleanup

## When It Applies

Every app. Feature flags can remain in React `className`, static templates, project styles, Sass configuration, or
wrapper-package source even when the app does not import Spirit SCSS directly.

## Detection

```bash
rg 'spirit-feature-enable-v5|\$enable-v5-' <path> -g "*.{tsx,ts,jsx,js,html,twig,scss,sass,css}"
```

## Feature Flags to Remove

| Markup/CSS class                                              | Sass variable                                   | Recipe                                                   |
| ------------------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------- |
| `spirit-feature-enable-v5-tag-appearance`                     | `$enable-v5-tag-appearance`                     | Remove flag; Tag `inline-flex` appearance is now default |
| `spirit-feature-enable-v5-control-button-expanded-size-scale` | `$enable-v5-control-button-expanded-size-scale` | [controlbutton-size-scale](controlbutton-size-scale.md)  |
| `spirit-feature-enable-v5-container-block-formatting-context` | `$enable-v5-container-block-formatting-context` | Remove flag; Container now uses `display: flow-root`     |

These flags have no effect after upgrading to v5. Apply the matching recipe for each flag found.

## Agent Edits

The agent removes:

1. Class names from JSX `className`, HTML/Twig `class`, class-composition helpers, and tests/snapshots.
2. Sass variables from `@use ... with (...)`, configuration maps, local variable declarations, and forwarded
   configuration.
3. Empty className helpers/wrappers or Sass configuration blocks left by the removal.

Re-run detection after edits. A clean result is required.

## Report Guidance

- Status: `not-applicable` if no class or Sass flag is found.
- Status: `completed` after removing flags from markup, styles, configuration, and snapshots.
- Confidence: `high`.
