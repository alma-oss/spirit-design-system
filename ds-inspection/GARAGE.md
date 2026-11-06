# GARAGE.md — Spirit Design System

_Checked in: 2026-11-03 · Re-confirm at next inspection_

## Vehicle

- System: Spirit Design System (Alma Career, formerly LMC). Multi-brand: brand config libraries for JOBS.CZ, PRÁCE.CZ, PROFESIA.SK, CV ONLINE and a base SPIRIT config `[verified: Figma get_libraries]`
- Team: 4 full-time developers (one is the lead engineer at 0.75), 2 part-time developers (architects), 1 designer; team size is stable `[reported]` · Consumers: 3+ products, 4+ teams, expected to grow `[reported]`
- Age: repo history starts 2021-02-01 `[verified: git log]`. Currently v5 line (web-react 5.5.0, web 5.3.0, design-tokens 5.2.1) `[verified: package.json]`
- Major in-flight migration: docs moving from Supernova (spirit.design) to `apps/docsite` (Netlify preview) — work in progress `[reported]`
- Reason for service: routine service, plus presenting this skill and what it can do to the team `[reported]`

## Assets

- Design library: Figma "SPIRIT DESIGN SYSTEM (UI Kit)", file key `w9Ca4hvkuYLshsrHu1bYwT`. Pages grouped as Foundations, UI Helpers, Actions, Inputs & Forms, Navigation, Data Display, Feedback & Status, Layout & Structure, Visuals & Assets, Components in Review, OPU Components, Document Assets. Subscribes 5 brand config libraries `[verified]`
- Code library: Yarn/Nx/Lerna monorepo. `@alma-oss/spirit-web-react` (83 component folders), `@alma-oss/spirit-web` (68 SCSS component folders), `spirit-design-tokens` (js + scss), `spirit-icons`, `spirit-codemods`, `spirit-common`, `spirit-analytics`, vite icons plugin `[verified: repo]`
- Docs: target `apps/docsite` (https://spirit-design-system-docsite.netlify.app/, in progress); legacy Supernova spirit.design; Storybook at `apps/storybook`; `docs/` (contribution, decisions ADRs 001–015, migrations, release-notes, postmortems) `[verified: repo]`
- Process: Jira DS project (MCP failed to connect this session, 403, so tracker access is `[reported]` unless fixed); CONTRIBUTING.md, CHANGELOG, MIGRATION.md, DEPRECATIONS.md, postmortems `[verified: repo]`
- AI surface: root and docsite CLAUDE.md/AGENTS.md, `.agents/skills` (~20 skills) and `.agents/instructions`, `context7.json`, Code Connect (56 `*.figma.*` files, `packages/web-react/figma.config.json`) `[verified: repo]`

## Evidence access map

| Asset          | Access                                                                                                              | Verified how                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Design library | live (native Figma MCP + Figma Console bridge)                                                                      | Native: `create_session` + `get_metadata` returned the real page list; `get_libraries` returned the 5 brand configs + UI Kit. Console: `figma_get_status` probe succeeded (9 ms) against "SPIRIT DESIGN SYSTEM (UI Kit)", key `w9Ca4hvkuYLshsrHu1bYwT`, plugin 1.39.0 (it was not connected earlier; plugin started later). Whole-file sweeps possible; findings reflect the file as open on this machine, unpublished changes included |
| Code library   | live                                                                                                                | Read repo tree, package versions, git log                                                                                                                                                                                                                                                                                                                                                                                               |
| Docs           | live (local `apps/docsite`, `docs/`, Storybook source); Supernova site and Netlify preview are fetchable on request | Listed `apps/docsite/src/domains`, `docs/decisions`                                                                                                                                                                                                                                                                                                                                                                                     |
| Process        | interview / partial                                                                                                 | Jira MCP failed (403); repo process files are live                                                                                                                                                                                                                                                                                                                                                                                      |

## Known symptoms

- Docs migration (Supernova → docsite) is mid-flight, so expect coverage gaps and duplicate sources of truth `[reported]`
- Figma has a "Components in Review" page group and several pages with trailing `----` in names (Control Button, Split Button, Header, Pagination, Card, Segmented Control), likely WIP markers `[verified: page names]`, meaning unknown until sampled

## Probable greens

- Strong agent/AI surface already in repo (skills, CLAUDE.md, Code Connect, context7) `[verified: presence]`, quality still to be checked
- ADR culture (15 decision records) and migration/deprecation docs `[verified: presence]`

## Intentional deviations

- Docs split across Supernova and docsite is a known, temporary migration state, not a defect
- None others reported

## Scope & frame

- Stations this pass: all 10 · Scoring frame: small, stable team (~6 people, 1 designer) serving a growing set of consumers across multiple brands
- Out of scope: none stated
