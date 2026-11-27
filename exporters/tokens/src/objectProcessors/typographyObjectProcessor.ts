import { readTypography, readTypographyReferences, withTypographyDimensions } from '../core/typography';
import {
  type DesignToken,
  type FontReplacement,
  type NumberValue,
  type TokenIndex,
  TokenTypeEnum,
  type TokenValue,
  type TypographyStyleLeaf,
  typographyStyleLeaf,
  DeviceDimensionMap,
  DeviceDimensionEntries,
  StylesObjectType,
  type FontSizeBaseMap,
} from '../core/types';
import { compareDevices, getOriginName, tokenVariableName } from '../helpers/tokenHelper';
import { formatTypographyName, getBreakpoint, typographyStyle } from '../helpers/typographyHelper';
import { getFontSizeBaseForBreakpoint, isPxValue } from '../helpers/unitHelper';
import { toCamelCase } from '../helpers/stringHelper';

const toNumberValue = ({ measure, unit }: DeviceDimensionEntries[string]): NumberValue => ({
  type: 'number',
  value: measure,
  unit,
});

const resolveDeviceEntries = (
  referenceId: string | null | undefined,
  deviceDimensions: DeviceDimensionMap,
  hasParentPrefix: boolean,
  tokenIndex?: TokenIndex,
): DeviceDimensionEntries | undefined => {
  if (!referenceId) {
    return undefined;
  }

  const referencedToken = tokenIndex?.get(referenceId);
  if (referencedToken) {
    const baseVariableName = tokenVariableName(referencedToken, hasParentPrefix);
    const byVariableName = deviceDimensions.get(baseVariableName);
    if (byVariableName) {
      return byVariableName;
    }

    const originKey = getOriginName(referencedToken);

    return originKey ? deviceDimensions.get(originKey) : undefined;
  }

  return deviceDimensions.get(referenceId);
};

const collectDeviceNames = (...deviceEntries: Array<DeviceDimensionEntries | undefined>): Set<string> =>
  new Set(deviceEntries.flatMap((entries) => Object.keys(entries ?? {})));

const getDeviceTypographyValues = (
  typography: TokenValue,
  hasParentPrefix: boolean,
  deviceDimensions?: DeviceDimensionMap,
  tokenIndex?: TokenIndex,
): Map<string, TokenValue> | null => {
  if (!deviceDimensions) {
    return null;
  }

  const { fontSize: fontSizeReferenceId, lineHeight: lineHeightReferenceId } = readTypographyReferences(typography);
  const fontSizeDevices = resolveDeviceEntries(fontSizeReferenceId, deviceDimensions, hasParentPrefix, tokenIndex);
  const lineHeightDevices = resolveDeviceEntries(lineHeightReferenceId, deviceDimensions, hasParentPrefix, tokenIndex);
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
  return Array.from(new Set([...baseKeys, breakpoint, 'mobile']))
    .filter(Boolean)
    .sort(compareDevices);
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
 * Naming is derived by `namingHelper` from the token's name, group path and device (see #DS-2874). The value is
 * read from the internal `DesignToken` model.
 *
 * @param tokenNameParts
 * @param token
 * @param hasParentPrefix
 * @param stylesObjectRef
 * @param hasJsOutput
 * @param deviceDimensions
 * @param fontSizeBaseMap
 * @param tokenIndex Index used to resolve references in the typography value (e.g. to font size or line height tokens)
 * @param fontReplacements Replacements of the font family
 */
export const handleTypographyTokens = (
  tokenNameParts: string[],
  token: DesignToken,
  hasParentPrefix: boolean,
  stylesObjectRef: StylesObjectType,
  hasJsOutput: boolean,
  deviceDimensions?: DeviceDimensionMap,
  fontSizeBaseMap?: FontSizeBaseMap,
  tokenIndex?: TokenIndex,
  fontReplacements: FontReplacement[] = [],
): void => {
  if (token.type !== TokenTypeEnum.Typography) {
    return;
  }

  const typography = token.value;
  const { fontSize, lineHeight } = readTypography(typography, tokenIndex);
  const name = formatTypographyName(tokenNameParts).toLowerCase();
  const breakpoint = getBreakpoint(tokenNameParts).toLowerCase();
  const isItalic = name.includes('italic');
  const deviceTypographyValues = getDeviceTypographyValues(typography, hasParentPrefix, deviceDimensions, tokenIndex);
  const hasResponsiveBase = hasResponsiveFontSizeBase(fontSizeBaseMap, fontSize);
  const shouldCreateVariations = shouldCreateDeviceVariations(
    deviceTypographyValues,
    hasResponsiveBase,
    fontSize?.value,
    lineHeight?.value,
    tokenIndex,
  );
  const toStyleLeaf = (value: TokenValue, device: string): TypographyStyleLeaf =>
    typographyStyleLeaf(
      typographyStyle(value, isItalic, getDeviceFontSizeBase(fontSizeBaseMap, device), tokenIndex, fontReplacements),
    );

  if (tokenNameParts.length === 0) {
    return;
  }

  const objectKey = hasJsOutput ? toCamelCase(name) : `$${name}`;
  const targetObject = (stylesObjectRef[objectKey] = stylesObjectRef[objectKey] || {}) as StylesObjectType;

  if (!shouldCreateVariations) {
    targetObject[breakpoint] = toStyleLeaf(typography, breakpoint);

    return;
  }

  for (const device of getDeviceKeys(deviceTypographyValues, fontSizeBaseMap, breakpoint)) {
    const deviceValue =
      deviceTypographyValues?.get(device) ||
      (device === 'mobile' || device === breakpoint || hasResponsiveBase ? typography : undefined);

    if (!deviceValue) {
      break;
    }

    targetObject[device] = toStyleLeaf(deviceValue, device);
  }
};
