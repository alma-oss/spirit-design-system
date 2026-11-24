# Feature Flag Skill

Adds or removes a Spirit feature flag (`$enable-v<N>-<component>-<feature>` Sass variable and
`.spirit-feature-enable-v<N>-*` CSS class) consistently across `web` and `web-react`.

## Usage

```text
/spirit:feature-flag
```

Use when:

- Introducing a breaking visual or markup change that must first ship opt-in in a minor release
- Removing flags while preparing the next major release

For the migration guide and codemod requirements of the removal, see `spirit:breaking-change-checklist`.

## What It Covers

1. Naming convention and when a provisional flag is committed to a major and removed there
2. Create: declaration, dual SCSS blocks with `@deprecated` comments, docs, demos, stories, e2e snapshots, commits
3. Remove: SCSS cleanup, docs, demos, migration guides, optional codemod, consumer migration recipe, final grep

## Output Quality Checklist

- Flag declared in `settings/_feature-flags.scss` with `false !default`
- Both the `@if` block and the `.spirit-feature-*` block call the same mixin from the component's `_tools.scss`
- Both blocks carry the `@deprecated` / `Migration:` / `@see` comment
- Row in `docs/contribution/feature-flags.md` and README sections in both packages
- web and web-react demos, previews and stories are identical
- e2e snapshots updated
- On removal: no active `enable-v<N>-` or `spirit-feature-enable-v<N>` declarations, selectors, or setters remain
  (migration and historical references are intentional) and both migration guides have an entry
