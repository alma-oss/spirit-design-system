---
name: spirit:react
description: >-
  React review knowledge for the Spirit Design System web-react package — hooks correctness,
  rendering pitfalls, component API patterns, refs/polymorphism, and the 'use client' boundary.
  Loaded by the web-react reviewer; standalone-invokable when reviewing only React code.
  Use when reviewing or building Spirit React components.
---

# React (Spirit Web-React)

Review knowledge for `packages/web-react`. Pairs with `spirit:typescript` for types and
`spirit:accessibility` for a11y. Defers all design-token, theming, and parity concerns to
`spirit:design-system`. Report only what linters cannot catch (see
the code-review methodology).

## Hooks Correctness

- **Incomplete dependency arrays** — `useEffect`/`useMemo`/`useCallback` must list every reactive
  value they read. A missing dep is a real bug (stale data), not a style nit.
- **Stale closures** — event handlers or effects capturing a value that later changes. Flag when a
  handler reads state/props that are not in scope of the latest render.
- **State updates during render** — calling a setter in the render body causes infinite loops.
- **Conditional hooks** — hooks must run unconditionally, in the same order every render.
- **Derived state stored in state** — values computable from props/state during render should not be
  duplicated into `useState` and synced via effects.

```tsx
// Problem: userId missing from deps -> stale fetch
useEffect(() => {
  fetchData(userId);
}, []);

// Fix
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

## Rendering Pitfalls

- **List keys** — never use array index as `key` when items can reorder, insert, or delete; use a
  stable id.
- **Missing loading / error states** — data-driven UI without fallback UI.
- **Unstable references as props** — inline objects/functions passed to memoized children defeat
  memoization; flag only when there is a concrete perf consequence.

## Component API Patterns

- **Functional components with hooks** only.
- **Ref forwarding** — interactive/primitive components should forward refs to the underlying DOM
  node so consumers can attach refs.
- **Prop spreading & `restProps`** — spread remaining DOM props onto the root element so consumers
  can pass `aria-*`, `data-*`, `id`, etc. Verify intentional props are not accidentally swallowed.
- **Controlled vs uncontrolled** — components exposing value state should support both, with the
  standard `value`/`defaultValue` + `onChange` contract; flag a half-implemented pattern.
- **Style-prop hooks** — Spirit components compose class names through the
  `useComponentStyleProps`-style hook pattern rather than ad-hoc `className` concatenation; flag
  styling logic that bypasses the established hook.
- **Prop drilling** — props threaded through 3+ levels suggests composition or context.
- New visual props must follow the prop-vs-token decision in
  `spirit:design-system`.

## The `use client` Boundary

- Hooks (`useState`/`useEffect`/context) only run in client components.
- **All web-react `demo/preview.tsx` files must start with `'use client'`** for Next.js App Router
  compatibility — flag any that do not.

## Security

- **No `dangerouslySetInnerHTML` with unsanitized input.** Rendering user- or consumer-provided HTML
  this way is an XSS risk — render as text/children or sanitize. Flag any new use that lacks a clear,
  trusted source.
- **No secrets in source.** API keys, tokens, or credentials do not belong in component code.

## Comments & Dead Code

- Outdated comments that no longer match the code are worse than none.
- `TODO`s without an issue reference should be flagged.
