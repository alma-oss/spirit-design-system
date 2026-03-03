import { NamingHelper, StringCase } from '@supernovaio/export-helpers';
import {
  ColorToken,
  DimensionToken,
  GradientToken,
  ShadowToken,
  SizeToken,
  StringToken,
  Token,
  TokenGroup,
  TokenType,
  TypographyTokenValue,
} from '@supernovaio/sdk-exporters';
import { exportConfiguration } from '../../config';
import { FONT_SIZE_BASE_DEFAULT, PIXEL_UNIT, PX_UNIT, TYPOGRAPHY_SUBSTITUTE_FONT } from '../constants';
import { getDeviceAlias, getDeviceTokenValue } from './deviceHelpers';
import { toCamelCase } from './stringHelper';
import { makeRelativeUnit } from './unitHelper';

/**
 * Extracts the group name from a token's origin path (the first part before '/')
 * Returns the lowercase group name, or undefined if not available
 *
 * @param token
 */
export const getTokenGroup = (token: Token): string | undefined => {
  return token.origin?.name?.split('/')[0].toLowerCase();
};

export const tokenVariableName = (token: Token, tokenGroups: Array<TokenGroup>, hasParentPrefix: boolean): string => {
  let parent;
  if (hasParentPrefix) {
    parent = tokenGroups.find((group) => group.id === token.parentGroupId)!;
  } else {
    parent = null;
  }

  const devicePart = getDeviceAlias(token);
  const variableName = NamingHelper.codeSafeVariableNameForToken(token, StringCase.paramCase, parent, '');

  return devicePart !== '' ? getDeviceTokenValue(variableName, devicePart) : variableName;
};

export const normalizeZeroValueWithUnit = (
  value: string | number,
  unit: string,
  isRelative: boolean,
  baseFontSize: number = FONT_SIZE_BASE_DEFAULT,
): string | number => {
  if (value === 0) {
    return 0;
  }

  if (isRelative) {
    return makeRelativeUnit(value, baseFontSize);
  }

  return `${value}${unit}`;
};

export const formatTokenStyleByOutput = (
  name: string,
  value: string | number,
  hasJsOutput: boolean,
  unit?: string,
  isRelative?: boolean,
  baseFontSize: number = FONT_SIZE_BASE_DEFAULT,
) => {
  const normalizedValue = unit ? normalizeZeroValueWithUnit(value, unit, isRelative ?? false, baseFontSize) : value;

  if (hasJsOutput) {
    return `export const ${toCamelCase(name)} = ${typeof normalizedValue === 'number' ? normalizedValue : `'${normalizedValue}'`};`;
  }

  return `$${name}: ${normalizedValue} !default;`;
};

export const sortTokens = (
  tokens: Token[],
  tokenGroups: Array<TokenGroup>,
  hasParentPrefix: boolean,
  sortByNumValue: boolean,
) => {
  const sortedTokens = tokens.sort((a, b) => {
    if (sortByNumValue) {
      const value = (token: Token) => {
        const numericTokenTypes = [
          TokenType.dimension,
          TokenType.size,
          TokenType.fontSize,
          TokenType.lineHeight,
          TokenType.letterSpacing,
        ];

        if (numericTokenTypes.includes(token.tokenType)) {
          return (token as DimensionToken | SizeToken).value.measure;
        }

        if (token.tokenType === TokenType.string) {
          return (token as StringToken).value.text;
        }

        return (token as ColorToken | ShadowToken | GradientToken).value;
      };

      const aNumMatch = value(a);
      const bNumMatch = value(b);

      // Convert values to numbers for comparison
      const aNumeric = Number(aNumMatch);
      const bNumeric = Number(bNumMatch);

      // Only perform numeric comparison when both values are valid finite numbers.
      if (Number.isFinite(aNumeric) && Number.isFinite(bNumeric)) {
        const numericComparison = aNumeric - bNumeric;
        if (numericComparison !== 0) {
          return numericComparison;
        }
      }
    }

    // Fall back to alphabetical sorting when numeric comparison didn't determine order (equal or non-numeric values)
    const aCompare = tokenVariableName(a, tokenGroups, hasParentPrefix);
    const bCompare = tokenVariableName(b, tokenGroups, hasParentPrefix);

    return aCompare.localeCompare(bCompare);
  });

  return sortedTokens;
};

export const addEmptyLineBetweenTokenGroups = (cssTokens: { css: string | null; parentGroupId: string }[]): string => {
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

export const addAngleVarToGradient = (inputString: string): string => {
  // Regex to capture the angle and all color stops (with percentages if any)
  const regex = /linear-gradient\(([^,]+),\s*(.+)\)/;
  const match = inputString.match(regex);

  if (match) {
    const angle = match[1].trim(); // Extract the angle
    const angleValue = Number(angle.match(/\d+/));
    const angleUnit = angle.match(/deg/);
    const colorStops = match[2].trim(); // Extract the rest (color stops)
    const cssAngleVar = '--gradient-angle';

    return `linear-gradient(var(${cssAngleVar}, ${angleValue}${angleUnit}), ${colorStops})`;
  }

  return inputString;
};

const toKebabCase = (value: string) => value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const removePairQuotes = (input: string): string => {
  const regex = /^'([^']*)'$/;

  return input.replace(regex, '$1');
};

const isNumber = (value: unknown): boolean => typeof value === 'number';

const jsObjectTemplate = (strings: string[]) => `{
${strings.join(',\n')},
}`;

const scssObjectTemplate = (strings: string[]) => `(
${strings.join(',\n')},
)`;

type KeyValueTemplateCallback = (key: string, value: string | number) => string;

type TypographyShape = {
  fontFamily: string;
  fontSize: string;
  fontStyle: string;
  fontWeight: string | number;
  lineHeight?: string | number;
};

const jsKeyValueTemplate: KeyValueTemplateCallback = (key, value) => {
  return `${key}: ${/\s/.test(value as string) ? `"${value}"` : value}`;
};

const scssKeyValueTemplate: KeyValueTemplateCallback = (key, value) => {
  const formattedKey = toKebabCase(key);
  let formattedValue;

  if (typeof value === 'string' && value.includes(', ')) {
    formattedValue = `"${value}"`;
  } else if (isNumber(value)) {
    formattedValue = value;
  } else {
    formattedValue = removePairQuotes(value as string);
  }

  return `${formattedKey}: ${formattedValue}`;
};

const passObjectKeyValueToCallback = <Shape extends Record<string, string | number | undefined>>(
  object: Shape,
  callback: KeyValueTemplateCallback,
) => {
  return Object.entries(object).reduce<string[]>((accumulator, [key, value]) => {
    if (value === undefined) {
      return accumulator;
    }

    accumulator.push(callback(key, value));

    return accumulator;
  }, []);
};

/**
 * Prepares a set of search-and-replace key-value pairs based on a configuration object.
 *
 * This function generates an object containing `search` and `replace` keys with their
 * corresponding values derived from the configuration object. The keys are dynamically
 * constructed using the provided `name` and `index` parameters.
 *
 * @param {Record<string, unknown>} configuration - The configuration object containing the key-value pairs.
 * @param {string} name - The base name used to construct the dynamic keys.
 * @param {number} index - The index used to construct the dynamic keys.
 * @returns {Record<string, string>} - An object with `search` and `replace` keys and their corresponding values.
 */
const prepareReplacements = (configuration: Record<string, unknown>, name: string, index: number) => {
  return ['search', 'replace'].reduce(
    (acc, key) => ({
      [key]: (configuration?.[`${key}${name}${index}`] as string) || '',
      ...acc,
    }),
    {},
  );
};

/**
 * Generates an array of search-and-replace objects based on a configuration object and a name.
 *
 * This function creates an array of objects, each containing `search` and `replace` keys,
 * by calling the `prepareReplacements` function for a fixed number of iterations (5).
 * The `prepareReplacements` function dynamically constructs the `search` and `replace` values
 * based on the provided configuration and name.
 *
 * @param {Record<string, unknown>} configuration - The configuration object containing key-value pairs.
 * @param {string} name - The base name used to construct dynamic keys for replacements.
 * @returns {Array<{ search: string; replace: string }>} - An array of objects with `search` and `replace` keys.
 */
const getReplacements = (configuration: Record<string, unknown>, name: string) => {
  const replacements: Array<{ search: string; replace: string }> = [...Array(5)].map(
    (_, i) => prepareReplacements(configuration, name, i) as { search: string; replace: string },
  );

  return replacements;
};

/**
 * Replaces occurrences of specific patterns in a string with their corresponding replacements.
 *
 * This function takes a configuration object, a string value, and a name. It retrieves
 * an array of search-and-replace pairs using the `getReplacements` function. Then, it iterates
 * through the replacements and applies them to the input string using regular expressions.
 *
 * @param {Record<string, unknown>} configuration - The configuration object containing replacement rules.
 * @param {string} value - The input string to be processed.
 * @param {string} name - The base name used to retrieve replacement rules.
 * @returns {string} - The processed string with replacements applied.
 */
const override = (configuration: Record<string, unknown>, value: string, name: string): string => {
  // Data defined in exporter pipeline
  const replacements: Array<{ search: string; replace: string }> = getReplacements(configuration, name);

  let replaceable = value;

  for (const { search, replace } of replacements) {
    if (search && replace) {
      replaceable = replaceable.replace(new RegExp(search.trim(), 'g'), replace.trim().replace(/"/g, ''));
    }
  }

  return replaceable;
};

const getExportConfiguration = () => exportConfiguration;

/**
 * Replaces the font family name with a modified version including a substitute font.
 *
 * This function takes a font family name as input and uses the `override` function
 * to replace it with a string that includes the original font family and a substitute font.
 * The replacement rules are defined in the `exportConfiguration` object.
 *
 * @param {string} fontFamily - The name of the font family to be replaced.
 * @returns {string} - The modified font family string with the substitute font included.
 */
const replaceFontName = (fontFamily: string): string => {
  return override(getExportConfiguration(), `'${fontFamily}', ${TYPOGRAPHY_SUBSTITUTE_FONT}`, 'Font');
};

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

const normalizeFontWeight = (fontWeightText: string): number | string => {
  const normalizedText = fontWeightText.toLowerCase();
  const normalizedWithoutItalic = normalizedText.replace(/\s*italic$/i, '');
  const mappedValue = FONT_WEIGHT_MAP[normalizedWithoutItalic];

  if (mappedValue) {
    return mappedValue;
  }

  const parsedValue = parseInt(normalizedWithoutItalic, 10);

  return Number.isNaN(parsedValue) ? fontWeightText : parsedValue;
};

const calculateLineHeightRatio = (lineHeight: TypographyTokenValue['lineHeight'], baseFontSize: number) => {
  if (!lineHeight?.measure || baseFontSize <= 0) {
    return undefined;
  }

  if (lineHeight.unit !== PIXEL_UNIT) {
    return undefined;
  }

  const ratio = lineHeight.measure / baseFontSize;

  return ratio;
};

export const typographyValue = (
  { fontFamily, fontSize, fontWeight, lineHeight }: TypographyTokenValue,
  isItalic: boolean,
  hasJsOutput: boolean,
  baseFontSize: number = FONT_SIZE_BASE_DEFAULT,
): string => {
  const fontName = replaceFontName(fontFamily.text);
  const fontSizeUnit = fontSize?.unit === PIXEL_UNIT ? PX_UNIT : fontSize?.unit || '';
  const fontSizeMeasure = fontSize?.measure ?? 0;
  const italicFromWeight = fontWeight?.text?.toLowerCase().includes('italic');
  const fontWeightValue = normalizeFontWeight(fontWeight.text);

  let fontSizeValue: string;
  if (fontSizeUnit === PX_UNIT && fontSizeMeasure > 0 && baseFontSize > 0) {
    const fontSizeInRem = makeRelativeUnit(fontSizeMeasure, baseFontSize);
    fontSizeValue = `'${fontSizeInRem}'`;
  } else {
    fontSizeValue = `'${fontSizeMeasure}${fontSizeUnit}'`;
  }

  let lineHeightRatio: number | undefined;
  if (baseFontSize > 0) {
    lineHeightRatio = calculateLineHeightRatio(lineHeight, baseFontSize);
  } else if (fontSize?.measure && lineHeight?.measure && fontSize.measure > 0) {
    if (fontSize.unit === PIXEL_UNIT && lineHeight.unit === PIXEL_UNIT) {
      lineHeightRatio = lineHeight.measure / fontSize.measure;
    }
  }
  const lineHeightValue = lineHeightRatio !== undefined ? lineHeightRatio.toFixed(2) : undefined;

  const typographyObject: TypographyShape = {
    fontFamily: `${fontName}`,
    fontSize: fontSizeValue,
    fontStyle: `'${isItalic || italicFromWeight ? 'italic' : 'normal'}'`,
    fontWeight: fontWeightValue,
  };

  if (lineHeightValue !== undefined) {
    typographyObject.lineHeight = lineHeightValue;
  }

  const baseStyles = passObjectKeyValueToCallback<TypographyShape>(typographyObject, scssKeyValueTemplate);
  const baseJsStyles = passObjectKeyValueToCallback<TypographyShape>(typographyObject, jsKeyValueTemplate);

  return hasJsOutput ? jsObjectTemplate(baseJsStyles) : scssObjectTemplate(baseStyles);
};
