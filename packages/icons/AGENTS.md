# Spirit Icons Agent Instructions

## Package Folder

- `src/svg/` holds the SVG icons synchronized from the Figma Assets file (the `Brand=Spirit` variant).
  Never edit or add an icon by hand.
- `scripts/` holds the build verification and `types/icons.d.ts` is a tracked type stub for the tsconfig `paths` (do not delete it).

## Rules

- Do not run `yarn icons:sync` on your own. It overwrites `src/svg/` with the current Figma state, including unreleased icons.
  The Sync Assets workflow does it.
- Removing or renaming an icon is a breaking change. Follow the `spirit:breaking-change-checklist` skill.
- Before finishing, run `yarn workspace @alma-oss/spirit-icons lint`, `types`, and `build`.
  The build runs `build:verify`.
