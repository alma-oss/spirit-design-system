import { getTokenAlias, normalizeFirstNamePart } from '../helpers/objectHelper';
import { tokenVariableName } from '../helpers/tokenHelper';
import { toCamelCase, toOutputName, toPlural } from '../helpers/stringHelper';
import type { DesignToken, StylesObjectType } from '../core/types';

export const handleNonTypographyTokens = (
  tokenNameParts: string[],
  token: DesignToken,
  hasParentPrefix: boolean,
  stylesObjectRef: StylesObjectType,
  hasJsOutput = false,
): void => {
  let currentObject = stylesObjectRef;

  tokenNameParts.forEach((part, index) => {
    const modifiedPart = index === 0 ? normalizeFirstNamePart(part, token.type, hasJsOutput) : part;

    if (index === tokenNameParts.length - 1) {
      const tokenValue = hasJsOutput
        ? `${toCamelCase(tokenVariableName(token, hasParentPrefix))}`
        : `$${tokenVariableName(token, hasParentPrefix)}`;
      const tokenAlias = getTokenAlias(token, hasJsOutput);
      const rootTokenAlias = hasJsOutput ? toPlural(tokenAlias) : `$${toPlural(tokenAlias)}`;
      const device = token.metadata.device ?? '';
      const devicePart = hasJsOutput ? toCamelCase(device) : device.toLowerCase();

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
