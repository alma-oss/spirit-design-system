import { type Token } from '@supernovaio/sdk-exporters';
import { TOKEN_COLLECTION_THEMES_NAME } from '../../constants';
import { CollectionKind } from '../../core/types';
import {
  filterCollections,
  filterDeviceCollections,
  filterGlobalCollections,
  getCollectionId,
} from '../../helpers/collectionsHelper';

/**
 * Id of the devices collection (the value of the `Collection` property of its tokens), `undefined` when no token
 * belongs to it.
 *
 * @param tokens
 */
export const getDeviceCollectionId = (tokens: Token[]): string | boolean | number | undefined =>
  getCollectionId(filterDeviceCollections(tokens));

/**
 * Supernova tells the collections apart by the `Collection` property of a token. Returns a function that maps a
 * token to the source-neutral kind of its collection, leaving lookup-only collections (e.g. primitives) unset.
 *
 * @param tokens - All tokens of the design system
 */
export const createCollectionKindResolver = (tokens: Token[]): ((token: Token) => CollectionKind | undefined) => {
  const deviceTokenIds = new Set(filterDeviceCollections(tokens).map(({ id }) => id));
  const colorTokenIds = new Set(filterCollections(tokens, TOKEN_COLLECTION_THEMES_NAME).map(({ id }) => id));
  const globalTokenIds = new Set(filterGlobalCollections(tokens).map(({ id }) => id));

  return ({ id }) => {
    if (deviceTokenIds.has(id)) {
      return CollectionKind.Devices;
    }

    if (colorTokenIds.has(id)) {
      return CollectionKind.Color;
    }

    return globalTokenIds.has(id) ? CollectionKind.Global : undefined;
  };
};
