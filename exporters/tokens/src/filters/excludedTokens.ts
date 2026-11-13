import { type Token, type TokenGroup, TokenType } from '@supernovaio/sdk-exporters';
import { getTokenGroupPath } from '../helpers/groupHelper';

/* Filters */
const isFigmaToken = (token: Token) => token.name.includes('figma-');
const isTypographyLink = (token: Token) => token.tokenType === TokenType.typography && token.name.includes('Link');
const isTypographyItalic = (token: Token) => token.tokenType === TokenType.typography && token.name.includes('Italic');

const TYPOGRAPHY_FONT_WEIGHT_PATH = ['typography', 'font-weight'];

const toPathSegment = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Font weight names of the typography styles (e.g. `Bold`, `Semibold Italic`) are string tokens of the device
 * collection. They are only a source for the typography styles, whose weights are exported as numbers.
 *
 * Recognized by the path the variable name is made of: the token has to live in the `Typography/Font Weight` group
 * (or deeper), e.g. `Typography/Font Weight/Bold`. The segments are compared one by one, so a sibling group such as
 * `Font Weights` or a token that merely has such a name is kept.
 *
 * @param token
 * @param tokenGroups
 */
const isTypographyFontWeight = (token: Token, tokenGroups: TokenGroup[]) => {
  const groupPath = getTokenGroupPath(token, tokenGroups).map(toPathSegment);

  return (
    token.tokenType === TokenType.string &&
    TYPOGRAPHY_FONT_WEIGHT_PATH.every((segment, index) => groupPath[index] === segment)
  );
};

/* Predicates */
const excludePredicates = [isFigmaToken, isTypographyLink, isTypographyItalic, isTypographyFontWeight];

/**
 * Filters out tokens that should be excluded from processing:
 * - Tokens with "figma-" in their name
 * - Typography tokens with "Link" in their name
 * - Typography tokens with "Italic" in their name
 * - String tokens of the typography font weights (`Typography/Font Weight/...`)
 *
 * @param {Token[]} tokens - Array of tokens to filter.
 * @param tokenGroups - Groups of the tokens, to recognize tokens by their group path.
 * @returns {Token[]} - Array of filtered tokens.
 */
export const filterExcludedTokens = (tokens: Token[], tokenGroups: TokenGroup[] = []): Token[] => {
  return tokens.filter((token) => !excludePredicates.some((shouldExclude) => shouldExclude(token, tokenGroups)));
};
