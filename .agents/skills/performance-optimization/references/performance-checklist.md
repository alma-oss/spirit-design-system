# Performance Checklist

Performance review for Spirit frontend code, applied by the `frontend-reviewer` to changed `web` and
`web-react` code. It targets what matters for a component library — bundle cost, render cost, and
style cost — not backend concerns. Findings use the format in `methodology.md`.

## JavaScript and Bundle

- **Tree-shaking** — exports stay side-effect-free; no top-level side effects that defeat dead-code
  elimination, and `package.json` `sideEffects` stays accurate.
- **No heavy dependencies** — a new runtime dependency for a component is a red flag; prefer the
  platform or an existing utility. Flag large or duplicate dependencies.
- **Import cost** — import from specific entry points, not barrels that pull in the whole library.
- **Ship only what is needed** — dev-only helpers, large constants, and data tables should not land
  in the production bundle.

## Rendering

- **Avoidable re-renders** — unstable inline objects or functions passed to memoized children; add
  `useMemo`/`useCallback` only where there is a real cost (do not over-memoize).
- **Stable keys** — list keys are stable, not array indices (see `spirit:react`).
- **Effects** — no expensive work during render; no layout read/write thrashing inside effects.
- **Split the heavy** — large optional UI (e.g. complex overlays) can be code-split.

## CSS and Styles

- **Selector cost** — avoid deep descendant chains and universal selectors in hot components.
- **Animate cheaply** — animate `transform` and `opacity`, not layout-triggering properties.
- **Reduced motion** — respect `prefers-reduced-motion` (see `spirit:accessibility`).
- **No unbounded growth** — one-off raw values that should be tokens inflate CSS over time.

## Assets and Fonts

- **Images** — appropriately sized and formatted; no oversized assets shipped with a component.
- **Fonts** — a component does not pull in new font payloads.

## Measurement

- **Bundle impact** — check the package build-size delta for the change.
- **Renders** — profile with the React DevTools profiler when a re-render concern is suspected.
