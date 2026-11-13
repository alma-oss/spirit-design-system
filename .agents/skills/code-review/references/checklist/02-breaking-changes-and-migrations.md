# 2. Breaking Changes and Migrations

Experimental code (`UNSTABLE_*` exports and feature-flagged APIs) is not bound by semantic
versioning (see `docs/contribution/experimental-code.md`): breaking it needs no migration guide,
codemod, or `!` marker. Leftovers still apply, such as codemod mappings or `DEPRECATIONS.md` entries
for the removed API.

**Stabilization is the exception.** Removing the `UNSTABLE_` export is a breaking change: follow
`.agents/skills/stabilize-component/SKILL.md` (`feat(...)!:` with a `BREAKING CHANGE:` footer, rename
codemods, and migration guides in both packages).

- **Migration guide and codemod** (blocking) — Removing or renaming a public prop, class, token, or
  default in a stable API ships entries in `docs/migrations/web/` and `docs/migrations/web-react/`
  and, for web-react, a codemod with fixtures. Follow `.agents/skills/breaking-change-checklist/SKILL.md`.
- **Codemod coverage** (important) — Codemod fixtures cover every trigger: omitted default props,
  aliased imports, spread props, and partial output (no empty `strings={{}}` left behind).
- **Correct commit marker** (important) — The commit uses `!` for a breaking change and `feat` (not
  `refactor`) for a deliberate public API change; the changelog is generated from it.
- **Only user-facing BCs** (important) — Migration guides leave out changes introduced and dropped
  within the same major and visual-only tweaks. Each item sits in the right package's guide.
- **Guide structure** (minor) — Sections follow the existing template ("🪄 Use codemods", "🔧 Manual
  Migration Steps"), use "previous/next" wording, and are sorted alphabetically by component.
- **Deprecations** (important) — Deprecating instead of removing follows
  `.agents/skills/component-deprecation/SKILL.md` in both packages. Stabilizing `UNSTABLE_*` follows
  `.agents/skills/stabilize-component/SKILL.md`.
