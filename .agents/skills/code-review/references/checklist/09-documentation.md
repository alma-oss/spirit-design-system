# 9. Documentation (READMEs, `docs/`, ADRs)

- **API table complete** (important) — Every new or renamed prop has a README row with the correct
  type, default, required flag, and a description; types match `types.ts`.
- **True statements** (important) — Documented defaults and behavior hold for that package (no CSS-only
  defaults in React docs, no internal CSS variables, no numbers that will go stale).
- **Examples match the implementation** (important) — Snippets mirror the real markup and props so
  copy-paste works.
- **Written for the consumer** (important) — Explain why and the constraints (for example "the
  ancestor needs `position: relative`"); leave out internals, preview links, and name-dropping.
- **Link, don't duplicate** (minor) — Link to the other component's docs, `docs/development/utilities.md`,
  or MDN instead of repeating them. New utilities and helpers are documented there.
- **Version-agnostic** (minor) — Component READMEs describe the current API; "new in" notes and
  upgrade instructions belong in `docs/migrations/`.
- **Progressive structure** (minor) — Examples go from basic to complex, one per code block, with
  intro text.
- **Alphabetical order** (minor) — Props in tables, components, stories, SCSS maps, and migration
  guide sections are sorted alphabetically (reviewers flag this with 🔤).
- **ADRs record decisions** (important) — `docs/decisions/*.md` keeps the decision short; workflow
  documentation goes elsewhere; a changed decision gets a new ADR that supersedes the old one.
- **Organization name** (important) — Links and fixtures use `alma-oss`, not `lmc-eu`.
