import type { ReferenceValue, TokenIndex, TokenValue } from './types';

export type ConcreteTokenValue = Exclude<TokenValue, ReferenceValue>;

// Follows a chain of references, recording every followed token id in `visited` (ids already in it are circular).
const followReferences = (
  value: TokenValue,
  index: TokenIndex,
  visited: Set<string>,
  trustResolved: boolean,
): ConcreteTokenValue => {
  let current = value;

  while (current.type === 'reference') {
    const { tokenId, resolved } = current;

    if (!(trustResolved && resolved) && !index.has(tokenId)) {
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

const resolveWithAncestors = (
  value: TokenValue,
  index: TokenIndex,
  ancestors: ReadonlySet<string>,
  trustResolved: boolean,
): TokenValue => {
  const visited = new Set(ancestors);
  const concrete = followReferences(value, index, visited, trustResolved);

  if (concrete.type !== 'composite') {
    return concrete;
  }

  return {
    type: 'composite',
    value: Object.fromEntries(
      Object.entries(concrete.value).map(([key, member]) => [
        key,
        resolveWithAncestors(member, index, visited, trustResolved),
      ]),
    ),
  };
};

/**
 * Follows a (possibly chained) reference to a concrete value and walks composite values too, so no reference is left
 * in the result, not even in a member of a member (e.g. the color of a shadow layer, or a layer that is a reference on
 * its own).
 *
 * Resolution order for every reference in the chain:
 * 1. The referenced token must exist in the index, otherwise the source data is inconsistent and this throws -
 *    the same contract Supernova's own helpers enforce for unknown `referencedTokenId`s. With `trustResolved` this
 *    check is skipped for a reference that already carries a `resolved` value.
 * 2. A `resolved` value the adapter already filled wins. Sources that compute values themselves (Supernova's themes
 *    are applied before the processors run, so a token's own value is authoritative) hand that value over this way.
 * 3. Otherwise the referenced token's own value is read from the index and resolved in turn. This is the path for
 *    sources that only carry the alias (e.g. Figma's `VARIABLE_ALIAS`).
 *
 * Non-reference values are returned as they are. A reference back to a token that is being resolved higher up the same
 * value is circular.
 *
 * @param value - The value to resolve
 * @param index - Id-addressable view of the tokens references point into
 * @param options
 * @param options.trustResolved - Take a `resolved` value as it is, without checking that the referenced token is in
 *   the index, at every reference of the chain. For consumers whose source has already computed the values.
 * @throws {Error} For an unknown token, a circular reference, or a known token with no value in the internal model
 */
export const resolveValueDeep = (
  value: TokenValue,
  index: TokenIndex,
  { trustResolved = false }: { trustResolved?: boolean } = {},
): TokenValue => resolveWithAncestors(value, index, new Set(), trustResolved);
