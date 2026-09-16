import { StringToken, TokenGroup } from '@supernovaio/sdk-exporters';
import { formatTokenStyleByOutput, tokenVariableName } from '../helpers/tokenHelper';
import { handleSpecialCase } from '../helpers/specialCaseHelper';
import { mapToken } from '../adapters/supernova/mappers/tokenMapper';

type StringTokenProcessorContext = {
  tokenGroups: Array<TokenGroup>;
  hasParentPrefix: boolean;
  hasJsOutput: boolean;
};

/**
 * Processes string tokens (simple text values).
 *
 * Naming stays on the native token (it needs the SDK's `NamingHelper`), but
 * the value is read through the internal `DesignToken` model via the
 * Supernova adapter's mapper - the first processor migrated per the
 * source-agnostic token exporter refactor (#DS-2335).
 *
 * @param stringToken - The string token to process
 * @param ctx - Processing context with token groups and output options
 * @returns {string|null} Formatted token style string or null
 */
export const processStringToken = (stringToken: StringToken, ctx: StringTokenProcessorContext): string | null => {
  const { tokenGroups, hasParentPrefix, hasJsOutput } = ctx;
  const name = tokenVariableName(stringToken, tokenGroups, hasParentPrefix);

  const designToken = mapToken(stringToken, tokenGroups);
  if (!designToken || designToken.value.type !== 'string') {
    return null;
  }

  const value = handleSpecialCase(name, designToken.value.value);

  return formatTokenStyleByOutput(name, value, hasJsOutput);
};
