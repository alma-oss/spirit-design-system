# General Checks

These are not Spirit-specific. Report a finding only when the diff shows the concrete problem (see
the confidence rule in `methodology.md`); never list the check names as headings.

## Correctness and Bugs

- **Logic errors** (blocking → question) — Inverted conditions, wrong comparisons, off-by-one and
  boundary errors, inconsistent state transitions.
- **Nullish and empty values** (important) — `null`/`undefined` from lookups, optional props, empty
  arrays, and `0` or `""` as valid values are handled.
- **Async and cleanup** (important) — Race conditions on shared state, stale closures, effects and
  listeners that are not cleaned up, resources not released.

## Security

- **Injection and XSS** (blocking) — User input reaches `dangerouslySetInnerHTML`, `innerHTML`, URLs
  (`javascript:`), shell commands, or workflow `run:` steps without escaping. CI-specific checks are in section 13.
- **Secrets** (blocking) — No credentials, tokens, or keys in code, fixtures, logs, or error messages.
- **External links** (important) — `target="_blank"` links in HTML, Handlebars, and Markdown carry
  `rel="noopener"` (`noreferrer` where needed). ESLint already checks JSX in `web-react`.
- **Dependencies** (question) — A new or bumped dependency is justified and maintained (see section 4).

## Silent Failures

- **Swallowed errors** (important) — No broad `catch` that hides the cause, rejected promises are
  handled, and fallbacks do not mask real errors. ESLint already rejects an empty `catch`.
- **Placeholders** (important → question) — A mock, stub, or `TODO` implementation is not shipped
  unannounced. When follow-up work is planned on purpose (for example a story completed in a later
  issue), the `TODO` links that issue; when nothing says so, ask.

## Type Design

- **Invalid states** (minor) — Types make invalid states unrepresentable (a discriminated union instead of
  several optional booleans).
- **Type assertions** (important) — An `as` assertion is backed by a check or a comment; a type guard or a
  corrected type is preferred. ESLint already rejects `any` and a `@ts-ignore` without a description.
- **Narrow public surface** (minor) — Internals are not exported or exposed as mutable state.

## Code Simplification

- **Simplest solution** (minor) — Is there a shorter or more standard way? Remove deep nesting,
  redundant branches, and abstractions with a single use.
- **Clarity** (minor) — A new reader can follow the code without implicit ordering or hidden side effects.
