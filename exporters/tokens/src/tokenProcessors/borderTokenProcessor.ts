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
 * Processes border and borderWidth tokens (no rem conversion).
 *
 * `borderWidth`'s value is read through the adapter (see #DS-2335); `border`
 * still reads its nested `.value.width` natively, since the adapter doesn't
 * map that composite shape yet - `mapToken` returning a non-numeric result
 * for it is exactly the "not migrated yet" case, not "no value".
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
  let rawUnit: string | undefined;

  if (mappedValue) {
    value = mappedValue.value;
    rawUnit = mappedValue.unit;
  } else if ('width' in borderToken.value && borderToken.value.width) {
    value = borderToken.value.width.measure;
    rawUnit = borderToken.value.width.unit;
  } else if ('measure' in borderToken.value) {
    value = borderToken.value.measure;
    rawUnit = borderToken.value.unit;
  }

  if (value === undefined) {
    return null;
  }

  const processedNumber = handleSpecialCase(name, value);
  const unit = rawUnit ? CSSHelper.unitToCSS(rawUnit as unknown as Unit) : undefined;

  return formatTokenStyleByOutput(name, processedNumber, hasJsOutput, unit, false);
};
