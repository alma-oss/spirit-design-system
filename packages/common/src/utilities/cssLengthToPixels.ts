import { isSSR } from './ssr';

/**
 * Fallback root font size in pixels used when runtime root size cannot be resolved.
 */
export const BASE_FONT_SIZE_PX = 16;

const UNRESOLVABLE = new Set(['none', 'auto', 'initial', 'unset', '']);
const CSS_NUMERIC_LENGTH_PATTERN = /([+-]?(?:\d+\.?\d*|\.\d+))/;

/**
 * Returns current runtime root font size (`html { font-size }`) in pixels.
 * Falls back to `BASE_FONT_SIZE_PX` when unavailable/invalid (e.g. SSR, tests without a DOM).
 */
export function getRootFontSizePx(): number {
  if (isSSR() || !document.documentElement) {
    return BASE_FONT_SIZE_PX;
  }

  const rootFontSize = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize);

  return Number.isFinite(rootFontSize) && rootFontSize > 0 ? rootFontSize : BASE_FONT_SIZE_PX;
}

/**
 * Converts a `rem` magnitude to pixels using the current runtime root size by default.
 *
 * @param rem
 * @param baseFontSizePx
 */
export function convertRemToPixels(rem: number, baseFontSizePx: number = getRootFontSizePx()): number {
  return rem * baseFontSizePx;
}

/**
 * Parses a simple CSS length to a **number of pixels** (no unit suffix in the return value).
 * - `px` — `Number.parseFloat` of numeric magnitude (already px).
 * - `rem` — converts via `convertRemToPixels` (inverse of `px-to-rem`).
 *
 * Does not resolve `calc()`, `%`, or unresolved CSS custom properties.
 *
 * @param cssValue
 */
export function cssLengthToPixels(cssValue: string | undefined | null): number | undefined {
  const value = cssValue?.trim();

  if (!value || UNRESOLVABLE.has(value)) {
    return undefined;
  }

  const pxMatch = new RegExp(`^${CSS_NUMERIC_LENGTH_PATTERN.source}\\s*px$`, 'i').exec(value);

  if (pxMatch) {
    const px = Number.parseFloat(pxMatch[1]);

    return Number.isFinite(px) ? px : undefined;
  }

  const remMatch = new RegExp(`^${CSS_NUMERIC_LENGTH_PATTERN.source}\\s*rem$`, 'i').exec(value);

  if (remMatch) {
    const rem = Number.parseFloat(remMatch[1]);
    const px = convertRemToPixels(rem);

    return Number.isFinite(px) ? px : undefined;
  }

  return undefined;
}
