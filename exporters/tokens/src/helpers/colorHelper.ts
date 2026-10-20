import { Token, TokenType } from '@supernovaio/sdk-exporters';
import { COLOR_CSS_VARIABLE_PREFIX, TOKEN_COLLECTION_THEMES_NAME } from '../constants';
import { filterCollections } from './collectionsHelper';
import { formatLayerSuffix } from './stringHelper';

const HEX_COLOR_REGEX = /#([A-Fa-f0-9]{6,8})\b/g;
const LONG_HEX_WITH_ALPHA_LENGTH = 8;
const SHORT_HEX_WITH_ALPHA_LENGTH = 4;
const SHORT_HEX_WITHOUT_ALPHA_LENGTH = 3;

export const canHexBeShortened = (hex: string) => {
  return hex.length % 2 === 0 && [...Array(hex.length / 2)].every((_, index) => hex[2 * index] === hex[2 * index + 1]);
};

export const shortenHex = (hex: string): string => {
  return hex
    .split('')
    .map((char, index) => (index % 2 === 0 ? char : ''))
    .join('');
};

export const removeAlphaChannel = (hex: string): string => {
  if (hex.length === LONG_HEX_WITH_ALPHA_LENGTH && hex.endsWith('ff')) {
    return hex.slice(0, -2);
  }

  if (hex.length === SHORT_HEX_WITH_ALPHA_LENGTH && hex.endsWith('f')) {
    return hex.slice(0, -1);
  }

  return hex;
};

export const normalizeColor = (hexCode: string): string => {
  const isShortHex = [SHORT_HEX_WITHOUT_ALPHA_LENGTH, SHORT_HEX_WITH_ALPHA_LENGTH].includes(hexCode.length);

  let processedHex;

  if (isShortHex) {
    processedHex = hexCode;
  } else if (canHexBeShortened(hexCode)) {
    processedHex = shortenHex(hexCode);
  } else {
    processedHex = hexCode;
  }

  processedHex = removeAlphaChannel(processedHex);

  return `#${processedHex}`;
};

export const findAllHexColorsInStringAndNormalize = (input: string): string => {
  return input.replace(HEX_COLOR_REGEX, (match) => normalizeColor(match.slice(1)));
};

// @TODO: This is a temporary solution. This function can be removed when Supernova supports variables.
export const transformColorsToVariables = (
  name: string,
  value: string,
  tokenPrefix: string,
  groupName?: string,
): string => {
  let counter = 1;
  const renderGroupName = groupName ? `${groupName}-` : '';

  const transformedValue = value
    .split(',')
    .map((part) => {
      return part.replace(HEX_COLOR_REGEX, (match) => {
        const cssVar = `var(--${tokenPrefix}${COLOR_CSS_VARIABLE_PREFIX}${renderGroupName}${name}-color${formatLayerSuffix(counter)}, ${match})`;
        counter += 1;

        return cssVar;
      });
    })
    .join(',');

  return transformedValue;
};

/**
 * Keeps all non-color tokens and only those color tokens that belong to the themes collection.
 *
 * @param {Token[]} tokens - Array of tokens to filter.
 * @returns {Token[]} - Array of filtered tokens.
 */
export const filterColorCollections = (tokens: Token[]) => {
  const themeTokens = new Set(filterCollections(tokens, TOKEN_COLLECTION_THEMES_NAME));

  return tokens.filter((item) => item.tokenType !== TokenType.color || themeTokens.has(item));
};
