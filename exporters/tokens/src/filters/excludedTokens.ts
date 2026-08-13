import { type Token, TokenType } from '@supernovaio/sdk-exporters';

/* Filters */
const isFigmaToken = (token: Token) => token.name.includes('figma-');
const isTypographyLink = (token: Token) => token.tokenType === TokenType.typography && token.name.includes('Link');
const isTypographyItalic = (token: Token) => token.tokenType === TokenType.typography && token.name.includes('Italic');

/* Predicates */
const excludePredicates = [isFigmaToken, isTypographyLink, isTypographyItalic];

/**
 * Filters out tokens that should be excluded from processing:
 * - Tokens with "figma-" in their name
 * - Typography tokens with "Link" in their name
 * - Typography tokens with "Italic" in their name
 *
 * @param {Token[]} tokens - Array of tokens to filter.
 * @returns {Token[]} - Array of filtered tokens.
 */
export const filterExcludedTokens = (tokens: Token[]): Token[] => {
  return tokens.filter((token) => !excludePredicates.some((shouldExclude) => shouldExclude(token)));
};
