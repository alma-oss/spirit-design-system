import type { Token, TokenGroup } from '@supernovaio/sdk-exporters';
import { mapToken } from '../adapters/supernova/mappers/tokenMapper';
import { readTypography, readTypographyReferences, withTypographyDimensions } from '../core/typography';
import { type NumberValue, type TokenIndex, TokenTypeEnum, type TokenValue } from '../core/types';
import { formatTypographyName, getBreakpoint } from '../helpers/objectHelper';
import { tokenVariableName } from '../helpers/tokenHelper';
import { typographyValue } from '../helpers/typographyHelper';
import { getFontSizeBaseForBreakpoint, isPxValue, unitToCss, type FontSizeBaseMap } from '../helpers/unitHelper';
import { toCamelCase } from '../helpers/stringHelper';
import type { DeviceDimensionEntries, DeviceDimensionMap, StylesObjectType } from '../generators/stylesObjectGenerator';

const toNumberValue = ({ measure, unit }: DeviceDimensionEntries[string]): NumberValue => ({
  type: 'number',
  value: measure,
  unit: unitToCss(unit),
});

const resolveDeviceEntries = (
  referenceId: string | null | undefined,
  deviceDimensions: DeviceDimensionMap,
  tokenGroups: Array<TokenGroup>,
  hasParentPrefix: boolean,
  tokenById?: Map<string, Token>,
): DeviceDimensionEntries | undefined => {
  if (!referenceId) {
    return undefined;
  }

  const referencedToken = tokenById?.get(referenceId);
  if (referencedToken) {
    const baseVariableName = tokenVariableName(referencedToken, tokenGroups, hasParentPrefix);
    const byVariableName = deviceDimensions.get(baseVariableName);
    if (byVariableName) {
      return byVariableName;
    }

    const originKey = referencedToken.origin?.name?.toLowerCase();

    return originKey ? deviceDimensions.get(originKey) : undefined;
  }

  return deviceDimensions.get(referenceId);
};

const collectDeviceNames = (...deviceEntries: Array<DeviceDimensionEntries | undefined>): Set<string> =>
  new Set(deviceEntries.flatMap((entries) => Object.keys(entries ?? {})));

const getDeviceTypographyValues = (
  typography: TokenValue,
  tokenGroups: Array<TokenGroup>,
  hasParentPrefix: boolean,
  deviceDimensions?: DeviceDimensionMap,
  tokenById?: Map<string, Token>,
): Map<string, TokenValue> | null => {
  if (!deviceDimensions) {
    return null;
  }

  const { fontSize: fontSizeReferenceId, lineHeight: lineHeightReferenceId } = readTypographyReferences(typography);
  const fontSizeDevices = resolveDeviceEntries(
    fontSizeReferenceId,
    deviceDimensions,
    tokenGroups,
    hasParentPrefix,
    tokenById,
  );
  const lineHeightDevices = resolveDeviceEntries(
    lineHeightReferenceId,
    deviceDimensions,
    tokenGroups,
    hasParentPrefix,
    tokenById,
  );
  const devices = collectDeviceNames(fontSizeDevices, lineHeightDevices);

  if (devices.size === 0) {
    return null;
  }

  const deviceTypographyMap = Array.from(devices).reduce<Map<string, TokenValue>>((accumulator, device) => {
    const fontSizeDimension = fontSizeDevices?.[device];
    const lineHeightDimension = lineHeightDevices?.[device];

    accumulator.set(
      device,
      withTypographyDimensions(typography, {
        ...(fontSizeDimension && { fontSize: toNumberValue(fontSizeDimension) }),
        ...(lineHeightDimension && { lineHeight: toNumberValue(lineHeightDimension) }),
      }),
    );

    return accumulator;
  }, new Map<string, TokenValue>());

  return deviceTypographyMap.size > 0 ? deviceTypographyMap : null;
};

const hasDeviceVariation = (
  deviceTypographyValues: Map<string, TokenValue>,
  baseFontSizeMeasure: number | undefined,
  baseLineHeightMeasure: number | undefined,
  tokenIndex?: TokenIndex,
): boolean => {
  return Array.from(deviceTypographyValues.values()).some((value) => {
    const { fontSize, lineHeight } = readTypography(value, tokenIndex);
    const deviceFontSize = fontSize?.value;
    const deviceLineHeight = lineHeight?.value;

    return (
      (deviceFontSize !== undefined && baseFontSizeMeasure !== undefined && deviceFontSize !== baseFontSizeMeasure) ||
      (deviceLineHeight !== undefined &&
        baseLineHeightMeasure !== undefined &&
        deviceLineHeight !== baseLineHeightMeasure)
    );
  });
};

const getDeviceKeys = (
  deviceTypographyValues: Map<string, TokenValue> | null,
  fontSizeBaseMap: FontSizeBaseMap | undefined,
  breakpoint: string,
): string[] => {
  const baseKeys = deviceTypographyValues ? deviceTypographyValues.keys() : (fontSizeBaseMap?.keys() ?? []);

  // The current breakpoint and `mobile` are always present, even when the device data does not mention them
  return Array.from(new Set([...baseKeys, breakpoint, 'mobile'])).filter(Boolean);
};

/**
 * Font size base used for the px -> rem conversion; `0` when no base is configured (values stay in px).
 *
 * @param fontSizeBaseMap
 * @param device
 */
const getDeviceFontSizeBase = (fontSizeBaseMap: FontSizeBaseMap | undefined, device: string): number =>
  fontSizeBaseMap ? getFontSizeBaseForBreakpoint(fontSizeBaseMap, device) : 0;

/**
 * Px font sizes need per-device values when the configured font size base differs between devices.
 *
 * @param fontSizeBaseMap
 * @param fontSize
 */
const hasResponsiveFontSizeBase = (fontSizeBaseMap: FontSizeBaseMap | undefined, fontSize?: NumberValue): boolean =>
  !!fontSizeBaseMap && new Set(fontSizeBaseMap.values()).size > 1 && isPxValue(fontSize) && !!fontSize.value;

const shouldCreateDeviceVariations = (
  deviceTypographyValues: Map<string, TokenValue> | null,
  hasResponsiveBase: boolean,
  baseFontSizeMeasure: number | undefined,
  baseLineHeightMeasure: number | undefined,
  tokenIndex?: TokenIndex,
): boolean => {
  if (!deviceTypographyValues && !hasResponsiveBase) {
    return false;
  }

  if (hasResponsiveBase) {
    return true;
  }

  if (!deviceTypographyValues) {
    return false;
  }

  return hasDeviceVariation(deviceTypographyValues, baseFontSizeMeasure, baseLineHeightMeasure, tokenIndex);
};

/**
 * Adds a typography token to the styles object, one entry per breakpoint (or device).
 *
 * Naming stays on the native token (it needs the SDK's `NamingHelper`). The value is read through the internal
 * `DesignToken` model via the Supernova adapter's mapper, so rendering it does not depend on Supernova's typography
 * token class (see #DS-2873).
 *
 * @param tokenNameParts
 * @param token
 * @param tokenGroups
 * @param hasParentPrefix
 * @param stylesObjectRef
 * @param hasJsOutput
 * @param deviceDimensions
 * @param fontSizeBaseMap
 * @param tokenById
 * @param tokenIndex Index used to resolve references in the typography value (e.g. to font size or line height tokens)
 */
export const handleTypographyTokens = (
  tokenNameParts: string[],
  token: Token,
  tokenGroups: Array<TokenGroup>,
  hasParentPrefix: boolean,
  stylesObjectRef: StylesObjectType,
  hasJsOutput: boolean,
  deviceDimensions?: DeviceDimensionMap,
  fontSizeBaseMap?: FontSizeBaseMap,
  tokenById?: Map<string, Token>,
  tokenIndex?: TokenIndex,
): void => {
  const designToken = mapToken(token, tokenGroups);

  if (designToken?.type !== TokenTypeEnum.Typography) {
    return;
  }

  const typography = designToken.value;
  const { fontSize, lineHeight } = readTypography(typography, tokenIndex);
  const name = formatTypographyName(tokenNameParts).toLowerCase();
  const breakpoint = getBreakpoint(tokenNameParts).toLowerCase();
  const isItalic = name.includes('italic');
  const deviceTypographyValues = getDeviceTypographyValues(
    typography,
    tokenGroups,
    hasParentPrefix,
    deviceDimensions,
    tokenById,
  );
  const hasResponsiveBase = hasResponsiveFontSizeBase(fontSizeBaseMap, fontSize);
  const shouldCreateVariations = shouldCreateDeviceVariations(
    deviceTypographyValues,
    hasResponsiveBase,
    fontSize?.value,
    lineHeight?.value,
    tokenIndex,
  );
  const renderTypography = (value: TokenValue, device: string): string | object =>
    typographyValue(value, isItalic, hasJsOutput, getDeviceFontSizeBase(fontSizeBaseMap, device), tokenIndex);

  if (tokenNameParts.length === 0) {
    return;
  }

  const objectKey = hasJsOutput ? toCamelCase(name) : `$${name}`;
  const targetObject = (stylesObjectRef[objectKey] = stylesObjectRef[objectKey] || {}) as StylesObjectType;

  if (!shouldCreateVariations) {
    targetObject[breakpoint] = renderTypography(typography, breakpoint);

    return;
  }

  for (const device of getDeviceKeys(deviceTypographyValues, fontSizeBaseMap, breakpoint)) {
    const deviceValue =
      deviceTypographyValues?.get(device) ||
      (device === 'mobile' || device === breakpoint || hasResponsiveBase ? typography : undefined);

    if (!deviceValue) {
      break;
    }

    targetObject[device] = renderTypography(deviceValue, device);
  }
};
