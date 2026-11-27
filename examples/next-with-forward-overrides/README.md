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

Only SCSS is overridden. The JS side uses Spirit's TS tokens as they are, without an alias to product tokens.
In the types-only tokens POC, the TS tokens hold only types and name arrays, such as `breakpointNames`, with no
values. The `TokensFromCss` panel takes its names and types from Spirit and reads the values from the CSS custom
properties on `:root`, which the product's SCSS overrides fill in. Its current breakpoint switches to `tablet` at the
product's `64rem`, not at Spirit's `48rem`, and the primary button color shows the product's override.

## Commands

- `yarn dev` starts the app.
- `yarn build` builds it.

[sass-forward-with]: https://sass-lang.com/documentation/at-rules/forward/#configuring-modules
