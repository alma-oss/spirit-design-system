import { PX_UNIT, REM_UNIT } from '../constants';

export type PxToRemOptions = {
  baseFontSize: number;
  decimals?: number;
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
  const { baseFontSize, decimals = 4 } = options;

  if (!baseFontSize || baseFontSize <= 0) {
    return `${valuePx}${PX_UNIT}`;
  }

  const raw = Number(valuePx) / Number(baseFontSize);
  const factor = 10 ** decimals;
  const rounded = Math.round((raw + Number.EPSILON) * factor) / factor;
  const normalized = Math.abs(rounded) === 0 ? 0 : rounded;
  const pretty = normalized.toFixed(decimals).replace(/\.?0+$/, '');

  return `${pretty}${REM_UNIT}`;
};
