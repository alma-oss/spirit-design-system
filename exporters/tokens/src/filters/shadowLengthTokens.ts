import { type Token, TokenType } from '@supernovaio/sdk-exporters';
import { formatLayerSuffix } from '../helpers/stringHelper';
import { getOriginName, getParentOriginName } from '../helpers/tokenHelper';

const LAYER_SUFFIX_REGEX = /-\d+$/;

const withLayerSuffix = (token: Token): Token => {
  if (LAYER_SUFFIX_REGEX.test(token.name)) {
    return token;
  }

  return Object.assign(Object.create(Object.getPrototypeOf(token)), token, {
    name: `${token.name}${formatLayerSuffix(1)}`,
  });
};

/**
 * Selects dimension tokens holding shadow lengths, i.e. those nested under a shadow token path,
 * e.g. `Shadow/shadow-100/offset-x-01` for the `Shadow/shadow-100` shadow token.
 * Names without a layer number belong to the first layer and get the `-01` suffix,
 * so they match the shadow length CSS variables, e.g. `offset-x` -> `offset-x-01`.
 *
 * @param {Token[]} tokens - Array of tokens to select from, including the shadow tokens.
 * @returns {Token[]} - Array of shadow length dimension tokens.
 */
export const getShadowLengthTokens = (tokens: Token[]): Token[] => {
  const shadowOriginNames = new Set(tokens.filter((token) => token.tokenType === TokenType.shadow).map(getOriginName));

  return tokens
    .filter((token) => token.tokenType === TokenType.dimension && shadowOriginNames.has(getParentOriginName(token)))
    .map(withLayerSuffix);
};
