import { FONT_SIZE_BASE, FONT_SIZE_BASE_DEFAULT, PX_UNIT } from '../constants';
import { pxToRem } from '../converters/pxToRem';
import { withResolvedValue } from '../core/resolveToken';
import { type DesignToken, type NumberValue, TokenTypeEnum, type FontSizeBaseMap } from '../core/types';

/**
 * Creates a default FontSizeBaseMap with the same value for all breakpoints.
 *
 * @param fontSizeBase - Font size base value in px (default: DEFAULT_FONT_SIZE_BASE)
 * @returns {Map<string, number>} FontSizeBaseMap with mobile, tablet, and desktop set to the same value
 */
export const createDefaultFontSizeBaseMap = (fontSizeBase: number = FONT_SIZE_BASE_DEFAULT): FontSizeBaseMap => {
  return new Map([
    ['mobile', fontSizeBase],
    ['tablet', fontSizeBase],
    ['desktop', fontSizeBase],
  ]);
};

const FONT_SIZE_BASE_TOKEN_TYPES = [TokenTypeEnum.FontSize, TokenTypeEnum.Dimension];

const readMeasure = (token: DesignToken): number | undefined => {
  const { value } = withResolvedValue(token);

  return value.type === 'number' ? value.value : undefined;
};

/**
 * Finds font-size-base token from tokens array
 *
 * @param tokens - Array of tokens to search in
 * @returns {Map<string, number>} FontSizeBaseMap with breakpoint as key and font-size-base value in px as value
 */
export const getFontSizeBaseMap = (tokens: DesignToken[]): FontSizeBaseMap => {
  const fontSizeBaseMap = new Map<string, number>();

  const exactFontSizeBase = tokens.find(
    (token) =>
      FONT_SIZE_BASE_TOKEN_TYPES.includes(token.type) &&
      (token.name.toLowerCase() === FONT_SIZE_BASE || token.metadata.originName?.toLowerCase() === FONT_SIZE_BASE) &&
      !token.metadata.device,
  );

  if (exactFontSizeBase) {
    const measure = readMeasure(exactFontSizeBase);

    if (typeof measure === 'number' && measure > 0) {
      fontSizeBaseMap.set('mobile', measure);
      fontSizeBaseMap.set('tablet', measure);
      fontSizeBaseMap.set('desktop', measure);

      return fontSizeBaseMap;
    }
  }

  const fontSizeBaseTokens = tokens.filter((token) => {
    const hasFontSizeBaseName =
      token.name.toLowerCase().includes(FONT_SIZE_BASE) ||
      token.metadata.originName?.toLowerCase().includes(FONT_SIZE_BASE);

    return FONT_SIZE_BASE_TOKEN_TYPES.includes(token.type) && hasFontSizeBaseName && !!token.metadata.device;
  });

  fontSizeBaseTokens.forEach((token) => {
    const device = token.metadata.device?.toLowerCase() || 'mobile';
    const measure = readMeasure(token);

    if (typeof measure === 'number' && measure > 0) {
      fontSizeBaseMap.set(device, measure);
    }
  });

  return fontSizeBaseMap;
};

/**
 * Gets font-size-base value for a specific breakpoint
 *
 * @param fontSizeBaseMap - Map of breakpoint to font-size-base values
 * @param breakpoint - Breakpoint name (mobile, tablet, desktop)
 * @returns {number} Font-size-base value in px, or 0 if not found (0 means no conversion should happen)
 */
export const getFontSizeBaseForBreakpoint = (fontSizeBaseMap: FontSizeBaseMap, breakpoint: string): number => {
  const normalizedBreakpoint = breakpoint.toLowerCase();

  if (fontSizeBaseMap.size === 0) {
    return 0;
  }

  return fontSizeBaseMap.get(normalizedBreakpoint) || fontSizeBaseMap.get('mobile') || 0;
};

/**
 * Converts a pixel value to rem units based on font-size-base
 *
 * @param value - Value in pixels to convert
 * @param baseFontSize - Base font size in pixels (default: DEFAULT_FONT_SIZE_BASE)
 * @returns {string|number} Value in rem units
 */
export const makeRelativeUnit = (
  value: string | number,
  baseFontSize: number = FONT_SIZE_BASE_DEFAULT,
): string | number => {
  if (baseFontSize && baseFontSize > 0) {
    return pxToRem(value, { baseFontSize });
  }

  return value;
};

/**
 * Replaces px units with rem units in a string
 *
 * @param value - String containing px values
 * @param baseFontSize - Base font size in pixels (default: DEFAULT_FONT_SIZE_BASE)
 * @returns {string} String with px replaced by rem
 */
export const replacePxWithRemUnits = (value: string, baseFontSize: number = FONT_SIZE_BASE_DEFAULT): string => {
  if (!baseFontSize || baseFontSize <= 0) {
    return value;
  }

  return value.replace(new RegExp(`(\\d+(?:\\.\\d+)?)${PX_UNIT}`, 'g'), (_, number: string) =>
    pxToRem(number, { baseFontSize }),
  );
};

/**
 * Tells whether a dimension of the internal token model is in `px`.
 *
 * @param dimension
 */
export const isPxValue = (dimension?: NumberValue): dimension is NumberValue => dimension?.unit === PX_UNIT;
