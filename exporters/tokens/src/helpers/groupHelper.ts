import type { GroupedToken, PathGroup } from './types';

const findGroup = (token: GroupedToken, tokenGroups: Array<PathGroup>): PathGroup | undefined =>
  tokenGroups.find((candidate) => candidate.id === token.parentGroupId);

/**
 * Path of the group a token lives in, root first, including the name of a root group.
 *
 * @param token
 * @param tokenGroups
 */
export const getTokenGroupPath = (token: GroupedToken, tokenGroups: Array<PathGroup>): string[] => {
  const group = findGroup(token, tokenGroups);

  return group ? [...group.path, group.name] : [];
};

/**
 * Part of the group path that goes into the token's variable name, the part before the token's own name.
 * Same as the group path, except that a root group is the container of a token type and not a part of the name.
 *
 * @param token
 * @param tokenGroups
 */
export const getTokenNamePath = (token: GroupedToken, tokenGroups: Array<PathGroup>): string[] => {
  const group = findGroup(token, tokenGroups);

  if (!group) {
    return [];
  }

  return group.isRoot ? [...group.path] : [...group.path, group.name];
};
