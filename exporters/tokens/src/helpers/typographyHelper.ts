import { exportConfiguration } from '../../config';
import { readTypography } from '../core/typography';
import type { NumberValue, TokenIndex, TokenValue } from '../core/types';
import type { TypographyStyle } from '../formatters/types';
import {
  DEFAULT_DECIMALS,
  FONT_SIZE_BASE_DEFAULT,
  FONT_WEIGHT_NAME_TO_NUMBER,
  TYPOGRAPHY_SUBSTITUTE_FONT,
} from '../constants';
import { roundToDecimals } from './numberHelper';
import { replaceByConfiguration } from './stringHelper';
import { isPxValue, makeRelativeUnit } from './unitHelper';

/**
 * Replaces the font family name with a modified version including a substitute font.
 *
 * This function takes a font family name as input and uses the `replaceByConfiguration` function
 * to replace it with a string that includes the original font family and a substitute font.
 * The replacement rules are defined in the `exportConfiguration` object.
 *
 * @param {string} fontFamily - The name of the font family to be replaced.
 * @returns {string} - The modified font family string with the substitute font included.
 */
const replaceFontName = (fontFamily: string): string => {
  return replaceByConfiguration(exportConfiguration, `'${fontFamily}', ${TYPOGRAPHY_SUBSTITUTE_FONT}`, 'Font');
};

const normalizeFontWeight = (fontWeightText: string): number | string => {
  const normalizedText = fontWeightText.trim().toLowerCase();
  const normalizedWithoutItalic = normalizedText.replace(/\s*italic$/i, '');
  const mappedValue = FONT_WEIGHT_NAME_TO_NUMBER[normalizedWithoutItalic.replace(/[\s_-]+/g, '')];

  if (mappedValue) {
    return mappedValue;
  }

  const parsedValue = parseInt(normalizedWithoutItalic, 10);

  return Number.isNaN(parsedValue) ? fontWeightText : parsedValue;
};

/**
 * Renders a font size as a quoted string, converted to `rem` when it is in `px` and a base is given.
 *
 * @param fontSize
 * @param baseFontSize - Font size base to convert `px` to `rem` with, 0 keeps `px`
 */
const fontSizeValue = (fontSize: NumberValue | undefined, baseFontSize: number): string => {
  const measure = fontSize?.value ?? 0;

  return isPxValue(fontSize) && measure > 0 && baseFontSize > 0
    ? `'${makeRelativeUnit(measure, baseFontSize)}'`
    : `'${measure}${fontSize?.unit ?? ''}'`;
};

/**
 * Calculates the unitless line height ratio relative to the font size (proper CSS line-height).
 * Only defined when both dimensions are in `px`.
 *
 * @param fontSize
 * @param lineHeight
 */
const unitlessLineHeight = (fontSize?: NumberValue, lineHeight?: NumberValue): string | undefined =>
  isPxValue(fontSize) && isPxValue(lineHeight) && fontSize.value > 0 && lineHeight.value
    ? roundToDecimals(lineHeight.value / fontSize.value, DEFAULT_DECIMALS).toString()
    : undefined;

/**
 * Builds a format-agnostic typography style from a typography value of the internal token model.
 *
 * Works on the model only (see `core/typography.ts`), so it does not depend on a source's own typography token.
 * The font family replacement comes from the exporter configuration, whatever the source.
 * Rendering to SCSS or JS is up to the formatter (see `formatters/typographyFormatter.ts`).
 *
 * @param value - A typography composite value
 * @param isItalic - Whether the style is italic by its name
 * @param baseFontSize - Font size base to convert `px` to `rem` with, 0 keeps `px`
 * @param index - View of the tokens references point into, only needed for references the source did not resolve
 */
export const typographyStyle = (
  value: TokenValue,
  isItalic: boolean,
  baseFontSize: number = FONT_SIZE_BASE_DEFAULT,
  index?: TokenIndex,
): TypographyStyle => {
  const { fontFamily, fontSize, fontWeight, lineHeight } = readTypography(value, index);
  const fontName = replaceFontName(fontFamily);
  const italicFromWeight = fontWeight.toLowerCase().includes('italic');
  const fontWeightValue = normalizeFontWeight(fontWeight);
  const lineHeightValue = unitlessLineHeight(fontSize, lineHeight);

  const style: TypographyStyle = {
    fontFamily: `${fontName}`,
    fontSize: fontSizeValue(fontSize, baseFontSize),
    fontStyle: `'${isItalic || italicFromWeight ? 'italic' : 'normal'}'`,
    fontWeight: fontWeightValue,
  };

  if (lineHeightValue !== undefined) {
    style.lineHeight = lineHeightValue;
  }

  return style;
};

/**
 * Name of a typography style made of the token name parts, without the breakpoint part (if present).
 *
 * @param tokenNameParts
 */
export const formatTypographyName = (tokenNameParts: string[]): string => {
  return tokenNameParts.length === 4
    ? tokenNameParts.filter((_, index) => index !== 1).join('-')
    : tokenNameParts.join('-');
};

/**
 * Breakpoint of a typography style from the token name parts, `mobile` when the name has none.
 *
 * @param tokenNameParts
 */
export const getBreakpoint = (tokenNameParts: string[]): string => {
  return tokenNameParts.length === 4 ? tokenNameParts[1] : 'mobile';
};
