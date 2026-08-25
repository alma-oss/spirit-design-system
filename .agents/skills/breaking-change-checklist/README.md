# Breaking Change Checklist Skill

Minimal, always-current checklist for what a breaking change to a stable Spirit API must ship with: migration
guide entries in both packages, and a codemod (web-react only).

## Usage

```text
/spirit:breaking-change-checklist
```

Use when introducing a breaking change that isn't already covered by a more specific skill:

- Removing a feature flag
- Removing/renaming a prop or changing a default
- Any other stable-API breaking change

For stabilizing an experimental component or removing a deprecation, use `spirit:stabilize-component` or
`spirit:component-deprecation` instead — they include this checklist plus their own specific steps.

## What It Covers

1. Migration guide requirement (both `web` and `web-react`, current major only)
2. Codemod requirement (web-react only, with fixtures generated via `--dry --print`)
3. Rules for what belongs in a migration guide (stable → stable only, correct section, alphabetical order,
   inbound anchor links kept working)

## Output Quality Checklist

- Migration guide section exists in both `docs/migrations/web/migration-v<N>.md` and
  `docs/migrations/web-react/migration-v<N>.md`
- Section sits under `## General Changes` or `## Component Changes` and keeps the alphabetical order
- Codemod + fixtures + test exist under `packages/codemods/src/transforms/v<N>/web-react/`
- Fixtures were generated with `--dry --print`, not hand-written
- No intermediate unreleased API states documented in the migration guide
- No inbound links left pointing at a heading anchor that squashing removed
- Agent skills that name the changed API (especially `figma-to-code`) are updated in the same change
