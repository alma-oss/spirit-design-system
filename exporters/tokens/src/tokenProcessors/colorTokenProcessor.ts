import type { DesignToken, TokenIndex } from '../core/types';
import { formatTokenStyleByOutput, tokenVariableName } from '../helpers/tokenHelper';
import { handleSpecialCase } from '../helpers/specialCaseHelper';
import { normalizeColor } from '../helpers/colorHelper';
import { formatColorValue } from '../formatters/cssValue';
import { resolveTokenReferences } from '../transformations';

type ColorTokenProcessorContext = {
  hasParentPrefix: boolean;
  hasJsOutput: boolean;
  tokenIndex: TokenIndex;
};

/**
 * Processes color tokens into their normalized color values.
 *
 * Naming is derived by `namingHelper` from the token's name, group path and device (see #DS-2874).
 * The value is read from the internal `DesignToken` model, and references to other color tokens are resolved by the
 * `resolve-references` transformation rule through the model's token index (see #DS-2872).
 *
 * @param colorToken - The color token to process
 * @param ctx - Processing context with token index and output options
 * @returns {string|null} Formatted token style string or null
 */
export const processColorToken = (colorToken: DesignToken, ctx: ColorTokenProcessorContext): string | null => {
  const { hasParentPrefix, hasJsOutput, tokenIndex } = ctx;
  const name = tokenVariableName(colorToken, hasParentPrefix);

  const designToken = resolveTokenReferences(colorToken, tokenIndex);

  // The model's color is `#rrggbbaa`, the normalization below works on the digits only
  const hex = formatColorValue(designToken.value).slice(1);
  const value = handleSpecialCase(name, normalizeColor(hex));

  return formatTokenStyleByOutput(name, value, hasJsOutput);
};
