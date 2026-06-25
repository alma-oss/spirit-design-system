import { Token, TokenGroup, TokenType, Unit } from '@supernovaio/sdk-exporters';
import { getDeviceAlias } from '../helpers/deviceHelpers';
import { deepMergeObjects } from '../helpers/objectHelper';
import { sortTokens } from '../helpers/tokenHelper';
import type { FontSizeBaseMap } from '../helpers/unitHelper';
import {
  handleNonTypographyTokens,
  handleTypographyTokens,
  addGlobalColorsToStylesObject,
  addGlobalTypographyToStylesObject,
} from '../objectProcessors';

export type StylesObjectType = { [key: string]: (string | object) & { moveToTheEnd?: string } };

export type DeviceTypographyUnit = Unit.pixels | Unit.percent | Unit.rem;

export type DeviceDimensionValue = {
  measure: number;
  unit: DeviceTypographyUnit;
};

export type DeviceDimensionEntries = Record<string, DeviceDimensionValue>;

export type DeviceDimensionMap = Map<string, DeviceDimensionEntries>;

export const createStylesObjectStructureFromTokenNameParts = (
  token: Token,
  tokenGroups: Array<TokenGroup>,
  hasParentPrefix: boolean,
  stylesObjectRef: StylesObjectType,
  hasJsOutput: boolean,
  deviceDimensions?: DeviceDimensionMap,
  fontSizeBaseMap?: FontSizeBaseMap,
  tokenById?: Map<string, Token>,
): StylesObjectType => {
  const { tokenType, name: tokenName } = token;
  const devicePart = getDeviceAlias(token);
  let tokenNameParts: string[] = token.origin?.name?.split('/') || [];

  if (tokenNameParts.length <= 1) {
    if (devicePart || tokenType === TokenType.typography) {
      tokenNameParts = [tokenName];
    } else {
      return stylesObjectRef;
    }
  }

  if (tokenType === TokenType.typography) {
    handleTypographyTokens(
      tokenNameParts,
      token,
      tokenGroups,
      hasParentPrefix,
      stylesObjectRef,
      hasJsOutput,
      deviceDimensions,
      fontSizeBaseMap,
      tokenById,
    );
  } else {
    handleNonTypographyTokens(tokenNameParts, token, tokenGroups, hasParentPrefix, stylesObjectRef, hasJsOutput);
  }

  return stylesObjectRef;
};

export const generateStylesObjectFromTokens = (
  tokens: Array<Token>,
  tokenGroups: Array<TokenGroup>,
  hasParentPrefix: boolean,
  hasJsOutput: boolean,
  sortByNumValue: boolean,
  deviceDimensions?: DeviceDimensionMap,
  fontSizeBaseMap?: FontSizeBaseMap,
  tokenById?: Map<string, Token>,
): StylesObjectType => {
  const sortedTokens = sortTokens(tokens, tokenGroups, hasParentPrefix, sortByNumValue);
  const stylesObject = sortedTokens.reduce((stylesObjectAccumulator, token) => {
    const currentObject = createStylesObjectStructureFromTokenNameParts(
      token,
      tokenGroups,
      hasParentPrefix,
      {},
      hasJsOutput,
      deviceDimensions,
      fontSizeBaseMap,
      tokenById,
    );

    // Merge the current object into the accumulator
    return deepMergeObjects(stylesObjectAccumulator, currentObject);
  }, {} as StylesObjectType);

  // Add global colors object if there are any color keys
  const stylesObjectWithColors = addGlobalColorsToStylesObject(stylesObject, hasJsOutput);

  // Add global typography object if there are any typography keys
  return addGlobalTypographyToStylesObject(stylesObjectWithColors, hasJsOutput);
};
