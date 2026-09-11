---
name: spirit:performance-optimization
description: >-
  Performance optimization guidance for Spirit Design System frontend code — a measure-first
  workflow, Core Web Vitals targets, and fixes for the bundle, render, and style costs that matter
  for a component library. Loaded by the frontend reviewer; standalone-invokable when optimizing or
  reviewing performance of web/web-react components.
---

# Performance Optimization

Guidance for keeping Spirit components fast. Because the library ships into every consuming product,
a regression here multiplies — bundle weight, wasted renders, and expensive styles are paid by every
consumer. Scope is **frontend** (`packages/web` and `packages/web-react`); there is no backend here.

## Overview

**Measure before optimizing. Performance work without measurement is guessing.** Profile first,
identify the actual bottleneck, fix it, then measure again. Do not micro-optimize code that is not on
a hot path.

## When to Use

- A change adds or grows a runtime dependency, or noticeably increases a package's build size.
- A component re-renders or reflows more than expected.
- Core Web Vitals regress in a consuming app and trace back to a component.
- Reviewing frontend changes (the `frontend-reviewer` applies the checklist below).

Avoid premature optimization: do not add memoization or splitting without evidence of a cost.

## Core Web Vitals Targets

| Metric                          | Good    | Needs Improvement | Poor    |
| ------------------------------- | ------- | ----------------- | ------- |
| LCP (Largest Contentful Paint)  | ≤ 2.5s  | ≤ 4.0s            | > 4.0s  |
| INP (Interaction to Next Paint) | ≤ 200ms | ≤ 500ms           | > 500ms |
| CLS (Cumulative Layout Shift)   | ≤ 0.1   | ≤ 0.25            | > 0.25  |

## The Optimization Workflow

**Measure → Identify → Fix → Verify → Guard.**

1. **Measure** — bundle-size delta for the package, React DevTools profiler for renders, Lighthouse
   for a consuming page.
2. **Identify** — find the actual bottleneck (heavy dependency, re-render storm, layout-triggering
   animation) rather than guessing.
3. **Fix** — apply the relevant remedy (see anti-patterns below and the checklist).
4. **Verify** — re-measure and confirm the regression is gone and nothing else regressed.
5. **Guard** — where it matters, keep a size/perf check so the win does not silently erode.

## Fix Common Anti-Patterns

- **Heavy dependency** — a new runtime dependency for a component. Prefer the platform or an existing
  utility; if unavoidable, confirm it is tree-shakeable and worth the weight.
- **Bundle bloat** — barrel imports that pull the whole library, dev-only code shipped to production,
  or exports with side effects that defeat tree-shaking. Keep `package.json` `sideEffects` accurate.
- **Unnecessary re-renders (React)** — unstable inline objects/functions passed to memoized children;
  add `useMemo`/`useCallback` or `React.memo` only where there is a measured cost (do not over-memoize).
- **Layout thrashing** — animate `transform`/`opacity`, not layout-triggering properties; respect
  `prefers-reduced-motion` (see `spirit:accessibility`).
- **Expensive selectors** — deep descendant chains or universal selectors in hot components.

## Performance Budget

Sensible defaults for a component library (tune per package): keep a component's added JS small and
tree-shakeable, avoid new font payloads, and treat a noticeable build-size jump as a finding worth a
question.

## See Also

`references/performance-checklist.md` — the detailed, actionable checklist (JavaScript and bundle,
rendering, CSS and styles, assets and fonts, measurement). The `frontend-reviewer` applies it.

## Red Flags

- Optimizing without first measuring.
- A new dependency added "for convenience" without weighing its bundle cost.
- Memoization sprinkled everywhere with no measured re-render problem.
- Animations on layout-triggering properties.
- Raw values that should be tokens inflating CSS over time.

## Verification

- The change was measured (size delta and/or profiler), not guessed.
- The bottleneck was identified before fixing.
- No new heavy or non-tree-shakeable dependency slipped in.
- Animations are cheap and respect reduced motion.
