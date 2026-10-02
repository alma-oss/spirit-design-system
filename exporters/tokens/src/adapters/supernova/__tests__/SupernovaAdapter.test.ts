import { type Supernova, type TokenTheme } from '@supernovaio/sdk-exporters';
import { exampleDimensionAndStringTokens } from '../../../../tests/fixtures/exampleDimensionAndStringTokens';
import { exampleGroups } from '../../../../tests/fixtures/exampleGroups';
import { SupernovaAdapter } from '../SupernovaAdapter';

const exampleThemes = [{ id: 'theme-1', name: 'Dark' } as unknown as TokenTheme];

const createSdk = () => {
  const tokens = Array.from(exampleDimensionAndStringTokens.values());

  return {
    tokens: {
      getTokens: jest.fn().mockResolvedValue(tokens),
      getTokenGroups: jest.fn().mockResolvedValue(exampleGroups),
      getTokenThemes: jest.fn().mockResolvedValue(exampleThemes),
    },
  } as unknown as Supernova;
};

describe('SupernovaAdapter', () => {
  describe('fetchTokens', () => {
    it('maps supported tokens, groups and themes to the internal model', async () => {
      const sdk = createSdk();
      const adapter = new SupernovaAdapter(sdk);

      const collection = await adapter.fetchTokens({ source: { designSystemId: 'ds1', versionId: 'v1' } });

      // Only the string token is mapped so far; dimension/figma tokens are filtered out.
      expect(collection.tokens).toHaveLength(1);
      expect(collection.tokens[0].id).toBe('stringRef');
      expect(collection.groups).toHaveLength(exampleGroups.length);
      expect(collection.themes).toEqual([{ id: 'theme-1', name: 'Dark' }]);
      expect(collection.metadata.source).toBe('supernova');
    });

    it('filters tokens and groups by brandId when provided', async () => {
      const sdk = createSdk();
      const adapter = new SupernovaAdapter(sdk);

      const collection = await adapter.fetchTokens({
        source: { designSystemId: 'ds1', versionId: 'v1' },
        filters: { brandId: 'brand-that-does-not-exist' },
      });

      expect(collection.tokens).toHaveLength(0);
      expect(collection.groups).toHaveLength(0);
    });
  });
});
