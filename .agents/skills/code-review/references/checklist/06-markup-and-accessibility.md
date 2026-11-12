# 6. Markup and Accessibility (`*.tsx`, `*.html`, `*.hbs`, READMEs)

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
