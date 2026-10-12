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
  type Unit,
} from '@supernovaio/sdk-exporters';
import { CSSHelper } from '@supernovaio/export-helpers';
import { formatTokenStyleByOutput, tokenVariableName } from '../helpers/tokenHelper';
import { handleSpecialCase } from '../helpers/specialCaseHelper';
import { getDeviceAlias } from '../helpers/deviceHelpers';
import { getFontSizeBaseForBreakpoint, type FontSizeBaseMap } from '../helpers/unitHelper';
import { formatUnitValue, type UnitFormatContext } from '../formatters/unitFormatter';
import { FONT_SIZE_BASE } from '../constants';
import { mapToken } from '../adapters/supernova/mappers/tokenMapper';
import { TransformationEngine, pxToRemRule } from '../transformations';
import type { NumberValue } from '../core/types';

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

const pxToRemEngine = new TransformationEngine([pxToRemRule]);

/**
 * Formats an already-transformed `NumberValue` into the final output value:
 * bare `0` for zero, the bare number when there's no unit, otherwise the
 * number and unit concatenated. The rem-conversion decision itself now
 * happens earlier, via the `TransformationEngine` - this is purely
 * formatting, mirroring `formatUnitValue`'s tail once a rule has already run
 * (or decided not to).
 *
 * @param value
 */
const formatNumberValue = (value: NumberValue): string | number => {
  if (value.value === 0) {
    return 0;
  }

  if (!value.unit) {
    return value.value;
  }

  return `${value.value}${value.unit}`;
};

/**
 * Processes numeric tokens (dimension, radius, space, size, fontSize, lineHeight, letterSpacing)
 * that support rem conversion based on font-size-base.
 *
 * Naming stays on the native token (it needs the SDK's `NamingHelper`). The
 * value is read through the internal `DesignToken` model via the Supernova
 * adapter's mapper, and the px-to-rem decision runs through the
 * `TransformationEngine`'s `pxToRemRule` (see #DS-2335). The native fallback
 * branch is unreachable today - all 7 dimension-family types are migrated -
 * and is kept only as defense-in-depth, same as `processBorderToken`.
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
  const baseFontSize = getBaseFontSize(fontSizeBaseMap, numericToken);

  const designToken = mapToken(numericToken, tokenGroups);
  let formattedValue: string | number | undefined;

  if (designToken?.value.type === 'number') {
    // handleSpecialCase runs on the raw measure first, exactly as before -
    // it can short-circuit a value (e.g. breakpoint-mobile -> 0) before the
    // rem-conversion decision ever sees it.
    const specialCasedValue = handleSpecialCase(name, designToken.value.value);
    const tokenForTransform = { ...designToken, value: { ...designToken.value, value: specialCasedValue } };

    const transformed = pxToRemEngine.transformToken(tokenForTransform, {
      token: tokenForTransform,
      params: { baseFontSize, isFontSizeBaseToken: isFontSizeBaseToken(numericToken, name) },
    });

    formattedValue = transformed.value.type === 'number' ? formatNumberValue(transformed.value) : undefined;
  } else {
    const value = handleSpecialCase(name, numericToken.value?.measure);
    const unit = CSSHelper.unitToCSS(numericToken.value?.unit as Unit);

    formattedValue = formatMeasure(numericToken, tokenType, name, value, unit, baseFontSize);
  }

  return formattedValue === undefined ? null : formatTokenStyleByOutput(name, formattedValue, hasJsOutput);
};
