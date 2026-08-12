# Performance Optimization

Performance review and optimization knowledge for Spirit frontend code.

## Purpose

A measure-first workflow (Measure → Identify → Fix → Verify → Guard), Core Web Vitals targets, and the
bundle / render / style anti-patterns that matter for a component library. The actionable detail lives
in `references/performance-checklist.md`.

## Usage

Loaded (via `cat`) by the `frontend-reviewer`, which applies `references/performance-checklist.md` to
changed `web` and `web-react` code. Invoke `/spirit:performance-optimization` to apply this lens
directly when optimizing or reviewing performance on its own.

## Related Skills

- `spirit:react` — rendering and memoization concerns.
- `spirit:scss` — selector cost and style weight.
- `spirit:accessibility` — `prefers-reduced-motion`.
- `spirit:code-review` — the orchestrator whose `frontend-reviewer` uses this skill.
