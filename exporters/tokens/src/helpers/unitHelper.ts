import { DimensionToken, FontSizeToken, Token, TokenType, Unit } from '@supernovaio/sdk-exporters';
import { FONT_SIZE_BASE, FONT_SIZE_BASE_DEFAULT, PX_UNIT } from '../constants';
import { getDeviceAlias } from './deviceHelpers';
import { pxToRem } from '../converters/pxToRem';

export type FontSizeBaseMap = Map<string, number>;

const UNIT_TO_CSS: Partial<Record<Unit, string>> = {
  [Unit.percent]: '%',
  [Unit.pixels]: PX_UNIT,
  [Unit.rem]: 'rem',
  [Unit.raw]: '',
  [Unit.ms]: 'ms',
};

/**
 * Converts a Supernova unit enum value (e.g. `Unit.pixels`) to the CSS unit string (e.g. "px").
 * An unknown unit falls back to `px`, the same way Supernova's own `CSSHelper.unitToCSS` did.
 *
 * @param unit - Supernova unit
 * @returns {string} CSS unit, an empty string for a raw (unit-less) value
 */
export const unitToCss = (unit: Unit): string => UNIT_TO_CSS[unit] ?? PX_UNIT;

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

/**
 * Finds font-size-base token from tokens array
 *
 * @param tokens - Array of tokens to search in
 * @returns {Map<string, number>} FontSizeBaseMap with breakpoint as key and font-size-base value in px as value
 */
export const getFontSizeBaseMap = (tokens: Token[]): FontSizeBaseMap => {
  const fontSizeBaseMap = new Map<string, number>();

  const exactFontSizeBase = tokens.find(
    (token) =>
      (token.tokenType === TokenType.fontSize || token.tokenType === TokenType.dimension) &&
      (token.name.toLowerCase() === FONT_SIZE_BASE || token.origin?.name?.toLowerCase() === FONT_SIZE_BASE) &&
      !getDeviceAlias(token),
  );

  if (exactFontSizeBase) {
    let measure: number | undefined;
    if (exactFontSizeBase.tokenType === TokenType.fontSize) {
      const fontSizeToken = exactFontSizeBase as FontSizeToken;
      measure = fontSizeToken.value?.measure;
    } else if (exactFontSizeBase.tokenType === TokenType.dimension) {
      const dimensionToken = exactFontSizeBase as DimensionToken;
      measure = dimensionToken.value?.measure;
    }

    if (typeof measure === 'number' && measure > 0) {
      fontSizeBaseMap.set('mobile', measure);
      fontSizeBaseMap.set('tablet', measure);
      fontSizeBaseMap.set('desktop', measure);

      return fontSizeBaseMap;
    }
  }

  const fontSizeBaseTokens = tokens.filter((token) => {
    const hasFontSizeBaseName =
      token.name.toLowerCase().includes('font-size-base') ||
      token.origin?.name?.toLowerCase().includes('font-size-base');
    const hasDeviceAlias = !!getDeviceAlias(token);

    return (
      (token.tokenType === TokenType.fontSize || token.tokenType === TokenType.dimension) &&
      hasFontSizeBaseName &&
      hasDeviceAlias
    );
  });

  fontSizeBaseTokens.forEach((token) => {
    const device = getDeviceAlias(token).toLowerCase() || 'mobile';
    let measure: number | undefined;

    if (token.tokenType === TokenType.fontSize) {
      const fontSizeToken = token as FontSizeToken;
      measure = fontSizeToken.value?.measure;
    } else if (token.tokenType === TokenType.dimension) {
      const dimensionToken = token as DimensionToken;
      measure = dimensionToken.value?.measure;
    }

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
