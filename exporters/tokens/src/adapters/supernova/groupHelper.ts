/** The part of a token needed to find its group. Any source's token with a parent group id fits. */
export type GroupedToken = { parentGroupId: string };

/** The part of a token group needed to build a path. Any source's group with an id, a name and a path fits. */
export type PathGroup = { id: string; name: string; path: string[]; isRoot?: boolean };

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
