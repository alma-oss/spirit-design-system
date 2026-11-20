import type { DesignToken, NumberValue, FontSizeBaseMap } from '../core/types';
import { formatTokenStyleByOutput, getOriginName, tokenVariableName } from '../helpers/tokenHelper';
import { handleSpecialCase } from '../helpers/specialCaseHelper';
import { getFontSizeBaseForBreakpoint } from '../helpers/unitHelper';
import { FONT_SIZE_BASE } from '../constants';
import { TransformationEngine, pxToRemRule } from '../transformations';

type NumericTokenProcessorContext = {
  hasParentPrefix: boolean;
  hasJsOutput: boolean;
  fontSizeBaseMap: FontSizeBaseMap;
};

const getDeviceKey = (token: DesignToken): string => {
  const deviceAlias = (token.metadata.device ?? '').toLowerCase();
  if (deviceAlias) {
    return deviceAlias;
  }

  const tokenName = token.name?.toLowerCase() || '';
  const originName = getOriginName(token) || '';
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

const getBaseFontSize = (fontSizeBaseMap: FontSizeBaseMap, token: DesignToken): number => {
  return getFontSizeBaseForBreakpoint(fontSizeBaseMap, getDeviceKey(token));
};

const isFontSizeBaseToken = (token: DesignToken, resolvedName: string): boolean => {
  const tokenName = token.name?.toLowerCase() || '';
  const originName = getOriginName(token) || '';
  const resolved = resolvedName.toLowerCase();

  return resolved.includes(FONT_SIZE_BASE) || tokenName.includes(FONT_SIZE_BASE) || originName.includes(FONT_SIZE_BASE);
};

const pxToRemEngine = new TransformationEngine([pxToRemRule]);

/**
 * Formats an already-transformed `NumberValue` into the final output value:
 * bare `0` for a zero source value, the bare number when there's no unit,
 * otherwise the number and unit concatenated. The rem-conversion decision
 * itself now happens earlier, via the `TransformationEngine` - this is purely
 * formatting.
 *
 * Zero is judged on the source value, not the transformed one: a non-zero px
 * value that rounds to zero keeps its unit (e.g. `0.0001px` -> `0rem`).
 *
 * @param value - The transformed value
 * @param isZeroSource - Whether the value was zero before the transformation
 */
const formatNumberValue = (value: NumberValue, isZeroSource: boolean): string | number => {
  if (isZeroSource) {
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
 * Naming is derived by `namingHelper` from the token's name, group path and device (see #DS-2874). The value is
 * read from the internal `DesignToken` model, and the px-to-rem decision runs through the `TransformationEngine`'s
 * `pxToRemRule` (see #DS-2335).
 *
 * @param numericToken - The numeric token to process
 * @param ctx - Processing context with fontSizeBaseMap and output options
 * @returns {string|null} Formatted token style string or null
 */
export const processNumericToken = (numericToken: DesignToken, ctx: NumericTokenProcessorContext): string | null => {
  const { hasParentPrefix, hasJsOutput, fontSizeBaseMap } = ctx;

  if (numericToken.value.type !== 'number') {
    return null;
  }

  const name = tokenVariableName(numericToken, hasParentPrefix);
  const baseFontSize = getBaseFontSize(fontSizeBaseMap, numericToken);

  // handleSpecialCase runs on the raw measure first - it can short-circuit a value (e.g. breakpoint-mobile -> 0)
  // before the rem-conversion decision ever sees it.
  const specialCasedValue = handleSpecialCase(name, numericToken.value.value);
  const tokenForTransform = { ...numericToken, value: { ...numericToken.value, value: specialCasedValue } };

  const transformed = pxToRemEngine.transformToken(tokenForTransform, {
    token: tokenForTransform,
    params: { baseFontSize, isFontSizeBaseToken: isFontSizeBaseToken(numericToken, name) },
  });

  const formattedValue =
    transformed.value.type === 'number' ? formatNumberValue(transformed.value, specialCasedValue === 0) : undefined;

  return formattedValue === undefined ? null : formatTokenStyleByOutput(name, formattedValue, hasJsOutput);
};
