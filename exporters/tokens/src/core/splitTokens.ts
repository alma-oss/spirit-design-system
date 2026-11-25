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
   * token that is not a color, and the colors of the color collection. The colors of other collections (e.g.
   * `lookup`) are left out. A source must set `metadata.collection` on its tokens: the global string prefix
   * token reaches the theme files through this list, whatever its collection.
   */
  colorTokens: DesignToken[];
  /** Color themes in the order of the source (the first one is the default), each with its resolved tokens. */
  themes: ThemedDesignTokens[];
  /** Resolved tokens of all devices, each with `metadata.device`. */
  deviceTokens: DesignToken[];
};

/**
 * Fail loud when a source adapter forgot `metadata.collection`: without it a token quietly drops out of
 * `globalTokens` (e.g. `css-variable-prefix`), and every CSS variable loses its prefix with no other error.
 *
 * @param tokens
 */
const assertCollectionMetadata = (tokens: DesignToken[]): void => {
  const missing = tokens.filter(({ metadata }) => metadata.collection === undefined).map(({ id }) => id);

  if (missing.length === 0) {
    return;
  }

  throw new Error(
    `Every token must set metadata.collection (missing on: ${missing.slice(0, 5).join(', ')}${
      missing.length > 5 ? `, … +${missing.length - 5} more` : ''
    }).`,
  );
};

/**
 * Groups the tokens of a collection by `metadata.collection`; the themed and device tokens are already resolved.
 *
 * @param collection
 */
export const splitTokens = (collection: TokenCollection): SplitTokens => {
  const { tokens, themedTokens, deviceTokens } = collection;

  assertCollectionMetadata([
    ...tokens,
    ...themedTokens.flatMap(({ tokens: themeTokens }) => themeTokens),
    ...deviceTokens,
  ]);

  return {
    globalTokens: tokens.filter(({ metadata }) => metadata.collection === CollectionKind.Global),
    colorTokens: tokens.filter(
      ({ type, metadata }) => type !== TokenTypeEnum.Color || metadata.collection === CollectionKind.Color,
    ),
    themes: themedTokens,
    deviceTokens,
  };
};
