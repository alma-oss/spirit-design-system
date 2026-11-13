import {
  type ColorToken,
  type ColorTokenValue,
  type GradientToken,
  type GradientTokenValue,
  GradientType,
  type ShadowToken,
  type ShadowTokenValue,
  ShadowType,
  type StringToken,
  type Token,
  type TokenGroup as SupernovaTokenGroup,
  TokenType,
  type TypographyToken,
  type Unit,
} from '@supernovaio/sdk-exporters';
import { PX_UNIT } from '../../../constants';
import { getDeviceAlias } from '../../../helpers/deviceHelpers';
import { getTokenGroupPath } from '../../../helpers/groupHelper';
import { unitToCss } from '../../../helpers/unitHelper';
import {
  type ColorValue,
  type CompositeValue,
  type DesignToken,
  type NumberValue,
  type ReferenceValue,
  type TokenMetadata,
  type TokenValue,
  type SourceMetadata,
  TokenTypeEnum,
} from '../../../core/types';

/**
 * Normalizes a Supernova unit enum value (e.g. `Unit.pixels`, "Pixels") to
 * the CSS unit string generators expect (e.g. "px"). Keeps `DesignToken`
 * values source-agnostic - a future adapter's unit representation would be
 * normalized the same way, at the adapter boundary, not left for every
 * consumer to know Supernova's raw enum.
 *
 * @param unit
 */
const normalizeUnit = (unit: unknown): string | undefined => (unit === undefined ? undefined : unitToCss(unit as Unit));

/** Numeric-value token whose measure/unit live directly on `token.value` (dimension, radius, space, size, fontSize, lineHeight, letterSpacing, borderWidth). */
type NumericValueToken = Token & { value?: { measure: number; unit: unknown } };

/**
 * `TokenType`s mapped to a plain numeric value so far. Grows one type at a
 * time as each numeric processor is migrated; see #DS-2335.
 */
const NUMERIC_TOKEN_TYPES: Partial<Record<TokenType, TokenTypeEnum>> = {
  [TokenType.dimension]: TokenTypeEnum.Dimension,
  [TokenType.radius]: TokenTypeEnum.Radius,
  [TokenType.space]: TokenTypeEnum.Space,
  [TokenType.size]: TokenTypeEnum.Size,
  [TokenType.fontSize]: TokenTypeEnum.FontSize,
  [TokenType.lineHeight]: TokenTypeEnum.LineHeight,
  [TokenType.letterSpacing]: TokenTypeEnum.LetterSpacing,
  [TokenType.borderWidth]: TokenTypeEnum.BorderWidth,
};

const buildMetadata = (token: Token, tokenGroups: Array<SupernovaTokenGroup>): TokenMetadata => ({
  brandId: token.brandId,
  device: getDeviceAlias(token) || undefined,
  groupPath: getTokenGroupPath(token, tokenGroups),
});

const buildSource = (token: Token): SourceMetadata => ({
  adapter: 'supernova',
  originalId: token.id,
  originalType: token.tokenType,
});

/**
 * Builds the `DesignToken` envelope every mapper shares; each mapper only decides the type and the value.
 *
 * @param token
 * @param tokenGroups
 * @param type
 * @param value
 */
const buildDesignToken = (
  token: Token,
  tokenGroups: Array<SupernovaTokenGroup>,
  type: TokenTypeEnum,
  value: TokenValue,
): DesignToken => ({
  id: token.id,
  name: token.name,
  type,
  value,
  description: token.description || undefined,
  metadata: buildMetadata(token, tokenGroups),
  source: buildSource(token),
});

const mapStringToken = (token: StringToken, tokenGroups: Array<SupernovaTokenGroup>): DesignToken =>
  buildDesignToken(token, tokenGroups, TokenTypeEnum.String, { type: 'string', value: token.value.text });

/**
 * Maps a numeric-value token. Returns `null` when the measure is missing,
 * matching `formatUnitValue`'s existing `value === undefined` handling -
 * callers should treat that the same as an unsupported type and read the
 * native value themselves, which resolves to the same `undefined`.
 *
 * @param token
 * @param type
 * @param tokenGroups
 */
const mapNumericToken = (
  token: NumericValueToken,
  type: TokenTypeEnum,
  tokenGroups: Array<SupernovaTokenGroup>,
): DesignToken | null => {
  const measure = token.value?.measure;
  if (measure === undefined) {
    return null;
  }

  return buildDesignToken(token, tokenGroups, type, {
    type: 'number',
    value: measure,
    unit: normalizeUnit(token.value?.unit),
  });
};

/**
 * Maps a `border` token. Only `.value.width` is mapped - `processBorderToken`
 * never reads color/position/style, so that's the only part that needs to
 * flow through the internal model for now. Returns `null` when the width
 * measure is missing, same convention as `mapNumericToken`.
 *
 * @param token
 * @param tokenGroups
 */
const mapBorderToken = (
  token: Token & { value?: { width?: { measure: number; unit: unknown } } },
  tokenGroups: Array<SupernovaTokenGroup>,
): DesignToken | null => {
  const measure = token.value?.width?.measure;
  if (measure === undefined) {
    return null;
  }

  return buildDesignToken(token, tokenGroups, TokenTypeEnum.Border, {
    type: 'number',
    value: measure,
    unit: normalizeUnit(token.value?.width?.unit),
  });
};

const HEX_RADIX = 16;
const HEX_CHANNEL_LENGTH = 2;
const MAX_CHANNEL = 255;

const toHexChannel = (channel: number): string =>
  Math.round(channel).toString(HEX_RADIX).padStart(HEX_CHANNEL_LENGTH, '0');

/**
 * Wraps a value in a reference when the native value points at another token, keeping the value the source already
 * computed as `resolved`. The processed token already carries its computed (theme-applied) value, whereas the token
 * map references are looked up in holds the untouched originals, so that value must win over the referenced token's
 * own one.
 *
 * @param referencedTokenId
 * @param value
 */
const withReference = (referencedTokenId: string | null | undefined, value: TokenValue): TokenValue =>
  referencedTokenId
    ? ({ type: 'reference', tokenId: referencedTokenId, resolved: value } satisfies ReferenceValue)
    : value;

/**
 * Maps a native color to a `hex` color with alpha (`#rrggbbaa`) - the one format every color of this exporter is
 * rendered from, so nothing is lost. Channels and alpha are rounded the way Supernova's own hex formatting does.
 *
 * @param color
 * @param opacity - Overrides the color's own opacity (a shadow layer carries a separate one)
 */
const mapColorValue = (color: ColorTokenValue, opacity: number = color.opacity.measure): TokenValue => {
  const { r, g, b } = color.color;
  const value: ColorValue = {
    type: 'color',
    format: 'hex',
    value: `#${toHexChannel(r)}${toHexChannel(g)}${toHexChannel(b)}${toHexChannel(MAX_CHANNEL * opacity)}`,
  };

  return withReference(color.referencedTokenId, value);
};

const mapNumber = (value: number, unit?: string): NumberValue => ({ type: 'number', value, unit });

const mapPoint = ({ x, y }: { x: number; y: number }): CompositeValue => ({
  type: 'composite',
  value: { x: mapNumber(x), y: mapNumber(y) },
});

/**
 * Layers (of a shadow or a gradient) become a composite keyed by layer index.
 *
 * @param layers
 */
const mapLayers = (layers: TokenValue[]): CompositeValue => ({
  type: 'composite',
  value: Object.fromEntries(layers.map((layer, layerIndex) => [String(layerIndex), layer])),
});

const mapShadowLayer = (layer: ShadowTokenValue): TokenValue =>
  withReference(layer.referencedTokenId, {
    type: 'composite',
    value: {
      inset: { type: 'boolean', value: layer.type === ShadowType.inner },
      x: mapNumber(layer.x, PX_UNIT),
      y: mapNumber(layer.y, PX_UNIT),
      blur: mapNumber(layer.radius, PX_UNIT),
      spread: mapNumber(layer.spread, PX_UNIT),
      color: mapColorValue(layer.color, layer.opacity?.measure),
    },
  });

const GRADIENT_TYPES: Partial<Record<GradientType, string>> = {
  [GradientType.linear]: 'linear',
  [GradientType.radial]: 'radial',
  [GradientType.angular]: 'angular',
};

const mapGradientLayer = (layer: GradientTokenValue): TokenValue =>
  withReference(layer.referencedTokenId, {
    type: 'composite',
    value: {
      // An unknown native type renders as linear, same as Supernova's own helper does.
      type: { type: 'string', value: GRADIENT_TYPES[layer.type] ?? 'linear' },
      from: mapPoint(layer.from),
      to: mapPoint(layer.to),
      stops: mapLayers(
        layer.stops.map((stop) => ({
          type: 'composite',
          value: { position: mapNumber(stop.position), color: mapColorValue(stop.color) },
        })),
      ),
    },
  });

/**
 * Maps a `color` token to a `hex` color value; shadows and gradients map to composites (see `formatShadowValue` /
 * `formatGradientValue` for the shape). A native `referencedTokenId` becomes a reference.
 *
 * @param token
 * @param tokenGroups
 */
const mapColorToken = (token: ColorToken, tokenGroups: Array<SupernovaTokenGroup>): DesignToken =>
  buildDesignToken(token, tokenGroups, TokenTypeEnum.Color, mapColorValue(token.value));

const mapShadowToken = (token: ShadowToken, tokenGroups: Array<SupernovaTokenGroup>): DesignToken =>
  buildDesignToken(token, tokenGroups, TokenTypeEnum.Shadow, mapLayers(token.value.map(mapShadowLayer)));

const mapGradientToken = (token: GradientToken, tokenGroups: Array<SupernovaTokenGroup>): DesignToken =>
  buildDesignToken(token, tokenGroups, TokenTypeEnum.Gradient, mapLayers(token.value.map(mapGradientLayer)));

type NativeDimension = { measure: number; unit: unknown; referencedTokenId?: string | null };

/**
 * Maps a font size or a line height of a typography. Returns `undefined` when the style has none, so the member is
 * left out. A native `referencedTokenId` (the dimension a device collection overrides) becomes a reference.
 *
 * @param dimension
 */
const mapTypographyDimension = (dimension: NativeDimension | null | undefined): TokenValue | undefined =>
  dimension?.measure === undefined
    ? undefined
    : withReference(dimension.referencedTokenId, mapNumber(dimension.measure, normalizeUnit(dimension.unit)));

/**
 * Maps a `typography` token to a composite of the members the exporter reads (see `core/typography.ts` for the
 * shape): font family, font weight, font size and line height.
 *
 * @param token
 * @param tokenGroups
 */
const mapTypographyToken = (token: TypographyToken, tokenGroups: Array<SupernovaTokenGroup>): DesignToken => {
  const { fontFamily, fontWeight, fontSize, lineHeight } = token.value;
  const members: Record<string, TokenValue | undefined> = {
    fontFamily: { type: 'string', value: fontFamily.text },
    fontWeight: { type: 'string', value: fontWeight.text },
    fontSize: mapTypographyDimension(fontSize),
    lineHeight: mapTypographyDimension(lineHeight),
  };

  return buildDesignToken(token, tokenGroups, TokenTypeEnum.Typography, {
    type: 'composite',
    value: Object.fromEntries(Object.entries(members).filter((entry): entry is [string, TokenValue] => !!entry[1])),
  });
};

/**
 * Maps a Supernova token to the internal model. Only `string`, `color`, `shadow`, `gradient`, `typography` tokens,
 * `border`, and the numeric types listed in `NUMERIC_TOKEN_TYPES` are supported so far -
 * other types return `null` and are filtered out by the adapter, the same way
 * `stylesGenerator.tokenToStyleByType` silently skips types it doesn't have a
 * case for. Support is added type by type as each generator/processor is
 * migrated to consume `DesignToken` directly.
 *
 * @param token
 * @param tokenGroups
 */
export const mapToken = (token: Token, tokenGroups: Array<SupernovaTokenGroup>): DesignToken | null => {
  if (token.tokenType === TokenType.string) {
    return mapStringToken(token as StringToken, tokenGroups);
  }

  if (token.tokenType === TokenType.border) {
    return mapBorderToken(token, tokenGroups);
  }

  if (token.tokenType === TokenType.color) {
    return mapColorToken(token as ColorToken, tokenGroups);
  }

  if (token.tokenType === TokenType.shadow) {
    return mapShadowToken(token as ShadowToken, tokenGroups);
  }

  if (token.tokenType === TokenType.gradient) {
    return mapGradientToken(token as GradientToken, tokenGroups);
  }

  if (token.tokenType === TokenType.typography) {
    return mapTypographyToken(token as TypographyToken, tokenGroups);
  }

  const numericType = NUMERIC_TOKEN_TYPES[token.tokenType];
  if (numericType) {
    return mapNumericToken(token, numericType, tokenGroups);
  }

  return null;
};
