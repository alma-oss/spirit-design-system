type NameLike = string | { name: NameLike };

/**
 * Resolves a node name to a plain string.
 * Newer `ast-types` typings allow `name` of import specifiers to be an identifier node as well as a string.
 *
 * @param name - A string or a node whose `name` holds the string.
 * @returns {string} The plain string name.
 */
export const getIdentifierName = (name: NameLike): string =>
  typeof name === 'string' ? name : getIdentifierName(name.name);
