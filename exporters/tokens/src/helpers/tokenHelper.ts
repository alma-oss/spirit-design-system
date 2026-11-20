import { FONT_SIZE_BASE_DEFAULT } from '../constants';
import { type DesignToken, TokenTypeEnum } from '../core/types';
import { getDesignTokenVariableName } from './namingHelper';
import { toCamelCase } from './stringHelper';
import { makeRelativeUnit } from './unitHelper';

/**
 * Path parts of a token's origin (`originName` split by '/'), or its group path when the source has no origin name.
 *
 * @param token
 */
export const getOriginPathParts = (token: DesignToken): string[] =>
  token.metadata.originName?.split('/') ?? token.metadata.groupPath;

/**
 * Extracts the group name from the first part of a token's origin path, or of its group path when the source has no
 * origin name. Returns the lowercase group name, or undefined if not available
 *
 * @param token
 */
export const getTokenGroup = (token: DesignToken): string | undefined => getOriginPathParts(token)[0]?.toLowerCase();

export const getOriginName = (token: DesignToken): string | undefined => token.metadata.originName?.toLowerCase();

export const getParentOriginName = (token: DesignToken): string | undefined =>
  getOriginName(token)?.split('/').slice(0, -1).join('/');

export const tokenVariableName = (token: DesignToken, hasParentPrefix: boolean): string =>
  getDesignTokenVariableName(token, hasParentPrefix);

/**
 * Key of the group a token lives in, to tell the groups of neighbouring tokens apart.
 *
 * @param token
 */
export const getGroupKey = (token: DesignToken): string => token.metadata.groupId ?? token.metadata.groupPath.join('/');

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

export const cssVariableReference = (tokenPrefix: string, cssVariablePrefix: string, name: string): string =>
  `var(--${tokenPrefix}${cssVariablePrefix}${name})`;

export const formatCssVariableReference = (name: string, reference: string, hasJsOutput: boolean): string =>
  hasJsOutput ? formatTokenStyleByOutput(name, reference, true) : `$${name}: ${reference};`;

const NUMERIC_SORT_TOKEN_TYPES = [
  TokenTypeEnum.Dimension,
  TokenTypeEnum.Size,
  TokenTypeEnum.FontSize,
  TokenTypeEnum.LineHeight,
  TokenTypeEnum.LetterSpacing,
];

/**
 * The value a token is sorted by: the measure of a numeric token and the text of a string token. Any other token has
 * no number to sort by.
 *
 * @param token
 * @param token.type
 * @param token.value
 */
const getSortValue = ({ type, value }: DesignToken): number | string => {
  if (NUMERIC_SORT_TOKEN_TYPES.includes(type) && value.type === 'number') {
    return value.value;
  }

  if (type === TokenTypeEnum.String && value.type === 'string') {
    return value.value;
  }

  return Number.NaN;
};

export const sortTokens = (tokens: DesignToken[], hasParentPrefix: boolean, sortByNumValue: boolean) => {
  const sortedTokens = tokens.sort((a, b) => {
    if (sortByNumValue) {
      const aNumMatch = getSortValue(a);
      const bNumMatch = getSortValue(b);

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
    const aCompare = tokenVariableName(a, hasParentPrefix);
    const bCompare = tokenVariableName(b, hasParentPrefix);

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
