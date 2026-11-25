import { splitTokens } from '../splitTokens';
import { CollectionKind, type DesignToken, type Theme, type TokenCollection, TokenTypeEnum } from '../types';

const token = (
  id: string,
  collection: CollectionKind,
  theme?: string,
  device?: string,
  type = TokenTypeEnum.String,
): DesignToken => ({
  id,
  name: id,
  type,
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
        tokens: [
          token('g', CollectionKind.Global),
          token('c', CollectionKind.Color, undefined, undefined, TokenTypeEnum.Color),
        ],
        themedTokens: [
          { theme: light, tokens: [token('c', CollectionKind.Color, 'light')] },
          { theme: dark, tokens: [token('c', CollectionKind.Color, 'dark')] },
        ],
        deviceTokens: [token('d', CollectionKind.Devices, undefined, 'mobile')],
      }),
    );

    expect(result.globalTokens.map((t) => t.id)).toEqual(['g']);
    expect(result.colorTokens.map((t) => t.id)).toEqual(['g', 'c']);
    expect(result.themes.map(({ theme, tokens }) => [theme.name, tokens.map((t) => t.metadata.theme)])).toEqual([
      ['light', ['light']],
      ['dark', ['dark']],
    ]);
    expect(result.deviceTokens.map((t) => t.id)).toEqual(['d']);
  });

  it('should keep the tokens that are not colors next to the colors of the color collection', () => {
    const color = (id: string, kind: CollectionKind) => token(id, kind, undefined, undefined, TokenTypeEnum.Color);

    const result = splitTokens(
      collection({
        tokens: [
          color('theme-color', CollectionKind.Color),
          color('global-color', CollectionKind.Global),
          token('global-string', CollectionKind.Global),
          token('device-string', CollectionKind.Devices),
        ],
      }),
    );

    expect(result.colorTokens.map((t) => t.id)).toEqual(['theme-color', 'global-string', 'device-string']);
  });

  it('should leave the lookup tokens out of the global tokens and their colors out of the color tokens', () => {
    const result = splitTokens(
      collection({
        tokens: [
          token('primitive-color', CollectionKind.Lookup, undefined, undefined, TokenTypeEnum.Color),
          token('global-string', CollectionKind.Global),
        ],
      }),
    );

    expect(result.globalTokens.map((t) => t.id)).toEqual(['global-string']);
    expect(result.colorTokens.map((t) => t.id)).toEqual(['global-string']);
  });

  it('should return empty groups for no tokens', () => {
    const result = splitTokens(collection());

    expect(result).toEqual({ globalTokens: [], colorTokens: [], themes: [], deviceTokens: [] });
  });

  it('should throw when a token is missing metadata.collection', () => {
    const orphan: DesignToken = {
      id: 'orphan-prefix',
      name: 'css-variable-prefix',
      type: TokenTypeEnum.String,
      value: { type: 'string', value: 'spirit-' },
      metadata: { groupPath: [] },
      source: { adapter: 'test', originalId: 'orphan-prefix' },
    };

    expect(() => splitTokens(collection({ tokens: [orphan] }))).toThrow(
      /Every token must set metadata.collection \(missing on: orphan-prefix\)/,
    );
  });
});
