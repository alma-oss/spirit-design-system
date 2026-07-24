---
name: spirit:design-system
description: >-
  Foundational knowledge of the Spirit Design System for code review — monorepo and dual web/web-react
  structure, design tokens and theming rules, the prop-vs-token customization decision, naming and
  file conventions, and web<->web-react parity expectations. Loaded by every Spirit code-review
  perspective. Use when reviewing or building Spirit components, tokens, or styles.
---

# Design System

Cross-cutting knowledge every Spirit reviewer needs. Loaded by all perspectives on top of
the code-review methodology. This is **knowledge, not a process** — it tells a reviewer what "correct for
Spirit" means; the technology skills (`spirit:react`, `spirit:typescript`, `spirit:scss`,
`spirit:html`, `spirit:accessibility`) add language-specific depth.

> Sources: ADRs `008-themes`, `009-tokens-structure`, `011-component-customization`,
> `docs/contribution/`, `.agents/instructions/code-style.md`, `.github/copilot-instructions.md`.
> **TODO (skills.sh step):** enrich token/theme/component specifics from the published Spirit
> knowledge once skills.sh integration lands. Do not hard-code links to source files that move
> (deprecations, token files) — search current code by pattern instead.

## The Two Implementations Must Stay in Sync

Spirit ships the same components twice:

- `packages/web` — vanilla SCSS/CSS + JS implementation.
- `packages/web-react` — React + TypeScript implementation.

These are **parallel implementations of one design system**. A change to a component in one package
almost always implies a matching change in the other. When reviewing a change that touches one
implementation, check whether the other needs the same change:

- **Props ↔ classes / data-attributes** — a new React prop usually has a vanilla class or
  `data-*` equivalent, and vice versa.
- **READMEs** — the two package READMEs for a component should describe the same API and behavior.
- **Demos / examples** — demos should be unified across `web` and `web-react`; if one gains a demo,
  the other generally should too.
- **Leftovers** — when a prop, class, modifier, or token is removed/renamed in one place, verify no
  stale usages or docs remain in the other.

This parity dimension is the single most valuable thing a Spirit review adds over a generic reviewer,
and it is the class of issue a per-file reviewer cannot see. It is owned by the orchestrator's consistency check, but any reviewer touching a shared component should flag obvious drift.

## Design Tokens (ADR 009)

Figma is the **single source of truth** for tokens; they are imported into the codebase. No tokens
are defined outside Figma.

- **Use tokens, never hard-coded values.** Raw colors, spacing, radii, shadows, typography, or
  breakpoints in component code are a finding — there should be a token. This applies to both SCSS
  values and React inline styles / style props.
- **Global vs Theme tokens.** Global tokens (e.g. breakpoints, spacing, radii, typography) have the
  same value across themes. Theme tokens (e.g. colors) vary per theme.
- **Scales use hundreds** — `space-0`, `space-100`, `space-200`, … (room for values in between).
  A new token wedged off-scale is suspicious.
- **Color token groups** are structured and meaningful: component-specific groups (colors used by
  exactly one component — if reused elsewhere, that is an issue), `-state-` infix for interaction
  states, `-basic`/`-subtle` contrast suffixes, `form-field` (with `filled`), `disabled`, `neutral`,
  `selected`, and single-purpose groups (`text`, `background`, `link`, …).
- Gradients and shadows define colors via CSS variables so they can be themed; shadows include a
  `focus-ring` token used for focus rings.

## Theming (ADR 008)

Spirit replaced the old **inverted tokens / inverted component variants** with a **themes** layer.

- **No "light", "dark", or "inverted" in token or variant names.** Brightness-implying names are
  forbidden — flag them. Use neutral tokens or themes instead.
- Themes apply scoped appearance changes to any component (current: `default` and `on-brand`
  light-mode themes; dark mode planned).
- **No brand-color component modifiers** — brand colors come from a theme, not a per-component
  modifier. A reintroduced inverted variant or brand modifier is a regression.

## Customization: Prop vs Token vs Neither (ADR 011)

When a change adds a way to customize a visual setting, check it used the right mechanism:

1. Change a setting **per component instance** (by a developer) → a **prop**.
2. Change a setting for **all instances in a product** (by a designer) → a **component-specific
   design token**.
3. **No customization expected soon** → add neither. Do not create speculative props or tokens
   "just in case." Flag speculative API surface.

## Naming & File Conventions

| Thing            | Convention                                                             |
| ---------------- | ---------------------------------------------------------------------- |
| React components | PascalCase (`Button.tsx`, `CardHeader.tsx`)                            |
| SCSS partials    | Underscore prefix (`_Button.scss`, `_theme.scss`)                      |
| Test files       | `.test.tsx` / `.test.ts`                                               |
| Type files       | `types.ts`                                                             |
| Hook files       | `useComponentName.ts`, `useComponentStyleProps.ts`                     |
| CSS classes      | BEM/SUIT — `.Component`, `.Component--modifier`, `.Component__element` |

## Deprecations

Spirit deprecates before removing. When a change deprecates or removes a component, prop, or token,
expect the established mechanism to be followed in **both** packages (search by pattern, since
specifics move): `useDeprecationMessage` and `DEPRECATIONS.md` in web-react, deprecation notices in
READMEs, and optional runtime warnings in web. A removal that skips the deprecation path, or leaves
the two packages inconsistent, is a finding. See the `spirit:component-deprecation` skill for the
full workflow.

## Out of Linter Scope

Formatting, import order, unused variables, and most style rules are handled by Prettier, ESLint
(`eslint-config-spirit`), Stylelint (`stylelint-config-spirit`), Remark, and Commitlint. Review the
design-system concerns above — not what `make format` / `make test` already enforces.
