# Types-Only TS Tokens

Date: 2026-11-26

Status: proposed

Relates to: [009](009-tokens-structure.md)

## Context

`@alma-oss/spirit-design-tokens` ships the same tokens twice: as SCSS and as TS with values. The SCSS values
end up on `:root` as CSS custom properties, such as `--spirit-breakpoint-desktop` or `--spirit-space-700`.

A product that rebrands Spirit has its own tokens. In SCSS it puts its own `@tokens.scss` first on the load path.
In TS it aliases `@alma-oss/spirit-design-tokens` to its own TS tokens in tsconfig and the bundler, so that
`web-react` imports the product's values instead of Spirit's. The product has to generate and maintain a second copy
of its tokens in TS only so that the alias resolves, and a product that overrides tokens only in SCSS gets JS that
still uses Spirit's values.

`web` and `web-react` barely need the TS values:

- Almost every runtime import uses only the token **names**, for example the keys of `breakpoints` for responsive
  props, or the keys of `accentColors` and `emotionColors` for color dictionaries.
- Only two places used a **value**: the desktop breakpoint in the `web` Offcanvas, and the base font size in
  `pxToRem`. The Offcanvas already preferred `--spirit-breakpoint-desktop` from CSS, although it parsed `80rem`
  as `80`.
- Types such as `BreakpointToken`, `SpaceToken`, or the color name types use `typeof` on the token objects.
- Color tokens in TS are already `var(--spirit-color-…)` strings, not values.

## Decision

This is a proof of concept on a slice of the tokens: breakpoints and the rest of the device tokens, spacing, and
theme color tokens. The token files are hand-edited for it. The Supernova exporter is not changed yet.

1. **TS tokens declare types, not values.** Every token keeps its export name, but as a declaration:

   ```ts
   export declare const breakpointDesktop: string;
   export declare const breakpoints: {
     mobile: typeof breakpointMobile;
     tablet: typeof breakpointTablet;
     desktop: typeof breakpointDesktop;
   };
   ```

   `typeof breakpoints` keeps working, and the built JS contains no value.

2. **Names are shipped as runtime arrays.** Code that iterates tokens uses arrays of names, checked against the
   declared types:

   ```ts
   export const breakpointNames = ['mobile', 'tablet', 'desktop'] as const satisfies ReadonlyArray<
     keyof typeof breakpoints
   >;
   ```

   The slice adds `breakpointNames`, `spaceNames`, `accentColorNames`, `emotionColorNames`, `textColorNames`,
   `componentButtonColorNames`, and `colorIntensityNames`. `cssVariablePrefix` stays a real export, it is
   configuration, not a design value.

3. **Values are read from CSS.** JS that needs a value reads the CSS custom property from `:root` with
   `getRootCssVariable` from `@alma-oss/spirit-common`. It returns `undefined` outside the browser or when the
   property is missing, there is no fallback to a JS value. The Offcanvas converts the breakpoint with
   `cssLengthToPixels`, so `80rem` becomes `1280`, and an explicit `breakpointDesktop` option still wins.

4. **The base font size of `pxToRem` is a constant.** It stays at 16px. Reading the computed font size of `:root`
   would make the server and client render different rem values, and it would stop rem units from scaling with the
   user's browser font size.

5. **Value imports fail lint.** A declared-only export type-checks as a value but is `undefined` at runtime.
   `web` and `web-react` forbid value imports of these tokens with `@typescript-eslint/no-restricted-imports` and
   `allowTypeImports: true`.

## Consequences

### Products Drop the TS Alias

A product overrides tokens only in SCSS and loads its CSS. It uses Spirit's TS tokens directly for types and names,
and JS picks up the product's values from `:root`. The `next-with-forward-overrides` example shows it: its JS switches
breakpoints at the product's `64rem` instead of Spirit's `48rem`, with no alias and no TS tokens of its own.

### Spirit's Names Are the Contract

A product can change values, not names. A product with an extra breakpoint or accent color does not get it in Spirit's
types or name arrays. Today the alias lets a product slip in other names, although the components don't handle them.

### Values Need the Browser and the CSS

JS can read a value only in the browser, after the CSS is loaded. On the server, and without Spirit's foundation CSS,
values are `undefined`, and code has to handle that, as the Offcanvas does by not closing automatically.

### Breaking Change for Consumers of Token Values

Consumers that import token values from JS, for example `spaces.700` or `breakpoints.desktop`, get `undefined`.
Stabilizing this needs a migration guide and, where it can, a codemod that moves such code to CSS custom properties.

### The Exporter Has to Generate It

Before this ships, `exporters/tokens` has to generate the declarations and name arrays for every token group, and the
remaining groups (borders, gradients, radii, shadows, typography, containers, and themes) have to follow.
