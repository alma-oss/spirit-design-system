import type { DesignToken } from './DesignToken';

export type TokenGroup = {
  id: string;
  name: string;
  path: string[];
  parentId?: string;
};

export type Theme = {
  id: string;
  name: string;
  isDefault?: boolean;
};

export type CollectionMetadata = {
  /** Adapter that produced this collection, e.g. 'supernova', 'figma'. */
  source: string;
  fetchedAt: Date;
};

/**
 * Everything a source adapter fetches for one export run, already mapped
 * to the internal, source-agnostic model.
 */
export type TokenCollection = {
  tokens: DesignToken[];
  groups: TokenGroup[];
  themes: Theme[];
  metadata: CollectionMetadata;
};
