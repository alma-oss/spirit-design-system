import { fontSizeBaseMobile } from '@alma-oss/spirit-design-tokens';
import { DEFAULT_DECIMALS, FALLBACK_BASE_FONT_SIZE_PX, MAX_TO_FIXED_DIGITS, REM_UNIT } from '../constants';

export type PxToRemOptions = {
  baseFontSize?: number | string;
  decimals?: number;
};

const parsedDefaultBaseFontSize = Number.parseFloat(fontSizeBaseMobile);

export const DEFAULT_BASE_FONT_SIZE_PX =
  Number.isFinite(parsedDefaultBaseFontSize) && parsedDefaultBaseFontSize > 0
    ? parsedDefaultBaseFontSize
    : FALLBACK_BASE_FONT_SIZE_PX;

/**
 * Converts a pixel value to rem units, rounded to a maximum number of decimals,
 * and trims trailing zeros (e.g. 2.50rem -> 2.5rem, 2.00rem -> 2rem).
 *
 * @param valuePx - The pixel value to convert (string or number)
 * @param options - Conversion options including baseFontSize and decimals
 * @returns {string} The converted value in rem units
 */
export const pxToRem = (valuePx: string | number, options: PxToRemOptions = {}): string => {
  const { baseFontSize = DEFAULT_BASE_FONT_SIZE_PX, decimals = DEFAULT_DECIMALS } = options;
  const parsedValuePx = Number.parseFloat(String(valuePx));
  const effectiveValuePx = Number.isFinite(parsedValuePx) ? parsedValuePx : 0;
  const parsedBaseFontSize = Number.parseFloat(String(baseFontSize));
  const effectiveBaseFontSize =
    Number.isFinite(parsedBaseFontSize) && parsedBaseFontSize > 0 ? parsedBaseFontSize : FALLBACK_BASE_FONT_SIZE_PX;
  const effectiveDecimals =
    Number.isInteger(decimals) && decimals >= 0 && decimals <= MAX_TO_FIXED_DIGITS ? decimals : DEFAULT_DECIMALS;

  const remValue = effectiveValuePx / effectiveBaseFontSize;
  const roundingFactor = 10 ** effectiveDecimals;
  const roundedRem = Math.round((remValue + Number.EPSILON) * roundingFactor) / roundingFactor;
  const normalizedRem = Math.abs(roundedRem) === 0 ? 0 : roundedRem;
  const formattedRem = normalizedRem.toFixed(effectiveDecimals).replace(/\.?0+$/, '');

  return `${formattedRem}${REM_UNIT}`;
};
