import type { Token, TokenGroup } from '@supernovaio/sdk-exporters';

/**
 * Path of the group a token lives in, root first. This is the part of the token's variable name that comes before
 * the token's own name.
 *
 * @param token
 * @param tokenGroups
 */
export const getTokenGroupPath = (token: Token, tokenGroups: Array<TokenGroup>): string[] => {
  const group = tokenGroups.find((candidate) => candidate.id === token.parentGroupId);

  return group ? [...group.path, group.name] : [];
};
