# React

React review knowledge for the Spirit `web-react` package.

## Purpose

What to look for when reviewing React: hooks correctness (dependency arrays, stale closures), rendering
pitfalls (list keys, missing states), Spirit component API patterns (ref forwarding, `restProps`,
controlled/uncontrolled, the style-prop hook), and the `use client` boundary. Focuses on what ESLint
cannot catch.

## Usage

Loaded (via `cat`) by the `frontend-reviewer` alongside `spirit:typescript`,
`spirit:design-system`, and the code-review methodology. Invoke `/spirit:react` to apply this lens directly
when reviewing only React code.

## Related Skills

- `spirit:typescript` — paired type-design lens.
- `spirit:accessibility` — a11y of rendered components.
- `spirit:design-system` — Spirit component conventions.
