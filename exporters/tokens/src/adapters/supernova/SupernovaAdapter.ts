import {
  type RemoteVersionIdentifier,
  type Supernova,
  type Token,
  type TokenGroup,
  type TokenTheme,
} from '@supernovaio/sdk-exporters';
import { findSingleBrandId } from '../../core/findSingleBrandId';
import { type DesignToken, type Device, type TokenCollection } from '../../core/types';
import { filterByBrandId } from '../../filters/brandIdFilter';
import { type AdapterConfig, type SourceAdapter } from '../SourceAdapter';
import { createCollectionKindResolver, getDeviceCollectionId } from './collectionKind';
import { mapGroup } from './mappers/groupMapper';
import { mapDevice, mapTheme } from './mappers/themeMapper';
import { mapToken } from './mappers/tokenMapper';
import { type ResolvedTokens, resolveTokens } from './themeResolution';

export type NativeTokens = {
  tokens: Token[];
  tokenGroups: TokenGroup[];
  themes: TokenTheme[];
};

export class SupernovaAdapter implements SourceAdapter {
  readonly name = 'supernova';

  constructor(private readonly sdk: Supernova) {}

  /**
   * Fetches the native data of the design system, filtered by brand when one is given.
   *
   * @param config
   */
  private async fetchNative(config: AdapterConfig): Promise<NativeTokens> {
    const remoteVersionIdentifier: RemoteVersionIdentifier = {
      designSystemId: config.source.designSystemId as string,
      versionId: config.source.versionId as string,
    };

    let tokens = await this.sdk.tokens.getTokens(remoteVersionIdentifier);
    let tokenGroups = await this.sdk.tokens.getTokenGroups(remoteVersionIdentifier);
    const themes = await this.sdk.tokens.getTokenThemes(remoteVersionIdentifier);

    const brandId = config.filters?.brandId;
    if (brandId) {
      tokens = filterByBrandId(tokens, brandId);
      tokenGroups = filterByBrandId(tokenGroups, brandId);
    }

    return { tokens, tokenGroups, themes };
  }

  private resolve(tokens: Token[], themes: TokenTheme[]): ResolvedTokens {
    return resolveTokens(tokens, themes, (allTokens, collections, theme) =>
      this.sdk.tokens.computeTokensByApplyingThemes(allTokens, collections, [theme]),
    );
  }

  /**
   * Fetches the tokens, groups and themes of the design system, applies the themes and devices to the tokens with the
   * SDK and maps everything to the internal model. The SDK is used by the adapter only, the pipeline gets the model.
   *
   * @param config
   */
  async fetchTokens(config: AdapterConfig): Promise<TokenCollection> {
    const { tokens, tokenGroups, themes } = await this.fetchNative(config);

    const getCollectionKind = createCollectionKindResolver(tokens);

    // A token the model has no type for (yet) is left out. Tokens that are not exported (e.g. internal `figma-` ones)
    // stay: the pipeline excludes them (see `filterExcludedTokens`), but a reference can still point at them.
    const mapTokens = (nativeTokens: Token[], theme?: string): DesignToken[] =>
      nativeTokens
        .map((token): DesignToken | null => {
          const mapped = mapToken(token, tokenGroups);

          return mapped && { ...mapped, metadata: { ...mapped.metadata, collection: getCollectionKind(token), theme } };
        })
        .filter((token): token is DesignToken => token !== null);

    const resolved = this.resolve(tokens, themes);
    const deviceCollectionId = getDeviceCollectionId(tokens);
    const mappedThemes = themes.map((theme) => mapTheme(theme, deviceCollectionId));
    const mappedTokens = mapTokens(tokens);
    // Each resolved color theme is paired with its `Theme` of the model
    const themedTokens = resolved.themes.flatMap(({ theme, tokens: themeTokens }) => {
      const mappedTheme = mappedThemes.find(({ id }) => id === theme.id);

      return mappedTheme ? [{ theme: mappedTheme, tokens: mapTokens(themeTokens, theme.name) }] : [];
    });
    const mappedDevices = mappedThemes.map(mapDevice).filter((device): device is Device => device !== null);

    return {
      tokens: mappedTokens,
      themedTokens,
      deviceTokens: mapTokens(resolved.deviceTokens),
      groups: tokenGroups.map(mapGroup),
      themes: mappedThemes,
      devices: mappedDevices,
      brandId: config.filters?.brandId ?? findSingleBrandId(mappedTokens),
      metadata: {
        source: this.name,
        fetchedAt: new Date(),
      },
    };
  }
}
