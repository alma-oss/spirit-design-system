import type { ColorValue, TokenValue } from '../../core/types';
import { expectType } from './helpers';

const HEX_COLOR_PATTERN = /^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const OPAQUE_ALPHA = 'ff';

/**
 * Normalizes a hex color to 8 lowercase digits (`#rrggbbaa`).
 *
 * @param color - Color value in the `hex` format (3, 4, 6 or 8 digits, with or without `#`)
 * @param color.format - Source color format, only `hex` is supported
 * @param color.value - The hex digits
 */
const toHex8 = ({ format, value }: ColorValue): string => {
  const digits = HEX_COLOR_PATTERN.exec(value)?.[1];

  if (format !== 'hex' || !digits) {
    throw new Error(`Unsupported color "${value}" in format "${format}"`);
  }

  const expanded = digits.length <= 4 ? [...digits].map((digit) => digit + digit).join('') : digits;

  return `#${(expanded.length === 6 ? `${expanded}${OPAQUE_ALPHA}` : expanded).toLowerCase()}`;
};

/**
 * Renders a color as `#rrggbbaa`.
 *
 * @param value - A color value, its references already resolved
 * @returns {string} Lowercase hex with alpha, always 8 digits
 */
export const formatColorValue = (value: TokenValue): string => toHex8(expectType(value, 'color'));
