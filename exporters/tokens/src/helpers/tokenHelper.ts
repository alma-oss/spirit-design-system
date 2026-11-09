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
} from '@supernovaio/sdk-exporters';
import { FONT_SIZE_BASE_DEFAULT } from '../constants';
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

export const getOriginName = (token: Token): string | undefined => token.origin?.name?.toLowerCase();

export const getParentOriginName = (token: Token): string | undefined =>
  getOriginName(token)?.split('/').slice(0, -1).join('/');

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

export const cssVariableReference = (tokenPrefix: string, cssVariablePrefix: string, name: string): string =>
  `var(--${tokenPrefix}${cssVariablePrefix}${name})`;

export const formatCssVariableReference = (name: string, reference: string, hasJsOutput: boolean): string =>
  hasJsOutput ? formatTokenStyleByOutput(name, reference, true) : `$${name}: ${reference};`;

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
