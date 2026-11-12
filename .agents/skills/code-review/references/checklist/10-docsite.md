# 10. Docsite (`apps/docsite`)

Apply `.agents/skills/docsite-composition/SKILL.md` and `.agents/skills/docsite-styles/SKILL.md`.
The issues reviewers raise most often:

- **Domain and feature layout** (minor) — Data access in `*Repository`, static data in `constants/`,
  hooks outside `ui/`; features do not import from each other (shared code moves up a level).
- **Server-first React** (minor) — No unneeded `'use client'` or `async`; compose in `page`, not
  `layout`; use `NextLink` and `Script`.
- **One component per file** (minor) — Split multi-component and oversized files; remove unused ones.
- **Error states** (important) — Fetching code handles failures with an error state, not a crash.
