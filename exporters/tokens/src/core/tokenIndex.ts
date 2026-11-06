import type { DesignToken, TokenIndex } from './types';

/**
 * Creates a `TokenIndex` backed by already-mapped tokens, e.g. the `tokens` of a `TokenCollection`.
 *
 * @param tokens - Tokens in the internal model
 */
export const createTokenIndex = (tokens: Iterable<DesignToken>): TokenIndex => {
  const tokensById = new Map<string, DesignToken>();

  for (const token of tokens) {
    tokensById.set(token.id, token);
  }

  return {
    has: (id) => tokensById.has(id),
    get: (id) => tokensById.get(id),
  };
};
