import { Token, TokenGroup } from '@supernovaio/sdk-exporters';
import { getTokenAlias, normalizeFirstNamePart } from '../helpers/objectHelper';
import { getDeviceAlias } from '../helpers/deviceHelpers';
import { tokenVariableName } from '../helpers/tokenHelper';
import { toCamelCase, toOutputName, toPlural } from '../helpers/stringHelper';
import type { StylesObjectType } from '../core/types';

export const handleNonTypographyTokens = (
  tokenNameParts: string[],
  token: Token,
  tokenGroups: Array<TokenGroup>,
  hasParentPrefix: boolean,
  stylesObjectRef: StylesObjectType,
  hasJsOutput = false,
): void => {
  let currentObject = stylesObjectRef;

  tokenNameParts.forEach((part, index) => {
    const modifiedPart = index === 0 ? normalizeFirstNamePart(part, token.tokenType, hasJsOutput) : part;

    if (index === tokenNameParts.length - 1) {
      const tokenValue = hasJsOutput
        ? `${toCamelCase(tokenVariableName(token, tokenGroups, hasParentPrefix))}`
        : `$${tokenVariableName(token, tokenGroups, hasParentPrefix)}`;
      const tokenAlias = getTokenAlias(token, hasJsOutput);
      const rootTokenAlias = hasJsOutput ? toPlural(tokenAlias) : `$${toPlural(tokenAlias)}`;
      const devicePart = hasJsOutput ? toCamelCase(getDeviceAlias(token)) : getDeviceAlias(token).toLowerCase();

      if (devicePart !== '') {
        currentObject[index === 0 ? rootTokenAlias : tokenAlias] = { [devicePart]: tokenValue };
      } else {
        currentObject[tokenAlias] = tokenValue;
      }
    } else {
      const key = toOutputName(modifiedPart, hasJsOutput);
      currentObject[key] = currentObject[modifiedPart] || {};
      currentObject = currentObject[key] as StylesObjectType;
    }
  });
};
