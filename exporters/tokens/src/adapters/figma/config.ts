import type { AdapterConfig } from '../SourceAdapter';
import { FILE_KEY_PATTERN } from './constants';
import { FigmaConfigError } from './FigmaConfigError';

export type FigmaSourceConfig = {
  fileKey: string;
  brandId?: string;
};

/**
 * Reads and validates the source-specific part of the adapter config, so a wrong value fails here with a clear message
 * instead of as a 404 from Figma.
 *
 * `source.fileKey` is required. `source.brandId` falls back to `filters.brandId`.
 *
 * @param config
 */
export const parseSourceConfig = (config: AdapterConfig): FigmaSourceConfig => {
  const { fileKey, brandId = config.filters?.brandId } = config.source;

  if (typeof fileKey !== 'string' || fileKey.trim() === '') {
    throw new FigmaConfigError('A Figma file key is required (source.fileKey).');
  }

  if (!FILE_KEY_PATTERN.test(fileKey)) {
    throw new FigmaConfigError('The Figma file key (source.fileKey) may contain only letters, digits, "-" and "_".');
  }

  if (brandId !== undefined && typeof brandId !== 'string') {
    throw new FigmaConfigError('The brand (source.brandId) must be a string.');
  }

  return { fileKey, brandId };
};
