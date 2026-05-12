---
name: spirit:component-deprecation
description: >-
  Deprecate or remove deprecations for Spirit components and props across web-react (React) and web (vanilla SCSS/JS).
  Covers useDeprecationMessage, DEPRECATIONS.md, README notices, and optional web JS warnings. Use when deprecating
  a component, preparing a major release, or mirroring deprecations in both packages.
category: spirit
displayName: Spirit Component Deprecation
---

# Spirit Component Deprecation

Use this skill when deprecating a **component**, **subcomponents**, or **props** in Spirit, or when **removing deprecations** for the next major version (for example work on a long-lived `release/*` branch).

Do **not** rely on hard-coded links to specific source files in this skill: deprecations are removed over time and examples move. Instead, search current code and git history by pattern (`useDeprecationMessage`, `DEPRECATION NOTICE`, `DEPRECATIONS.md`, `deprecatedDataAttribute`).

**Do not copy-paste example commit hashes from documentation** as if they were the canonical migration: agents and humans tend to treat listed SHAs as the answer. Always discover fresh precedents with git.

## Proven Historical Patterns (from Git History)

Find precedents yourself—use the same steps every time:

1. List recent work on the component or hook: `git log --oneline -- <path>`.
2. Optionally list preparation branches: `git branch -a | grep release` (or your team's convention) and inspect the **latest** relevant `release/*` branch for how deprecations are **removed** before major.
3. In the log, open commits whose messages mention deprecate, migration, or breaking.
4. Compare the touched files: runtime warning, package `DEPRECATIONS.md`, component README, tests/demos.

### Template (what to Record After You Inspect Git)

Use this as private notes or in the PR description—not as permanent skill text with frozen SHAs:

```text
Precedent search:
- Component / prop: …
- git log --oneline -- <paths>: …
- Release-prep branch checked (if any): …
- Pattern observed: [ ] useDeprecationMessage [ ] DEPRECATIONS.md [ ] README notice [ ] web JS warning
```

What good deprecation commits usually include:

1. Runtime signal in dev mode.
2. Central package deprecations list update.
3. Component README notice + migration guidance.
4. When applicable, demos/stories/API tables are aligned with the new approach.
5. In major-release cleanup, deprecations are removed together with migration notes.

## Packages and Patterns

### Web-React

- **Runtime warning:** `useDeprecationMessage` in the root component (or in a style/aria hook for props).
- **Central list:** `DEPRECATIONS.md` at the **web-react** package root.
- **Component docs:** that component's `README.md`, including a **DEPRECATION NOTICE** section.

### Web

- **Runtime warning (optional):** `warning()` from the web JS `common/utilities` module, guarded by `isDevelopment()` from `common/constants/environments`, in the plugin constructor.
- **Central list:** `DEPRECATIONS.md` at the **web** package root.
- **Component docs:** `README.md` under **web** SCSS for that component (`src/scss/components/<Name>/`).

Use **`isDevelopment()`** for web JS deprecations so `NODE_ENV` values other than `development` (including `testing`, as used in this repository's unit tests per `ENVIRONMENTS.TESTING`) do not show deprecation warnings in the console — parity with web-react, where `useDeprecationMessage` runs only in development.

## Web-React: Deprecate a Whole Component

1. Add one runtime warning in the component root:
   - use `useDeprecationMessage`
   - prefer `method: 'custom'` for complex migrations
   - `trigger: true` for whole-component deprecation
   - explain replacement and migration direction in `customText`
   - message must clearly state removal in next major

```tsx
useDeprecationMessage({
  method: 'custom',
  trigger: true,
  componentName: 'MyComponent',
  customText: `The component will be removed in the next major version. Use UNSTABLE_MyComponent instead. …`,
});
```

2. Add a dedicated subsection to package `DEPRECATIONS.md`:
   - short statement that the component is deprecated
   - what replaces it
   - one-sentence migration direction

3. Add **DEPRECATION NOTICE** near the top of component `README.md`:
   - removal timeline (next major)
   - replacement API
   - migration note for common use case
   - link/reference to package-level deprecations explanation

If a convenience wrapper renders the root component internally, attach the hook **only on the root** to avoid duplicate console warnings.

### Migration Guide Requirement for Component Deprecations

When deprecating a component, do not stop at notice-only text. Add explicit migration guidance:

1. Add `#### Migration Guide` in package `DEPRECATIONS.md` entry.
2. Add a short `### Migration Guide` section in the component README deprecation block.
3. Include concrete steps (replace old composition, move logic ownership, update validation flow).
4. Include at least one before/after snippet for non-trivial migrations.

Template:

```md
#### Migration Guide

1. Replace `<OldComponent>` composition with `<ReplacementA>` + `<ReplacementB>`.
2. Move queue/validation/state handling from component internals to app state.
3. Keep only visual state props in new components.
```

### Web-React: Deprecate a Prop or Value

Decide warning style by migration type:

- **Rename prop**: `method: 'property'`, `deprecatedName` + `newName`.
- **Remove prop without replacement**: `method: 'property'`, `deprecatedName` + `delete: true`.
- **Rename prop value**: `method: 'property'`, `propertyName`, `deprecatedValue`, `newValue`.
- **Complex guidance** (layout/behavior migration): `method: 'custom'`.

Trigger strategy:

- `trigger: !!oldProp` for optional prop removals.
- `trigger: oldProp === 'deprecatedValue'` for value migration.
- `trigger: !requiredProp` for "currently optional, future required" contracts.

Documentation updates for prop deprecations:

1. Mention prop deprecation in package deprecations list.
2. Mark/update API tables and narrative in component README.
3. Align demos/stories toward the new approach.
4. If deprecation changes composition ergonomics (e.g. `isBlock` replacements), explain alternatives with examples.

Migration-guide expectations for prop deprecations:

- For simple rename/remove: a concise one-liner can be enough (`oldProp` → `newProp`).
- For behavior change: add before/after examples and explain side effects.
- If no direct replacement exists, document the recommended pattern, not only removal.

Always inspect current `useDeprecationMessage` implementation before coding; message format can evolve.

## Web: Deprecate Markup + JS Plugin

1. **web** package `DEPRECATIONS.md` — new subsection describing HTML/CSS/JS impact and replacement.

2. That component's **web** SCSS `README.md` — same **DEPRECATION NOTICE** pattern as other deprecated vanilla components (search `DEPRECATION NOTICE` under `packages/web/src/scss/components`).

3. Optional **constructor** warning in the relevant JS plugin module:

```ts
import { isDevelopment } from './common/constants/environments';
import { warning } from './common/utilities';

if (isDevelopment()) {
  warning(false, 'Deprecation warning (MyPlugin): …');
}
```

For deprecated data attributes on DOM, use shared helper pattern (`deprecatedDataAttribute` style) to keep wording consistent.

### Migration Guide Requirement in Web

For component deprecations in `web`, mirror the same migration quality:

1. Add `#### Migration Guide` under the component in `DEPRECATIONS.md`.
2. Add migration steps in component README deprecation block.
3. Show HTML before/after for markup migrations.
4. If JS plugin is deprecated, state what replaces `data-spirit-toggle` usage and where behavior should live.

## Removing Deprecations (next Major)

Reverse the above in **both** packages when the API is removed or renamed:

1. Remove runtime warnings (`useDeprecationMessage`, JS `warning` blocks).
2. Remove sections from package deprecations lists.
3. Remove deprecation notices and stale migration text from READMEs.
4. Remove old aliases/deprecated exports and any `@deprecated` markers.
5. Update stories/demos/tests to final API only.
6. Add a concise migration guide in the breaking-change commit/PR text.

Before merge, verify no stale references remain by searching for:

- deprecated component/prop names
- `DEPRECATION NOTICE` sections that still mention removed APIs
- warning messages referring to already removed functionality

## Commits

The repo **commitlint** config allows one **scope** per commit. Touching **web** and **web-react** usually means **two commits** (e.g. `feat(web-react): deprecate \`MyComponent\` component #DS-XXXX`and`feat(web): deprecate \`MyComponent\` component #DS-XXXX`).

For major removals, use breaking-change style commits/scopes consistent with current repository conventions.

## Verification

Minimum verification after adding deprecations:

1. Lint changed packages.
2. Run focused unit tests for affected components/hooks/plugins.
3. Validate docs render and links in changed READMEs.
4. Smoke-test warning behavior:
   - warning appears in development
   - warning does not spam test/prod flows unexpectedly.
