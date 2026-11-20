import { type Token, type TokenTheme } from '@supernovaio/sdk-exporters';
import {
  filterDeviceCollections,
  filterGlobalCollections,
  filterThemesByCollection,
} from '../../helpers/collectionsHelper';
import { filterColorCollections } from '../../helpers/colorHelper';
import { getDeviceThemes } from '../../helpers/deviceHelpers';
import { getDeviceCollectionId } from './collectionKind';

export type ThemedTokens = {
  theme: TokenTheme;
  /** Tokens with the theme applied. */
  tokens: Token[];
};

/**
 * Everything the pipeline needs to generate files, already resolved: Supernova's theme resolution and the split into
 * collections stay inside the adapter, so a pipeline reading it does not depend on the SDK.
 *
 * TODO: Express the tokens as `DesignToken` once the generators read the internal model (see `TokenCollection`).
 */
export type ResolvedTokens = {
  /** Tokens of the global collection, shared by every theme and device. */
  globalTokens: Token[];
  /** Tokens of the color collection, not resolved for a theme (a source of the files common to all themes). */
  colorTokens: Token[];
  /** Color themes, each with its resolved tokens. The first one is the default theme. */
  themes: ThemedTokens[];
  /** Tokens of all devices, resolved and marked with the device they belong to. */
  deviceTokens: Token[];
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
    globalTokens: filterGlobalCollections(tokens),
    colorTokens: colorCollections,
    themes: colorThemes.map((theme) => ({ theme, tokens: applyTheme(tokens, colorCollections, theme) })),
    deviceTokens: getDeviceThemes(
      deviceThemes.map((theme) => ({ theme, deviceTokens: applyTheme(tokens, deviceCollections, theme) })),
    ),
  };
};
