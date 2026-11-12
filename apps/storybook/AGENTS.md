# Spirit Storybook Agent Instructions

## App Folder

- Component stories live next to their component in `packages/web-react/src/components/<Component>/stories/`.
  This app only holds the Storybook configuration, decorators, and theme.
- Untracked `.story-ui*` and `stories/` folders are local experiments. Do not commit or tidy them.

## Rules

- The dev server runs on port 6006 (`yarn workspace @alma-oss/spirit-storybook start`). Reuse it. Do not kill it.
- After a visual change, check the affected stories in Storybook before finishing.
