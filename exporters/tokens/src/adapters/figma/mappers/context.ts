import type {
  CompositeValue,
  DesignToken,
  NumberValue,
  ReferenceValue,
  TokenTypeEnum,
  TokenValue,
} from '../../../core/types';
import { collectionFamily } from '../conventions';
import type { DiagnosticCollector } from '../diagnostics';
import type { FigmaCollection, FigmaRgba, FigmaVariable } from '../types';

/** What the mappers share for one Figma file. */
export type MapContext = {
  variablesById: Map<string, FigmaVariable>;
  collectionsById: Map<string, FigmaCollection>;
  diagnostics: DiagnosticCollector;
  brandId?: string;
};

export const FIGMA_ADAPTER_NAME = 'figma';

const HEX_RADIX = 16;
const HEX_CHANNEL_LENGTH = 2;
const MAX_CHANNEL = 255;

const toHexChannel = (channel: number): string =>
  Math.round(Math.min(1, Math.max(0, channel)) * MAX_CHANNEL)
    .toString(HEX_RADIX)
    .padStart(HEX_CHANNEL_LENGTH, '0');

/**
 * The one color format every color of the exporter is rendered from: hex with alpha (`#rrggbbaa`), like the
 * Supernova adapter hands over.
 *
 * @param color - Figma color, channels in 0..1
 */
export const mapColor = (color: FigmaRgba): TokenValue => ({
  type: 'color',
  format: 'hex',
  value: `#${toHexChannel(color.r)}${toHexChannel(color.g)}${toHexChannel(color.b)}${toHexChannel(color.a)}`,
});

export const mapNumber = (value: number, unit?: string): NumberValue => ({ type: 'number', value, unit });

export const mapComposite = (value: Record<string, TokenValue>): CompositeValue => ({ type: 'composite', value });

/**
 * Layers (of a shadow or a gradient) become a composite keyed by layer index, same as the Supernova adapter does.
 *
 * @param layers
 */
export const mapLayers = (layers: TokenValue[]): CompositeValue =>
  mapComposite(Object.fromEntries(layers.map((layer, index) => [String(index), layer])));

/**
 * Id of the token a variable becomes in a mode. A theme or device variable has one token per mode; any other variable
 * (global, or in a collection that is not exported) has one id.
 *
 * @param variable
 * @param collection
 * @param modeId
 */
export const tokenIdFor = (variable: FigmaVariable, collection: FigmaCollection, modeId: string): string => {
  const family = collectionFamily(collection.name);

  return family === 'theme' || family === 'device' ? `${variable.id}:${modeId}` : variable.id;
};

/**
 * Id of the token an alias points at, in the mode the alias was read in (the target's default mode when it has no
 * such mode). The target may live in a collection that is not exported (Primitives); the reference then relies on the
 * `resolved` value.
 *
 * @param targetId - Figma id of the aliased variable
 * @param context
 * @param modeId
 */
export const referencedTokenId = (targetId: string, context: MapContext, modeId?: string): string => {
  const target = context.variablesById.get(targetId);
  const collection = target ? context.collectionsById.get(target.collectionId) : undefined;

  if (!target || !collection) {
    return targetId;
  }

  const hasMode = modeId !== undefined && collection.modes.some((mode) => mode.id === modeId);

  return tokenIdFor(target, collection, hasMode ? modeId : collection.defaultModeId);
};

/**
 * Wraps a value in a reference when it came from an alias, keeping the value computed from the Figma data as
 * `resolved` (it wins over the referenced token's own value).
 *
 * @param value
 * @param alias - Figma id of the aliased variable, if any
 * @param context
 * @param modeId
 */
export const withReference = (
  value: TokenValue,
  alias: string | undefined,
  context: MapContext,
  modeId?: string,
): TokenValue =>
  alias === undefined
    ? value
    : ({
        type: 'reference',
        tokenId: referencedTokenId(alias, context, modeId),
        resolved: value,
      } satisfies ReferenceValue);

export type TokenParts = {
  id: string;
  path: string[];
  type: TokenTypeEnum;
  value: TokenValue;
  originalId: string;
  originalType: string;
  description?: string;
  theme?: string;
  device?: string;
};

/**
 * Builds the `DesignToken` envelope every mapper shares: the last part of the Figma name is the token's name, the
 * rest its group path.
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
    theme: parts.theme,
    device: parts.device,
    groupPath: parts.path.slice(0, -1),
  },
  source: {
    adapter: FIGMA_ADAPTER_NAME,
    originalId: parts.originalId,
    originalType: parts.originalType,
  },
});
