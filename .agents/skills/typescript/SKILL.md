---
name: spirit:typescript
description: >-
  TypeScript review knowledge for the Spirit Design System — type-design quality, making invalid
  states unrepresentable, public component-prop typing, and type anti-patterns. Loaded by the
  web-react reviewer; standalone-invokable when reviewing only TypeScript. Use when reviewing
  or building typed Spirit code.
---

# TypeScript (Spirit)

Review knowledge for the type layer of `packages/web-react` (and any `.ts` tooling). Pairs with
`spirit:react`. Report only what the compiler and ESLint cannot already catch (see
the code-review methodology) — focus on **type design**, not syntax.

## Make Invalid States Unrepresentable

- **Discriminated unions over boolean soup** — variant props with mutually exclusive shapes should
  be a union, not several independent optional fields that allow nonsensical combinations.
- **Encapsulation** — hide implementation detail behind the public type; do not leak internal
  structures consumers should not depend on.
- **No exposed mutable internals** — returning an internal array/object that callers can mutate is a
  bug surface; return readonly types or copies.

## Type Anti-Patterns to Flag

- **`any` abuse** — `any` used to silence the compiler instead of modeling the type. Prefer
  `unknown` + narrowing, generics, or a precise type.
- **Stringly-typed APIs** — `string` where a union literal or finite set is meant (e.g. a `variant`
  prop typed `string`).
- **God objects** — prop/config types with many unrelated fields that should be decomposed.
- **Type assertions (`as`) hiding mismatches** — assertions that paper over a real type error rather
  than a genuine narrowing the compiler cannot infer.
- **Non-null assertions (`!`)** on values that can legitimately be null.

## Component Prop Typing

- **Public prop types are API.** Component prop interfaces are part of the published surface — they
  must be exported, named consistently, and documented. A breaking change to a prop type is a
  breaking change to the package.
- Keep public types in the component's `types.ts` per Spirit convention.
- Prefer precise element-prop extension (e.g. extending the right intrinsic element's attributes) so
  consumers get correct `aria-*`/`data-*`/event typings, supporting the `restProps` spread in
  `spirit:react`.
- Use `import type` for type-only imports to keep the boundary clear.

## Comments

- JSDoc on complex public types/logic helps consumers; flag misleading or stale type comments.
