import {
  CollectionKind,
  type DesignToken,
  type ThemedDesignTokens,
  TokenTypeEnum,
  type TokenCollection,
} from './types';

/** Tokens of a `TokenCollection` grouped by what the generators need. Does not depend on any source. */
export type SplitTokens = {
  /** Tokens of the global collection, shared by every theme and device. */
  globalTokens: DesignToken[];
  /**
   * The tokens the themes override, not resolved for a theme (a source of the files common to all themes): every
   * token that is not a color, and the colors of the color collection. The colors of other collections are
   * lookup-only and left out. A source must set `metadata.collection` on its tokens: the global string prefix
   * token reaches the theme files through this list, whatever its collection.
   */
  colorTokens: DesignToken[];
  /** Color themes in the order of the source (the first one is the default), each with its resolved tokens. */
  themes: ThemedDesignTokens[];
  /** Resolved tokens of all devices, each with `metadata.device`. */
  deviceTokens: DesignToken[];
};

/**
 * Groups the tokens of a collection by `metadata.collection`; the themed and device tokens are already resolved.
 *
 * @param collection
 */
export const splitTokens = (collection: TokenCollection): SplitTokens => {
  const { tokens, themedTokens, deviceTokens } = collection;

  return {
    globalTokens: tokens.filter(({ metadata }) => metadata.collection === CollectionKind.Global),
    colorTokens: tokens.filter(
      ({ type, metadata }) => type !== TokenTypeEnum.Color || metadata.collection === CollectionKind.Color,
    ),
    themes: themedTokens,
    deviceTokens,
  };
};
