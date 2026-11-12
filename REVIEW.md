# Review Feedback

What Spirit reviewers repeatedly ask for in pull requests, written to be read by people and by the
[`spirit:code-review`][code-review-skill] skill. The [`spirit:review-feedback`][feedback-skill] skill keeps it up to date.

Use it during a review: scan the headings, check the diff against each rule, and raise a finding when
the diff matches. Each theme has the rule a reviewer can check, one or more real review comments as
examples, and the section of the [checklist][checklist] that encodes it.

This file is a **feedback log**, not a rulebook. New themes land here first. Once a theme has proven
stable, it is promoted into the skill's checklist during a periodic refresh (every month or two).

## How to Read a Theme

```markdown
### <Theme> (<N> PRs, <typical severity>)

<The rule, phrased so it can be checked on a diff.>

> "<A real review comment.>" — #<PR>

Checklist: section <number>
```

- **Theme** headings use title case because the Markdown linter requires it.
- **N PRs** counts the distinct PRs where reviewers raised the theme.
- **Typical severity** uses the `spirit:code-review` severities. "A to B" means it depends on impact.
- **Checklist** is the section of [`checklist.md`][checklist] that encodes the theme.
- Quotes are verbatim and may be shortened. PR numbers link to
  `https://github.com/alma-oss/spirit-design-system/pull/<number>`.

## Dataset

- Collected: 2026-11-04
- Latest merged: 2026-11-02
- PRs with human feedback: 200 (#2660 to #3058), merged between 2026-05-25 and 2026-11-02
- Human review comments: 1,830 from 6 reviewers

## Recurring Themes

Ordered by the number of PRs, highest first.

### Wrong ARIA Pattern, Labels, Semantics, or Invalid HTML (27 PRs, Blocking to Important)

Roles follow the WAI-ARIA pattern the component claims, with the matching keyboard contract. References resolve, labels are unique and translatable, and live regions are deliberate and documented.

> "without the `role="dialog"` attribute, screen readers probably won’t recognise that this element is there at all or that it can be interacted with, so IMO we should set these attributes there…" — [#2814](https://github.com/alma-oss/spirit-design-system/pull/2814)

> "`aria-live="off"` completely disables the live region functionality (so the `aria-relevant="additions" becomes meaningless)" — [#2873](https://github.com/alma-oss/spirit-design-system/pull/2873)

Checklist: section 6

### New Behavior, Branches, and Edge Cases Lack Tests (26 PRs, Important to Blocking)

New props, branches, hooks, and repositories have unit tests, including disabled, keyboard, error, and edge cases (scalar, empty, `undefined`). Components with interaction or ARIA changes also get their `*.accessibility.test.tsx`.

> "issue: Missing tests." — [#2934](https://github.com/alma-oss/spirit-design-system/pull/2934)

> "Could you please also add `UNSTABLE_SplitTag.accessibility.test.tsx`? Thanks!" — [#2803](https://github.com/alma-oss/spirit-design-system/pull/2803)

> "What about scalar and undefined cases?" — [#3008](https://github.com/alma-oss/spirit-design-system/pull/3008)

Checklist: section 7

### Unclear or Inconsistent Names (26 PRs, Minor)

Names say what the code does and follow existing APIs: no `has*` in class modifiers, no `Type` suffix on props, no near-identical function names, no names that clash with Spirit components.

> "we do not use has* in classnames afaik." — [#2771](https://github.com/alma-oss/spirit-design-system/pull/2771)

> "Please think about better naming. These two functions differ only in `s` and are in the same context. I was lost for a while." — [#2951](https://github.com/alma-oss/spirit-design-system/pull/2951)

Checklist: section 11

### Commit Type Does Not Match Intent, Missing `!`, AI Trailers (23 PRs, Important)

`feat` vs `refactor` vs `fix` follows the intent, `!` marks a breaking change to a stable API, the subject reads well in the changelog, and there are no `Co-authored-by` trailers or AI attribution.

> "This is a deliberate change in public API; use `feat` instead of `refactor`, please." — [#2698](https://github.com/alma-oss/spirit-design-system/pull/2698)

> "The "Update UNSTABLE_Picker design" will be displayed in the changelog and release notes. Can we be more descriptive, please? Also, get rid of those co-authored notices, please." — [#2723](https://github.com/alma-oss/spirit-design-system/pull/2723)

Checklist: section 12

### Docs Duplicate Other Docs, Expose Internals, or Are Not Consumer-Facing (22 PRs, Important)

READMEs and docs explain why and the constraints for the consumer. They link to other docs instead of repeating them and leave out internals, preview links, and name-dropping.

> "imho this is internal and I would not really advertise it, it can change without a BC" — [#2922](https://github.com/alma-oss/spirit-design-system/pull/2922)

> "why not just link the Container docs? it duplicates the info?" — [#3023](https://github.com/alma-oss/spirit-design-system/pull/3023)

> "Please describe this from the view of the user/developer who wants to use this component. I have to use the AI agent to explain to me what it does." — [#2814](https://github.com/alma-oss/spirit-design-system/pull/2814)

Checklist: section 9

### Change Applied to Only One of `web` / `web-react` (22 PRs, Important)

A prop, modifier, class, or demo added in one package needs its counterpart in the other, or the PR says why not. Behavior and README wording match for the same input.

> "Dropdown has `role="dialog"` and `aria-labelledby` here in React, but not in the `web` package. It looks like an inconsistency in the Dropdown component." — [#2814](https://github.com/alma-oss/spirit-design-system/pull/2814)

> "The clear-button example you have in React should be in the web demo too" — [#2976](https://github.com/alma-oss/spirit-design-system/pull/2976)

> "Keep the terminology in sync with React, whatever term you decide to use." — [#2814](https://github.com/alma-oss/spirit-design-system/pull/2814)

Checklist: section 1

### Dead Code, Stale Classes, or Leftovers After a Rename (21 PRs, Important)

After a rename or removal, search both packages, docs, stories, fixtures, and skills for the old name. Markup does not reference classes that no longer exist, and unused helpers and tokens go.

> "Dead code. Please, remove it." — [#2715](https://github.com/alma-oss/spirit-design-system/pull/2715)

> "`Item--selected` class does not exist. Either remove it, or add support of component overrides to Item using the `component-color-overrides.generate()` Sass mixin, including docs (see Alert for inspiration)." — [#2814](https://github.com/alma-oss/spirit-design-system/pull/2814)

> "I think this is no longer true. The `isDisabled` prop is required on `ControlButton` and it already re-applies the disabled color scheme." — [#2738](https://github.com/alma-oss/spirit-design-system/pull/2738)

Checklist: section 11

### Unexpected, Stale, or Missing E2E Snapshot Changes (18 PRs, Important)

Every changed PNG under `tests/e2e/**-snapshots/` is explained by the diff. A refactor leaves snapshots unchanged, obsolete PNGs are deleted, and web and React do not get separate screenshots of the same demo.

> "I just believe the visual snapshots should remain unchanged." — [#2736](https://github.com/alma-oss/spirit-design-system/pull/2736)

> "i still see two screenshots, drop them? By running `make test-e2e-update`, they are not deleted, and they need to be removed manually" — [#2730](https://github.com/alma-oss/spirit-design-system/pull/2730)

> "Not sure why some of the E2E tests have been updated 🤔 Styles for medium label should be the same, right?" — [#2808](https://github.com/alma-oss/spirit-design-system/pull/2808)

Checklist: section 7

### Raw Markup or Styles Instead of Spirit Layout Components (18 PRs, Minor)

Demos and README examples use `Stack`, `Flex`, `Grid`, `Box`, `Container`, and their spacing props instead of raw `div`/`span`, margin utilities, or `UNSAFE_style`.

> "Instead of repeating the margin everywhere, I'd encourage using `Stack` or `FieldGroup`." — [#2740](https://github.com/alma-oss/spirit-design-system/pull/2740)

> "Please, wrap content into the Stack with `space-300`." — [#2803](https://github.com/alma-oss/spirit-design-system/pull/2803)

Checklist: section 8

### Logic in the Wrong Module, Cross-Component Coupling, Docsite Layout (18 PRs, Important)

Data access lives in repositories, generic code knows nothing about specific components, and docsite features do not import from each other. Shared code moves up a level.

> "Move these functions to the repository pattern, the same way as components do." — [#2934](https://github.com/alma-oss/spirit-design-system/pull/2934)

> "Move the entire component playground into its own feature." — [#2992](https://github.com/alma-oss/spirit-design-system/pull/2992)

Checklist: section 3, 10

### Re-Implemented Spirit Components, Hooks, or Utilities (17 PRs, Important)

Do not re-implement what exists (`CloseButton`, `UncontrolledTooltip`, `useButtonLink`, `mergeProps`, `filterDOMProps`). Search with `git grep` before accepting a new helper.

> "I think we have a `CloseButton` already." — [#2803](https://github.com/alma-oss/spirit-design-system/pull/2803)

> "Use `filterDOMProps`." — [#2803](https://github.com/alma-oss/spirit-design-system/pull/2803)

> "I think we should use `useButtonLink` hook instead for now." — [#2889](https://github.com/alma-oss/spirit-design-system/pull/2889)

Checklist: section 4

### README API Table and Sections Incomplete (17 PRs, Important)

Every new or renamed prop has a README row with the correct type, default, required flag, and description. Both package READMEs describe the same API and sections.

> "Missing `href` prop" — [#2889](https://github.com/alma-oss/spirit-design-system/pull/2889)

> "Missing `strings` API here." — [#2951](https://github.com/alma-oss/spirit-design-system/pull/2951)

> "These classes are not listed in `docs/development/utilities.md`. That page still only has the uniform `rounded-*` classes." — [#3008](https://github.com/alma-oss/spirit-design-system/pull/3008)

Checklist: section 9

### Breaking Change Without Migration Guide or Codemod (16 PRs, Blocking)

Removing or renaming a public prop, class, token, or default in a stable API ships entries in both migration guides and, for web-react, a codemod with fixtures. Experimental (`UNSTABLE_*`) APIs are exempt.

> "No migration guides or codemods? 👀" — [#2738](https://github.com/alma-oss/spirit-design-system/pull/2738)

> "MG&C pls! (migration guide and codemod)" — [#2771](https://github.com/alma-oss/spirit-design-system/pull/2771)

> "No codemod?" — [#2734](https://github.com/alma-oss/spirit-design-system/pull/2734)

Checklist: section 2

### New Variant or Composition Has No Static Demo or Story (16 PRs, Important)

Every new variant, state, or composition has a static demo in `preview.html` / `demo/`, so visual tests cover it. Dynamic-only examples slip through.

> "Please add a static example with an `endSlot`. Dynamic `endSlot` slips through visual tests untested." — [#2976](https://github.com/alma-oss/spirit-design-system/pull/2976)

> "Is a given composition available in the preview? If not, could you add one, please?" — [#3046](https://github.com/alma-oss/spirit-design-system/pull/3046)

> "We are missing the `isSubtle` variant in the demo." — [#2803](https://github.com/alma-oss/spirit-design-system/pull/2803)

Checklist: section 8

### Raw Values, Fallback Tokens, or Sizing in React Instead of CSS (15 PRs, Important)

Sizes, spacing, radii, and colors use design tokens in `rem`. Component tokens are used where they exist, and icon and element sizes come from CSS, not React props.

> "imho this is wrong. You used the fallback, not the actual tokens needed (`buttons`)." — [#2732](https://github.com/alma-oss/spirit-design-system/pull/2732)

> "pls make all these use rems" — [#2754](https://github.com/alma-oss/spirit-design-system/pull/2754)

> "do we need to set this? the icon size should imho be set by the CSS" — [#2734](https://github.com/alma-oss/spirit-design-system/pull/2734)

Checklist: section 5

### Workaround or Non-Obvious Code Without an Explaining Comment (15 PRs, Important)

Hacks, specificity bumps, and non-obvious regexes carry a comment saying why, linked to the upstream issue or Jira ticket when temporary.

> "Please add an appropriate comment about the workaround and link the Jira ticket, so we know we want to remove this in the future." — [#2726](https://github.com/alma-oss/spirit-design-system/pull/2726)

> "Please drop a comment explaining what's going on here." — [#2869](https://github.com/alma-oss/spirit-design-system/pull/2869)

> "please comment the regexp since it is not only a replacement." — [#3025](https://github.com/alma-oss/spirit-design-system/pull/3025)

Checklist: section 11

### Skill Lacks a Trigger, Assumes Tools, or Duplicates Other Skills (15 PRs, Important)

A skill's `description` says what it does and "Use when …", works in Claude Code and Cursor, and relies on common tooling. Skills reference each other instead of duplicating content.

> "The `description` should have something like `use when the user asks for upgrading node.js version` or something like that." — [#2748](https://github.com/alma-oss/spirit-design-system/pull/2748)

> "Are you sure the ripgrep is installed on the target machine?" — [#2775](https://github.com/alma-oss/spirit-design-system/pull/2775)

> "Do you need a separate skill for that, given that it’s already part of it `web-css-cross-check.md` > Feature Flags to Remove?" — [#2775](https://github.com/alma-oss/spirit-design-system/pull/2775)

Checklist: section 14

### Props Equal to the Default Are Passed in Demos and Docs (14 PRs, Minor)

Demos, READMEs, stories, and tests do not pass props equal to the default. Examples showcase non-default values. Usually "Applies to the whole PR".

> "Defaults, can be omitted" — [#2669](https://github.com/alma-oss/spirit-design-system/pull/2669)

> "Default value, can be omitted (applies for the whole file)" — [#2760](https://github.com/alma-oss/spirit-design-system/pull/2760)

Checklist: section 8

### Out-of-Scope Work in the PR Instead of a Follow-Up Issue (14 PRs, Important)

Unrelated changes go to a separate PR, and out-of-scope findings become a Jira issue linked from the PR.

> "Unrelated change?" — [#2730](https://github.com/alma-oss/spirit-design-system/pull/2730)

> "We don't need to extend the demo, especially since it doesn't show what we are fixing." — [#2928](https://github.com/alma-oss/spirit-design-system/pull/2928)

Checklist: section 12

### Duplicated or Copied Types Instead of Derived Ones (14 PRs, Minor)

Reuse component prop types instead of copying them, derive unions from constants, and do not expose props the component ignores (`Omit` them).

> "we should define it only once and do not duplicate it. Now it is the same as Box." — [#2959](https://github.com/alma-oss/spirit-design-system/pull/2959)

> "`DrawerCloseButtonProps` exposes size, but the component ignores any caller-provided value. Omit `size` from `DrawerCloseButtonProps`." — [#2747](https://github.com/alma-oss/spirit-design-system/pull/2747)

Checklist: section 4

### Literals Instead of Exported Constants (13 PRs, Minor)

Demos, stories, `*.figma.ts`, docsite, and exporters use exported constants (`BackgroundColors`, `EmotionColors`, `Sizes`, key constants) instead of string literals.

> "Do we have exported constants we can use instead of hard-coded values?" — [#3029](https://github.com/alma-oss/spirit-design-system/pull/3029)

> "Are we able to use predefined constants?" — [#2970](https://github.com/alma-oss/spirit-design-system/pull/2970)

Checklist: section 4

### Props Instead of Composition, Context Precedence, Style-Prop Shape (13 PRs, Important)

Content areas are slots or composition, not text props. Context props follow local prop, then context prop, then default. Style hooks return `{ classProps, styleProps, props }`.

> "I think we should do it the same way as Adobe Spectrum. It should be a slot, so the `ContextualHelp` composition should be passed." — [#2943](https://github.com/alma-oss/spirit-design-system/pull/2943)

> "Check if this component should use the context props. So the `validationState` or `isDisabled` can be set by the parent." — [#2918](https://github.com/alma-oss/spirit-design-system/pull/2918)

> "Most of the functions return a result in the shape of `classProps`, `styleProps`, and `props`. Why not here too?" — [#2918](https://github.com/alma-oss/spirit-design-system/pull/2918)

Checklist: section 3

### Props, Demos, or Sections Not Sorted Alphabetically (11 PRs, Minor)

Props in tables, components, stories, SCSS maps, and migration guide sections are sorted alphabetically. Reviewers flag this with 🔤.

> "Could you please sort the props alphabetically?" — [#2814](https://github.com/alma-oss/spirit-design-system/pull/2814)

> "🔤" — [#2672](https://github.com/alma-oss/spirit-design-system/pull/2672)

> "not sorted by abc 🫪" — [#2907](https://github.com/alma-oss/spirit-design-system/pull/2907)

Checklist: section 9

### Migration Guide Structure, Wording, or Non-BC Entries (10 PRs, Important)

Migration guides list only user-facing breaking changes, follow the existing template, and use the same structure in both packages.

> "I would leaving this out of the migration guide, because the addition of `marginY` was implemented and then discarded as part of the preparations for V5, so it probably doesn't affect our users…" — [#2781](https://github.com/alma-oss/spirit-design-system/pull/2781)

> "it would be great to have the same structure in both stabilizations, please agree on common pattern" — [#2730](https://github.com/alma-oss/spirit-design-system/pull/2730)

Checklist: section 2

### README Statements or Examples Do Not Match the Implementation (10 PRs, Important)

Documented defaults and behavior hold for that package, and snippets mirror the real markup and props so copy-paste works.

> "The default `space-800` is not really true. It is in CSS." — [#2959](https://github.com/alma-oss/spirit-design-system/pull/2959)

> "A consumer copying this example will get incorrect layout for both the default and `inputPosition="start"` cases." — [#2741](https://github.com/alma-oss/spirit-design-system/pull/2741)

Checklist: section 9

### Unhandled Error Paths, `null` Lookups, Wrong Fallbacks (9 PRs, Blocking to Question)

Non-happy paths are handled: `null` from DOM lookups, missing provider values, empty or scalar inputs, and API errors. Blocking when the diff shows wrong output, otherwise ask.

> "If `SelectorEngine.findOne()` can return null, a TypeError should be prevented:" — [#2911](https://github.com/alma-oss/spirit-design-system/pull/2911)

> "What about 404 and 410, when the PR is manually deleted (404) or is otherwise gone (410). This ends up in a failure instead of a recoverable state." — [#2960](https://github.com/alma-oss/spirit-design-system/pull/2960)

Checklist: section 3

### Implementation Differs From Figma (8 PRs, Question)

Colors, sizes, spacing, and weights match the design. Ask for a screenshot comparison when the PR changes visuals without one.

> ""Placeholder" and arrow color don't match with Figma." — [#2723](https://github.com/alma-oss/spirit-design-system/pull/2723)

> "The vertical spacing is beautifully uniform in the implementation, but unfortunately it is different in the design." — [#2879](https://github.com/alma-oss/spirit-design-system/pull/2879)

Checklist: section 5

### Complex Selectors, Cross-Component Classes, Reduced Motion (6 PRs, Important)

A component's SCSS does not select another component's classes, prefers `:is()` and `:first-child` over extra modifiers, and wraps animations in `prefers-reduced-motion`.

> "We should move it into the `@media (prefers-reduced-motion…)` as well…" — [#2686](https://github.com/alma-oss/spirit-design-system/pull/2686)

> "We don't mix component classes in CSS." — [#2976](https://github.com/alma-oss/spirit-design-system/pull/2976)

Checklist: section 5

### ADR Documents a Workflow Instead of Recording a Decision (5 PRs, Important)

`docs/decisions/*.md` says what was decided, not how. Workflow documentation goes elsewhere, and a changed decision gets a new ADR that supersedes the old one.

> "This is not a decision, but documentation of the workflow. Please fix this. The decision should say what we have decided, not how. Implementation details are not decisions." — [#2921](https://github.com/alma-oss/spirit-design-system/pull/2921)

Checklist: section 9

### CI Workflows: Injection, Status Functions, Permissions (4 PRs, Blocking to Question)

Inputs reach `run:` via `env:`, not inline `${{ }}`. `if:` conditions that should run after a failure use `!cancelled()`, and removed permissions are checked against every step.

> "Command injection via unsanitized `brand/out` matrix values in run: step" — [#2921](https://github.com/alma-oss/spirit-design-system/pull/2921)

> "Without a status-check function, GitHub implicitly adds success()." — [#3022](https://github.com/alma-oss/spirit-design-system/pull/3022)

Checklist: section 13

### Hardcoded User-Facing Strings Instead of Translations (2 PRs, Important)

User-facing strings, including `aria-label` text, come from `packages/web-react/src/translations/defaults.ts`, not literals.

> "Translation should be used (as is the case with removeButtonAriaLabel on line 69)." — [#2882](https://github.com/alma-oss/spirit-design-system/pull/2882)

Checklist: section 3

### Stale `lmc-eu` Organization Name (2 PRs, Important)

Links and fixtures use `alma-oss`, not `lmc-eu`.

> "lmc-eu is gone, please use alma-oss" — [#2734](https://github.com/alma-oss/spirit-design-system/pull/2734)

Checklist: section 9

## Themes Not Promoted

- **Release notes curation** (7 PRs) is owned by `spirit:release-notes`.
- **Exporter build tooling** and **data-structure performance** (2 PRs each) are too specific to
  generalize into a rule.

[checklist]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist.md
[code-review-skill]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/README.md
[feedback-skill]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/review-feedback/README.md
