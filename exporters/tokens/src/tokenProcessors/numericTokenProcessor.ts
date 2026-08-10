import {
  DimensionToken,
  FontSizeToken,
  LetterSpacingToken,
  LineHeightToken,
  RadiusToken,
  SizeToken,
  SpaceToken,
  Token,
  TokenGroup,
  TokenType,
} from '@supernovaio/sdk-exporters';
import { CSSHelper } from '@supernovaio/export-helpers';
import { formatTokenStyleByOutput, tokenVariableName } from '../helpers/tokenHelper';
import { handleSpecialCase } from '../helpers/specialCaseHelper';
import { getDeviceAlias } from '../helpers/deviceHelpers';
import { getFontSizeBaseForBreakpoint, type FontSizeBaseMap } from '../helpers/unitHelper';
import { formatUnitValue, type UnitFormatContext } from '../formatters/unitFormatter';
import { FONT_SIZE_BASE } from '../constants';

type NumericToken =
  DimensionToken | RadiusToken | SpaceToken | SizeToken | FontSizeToken | LineHeightToken | LetterSpacingToken;

type NumericTokenProcessorContext = {
  tokenGroups: Array<TokenGroup>;
  hasParentPrefix: boolean;
  hasJsOutput: boolean;
  fontSizeBaseMap: FontSizeBaseMap;
};

const getDeviceKey = (token: Token): string => {
  const deviceAlias = getDeviceAlias(token).toLowerCase();
  if (deviceAlias) {
    return deviceAlias;
  }

  const tokenName = token.name?.toLowerCase() || '';
  const originName = token.origin?.name?.toLowerCase() || '';
  const combinedName = `${tokenName} ${originName}`;

  if (combinedName.includes('desktop')) {
    return 'desktop';
  }

  if (combinedName.includes('tablet')) {
    return 'tablet';
  }

  if (combinedName.includes('mobile')) {
    return 'mobile';
  }

  // Default fallback to mobile for tokens without breakpoint in name
  return 'mobile';
};

const getBaseFontSize = (fontSizeBaseMap: FontSizeBaseMap, token: Token): number => {
  return getFontSizeBaseForBreakpoint(fontSizeBaseMap, getDeviceKey(token));
};

const isFontSizeBaseToken = (token: Token, resolvedName: string): boolean => {
  const tokenName = token.name?.toLowerCase() || '';
  const originName = token.origin?.name?.toLowerCase() || '';
  const resolved = resolvedName.toLowerCase();

  return resolved.includes(FONT_SIZE_BASE) || tokenName.includes(FONT_SIZE_BASE) || originName.includes(FONT_SIZE_BASE);
};

const formatMeasure = (
  token: Token,
  tokenType: TokenType,
  name: string,
  measure: number | undefined,
  unit: string | undefined,
  baseFontSize: number,
) => {
  const ctx: UnitFormatContext = {
    token,
    tokenType,
    baseFontSize,
    isFontSizeBaseToken: isFontSizeBaseToken(token, name),
  };

  return formatUnitValue(measure, unit, ctx);
};

/**
 * Processes numeric tokens (dimension, radius, space, size, fontSize, lineHeight, letterSpacing)
 * that support rem conversion based on font-size-base.
 *
 * @param numericToken - The numeric token to process
 * @param tokenType - The type of the token
 * @param ctx - Processing context with token groups, fontSizeBaseMap, and output options
 * @returns {string|null} Formatted token style string or null
 */
export const processNumericToken = (
  numericToken: NumericToken,
  tokenType: TokenType,
  ctx: NumericTokenProcessorContext,
): string | null => {
  const { tokenGroups, hasParentPrefix, hasJsOutput, fontSizeBaseMap } = ctx;
  const name = tokenVariableName(numericToken, tokenGroups, hasParentPrefix);
  let value = numericToken.value?.measure;
  value = handleSpecialCase(name, value);
  const unit = CSSHelper.unitToCSS(numericToken.value?.unit);
  const baseFontSize = getBaseFontSize(fontSizeBaseMap, numericToken);

  const formattedValue = formatMeasure(numericToken, tokenType, name, value, unit, baseFontSize);

  return formattedValue === undefined ? null : formatTokenStyleByOutput(name, formattedValue, hasJsOutput);
};
