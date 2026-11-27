import { type CollectionKind, type DesignToken, type TokenTypeEnum, type TokenValue } from '../../../core/types';
import { mapHexColor, withReference as wrapReference } from './valueBuilders';
import type { DiagnosticCollector } from '../diagnostics';
import type { FigmaRgba, FigmaVariable } from '../types';

/** What the mappers share for one Figma file. */
export type MapContext = {
  variablesById: Map<string, FigmaVariable>;
  diagnostics: DiagnosticCollector;
  brandId?: string;
};

export const FIGMA_ADAPTER_NAME = 'figma';

const MAX_CHANNEL = 255;

const toChannel = (channel: number): number => Math.min(1, Math.max(0, channel)) * MAX_CHANNEL;

/**
 * Figma colors have channels in 0..1, the shared hex color in 0..255.
 *
 * @param color
 */
export const mapColor = (color: FigmaRgba): TokenValue =>
  mapHexColor({ r: toChannel(color.r), g: toChannel(color.g), b: toChannel(color.b), a: toChannel(color.a) });

/**
 * Wraps a value in a reference when it came from an alias, keeping the value computed from the Figma data as
 * `resolved` (it wins over the referenced token's own value). A token id is the id of its variable, whatever the mode:
 * the value of a mode is carried by the themed and device tokens of the collection.
 *
 * The target may live in a collection that is not exported (Primitives); `keepKnownReferences` later replaces such a
 * reference with its `resolved` value.
 *
 * @param value
 * @param alias - Figma id of the aliased variable, if any
 */
export const withReference = (value: TokenValue, alias: string | undefined): TokenValue => wrapReference(alias, value);

export type TokenParts = {
  id: string;
  path: string[];
  type: TokenTypeEnum;
  value: TokenValue;
  originalId: string;
  originalType: string;
  description?: string;
  collection?: CollectionKind;
  theme?: string;
  device?: string;
};

/**
 * Builds the `DesignToken` envelope every mapper shares: the last part of the Figma name is the token's name, the
 * rest its group path, and the whole name its origin name.
 *
 * @param parts
 * @param context
 */
export const buildDesignToken = (parts: TokenParts, context: MapContext): DesignToken => ({
  id: parts.id,
  name: parts.path.at(-1) ?? parts.id,
  type: parts.type,
  value: parts.value,
  description: parts.description || undefined,
  metadata: {
    brandId: context.brandId,
    collection: parts.collection,
    theme: parts.theme,
    device: parts.device,
    groupPath: parts.path.slice(0, -1),
    originName: parts.path.join('/'),
  },
  source: {
    adapter: FIGMA_ADAPTER_NAME,
    originalId: parts.originalId,
    originalType: parts.originalType,
  },
});
