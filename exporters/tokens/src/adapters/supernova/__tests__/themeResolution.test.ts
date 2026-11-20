import { exampleCollectionTokens, expectedCollectionValue } from '../__fixtures__/exampleCollectionTokens';
import { filterColorCollections } from '../themeResolution';

describe('themeResolution', () => {
  describe('filterColorCollections', () => {
    it('should filter color collections', () => {
      const tokens = Array.from(exampleCollectionTokens.values());

      expect(filterColorCollections(tokens)).toStrictEqual(expectedCollectionValue);
    });
  });
});
