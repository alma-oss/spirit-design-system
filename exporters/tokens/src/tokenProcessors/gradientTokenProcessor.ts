import type { DesignToken, TokenIndex } from '../core/types';
import {
  addAngleVarToGradient,
  formatTokenStyleByOutput,
  getTokenGroup,
  tokenVariableName,
} from '../helpers/tokenHelper';
import { transformColorsToVariables, findAllHexColorsInStringAndNormalize } from '../helpers/colorHelper';
import { formatGradientValue } from '../formatters/cssValue';
import { resolveTokenReferences } from '../transformations';

type GradientTokenProcessorContext = {
  hasParentPrefix: boolean;
  hasJsOutput: boolean;
  tokenPrefix: string;
  tokenIndex: TokenIndex;
};

/**
 * Processes gradient tokens (with angle variable and color variable transformation).
 *
 * Naming is derived by `namingHelper` from the token's name, group path and device (see #DS-2874).
 * The value is read from the internal `DesignToken` model; references between tokens are resolved by the
 * `resolve-references` transformation rule through the model's token index (see #DS-2872).
 *
 * @param gradientToken - The gradient token to process
 * @param ctx - Processing context with token index, prefix, and output options
 * @returns {string|null} Formatted token style string or null
 */
export const processGradientToken = (gradientToken: DesignToken, ctx: GradientTokenProcessorContext): string | null => {
  const { hasParentPrefix, hasJsOutput, tokenPrefix, tokenIndex } = ctx;
  const name = tokenVariableName(gradientToken, hasParentPrefix);
  const groupName = hasParentPrefix ? undefined : getTokenGroup(gradientToken);

  const designToken = resolveTokenReferences(gradientToken, tokenIndex);

  let gradient = formatGradientValue(designToken.value);

  gradient = addAngleVarToGradient(gradient);
  gradient = transformColorsToVariables(name, gradient, tokenPrefix, groupName); // add color variables
  gradient = findAllHexColorsInStringAndNormalize(gradient); // find hex codes and normalize them

  return formatTokenStyleByOutput(name, gradient, hasJsOutput);
};
