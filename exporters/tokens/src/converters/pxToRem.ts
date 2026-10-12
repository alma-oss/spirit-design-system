import { DEFAULT_DECIMALS, MAX_TO_FIXED_DIGITS, PX_UNIT, REM_UNIT } from '../constants';

export type PxToRemOptions = {
  baseFontSize: number;
  decimals?: number;
};

export type PxToRemValue = {
  value: number;
  unit: 'rem';
};

const resolveDecimals = (decimals: number | undefined): number =>
  Number.isInteger(decimals) && (decimals as number) >= 0 && (decimals as number) <= MAX_TO_FIXED_DIGITS
    ? (decimals as number)
    : DEFAULT_DECIMALS;

const roundToDecimals = (value: number, decimals: number): number => {
  const roundingFactor = 10 ** decimals;
  const rounded = Math.round((value + Number.EPSILON) * roundingFactor) / roundingFactor;

  return Math.abs(rounded) === 0 ? 0 : rounded;
};

/**
 * Converts a px measure to a structured rem value, assuming a valid,
 * positive `baseFontSize`. Used by the transformation layer's `pxToRemRule`,
 * where `shouldApply` already guarantees a valid base size - unlike
 * `pxToRem` below, this has no px-fallback path and takes a plain `number`,
 * not a possibly-unparsable string.
 *
 * @param measurePx
 * @param options
 */
export const pxToRemValue = (measurePx: number, options: PxToRemOptions): PxToRemValue => {
  const { baseFontSize, decimals } = options;
  const remValue = measurePx / baseFontSize;

  return { value: roundToDecimals(remValue, resolveDecimals(decimals)), unit: 'rem' };
};

/**
 * Converts a pixel value to rem units, rounded to a maximum number of decimals,
 * and trims trailing zeros (e.g. 2.50rem -> 2.5rem, 2.00rem -> 2rem).
 *
 * @param valuePx - The pixel value to convert (string or number)
 * @param options - Conversion options including baseFontSize and decimals
 * @returns {string} The converted value in rem units
 */
export const pxToRem = (valuePx: string | number, options: PxToRemOptions): string => {
  const { baseFontSize, decimals } = options;

  if (!baseFontSize || baseFontSize <= 0) {
    return `${valuePx}${PX_UNIT}`;
  }

  const parsedValuePx = Number.parseFloat(String(valuePx));
  const effectiveValuePx = Number.isFinite(parsedValuePx) ? parsedValuePx : 0;
  const effectiveDecimals = resolveDecimals(decimals);

  const { value: roundedRem } = pxToRemValue(effectiveValuePx, { baseFontSize, decimals: effectiveDecimals });
  const formattedRem = roundedRem.toFixed(effectiveDecimals).replace(/\.?0+$/, '');

  return `${formattedRem}${REM_UNIT}`;
};
