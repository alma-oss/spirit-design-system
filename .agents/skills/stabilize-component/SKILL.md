---
name: spirit:stabilize-component
description: >-
  Stabilize an experimental Spirit component by promoting UNSTABLE_X to X across web-react (React) and web
  (vanilla SCSS/JS). Covers folder/identifier renames, exports, docsite categories and slugs, stories, tests,
  e2e snapshots, rename codemods, migration guides, and removal of any superseded component. Use when the user
  asks to stabilize or graduate a component (for example promoting UNSTABLE_X to its stable name).
category: spirit
displayName: Spirit Component Stabilization
---

# Spirit Component Stabilization

Use this skill when promoting an **experimental** component from its `UNSTABLE_` prefix to the **stable** name
(for example `UNSTABLE_FileUpload` → `FileUpload`, `UNSTABLE_File` → `File`) across both Spirit packages, and
when a stabilization also **removes** a now-superseded component.

Do **not** rely on hard-coded links to specific source files in this skill: components move and get renamed
over time. Instead, search current code and git history by pattern (`UNSTABLE_`, `componentCategories`,
`componentNameToSlug`, `useDeprecationMessage`, `migration-`).

**Do not copy-paste example commit hashes** as if they were the canonical migration. Always discover fresh
precedents with git.

## Proven Historical Patterns (from Git History)

Find precedents yourself—use the same steps every time:

1. List recent stabilization work: `git log --oneline --all | grep -iE 'stabili|UNSTABLE'`.
2. Open commits whose messages mention `stabilize`, `UNSTABLE`, or `BREAKING CHANGE`.
3. Compare the touched files per package: component folder rename, `index.ts`/`index.scss` exports, docsite
   categories/slugs, stories, tests, e2e snapshots, codemods, migration docs.
4. If the stabilization removes an old component, inspect how its files, exports, deprecations, and docs were
   deleted in the same change.

### Template (what to Record After You Inspect Git)

Use this as private notes or in the PR description—not as permanent skill text with frozen SHAs:

```text
Stabilization scope:
- Component(s): UNSTABLE_X → X (…)
- Removed component (if any): …
- git log inspected: …
- Pattern observed: [ ] web-react rename [ ] web rename [ ] exports [ ] docsite category/slug
  [ ] stories [ ] storybook title Experimental → Components [ ] tests [ ] e2e snapshots [ ] codemods [ ] migration docs [ ] removal cleanup
```

What good stabilization commits usually include:

1. Folder + file rename dropping the `UNSTABLE_` prefix (preserve git history with renames).
2. Identifier/type renames (`UnstableXProps` → `XProps`, `UNSTABLE_X` → `X`).
3. Barrel export updates in both packages.
4. Docsite category and slug updates (drop the unstable mapping).
5. Stories, demos, tests, and e2e snapshots aligned to the stable name; Storybook `meta.title` moved from
   `Experimental/` to `Components/`.
6. Rename codemods + fixtures + README entry so consumers can migrate automatically.
7. Migration guide entries in both packages.
8. Removal of any superseded component (files, exports, deprecations, docs).

## Commit Scoping

The repo **commitlint** config allows one **scope** per commit. A stabilization usually spans several scopes,
so split into separate commits, e.g.:

- `feat(web-react)!: stabilize X and Y, remove Z #DS-XXXX`
- `feat(web)!: stabilize X and Y, remove Z #DS-XXXX`
- `feat(codemods): add X and Y stabilization codemods #DS-XXXX`
- `docs(web, web-react): add X migration guide #DS-XXXX`

Use breaking-change style (`!` + `BREAKING CHANGE:` footer) because dropping the `UNSTABLE_` export and
removing a component are breaking.

## Web-React

Promote `packages/web-react/src/components/UNSTABLE_X/` → `packages/web-react/src/components/X/`.

1. **Rename folder and files** with `git mv` so history follows (`UNSTABLE_X.tsx` → `X.tsx`,
   `__tests__/UNSTABLE_X.test.tsx` → `__tests__/X.test.tsx`, stories, demos, hooks, `README.md`,
   `index.html`, `constants.ts`, `types.ts`).
2. **Rename identifiers and types** everywhere: component symbols (`UNSTABLE_X` → `X`), prop/type names
   (`UnstableXProps` → `XProps`, `UnstableXItem` → `XItem`), context, hooks, and internal references.
3. **Update the barrel** `packages/web-react/src/components/index.ts`: replace
   `export * from './UNSTABLE_X'` with `export * from './X'`, keeping the list alphabetised (stable names
   sort separately from the `UNSTABLE_` block).
4. **Update package `exports`** in `packages/web-react/package.json`: replace the `./components/UNSTABLE_X`
   entry with `./components/X`, matching the shape of neighbouring entries
   (`types`/`development`/`production`/`import`/`require`/`default`). Keep changes scoped to the stabilized
   component; do not regenerate every export unless that is the explicit intent.
5. **Docsite category + slug** in `apps/docsite/src/domains/components/constants/componentCategories.ts`:
   move the component into its stable category group and remove the `['UNSTABLE_X', 'unstable-x']` slug
   mapping. Update `componentSlug` tests (`componentNameToSlug` / slug→name) accordingly.
6. **Stories** under `docs/stories/examples/` and the component `stories/`: rename files, drop the
   `UNSTABLE_` prefix in titles/`category`, and remove unstable tags/flags. In Storybook `meta.title`,
   move the component from the **Experimental** sidebar group to **Components**: change
   `'Experimental/UNSTABLE_X'` or `'Experimental/X'` to `'Components/X'` (for example
   `'Experimental/FileUpload'` → `'Components/FileUpload'`). Stable components use the `Components/`
   prefix; only still-experimental ones stay under `Experimental/`.
7. **Demo `index.html`**: remove `isUnstable=true` from the demo layout invocation.
8. **Tests**: update describe/it names and imports to the stable API; keep coverage for hooks and a11y.

## Web

Promote `packages/web/src/scss/components/UNSTABLE_X/` → `packages/web/src/scss/components/X/`.

1. **Rename folder and partials** with `git mv`: drop the `UNSTABLE_` prefix from the folder and from every
   `_UNSTABLE_*` SCSS partial inside it (main block and subpartials alike). Move supporting files with the
   folder (`_theme.scss`, `README.md`, `index.html`, `index.scss`).
2. **Update SCSS class/selector names** inside the partials to drop the `UNSTABLE_`/`Unstable` prefix.
3. **Update `packages/web/src/scss/components/index.scss`** to forward the stable folder and remove the old
   `UNSTABLE_X` forward.
4. **Update shared tools** that reference the component (e.g. `src/scss/tools/_form-fields.scss`).
5. **Demo `index.html`**: remove `isUnstable=true` from the `web/layout/default` partial call.
6. If a JS plugin is involved, mirror renames in `src/js/` and the `index.esm.ts` / `index.umd.ts` exports.

## Codemods (consumer Migration)

Add **rename codemods** under the current major's transforms directory so consumers move from `UNSTABLE_X` to
`X` automatically. Discover the active version directory first
(`ls packages/codemods/src/transforms`) and add to the latest one rather than hard-coding a version.

1. Create `packages/codemods/src/transforms/<version>/web-react/unstable-x-component-name.ts`:
   - use the shared `renameComponent` helper for JSX tags + imports,
   - map related identifiers/types via a `Record<string, string>` (`UnstableXProps` → `XProps`),
   - rewrite import source strings that still contain `UNSTABLE_X`,
   - return `removeParentheses(root.toSource({ quote: 'single' }))`.
2. Add fixtures `__testfixtures__/unstable-x-component-name.input.tsx` and `.output.tsx`, plus a test in
   `__tests__/` that runs the transform against the fixtures.
3. Add a section to that version's `web-react/README.md` with usage + a before/after diff.
4. If the stabilized component is affected by other codemods in the same version (e.g.
   `forms-isFluid-prop-removal`), update that codemod's component list, fixtures, and README to use the stable
   name and drop removed variants.

## Migration Docs

1. Add a stabilization section to the current major's migration guides
   (`docs/migrations/web-react/migration-<version>.md` and `docs/migrations/web/migration-<version>.md`):
   state the rename, link the codemod, and show before/after.
2. If a component is **removed** during stabilization, add a removal + manual-migration section (there is no
   automatic codemod for composition changes—document the steps and a before/after example).
3. Remove now-obsolete entries from each package `DEPRECATIONS.md` (e.g. the deprecation that pointed users at
   the `UNSTABLE_` component, and the removed component's deprecation block).

## Removing a Superseded Component

When stabilization also retires an older component, in the **owning** package(s):

1. Delete the component folder (component, subcomponents, context, hooks, tests, demos, stories, README,
   `index.html`).
2. Remove its barrel export and its `package.json` `exports` entry (web-react) or SCSS/JS forwards (web).
3. Remove its `DEPRECATIONS.md` block and any reference links.
4. Remove docsite category/slug entries and demo references.
5. Search for stragglers before committing (see Verification).

## Verification

1. **Search for leftovers** across the repo:
   - `rg "UNSTABLE_X|UnstableX|unstable-x"` should only match intentional, unrelated strings.
   - `rg "<RemovedComponent|RemovedComponentProps"` should return nothing.
2. **Typecheck + build** the changed packages (web-react, web, codemods). If the web-react build complains
   about stale `package.json` `exports`, fix only the affected component entries.
3. **Unit tests** for the stabilized component, its hooks, and a11y; run codemod tests against the new
   fixtures.
4. **Lint** changed packages and run any docs/README link checks.
5. **e2e visual snapshots**: regenerate with the project's e2e update target. After stabilization the demo is
   no longer `unstable_*`, so it loses the `allowUnstable` leniency—ensure its snapshot exists and passes.
   If `web` and `web-react` demos share a snapshot name, give each a package-scoped name to avoid collisions.
   Remove obsolete `unstable-x`/removed-component snapshots and commit the new ones.
6. Smoke-check Storybook/docsite: the component appears under **Components** in the Storybook sidebar (not
   **Experimental**), under its stable docsite category, with no `UNSTABLE_` label. Search for leftover
   experimental Storybook titles: `rg "title: 'Experimental/" packages/web-react/src/components/X/`.
