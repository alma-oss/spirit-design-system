import type { DesignToken } from './DesignToken';

export type TokenGroup = {
  id: string;
  name: string;
  path: string[];
  /** A root group is the container of a token type, not a part of a token's name. */
  isRoot?: boolean;
  parentId?: string;
};

/**
 * Source-neutral kind of a collection (a Figma variable collection, a Supernova `Collection` option):
 * - `global`: values shared by every theme and device,
 * - `color`: values a theme overrides,
 * - `devices`: values a device (e.g. mobile, tablet, desktop) overrides.
 */
export enum CollectionKind {
  Global = 'global',
  Color = 'color',
  Devices = 'devices',
}

export type Theme = {
  id: string;
  name: string;
  /** Code-friendly name, e.g. 'dark'. Unset when the source has none; use `name` then. */
  codeName?: string;
  /** The collection this theme (a Figma mode) belongs to: `devices` for a device theme, `color` otherwise. */
  collection?: CollectionKind;
  /** Set for a device theme (`collection` is `devices`), e.g. 'mobile'. Same as the `device` of its tokens. */
  device?: string;
  brandId?: string;
  isDefault?: boolean;
};

/** A device (e.g. a Figma mode of the devices collection) the tokens can be overridden for. */
export type Device = {
  name: string;
  themeId: string;
};

export type ThemedDesignTokens = {
  theme: Theme;
  /** Tokens with the theme applied. */
  tokens: DesignToken[];
};

export type CollectionMetadata = {
  /** Adapter that produced this collection, e.g. 'supernova', 'figma'. */
  source: string;
  fetchedAt: Date;
};

/**
 * Everything a source adapter fetches for one export run, already mapped
 * to the internal, source-agnostic model.
 */
export type TokenCollection = {
  /** Tokens as the source has them, one per id and not resolved for any theme or device. */
  tokens: DesignToken[];
  /** Tokens resolved for each color theme, in the order of `themes` (the first one is the default). */
  themedTokens: ThemedDesignTokens[];
  /** Tokens resolved for the devices, each with `metadata.device`. */
  deviceTokens: DesignToken[];
  groups: TokenGroup[];
  themes: Theme[];
  devices: Device[];
  /** The brand all tokens belong to, one per source file (see ADR 014). */
  brandId?: string;
  metadata: CollectionMetadata;
};
