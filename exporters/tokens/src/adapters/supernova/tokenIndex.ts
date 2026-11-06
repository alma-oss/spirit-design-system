import { type Token, type TokenGroup as SupernovaTokenGroup } from '@supernovaio/sdk-exporters';
import type { DesignToken, TokenIndex } from '../../core/types';
import { mapToken } from './mappers/tokenMapper';

/**
 * Id-addressable view over Supernova's native token map (`transformToMap`), mapping tokens to the internal model on
 * first access. Existence is answered from the native map, so a reference to a token type the mapper does not support
 * yet is still known, just not readable.
 *
 * Temporary bridge: the generators still work with Supernova's native `mappedTokens` and build the processors' token
 * index from it (see `generateStylesFromTokens`). Once they read from a `TokenCollection`, they use
 * `createTokenIndex(collection.tokens)` from `core/tokenIndex.ts` instead and this file can be deleted together with
 * its test.
 *
 * @param nativeTokens - Native tokens by id
 * @param tokenGroups - Native groups, used for the mapped tokens' group path
 */
export const createSupernovaTokenIndex = (
  nativeTokens: Map<string, Token>,
  tokenGroups: Array<SupernovaTokenGroup>,
): TokenIndex => {
  const mapped = new Map<string, DesignToken | null>();

  return {
    has: (id) => nativeTokens.has(id),
    get: (id) => {
      if (!mapped.has(id)) {
        const nativeToken = nativeTokens.get(id);
        mapped.set(id, nativeToken ? mapToken(nativeToken, tokenGroups) : null);
      }

      return mapped.get(id) ?? undefined;
    },
  };
};
