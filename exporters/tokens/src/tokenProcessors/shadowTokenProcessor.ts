import { ShadowToken, TokenGroup } from '@supernovaio/sdk-exporters';
import { ColorFormat, CSSHelper } from '@supernovaio/export-helpers';
import { formatTokenStyleByOutput, tokenVariableName } from '../helpers/tokenHelper';
import { transformColorsToVariables, findAllHexColorsInStringAndNormalize } from '../helpers/colorHelper';
import { replacePxWithRem } from '../formatters/unitFormatter';
import { getDeviceAlias } from '../helpers/deviceHelpers';
import { getFontSizeBaseForBreakpoint, type FontSizeBaseMap } from '../helpers/unitHelper';

type ShadowTokenProcessorContext = {
  tokenGroups: Array<TokenGroup>;
  hasParentPrefix: boolean;
  hasJsOutput: boolean;
  tokenPrefix: string;
  mappedTokens: Map<string, unknown>;
  fontSizeBaseMap: FontSizeBaseMap;
};

const getDeviceKey = (token: ShadowToken): string => {
  const alias = getDeviceAlias(token as never).toLowerCase();
  if (alias) {
    return alias;
  }

  const tokenName = token.name?.toLowerCase() || '';
  const originName = token.origin?.name?.toLowerCase() || '';
  const combinedName = `${tokenName} ${originName}`;

  if (combinedName.includes('desktop')) {
    return 'desktop';
  }

  if (combinedName.includes('tablet')) {
    return 'tablet';
  }

  if (combinedName.includes('mobile')) {
    return 'mobile';
  }

  // Default fallback to mobile for tokens without breakpoint in name
  return 'mobile';
};

const getBaseFontSize = (fontSizeBaseMap: FontSizeBaseMap, token: ShadowToken): number => {
  return getFontSizeBaseForBreakpoint(fontSizeBaseMap, getDeviceKey(token));
};

const SHADOW_LAYER_SEPARATOR = ', ';
const SHADOW_LENGTH_NAMES = ['offset-x', 'offset-y', 'blur-radius', 'spread-radius'];
const SHADOW_LAYER_LENGTHS_REGEX = /^(inset )?(\S+) (\S+) (\S+) (\S+)(?= )/;

/**
 * Wraps shadow lengths into CSS variables so they can be overridden per theme.
 * Variables are suffixed with the layer number, e.g. `shadow-100-offset-x-01`.
 *
 * @param name - The shadow token variable name
 * @param shadow - The shadow CSS value, layers separated by `, ` and colors not yet transformed to variables
 * @param tokenPrefix - The CSS variable prefix
 * @returns {string} The shadow with lengths replaced by `var(--{prefix}{name}-{length}, {value})`
 */
export const transformShadowLengthsToVariables = (name: string, shadow: string, tokenPrefix: string): string => {
  const layers = shadow.split(SHADOW_LAYER_SEPARATOR);

  return layers
    .map((layer, index) => {
      const layerSuffix = `-${(index + 1).toString().padStart(2, '0')}`;

      return layer.replace(SHADOW_LAYER_LENGTHS_REGEX, (_, inset: string | undefined, ...lengths: string[]) => {
        const variables = SHADOW_LENGTH_NAMES.map(
          (lengthName, lengthIndex) =>
            `var(--${tokenPrefix}${name}-${lengthName}${layerSuffix}, ${lengths[lengthIndex]})`,
        );

        return `${inset ?? ''}${variables.join(' ')}`;
      });
    })
    .join(SHADOW_LAYER_SEPARATOR);
};

/**
 * Processes shadow tokens (with length and color variable transformation and px->rem conversion).
 *
 * @param shadowToken - The shadow token to process
 * @param ctx - Processing context with token groups, prefix, fontSizeBaseMap, and output options
 * @returns {string|null} Formatted token style string or null
 */
export const processShadowToken = (shadowToken: ShadowToken, ctx: ShadowTokenProcessorContext): string | null => {
  const { tokenGroups, hasParentPrefix, hasJsOutput, tokenPrefix, mappedTokens, fontSizeBaseMap } = ctx;
  const name = tokenVariableName(shadowToken, tokenGroups, hasParentPrefix);
  const { value, origin } = shadowToken;

  let shadow = CSSHelper.shadowTokenValueToCSS(value, mappedTokens as unknown as Map<string, never>, {
    allowReferences: true,
    decimals: 3,
    colorFormat: ColorFormat.hashHex8,
    tokenToVariableRef: () => '',
  });

  // add group name to the variable if it is not already in the name
  const groupName = hasParentPrefix ? undefined : origin?.name?.split('/')[0].toLowerCase();
  shadow = transformShadowLengthsToVariables(name, shadow, tokenPrefix);
  shadow = transformColorsToVariables(name, shadow, tokenPrefix, groupName); // add color variables
  shadow = findAllHexColorsInStringAndNormalize(shadow); // find hex codes and normalize them
  const baseFontSize = getBaseFontSize(fontSizeBaseMap, shadowToken);
  shadow = replacePxWithRem(shadow, baseFontSize); // replace px with rem units

  return formatTokenStyleByOutput(name, shadow, hasJsOutput);
};
