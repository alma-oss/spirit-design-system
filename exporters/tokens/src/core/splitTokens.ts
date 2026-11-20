import { CollectionKind, type DesignToken, type ThemedDesignTokens, type TokenCollection } from './types';

/** Tokens of a `TokenCollection` grouped by what the generators need. Does not depend on any source. */
export type SplitTokens = {
  /** Tokens of the global collection, shared by every theme and device. */
  globalTokens: DesignToken[];
  /** Tokens of the color collection that are not resolved for a theme. */
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
    colorTokens: tokens.filter(({ metadata }) => metadata.collection === CollectionKind.Color),
    themes: themedTokens,
    deviceTokens,
  };
};
