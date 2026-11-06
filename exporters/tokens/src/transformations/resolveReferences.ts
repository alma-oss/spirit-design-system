import type { DesignToken, TokenIndex } from '../core/types';
import { TransformationEngine } from './TransformationEngine';
import { resolveReferencesRule } from './rules/resolveReferencesRule';

const referenceResolver = new TransformationEngine([resolveReferencesRule]);

/**
 * Resolves the references in the value of a color, shadow or gradient token. Other token types are returned as they are.
 *
 * @param token - The token to resolve the references of
 * @param tokenIndex - Id-addressable view of the tokens references point into
 * @returns {object} The token with a value that has no references left
 */
export const resolveTokenReferences = (token: DesignToken, tokenIndex: TokenIndex): DesignToken =>
  referenceResolver.transformToken(token, { token, params: { tokenIndex } });
