import { Token, TokenTheme } from '@supernovaio/sdk-exporters';
import {
  TOKEN_COLLECTION_DEVICES_NAME,
  TOKEN_COLLECTION_GLOBAL_NAME,
  TOKEN_COLLECTION_PROPERTY_NAME,
} from './constants';

const collectionOptionIdCache = new Map<string, string>();

const cacheCollectionOptions = (collectionProperty?: {
  name: string;
  options?: Array<{ id: string; name: string }> | null;
}) => {
  if (!collectionProperty?.options) {
    return;
  }

  collectionProperty.options.forEach((option) => {
    if (!collectionOptionIdCache.has(option.name)) {
      collectionOptionIdCache.set(option.name, option.id);
    }
  });
};

const resolveCollectionOptionId = (tokens: Token[], collectionName: string): string | undefined => {
  if (collectionOptionIdCache.has(collectionName)) {
    return collectionOptionIdCache.get(collectionName);
  }

  for (const item of tokens) {
    const collectionProperties = Array.isArray(item.properties) ? item.properties : [];
    const collectionProperty = collectionProperties.find((prop) => prop.name === TOKEN_COLLECTION_PROPERTY_NAME);
    cacheCollectionOptions(collectionProperty);
    const option = collectionProperty?.options?.find((opt) => opt.name === collectionName);

    if (option) {
      collectionOptionIdCache.set(collectionName, option.id);

      return option.id;
    }
  }

  return undefined;
};

/**
 * Filters tokens based on a specific collection name and an optional exclusion flag.
 *
 * @param {Token[]} tokens - Array of tokens to filter.
 * @param collectionName - Name of the collection to filter by.
 * @param exclude {boolean} - Whether to exclude tokens matching the collection name.
 * @returns {Token[]} - Array of filtered tokens.
 */
export const filterCollections = (tokens: Token[], collectionName: string, exclude: boolean = false): Token[] => {
  const targetCollectionId = resolveCollectionOptionId(tokens, collectionName);

  return tokens.filter((item) => {
    const collectionId = item.propertyValues?.collection;
    let matchesCollection: boolean;
    if (collectionId === undefined || collectionId === null) {
      matchesCollection = collectionName === TOKEN_COLLECTION_GLOBAL_NAME;
    } else if (targetCollectionId) {
      matchesCollection = collectionId === targetCollectionId;
    } else {
      matchesCollection = false;
    }

    return exclude ? !matchesCollection : matchesCollection;
  });
};

/**
 * Filters tokens to find those that belong to the global collection.
 *
 * @param {Token[]} tokens - Array of tokens to filter.
 * @returns {Token[]} - Array of tokens.
 */
export const filterGlobalCollections = (tokens: Token[]) => {
  return filterCollections(tokens, TOKEN_COLLECTION_GLOBAL_NAME);
};

/**
 * Filters tokens to find those that belong to device collections.
 *
 * @param {Token[]} tokens - Array of tokens to filter.
 * @returns {Token[]} - Array of tokens.
 */
export const filterDeviceCollections = (tokens: Token[]) => {
  return filterCollections(tokens, TOKEN_COLLECTION_DEVICES_NAME);
};

/**
 * Retrieves the collection ID.
 *
 * @param {Token[]} tokens - Array of tokens to search.
 * @returns {string | boolean | number | undefined} - The collection ID if found, otherwise undefined.
 */
export const getCollectionId = (tokens: Token[]): string | boolean | number | undefined => {
  return tokens.find((item) => item.propertyValues?.collection)?.propertyValues?.collection;
};

/**
 * Retrieves the collection ID from a theme.
 *
 * @param {TokenTheme} theme - The theme object containing overridden tokens.
 * @returns {string | boolean | number | undefined} - The collection ID if found, otherwise undefined.
 */
export const getThemeCollectionId = (theme: TokenTheme): string | boolean | number | undefined => {
  return theme.overriddenTokens?.[0]?.propertyValues?.collection;
};

/**
 * Filters themes based on their collection ID and an exclusion flag.
 *
 * @param {TokenTheme[]} themes - Array of themes to filter.
 * @param {string | boolean | number | undefined} deviceCollectionId - The collection ID to compare against.
 * @param {boolean} exclude - Whether to exclude themes matching the collection ID.
 * @returns {TokenTheme[]} - Array of filtered themes.
 */
export const filterThemesByCollection = (
  themes: TokenTheme[],
  deviceCollectionId: string | boolean | number | undefined,
  exclude: boolean,
): TokenTheme[] => {
  return themes.filter((theme) => {
    const collectionId = getThemeCollectionId(theme);

    return exclude ? collectionId !== deviceCollectionId : collectionId === deviceCollectionId;
  });
};
