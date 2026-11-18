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
 * Themes and devices are handled in one of two ways, depending on the source:
 *
 * - Supernova: the adapter returns raw, unthemed tokens. The resolution happens later via
 *   `sdk.tokens.computeTokensByApplyingThemes`, once per theme/device, inside the generation layer
 *   (see `generators/fileGenerator.ts`).
 * - Figma: the adapter reads the modes of a theme or device collection itself and returns one token per mode,
 *   tagged with `metadata.theme` / `metadata.device`.
 *
 * Which of the two the pipeline should expect from every source is open (see DS-2875).
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
