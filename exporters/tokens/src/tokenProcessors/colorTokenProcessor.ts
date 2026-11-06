import { ColorToken, TokenGroup } from '@supernovaio/sdk-exporters';
import type { TokenIndex } from '../core/types';
import { formatTokenStyleByOutput, tokenVariableName } from '../helpers/tokenHelper';
import { handleSpecialCase } from '../helpers/specialCaseHelper';
import { normalizeColor } from '../helpers/colorHelper';
import { mapToken } from '../adapters/supernova/mappers/tokenMapper';
import { formatColorValue } from '../formatters/cssValue';
import { resolveTokenReferences } from '../transformations';

type ColorTokenProcessorContext = {
  tokenGroups: Array<TokenGroup>;
  hasParentPrefix: boolean;
  hasJsOutput: boolean;
  tokenIndex: TokenIndex;
};

/**
 * Processes color tokens into their normalized color values.
 *
 * Naming stays on the native token (it needs the SDK's `NamingHelper`). The value is read through the internal
 * `DesignToken` model via the Supernova adapter's mapper, and references to other color tokens are resolved by the
 * `resolve-references` transformation rule through the model's token index (see #DS-2872).
 *
 * @param colorToken - The color token to process
 * @param ctx - Processing context with token groups, token index, and output options
 * @returns {string|null} Formatted token style string or null
 */
export const processColorToken = (colorToken: ColorToken, ctx: ColorTokenProcessorContext): string | null => {
  const { tokenGroups, hasParentPrefix, hasJsOutput, tokenIndex } = ctx;
  const name = tokenVariableName(colorToken, tokenGroups, hasParentPrefix);

  const mappedToken = mapToken(colorToken, tokenGroups);
  if (!mappedToken) {
    return null;
  }

  const designToken = resolveTokenReferences(mappedToken, tokenIndex);

  // The model's color is `#rrggbbaa`, the normalization below works on the digits only
  const hex = formatColorValue(designToken.value).slice(1);
  const value = handleSpecialCase(name, normalizeColor(hex));

  return formatTokenStyleByOutput(name, value, hasJsOutput);
};
