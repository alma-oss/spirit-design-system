import { TokenTheme } from '@supernovaio/sdk-exporters';
import {
  filterCollections,
  filterThemesByCollection,
  getCollectionId,
  getThemeCollectionId,
} from '../collectionsHelper';
import {
  exampleCollectionTokens,
  expectedCollectionFilteredExcludedValue,
  expectedCollectionFilteredValue,
} from '../../../../tests/fixtures/exampleCollectionTokens';

describe('collectionsHelper', () => {
  describe('filterCollections', () => {
    it('returns tokens matching the specified collection name', () => {
      const tokens = Array.from(exampleCollectionTokens.values());
      const result = filterCollections(tokens, 'Primitives');

      expect(result).toEqual(expectedCollectionFilteredValue);
    });

    it('excludes tokens matching the specified collection name', () => {
      const tokens = Array.from(exampleCollectionTokens.values());
      const result = filterCollections(tokens, 'Primitives', true);

      expect(result).toEqual(expectedCollectionFilteredExcludedValue);
    });
  });

  describe('getCollectionId', () => {
    it('returns the collection ID when a token with a collection is present', () => {
      const tokens = Array.from(exampleCollectionTokens.values());
      const result = getCollectionId(tokens);

      expect(result).toBe('theme-tokens-id');
    });
  });

  describe('getThemeCollectionId', () => {
    it('returns the collection ID from theme', () => {
      const theme = {
        name: 'mobile',
        codeName: 'mobile',
        overriddenTokens: [{ propertyValues: { collection: 'device-tokens-id' } }],
      } as unknown as TokenTheme;
      const result = getThemeCollectionId(theme);

      expect(result).toBe('device-tokens-id');
    });
  });

  describe('filterThemesByCollection', () => {
    it('returns the themes by collectionId', () => {
      const themes = [
        {
          name: 'mobile',
          codeName: 'mobile',
          overriddenTokens: [{ propertyValues: { collection: 'device-tokens-id' } }],
        },
        {
          name: 'theme-light',
          codeName: 'theme-light',
          overriddenTokens: [{ propertyValues: { collection: 'theme-tokens-id' } }],
        },
      ] as unknown as TokenTheme[];
      const result = filterThemesByCollection(themes, 'device-tokens-id', false);

      expect(result).toEqual([
        {
          codeName: 'mobile',
          name: 'mobile',
          overriddenTokens: [{ propertyValues: { collection: 'device-tokens-id' } }],
        },
      ]);
    });

    it('returns the themes by  exclude of collectionId', () => {
      const themes = [
        {
          name: 'mobile',
          codeName: 'mobile',
          overriddenTokens: [{ propertyValues: { collection: 'device-tokens-id' } }],
        },
        {
          name: 'theme-light',
          codeName: 'theme-light',
          overriddenTokens: [{ propertyValues: { collection: 'theme-tokens-id' } }],
        },
        {
          name: 'theme-dark',
          codeName: 'theme-dark',
          overriddenTokens: [{ propertyValues: { collection: 'theme-tokens-id' } }],
        },
      ] as unknown as TokenTheme[];
      const result = filterThemesByCollection(themes, 'device-tokens-id', true);

      expect(result).toEqual([
        {
          codeName: 'theme-light',
          name: 'theme-light',
          overriddenTokens: [
            {
              propertyValues: {
                collection: 'theme-tokens-id',
              },
            },
          ],
        },
        {
          codeName: 'theme-dark',
          name: 'theme-dark',
          overriddenTokens: [
            {
              propertyValues: {
                collection: 'theme-tokens-id',
              },
            },
          ],
        },
      ]);
    });
  });
});
