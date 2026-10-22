import {
  BorderToken,
  BorderWidthToken,
  ColorToken,
  DimensionToken,
  FontSizeToken,
  GradientToken,
  LetterSpacingToken,
  LineHeightToken,
  RadiusToken,
  ShadowToken,
  SizeToken,
  SpaceToken,
  StringToken,
  Token,
  TokenGroup,
  TokenType,
} from '@supernovaio/sdk-exporters';
import {
  addEmptyLineBetweenTokenGroups,
  formatTokenStyleByOutput,
  sortTokens,
  tokenVariableName,
} from '../helpers/tokenHelper';
import { type FontSizeBaseMap, createDefaultFontSizeBaseMap } from '../helpers/unitHelper';
import {
  processNumericToken,
  processBorderToken,
  processStringToken,
  processColorToken,
  processShadowToken,
  processGradientToken,
} from '../tokenProcessors';

export const tokenToStyleByType = (
  token: Token,
  mappedTokens: Map<string, unknown>,
  tokenGroups: Array<TokenGroup>,
  tokenPrefix: string,
  hasMixin: boolean,
  hasParentPrefix: boolean,
  hasJsOutput: boolean,
  fontSizeBaseMap: FontSizeBaseMap,
): string | null => {
  const processorContext = {
    tokenGroups,
    hasParentPrefix,
    hasJsOutput,
    fontSizeBaseMap,
    tokenPrefix,
    hasMixin,
    mappedTokens,
  };

  switch (token.tokenType) {
    case TokenType.dimension:
      return processNumericToken(token as DimensionToken, TokenType.dimension, processorContext);
    case TokenType.radius:
      return processNumericToken(token as RadiusToken, TokenType.radius, processorContext);
    case TokenType.space:
      return processNumericToken(token as SpaceToken, TokenType.space, processorContext);
    case TokenType.size:
      return processNumericToken(token as SizeToken, TokenType.size, processorContext);
    case TokenType.fontSize:
      return processNumericToken(token as FontSizeToken, TokenType.fontSize, processorContext);
    case TokenType.lineHeight:
      return processNumericToken(token as LineHeightToken, TokenType.lineHeight, processorContext);
    case TokenType.letterSpacing:
      return processNumericToken(token as LetterSpacingToken, TokenType.letterSpacing, processorContext);
    case TokenType.border:
      return processBorderToken(token as BorderToken, processorContext);
    case TokenType.borderWidth:
      return processBorderToken(token as BorderWidthToken, processorContext);
    case TokenType.string:
      return processStringToken(token as StringToken, processorContext);
    case TokenType.color:
      return processColorToken(token as ColorToken, processorContext);
    case TokenType.shadow:
      return processShadowToken(token as ShadowToken, processorContext);
    case TokenType.gradient:
      return processGradientToken(token as GradientToken, processorContext);
    default:
      return null;
  }
};

export const generateCssVariableReferencesFromTokens = (
  tokens: Token[],
  tokenGroups: Array<TokenGroup>,
  tokenPrefix: string,
  cssVariablePrefix: string,
  hasParentPrefix: boolean,
  sortByNumValue: boolean,
  hasJsOutput: boolean,
): string => {
  const sortedTokens = sortTokens(tokens, tokenGroups, hasParentPrefix, sortByNumValue);

  const cssTokens = sortedTokens.map((token) => {
    const name = tokenVariableName(token, tokenGroups, hasParentPrefix);
    const cssVariableName = `var(--${tokenPrefix}${cssVariablePrefix}${name})`;

    return {
      css: hasJsOutput ? formatTokenStyleByOutput(name, cssVariableName, true) : `$${name}: ${cssVariableName};`,
      parentGroupId: token.parentGroupId,
    };
  });

  return addEmptyLineBetweenTokenGroups(cssTokens);
};

export const generateStylesFromTokens = (
  tokens: Token[],
  mappedTokens: Map<string, Token>,
  tokenGroups: Array<TokenGroup>,
  tokenPrefix: string,
  hasMixin: boolean,
  hasParentPrefix: boolean,
  sortByNumValue: boolean,
  hasJsOutput: boolean,
  fontSizeBaseMap: FontSizeBaseMap = createDefaultFontSizeBaseMap(),
): string => {
  const sortedTokens = sortTokens(tokens, tokenGroups, hasParentPrefix, sortByNumValue);

  const cssTokens = sortedTokens.map((token) => ({
    css: tokenToStyleByType(
      token,
      mappedTokens,
      tokenGroups,
      tokenPrefix,
      hasMixin,
      hasParentPrefix,
      hasJsOutput,
      fontSizeBaseMap,
    ),
    parentGroupId: token.parentGroupId,
  }));

  return addEmptyLineBetweenTokenGroups(cssTokens);
};
