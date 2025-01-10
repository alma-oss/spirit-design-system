---
name: spirit:docsite-styles
description: >-
  Write or review SCSS for any docsite page or component under apps/docsite/src: Spirit tokens, docsite tokens,
  px-to-rem, hover and reduced-motion media queries, own-block BEM selectors, the homepage section rails, and Stylelint.
  Use when creating or editing any docsite .scss file.
---

# Docsite Styles

How to write SCSS under `apps/docsite/src`. The always-on stylesheet rules are in [`apps/docsite/AGENTS.md`][docsite-agents].
Check `spirit:docsite-composition` and its [Known Spirit Limits][composition-limits] first.
Styling-only limits are in [Known Spirit Limits](#known-spirit-limits) below.

## Stylesheets

- The existing `*.module.scss` files (`domains/content/ui/`, `app/(documentation)/[...slug]/layout.module.scss`) are legacy.
  Convert one to plain SCSS when you refactor that component.

## Imports

Use these `@use` lines as needed:

```scss
@use '@alma-oss/spirit-web/src/scss/tools/breakpoint';
@use '@alma-oss/spirit-web/src/scss/tools/units';
@use '@tokens' as tokens;
@use '../../ui/docsite-tokens' as docsite;
```

The docsite tokens path is relative to the file. The partial lives in `src/domains/homepage/ui/` today,
so homepage `ui/` files use `./docsite-tokens`, homepage `features/<name>/` files use `../../ui/docsite-tokens`,
and files in another domain's `ui/` use `../../homepage/ui/docsite-tokens`.

## Values

- Spirit colors use `tokens.$...` from `@use '@tokens' as tokens`, not `var(--spirit-color-...)`.
- Hardcoded hex colors live in `src/domains/homepage/ui/_docsite-tokens.scss` today and are used as `docsite.$...`, never inline.
  Styles on other pages `@use` that partial instead of inlining hex.
  These are temporary docsite values, not Spirit tokens. Do not add them to `@alma-oss/spirit-design-tokens`.
- Lengths use `units.px-to-rem()`, not hardcoded rem. See the [Units guide][units].

## Interaction and Motion

- Wrap `:hover` rules in `@media (hover: hover)`.
- Transitions are off by default and added only inside `@media (prefers-reduced-motion: no-preference)`, matching `packages/web`.
- Do not set a transition and then cancel it inside `@media (prefers-reduced-motion: reduce)`.

Example from the homepage `LogoStrip.scss`:

```scss
.LogoStrip__grey,
.LogoStrip__color {
  @media (prefers-reduced-motion: no-preference) {
    transition: opacity 0.25s ease-in-out;
  }
}

.LogoStrip__color {
  opacity: 0;
}

@media (hover: hover) {
  .LogoStrip__cell:hover .LogoStrip__color {
    opacity: 1;
  }

  .LogoStrip__cell:hover .LogoStrip__grey {
    opacity: 0;
  }
}
```

## Selectors

- Do not select another component's class from a parent file (`.Label`, `.Card`, `.Item`, `.Container`, `.Stamp`), and do not use `:global(...)`.
- Position a child from the parent by wrapping it in the parent's own element class. On the homepage, `PageShowcase.scss` positions
  each stamp through `.PageShowcase__stamp`, and `Stamp.scss` owns the stamp's internal look.
- Do not use a universal child selector (`> *`) when the content is known. Style the known children.

## Homepage Section Rails and Top Rule

This applies to the homepage only. Homepage sections draw decorative rails and a top rule.

- The line color is `docsite.$section-line`, not a Spirit border (see [Known Spirit Limits](#known-spirit-limits)).
- The lines are drawn in `domains/homepage/ui/PageSection.scss` (`PageSection--rails`, `PageSection--topLine`),
  set through the `hasRails` (default `true`) and `hasTopLine` props of `PageSection`.
- Rails follow the xlarge container edges and run the full section height, including section padding, so they meet the top rule.
- The hero opts out of the rails (`hasRails={false}`).

## Known Spirit Limits

Do not "fix" these with the wrong token.

- The homepage section line color is `docsite.$section-line` (`#e9e9e9`), the same gray as the footer top border.
  Spirit `border` and `Divider` use `border-basic` (`#d9d9d9`), which is darker, so those props do not match.
- `Box` `borderColor` has no white. The stamp white edge is docsite token `docsite.$stamp-border` (`#fff`).

## Lint

- `yarn workspace @alma-oss/spirit-docsite lint` already runs `css:lint`. autofix with `yarn workspace @alma-oss/spirit-docsite css:lint:fix`.
- Stylelint currently covers only `src/domains/homepage/**/*.scss`. SCSS elsewhere in the docsite is not linted yet,
  so follow these rules there by hand.
- The config is `stylelint-config-spirit`, the same setup as `packages/web`.
- Do not disable a rule unless `packages/web` already uses that same inline disable for the same kind of selector.

[composition-limits]: ../docsite-composition/SKILL.md#known-spirit-limits
[docsite-agents]: ../../../apps/docsite/AGENTS.md
[units]: ../../../docs/contribution/units.md
