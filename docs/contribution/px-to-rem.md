# `px` → `rem` Conversion

Spirit generally prefers `rem` for layout-related sizing (spacing, typography, radii, shadows).
This document explains how the conversion works and which utilities to reach for when contributing
to Spirit. Note that some values intentionally stay in `px` — border widths, base font-size
tokens, and visually-hidden utility techniques, for example — because they must not scale with
the user's root font-size.

## Why `rem`?

`rem` is relative to the `<html>` element's font size. Using it means:

- Sizes respect the user's browser or OS font-size preference — essential for accessibility.
- Visual proportions stay consistent with surrounding typography.
- All Spirit values (spacing, typography, sizing) share the same scale, so the system remains coherent.

⚠️ Fixed `px` values ignore the user's root font-size setting, so it breaks consistency and violates [accessibility rule][wcag-resize-text].

## Base Font Size

The default base is **16 px**, matching the browser default. It is defined in three places to keep all
converters in sync:

| Layer         | Identifier                                                                  | Default |
| ------------- | --------------------------------------------------------------------------- | ------- |
| Design tokens | `fontSizeBaseMobile`, `fontSizeBaseTablet`, `fontSizeBaseDesktop`           | `16px`  |
| SCSS          | `$font-size-base-fallback` in `packages/web/src/scss/settings/_units.scss`  | `16px`  |
| JS/TS         | `FALLBACK_BASE_FONT_SIZE_PX` in `packages/web-react/src/constants/units.ts` | `16`    |

The design-token values exported from Supernova are the source of truth. When Supernova exports tokens,
it divides each pixel value by the relevant device base to produce the `rem` strings in
`packages/design-tokens/src`. All three converters listed below fall back to the same value, so the
arithmetic is consistent throughout the system.

## Utilities

### SCSS — `px-to-rem()` (`packages/web`)

```scss
// Path is relative to the component file, e.g. packages/web/src/scss/components/*/
@use '../../tools/units';

.MyComponent {
  padding: units.px-to-rem(16px); // → 1rem
  font-size: units.px-to-rem(14px); // → 0.875rem
}
```

Signature:

```scss
px-to-rem($value-px, $base-font-size: $fallback-base-font-size, $decimals: 4)
```

| Parameter         | Type                    | Default                            | Notes                                                             |
| ----------------- | ----------------------- | ---------------------------------- | ----------------------------------------------------------------- |
| `$value-px`       | `px` or unitless number | —                                  | Unitless values are treated as px.                                |
| `$base-font-size` | `px` or unitless number | `$fallback-base-font-size` (16 px) | Falls back to `$font-size-base-fallback` when omitted or invalid. |
| `$decimals`       | integer 0–100           | `4`                                | Invalid values silently fall back to `4`.                         |

### JavaScript/TypeScript — `pxToRem()` (`packages/web-react`)

```ts
import { pxToRem } from '@alma-oss/spirit-web-react/utils';

pxToRem(24); // → '1.5rem'
pxToRem('16px'); // → '1rem'
pxToRem(14, { baseFontSize: 16, decimals: 2 }); // → '0.88rem'
```

Signature:

```ts
pxToRem(valuePx: string | number, options?: PxToRemOptions): string

type PxToRemOptions = {
  baseFontSize?: number | string; // defaults to fontSizeBaseMobile token value (16)
  decimals?: number;              // defaults to 4
};
```

### JavaScript/TypeScript — `cssLengthToPixels()` (`packages/common`)

> **Internal only** — `@alma-oss/spirit-common` is not published to npm.

Converts a CSS length string back to a pixel number. Useful when computing pixel dimensions from
`rem` token values at runtime (e.g. when positioning an overlay or popover in JS).

```ts
import { cssLengthToPixels, getRootFontSizePx } from '@alma-oss/spirit-common/utilities';

cssLengthToPixels('1rem'); // → 16 (uses the current root font size at runtime)
cssLengthToPixels('24px'); // → 24
cssLengthToPixels('auto'); // → undefined

getRootFontSizePx(); // → current <html> font-size in px; falls back to 16
```

In SSR and test environments without a DOM, `getRootFontSizePx` returns the fallback value of `16`.

## Decimal Precision

All three converters default to **4 decimal places** and strip trailing zeros:

| Input  | Output                   |
| ------ | ------------------------ |
| `14px` | `0.875rem`               |
| `16px` | `1rem` (not `1.0000rem`) |
| `15px` | `0.9375rem`              |
| `10px` | `0.625rem`               |

The token exporter uses the same precision, so the values in `packages/design-tokens/src` match
what these utilities produce.

[wcag-resize-text]: https://www.w3.org/WAI/WCAG21/Understanding/resize-text
