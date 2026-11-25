import type { DesignToken, TokenValue } from '../../../core/types';

/**
 * Replaces every reference whose target is not a token of the collection (Primitives, remote or excluded variables)
 * with the value the adapter resolved for it. The references left are the ones the pipeline can follow through a
 * `TokenIndex` built from the collection.
 *
 * @param value
 * @param hasToken
 */
const dropUnknownReferences = (value: TokenValue, hasToken: (id: string) => boolean): TokenValue => {
  if (value.type === 'reference') {
    const resolved = value.resolved && dropUnknownReferences(value.resolved, hasToken);

    return hasToken(value.tokenId) || !resolved ? { ...value, resolved } : resolved;
  }

  if (value.type === 'composite') {
    return {
      type: 'composite',
      value: Object.fromEntries(
        Object.entries(value.value).map(([key, member]) => [key, dropUnknownReferences(member, hasToken)]),
      ),
    };
  }

  return value;
};

/**
 * @param tokens
 * @param known - Tokens a reference may point at, the `tokens` themselves by default
 */
export const keepKnownReferences = (tokens: DesignToken[], known: DesignToken[] = tokens): DesignToken[] => {
  const ids = new Set(known.map((token) => token.id));

  return tokens.map((token) => ({ ...token, value: dropUnknownReferences(token.value, (id) => ids.has(id)) }));
};
