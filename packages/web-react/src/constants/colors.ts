import { Intensity } from './dictionaries';

export const ColorPrefixes = {
  ACCENT: 'accent',
  EMOTION: 'emotion',
} as const;

/**
 * Intensity segment for Spirit color scheme surface suffixes (`*-basic` / `*-subtle` in `color-scheme-on-*` classes).
 * Aliases {@link Intensity}; use either name depending on whether the call site is about color schemes or generic intensity.
 */
export const ColorSchemeSurfaceIntensity = Intensity;
