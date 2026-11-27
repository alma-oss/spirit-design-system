# Next.js with `@forward with` Token Overrides (POC)

Proof of concept for a product that overrides Spirit design tokens in SCSS with
[`@forward … with`][sass-forward-with], without generating any files.

Spirit's SCSS loads its tokens only through `@use '@tokens'` and `@use '@themes'`, and every token is `!default`.
The app puts its own `@tokens.scss` and `@themes.scss` in `src/styles/tokens`, first in the Sass load paths, so
Spirit's components load them instead of Spirit's:

```text
src/styles/tokens/
  @tokens.scss                     forwards Spirit's global tokens with the product's values
  @themes.scss                     builds the themes map from the product's themes
  themes/_theme-light-default.scss forwards Spirit's theme with the product's values
  themes/_theme-light-on-brand.scss
```

```scss
@forward '@alma-oss/spirit-design-tokens/scss/@tokens' with (
  $radius-300: 1.25rem
);
```

Maps built from the tokens, such as `$radii`, follow automatically, and Sass fails on a token name that Spirit
doesn't define. The page shows Button, Tag, and Card in both themes.

Device tokens are configured the same way. The app moves `$breakpoint-tablet` to `64rem`, so the `$breakpoints` map
and every responsive prop follow, such as the card Grid that switches from one to three columns. Of the device tokens,
Spirit's SCSS reads only the breakpoints, and the button radius device tokens aren't used.

Typography is overridden with the global typography tokens, such as `$heading-large-bold`. Each is a whole map with
a style per device, which replaces Spirit's map, so it has to repeat every property and device it keeps.

Only SCSS is overridden. JS tokens imported from `@alma-oss/spirit-design-tokens` keep Spirit's values, so hooks that
read breakpoints in JS still switch at Spirit's `48rem`.

## Commands

- `yarn dev` starts the app.
- `yarn build` builds it.

[sass-forward-with]: https://sass-lang.com/documentation/at-rules/forward/#configuring-modules
