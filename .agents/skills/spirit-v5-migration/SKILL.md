---
name: spirit:v5-migration
description: >-
  Migrates consumer apps from Spirit Design System v4 to v5, focusing on @alma-oss/spirit-web-react
  breaking APIs, codemods, feature flags, styles, markup, and design-token renames. Use when the user asks to
  upgrade to Spirit v5, migrate to v5, fix v5 breaking changes, or update deprecated Spirit React APIs.
category: spirit
displayName: Spirit v5 Migration
---

# Spirit v5 Migration

Use this skill when migrating a **consumer application** to Spirit Design System v5. The primary target is
`@alma-oss/spirit-web-react`. Always inspect application markup, styles, and token overrides too: React consumers can
still carry obsolete CSS feature flags or renamed design tokens without importing Spirit SCSS directly.

Canonical migration recipes live in [`changes/`](changes/). Each file represents one breaking-change topic.
Follow documented migration paths from those files first. **The agent performs all migrations** — codemods and
recipe edits alike. Do not leave work for the user unless you hit a hard blocker you cannot resolve (missing
source files, unrecoverable ambiguity after inspection). When uncertain, **attempt the migration anyway** and
mark the result `partial` with review locations in the report.

## Principles

- **Recipes first.** Read the matching `changes/*.md` file before editing code for that topic.
- **Codemods before hand-edits.** Run available codemods, then apply recipe steps for every remaining match.
- **Agent does the work.** Every recipe step is an agent task. Never list steps for the user to do later when
  you can edit the codebase yourself.
- **Attempt before blocking.** Prefer an applied edit with `partial` status over `blocked` with instructions.
- **Deterministic edits.** Prefer small, targeted changes over broad refactors.
- **Preserve style.** Match the target app's existing formatting and patterns.
- **Report always.** Create `spirit-v5-migration-report.md` in the migrated workspace root.

## Canonical Sources

| Source                  | Path                                                                                                                          |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| React migration guide   | [`docs/migrations/web-react/migration-v5.md`](../../../docs/migrations/web-react/migration-v5.md)                             |
| Web CSS migration guide | [`docs/migrations/web/migration-v5.md`](../../../docs/migrations/web/migration-v5.md)                                         |
| Design tokens guide     | [`docs/migrations/design-tokens/migration-v5.md`](../../../docs/migrations/design-tokens/migration-v5.md)                     |
| Codemods README         | [`packages/codemods/README.md`](../../../packages/codemods/README.md)                                                         |
| v5 web-react codemods   | [`packages/codemods/src/transforms/v5/web-react/README.md`](../../../packages/codemods/src/transforms/v5/web-react/README.md) |

---

## Workflow

### Step 0: Classify Target Profile

At discovery, classify how the repo consumes Spirit. This drives codemod flags, scan paths, and validation commands.

| Profile              | Signals                                               | Codemod `-s`                         | Migration recipe                                |
| -------------------- | ----------------------------------------------------- | ------------------------------------ | ----------------------------------------------- |
| **direct**           | Most files import `@alma-oss/spirit-web-react`        | omit                                 | standard workflow below                         |
| **wrapper-monorepo** | Most files import a wrapper design-system package     | `-s @org/design-system` on app paths | [wrapper-monorepo](changes/wrapper-monorepo.md) |
| **mixed**            | Wrapper lib imports Spirit directly; apps use wrapper | per-path (lib direct, apps `-s`)     | [wrapper-monorepo](changes/wrapper-monorepo.md) |

Set an argument array once when needed:

```bash
IMPORT_SOURCE_ARGS=(-s "@org/design-system") # replace with detected wrapper package
```

For direct imports, use an empty array: `IMPORT_SOURCE_ARGS=()`.

For **wrapper-monorepo** or **mixed** profiles, read [wrapper-monorepo](changes/wrapper-monorepo.md) and record:

- Wrapper package name (for `-s`)
- Library path(s) that import Spirit directly (codemods without `-s`)
- Consumer path(s) that import via the wrapper (codemods with `-s`)
- Validation commands from the repo's `package.json` / workspace scripts

### Step 1: Discover Scope

Identify the target app path(s), package versions, and Spirit packages in use:

```bash
# Package versions
rg "@alma-oss/spirit" package.json yarn.lock pnpm-lock.yaml package-lock.json 2>/dev/null

# Common v4 leftovers
rg "UNSTABLE_|FileUploader|hideOnCollapse|hasValidationStateIcon|formFieldMode|isFluid|isBlock|hasArrows|ScrollViewArrows|HeaderNav|HeaderDialog|ModalCloseButton|TooltipCloseButton|DrawerCloseButton" <target-path> -g "*.{tsx,ts,jsx,js}"

# Import sources (direct Spirit vs wrapper re-exports)
rg "from ['\"]@alma-oss/spirit-web-react" <target-path> -g "*.{tsx,ts,jsx,js}"
rg "from ['\"][^'\"]+" <target-path> -g "*.{tsx,ts,jsx,js}" | rg "design-system|spirit-web-react"

# Wrapper monorepo layout
rg "@alma-oss/spirit-web-react" package.json -g "package.json"
rg "from ['\"][^'\"]+" <target-path> -g "*.{tsx,ts}" | rg -v "@alma-oss/spirit-web-react" | head   # sample non-direct imports

# Heavy manual-migration signals
rg "UNSTABLE_Picker|FileUploader|UNSTABLE_SpiritHeader|SpiritHeader" <target-path> -g "*.{tsx,ts}"

# Feature flags in markup/styles and renamed design tokens
rg 'spirit-feature-enable-v5|\$enable-v5-' <target-path> -g "*.{tsx,ts,jsx,js,html,twig,scss,sass,css}"
rg "form-field-filled|component-header-item|component-button-(primary|secondary)" <target-path> -g "*.{scss,sass,css,ts,tsx,js,jsx,json}"
```

Confirm with the user:

| Input                   | Default                                                                    |
| ----------------------- | -------------------------------------------------------------------------- |
| Target path             | user-provided app root                                                     |
| Target profile          | auto-detect: `direct` \| `wrapper-monorepo` \| `mixed`                     |
| Packages to upgrade     | `@alma-oss/spirit-web-react` (+ `spirit-web` if CSS is imported directly)  |
| Import sources (`-s`)   | auto-detect wrapper package; see [Step 0](#step-0-classify-target-profile) |
| Node.js version         | ≥ 22 required                                                              |
| Run codemods            | yes, when recipes list them                                                |
| Visual snapshot updates | agent updates when migration causes expected output changes                |

### Step 2: Upgrade Dependencies

1. Bump Spirit packages to v5 in `package.json`.
2. Ensure Node.js ≥ 22 (`.nvmrc`, `engines`, CI).
3. Run the package manager install.
4. Fix compile-time errors from [removed exports](changes/general-upgrade-prerequisites.md) before component migrations.

### Step 3: Run Codemods

Run codemods from the **target app root**. Replace `<path>` with the source directory (usually `src`).

Codemods match `@alma-oss/spirit-web-react` by default. When the app imports Spirit through a wrapper re-export package, pass `-s` with that package name on **every** run against those paths. See [Codemods README](../../../packages/codemods/README.md) and [wrapper-monorepo](changes/wrapper-monorepo.md).

**Wrapper monorepo:** run codemods on the wrapper lib first (direct Spirit imports), then on consumer paths with `-s`. See [wrapper-monorepo](changes/wrapper-monorepo.md).

**Pre-flight:** transform one known file before batch runs; if output is `0 ok` with no diff, verify the codemods package built correctly (`dist/helpers` present).

Omit `-s` when the app imports `@alma-oss/spirit-web-react` directly. When using a wrapper package:

```bash
IMPORT_SOURCE_ARGS=(-s "@my-org/design-system")
```

Run each transform explicitly (recommended):

```bash
npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/collapse-isDisposable-prop
npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/alert-link-color-inherit
npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/validation-state-icon-prop
npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/flex-direction-values
npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/forms-isFluid-prop-removal
npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/unstable-fileupload-component-name
npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/unstable-file-component-name
npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/close-buttons-to-close-button
npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/drawer-panel-close-button-composition
npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/button-icon-margin-removal
npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/scrollview-arrows-to-controls
npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/header-unstable-to-stable
npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/item-props
npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/stack-wrap-children-in-stack-item
npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/tag-controlbutton-size
# Optional — only if preserving previous ControlButton heights:
# Do not combine blindly with tag-controlbutton-size; reconcile nested Tag controls per both recipes.
# npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t v5/web-react/control-button-size-scale
```

Or loop over transforms (pass `-t "$transform"` per iteration):

```bash
set -e

TRANSFORMS=(
  v5/web-react/collapse-isDisposable-prop
  v5/web-react/alert-link-color-inherit
  v5/web-react/validation-state-icon-prop
  v5/web-react/flex-direction-values
  v5/web-react/forms-isFluid-prop-removal
  v5/web-react/unstable-fileupload-component-name
  v5/web-react/unstable-file-component-name
  v5/web-react/close-buttons-to-close-button
  v5/web-react/drawer-panel-close-button-composition
  v5/web-react/button-icon-margin-removal
  v5/web-react/scrollview-arrows-to-controls
  v5/web-react/header-unstable-to-stable
  v5/web-react/item-props
  v5/web-react/stack-wrap-children-in-stack-item
  v5/web-react/tag-controlbutton-size
)
for transform in "${TRANSFORMS[@]}"; do
  npx @alma-oss/spirit-codemods -p <path> "${IMPORT_SOURCE_ARGS[@]}" -t "$transform"
done
```

Use `IMPORT_SOURCE_ARGS=()` when the app imports `@alma-oss/spirit-web-react` directly.

Review each codemod diff. For skipped patterns (spreads, conditional JSX, `PropsProvider`), apply the matching
recipe edits yourself — do not defer them.

### Step 4: Apply All Recipe Steps

Process every recipe in [Recipe Index](#recipe-index). For each topic:

1. Read the recipe file.
2. Search the target app for detection patterns.
3. **Apply all edits** — codemod gaps, recipe steps, snapshot/CSS updates, and complex migrations (FileUploader,
   old Header, Navigation slots, form-field markup).
4. Mark `not-applicable` only when detection finds zero matches.
5. Record status in the migration report.

There are no user-only migration steps. Recipes labeled `agent` in the index have no codemod but still require
agent edits in the target codebase.

### Step 5: Cross-Check Markup, Styles, Flags, and Tokens

Always run all cross-cutting recipes, even for React-only apps:

1. [`changes/web-markup-and-css.md`](changes/web-markup-and-css.md) — migrate raw Spirit classes, templates, and
   custom component style overrides when present.
2. [`changes/web-css-cross-check.md`](changes/web-css-cross-check.md) — remove obsolete feature-flag classes from
   JSX/HTML/templates and Sass variables from styles/configuration.
3. [`changes/design-token-renames.md`](changes/design-token-renames.md) — migrate SCSS variables, CSS custom
   properties, JavaScript exports, and Pagination overrides.

### Step 6: Validate

Use the target app's configured scripts and package manager. Inspect `package.json`, workspace configuration,
`Makefile`, Docker Compose / CI docs, and contribution guides first; do not invent commands. Prefer the same
entry points the app uses in CI (for example `make test-e2e` or a Docker-wrapped Playwright target when host
`yarn test:e2e` is not how that repo runs E2E). For wrapper monorepos, validate the design-system lib before
downstream plugins.

```bash
# Format changed files, then lint the result (when configured)
yarn format
yarn lint

# Typecheck / build and tests (when configured)
yarn types
yarn build
yarn test

# Snapshot tests — update when migration causes expected output changes
yarn test -u

# Relevant visual, end-to-end, and accessibility suites (when configured).
# Use Make/Docker wrappers when that is the project's documented runner.
yarn test:e2e   # or: make test-e2e / docker compose … — follow the target repo
yarn test:a11y
```

Use the equivalent `npm`, `pnpm`, workspace, Make, Docker, or repository-specific commands. Run formatters and
linters only when they are present and configured, but record missing scripts as `not-configured` rather than
silently skipping them.

**Wrapper monorepo:** run types/tests on the wrapper package, then on downstream workspaces that had the heaviest migrations (`yarn workspace <name> test` / `test:unit` as defined in the repo).

Re-run targeted searches for leftover v4 APIs, feature flags, renamed tokens, and unresolved codemod scaffolding:

```bash
rg 'TODO_drawer(IsOpen|Id|OnClose)|spirit-feature-enable-v5|\$enable-v5-' <target-path>
```

### Step 7: Write Migration Report

Create `spirit-v5-migration-report.md` in the **target workspace root** using the [report template](#required-migration-report).

---

## Recipe Index

| Recipe                                                                    | Codemod  | Handler       |
| ------------------------------------------------------------------------- | -------- | ------------- |
| [wrapper-monorepo](changes/wrapper-monorepo.md)                           | —        | agent         |
| [general-upgrade-prerequisites](changes/general-upgrade-prerequisites.md) | —        | agent         |
| [design-token-renames](changes/design-token-renames.md)                   | —        | agent         |
| [alert-link-color](changes/alert-link-color.md)                           | yes      | codemod+agent |
| [dropdown-dialog-role](changes/dropdown-dialog-role.md)                   | —        | agent         |
| [collapse-is-disposable](changes/collapse-is-disposable.md)               | yes      | codemod       |
| [checkbox-composition](changes/checkbox-composition.md)                   | —        | agent         |
| [radio-composition](changes/radio-composition.md)                         | —        | agent         |
| [toggle-composition](changes/toggle-composition.md)                       | —        | agent         |
| [close-button-unification](changes/close-button-unification.md)           | yes      | codemod+agent |
| [drawer-panel-composition](changes/drawer-panel-composition.md)           | partial  | codemod+agent |
| [flex-direction-values](changes/flex-direction-values.md)                 | yes      | codemod       |
| [forms-is-fluid-removal](changes/forms-is-fluid-removal.md)               | yes      | codemod       |
| [unstable-picker](changes/unstable-picker.md)                             | partial  | codemod+agent |
| [fileupload-stabilization](changes/fileupload-stabilization.md)           | partial  | codemod+agent |
| [button-icon-spacing](changes/button-icon-spacing.md)                     | yes      | codemod       |
| [button-is-block-removal](changes/button-is-block-removal.md)             | —        | agent         |
| [scrollview-controls-rename](changes/scrollview-controls-rename.md)       | yes      | codemod       |
| [tag-controlbutton-size](changes/tag-controlbutton-size.md)               | yes      | codemod+agent |
| [header-stabilization](changes/header-stabilization.md)                   | partial  | codemod+agent |
| [item-composable-api](changes/item-composable-api.md)                     | yes      | codemod+agent |
| [stack-stackitem-dividers](changes/stack-stackitem-dividers.md)           | yes      | codemod+agent |
| [controlbutton-size-scale](changes/controlbutton-size-scale.md)           | optional | codemod+agent |
| [validationtext-api](changes/validationtext-api.md)                       | yes      | codemod+agent |
| [success-state-icons](changes/success-state-icons.md)                     | —        | agent         |
| [navigation-slots](changes/navigation-slots.md)                           | —        | agent         |
| [web-markup-and-css](changes/web-markup-and-css.md)                       | —        | agent         |
| [web-css-cross-check](changes/web-css-cross-check.md)                     | —        | agent         |

---

## Confidence Model

| Level    | When to use                                                                   |
| -------- | ----------------------------------------------------------------------------- |
| `high`   | Codemod applied cleanly or agent edit with a single deterministic replacement |
| `medium` | Codemod with skipped cases the agent patched, or edit with clear before/after |
| `low`    | Complex composition the agent migrated but needs human visual/a11y review     |

---

## Required Migration Report

Create a report file in the workspace root named:

`spirit-v5-migration-report.md`

```markdown
# Spirit v4 -> v5 Migration Report

## Scope

- Target: <folders/packages migrated>
- Date: <YYYY-MM-DD>
- Spirit packages upgraded: <list>
- Node.js version: <version>
- Target profile: `direct` | `wrapper-monorepo` | `mixed`
- Wrapper package (if any): <package name>
- Import indirection: `direct` | `wrapper` | `mixed`
- Codemods effective: `yes` | `no` | `partial`

## Migration Results

### <recipe name from changes/\*.md>

- Status: `completed` | `partial` | `not-applicable` | `blocked`
- Files updated: <number>
- Confidence: `high` | `medium` | `low`
- Medium/low review locations:
  - `<path>:<line>` - <why review is needed>
- Notes: <key decisions, caveats>
- Remaining review (if any):
  - `<path>:<line>` - <what the user should visually verify after agent edits>

<!-- Repeat for each processed recipe -->

## Validation

- [ ] `yarn build` (or equivalent) passed
- [ ] Dependency install passed; executed Spirit/codemod versions recorded
- [ ] Formatter passed (`not-configured` if absent)
- [ ] Linter passed (`not-configured` if absent)
- [ ] Typecheck passed (`not-configured` if absent)
- [ ] Unit tests passed
- [ ] Snapshot tests reviewed/updated
- [ ] Relevant visual/e2e/a11y checks passed (`not-configured` if absent)
- [ ] Leftover v4 API search clean
- [ ] Feature-flag and renamed-token searches clean
- [ ] No unresolved codemod `TODO_*` placeholders

## Summary

- Total migrations processed: <number>
- Completed: <number>
- Partial: <number>
- Not applicable: <number>
- Blocked: <number>
- Total files updated: <number>
```

## Handling Hard Blockers

Use `blocked` only when the agent **cannot** edit the codebase — for example the target path is missing,
required business logic is outside the repo, or repeated build failures cannot be resolved.

When a recipe has no codemod:

1. **Apply the recipe edits yourself** in the target codebase.
2. Run build/tests and fix follow-on errors in the same session.
3. Mark `partial` with review locations when the migration is applied but needs visual verification.
4. Mark `blocked` only with a concrete reason the agent could not proceed, not because the task is complex.
