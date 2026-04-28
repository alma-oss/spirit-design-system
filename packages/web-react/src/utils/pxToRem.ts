import { fontSizeBaseMobile } from '@alma-oss/spirit-design-tokens';
import { FALLBACK_BASE_FONT_SIZE_PX, REM_UNIT } from '../constants';

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
  const { baseFontSize = DEFAULT_BASE_FONT_SIZE_PX, decimals = 4 } = options;
  const parsedBaseFontSize = Number.parseFloat(String(baseFontSize));
  const effectiveBaseFontSize =
    Number.isFinite(parsedBaseFontSize) && parsedBaseFontSize > 0 ? parsedBaseFontSize : FALLBACK_BASE_FONT_SIZE_PX;

  const raw = Number(valuePx) / Number(effectiveBaseFontSize);
  const factor = 10 ** decimals;
  const rounded = Math.round((raw + Number.EPSILON) * factor) / factor;
  const normalized = Math.abs(rounded) === 0 ? 0 : rounded;
  const pretty = normalized.toFixed(decimals).replace(/\.?0+$/, '');

  return `${pretty}${REM_UNIT}`;
};
