import { Token, TokenGroup, TypographyToken, type TypographyTokenValue } from '@supernovaio/sdk-exporters';
import { formatTypographyName, getBreakpoint } from '../helpers/objectHelper';
import { tokenVariableName, typographyValue } from '../helpers/tokenHelper';
import { getFontSizeBaseForBreakpoint, type FontSizeBaseMap } from '../helpers/unitHelper';
import { toCamelCase } from '../helpers/stringHelper';
import type { DeviceDimensionEntries, DeviceDimensionMap, StylesObjectType } from '../generators/stylesObjectGenerator';

export const cloneTypographyValue = (value: TypographyTokenValue): TypographyTokenValue => {
  const cloned: Partial<TypographyTokenValue> = {
    referencedTokenId: value.referencedTokenId ?? null,
  };

  if (value.fontFamily) {
    cloned.fontFamily = { ...value.fontFamily };
  }

  if (value.fontWeight) {
    cloned.fontWeight = { ...value.fontWeight };
  }

  if (value.fontSize) {
    cloned.fontSize = { ...value.fontSize };
  }

  if (value.textDecoration) {
    cloned.textDecoration = { ...value.textDecoration };
  }

  if (value.textCase) {
    cloned.textCase = { ...value.textCase };
  }

  if (value.letterSpacing) {
    cloned.letterSpacing = { ...value.letterSpacing };
  }

  if (value.lineHeight) {
    cloned.lineHeight = { ...value.lineHeight };
  }

  if (value.paragraphIndent) {
    cloned.paragraphIndent = { ...value.paragraphIndent };
  }

  if (value.paragraphSpacing) {
    cloned.paragraphSpacing = { ...value.paragraphSpacing };
  }

  return cloned as TypographyTokenValue;
};

const applyDeviceDimension = (
  clonedValue: TypographyTokenValue,
  deviceValues: DeviceDimensionEntries | undefined,
  device: string,
  key: 'fontSize' | 'lineHeight',
) => {
  const deviceDimension = deviceValues?.[device];

  if (!deviceDimension) {
    return;
  }

  if (key === 'fontSize') {
    const existing = clonedValue.fontSize;
    if (existing) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- omit referencedTokenId from spread
      const { referencedTokenId: _omit, ...existingWithoutRefId } = existing;
      clonedValue.fontSize = {
        ...existingWithoutRefId,
        referencedTokenId: existing.referencedTokenId ?? null,
        measure: deviceDimension.measure,
        unit: deviceDimension.unit,
      };
    } else {
      clonedValue.fontSize = {
        measure: deviceDimension.measure,
        unit: deviceDimension.unit,
        referencedTokenId: null,
      };
    }

    return;
  }

  const existing = clonedValue.lineHeight;
  if (existing) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- omit referencedTokenId from spread
    const { referencedTokenId: _omit, ...existingWithoutRefId } = existing;
    clonedValue.lineHeight = {
      ...existingWithoutRefId,
      referencedTokenId: existing.referencedTokenId ?? null,
      measure: deviceDimension.measure,
      unit: deviceDimension.unit,
    };
  } else {
    clonedValue.lineHeight = {
      measure: deviceDimension.measure,
      unit: deviceDimension.unit,
      referencedTokenId: null,
    };
  }
};

const getDeviceTypographyValues = (
  typographyToken: TypographyToken,
  tokenGroups: Array<TokenGroup>,
  hasParentPrefix: boolean,
  deviceDimensions?: DeviceDimensionMap,
  tokenById?: Map<string, Token>,
): Map<string, TypographyTokenValue> | null => {
  if (!deviceDimensions) {
    return null;
  }

  const { fontSize, lineHeight } = typographyToken.value;
  const fontSizeReferenceId = fontSize?.referencedTokenId;
  const lineHeightReferenceId = lineHeight?.referencedTokenId;

  const resolveDeviceEntries = (referenceId: string | null | undefined) => {
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

  const fontSizeDevices = resolveDeviceEntries(fontSizeReferenceId);
  const lineHeightDevices = resolveDeviceEntries(lineHeightReferenceId);

  if (!fontSizeDevices && !lineHeightDevices) {
    return null;
  }

  const devices = new Set<string>();
  const addDeviceKeys = (deviceValues?: Record<string, unknown>) => {
    if (!deviceValues) {
      return;
    }

    Object.keys(deviceValues).forEach((device) => devices.add(device));
  };

  addDeviceKeys(fontSizeDevices);
  addDeviceKeys(lineHeightDevices);

  if (devices.size === 0) {
    return null;
  }

  const deviceTypographyMap = Array.from(devices).reduce<Map<string, TypographyTokenValue>>((accumulator, device) => {
    const clonedValue = cloneTypographyValue(typographyToken.value);

    applyDeviceDimension(clonedValue, fontSizeDevices, device, 'fontSize');
    applyDeviceDimension(clonedValue, lineHeightDevices, device, 'lineHeight');

    accumulator.set(device, clonedValue);

    return accumulator;
  }, new Map<string, TypographyTokenValue>());

  return deviceTypographyMap.size > 0 ? deviceTypographyMap : null;
};

const hasDeviceVariation = (
  deviceTypographyValues: Map<string, TypographyTokenValue>,
  baseFontSizeMeasure: number | undefined,
  baseLineHeightMeasure: number | undefined,
): boolean => {
  return Array.from(deviceTypographyValues.values()).some((value) => {
    const deviceFontSize = value.fontSize?.measure;
    const deviceLineHeight = value.lineHeight?.measure;

    return (
      (deviceFontSize !== undefined && baseFontSizeMeasure !== undefined && deviceFontSize !== baseFontSizeMeasure) ||
      (deviceLineHeight !== undefined &&
        baseLineHeightMeasure !== undefined &&
        deviceLineHeight !== baseLineHeightMeasure)
    );
  });
};

const collectDeviceKeys = (
  deviceTypographyValues: Map<string, TypographyTokenValue> | null,
  fontSizeBaseMap: FontSizeBaseMap | undefined,
): string[] => {
  const deviceKeys = deviceTypographyValues
    ? Array.from(deviceTypographyValues.keys())
    : Array.from(fontSizeBaseMap?.keys() ?? []);

  return deviceKeys;
};

const ensureDeviceInKeys = (deviceKeys: string[], device: string): void => {
  if (device && !deviceKeys.includes(device)) {
    deviceKeys.push(device);
  }
};

const shouldCreateDeviceVariations = (
  deviceTypographyValues: Map<string, TypographyTokenValue> | null,
  hasResponsiveBase: boolean,
  baseFontSizeMeasure: number | undefined,
  baseLineHeightMeasure: number | undefined,
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

  return hasDeviceVariation(deviceTypographyValues, baseFontSizeMeasure, baseLineHeightMeasure);
};

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
): void => {
  const typographyToken = token as TypographyToken;
  const reducedNameParts = tokenNameParts.slice(0, 2);
  const name = formatTypographyName(tokenNameParts).toLowerCase();
  const breakpoint = getBreakpoint(tokenNameParts).toLowerCase();
  const isItalic = name.includes('italic');
  const deviceTypographyValues = getDeviceTypographyValues(
    typographyToken,
    tokenGroups,
    hasParentPrefix,
    deviceDimensions,
    tokenById,
  );
  // If font-size-base is not provided, keep px values (no px->rem conversion).
  const shouldConvertToRem = !!fontSizeBaseMap && fontSizeBaseMap.size > 0;
  const baseFontSize = shouldConvertToRem ? getFontSizeBaseForBreakpoint(fontSizeBaseMap, breakpoint) : 0;
  const fontSizeUnit = typographyToken.value.fontSize?.unit;
  const fontSizeMeasure = typographyToken.value.fontSize?.measure;
  const hasResponsiveBase =
    shouldConvertToRem &&
    new Set(Array.from(fontSizeBaseMap.values())).size > 1 &&
    fontSizeUnit === 'Pixels' &&
    !!fontSizeMeasure;

  const baseFontSizeMeasure = typographyToken.value.fontSize?.measure;
  const baseLineHeightMeasure = typographyToken.value.lineHeight?.measure;
  const shouldCreateVariations = shouldCreateDeviceVariations(
    deviceTypographyValues,
    hasResponsiveBase,
    baseFontSizeMeasure,
    baseLineHeightMeasure,
  );

  let currentObject = stylesObjectRef;
  reducedNameParts.forEach((part, index) => {
    const tokenName = hasJsOutput ? toCamelCase(name) : `$${name}`;
    const modifiedPart = index === 0 ? tokenName : part;

    if (index === reducedNameParts.length - 1) {
      const targetObject =
        index === 0
          ? ((currentObject[modifiedPart] = currentObject[modifiedPart] || {}) as StylesObjectType)
          : currentObject;

      if (shouldCreateVariations) {
        const deviceKeys = collectDeviceKeys(deviceTypographyValues, fontSizeBaseMap);

        ensureDeviceInKeys(deviceKeys, breakpoint);
        ensureDeviceInKeys(deviceKeys, 'mobile');

        for (const device of deviceKeys) {
          const deviceValue =
            deviceTypographyValues?.get(device) ||
            (device === 'mobile' || device === breakpoint || hasResponsiveBase
              ? cloneTypographyValue(typographyToken.value)
              : undefined);

          if (!deviceValue) {
            return;
          }

          const deviceBaseFontSize = shouldConvertToRem ? getFontSizeBaseForBreakpoint(fontSizeBaseMap!, device) : 0;
          targetObject[device] = typographyValue(deviceValue, isItalic, hasJsOutput, deviceBaseFontSize);
        }

        return;
      }

      targetObject[breakpoint] = typographyValue(typographyToken.value, isItalic, hasJsOutput, baseFontSize);
    } else {
      currentObject[modifiedPart] = currentObject[modifiedPart] || {};
      currentObject = currentObject[modifiedPart] as StylesObjectType;
    }
  });
};
