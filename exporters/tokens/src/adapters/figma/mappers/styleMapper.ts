import { PX_UNIT } from '../../../constants';
import { type DesignToken, type TokenValue, TokenTypeEnum } from '../../../core/types';
import { isExcludedToken } from '../conventions';
import { splitPath } from '../naming';
import type { FigmaEffect, FigmaPaint, FigmaStyle, FigmaTextStyle } from '../types';
import {
  buildDesignToken,
  mapColor,
  mapComposite,
  mapLayers,
  mapNumber,
  withReference,
  type MapContext,
} from './context';

const PERCENT_UNIT = '%';
const DEFAULT_FROM = { x: 0.5, y: 0 };
const DEFAULT_TO = { x: 0.5, y: 1 };
const BLACK = { r: 0, g: 0, b: 0, a: 1 };

const GRADIENT_TYPES: Record<string, string> = {
  GRADIENT_LINEAR: 'linear',
  GRADIENT_RADIAL: 'radial',
  GRADIENT_ANGULAR: 'angular',
};

const mapPoint = ({ x, y }: { x: number; y: number }) => mapComposite({ x: mapNumber(x), y: mapNumber(y) });

/**
 * A font size or line height of a text style. One bound to a variable (the dimension a device collection overrides)
 * becomes a reference; the style's own number stays as the resolved value.
 *
 * @param value
 * @param unit
 * @param alias
 * @param context
 */
const mapDimension = (value: number, unit: string, alias: string | undefined, context: MapContext): TokenValue => {
  const number = mapNumber(value, unit);

  return alias === undefined
    ? number
    : withReference(number, alias, context, context.variablesById.get(alias)?.defaultModeId);
};

const mapTextStyle = (style: FigmaTextStyle, context: MapContext): TokenValue => {
  const { lineHeight } = style;
  const fontWeight = style.fontName.style || (style.fontWeight === undefined ? 'Regular' : String(style.fontWeight));
  const members: Record<string, TokenValue | undefined> = {
    fontFamily: { type: 'string', value: style.fontName.family },
    fontWeight: { type: 'string', value: fontWeight },
    fontSize: mapDimension(style.fontSize, PX_UNIT, style.boundVariables?.fontSize?.id, context),
    // `AUTO` has no value to export
    lineHeight:
      lineHeight.unit === 'AUTO' || lineHeight.value === undefined
        ? undefined
        : mapDimension(
            lineHeight.value,
            lineHeight.unit === 'PIXELS' ? PX_UNIT : PERCENT_UNIT,
            style.boundVariables?.lineHeight?.id,
            context,
          ),
  };

  return mapComposite(
    Object.fromEntries(
      Object.entries(members).filter((entry): entry is [string, TokenValue] => entry[1] !== undefined),
    ),
  );
};

const isShadowEffect = (effect: FigmaEffect): boolean =>
  (effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW') && effect.visible !== false;

const mapColorWithBinding = (color: FigmaEffect['color'], alias: string | undefined, context: MapContext): TokenValue =>
  withReference(mapColor(color ?? BLACK), alias, context);

const mapShadowLayer = (effect: FigmaEffect, context: MapContext): TokenValue =>
  mapComposite({
    inset: { type: 'boolean', value: effect.type === 'INNER_SHADOW' },
    x: mapNumber(effect.offset?.x ?? 0, PX_UNIT),
    y: mapNumber(effect.offset?.y ?? 0, PX_UNIT),
    blur: mapNumber(effect.radius ?? 0, PX_UNIT),
    spread: mapNumber(effect.spread ?? 0, PX_UNIT),
    color: mapColorWithBinding(effect.color, effect.boundVariables?.color?.id, context),
  });

const mapGradientLayer = (paint: FigmaPaint, context: MapContext): TokenValue => {
  const [from = DEFAULT_FROM, to = DEFAULT_TO] = paint.gradientHandlePositions ?? [];

  return mapComposite({
    // Unknown native types render as linear, same as the Supernova adapter does.
    type: { type: 'string', value: GRADIENT_TYPES[paint.type] ?? 'linear' },
    from: mapPoint(from),
    to: mapPoint(to),
    stops: mapLayers(
      (paint.gradientStops ?? []).map((stop) =>
        mapComposite({
          position: mapNumber(stop.position),
          // The paint's opacity applies on top of every stop's own alpha
          color: mapColorWithBinding(
            stop.color && { ...stop.color, a: stop.color.a * (paint.opacity ?? 1) },
            stop.boundVariables?.color?.id,
            context,
          ),
        }),
      ),
    ),
  });
};

/**
 * Maps a text style to a typography token, an effect style to a shadow and a paint style with a gradient to a
 * gradient. Unused effect and paint styles are skipped with a warning.
 *
 * @param style
 * @param context
 */
export const mapStyle = (style: FigmaStyle, context: MapContext): DesignToken | undefined => {
  const path = splitPath(style.name);
  const base = { id: style.id, path, originalId: style.id };

  if (style.type === 'TEXT') {
    if (isExcludedToken(path, TokenTypeEnum.Typography)) {
      return undefined;
    }

    return buildDesignToken(
      { ...base, type: TokenTypeEnum.Typography, value: mapTextStyle(style, context), originalType: 'TEXT' },
      context,
    );
  }

  if (isExcludedToken(path, TokenTypeEnum.Shadow)) {
    return undefined;
  }

  if (style.type === 'EFFECT') {
    const layers = style.effects.filter(isShadowEffect);

    if (layers.length === 0) {
      context.diagnostics.warn(`Skipping unused effect style ${style.name}.`);

      return undefined;
    }

    return buildDesignToken(
      {
        ...base,
        type: TokenTypeEnum.Shadow,
        value: mapLayers(layers.map((effect) => mapShadowLayer(effect, context))),
        originalType: 'EFFECT',
      },
      context,
    );
  }

  const gradients = style.paints.filter(
    (paint) => paint.type.startsWith('GRADIENT_') && paint.visible !== false && paint.gradientStops?.length,
  );

  if (gradients.length === 0) {
    context.diagnostics.warn(`Skipping unused paint style ${style.name}.`);

    return undefined;
  }

  return buildDesignToken(
    {
      ...base,
      type: TokenTypeEnum.Gradient,
      value: mapLayers(gradients.map((paint) => mapGradientLayer(paint, context))),
      originalType: 'PAINT',
    },
    context,
  );
};
