---
name: spirit:breaking-change-checklist
description: >-
  Checklist for what a breaking change to a stable Spirit API must ship with: migration guide entries in both
  packages, and a web-react-only codemod with fixtures. Use whenever introducing a breaking change (removing a
  feature flag, removing/renaming a prop, changing a default) that isn't already a component stabilization or
  deprecation removal.
category: spirit
displayName: Spirit Breaking Change Checklist
---

# Spirit Breaking Change Checklist

Use this skill whenever a change breaks a stable, released Spirit API — removing a feature flag, removing or
renaming a prop, changing a default value or behavior. It does not apply to everyday, non-breaking work.

If the change is a **component stabilization** (`UNSTABLE_X` → `X`) or a **deprecation removal**, use
`spirit:stabilize-component` or `spirit:component-deprecation` instead — both already include this checklist
plus their own specific steps (renames, exports, deprecation-notice wording).

## Required for Every Breaking Change

1. A migration guide entry (TOC + section) in **both**:
   - `docs/migrations/web/migration-v<N>.md`
   - `docs/migrations/web-react/migration-v<N>.md`

   `<N>` is the current major in development. Find it with `ls docs/migrations/web-react/` (highest unreleased
   version) rather than hard-coding a number.

2. A codemod — **web-react only**. There is no vanilla `web` codemod mechanism:
   `packages/codemods/src/transforms/v<N>/` only ever contains a `web-react` subfolder
   (`ls packages/codemods/src/transforms/v<N>/` to confirm).
   - `packages/codemods/src/transforms/v<N>/web-react/<name>.ts`
   - `__testfixtures__/<name>.input.tsx`
   - `__testfixtures__/<name>.output.tsx`
   - `__tests__/<name>.test.ts`

## Migration Guides

- Only document stable → stable migrations. Never include intermediate unreleased API states (e.g. a prop that
  existed only between two unreleased BC changes).
- Both guides separate `## General Changes` from `## Component Changes`. Put the entry under the right one, and
  keep the sections within it sorted alphabetically by component name.
- After squashing multiple BC changes into one section, verify that every item in the "Removed" table actually
  existed in a stable release.
- Squashing or renaming a section changes its heading anchor, and component docs may link to the old one. Grep
  `docs/` and `packages/*/src/components/*/README.md` for the old anchor and update every inbound link.

## Codemods

- Generate output fixtures with `yarn dlx jscodeshift --dry --print -t <transform> <input>` — never hand-write them.
  jscodeshift's exact whitespace, blank lines between top-level declarations, and import ordering must match the
  fixture; any deviation causes the test to fail.
