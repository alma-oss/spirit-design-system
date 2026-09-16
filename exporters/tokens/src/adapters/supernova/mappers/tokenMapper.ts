import {
  type StringToken,
  type Token,
  type TokenGroup as SupernovaTokenGroup,
  TokenType,
} from '@supernovaio/sdk-exporters';
import { getDeviceAlias } from '../../../helpers/deviceHelpers';
import { type DesignToken, TokenTypeEnum } from '../../../core/types';

const buildGroupPath = (token: Token, tokenGroups: Array<SupernovaTokenGroup>): string[] => {
  const group = tokenGroups.find((candidate) => candidate.id === token.parentGroupId);

  return group ? [...group.path, group.name] : [];
};

const mapStringToken = (token: StringToken, tokenGroups: Array<SupernovaTokenGroup>): DesignToken => ({
  id: token.id,
  name: token.name,
  type: TokenTypeEnum.String,
  value: {
    type: 'string',
    value: token.value.text,
  },
  description: token.description || undefined,
  metadata: {
    brandId: token.brandId,
    device: getDeviceAlias(token) || undefined,
    groupPath: buildGroupPath(token, tokenGroups),
  },
  source: {
    adapter: 'supernova',
    originalId: token.id,
    originalType: token.tokenType,
  },
});

/**
 * Maps a Supernova token to the internal model. Only `string` tokens are
 * supported so far - other types return `null` and are filtered out by the
 * adapter, the same way `stylesGenerator.tokenToStyleByType` silently skips
 * types it doesn't have a case for. Support is added type by type as each
 * generator/processor is migrated to consume `DesignToken` directly.
 *
 * @param token
 * @param tokenGroups
 */
export const mapToken = (token: Token, tokenGroups: Array<SupernovaTokenGroup>): DesignToken | null => {
  if (token.tokenType === TokenType.string) {
    return mapStringToken(token as StringToken, tokenGroups);
  }

  return null;
};
