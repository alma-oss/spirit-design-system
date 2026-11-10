# Review Policy

The stable policy of Spirit reviews: severity, what not to report, what to always check, and what applies to which
package. The [`REVIEW-FEEDBACK.md`][review-md] holds the current recurring themes and is loaded on every review.

## Severity

- **Blocking** is a correctness, accessibility, or security problem, or a breaking change of a stable API without
  a migration guide and codemod.
- **Important** is a real problem that does not break consumers: missing tests, README or demo gaps,
  `web` / `web-react` inconsistencies, dead code.
- **Minor** is cheap consistency work: naming, alphabetical order, default values in demos.
- Mark anything uncertain as a question instead of a defect.

## Do Not Report

- Anything a linter or a CI check already enforces: formatting, import order, commit message format,
  broken links, type errors.
- Issues in code the diff does not touch.
- Changes to `UNSTABLE_*` components that lack a migration guide or codemod.
- Release notes wording.

## Always Check

- A change in `packages/web` has its counterpart in `packages/web-react`, and the other way around.
- Every new or changed prop has a README row, a test, and a static demo or story.
- Removed or renamed public API has entries in both migration guides and, for `web-react`, a codemod.
- Sizes, spacing, and colors use design tokens, not raw values.
- Existing components, hooks, and utilities are reused instead of re-implemented.
- Changed E2E snapshots are explained by the diff.

## Instructions by Package

| Path                     | Apply                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `packages/web-react`     | Always check, plus tests, accessibility, composition, and translations              |
| `packages/web`           | Always check, plus markup parity, SCSS conventions, and demos                       |
| `packages/design-tokens` | Token naming and units; no raw values                                               |
| `packages/codemods`      | Fixtures for every transform                                                        |
| `apps/docsite`           | Docsite composition and styles skills; features do not import each other            |
| `.agents/skills`         | Skills have a "Use when" description and rely on common tooling only                |
| `.github/workflows`      | Inputs reach `run:` via `env:`; `if:` conditions after a failure use `!cancelled()` |
| `docs/decisions`         | An ADR records a decision, not a workflow                                           |

[review-md]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/REVIEW-FEEDBACK.md
