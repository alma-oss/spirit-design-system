import {
  type DesignToken,
  type DeviceDimensionMap,
  type FontReplacement,
  type StylesObjectType,
  type TokenIndex,
  TokenTypeEnum,
  type FontSizeBaseMap,
} from '../core/types';
import { deepMergeObjects } from '../helpers/objectHelper';
import { getOriginPathParts, sortTokens } from '../helpers/tokenHelper';
import {
  handleNonTypographyTokens,
  handleTypographyTokens,
  addGlobalColorsToStylesObject,
  addGlobalTypographyToStylesObject,
} from '../objectProcessors';

export const createStylesObjectStructureFromTokenNameParts = (
  token: DesignToken,
  hasParentPrefix: boolean,
  stylesObjectRef: StylesObjectType,
  hasJsOutput: boolean,
  deviceDimensions?: DeviceDimensionMap,
  fontSizeBaseMap?: FontSizeBaseMap,
  tokenIndex?: TokenIndex,
  fontReplacements: FontReplacement[] = [],
): StylesObjectType => {
  const { type: tokenType, name: tokenName } = token;
  const devicePart = token.metadata.device;
  let tokenNameParts: string[] = token.metadata.originName
    ? getOriginPathParts(token)
    : [...(token.metadata.namePath ?? token.metadata.groupPath), tokenName];

  if (tokenNameParts.length <= 1) {
    if (devicePart || tokenType === TokenTypeEnum.Typography) {
      tokenNameParts = [tokenName];
    } else {
      return stylesObjectRef;
    }
  }

  if (tokenType === TokenTypeEnum.Typography) {
    handleTypographyTokens(
      tokenNameParts,
      token,
      hasParentPrefix,
      stylesObjectRef,
      hasJsOutput,
      deviceDimensions,
      fontSizeBaseMap,
      tokenIndex,
      fontReplacements,
    );
  } else {
    handleNonTypographyTokens(tokenNameParts, token, hasParentPrefix, stylesObjectRef, hasJsOutput);
  }

  return stylesObjectRef;
};

export const generateStylesObjectFromTokens = (
  tokens: Array<DesignToken>,
  hasParentPrefix: boolean,
  hasJsOutput: boolean,
  sortByNumValue: boolean,
  deviceDimensions?: DeviceDimensionMap,
  fontSizeBaseMap?: FontSizeBaseMap,
  tokenIndex?: TokenIndex,
  fontReplacements: FontReplacement[] = [],
): StylesObjectType => {
  const sortedTokens = sortTokens(tokens, hasParentPrefix, sortByNumValue);
  const stylesObject = sortedTokens.reduce((stylesObjectAccumulator, token) => {
    const currentObject = createStylesObjectStructureFromTokenNameParts(
      token,
      hasParentPrefix,
      {},
      hasJsOutput,
      deviceDimensions,
      fontSizeBaseMap,
      tokenIndex,
      fontReplacements,
    );

    // Merge the current object into the accumulator
    return deepMergeObjects(stylesObjectAccumulator, currentObject);
  }, {} as StylesObjectType);

  // Add global colors object if there are any color keys
  const stylesObjectWithColors = addGlobalColorsToStylesObject(stylesObject, hasJsOutput);

  // Add global typography object if there are any typography keys
  return addGlobalTypographyToStylesObject(stylesObjectWithColors, hasJsOutput);
};
