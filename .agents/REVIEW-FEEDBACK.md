# Review Instructions

Current recurring review feedback on Spirit pull requests, loaded on every AI-assisted review.
The stable policy (severity, what not to report, what to always check, package instructions) is in the
[`spirit:code-review`][policy] skill, and the [checklist][checklist] encodes the themes.
The [`spirit:review-feedback`][feedback-skill] skill keeps this file up to date.

## Last Run

<!-- Keep this line when clearing themes: the next `--since` run starts from "Latest merged". -->

Collected: 2026-11-25. Latest merged: 2026-11-24T09:27:57Z. 238 PRs with human feedback (200 merged up to 2026-11-02, 38 merged 2026-11-02 to 2026-11-24), 2,202 human review comments. The latest run had 7 reviewers.

## Recurring Themes

Ordered by the number of PRs, highest first. Each theme is a rule a reviewer can check on a diff, with the number of
distinct PRs where reviewers raised it and example PRs.

- **New Behavior, Branches, and Edge Cases Lack Tests** (33 PRs, Important to Blocking; checklist section 7): New props, branches, hooks, and repositories have unit tests, including disabled, keyboard, error, and edge cases (scalar, empty, `undefined`). Components with interaction or ARIA changes also get their `*.accessibility.test.tsx`. Examples: #2803, #2934, #3008.
- **Unclear or Inconsistent Names** (30 PRs, Minor; checklist section 11): Names say what the code does and follow existing APIs: no `has*` in class modifiers, no `Type` suffix on props, no near-identical function names, no names that clash with Spirit components. Examples: #2771, #2951, #3078.
- **Wrong ARIA Pattern, Labels, Semantics, or Invalid HTML** (29 PRs, Blocking to Important; checklist section 6): Roles follow the WAI-ARIA pattern the component claims, with the matching keyboard contract. References resolve, labels are unique and translatable, and live regions are deliberate and documented. Examples: #2814, #2873, #3049.
- **Commit Type Does Not Match Intent, Missing `!`, AI Trailers** (27 PRs, Important; checklist section 12): `feat` vs `refactor` vs `fix` follows the intent, `!` marks a breaking change to a stable API, the subject reads well in the changelog, and there are no `Co-authored-by` trailers or AI attribution. Examples: #2698, #2723, #3066.
- **Dead Code, Stale Classes, or Leftovers After a Rename** (26 PRs, Important; checklist section 11): After a rename or removal, search both packages, docs, stories, fixtures, and skills for the old name. Markup does not reference classes that no longer exist, and unused helpers and tokens go. Examples: #2715, #2738, #2814.
- **Logic in the Wrong Module, Cross-Component Coupling, Docsite Layout** (26 PRs, Important; checklist section 3, 10): Data access lives in repositories, generic code knows nothing about specific components, and docsite features do not import from each other. Shared code moves up a level. Examples: #2934, #2992, #3049.
- **Docs Duplicate Other Docs, Expose Internals, or Are Not Consumer-Facing** (25 PRs, Important; checklist section 9): READMEs and docs explain why and the constraints for the consumer. They link to other docs instead of repeating them and leave out internals, preview links, and name-dropping. Examples: #2814, #2922, #3023.
- **Change Applied to Only One of `web` / `web-react`** (24 PRs, Important; checklist section 1): A prop, modifier, class, or demo added in one package needs its counterpart in the other, or the PR says why not. Behavior and README wording match for the same input. Examples: #2814, #2976, #3066.
- **Skill Lacks a Trigger, Assumes Tools, or Duplicates Other Skills** (22 PRs, Important; checklist section 14): A skill's `description` says what it does and "Use when …", works in Claude Code and Cursor, and relies on common tooling. Skills reference each other instead of duplicating content. Examples: #2748, #2775, #3069.
- **Unexpected, Stale, or Missing E2E Snapshot Changes** (20 PRs, Important; checklist section 7): Every changed PNG under `tests/e2e/**-snapshots/` is explained by the diff. A refactor leaves snapshots unchanged, obsolete PNGs are deleted, and web and React do not get separate screenshots of the same demo. Examples: #2730, #2736, #2808.
- **Raw Markup or Styles Instead of Spirit Layout Components** (20 PRs, Minor; checklist section 8): Demos and README examples use `Stack`, `Flex`, `Grid`, `Box`, `Container`, and their spacing props instead of raw `div`/`span`, margin utilities, or `UNSAFE_style`. Examples: #2740, #2803, #3055.
- **Re-Implemented Spirit Components, Hooks, or Utilities** (20 PRs, Important; checklist section 4): Do not re-implement what exists (`CloseButton`, `UncontrolledTooltip`, `useButtonLink`, `mergeProps`, `filterDOMProps`). Search with `git grep` before accepting a new helper. Examples: #2803, #2889, #3049.
- **README API Table and Sections Incomplete** (20 PRs, Important; checklist section 9): Every new or renamed prop has a README row with the correct type, default, required flag, and description. Both package READMEs describe the same API and sections. Examples: #2889, #2951, #3008.
- **Workaround or Non-Obvious Code Without an Explaining Comment** (20 PRs, Important; checklist section 11): Hacks, specificity bumps, and non-obvious regexes carry a comment saying why, linked to the upstream issue or Jira ticket when temporary. Examples: #2726, #2869, #3025.
- **Breaking Change Without Migration Guide or Codemod** (18 PRs, Blocking; checklist section 2): Removing or renaming a public prop, class, token, or default in a stable API ships entries in both migration guides and, for web-react, a codemod with fixtures. Experimental (`UNSTABLE_*`) APIs are exempt. Examples: #2734, #2738, #2771.
- **Out-of-Scope Work in the PR Instead of a Follow-Up Issue** (18 PRs, Important; checklist section 12): Unrelated changes go to a separate PR, and out-of-scope findings become a Jira issue linked from the PR. Examples: #2730, #2928, #3102.
- **Raw Values, Fallback Tokens, or Sizing in React Instead of CSS** (17 PRs, Important; checklist section 5): Sizes, spacing, radii, and colors use design tokens in `rem`. Component tokens are used where they exist, and icon and element sizes come from CSS, not React props. Examples: #2732, #2734, #2754.
- **New Variant or Composition Has No Static Demo or Story** (16 PRs, Important; checklist section 8): Every new variant, state, or composition has a static demo in `preview.html` / `demo/`, so visual tests cover it. Dynamic-only examples slip through. Examples: #2803, #2976, #3046.
- **Duplicated or Copied Types Instead of Derived Ones** (15 PRs, Minor; checklist section 4): Reuse component prop types instead of copying them, derive unions from constants, and do not expose props the component ignores (`Omit` them). Examples: #2747, #2959, #3078.
- **Literals Instead of Exported Constants** (15 PRs, Minor; checklist section 4): Demos, stories, `*.figma.ts`, docsite, and exporters use exported constants (`BackgroundColors`, `EmotionColors`, `Sizes`, key constants) instead of string literals. Examples: #2970, #3029, #3055.
- **Props Instead of Composition, Context Precedence, Style-Prop Shape** (15 PRs, Important; checklist section 3): Content areas are slots or composition, not text props. Context props follow local prop, then context prop, then default. Style hooks return `{ classProps, styleProps, props }`. Examples: #2918, #2943, #3049.
- **Props Equal to the Default Are Passed in Demos and Docs** (14 PRs, Minor; checklist section 8): Demos, READMEs, stories, and tests do not pass props equal to the default. Examples showcase non-default values. Usually "Applies to the whole PR". Examples: #2669, #2760.
- **Props, Demos, or Sections Not Sorted Alphabetically** (14 PRs, Minor; checklist section 9): Props in tables, components, stories, SCSS maps, and migration guide sections are sorted alphabetically. Reviewers flag this with 🔤. Examples: #2672, #2814, #2907.
- **Unhandled Error Paths, `null` Lookups, Wrong Fallbacks** (13 PRs, Blocking to Question; checklist section 3): Non-happy paths are handled: `null` from DOM lookups, missing provider values, empty or scalar inputs, and API errors. Blocking when the diff shows wrong output, otherwise ask. Examples: #2911, #2960, #3038.
- **README Statements or Examples Do Not Match the Implementation** (12 PRs, Important; checklist section 9): Documented defaults and behavior hold for that package, and snippets mirror the real markup and props so copy-paste works. Examples: #2741, #2959, #3066.
- **Migration Guide Structure, Wording, or Non-BC Entries** (10 PRs, Important; checklist section 2): Migration guides list only user-facing breaking changes, follow the existing template, and use the same structure in both packages. Examples: #2730, #2781.
- **Implementation Differs From Figma** (10 PRs, Question; checklist section 5): Colors, sizes, spacing, and weights match the design. Ask for a screenshot comparison when the PR changes visuals without one. Examples: #2723, #2879, #3055.
- **CI Workflows: Injection, Status Functions, Permissions** (8 PRs, Blocking to Question; checklist section 13): Inputs reach `run:` via `env:`, not inline `${{ }}`. `if:` conditions that should run after a failure use `!cancelled()`, and removed permissions are checked against every step. Examples: #2921, #3022, #3038.
- **Complex Selectors, Cross-Component Classes, Reduced Motion** (6 PRs, Important; checklist section 5): A component's SCSS does not select another component's classes, prefers `:is()` and `:first-child` over extra modifiers, and wraps animations in `prefers-reduced-motion`. Examples: #2686, #2976.
- **ADR Documents a Workflow Instead of Recording a Decision** (6 PRs, Important; checklist section 9): `docs/decisions/*.md` says what was decided, not how. Workflow documentation goes elsewhere, and a changed decision gets a new ADR that supersedes the old one. Examples: #2921, #3066.
- **PR Description Out of Sync With the Change** (3 PRs, Minor to Important; checklist section 12): The PR description matches the final diff, is written in English, and lists consumer-visible changes and any split or stacked PR. Examples: #3066, #2997, #3059.
- **Hardcoded User-Facing Strings Instead of Translations** (2 PRs, Important; checklist section 3): User-facing strings, including `aria-label` text, come from `packages/web-react/src/translations/defaults.ts`, not literals. Examples: #2882.
- **Stale `lmc-eu` Organization Name** (2 PRs, Important; checklist section 9): Links and fixtures use `alma-oss`, not `lmc-eu`. Examples: #2734.

## Themes Not Promoted

- **Release notes curation** (7 PRs) is owned by `spirit:release-notes`.
- **Exporter build tooling** and **data-structure performance** (2 PRs each) are too specific to
  generalize into a rule.

[checklist]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist.md
[feedback-skill]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/review-feedback/README.md
[policy]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/policy.md
