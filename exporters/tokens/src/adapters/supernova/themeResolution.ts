import { type Token, type TokenTheme, TokenType } from '@supernovaio/sdk-exporters';
import { TOKEN_COLLECTION_THEMES_NAME } from './constants';
import { getDeviceCollectionId } from './collectionKind';
import { filterCollections, filterDeviceCollections, filterThemesByCollection } from './collectionsHelper';
import { getDeviceThemes } from './deviceThemes';

export type ThemedTokens = {
  theme: TokenTheme;
  /** Tokens with the theme applied. */
  tokens: Token[];
};

/**
 * The native tokens with the themes applied and split by collection. Stays inside the adapter, which maps it to the
 * internal model (see `SupernovaAdapter.fetchTokens`), so the pipeline does not depend on the SDK.
 */
export type ResolvedTokens = {
  /** Color themes, each with its resolved tokens. The first one is the default theme. */
  themes: ThemedTokens[];
  /** Tokens of all devices, resolved and marked with the device they belong to. */
  deviceTokens: Token[];
};

/**
 * Keeps all non-color tokens and only those color tokens that belong to the themes collection.
 *
 * @param tokens - Array of tokens to filter.
 */
export const filterColorCollections = (tokens: Token[]): Token[] => {
  const themeTokens = new Set(filterCollections(tokens, TOKEN_COLLECTION_THEMES_NAME));

  return tokens.filter((item) => item.tokenType !== TokenType.color || themeTokens.has(item));
};

/** Applies a theme to the tokens of the given collections, `sdk.tokens.computeTokensByApplyingThemes` in practice. */
export type ApplyTheme = (tokens: Token[], collections: Token[], theme: TokenTheme) => Token[];

/**
 * Applies the themes to the tokens and splits the result by collection. Works with the data it gets only, the way
 * a theme is applied is passed in.
 *
 * @param tokens
 * @param themes
 * @param applyTheme
 */
export const resolveTokens = (tokens: Token[], themes: TokenTheme[], applyTheme: ApplyTheme): ResolvedTokens => {
  const colorCollections = filterColorCollections(tokens);
  const deviceCollections = filterDeviceCollections(tokens);
  const deviceCollectionId = getDeviceCollectionId(tokens);

  // Themes of the color collections, without the device themes
  const colorThemes = filterThemesByCollection(themes, deviceCollectionId, true);
  // Themes of the device collection
  const deviceThemes = filterThemesByCollection(themes, deviceCollectionId, false);

  return {
    themes: colorThemes.map((theme) => ({ theme, tokens: applyTheme(tokens, colorCollections, theme) })),
    deviceTokens: getDeviceThemes(
      deviceThemes.map((theme) => ({ theme, deviceTokens: applyTheme(tokens, deviceCollections, theme) })),
    ),
  };
};
