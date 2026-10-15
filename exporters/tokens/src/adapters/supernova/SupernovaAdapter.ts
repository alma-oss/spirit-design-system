import { type RemoteVersionIdentifier, type Supernova } from '@supernovaio/sdk-exporters';
import { filterByBrandId } from '../../filters/brandIdFilter';
import { type DesignToken, type TokenCollection } from '../../core/types';
import { type AdapterConfig, type SourceAdapter } from '../SourceAdapter';
import { mapGroup } from './mappers/groupMapper';
import { mapTheme } from './mappers/themeMapper';
import { mapToken } from './mappers/tokenMapper';

export class SupernovaAdapter implements SourceAdapter {
  readonly name = 'supernova';

  constructor(private readonly sdk: Supernova) {}

  async fetchTokens(config: AdapterConfig): Promise<TokenCollection> {
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

    const mappedTokens = tokens
      .map((token) => mapToken(token, tokenGroups))
      .filter((token): token is DesignToken => token !== null);

    return {
      tokens: mappedTokens,
      groups: tokenGroups.map(mapGroup),
      themes: themes.map(mapTheme),
      metadata: {
        source: this.name,
        fetchedAt: new Date(),
      },
    };
  }
}
