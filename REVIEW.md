# Review Feedback

What Spirit reviewers repeatedly ask for in pull requests. The [`spirit:code-review`][code-review-skill]
skill reads this file as repository-specific review guidance, and the [`spirit:review-feedback`][feedback-skill]
skill keeps it up to date.

This file is a **feedback log**, not a rulebook. New themes land here first. Once a theme has proven
stable, it is promoted into the skill's [checklist][checklist] during a periodic refresh (every month or two).

## Recurring Themes

"PRs" counts the distinct PRs where reviewers raised the theme. "Checklist" is the section of
[`checklist.md`][checklist] that encodes it; `—` means the theme is not promoted yet.

- Collected: 2026-11-04
- Latest merged: 2026-11-02
- PRs with human feedback: 200 (#2660 to #3058), merged between 2026-05-25 and 2026-11-02
- Human review comments: 1,830 from 6 reviewers

| Checklist | Theme                                                                   | PRs | Evidence (sample)   | Typical severity      |
| --------- | ----------------------------------------------------------------------- | --- | ------------------- | --------------------- |
| 7         | New behavior, branches, and edge cases lack tests                       | 26  | #2803, #2934, #3008 | important to blocking |
| 9         | README API table and sections incomplete                                | 17  | #2889, #2951, #3008 | important             |
| 9         | README statements or examples do not match the implementation           | 10  | #2741, #2959, #3011 | important             |
| 9         | Docs duplicate other docs, expose internals, or are not consumer-facing | 22  | #2814, #2922, #3023 | important             |
| 11        | Unclear or inconsistent names                                           | 26  | #2665, #2771, #2951 | minor                 |
| 6         | Wrong ARIA pattern, labels, semantics, or invalid HTML                  | 27  | #2814, #2873, #3058 | blocking to important |
| 12        | Commit type does not match intent, missing `!`, AI trailers             | 23  | #2697, #2698, #2723 | important             |
| 1         | Change applied to only one of `web` / `web-react`                       | 22  | #2724, #2814, #2976 | important             |
| 11        | Dead code, stale classes, or leftovers after a rename                   | 21  | #2715, #2738, #2814 | important             |
| 7         | Unexpected, stale, or missing e2e snapshot changes                      | 18  | #2730, #2736, #2808 | important             |
| 8         | Raw markup or styles instead of Spirit layout components                | 18  | #2740, #2803, #2873 | minor                 |
| 3, 10     | Logic in the wrong module, cross-component coupling, docsite layout     | 18  | #2676, #2934, #2992 | important             |
| 4         | Re-implemented Spirit components, hooks, or utilities                   | 17  | #2803, #2889, #2943 | important             |
| 2         | Breaking change without migration guide or codemod                      | 16  | #2738, #2771, #2724 | blocking              |
| 8         | New variant or composition has no static demo or story                  | 16  | #2803, #2976, #3046 | important             |
| 5         | Raw values, fallback tokens, or sizing in React instead of CSS          | 15  | #2732, #2754, #2734 | important             |
| 11        | Workaround or non-obvious code without an explaining comment            | 15  | #2726, #2869, #3025 | important             |
| 14        | Skill lacks a trigger, assumes tools, or duplicates other skills        | 15  | #2748, #2775, #2907 | important             |
| 8         | Props equal to the default are passed in demos and docs                 | 14  | #2669, #2760, #2872 | minor                 |
| 12        | Out-of-scope work in the PR instead of a follow-up issue                | 14  | #2724, #2814, #2928 | important             |
| 4         | Duplicated or copied types instead of derived ones                      | 14  | #2672, #2747, #2959 | minor                 |
| 4         | Literals instead of exported constants                                  | 13  | #2934, #2970, #3029 | minor                 |
| 3         | Props instead of composition, context precedence, style-prop shape      | 13  | #2746, #2918, #2943 | important             |
| 9         | Props, demos, or sections not sorted alphabetically                     | 11  | #2672, #2724, #2814 | minor                 |
| 2         | Migration guide structure, wording, or non-BC entries                   | 10  | #2730, #2734, #2781 | important             |
| 3         | Unhandled error paths, `null` lookups, wrong fallbacks                  | 9   | #2911, #2951, #2960 | blocking to question  |
| 5         | Implementation differs from Figma                                       | 8   | #2723, #2879, #2898 | question              |
| 5         | Complex selectors, cross-component classes, reduced motion              | 6   | #2676, #2686, #2976 | important             |
| 9         | ADR documents a workflow instead of recording a decision                | 5   | #2748, #2844, #2921 | important             |
| 13        | CI workflows: injection, status functions, permissions                  | 4   | #2921, #2985, #3022 | blocking to question  |
| 3         | Hardcoded user-facing strings instead of translations                   | 2   | #2882, #2943        | important             |
| 9         | Stale `lmc-eu` organization name                                        | 2   | #2724, #2734        | important             |

PR numbers refer to `https://github.com/alma-oss/spirit-design-system/pull/<number>`.

### Themes Not Promoted

- **Release notes curation** (7 PRs) is owned by `spirit:release-notes`.
- **Exporter build tooling** and **data-structure performance** (2 PRs each) are too specific to
  generalize into a rule.

[checklist]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/references/checklist.md
[code-review-skill]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/code-review/README.md
[feedback-skill]: https://github.com/alma-oss/spirit-design-system/blob/main/.agents/skills/review-feedback/README.md
