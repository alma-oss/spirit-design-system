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
 * IMPORTANT: an adapter owns its source's SDK and resolves themes and device variants itself (for Supernova via
 * `sdk.tokens.computeTokensByApplyingThemes`, see `resolveTokens` in `adapters/supernova/themeResolution.ts`). The pipeline never receives an
 * SDK, only the resolved result.
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
