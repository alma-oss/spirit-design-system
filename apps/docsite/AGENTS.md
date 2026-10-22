# Docsite Agent Instructions

## Docsite Rules

- Build with `@alma-oss/spirit-web-react` components, their props, and composition first. Custom CSS covers only what props cannot express. `UNSAFE_className` is a last resort for an API gap named in the [Known Spirit Limits][docsite-limits].
- If Spirit has no component or prop for a need, do not build a local substitute or restyle Spirit from the docsite. Name the gap and ask whether to add it to Spirit as `UNSTABLE_*`.
- Docsite styles are plain global SCSS with PascalCase BEM (`import './Hero.scss'`). Do not add CSS modules. A stylesheet targets only its own block, modifiers, and elements.
- Do not drop existing visuals (section rails, top rule, animations) because Spirit cannot express them. Keep about a 99% visual match unless the user accepts a difference.
- Delete unused components. Do not park experiments in the tree.
- The dev server runs on port 4321 (`yarn start`). Reuse it. Do not kill it.
- Before finishing, run `yarn workspace @alma-oss/spirit-docsite test`. It runs lint, unit tests, and types.
- Do not commit or push unless the user asks. Commit messages and attribution follow the [Git Workflow Guidelines][agents-git-workflow].
- Record a convention the user confirms in the same turn, in the matching docsite skill, or in this file if it applies to every docsite edit. Do not keep a place for unconfirmed lessons.

## Docsite Skills

- `/spirit:docsite-composition`: building or refactoring any docsite page, section, or component in TSX, assets, and content.
- `/spirit:docsite-styles`: writing or reviewing any docsite SCSS.

[agents-git-workflow]: ../../.agents/instructions/git-workflow.md
[docsite-limits]: ../../.agents/skills/docsite-composition/SKILL.md#known-spirit-limits
