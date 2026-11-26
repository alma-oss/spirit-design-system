import { type DimensionToken, type Supernova, type Token, type TokenTheme } from '@supernovaio/sdk-exporters';
import { exampleDimensionAndStringTokens } from '../../../../tests/fixtures/supernova/exampleDimensionAndStringTokens';
import { exampleGroups } from '../../../../tests/fixtures/supernova/exampleGroups';
import { exampleTypographyTokens } from '../../../../tests/fixtures/supernova/exampleTypographyTokens';
import { CollectionKind, TokenTypeEnum } from '../../../core/types';
import { splitTokens } from '../../../core/splitTokens';
import { filterExcludedTokens } from '../../../filters/excludedTokens';
import { SupernovaAdapter } from '../SupernovaAdapter';

const exampleThemes = [
  { id: 'theme-1', name: 'Dark', overriddenTokens: [{ propertyValues: { collection: 'theme-tokens-id' } }] },
] as unknown as TokenTheme[];

const createSdk = (tokens = Array.from(exampleDimensionAndStringTokens.values())) => {
  return {
    tokens: {
      getTokens: jest.fn().mockResolvedValue(tokens),
      getTokenGroups: jest.fn().mockResolvedValue(exampleGroups),
      getTokenThemes: jest.fn().mockResolvedValue(exampleThemes),
      computeTokensByApplyingThemes: jest.fn((allTokens: Token[]) => allTokens),
    },
  } as unknown as Supernova;
};

describe('SupernovaAdapter', () => {
  describe('fetchTokens', () => {
    it('should map supported tokens, groups and themes to the internal model', async () => {
      const sdk = createSdk();
      const adapter = new SupernovaAdapter(sdk);

      const collection = await adapter.fetchTokens({ source: { designSystemId: 'ds1', versionId: 'v1' } });

      // the internal `figma-` token stays, the pipeline excludes it.
      // one token per id, the tokens resolved for a theme or a device are separate
      expect(collection.tokens.map((token) => token.id).sort()).toEqual(['dimensionRef', 'figmaTokenRef', 'stringRef']);
      expect(collection.themedTokens.map(({ theme, tokens }) => [theme.name, tokens.length])).toEqual([['Dark', 3]]);
      expect(collection.themedTokens[0].tokens.every((token) => token.metadata.theme === 'Dark')).toBe(true);
      expect(collection.deviceTokens).toEqual([]);
      expect(collection.groups).toHaveLength(exampleGroups.length);
      expect(collection.themes).toEqual([{ id: 'theme-1', name: 'Dark', collection: CollectionKind.Color }]);
      expect(collection.devices).toEqual([]);
      expect(collection.tokens.every((token) => token.metadata.collection === CollectionKind.Global)).toBe(true);
      expect(splitTokens(collection).globalTokens).toHaveLength(3);
      expect(collection.metadata.source).toBe('supernova');
    });

    it('should keep the resolved device variants with their device, the devices and the unthemed tokens', async () => {
      const deviceToken = {
        ...exampleDimensionAndStringTokens.get('dimensionRef'),
        id: 'spacingDevice',
        name: 'spacing',
        propertyValues: { collection: 'device-tokens-id' },
      } as unknown as Token;
      const globalToken = exampleDimensionAndStringTokens.get('dimensionRef') as Token;
      const deviceThemes = [
        { id: 'device-mobile', name: 'Mobile', codeName: 'mobile', measure: 16 },
        { id: 'device-desktop', name: 'Desktop', codeName: 'desktop', measure: 32 },
      ].map(({ measure, ...theme }) => ({
        ...theme,
        measure,
        overriddenTokens: [{ propertyValues: { collection: 'device-tokens-id' } }],
      }));
      const sdk = {
        tokens: {
          getTokens: jest.fn().mockResolvedValue([globalToken, deviceToken]),
          getTokenGroups: jest.fn().mockResolvedValue(exampleGroups),
          getTokenThemes: jest.fn().mockResolvedValue([...exampleThemes, ...deviceThemes]),
          // a device theme gives the tokens of the devices collection its own value
          computeTokensByApplyingThemes: jest.fn(
            (_tokens: Token[], collections: Token[], [theme]: Array<TokenTheme & { measure?: number }>) =>
              theme.measure === undefined
                ? collections
                : collections.map((token) => ({
                    ...token,
                    value: { ...(token as DimensionToken).value, measure: theme.measure },
                  })),
          ),
        },
      } as unknown as Supernova;

      const collection = await new SupernovaAdapter(sdk).fetchTokens({
        source: { designSystemId: 'ds1', versionId: 'v1' },
      });

      expect(
        collection.deviceTokens.map(({ id, metadata, value }) => [id, metadata.device, metadata.collection, value]),
      ).toEqual([
        ['spacingDevice', 'mobile', CollectionKind.Devices, { type: 'number', value: 16, unit: 'px' }],
        ['spacingDevice', 'desktop', CollectionKind.Devices, { type: 'number', value: 32, unit: 'px' }],
      ]);
      expect(collection.devices).toEqual([
        { name: 'mobile', themeId: 'device-mobile' },
        { name: 'desktop', themeId: 'device-desktop' },
      ]);
      expect(collection.themes.map(({ id, collection: kind }) => [id, kind])).toEqual([
        ['theme-1', CollectionKind.Color],
        ['device-mobile', CollectionKind.Devices],
        ['device-desktop', CollectionKind.Devices],
      ]);
      // the original tokens are not resolved for a device
      expect(collection.tokens.map(({ id, metadata }) => [id, metadata.device, metadata.theme])).toEqual([
        ['dimensionRef', undefined, undefined],
        ['spacingDevice', undefined, undefined],
      ]);
      expect(collection.themedTokens.map(({ theme }) => theme.id)).toEqual(['theme-1']);
    });

    it('should resolve the themes with the SDK once', async () => {
      const sdk = createSdk();
      const adapter = new SupernovaAdapter(sdk);

      const collection = await adapter.fetchTokens({ source: { designSystemId: 'ds1', versionId: 'v1' } });

      expect(collection.groups).toHaveLength(exampleGroups.length);
      expect(collection.themedTokens.map(({ theme }) => theme.name)).toEqual(['Dark']);
      expect(sdk.tokens.computeTokensByApplyingThemes).toHaveBeenCalledTimes(1);
    });

    it('should map typography tokens and leave the exclusion of Link and Italic styles to the pipeline', async () => {
      const italic = { ...exampleTypographyTokens.get('typographyRef1'), id: 'typographyItalic', name: 'Bold-Italic' };
      const sdk = createSdk([...Array.from(exampleTypographyTokens.values()), italic] as Token[]);
      const adapter = new SupernovaAdapter(sdk);

      const collection = await adapter.fetchTokens({ source: { designSystemId: 'ds1', versionId: 'v1' } });

      expect(filterExcludedTokens(collection.tokens).map((token) => [token.id, token.type])).toEqual([
        ['typographyRef1', TokenTypeEnum.Typography],
      ]);
    });

    it('should filter tokens and groups by brandId when provided', async () => {
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

  describe('fetchTokens brandId of the collection', () => {
    const config = { source: { designSystemId: 'ds1', versionId: 'v1' } };
    const withBrand = (brandId: string | undefined) =>
      Array.from(exampleDimensionAndStringTokens.values()).map((token) => ({
        ...token,
        brandId,
      })) as unknown as Token[];

    it('should use the brandId of the filter when provided', async () => {
      const adapter = new SupernovaAdapter(createSdk(withBrand('brand-a')));

      const collection = await adapter.fetchTokens({ ...config, filters: { brandId: 'brand-a' } });

      expect(collection.brandId).toBe('brand-a');
    });

    it('should prefer the brandId of the filter to the brand shared by the tokens', async () => {
      const adapter = new SupernovaAdapter(createSdk(withBrand('brand-a')));

      const collection = await adapter.fetchTokens({ ...config, filters: { brandId: 'brand-b' } });

      expect(collection.brandId).toBe('brand-b');
    });

    it('should use the brand shared by all tokens without a filter', async () => {
      const adapter = new SupernovaAdapter(createSdk(withBrand('brand-a')));

      const collection = await adapter.fetchTokens(config);

      expect(collection.brandId).toBe('brand-a');
    });

    it('should leave the brandId undefined for tokens of different brands', async () => {
      const [first, ...rest] = withBrand('brand-a');
      const otherBrand = rest.map((token) => ({ ...token, brandId: 'brand-b' })) as unknown as Token[];
      const adapter = new SupernovaAdapter(createSdk([first, ...otherBrand]));

      const collection = await adapter.fetchTokens(config);

      expect(collection.brandId).toBeUndefined();
    });

    it('should leave the brandId undefined for unbranded tokens', async () => {
      const adapter = new SupernovaAdapter(createSdk(withBrand(undefined)));

      const collection = await adapter.fetchTokens(config);

      expect(collection.brandId).toBeUndefined();
    });
  });
});
