# Review History Analysis

The evidence behind `checklist.md`: what Spirit reviewers repeatedly ask for, what CI already
enforces, and how the team writes review comments. Refresh it when the checklist starts to drift
from real reviews (see [Refreshing the Analysis](#refreshing-the-analysis)).

## Method

1. **Collect.** `scripts/mine-review-history.mjs` fetched the most recent merged PRs of
   `alma-oss/spirit-design-system` via the GitHub GraphQL API and kept those with feedback from a
   human other than the author: inline review threads, review bodies, and conversation comments.
   Bot accounts (Copilot, GitHub Actions, Netlify, Renovate, Dependabot, and similar) were excluded.
2. **Cluster.** The comments were split into four chronological slices; each slice was read in full
   and grouped into themes phrased as rules a reviewer can check on a diff, with per-PR counts.
3. **Merge.** Themes from the slices were merged, counts summed (slices do not overlap), and mapped
   to checklist sections.
4. **Filter.** Every theme was cross-checked against the CI workflows in `.github/workflows/` and
   the lint configuration. Themes that tooling already enforces were dropped.

### Dataset

| Property                | Value                                               |
| ----------------------- | --------------------------------------------------- |
| Collected               | 2026-11-04                                          |
| PRs scanned             | 332 most recent merged PRs                          |
| PRs with human feedback | 200 (#2660 to #3058)                                |
| Merge date range        | 2026-05-25 to 2026-11-02                            |
| Human review comments   | 1,830                                               |
| Reviewers               | 6 (comment shares: 32 %, 28 %, 24 %, 9 %, 4 %, 3 %) |

PR numbers below refer to `https://github.com/alma-oss/spirit-design-system/pull/<number>`.

## Recurring Themes

"PRs" counts the distinct PRs (out of 200) where reviewers raised the theme. Themes are grouped by
the checklist section that encodes them.

| Checklist section        | Theme                                                                   | PRs | Evidence (sample)   | Typical severity      |
| ------------------------ | ----------------------------------------------------------------------- | --- | ------------------- | --------------------- |
| 7. Tests                 | New behavior, branches, and edge cases lack tests                       | 26  | #2803, #2934, #3008 | important to blocking |
| 9. Documentation         | README API table and sections incomplete                                | 17  | #2889, #2951, #3008 | important             |
| 9. Documentation         | README statements or examples do not match the implementation           | 10  | #2741, #2959, #3011 | important             |
| 9. Documentation         | Docs duplicate other docs, expose internals, or are not consumer-facing | 22  | #2814, #2922, #3023 | important             |
| 11. Naming               | Unclear or inconsistent names                                           | 26  | #2665, #2771, #2951 | minor                 |
| 6. Accessibility         | Wrong ARIA pattern, labels, semantics, or invalid HTML                  | 27  | #2814, #2873, #3058 | blocking to important |
| 12. Commits and PR scope | Commit type does not match intent, missing `!`, AI trailers             | 23  | #2697, #2698, #2723 | important             |
| 1. Parity                | Change applied to only one of `web` / `web-react`                       | 22  | #2724, #2814, #2976 | important             |
| 11. Leftovers            | Dead code, stale classes, or leftovers after a rename                   | 21  | #2715, #2738, #2814 | important             |
| 7. Snapshots             | Unexpected, stale, or missing e2e snapshot changes                      | 18  | #2730, #2736, #2808 | important             |
| 8. Demos                 | Raw markup or styles instead of Spirit layout components                | 18  | #2740, #2803, #2873 | minor                 |
| 3. / 10. Structure       | Logic in the wrong module, cross-component coupling, docsite layout     | 18  | #2676, #2934, #2992 | important             |
| 4. Reuse                 | Re-implemented Spirit components, hooks, or utilities                   | 17  | #2803, #2889, #2943 | important             |
| 2. Breaking changes      | Breaking change without migration guide or codemod                      | 16  | #2738, #2771, #2724 | blocking              |
| 8. Demos                 | New variant or composition has no static demo or story                  | 16  | #2803, #2976, #3046 | important             |
| 5. Styles                | Raw values, fallback tokens, or sizing in React instead of CSS          | 15  | #2732, #2754, #2734 | important             |
| 11. Comments             | Workaround or non-obvious code without an explaining comment            | 15  | #2726, #2869, #3025 | important             |
| 14. Agent skills         | Skill lacks a trigger, assumes tools, or duplicates other skills        | 15  | #2748, #2775, #2907 | important             |
| 8. Demos                 | Props equal to the default are passed in demos and docs                 | 14  | #2669, #2760, #2872 | minor                 |
| 12. PR scope             | Out-of-scope work in the PR instead of a follow-up issue                | 14  | #2724, #2814, #2928 | important             |
| 4. Reuse                 | Duplicated or copied types instead of derived ones                      | 14  | #2672, #2747, #2959 | minor                 |
| 4. Reuse                 | Literals instead of exported constants                                  | 13  | #2934, #2970, #3029 | minor                 |
| 3. Component API         | Props instead of composition, context precedence, style-prop shape      | 13  | #2746, #2918, #2943 | important             |
| 9. Documentation         | Props, demos, or sections not sorted alphabetically                     | 11  | #2672, #2724, #2814 | minor                 |
| 2. Migration guides      | Guide structure, wording, or non-BC entries                             | 10  | #2730, #2734, #2781 | important             |
| 3. Robustness            | Unhandled error paths, `null` lookups, wrong fallbacks                  | 9   | #2911, #2951, #2960 | blocking to question  |
| 5. Styles                | Implementation differs from Figma                                       | 8   | #2723, #2879, #2898 | question              |
| 5. Styles                | Complex selectors, cross-component classes, reduced motion              | 6   | #2676, #2686, #2976 | important             |
| 9. ADRs                  | ADR documents a workflow instead of recording a decision                | 5   | #2748, #2844, #2921 | important             |
| 13. CI workflows         | Injection, status functions, permissions                                | 4   | #2921, #2985, #3022 | blocking to question  |
| 3. Component API         | Hardcoded user-facing strings instead of translations                   | 2   | #2882, #2943        | important             |
| 9. Documentation         | Stale `lmc-eu` organization name                                        | 2   | #2724, #2734        | important             |

### Themes Not Encoded in the Checklist

- **Release notes curation** (7 PRs) is owned by `spirit:release-notes`.
- **Exporter build tooling** and **data-structure performance** (2 PRs each) were too specific to
  generalize into a rule.

## Already Enforced by Tooling

These themes appeared in reviews but are caught automatically, so the skill must stay quiet on them.

| Theme raised by reviewers                     | Enforced by                                                            | Where                                 |
| --------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------- |
| `xlink:href` in SVG `<use>` (5 PRs)           | ESLint rule `spirit/no-xlink-href`                                     | `configs/eslint-config-spirit/rules/` |
| Missing EOF newline, stray spaces (4 PRs)     | Prettier, EditorConfig, `lint-staged`                                  | `lint.yaml` → `yarn format:check`     |
| Missing braces (1 PR)                         | ESLint `curly`                                                         | `@lmc-eu/eslint-config-base`          |
| Commit format, scope list, issue reference    | Commitlint (`scope-enum`, `issue-reference-format`)                    | `git.yaml`, `.husky/commit-msg`       |
| Fixup commits left before merge               | Block-fixup-merge action                                               | `git.yaml`                            |
| Class naming (BEM/SUIT, `UNSTABLE_` prefix)   | Stylelint `selector-class-pattern`                                     | `configs/stylelint-config-spirit/`    |
| `!important`, `transition: all`, IDs, depth   | Stylelint extras                                                       | `@alma-oss/stylelint-config`          |
| Import order, type imports, `useLayoutEffect` | ESLint (`import/order`, `consistent-type-imports`, restricted imports) | `packages/*/eslint.config.mjs`        |
| Heading capitalization and terminology        | Remark and textlint                                                    | `docs-review.yaml`                    |
| Broken Markdown links                         | Lychee (non-blocking)                                                  | `docs-review.yaml`                    |
| Type errors                                   | `yarn types`                                                           | `lint.yaml`                           |
| Build output and generated files committed    | Build plus clean-tree check                                            | `build.yaml`                          |
| A visual mismatch itself                      | Playwright e2e                                                         | `e2e.yml`                             |

Partially enforced themes remain in the checklist for the part tooling misses: commitlint does not
judge whether `feat` or `refactor` matches the intent, Playwright fails on a mismatch but does not
judge whether an updated snapshot is expected, and Stylelint does not forbid raw `px` or hex values.

## How the Team Writes Review Comments

- **Short, friendly English.** Comments are brief and collegial, hedged with "IMHO", "I think",
  "What about …?". Emoji carry tone, and some carry meaning: 🔤 means "sort alphabetically",
  ⚠️ marks an important point.
- **Questions first.** Many findings are phrased as questions ("Why not `CloseButton`?",
  "Do we need this?", "codemod?"), which the methodology mirrors by preferring `question` when unsure.
- **Suggestion blocks dominate.** Concrete fixes arrive as GitHub suggestion fences, often with
  little or no text.
- **One comment for repeated issues.** "Applies to the whole PR" or "Everywhere" widens a single
  comment instead of repeating it; the methodology's "Repeated Occurrences" rule encodes this.
- **Blocking is rare and explained.** Requested changes always state the reason. Explicit blocking
  appears for security, accessibility bugs, missing tests, and undocumented breaking changes.
- **Conventional Comments are partial.** One of the most active reviewers uses Conventional Comments
  labels consistently; the others do not. That is why the labels stay opt-in.

## Refreshing the Analysis

```bash
# Requires an authenticated GitHub CLI (`gh auth status`)
node .agents/skills/code-review/scripts/mine-review-history.mjs --limit 200 --out /tmp/review-history
```

The script writes `prs.json` (raw data) and `comments.md` (one line per human comment, grouped by
PR) into the output directory. To validate checklist changes, run the skill on PRs newer than the
dataset (after #3058) and compare its findings with the human review; PRs inside the dataset
informed the checklist and are not a blind test. Read `comments.md`, cluster recurring feedback, update the table
above, then add, change, or remove checklist items. Re-check the "Already Enforced" table against
`.github/workflows/` and the lint configs whenever tooling changes.
