import type { DesignToken } from './types';

/**
 * Readers of a concrete value (a processor, a helper that collects measures or a prefix) cannot read an alias, e.g. a
 * Figma variable that points to another one. Returns the token with its alias replaced by the value the adapter
 * already resolved. An alias without a resolved value is returned as it is.
 *
 * @param token
 */
export const withResolvedValue = (token: DesignToken): DesignToken =>
  token.value.type === 'reference' && token.value.resolved ? { ...token, value: token.value.resolved } : token;
