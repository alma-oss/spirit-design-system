import type { ReferenceValue, TokenIndex, TokenValue } from './types';

export type ConcreteTokenValue = Exclude<TokenValue, ReferenceValue>;

/**
 * Follows a (possibly chained) reference to a concrete value.
 *
 * Resolution order for every reference in the chain:
 * 1. The referenced token must exist in the index, otherwise the source data is inconsistent and this throws -
 *    the same contract Supernova's own helpers enforce for unknown `referencedTokenId`s.
 * 2. A `resolved` value the adapter already filled wins. Sources that compute values themselves (Supernova's themes
 *    are applied before the processors run, so a token's own value is authoritative) hand that value over this way.
 * 3. Otherwise the referenced token's own value is read from the index and resolved in turn. This is the path for
 *    sources that only carry the alias (e.g. Figma's `VARIABLE_ALIAS`).
 *
 * Non-reference values are returned as they are. Composite values are not walked; consumers resolve the members
 * they read.
 *
 * @param value - The value to resolve
 * @param index - Id-addressable view of the tokens references point into
 * @throws {Error} For an unknown token, a circular reference, or a known token with no value in the internal model
 */
export const resolveValue = (value: TokenValue, index: TokenIndex): ConcreteTokenValue => {
  const visited = new Set<string>();
  let current = value;

  while (current.type === 'reference') {
    const { tokenId, resolved } = current;

    if (!index.has(tokenId)) {
      throw new Error(`Trying to retrieve unknown referenced token ${tokenId}`);
    }

    if (visited.has(tokenId)) {
      throw new Error(`Circular reference detected at token ${tokenId}`);
    }
    visited.add(tokenId);

    const next = resolved ?? index.get(tokenId)?.value;
    if (!next) {
      throw new Error(`Referenced token ${tokenId} has no value in the internal model`);
    }

    current = next;
  }

  return current;
};
