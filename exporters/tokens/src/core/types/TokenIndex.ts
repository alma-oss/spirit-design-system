import type { DesignToken } from './DesignToken';

/**
 * Id-addressable view of the tokens of one export run.
 *
 * References between tokens (`ReferenceValue.tokenId`) point at a token id, so anything that needs to follow one
 * - a reference resolver, a formatter - reads tokens through this view instead of through a source's own token map.
 * Adapters decide how the view is backed (an eager map, or a lazy mapping of native tokens).
 */
export interface TokenIndex {
  /** Whether the source knows a token with this id, even one the exporter does not map to the internal model. */
  has(id: string): boolean;
  /** The token mapped to the internal model, or `undefined` when unknown or not mappable. */
  get(id: string): DesignToken | undefined;
}
