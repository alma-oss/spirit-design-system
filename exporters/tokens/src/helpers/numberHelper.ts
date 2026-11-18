/**
 * Rounds a number to the given number of decimals. Normalizes `-0` to `0`, and nudges by `Number.EPSILON` so that
 * values such as `1.005` round the way a reader expects.
 *
 * @param value
 * @param decimals
 */
export const roundToDecimals = (value: number, decimals: number): number => {
  const roundingFactor = 10 ** decimals;
  const rounded = Math.round((value + Number.EPSILON) * roundingFactor) / roundingFactor;

  return Math.abs(rounded) === 0 ? 0 : rounded;
};
