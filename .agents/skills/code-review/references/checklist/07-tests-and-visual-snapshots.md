# 7. Tests and Visual Snapshots

- **New behavior is tested** (important) — New props, branches, hooks, and repositories have unit
  tests, including disabled, keyboard, error, and edge cases (scalar, empty, `undefined`).
- **Fixes have a regression test** (important) — A `fix` commit adds or changes a test that fails
  without the fix. When the bug cannot be unit tested (routing, build output), the PR description
  says how it was verified instead.
- **Accessibility tests** (important) — Components with interaction or ARIA changes are covered by
  their `*.accessibility.test.tsx`, including siblings that share a base.
- **Shared prop tests** (minor) — Use the shared tests (class-name, style-props, rest-props,
  `accessibilityAriaDescribedByTest`) instead of hand-written duplicates; check `UNSAFE_className`
  does not drop the component's own classes.
- **Test titles start with "should"** (minor) — Every `it()`, `test()`, and `it.each()` title the diff
  adds reads `it('should throw when …')`, not `it('throws when …')` or `it('maps …')`. Search the
  added lines for titles without it instead of judging by a sample; the missing "should" is easy to
  overlook. Leave titles in unchanged tests alone. Usually "Applies to the whole PR".
- **Test hygiene** (minor) — Queries prefer `screen.getByRole()`, tests live in `__tests__` next to
  the source, fakes use a `Test` prefix, `it.each` rows are not wrapped in an extra array, and
  oversized tests are split.
- **Snapshot changes are expected** (important) — Every changed PNG under `tests/e2e/**-snapshots/`
  is explained by the diff. A refactor leaves snapshots unchanged; a new demo section appears in
  them; obsolete PNGs are deleted; web and React do not get separate screenshots of the same demo.
- **Visual changes are verified** (question) — A visual change without updated snapshots or a
  screenshot gets a question.
