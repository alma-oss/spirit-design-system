import { withResolvedValue } from '../core/resolveToken';
import { type DesignToken, type TokenIndex, TokenTypeEnum, type FontSizeBaseMap } from '../core/types';
import {
  addEmptyLineBetweenTokenGroups,
  cssVariableReference,
  formatCssVariableReference,
  getGroupKey,
  sortTokens,
  tokenVariableName,
} from '../helpers/tokenHelper';
import { createDefaultFontSizeBaseMap } from '../helpers/unitHelper';
import {
  processNumericToken,
  processBorderToken,
  processStringToken,
  processColorToken,
  processShadowToken,
  processGradientToken,
} from '../tokenProcessors';

export const tokenToStyleByType = (
  token: DesignToken,
  tokenIndex: TokenIndex,
  tokenPrefix: string,
  hasParentPrefix: boolean,
  hasJsOutput: boolean,
  fontSizeBaseMap: FontSizeBaseMap,
): string | null => {
  const processorContext = {
    hasParentPrefix,
    hasJsOutput,
    fontSizeBaseMap,
    tokenPrefix,
    tokenIndex,
  };

  switch (token.type) {
    case TokenTypeEnum.Dimension:
    case TokenTypeEnum.Radius:
    case TokenTypeEnum.Space:
    case TokenTypeEnum.Size:
    case TokenTypeEnum.FontSize:
    case TokenTypeEnum.LineHeight:
    case TokenTypeEnum.LetterSpacing:
      return processNumericToken(withResolvedValue(token), processorContext);
    case TokenTypeEnum.Border:
    case TokenTypeEnum.BorderWidth:
      return processBorderToken(withResolvedValue(token), processorContext);
    case TokenTypeEnum.String:
      return processStringToken(withResolvedValue(token), processorContext);
    case TokenTypeEnum.Color:
      return processColorToken(token, processorContext);
    case TokenTypeEnum.Shadow:
      return processShadowToken(token, processorContext);
    case TokenTypeEnum.Gradient:
      return processGradientToken(token, processorContext);
    default:
      return null;
  }
};

export const generateCssVariableReferencesFromTokens = (
  tokens: DesignToken[],
  tokenPrefix: string,
  cssVariablePrefix: string,
  hasParentPrefix: boolean,
  sortByNumValue: boolean,
  hasJsOutput: boolean,
): string => {
  const sortedTokens = sortTokens(tokens, hasParentPrefix, sortByNumValue);

  const cssTokens = sortedTokens.map((token) => {
    const name = tokenVariableName(token, hasParentPrefix);

    return {
      css: formatCssVariableReference(name, cssVariableReference(tokenPrefix, cssVariablePrefix, name), hasJsOutput),
      parentGroupId: getGroupKey(token),
    };
  });

  return addEmptyLineBetweenTokenGroups(cssTokens);
};

export const generateStylesFromTokens = (
  tokens: DesignToken[],
  tokenIndex: TokenIndex,
  tokenPrefix: string,
  hasParentPrefix: boolean,
  sortByNumValue: boolean,
  hasJsOutput: boolean,
  fontSizeBaseMap: FontSizeBaseMap = createDefaultFontSizeBaseMap(),
): string => {
  const sortedTokens = sortTokens(tokens, hasParentPrefix, sortByNumValue);

  const cssTokens = sortedTokens.map((token) => ({
    css: tokenToStyleByType(token, tokenIndex, tokenPrefix, hasParentPrefix, hasJsOutput, fontSizeBaseMap),
    parentGroupId: getGroupKey(token),
  }));

  return addEmptyLineBetweenTokenGroups(cssTokens);
};
