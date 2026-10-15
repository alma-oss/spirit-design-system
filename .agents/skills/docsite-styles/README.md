# Docsite Styles Skill

Rules for writing and reviewing SCSS for any docsite page or component under `apps/docsite/src`.

## Usage

```text
/spirit:docsite-styles
```

Use when you need to:

- Create or edit a docsite `.scss` file
- Review docsite SCSS for token, unit, selector, or motion issues
- Fix Stylelint errors in docsite SCSS

## What It Covers

1. Converting legacy CSS modules to plain SCSS (the always-on stylesheet rules are in `apps/docsite/AGENTS.md`)
2. `@use` imports for Spirit tools, Spirit tokens, and docsite tokens
3. Values: `tokens.$...`, docsite hex values in `_docsite-tokens.scss`, and `units.px-to-rem()`
4. Hover and reduced-motion media query patterns from `packages/web`
5. Own-block selectors and positioning a child through a wrapper class
6. The required homepage section rails and top rule in `PageSection.scss`
7. The styling-only Known Spirit Limits (token gaps)
8. Stylelint commands and when an inline disable is allowed

## Setup

None. Stylelint currently covers only `src/domains/homepage/**/*.scss`; SCSS elsewhere in the docsite is not linted yet.

## Output Quality Checklist

- No new CSS modules, no `:global(...)`, and no selectors for another component's class
- No inline hex colors and no `var(--spirit-color-...)`
- Lengths use `units.px-to-rem()`
- `:hover` sits inside `@media (hover: hover)`, and transitions sit inside `@media (prefers-reduced-motion: no-preference)`
- Homepage section rails and top rule are still drawn
- `yarn workspace @alma-oss/spirit-docsite lint` (which runs `css:lint`) passes with no new inline disables
