import { rgbaToHex8 } from '../../../domain/color';
import { splitPath, toParamCase } from '../../../domain/naming';
import type {
  DiagnosticCollector,
  DomainToken,
  GradientValue,
  ShadowValue,
  TokenFamily,
  TypographyValue,
} from '../../../domain/types';
import type { TokenEffect, TokenPaint, TokenStyle } from './model';

const linearGradientAngle = (handles?: { x: number; y: number }[]): number => {
  if (!handles || handles.length < 2) {
    return 180;
  }

  const [start, end] = handles;
  const angle = (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI;

  return (angle + 90 + 360) % 360;
};

const isShadowEffect = (effect: TokenEffect): boolean =>
  (effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW') && effect.visible !== false;

const lineHeightUnit = (unit: string): 'px' | 'percent' | undefined => {
  if (unit === 'PIXELS') {
    return 'px';
  }

  if (unit === 'PERCENT') {
    return 'percent';
  }

  return undefined;
};

export const styleToToken = (
  style: TokenStyle,
  family: TokenFamily,
  diagnostics: DiagnosticCollector,
): DomainToken | undefined => {
  const path = splitPath(style.name);

  if (style.type === 'TEXT') {
    const fontStyleName = style.fontName?.style ?? '';
    const italic = /italic/i.test(fontStyleName) || /italic/i.test(style.name);
    const weightMatch = fontStyleName.replace(/italic/i, '').trim();
    const lineHeight = style.lineHeight ?? { unit: 'AUTO', value: 0 };
    const value: TypographyValue = {
      type: 'typography',
      fontFamily: style.fontName.family,
      fontSize: style.fontSize,
      fontSizeUnit: 'px',
      fontWeight: style.fontWeight ?? (weightMatch || 'Regular'),
      fontStyle: italic ? 'italic' : 'normal',
      lineHeight: lineHeight.unit === 'AUTO' ? undefined : lineHeight.value,
      lineHeightUnit: lineHeightUnit(lineHeight.unit),
    };

    return {
      id: style.id,
      path,
      name: path.at(-1) ?? style.name,
      family,
      kind: 'typography',
      value,
      remote: style.remote,
    };
  }

  if (style.type === 'EFFECT') {
    const layers = style.effects.filter(isShadowEffect).map((effect) => ({
      inset: effect.type === 'INNER_SHADOW',
      x: effect.offset?.x ?? 0,
      y: effect.offset?.y ?? 0,
      radius: effect.radius ?? 0,
      spread: effect.spread ?? 0,
      color: effect.color ? rgbaToHex8(effect.color) : '#000000ff',
    }));

    if (layers.length === 0) {
      diagnostics.warn(`Skipping unused effect style ${style.name}.`);

      return undefined;
    }

    const value: ShadowValue = { type: 'shadow', layers };

    return {
      id: style.id,
      path,
      name: path.at(-1) ?? style.name,
      family,
      kind: 'shadow',
      value,
      remote: style.remote,
    };
  }

  const gradientPaint = style.paints.find(
    (paint: TokenPaint) => paint.type.startsWith('GRADIENT_') && paint.visible !== false,
  );

  if (!gradientPaint || !gradientPaint.gradientStops?.length) {
    diagnostics.warn(`Skipping unused paint style ${style.name}.`);

    return undefined;
  }

  const value: GradientValue = {
    type: 'gradient',
    angle: Math.round(linearGradientAngle(gradientPaint.gradientHandlePositions)),
    stops: gradientPaint.gradientStops.map((stop) => ({
      position: stop.position,
      color: rgbaToHex8(stop.color),
    })),
  };

  return {
    id: style.id,
    path,
    name: path.at(-1) ?? toParamCase(style.name),
    family,
    kind: 'gradient',
    value,
    remote: style.remote,
  };
};
