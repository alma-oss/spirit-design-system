---
name: spirit:feature-flag
description: >-
  Add or remove a Spirit feature flag (`$enable-v<N>-<component>-<feature>` Sass variable plus
  `.spirit-feature-enable-v<N>-*` CSS class) across web (SCSS) and web-react (demos, stories, docs). Covers naming,
  the dual SCSS blocks, deprecation comments, docs, demos, e2e snapshots, and the full removal checklist for the next
  major. Use when introducing a breaking visual/markup change behind a flag, or when removing flags while preparing a
  major release.
category: spirit
displayName: Spirit Feature Flag
---

# Spirit Feature Flag

Use this skill when a change would be breaking for consumers, but must ship in a minor release first behind an
opt-in flag (**Create**), or when a major release makes the flag the default and the flag has to go (**Remove**).

Feature flags are **SCSS only**. web-react has no flag prop or hook; it consumes the flag through a CSS class on a
parent element. The only exception in history is `ffbd017ad` (`ControlButton` size scale), which also widened
web-react types and a style-props hook — avoid that unless the flag truly changes the TypeScript API.

Reference implementations:

- Create: PR #3137 / `8a9c9edaf` (`CardLogo` mobile position, #DS-2954), `5ca290f71` (`Tag` appearance),
  `ffbd017ad` (`ControlButton` size scale).
- Remove: `dfbd8f486` (`ControlButton`, with codemod), `c38814f5a` (`Tag`), `6f0854c94` (`Container`).

Background: `docs/contribution/feature-flags.md`, `docs/contribution/experimental-code.md`,
`docs/decisions/006-experimental-code.md`.

## Naming

- `enable-v<N>-<component>-<feature>`, e.g. `enable-v6-card-logo-mobile-position`. `<N>` is the major in which the
  flag becomes the default and is removed. Find the next major with `ls docs/migrations/web-react/`.
- Sass variable: `$enable-v<N>-<component>-<feature>`, default `false !default`.
- CSS class: `.spirit-feature-enable-v<N>-<component>-<feature>`.
- Flags without `v<N>` (`enable-<feature>`) are provisional opt-ins that may change with feedback. They can be
  committed to a future major by renaming to `enable-v<N>-*`; see `docs/contribution/experimental-code.md`.

## Create

1. **Declare** the variable in `packages/web/src/scss/settings/_feature-flags.scss`:
   `$enable-v<N>-<component>-<feature>: false !default;`
2. **Implement** in the component partial (`packages/web/src/scss/components/<Component>/`):
   - Put the flagged CSS in a mixin in the component's `_tools.scss` (see `Card/_tools.scss`), used via
     `@use 'tools'`.
   - `@use '../../settings/feature-flags';` and add both blocks calling the same mixin:

     ```scss
     // @deprecated The feature flag will be removed in the next major version.
     // Migration: delete this feature flag and <apply the new behavior by default>.
     // @see https://almacareer.atlassian.net/browse/DS-XXXX
     @if feature-flags.$enable-v<N>-<component>-<feature> {
       @include tools.<mixin>();
     }

     // same @deprecated / Migration / @see comment
     .spirit-feature-enable-v<N > -<component > -<feature > & {
       @include tools.<mixin>();
     }
     ```

   - `DS-XXXX` is the follow-up BREAKING CHANGE ticket for removing the flag. Create it (see
     `spirit:create-jira-issue`) before merging.
   - Keep selectors simple and use breakpoints from tokens, not hard-coded px.
3. **Document**:
   - Row in `docs/contribution/feature-flags.md` (Flag, Description, Default, Sass flag). Storybook renders it via
     `packages/web-react/docs/stories/feature-flags/Overview.mdx`.
   - A "### Feature Flag: <Title>" section with an example in the component README in **both** `packages/web` and
     `packages/web-react`. Do not list explicit token values; say "a shadow token".
   - If it is a new flag area, `packages/web/README.md` "Feature Flags".
4. **Demos and stories** (web and web-react must be identical):
   - web: a flag section in the component `preview.html`.
   - web-react: `demo/<Name>.tsx` wrapping content in
     `<div className="spirit-feature-enable-v<N>-...">`, registered in `demo/preview.tsx` (`DocsSection`).
   - Story named `Feature Flag: <Title>` in the component `*.stories.tsx`.
5. **Tests**: update/add the e2e snapshot (`tests/e2e/demo-components-compare.spec.ts-snapshots/*-chromium-linux.png`)
   in Docker (ask the user to start Docker first). Add a unit test only if a hook/type changed.
6. **Commits**: one scope per commit, so usually two: `feat(web): ... behind feature flag #DS-XXXX` and
   `feat(web-react): ...`; snapshots in a `test(web, web-react): ...` commit.

## Remove

Run when preparing the major in which the flag becomes the default. Use `spirit:breaking-change-checklist` for
the migration guide and codemod requirements; this section is the mechanical removal.

1. **Find** every flag: `grep -rnE 'enable-v<N>-|spirit-feature-enable-v<N>' packages docs apps .agents`.
2. **Web SCSS**:
   - Delete the variable from `settings/_feature-flags.scss` (keep the file if other flags remain).
   - In the component partial, delete the `.spirit-feature-*` block and the `@if` wrapper; the mixin body becomes the
     default styles (inline it, and remove the mixin from `_tools.scss` if it has no other use). Remove the now unused
     `@use '../../settings/feature-flags'`.
   - Remove the old (non-flag) styles that the flag replaced.
3. **Docs**: delete the row in `docs/contribution/feature-flags.md`, the README "Feature Flag" sections (both
   packages), and `packages/web/README.md` mentions. Describe the new behavior as the default.
4. **Demos/stories**: delete the flag demo, its `DocsSection`, the `Feature Flag: ...` story, and the flag class
   wrappers in other stories (e.g. `CardEmployerGallery.stories.tsx`). Update `preview.html` and keep web and
   web-react identical.
5. **web-react types/hooks**: only if the flag touched them — remove the old types, the `@deprecated` fallback and its
   tests.
6. **Migration docs**: entry "<Component>: <Feature> Feature Flag Removed" (TOC + section) in
   `docs/migrations/web/migration-v<N>.md` and `docs/migrations/web-react/migration-v<N>.md`. Tell consumers to drop
   the Sass variable and the `.spirit-feature-*` class.
7. **Codemod**: web-react only, and only if the flag changed props/types (like `ControlButton`). A CSS-only flag
   (like `Tag`, `Container`) needs no codemod.
8. **Consumer migration skill**: add the flag to the destination major's (`v<N>`) cross-check recipe, creating it if needed.
   Use `spirit-v5-migration/changesets/web-css-cross-check.md` only as a structural example (detection grep,
   class → Sass variable → recipe table), not as the destination for later majors.
9. **Tests**: update e2e snapshots (Docker); removal usually changes none unless the flag was on in the demo.
10. **Commits**: breaking style, one scope per commit (`feat(web)!: remove ... feature flag #DS-XXXX`, then
    `feat(web-react)!: ...`), per `.agents/instructions/git-workflow.md`.

Finally re-run the grep from step 1; inspect every match and ensure no active declarations, selectors, or setters remain.
Retain intentional references in migration guides, consumer detection recipes, and historical changelogs.

## Verification

- `yarn lint`, stylelint for the SCSS, and the package unit tests for affected files.
- `yarn lint:markdown` and `yarn lint:text` after editing any `.md`; run `make format` before committing Markdown.
- Compare rendered markup of web and web-react demos (parity).
- Create: flag off renders exactly as before; flag on (Sass variable and CSS class) renders the new design.
- Remove: grep from step 1 finds only intentional migration/historical references; `yarn build` for `web` and
  `web-react` passes.
