import type { DesignToken } from '../core/types';
import { formatTokenStyleByOutput, tokenVariableName } from '../helpers/tokenHelper';
import { handleSpecialCase } from '../helpers/specialCaseHelper';

type BorderTokenProcessorContext = {
  hasParentPrefix: boolean;
  hasJsOutput: boolean;
};

/**
 * Processes border and borderWidth tokens (no rem conversion). The value of a `borderWidth` token and the width of a
 * `border` token are read from the internal `DesignToken` model as a number, the color, position and style of a
 * border are ignored.
 *
 * @param borderToken - The border or borderWidth token to process
 * @param ctx - Processing context with output options
 * @returns {string|null} Formatted token style string or null
 */
export const processBorderToken = (borderToken: DesignToken, ctx: BorderTokenProcessorContext): string | null => {
  const { hasParentPrefix, hasJsOutput } = ctx;
  const name = tokenVariableName(borderToken, hasParentPrefix);

  if (borderToken.value.type !== 'number') {
    return null;
  }

  const { value, unit } = borderToken.value;
  const processedNumber = handleSpecialCase(name, value);

  return formatTokenStyleByOutput(name, processedNumber, hasJsOutput, unit, false);
};
