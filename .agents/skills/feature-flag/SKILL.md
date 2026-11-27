---
name: spirit:feature-flag
description: >-
  Add or remove a Spirit Sass feature flag (`$enable-[v<N>-]<component>-<feature>` variable plus
  `.spirit-feature-enable-*` CSS class) across web and web-react. Covers the two Sass blocks, deprecation comments,
  docs, demos, and the removal checklist for the next major. Use when introducing a breaking visual change behind a
  flag, or when removing flags while preparing a major release.
category: spirit
displayName: Spirit Feature Flag
---

# Spirit Feature Flag

Use this skill when a breaking visual change must first ship opt-in in a minor release (**Create**), or when a major
release makes the flag the default and the flag has to go (**Remove**).

Naming, the `enable-*` and `enable-v<N>-*` prefixes, and the consumer setup are in `docs/contribution/feature-flags.md`
and `docs/contribution/experimental-code.md`.

## Create

1. **Ticket**: before implementing, create the follow-up BREAKING CHANGE ticket for removing the flag
   (`spirit:create-jira-issue`). Its ID goes into the code comments.
2. **Declare** the variable in `packages/web/src/scss/settings/_feature-flags.scss` with `false !default`.
3. **Implement** both blocks in the component partial, each with the full comment:

   ```scss
   @use '../../settings/feature-flags';

   // @deprecated The feature flag will be removed in the next major version.
   // Migration: delete this feature flag and apply the compact `Tag` by default.
   // @see https://almacareer.atlassian.net/browse/DS-XXXX
   @if feature-flags.$enable-v6-tag-compact {
     @include tools.tag-compact();
   }

   // @deprecated The feature flag will be removed in the next major version.
   // Migration: delete this feature flag and apply the compact `Tag` by default.
   // @see https://almacareer.atlassian.net/browse/DS-XXXX
   .spirit-feature-enable-v6-tag-compact {
     @include tools.tag-compact();
   }
   ```

4. **Document**: a row in the table in `docs/contribution/feature-flags.md`, and a `### Feature Flag: <Title>`
   section with an example in the component README of both packages.
5. **Demo**: a flag section in `preview.html` and its web-react twin wrapped in the `spirit-feature-enable-*` class,
   plus a `Feature Flag: <Title>` story.

## Remove

Run when preparing the major in which the flag becomes the default. Migration guides follow
`spirit:breaking-change-checklist`; a Sass-only flag needs no codemod.

1. **Find** every flag: `grep -rnE 'enable-v<N>-' packages docs apps .agents`.
2. **Sass**: delete the variable, both blocks, and the old styles the flag replaced. The flagged styles become the
   default. Remove `@use '../../settings/feature-flags'` if it is no longer used.
3. **Docs**: delete the table row and the README `Feature Flag` sections. Update the README where it described the
   old behavior.
4. **Demos**: delete the flag demo, its story, and the flag class wrappers in other demos and stories.
5. **Consumer migration skill**: add the flag to the cross-check recipe of the `v<N>` migration skill, creating it if
   needed. `spirit-v5-migration/changesets/web-css-cross-check.md` shows the structure.

Finally re-run the grep from step 1. Only intentional references may remain: migration guides and consumer recipes.

## Verification

- Create: with the flag off, nothing changes; with the Sass variable or the CSS class, the new design renders.
- Remove: the new design renders without any flag.
