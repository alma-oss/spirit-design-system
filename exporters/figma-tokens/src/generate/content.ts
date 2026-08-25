import { findAllHexColorsInStringAndNormalize, transformColorsToVariables } from '../domain/color';
import { DEVICE_MODE_ORDER, tokenGroup } from '../domain/conventions';
import { getTokenAlias, toCamelCase, toParamCase, toPlural, tokenVariableName } from '../domain/naming';
import type { DomainToken, TokenKind, TypographyValue } from '../domain/types';
import {
  COLOR_JS_SUFFIX,
  COLOR_KEY,
  COLOR_SCSS_SUFFIX,
  DEFAULT_DECIMALS,
  DISCLAIMER,
  FONT_SIZE_BASE,
  FONT_SIZE_BASE_DEFAULT,
  SCSS_INDENTATION,
  TYPOGRAPHY_KEY,
} from './constants';
import type { FileSpec } from './fileConfig';
import { indentAndFormat, normalizeZeroValueWithUnit, pxToRem, replacePxWithRem } from './units';

export type FontSizeBaseMap = Map<string, number>;
export type StylesObject = { [key: string]: (string | object) & { moveToTheEnd?: string } };

const FONT_WEIGHT_MAP: Record<string, number> = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

const SPECIAL_CASES = new Map<string, string | number>([['breakpoint-mobile', 0]]);

export const handleSpecialCase = <T extends string | number>(name: string, value: T): T => {
  const specialCaseValue = SPECIAL_CASES.get(name);

  if (typeof specialCaseValue === typeof value) {
    return specialCaseValue as T;
  }

  return value;
};

export const addDisclaimer = (content: string): string => `${DISCLAIMER}\n${content}`;

export const formatTokenStyleByOutput = (
  name: string,
  value: string | number,
  hasJsOutput: boolean,
  unit?: string,
  isRelative?: boolean,
  baseFontSize: number = FONT_SIZE_BASE_DEFAULT,
): string => {
  const normalizedValue = unit ? normalizeZeroValueWithUnit(value, unit, isRelative ?? false, baseFontSize) : value;

  if (hasJsOutput) {
    return `export const ${toCamelCase(name)} = ${typeof normalizedValue === 'number' ? normalizedValue : `'${normalizedValue}'`};`;
  }

  return `$${name}: ${normalizedValue} !default;`;
};

const numericValue = (token: DomainToken): number | string => {
  if (token.value.type === 'number') {
    return token.value.measure;
  }

  if (token.value.type === 'string') {
    return token.value.text;
  }

  return 0;
};

const NUMERIC_SORT_KINDS: TokenKind[] = ['dimension', 'size', 'fontSize', 'lineHeight', 'letterSpacing', 'radius'];

export const sortTokens = (tokens: DomainToken[], hasParentPrefix: boolean, sortByNumValue: boolean): DomainToken[] =>
  [...tokens].sort((first, second) => {
    if (sortByNumValue && NUMERIC_SORT_KINDS.includes(first.kind) && NUMERIC_SORT_KINDS.includes(second.kind)) {
      const firstNumeric = Number(numericValue(first));
      const secondNumeric = Number(numericValue(second));

      if (Number.isFinite(firstNumeric) && Number.isFinite(secondNumeric)) {
        const comparison = firstNumeric - secondNumeric;

        if (comparison !== 0) {
          return comparison;
        }
      }
    }

    return tokenVariableName(first.path, hasParentPrefix, first.device).localeCompare(
      tokenVariableName(second.path, hasParentPrefix, second.device),
    );
  });

const addEmptyLineBetweenTokenGroups = (cssTokens: { css: string | null; parentGroupId: string }[]): string => {
  let lastGroupId: string | null = null;
  const cssWithGroupSpacing: string[] = [];

  cssTokens.forEach(({ css, parentGroupId }) => {
    if (lastGroupId && parentGroupId !== lastGroupId && css) {
      cssWithGroupSpacing.push('');
    }

    if (css) {
      cssWithGroupSpacing.push(css);
    }

    lastGroupId = parentGroupId;
  });

  return cssWithGroupSpacing.join('\n');
};

export const getFontSizeBaseMap = (tokens: DomainToken[]): FontSizeBaseMap => {
  const fontSizeBaseMap = new Map<string, number>();
  const matching = tokens.filter(
    (token) =>
      (token.kind === 'fontSize' || token.kind === 'dimension') &&
      (tokenVariableName(token.path, true, token.device).includes(FONT_SIZE_BASE) ||
        token.path.join('/').toLowerCase().includes(FONT_SIZE_BASE)),
  );

  matching.forEach((token) => {
    if (token.value.type !== 'number' || token.value.measure <= 0) {
      return;
    }

    fontSizeBaseMap.set(token.device ?? 'mobile', token.value.measure);
  });

  if (fontSizeBaseMap.size === 1 && !matching.some((token) => token.device)) {
    const value = [...fontSizeBaseMap.values()][0];
    fontSizeBaseMap.set('mobile', value);
    fontSizeBaseMap.set('tablet', value);
    fontSizeBaseMap.set('desktop', value);
  }

  return fontSizeBaseMap;
};

export const getFontSizeBaseForBreakpoint = (fontSizeBaseMap: FontSizeBaseMap, breakpoint: string): number => {
  if (fontSizeBaseMap.size === 0) {
    return 0;
  }

  return fontSizeBaseMap.get(breakpoint.toLowerCase()) || fontSizeBaseMap.get('mobile') || 0;
};

const isFontSizeBaseToken = (token: DomainToken, name: string): boolean =>
  name.includes(FONT_SIZE_BASE) || token.path.join('/').toLowerCase().includes(FONT_SIZE_BASE);

const shouldConvertToRem = (kind: TokenKind): boolean =>
  ['dimension', 'radius', 'space', 'size', 'fontSize', 'lineHeight', 'letterSpacing'].includes(kind);

const formatNumeric = (token: DomainToken, name: string, fontSizeBaseMap: FontSizeBaseMap): string | number | undefined => {
  if (token.value.type !== 'number') {
    return undefined;
  }

  const measure = handleSpecialCase(name, token.value.measure);

  if (measure === 0) {
    return 0;
  }

  const unit = token.value.unit === 'px' ? 'px' : token.value.unit === 'percent' ? '%' : undefined;
  const baseFontSize = getFontSizeBaseForBreakpoint(fontSizeBaseMap, token.device ?? 'mobile');

  if (!unit) {
    return measure;
  }

  if (
    unit === 'px' &&
    shouldConvertToRem(token.kind) &&
    token.kind !== 'borderWidth' &&
    !isFontSizeBaseToken(token, name) &&
    baseFontSize > 0
  ) {
    return pxToRem(measure, { baseFontSize });
  }

  return `${measure}${unit}`;
};

const shadowCss = (token: DomainToken): string => {
  if (token.value.type !== 'shadow') {
    return '';
  }

  return token.value.layers
    .map((layer) => {
      const inset = layer.inset ? 'inset ' : '';

      return `${inset}${layer.x}px ${layer.y}px ${layer.radius}px ${layer.spread}px ${layer.color}`.replace(/^inset /, 'inset ');
    })
    .join(', ');
};

const gradientCss = (token: DomainToken): string => {
  if (token.value.type !== 'gradient') {
    return '';
  }

  const stops = token.value.stops
    .map((stop) => `${stop.color} ${Math.round(stop.position * 1000) / 10}%`.replace(/\.0%$/, '%'))
    .join(', ');

  return `linear-gradient(${token.value.angle}deg, ${stops})`;
};

export const addAngleVarToGradient = (inputString: string): string => {
  const match = inputString.match(/linear-gradient\(([^,]+),\s*(.+)\)/);

  if (!match) {
    return inputString;
  }

  const angle = match[1].trim();
  const angleValue = Number(angle.match(/\d+/));
  const angleUnit = angle.match(/deg/);
  const colorStops = match[2].trim();

  return `linear-gradient(var(--gradient-angle, ${angleValue}${angleUnit}), ${colorStops})`;
};

const normalizeFontWeight = (fontWeightText: string | number): number | string => {
  if (typeof fontWeightText === 'number') {
    return fontWeightText;
  }

  const normalizedWithoutItalic = fontWeightText.toLowerCase().replace(/\s*italic$/i, '').replace(/\s+/g, '');
  const mappedValue = FONT_WEIGHT_MAP[normalizedWithoutItalic];

  if (mappedValue) {
    return mappedValue;
  }

  if (!normalizedWithoutItalic) {
    return 400;
  }

  const parsedValue = parseInt(normalizedWithoutItalic, 10);

  return Number.isNaN(parsedValue) ? fontWeightText : parsedValue;
};

const typographyValue = (value: TypographyValue, hasJsOutput: boolean, baseFontSize: number): string => {
  const fontSizeValue =
    value.fontSizeUnit === 'px' && value.fontSize > 0 && baseFontSize > 0
      ? `'${pxToRem(value.fontSize, { baseFontSize })}'`
      : `'${value.fontSize}${value.fontSizeUnit === 'px' ? 'px' : ''}'`;
  let lineHeightValue: string | undefined;

  if (value.fontSize > 0 && value.lineHeight !== undefined && value.fontSizeUnit === 'px' && value.lineHeightUnit === 'px') {
    lineHeightValue = parseFloat((value.lineHeight / value.fontSize).toFixed(DEFAULT_DECIMALS)).toString();
  }

  const fontFamily = value.fontFamily.includes("'") ? value.fontFamily : `'${value.fontFamily}'`;

  if (hasJsOutput) {
    const lines = [
      `fontFamily: "${fontFamily}"`,
      `fontSize: ${fontSizeValue}`,
      `fontStyle: '${value.fontStyle}'`,
      `fontWeight: ${normalizeFontWeight(value.fontWeight)}`,
    ];

    if (lineHeightValue) {
      lines.push(`lineHeight: ${lineHeightValue}`);
    }

    return `{\n${lines.join(',\n')},\n}`;
  }

  const lines = [
    `font-family: "${fontFamily}"`,
    `font-size: ${fontSizeValue.replace(/^'|'$/g, '')}`,
    `font-style: ${value.fontStyle}`,
    `font-weight: ${normalizeFontWeight(value.fontWeight)}`,
  ];

  if (lineHeightValue) {
    lines.push(`line-height: ${lineHeightValue}`);
  }

  return `(\n${lines.join(',\n')},\n)`;
};

const tokenToStyle = (
  token: DomainToken,
  prefix: string,
  hasMixin: boolean,
  hasParentPrefix: boolean,
  hasJsOutput: boolean,
  fontSizeBaseMap: FontSizeBaseMap,
): string | null => {
  const name = tokenVariableName(token.path, hasParentPrefix, token.device);

  if (token.kind === 'color' && token.value.type === 'color') {
    if (hasMixin) {
      return formatTokenStyleByOutput(name, handleSpecialCase(name, token.value.hex), hasJsOutput);
    }

    const cssVariableName = `var(--${prefix}color-${name})`;

    return hasJsOutput ? formatTokenStyleByOutput(name, cssVariableName, true) : `$${name}: ${cssVariableName};`;
  }

  if (token.kind === 'string' && token.value.type === 'string') {
    return formatTokenStyleByOutput(name, handleSpecialCase(name, token.value.text), hasJsOutput);
  }

  if (token.kind === 'borderWidth') {
    const formatted = formatNumeric(token, name, fontSizeBaseMap);

    return formatted === undefined ? null : formatTokenStyleByOutput(name, formatted, hasJsOutput);
  }

  if (token.value.type === 'number') {
    const formatted = formatNumeric(token, name, fontSizeBaseMap);

    return formatted === undefined ? null : formatTokenStyleByOutput(name, formatted, hasJsOutput);
  }

  if (token.kind === 'shadow') {
    const groupName = hasParentPrefix ? undefined : token.path[0]?.toLowerCase();
    let shadow = shadowCss(token);
    shadow = transformColorsToVariables(name, shadow, prefix, groupName);
    shadow = findAllHexColorsInStringAndNormalize(shadow);
    shadow = replacePxWithRem(shadow, getFontSizeBaseForBreakpoint(fontSizeBaseMap, token.device ?? 'mobile'));

    return formatTokenStyleByOutput(name, shadow, hasJsOutput);
  }

  if (token.kind === 'gradient') {
    const groupName = hasParentPrefix ? undefined : token.path[0]?.toLowerCase();
    let gradient = addAngleVarToGradient(gradientCss(token));
    gradient = transformColorsToVariables(name, gradient, prefix, groupName);
    gradient = findAllHexColorsInStringAndNormalize(gradient);

    return formatTokenStyleByOutput(name, gradient, hasJsOutput);
  }

  return null;
};

export const deepMergeObjects = (obj1: StylesObject, obj2: StylesObject): StylesObject => {
  const mergedObject = Object.entries(obj2).reduce(
    (result, [key, value]) => {
      const mergedValue =
        typeof value === 'object' && value !== null && typeof result[key] === 'object'
          ? deepMergeObjects(result[key] as StylesObject, value as StylesObject)
          : value;

      return { ...result, [key]: mergedValue };
    },
    { ...obj1 },
  );
  const finalObject: StylesObject = {};
  const endObject: StylesObject = {};

  Object.entries(mergedObject).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null && value.moveToTheEnd === 'true') {
      delete value.moveToTheEnd;
      endObject[key] = value;
    } else {
      finalObject[key] = value;
    }
  });

  return { ...finalObject, ...endObject };
};

export const convertToScss = (obj: StylesObject): string =>
  Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        return `${key}: (\n${convertToScss(value as StylesObject)}\n),\n`;
      }

      return `${key}: ${value},\n`;
    })
    .join('')
    .slice(0, -1);

export const convertToJs = (obj: StylesObject): string =>
  Object.entries(obj)
    .map(([key, value]) => {
      const match = key.match(/^_(\d+)/);
      const newKey = match ? `'${match[1]}'` : key;
      let resultEntry = `${newKey}: ${value},\n`;

      if (typeof value === 'object' && value !== null) {
        resultEntry = `${newKey}: {\n${convertToJs(value as StylesObject)}\n},\n`;
      }

      if (newKey === value) {
        resultEntry = `${newKey},\n`;
      }

      return resultEntry;
    })
    .join('')
    .slice(0, -1);

const normalizeFirstNamePart = (part: string, kind: TokenKind, hasJsOutput: boolean): string => {
  if (kind === 'color') {
    const partNameWithColorSuffix = `${part.toLowerCase()}${COLOR_SCSS_SUFFIX}`;

    return hasJsOutput ? toCamelCase(partNameWithColorSuffix) : `$${partNameWithColorSuffix}`;
  }

  return hasJsOutput ? toPlural(part.toLowerCase()) : `$${toPlural(part.toLowerCase())}`;
};

const formatTypographyName = (tokenNameParts: string[]): string =>
  tokenNameParts.length === 4 ? tokenNameParts.filter((_, index) => index !== 1).join('-') : tokenNameParts.join('-');

const getBreakpoint = (tokenNameParts: string[]): string => (tokenNameParts.length === 4 ? tokenNameParts[1] : 'mobile');

const handleNonTypographyTokens = (
  token: DomainToken,
  hasParentPrefix: boolean,
  stylesObjectRef: StylesObject,
  hasJsOutput: boolean,
): void => {
  let currentObject = stylesObjectRef;
  const tokenNameParts = token.path;

  tokenNameParts.forEach((part, index) => {
    const modifiedPart = index === 0 ? normalizeFirstNamePart(part, token.kind, hasJsOutput) : part;

    if (index === tokenNameParts.length - 1) {
      const variableName = tokenVariableName(token.path, hasParentPrefix, token.device);
      const tokenValue = hasJsOutput ? `${toCamelCase(variableName)}` : `$${variableName}`;
      const tokenAlias = getTokenAlias(token.path, token.kind, hasJsOutput, variableName);
      const rootTokenAlias = hasJsOutput ? toPlural(tokenAlias) : `$${toPlural(tokenAlias)}`;
      const devicePart = hasJsOutput ? toCamelCase(token.device ?? '') : (token.device ?? '').toLowerCase();

      if (devicePart) {
        currentObject[index === 0 ? rootTokenAlias : tokenAlias] = { [devicePart]: tokenValue };
      } else {
        currentObject[tokenAlias] = tokenValue;
      }
    } else {
      const key = hasJsOutput ? toCamelCase(modifiedPart) : modifiedPart;
      currentObject[key] = currentObject[modifiedPart] || currentObject[key] || {};
      currentObject = currentObject[key] as StylesObject;
    }
  });
};

const handleTypographyTokens = (
  token: DomainToken,
  stylesObjectRef: StylesObject,
  hasJsOutput: boolean,
  fontSizeBaseMap: FontSizeBaseMap,
): void => {
  if (token.value.type !== 'typography') {
    return;
  }

  const tokenNameParts = token.path.map((part) => toParamCase(part));
  const name = formatTypographyName(tokenNameParts).toLowerCase();
  const breakpoint = getBreakpoint(tokenNameParts).toLowerCase();
  const baseFontSize = fontSizeBaseMap.size > 0 ? getFontSizeBaseForBreakpoint(fontSizeBaseMap, breakpoint) : 0;
  let currentObject = stylesObjectRef;
  const reducedNameParts = tokenNameParts.slice(0, 2);

  reducedNameParts.forEach((part, index) => {
    const tokenName = hasJsOutput ? toCamelCase(name) : `$${name}`;
    const modifiedPart = index === 0 ? tokenName : part;

    if (index === reducedNameParts.length - 1) {
      const targetObject =
        index === 0
          ? ((currentObject[modifiedPart] = currentObject[modifiedPart] || {}) as StylesObject)
          : currentObject;
      const typography = token.value as TypographyValue;

      if (typography.byDevice) {
        const devices = [
          ...DEVICE_MODE_ORDER.filter((device) => typography.byDevice?.[device]),
          ...Object.keys(typography.byDevice).filter((device) => !DEVICE_MODE_ORDER.includes(device)),
        ];

        devices.forEach((device) => {
          const deviceMeasures = typography.byDevice?.[device];

          if (!deviceMeasures) {
            return;
          }

          targetObject[device] = typographyValue(
            {
              ...typography,
              fontSize: deviceMeasures.fontSize,
              lineHeight: deviceMeasures.lineHeight,
            },
            hasJsOutput,
            getFontSizeBaseForBreakpoint(fontSizeBaseMap, device),
          );
        });
      } else {
        targetObject[breakpoint] = typographyValue(typography, hasJsOutput, baseFontSize);
      }
    } else {
      currentObject[modifiedPart] = currentObject[modifiedPart] || {};
      currentObject = currentObject[modifiedPart] as StylesObject;
    }
  });
};

const createStylesObjectStructure = (
  token: DomainToken,
  hasParentPrefix: boolean,
  hasJsOutput: boolean,
  fontSizeBaseMap: FontSizeBaseMap,
): StylesObject => {
  const stylesObject: StylesObject = {};

  if (token.path.length <= 1 && !token.device && token.kind !== 'typography') {
    return stylesObject;
  }

  if (token.kind === 'typography') {
    handleTypographyTokens(token, stylesObject, hasJsOutput, fontSizeBaseMap);
  } else {
    handleNonTypographyTokens(token, hasParentPrefix, stylesObject, hasJsOutput);
  }

  return stylesObject;
};

const parseGroupName = (colorVariable: string, hasJsOutput: boolean): string => {
  const suffix = hasJsOutput ? COLOR_JS_SUFFIX : COLOR_SCSS_SUFFIX;

  return colorVariable.replace(suffix, '').replace('$', '');
};

const addGlobalColorsToStylesObject = (stylesObject: StylesObject, hasJsOutput: boolean): StylesObject => {
  const colorKeys = Object.keys(stylesObject).filter((key) =>
    key.endsWith(hasJsOutput ? COLOR_JS_SUFFIX : COLOR_SCSS_SUFFIX),
  );

  if (colorKeys.length === 0) {
    return stylesObject;
  }

  const colorsObject = Object.fromEntries(colorKeys.map((key) => [parseGroupName(key, hasJsOutput), key]));
  const key = hasJsOutput ? COLOR_KEY : `$${COLOR_KEY}`;

  return { ...stylesObject, [key]: colorsObject };
};

const hasTypographyDeclaration = (value: unknown, hasJsOutput: boolean): boolean => {
  const typographyProperty = hasJsOutput ? 'fontFamily' : 'font-family';

  if (typeof value === 'string') {
    return value.includes(typographyProperty);
  }

  if (typeof value === 'object' && value !== null) {
    return Object.values(value).some((nestedValue) => hasTypographyDeclaration(nestedValue, hasJsOutput));
  }

  return false;
};

const addGlobalTypographyToStylesObject = (stylesObject: StylesObject, hasJsOutput: boolean): StylesObject => {
  const typographyKeys = Object.entries(stylesObject)
    .filter(([, value]) => hasTypographyDeclaration(value, hasJsOutput))
    .map(([key]) => key);

  if (typographyKeys.length === 0) {
    return stylesObject;
  }

  const typographyObject = Object.fromEntries(
    typographyKeys.map((key) => [parseGroupName(key, false), key]),
  ) as StylesObject;
  const key = hasJsOutput ? TYPOGRAPHY_KEY : `$${TYPOGRAPHY_KEY}`;

  return { ...stylesObject, [key]: { ...typographyObject, moveToTheEnd: 'true' } };
};

const generateStylesObjectFromTokens = (
  tokens: DomainToken[],
  hasParentPrefix: boolean,
  hasJsOutput: boolean,
  sortByNumValue: boolean,
  fontSizeBaseMap: FontSizeBaseMap,
): StylesObject => {
  const stylesObject = sortTokens(tokens, hasParentPrefix, sortByNumValue).reduce((accumulator, token) => {
    return deepMergeObjects(
      accumulator,
      createStylesObjectStructure(token, hasParentPrefix, hasJsOutput, fontSizeBaseMap),
    );
  }, {} as StylesObject);

  return addGlobalTypographyToStylesObject(addGlobalColorsToStylesObject(stylesObject, hasJsOutput), hasJsOutput);
};

const generateMixinFromTokens = (
  tokens: DomainToken[],
  prefix: string,
  hasParentPrefix: boolean,
  sortByNumValue: boolean,
): string => {
  const variables = sortTokens(tokens, hasParentPrefix, sortByNumValue)
    .map((token) => {
      const name = tokenVariableName(token.path, hasParentPrefix, token.device);

      return `${SCSS_INDENTATION}--${prefix}color-${name}: #{$${name}};`;
    })
    .join('\n');

  return `@mixin color-css-variables {\n${variables}\n}\n`;
};

const addEmptyLineBetweenTokenGroupsForIndex = (index: number, length: number): string =>
  index !== length - 1 ? '\n\n' : '\n';

const generateJsObjectOutput = (stylesObject: StylesObject): string => {
  const entries = Object.entries(stylesObject);

  return entries
    .map(
      ([key, obj], index) =>
        `export const ${key} = {\n${convertToJs(obj as StylesObject)}\n};${addEmptyLineBetweenTokenGroupsForIndex(index, entries.length)}`,
    )
    .join('');
};

const generateScssObjectOutput = (stylesObject: StylesObject): string => {
  const entries = Object.entries(stylesObject);

  return entries
    .map(
      ([key, obj], index) =>
        `${key}: (\n${convertToScss(obj as StylesObject)}\n) !default;${addEmptyLineBetweenTokenGroupsForIndex(index, entries.length)}`,
    )
    .join('');
};

const matchesGroup = (token: DomainToken, group: string): boolean => tokenGroup(token.path) === group.toLowerCase();

const filterTokens = (tokens: DomainToken[], kind: string, spec: FileSpec): DomainToken[] =>
  tokens.filter((token) => {
    if (token.kind !== kind) {
      return false;
    }

    const group = tokenGroup(token.path);
    const excluded = spec.excludeGroupNames?.some((name) => group === name.toLowerCase());

    if (excluded) {
      return false;
    }

    if (spec.groupNames && spec.groupNames.length > 0) {
      return spec.groupNames.some((name) => matchesGroup(token, name));
    }

    return true;
  });

const shouldFilterByGroup = (spec: FileSpec): boolean =>
  Boolean(spec.groupNames && spec.groupNames.length > 0) || Boolean(spec.excludeGroupNames && spec.excludeGroupNames.length > 0);

const groupsForTokens = (tokensForKind: DomainToken[], spec: FileSpec, kind: string): Array<string | null> => {
  if (!shouldFilterByGroup(spec)) {
    return [null];
  }

  if (spec.groupNames && spec.groupNames.length > 0) {
    return spec.groupNames.map((name) => name.toLowerCase());
  }

  const groups: string[] = [];

  tokensForKind.forEach((token) => {
    const group = tokenGroup(token.path);

    if (group && !groups.includes(group)) {
      groups.push(group);
    }
  });

  if (NUMERIC_SORT_KINDS.includes(kind as TokenKind)) {
    return [...groups].sort((first, second) => first.localeCompare(second));
  }

  return groups;
};

export const generateFileContent = (
  tokens: DomainToken[],
  spec: FileSpec,
  prefix: string,
  hasJsOutput: boolean,
  fontSizeBaseMap: FontSizeBaseMap,
): string => {
  const hasParentPrefix = spec.hasParentPrefix ?? true;
  const hasStylesObject = spec.hasStylesObject ?? true;
  const sortByNumValue = spec.sortByNumValue ?? false;
  const hasMixin = spec.hasMixin ?? false;
  let styledTokens = '';
  let styledMixin = '';
  let stylesObject: StylesObject = {};

  spec.kinds.forEach((kind) => {
    const tokensForKind = filterTokens(tokens, kind, spec);

    groupsForTokens(tokensForKind, spec, kind).forEach((group) => {
      const filteredTokens =
        group === null ? tokensForKind : tokensForKind.filter((token) => matchesGroup(token, group));
      const generatedStyles =
        kind === 'typography'
          ? ''
          : addEmptyLineBetweenTokenGroups(
              sortTokens(filteredTokens, hasParentPrefix, sortByNumValue).map((token) => ({
                css: tokenToStyle(token, prefix, hasMixin, hasParentPrefix, hasJsOutput, fontSizeBaseMap),
                parentGroupId: token.path.slice(0, -1).join('/') || token.path[0],
              })),
            );

      if (generatedStyles) {
        styledTokens += `${generatedStyles}\n\n`;
      }

      if (!hasJsOutput && hasMixin) {
        styledMixin += generateMixinFromTokens(filteredTokens, prefix, hasParentPrefix, sortByNumValue);
      }

      stylesObject = deepMergeObjects(
        stylesObject,
        generateStylesObjectFromTokens(filteredTokens, hasParentPrefix, hasJsOutput, sortByNumValue, fontSizeBaseMap),
      );
    });
  });

  let content = styledTokens.trimEnd();

  if (hasStylesObject) {
    const objectOutput = hasJsOutput ? generateJsObjectOutput(stylesObject) : generateScssObjectOutput(stylesObject);

    if (content) {
      content += '\n\n';
    }

    content += objectOutput;
  }

  if (!hasJsOutput && hasMixin) {
    if (content) {
      content += '\n\n';
    }

    content += styledMixin;
  }

  return addDisclaimer(indentAndFormat(content, hasJsOutput));
};

export type OutputFile = {
  path: string;
  fileName: string;
  content: string;
};

export const generateBarrelFile = (files: { fileName: string }[], hasJsOutput = false): string =>
  `${files
    .map((file) => {
      const fileExtension = hasJsOutput ? 'ts' : 'scss';
      const baseName = file.fileName.replace(/^_/, '').replace(new RegExp(`\\.${fileExtension}$`), '');

      return hasJsOutput ? `export * from './${baseName}';` : `@forward '${baseName}';`;
    })
    .sort()
    .join('\n')}\n`;
