import type { ColorValue, CompositeValue, NumberValue, ReferenceValue, TokenValue } from '../../../core/types';

const HEX_RADIX = 16;
const HEX_CHANNEL_LENGTH = 2;

const toHexChannel = (channel: number): string =>
  Math.round(channel).toString(HEX_RADIX).padStart(HEX_CHANNEL_LENGTH, '0');

/**
 * The one color format every color of the exporter is rendered from: hex with alpha (`#rrggbbaa`), so nothing is lost.
 * Channels and alpha are rounded the way Supernova's own hex formatting does.
 *
 * @param channels - Red, green, blue and alpha, each in 0..255
 * @param channels.r
 * @param channels.g
 * @param channels.b
 * @param channels.a
 */
export const mapHexColor = ({ r, g, b, a }: { r: number; g: number; b: number; a: number }): ColorValue => ({
  type: 'color',
  format: 'hex',
  value: `#${toHexChannel(r)}${toHexChannel(g)}${toHexChannel(b)}${toHexChannel(a)}`,
});

export const mapNumber = (value: number, unit?: string): NumberValue => ({ type: 'number', value, unit });

export const mapComposite = (value: Record<string, TokenValue>): CompositeValue => ({ type: 'composite', value });

export const mapPoint = ({ x, y }: { x: number; y: number }): CompositeValue =>
  mapComposite({ x: mapNumber(x), y: mapNumber(y) });

/**
 * Layers (of a shadow or a gradient) become a composite keyed by layer index.
 *
 * @param layers
 */
export const mapLayers = (layers: TokenValue[]): CompositeValue =>
  mapComposite(Object.fromEntries(layers.map((layer, layerIndex) => [String(layerIndex), layer])));

/**
 * Wraps a value in a reference when the native value points at another token, keeping the value the source already
 * computed as `resolved`, which wins over the referenced token's own value.
 *
 * @param referencedTokenId
 * @param value
 */
export const withReference = (referencedTokenId: string | null | undefined, value: TokenValue): TokenValue =>
  referencedTokenId
    ? ({ type: 'reference', tokenId: referencedTokenId, resolved: value } satisfies ReferenceValue)
    : value;
