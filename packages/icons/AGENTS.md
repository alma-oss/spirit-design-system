# Spirit Icons Agent Instructions

## Package Folder

- `src/svg/` holds the SVG icons synchronized from the Figma Assets file (the `Brand=Spirit` variant).
  Never edit or add an icon by hand.
- `scripts/` holds the build verification, `dist/` is build output, and `types/icons.d.ts` is a tracked type stub for the tsconfig `paths` (do not delete it).

## Rules

- Synchronize icons with `yarn icons:sync` from the repository root. It needs `FIGMA_ACCESS_TOKEN` in the environment.
  Never write the token to a file, a commit, or a log.
- Removing or renaming an icon is a breaking change. Follow the `spirit:breaking-change-checklist` skill.
- Before finishing, run `yarn workspace @alma-oss/spirit-icons lint`, `types`, and `build`.
  The build runs `build:verify`.
