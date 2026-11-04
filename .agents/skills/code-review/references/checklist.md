# Spirit Review Checklist

What to look for in a Spirit diff. Every item comes from feedback that human reviewers raised
repeatedly in past PRs; [`review-history-analysis.md`](review-history-analysis.md) lists the evidence.
Items already enforced by linters or CI are intentionally absent.

Each item gives a **default severity** in parentheses. Apply only the areas whose files the diff touches
(see "Area Selection" in `SKILL.md`). Findings follow the format in `methodology.md`.

## 1. Cross-Package Parity (`packages/web` ↔ `packages/web-react`)

Spirit ships every component twice. A per-file reading cannot see drift, so check the pair.

- **Mirrored change** (important) — A new or changed React prop has the matching class, modifier, or
  `data-*` attribute in `packages/web`, and vice versa. Behavior matches for the same input (for
  example, arrow-key navigation that clamps in one and wraps in the other).
- **Classes React adds by default** (important) — Web markup in READMEs and demos includes what React
  renders implicitly (size modifiers such as `Item--medium`, `text-color-scheme`, `cursor-pointer`,
  `Icon` class with `aria-hidden="true"`).
- **README sync** (important) — Both package READMEs describe the same API and sections. A section
  added to one belongs in the other unless it is package-specific.
- **Demo sync** (important) — A demo added to one package exists in the other, or is excluded from
  visual comparison with the `hide-from-visual-tests` class. The e2e compare tests otherwise fail or
  silently miss it.
- **Sibling components** (minor) — A change to one member of a family (Text, Heading, EyebrowText;
  Checkbox, Radio, Toggle; HelperText, ValidationText) is applied to the siblings or the PR says why not.

## 2. Breaking Changes and Migrations

Experimental code (`UNSTABLE_*` exports and feature-flagged APIs) is not bound by semantic
versioning (see `docs/contribution/experimental-code.md`): breaking it needs no migration guide,
codemod, or `!` marker. Leftovers still apply, such as codemod mappings or `DEPRECATIONS.md` entries
for the removed API.

- **Migration guide and codemod** (blocking) — Removing or renaming a public prop, class, token, or
  default in a stable API ships entries in `docs/migrations/web/` and `docs/migrations/web-react/`
  and, for web-react, a codemod with fixtures. Follow `.agents/skills/breaking-change-checklist/SKILL.md`.
- **Codemod coverage** (important) — Codemod fixtures cover every trigger: omitted default props,
  aliased imports, spread props, and partial output (no empty `strings={{}}` left behind).
- **Correct commit marker** (important) — The commit uses `!` for a breaking change and `feat` (not
  `refactor`) for a deliberate public API change; the changelog is generated from it.
- **Only user-facing BCs** (important) — Migration guides leave out changes introduced and dropped
  within the same major and visual-only tweaks. Each item sits in the right package's guide.
- **Guide structure** (minor) — Sections follow the existing template ("🪄 Use codemods", "🔧 Manual
  Migration Steps"), use "previous/next" wording, and are sorted alphabetically by component.
- **Deprecations** (important) — Deprecating instead of removing follows
  `.agents/skills/component-deprecation/SKILL.md` in both packages. Stabilizing `UNSTABLE_*` follows
  `.agents/skills/stabilize-component/SKILL.md`.

## 3. Component API and React Implementation (`packages/web-react/src`)

- **Composition over props** (important) — Content areas are slots or composition (pass a
  `ContextualHelp`, not `contextualHelpText`); new APIs are controlled by default with logic in a hook.
- **Context props precedence** (important) — Local prop → context prop → default, merged in one place
  with `useContextProps` and a component namespace. Only values children consume go into context.
- **Style-prop conventions** (important) — Components use `useStyleProps`; style hooks return
  `{ classProps, styleProps, props }`. Consumers' `UNSAFE_className` and `UNSAFE_style` are merged,
  not overwritten.
- **Honest prop types** (important) — Props the component ignores are not exposed (`Omit` them);
  `??` is used where `""` or `0` are valid; no unnecessary type assertions.
- **Translations** (important) — User-facing strings (including `aria-label` text) come from
  `packages/web-react/src/translations/defaults.ts`, not literals.
- **Conditional props** (minor) — Optional props are spread conditionally
  (`{...(error && { validationState: 'danger' })}`) rather than passed as `undefined` from a ternary.
- **Robustness** (blocking → question) — Non-happy paths are handled: `null` from DOM lookups, missing
  provider values, empty or scalar inputs, API errors. Blocking when the diff shows wrong output;
  otherwise ask.
- **Exports** (important) — A new public component is exported from its `index.ts` and registered in
  `packages/web-react/package.json` exports where siblings are.

## 4. Reuse and Duplication (All Code)

- **Existing Spirit building blocks** (important) — Do not re-implement what exists:
  `CloseButton` for remove and dismiss actions, `UncontrolledTooltip`, `useToggle`, `useButtonLink`,
  `mergeProps`, `filterDOMProps`, `ContextPropsProvider`, shared string helpers. Search with
  `git grep` before accepting a new helper.
- **Exported constants over literals** (minor) — Demos, stories, `*.figma.ts`, docsite and exporters
  use exported constants (`BackgroundColors`, `EmotionColors`, `Sizes`, key and asset-type constants)
  instead of string literals. Story `options` list real values plus `undefined`.
- **Derived and shared types** (minor) — Reuse component prop types (`SpiritTileProps`) instead of
  copying; derive unions from constants; compose types bottom-up with `extends` instead of `Omit`
  from a larger type; keep types in the component's `types.ts`.
- **Fix at the source** (important) — Update the owning component instead of aliasing or patching
  it in a consumer or demo. Generic code (`Collapse`, selection utilities) knows nothing about
  specific components. Unwanted generated tokens are removed in Figma or Supernova, not only in the
  output.
- **New dependencies** (question) — A new runtime dependency is justified against existing ones
  (the repository already uses zod, cosmiconfig, sade, Jest) and the platform.

## 5. Styles and Tokens (`*.scss`)

- **Tokens, not raw values** (important) — Sizes, spacing, radii, and colors use design tokens or
  `theme.$…` variables; lengths are in `rem` via `px-to-rem()` (see `docs/contribution/units.md`).
  Stylelint does not catch raw `px` or hex values.
- **Real tokens, not fallbacks** (important) — Component tokens are used where they exist; fallback
  variables carry a `-fallback` suffix. Unused tokens are removed. Token names match siblings.
- **Sizing lives in CSS** (important) — Icon and element sizes come from component CSS or custom
  properties, not React props, `boxSize`, `width` attributes, or `cloneElement`.
- **No cross-component selectors** (important) — A component's SCSS does not select another
  component's classes. `.is-*`/`.has-*` are JS states; utility classes are separate.
- **Simple selectors** (minor) — Prefer `:is()`, `:first-child`, `:last-child` over extra modifiers;
  every `stylelint-disable` has a reason; `no-descending-specificity` suppressions are questioned.
- **Reduced motion** (important) — Animations are wrapped in
  `@media (prefers-reduced-motion: no-preference)`.
- **Numbered comments** (minor) — SCSS explanations use the file's `// 1.` reference style, numbered
  in order.
- **Matches Figma** (question) — Colors, sizes, and weights match the design; ask for a screenshot
  comparison when the PR changes visuals without one.

## 6. Markup and Accessibility (`*.tsx`, `*.html`, `*.hbs`, READMEs)

Apply `.agents/skills/accessibility/references/accessibility-checklist.md` for depth. The issues
reviewers raise most often:

- **Correct ARIA pattern** (blocking) — Roles follow the WAI-ARIA APG pattern the component claims
  (listbox vs grid, `aria-activedescendant` only where focus stays on the container), with the
  matching keyboard contract. Triggers carry `aria-expanded` and `aria-controls`.
- **Valid HTML and references** (important) — No block elements inside inline ones; `for`/`id`,
  `aria-describedby`, and `aria-controls` references resolve; no invalid `role` values.
- **Disabled state** (important) — `disabled` on buttons, `aria-disabled` on links and options;
  `aria-current="page"` only for the current page.
- **Labels** (important) — No duplicate accessible names, no role words in labels
  ("Main", not "Main navigation"), translatable `aria-label`s, correct heading levels.
- **Live regions** (important) — Dynamic content uses `aria-live` / `role="status"` deliberately and
  the README documents it.

## 7. Tests and Visual Snapshots

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
- **Test hygiene** (minor) — Titles read `it('should …')`, queries prefer `screen.getByRole()`,
  tests live in `__tests__` next to the source, fakes use a `Test` prefix, `it.each` rows are not
  wrapped in an extra array, and oversized tests are split.
- **Snapshot changes are expected** (important) — Every changed PNG under `tests/e2e/**-snapshots/`
  is explained by the diff. A refactor leaves snapshots unchanged; a new demo section appears in
  them; obsolete PNGs are deleted; web and React do not get separate screenshots of the same demo.
- **Visual changes are verified** (question) — A visual change without updated snapshots or a
  screenshot gets a question.

## 8. Demos, Previews, and Stories

- **Spirit composition in demos** (minor) — Demos and README examples use `Stack`, `Flex`, `Grid`,
  `Box`, `Container`, and their spacing props instead of raw `div`/`span`, margin utilities,
  `UNSAFE_style`, or nested `DocsStack`.
- **Omit default values** (minor) — Demos, READMEs, stories, and tests do not pass props equal to the
  default; examples showcase non-default values. Usually "Applies to the whole PR".
- **Static coverage** (important) — Every new variant, state, or composition has a static demo in
  `preview.html` / `demo/` so visual tests cover it (dynamic-only examples slip through), including
  non-default themes where relevant.
- **Accurate titles** (minor) — Demo titles, filenames, and README headings describe what is shown.
- **Stories** (minor) — Stories let the playground show new props and slots (a boolean proxy arg is
  fine for a `ReactNode` slot) and drop "experimental" naming after stabilization. Report only when
  a feature cannot be shown at all.
- **Leftover utilities** (minor) — No stray utility classes (`d-inline-block`) or wrappers in
  `preview.html`.
- **Content** (minor) — Demo copy is in English; percentages follow the existing typography
  (`60 %` with a space).

## 9. Documentation (READMEs, `docs/`, ADRs)

- **API table complete** (important) — Every new or renamed prop has a README row with the correct
  type, default, required flag, and a description; types match `types.ts`.
- **True statements** (important) — Documented defaults and behavior hold for that package (no CSS-only
  defaults in React docs, no internal CSS variables, no numbers that will go stale).
- **Examples match the implementation** (important) — Snippets mirror the real markup and props so
  copy-paste works.
- **Written for the consumer** (important) — Explain why and the constraints (for example "the
  ancestor needs `position: relative`"); leave out internals, preview links, and name-dropping.
- **Link, don't duplicate** (minor) — Link to the other component's docs, `docs/development/utilities.md`,
  or MDN instead of repeating them. New utilities and helpers are documented there.
- **Version-agnostic** (minor) — Component READMEs describe the current API; "new in" notes and
  upgrade instructions belong in `docs/migrations/`.
- **Progressive structure** (minor) — Examples go from basic to complex, one per code block, with
  intro text.
- **Alphabetical order** (minor) — Props in tables, components, stories, SCSS maps, and migration
  guide sections are sorted alphabetically (reviewers flag this with 🔤).
- **ADRs record decisions** (important) — `docs/decisions/*.md` keeps the decision short; workflow
  documentation goes elsewhere; a changed decision gets a new ADR that supersedes the old one.
- **Organization name** (important) — Links and fixtures use `alma-oss`, not `lmc-eu`.

## 10. Docsite (`apps/docsite`)

Apply `.agents/skills/docsite-composition/SKILL.md` and `.agents/skills/docsite-styles/SKILL.md`.
The issues reviewers raise most often:

- **Domain and feature layout** (minor) — Data access in `*Repository`, static data in `constants/`,
  hooks outside `ui/`; features do not import from each other (shared code moves up a level).
- **Server-first React** (minor) — No unneeded `'use client'` or `async`; compose in `page`, not
  `layout`; use `NextLink` and `Script`.
- **One component per file** (minor) — Split multi-component and oversized files; remove unused ones.
- **Error states** (important) — Fetching code handles failures with an error state, not a crash.

## 11. Comments, Naming, and Leftovers (All Code)

- **Explain workarounds** (important) — Hacks, specificity bumps, and non-obvious regexes carry a
  comment saying why, linked to the upstream issue or Jira ticket when temporary.
- **No noise comments** (minor) — Remove comments that restate the code; keep comment style
  consistent within a file.
- **Leftovers** (important) — After a rename or removal, `git grep` both packages, docs, stories,
  fixtures, and skills for the old name. Markup does not reference classes that no longer exist.
- **Dead code** (minor) — Remove unused helpers, tokens, constants, and single-use wrappers.
- **Naming** (minor) — Names say what the code does and follow existing APIs (`isStretched` as in
  `Link`); no `has*` in class modifiers; no `Type` suffix on props (reserved for TS types);
  `UNSTABLE_` only on the public component; no names that clash with Spirit components.

## 12. Commits and PR Scope

Commitlint already checks format, scope list, and issue references. Check what it cannot:

- **Type matches intent** (important) — `feat` vs `refactor` vs `fix` vs `docs`; `!` for breaking
  a stable API.
- **Descriptive subject** (minor) — The subject reads well in the changelog and does not repeat the
  type ("fix: fix …").
- **No AI attribution** (important) — No `Co-authored-by` trailers or "Generated with" lines.
- **Commit order** (minor) — Web before React for a shared feature; no commit references work that
  lands later.
- **PR scope** (important) — Unrelated changes go to a separate PR; out-of-scope findings become a
  Jira issue linked from the PR. An API change without stated motivation gets a question.
- **Does what it says** (important) — The change does what the Jira acceptance criteria and the PR
  title promise, checked by behavior, not by the presence of code. See the Jira step in `SKILL.md`
  for missing, partial, and diverging criteria.

## 13. CI Workflows (`.github/`)

- **Injection safety** (blocking) — Inputs and matrix values reach `run:` via `env:`, not inline
  `${{ }}` interpolation.
- **Status functions** (important) — `if:` conditions that should run after failure use an explicit
  status function (`!cancelled()`).
- **Permissions and checkout** (question) — Removed permissions and sparse checkouts are checked
  against every step that needs them (for example `.yarn/plugins`, `nx-cache-save`).

## 14. Agent Skills and Instructions (`.agents/`, `AGENTS.md`)

- **Trigger description** (important) — `description` says what the skill does and "Use when …".
- **Tool-agnostic** (important) — No tool-specific calls (`AskUserQuestion`), no assumed binaries
  (`ripgrep`, Python); `yarn` not `npx`; works in Claude Code and Cursor.
- **Single responsibility** (minor) — Skills reference each other instead of duplicating content;
  related skills are updated together (for example `stabilize-component` with `component-deprecation`).
- **Current API** (important) — Examples match the current major (v5 classes, `rem` units).
