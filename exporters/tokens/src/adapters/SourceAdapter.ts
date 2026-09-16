import type { TokenCollection } from '../core/types';

export type AdapterConfig = {
  /** Source-specific connection info (e.g. Supernova's designSystemId/versionId). */
  source: Record<string, unknown>;
  filters?: {
    brandId?: string;
  };
};

/**
 * All source adapters must implement this interface.
 *
 * IMPORTANT: an adapter returns raw, unthemed tokens - it must not resolve
 * themes or device variants itself. For Supernova, that resolution happens
 * later via `sdk.tokens.computeTokensByApplyingThemes`, once per theme/device,
 * inside the generation layer (see `generators/fileGenerator.ts`). A future
 * source without an equivalent SDK-side resolver would need to solve this
 * differently; that is not addressed here.
 */
export interface SourceAdapter {
  /** Unique adapter identifier, e.g. 'supernova', 'figma'. */
  readonly name: string;

  /**
   * Fetch tokens from the source and convert them to the internal model.
   *
   * @throws {Error} If the source fetch fails
   */
  fetchTokens(config: AdapterConfig): Promise<TokenCollection>;
}
