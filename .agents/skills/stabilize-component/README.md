# Component Stabilization Skill

Standard workflow for graduating an experimental Spirit component from its `UNSTABLE_` prefix to the stable
name across both packages:

- `web-react` (React)
- `web` (SCSS + vanilla JS)

The skill is designed to stay valid over time, so it focuses on **patterns** and **git-history-backed
workflow**, not static file references.

## Usage

```text
/spirit:stabilize-component
```

Use when you need to:

- Promote `UNSTABLE_X` to `X` (and any related subcomponents/types)
- Remove a component that the stabilized one supersedes
- Prepare these breaking changes for a major release

## What It Covers

1. Folder/file renames and identifier/type renames (history-preserving)
2. Barrel exports and `package.json` `exports` updates
3. Docsite category + slug changes and slug tests
4. Stories, demos, tests, and e2e visual snapshots
5. Rename codemods (transform + fixtures + README)
6. Migration guides in both packages and `DEPRECATIONS.md` cleanup
7. Removal of a superseded component
8. Commit scoping for the repo's one-scope commitlint rule

## Historical Anchors

The skill is grounded in real stabilization commits from repository history (component rename, codemod
addition, migration docs, and removal cleanup), so behavior reflects what was actually done in Spirit.

## Recommended Flow

1. Search git history for prior stabilizations and record the scope.
2. Rename + re-export in web-react and web; align docsite, stories, tests.
3. Add rename codemods with fixtures and README entries.
4. Update migration guides and clean up `DEPRECATIONS.md`.
5. Remove any superseded component and its references.
6. Typecheck/build/lint, run unit + codemod tests, regenerate e2e snapshots.

## Output Quality Checklist

- No `UNSTABLE_` references remain for the stabilized component
- Exports, docsite category/slug, stories, and tests all use the stable name
- Codemods cover imports, JSX tags, and type renames, with passing fixtures
- Migration guides document both automatic (codemod) and manual steps
- e2e snapshots regenerated; no shared-name collisions between `web` and `web-react`
- Removed component leaves no stale files, exports, deprecations, or docs
