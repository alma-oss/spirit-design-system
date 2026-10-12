import { BorderToken, BorderWidthToken, TokenGroup, type Unit } from '@supernovaio/sdk-exporters';
import { CSSHelper } from '@supernovaio/export-helpers';
import { formatTokenStyleByOutput, tokenVariableName } from '../helpers/tokenHelper';
import { handleSpecialCase } from '../helpers/specialCaseHelper';
import { mapToken } from '../adapters/supernova/mappers/tokenMapper';

type BorderTokenProcessorContext = {
  tokenGroups: Array<TokenGroup>;
  hasParentPrefix: boolean;
  hasJsOutput: boolean;
};

/**
 * Processes border and borderWidth tokens (no rem conversion). Both are read
 * through the adapter (see #DS-2335); the native fallback branches exist
 * only for defense-in-depth should `mapToken` ever regress.
 *
 * @param borderToken - The border or borderWidth token to process
 * @param ctx - Processing context with token groups and output options
 * @returns {string|null} Formatted token style string or null
 */
export const processBorderToken = (
  borderToken: BorderToken | BorderWidthToken,
  ctx: BorderTokenProcessorContext,
): string | null => {
  const { tokenGroups, hasParentPrefix, hasJsOutput } = ctx;
  const name = tokenVariableName(borderToken, tokenGroups, hasParentPrefix);

  const designToken = mapToken(borderToken, tokenGroups);
  const mappedValue = designToken?.value.type === 'number' ? designToken.value : undefined;

  let value: number | undefined;
  // The adapter normalizes the unit to CSS form already; the native fallback
  // branches below still need CSSHelper to do that conversion themselves.
  let unit: string | undefined;

  if (mappedValue) {
    value = mappedValue.value;
    unit = mappedValue.unit;
  } else if ('width' in borderToken.value && borderToken.value.width) {
    value = borderToken.value.width.measure;
    unit = CSSHelper.unitToCSS(borderToken.value.width.unit);
  } else if ('measure' in borderToken.value) {
    value = borderToken.value.measure;
    unit = borderToken.value.unit ? CSSHelper.unitToCSS(borderToken.value.unit as unknown as Unit) : undefined;
  }

  if (value === undefined) {
    return null;
  }

  const processedNumber = handleSpecialCase(name, value);

  return formatTokenStyleByOutput(name, processedNumber, hasJsOutput, unit, false);
};
