import type { DesignToken } from '../core/types';
import { getDeviceTokenValue } from './deviceHelpers';
import { handleInvariantTokenAlias } from './specialCaseHelper';
import { toCamelCase, toParamCase } from './stringHelper';
import type { NameableToken } from './types';

export class TokenNamingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenNamingError';
  }
}

const describe = ({ groupPath, name }: NameableToken): string => [...groupPath, name].join('/');

/**
 * Variable name of a token, computed from its group path and name only (plus the device suffix, if it has one).
 * Same result for a token of any source.
 *
 * Throws a `TokenNamingError` for a name that cannot be turned into a valid one, instead of silently producing a
 * wrong name: an empty or blank token name or group segment, or a name without a single letter or digit.
 *
 * @param token
 * @param hasParentPrefix - Prefix the name with the token's group path
 */
export const getVariableName = (token: NameableToken, hasParentPrefix: boolean): string => {
  const parts = hasParentPrefix ? [...token.groupPath, token.name] : [token.name];

  if (parts.some((part) => typeof part !== 'string' || part.trim() === '')) {
    throw new TokenNamingError(`Cannot name token "${describe(token)}": the name or a group segment is empty.`);
  }

  // The token's own name is checked, not the joined name: a valid group prefix must not hide a malformed name.
  if (!/[a-zA-Z0-9]/.test(token.name)) {
    throw new TokenNamingError(`Cannot name token "${describe(token)}": "${token.name}" has no letters or digits.`);
  }

  const variableName = toParamCase(parts);

  return token.device ? getDeviceTokenValue(variableName, token.device) : variableName;
};

/**
 * Variable name of a model token.
 *
 * @param token
 * @param hasParentPrefix
 */
export const getDesignTokenVariableName = (token: DesignToken, hasParentPrefix: boolean): string =>
  getVariableName(
    { name: token.name, groupPath: token.metadata.groupPath, device: token.metadata.device },
    hasParentPrefix,
  );

/**
 * Alias (last part of an object key) of a token: the numeric part of its name, except for colors, and the name
 * itself (with the invariant aliases applied, e.g. `radius-full` -> `full`) otherwise.
 *
 * @param name
 * @param isColor
 * @param hasJsOutput
 */
export const getAliasName = (name: string, isColor: boolean, hasJsOutput: boolean): string => {
  const numericPart = name.match(/\d+/)?.[0];

  if (!isColor && numericPart) {
    return numericPart;
  }

  const nonNumericPart = handleInvariantTokenAlias(name.toLowerCase());

  return hasJsOutput ? toCamelCase(nonNumericPart) : nonNumericPart;
};
