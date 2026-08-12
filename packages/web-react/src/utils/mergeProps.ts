import { isNullish } from './assert';

/**
 * Merges any number of prop objects in low-to-high precedence order.
 *
 * A nullish value in a later (higher-precedence) object is treated as "no opinion" and does not
 * override an earlier object's defined value for the same key — only a defined value can win.
 * `undefined` sources are skipped, so callers can pass an optional prop bag directly.
 */
export function mergeProps(): Record<string, never>;
export function mergeProps<T1 extends Record<string, unknown>>(source1: T1 | undefined): T1;
export function mergeProps<T1 extends Record<string, unknown>, T2 extends Record<string, unknown>>(
  source1: T1 | undefined,
  source2: T2 | undefined,
): T1 & T2;
export function mergeProps<
  T1 extends Record<string, unknown>,
  T2 extends Record<string, unknown>,
  T3 extends Record<string, unknown>,
>(source1: T1 | undefined, source2: T2 | undefined, source3: T3 | undefined): T1 & T2 & T3;
export function mergeProps(...sources: Array<Record<string, unknown> | undefined>): Record<string, unknown> {
  return sources.reduce<Record<string, unknown>>(
    (merged, source) =>
      source
        ? Object.entries(source).reduce(
            (result, [key, value]) => (isNullish(value) ? result : { ...result, [key]: value }),
            merged,
          )
        : merged,
    {},
  );
}
