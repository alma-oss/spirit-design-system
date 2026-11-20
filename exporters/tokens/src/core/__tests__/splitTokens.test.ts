import { splitTokens } from '../splitTokens';
import { CollectionKind, type DesignToken, type Theme, type TokenCollection, TokenTypeEnum } from '../types';

const token = (id: string, collection: CollectionKind, theme?: string, device?: string): DesignToken => ({
  id,
  name: id,
  type: TokenTypeEnum.String,
  value: { type: 'string', value: id },
  metadata: { groupPath: [], collection, theme, device },
  source: { adapter: 'test', originalId: id },
});

const light: Theme = { id: 'light', name: 'light', collection: CollectionKind.Color };
const dark: Theme = { id: 'dark', name: 'dark', collection: CollectionKind.Color };

const collection = (overrides: Partial<TokenCollection> = {}): TokenCollection => ({
  tokens: [],
  themedTokens: [],
  deviceTokens: [],
  groups: [],
  themes: [light, dark, { id: 'mobile', name: 'mobile', collection: CollectionKind.Devices, device: 'mobile' }],
  devices: [{ name: 'mobile', themeId: 'mobile' }],
  metadata: { source: 'test', fetchedAt: new Date() },
  ...overrides,
});

describe('splitTokens', () => {
  it('should group the tokens by collection and pass the resolved tokens through', () => {
    const result = splitTokens(
      collection({
        tokens: [token('g', CollectionKind.Global), token('c', CollectionKind.Color)],
        themedTokens: [
          { theme: light, tokens: [token('c', CollectionKind.Color, 'light')] },
          { theme: dark, tokens: [token('c', CollectionKind.Color, 'dark')] },
        ],
        deviceTokens: [token('d', CollectionKind.Devices, undefined, 'mobile')],
      }),
    );

    expect(result.globalTokens.map((t) => t.id)).toEqual(['g']);
    expect(result.colorTokens.map((t) => t.id)).toEqual(['c']);
    expect(result.themes.map(({ theme, tokens }) => [theme.name, tokens.map((t) => t.metadata.theme)])).toEqual([
      ['light', ['light']],
      ['dark', ['dark']],
    ]);
    expect(result.deviceTokens.map((t) => t.id)).toEqual(['d']);
  });

  it('should return empty groups for no tokens', () => {
    const result = splitTokens(collection());

    expect(result).toEqual({ globalTokens: [], colorTokens: [], themes: [], deviceTokens: [] });
  });
});
