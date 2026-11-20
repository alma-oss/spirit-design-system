import type { DesignToken } from './types';

/**
 * The brand of the tokens when they all share one (see ADR 014), `undefined` otherwise (no tokens, several brands or a token without a brand).
 *
 * @param tokens
 */
export const findSingleBrandId = (tokens: DesignToken[]): string | undefined => {
  const brandIds = new Set(tokens.map((token) => token.metadata.brandId || undefined));

  return brandIds.size === 1 ? [...brandIds][0] : undefined;
};
