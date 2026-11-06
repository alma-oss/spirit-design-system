import { GradientToken, TokenGroup } from '@supernovaio/sdk-exporters';
import type { TokenIndex } from '../core/types';
import { addAngleVarToGradient, formatTokenStyleByOutput, tokenVariableName } from '../helpers/tokenHelper';
import { transformColorsToVariables, findAllHexColorsInStringAndNormalize } from '../helpers/colorHelper';
import { mapToken } from '../adapters/supernova/mappers/tokenMapper';
import { formatGradientValue } from '../formatters/cssValueFormatter';

type GradientTokenProcessorContext = {
  tokenGroups: Array<TokenGroup>;
  hasParentPrefix: boolean;
  hasJsOutput: boolean;
  tokenPrefix: string;
  tokenIndex: TokenIndex;
};

/**
 * Processes gradient tokens (with angle variable and color variable transformation).
 *
 * Naming stays on the native token (it needs the SDK's `NamingHelper`). The value is read through the internal
 * `DesignToken` model via the Supernova adapter's mapper; references between tokens are followed through the model's
 * token index (see #DS-2872).
 *
 * @param gradientToken - The gradient token to process
 * @param ctx - Processing context with token groups, token index, prefix, and output options
 * @returns {string|null} Formatted token style string or null
 */
export const processGradientToken = (
  gradientToken: GradientToken,
  ctx: GradientTokenProcessorContext,
): string | null => {
  const { tokenGroups, hasParentPrefix, hasJsOutput, tokenPrefix, tokenIndex } = ctx;
  const name = tokenVariableName(gradientToken, tokenGroups, hasParentPrefix);
  const { origin } = gradientToken;
  const groupName = hasParentPrefix ? undefined : origin?.name?.split('/')[0].toLowerCase();

  const designToken = mapToken(gradientToken, tokenGroups);
  if (!designToken) {
    return null;
  }

  let gradient = formatGradientValue(designToken.value, tokenIndex);

  gradient = addAngleVarToGradient(gradient);
  gradient = transformColorsToVariables(name, gradient, tokenPrefix, groupName); // add color variables
  gradient = findAllHexColorsInStringAndNormalize(gradient); // find hex codes and normalize them

  return formatTokenStyleByOutput(name, gradient, hasJsOutput);
};
