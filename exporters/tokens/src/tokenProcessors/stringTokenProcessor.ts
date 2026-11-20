import type { DesignToken } from '../core/types';
import { formatTokenStyleByOutput, tokenVariableName } from '../helpers/tokenHelper';
import { handleSpecialCase } from '../helpers/specialCaseHelper';

type StringTokenProcessorContext = {
  hasParentPrefix: boolean;
  hasJsOutput: boolean;
};

/**
 * Processes string tokens (simple text values).
 *
 * Naming is derived by `namingHelper` from the token's name, group path and device (see #DS-2874), the value is read
 * from the internal `DesignToken` model.
 *
 * @param stringToken - The string token to process
 * @param ctx - Processing context with output options
 * @returns {string|null} Formatted token style string or null
 */
export const processStringToken = (stringToken: DesignToken, ctx: StringTokenProcessorContext): string | null => {
  const { hasParentPrefix, hasJsOutput } = ctx;
  const name = tokenVariableName(stringToken, hasParentPrefix);

  if (stringToken.value.type !== 'string') {
    return null;
  }

  const value = handleSpecialCase(name, stringToken.value.value);

  return formatTokenStyleByOutput(name, value, hasJsOutput);
};
