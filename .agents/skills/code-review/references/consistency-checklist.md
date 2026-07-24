# Cross-Implementation Consistency Checklist

Spirit ships every component twice — `packages/web` (vanilla SCSS/JS) and `packages/web-react`
(React). They are parallel implementations of one design system and must stay in sync. This is the
class of issue a per-file reviewer cannot see, so the `spirit:code-review` orchestrator applies this
checklist across the **whole PR** (it has the full diff and both packages in view). Findings use the
format in `methodology.md`.

## Parity

- **Props vs classes / data-attributes** — a new or changed React prop usually has a vanilla class or
  `data-*` equivalent, and vice versa. Flag a change applied to only one implementation.
- **Behavior** — both implementations should behave the same for the same inputs and states.

## Leftovers

- When a prop, class, modifier, or token is **removed or renamed**, search **both** packages for
  stale usages, docs, and types that still reference the old name. Use `grep`/`glob` widely.

## Docs and Demos

- **READMEs** — the two package READMEs for a touched component should describe the same API.
- **Demos and examples** — demos should be unified across `web` and `web-react`; if one gains a demo,
  the other generally should too.

## Deprecations

- A deprecation or removal follows the established mechanism in **both** packages —
  `useDeprecationMessage` and `DEPRECATIONS.md` in web-react, deprecation notices in READMEs, and
  optional runtime warnings in web. See `spirit:design-system` and the `spirit:component-deprecation`
  skill.
