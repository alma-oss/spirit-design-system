import { PX_UNIT } from '../constants';
import { type ConcreteTokenValue, resolveValue } from '../core/resolveValue';
import type { ColorValue, CompositeValue, NumberValue, TokenIndex, TokenValue } from '../core/types';

/**
 * Renders color, shadow and gradient values of the internal token model as CSS.
 *
 * These formatters replace Supernova's `CSSHelper` for these types, so they only know the internal model. Every value
 * is read through `resolveValue`, so references (to other colors, shadows, ...) are followed through the `TokenIndex`.
 *
 * Expected shapes of the composite values (sources must map to them):
 *
 * - shadow: composite of layers, keyed by layer index (`'0'`, `'1'`, ...). A layer is a composite of
 *   `inset` (boolean), `x`, `y`, `blur`, `spread` (numbers, `px` when the unit is omitted) and `color`.
 * - gradient: composite of layers, keyed by layer index. A layer is a composite of `type` (`'linear'`, `'radial'`,
 *   `'angular'`), `from` and `to` (composites of unit-less `x`/`y`, 0 to 1) and `stops`, a composite keyed by stop
 *   index of composites with `position` (unit-less, 0 to 1) and `color`.
 *
 * A layer may be a reference on its own, and any color may be a reference to a color token.
 */

const DECIMALS = 3;
const LAYER_SEPARATOR = ', ';
const HEX_COLOR_PATTERN = /^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const OPAQUE_ALPHA = 'ff';

const roundToDecimals = (value: number, decimals: number): number => {
  const factor = 10 ** decimals;

  return parseFloat((Math.round(value * factor) / factor).toFixed(decimals));
};

const expectType = <T extends ConcreteTokenValue['type']>(
  value: TokenValue,
  index: TokenIndex,
  type: T,
): Extract<ConcreteTokenValue, { type: T }> => {
  const resolved = resolveValue(value, index);

  if (resolved.type !== type) {
    throw new Error(`Expected a "${type}" value, got a "${resolved.type}" value`);
  }

  return resolved as Extract<ConcreteTokenValue, { type: T }>;
};

const member = (composite: CompositeValue, key: string): TokenValue => {
  const value = composite.value[key];

  if (value === undefined) {
    throw new Error(`Missing "${key}" in a composite value`);
  }

  return value;
};

// Reads a member of a composite value, resolving references, and checks its type.
const memberOfType = <T extends ConcreteTokenValue['type']>(
  composite: CompositeValue,
  key: string,
  index: TokenIndex,
  type: T,
): Extract<ConcreteTokenValue, { type: T }> => expectType(member(composite, key), index, type);

// Renders every entry of a composite value keyed by index (shadow layers, gradient layers, gradient stops) and joins
// them the CSS way.
const formatLayers = (value: TokenValue, index: TokenIndex, formatLayer: (layer: TokenValue) => string): string =>
  Object.values(expectType(value, index, 'composite').value)
    .map(formatLayer)
    .join(LAYER_SEPARATOR);

const formatLength = ({ value, unit }: NumberValue): string => `${value}${unit ?? PX_UNIT}`;

/**
 * Normalizes a hex color to 8 lowercase digits (`#rrggbbaa`).
 *
 * @param color - Color value in the `hex` format (3, 4, 6 or 8 digits, with or without `#`)
 * @param color.format - Source color format, only `hex` is supported
 * @param color.value - The hex digits
 */
const toHex8 = ({ format, value }: ColorValue): string => {
  const digits = HEX_COLOR_PATTERN.exec(value)?.[1];

  if (format !== 'hex' || !digits) {
    throw new Error(`Unsupported color "${value}" in format "${format}"`);
  }

  const expanded = digits.length <= 4 ? [...digits].map((digit) => digit + digit).join('') : digits;

  return `#${(expanded.length === 6 ? `${expanded}${OPAQUE_ALPHA}` : expanded).toLowerCase()}`;
};

/**
 * Renders a color as `#rrggbbaa`.
 *
 * @param value - A color value or a reference to a color token
 * @param index - View of the tokens references point into
 * @returns {string} Lowercase hex with alpha, always 8 digits
 */
export const formatColorValue = (value: TokenValue, index: TokenIndex): string =>
  toHex8(expectType(value, index, 'color'));

const formatShadowLayer = (layer: TokenValue, index: TokenIndex): string => {
  const composite = expectType(layer, index, 'composite');

  const lengths = ['x', 'y', 'blur', 'spread'].map((key) =>
    formatLength(memberOfType(composite, key, index, 'number')),
  );
  const inset = memberOfType(composite, 'inset', index, 'boolean').value;

  return `${inset ? 'inset ' : ''}${lengths.join(' ')} ${formatColorValue(member(composite, 'color'), index)}`;
};

/**
 * Renders a shadow as comma-separated CSS layers with `#rrggbbaa` colors, e.g. `0px 2px 8px 0px #00000026`.
 *
 * @param value - A shadow composite value or a reference to a shadow token
 * @param index - View of the tokens references point into
 */
export const formatShadowValue = (value: TokenValue, index: TokenIndex): string =>
  formatLayers(value, index, (layer) => formatShadowLayer(layer, index));

const formatGradientLayer = (layer: TokenValue, index: TokenIndex): string => {
  const composite = expectType(layer, index, 'composite');
  const from = memberOfType(composite, 'from', index, 'composite');
  const to = memberOfType(composite, 'to', index, 'composite');
  const stops = memberOfType(composite, 'stops', index, 'composite');
  const type = memberOfType(composite, 'type', index, 'string').value;

  // The direction is computed on the rounded coordinates, which keeps the angle stable against float noise.
  const delta = (axis: string) =>
    roundToDecimals(memberOfType(to, axis, index, 'number').value, DECIMALS) -
    roundToDecimals(memberOfType(from, axis, index, 'number').value, DECIMALS);
  const deltaX = delta('x');
  const deltaY = delta('y');
  const degrees = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  // `atan2` measures from the x axis, CSS gradient angles from "to top". Three quadrants shift by 90deg:
  // top to bottom (atan2 90deg, CSS 180deg), left to right (atan2 0deg, CSS 90deg) and bottom to top (atan2 -90deg,
  // CSS 0deg). The remaining one, right to left (atan2 180deg, CSS -90deg), shifts by -270deg.
  const angle = () =>
    (deltaX >= 0 && deltaY > 0) || (deltaX > 0 && deltaY <= 0) || (deltaX <= 0 && deltaY < 0)
      ? 90 + degrees
      : degrees - 270;

  let prefix: string;
  switch (type) {
    case 'radial':
      prefix = 'radial-gradient(circle, ';
      break;
    case 'angular':
      prefix = 'conic-gradient(';
      break;
    default:
      prefix = `linear-gradient(${angle()}deg, `;
  }

  const stopsCss = formatLayers(stops, index, (stop) => {
    const stopComposite = expectType(stop, index, 'composite');
    const position = roundToDecimals(100 * memberOfType(stopComposite, 'position', index, 'number').value, DECIMALS);

    return `${formatColorValue(member(stopComposite, 'color'), index)} ${position}%`;
  });

  return `${prefix}${stopsCss})`;
};

/**
 * Renders a gradient as comma-separated CSS gradient layers with `#rrggbbaa` stop colors.
 *
 * @param value - A gradient composite value or a reference to a gradient token
 * @param index - View of the tokens references point into
 */
export const formatGradientValue = (value: TokenValue, index: TokenIndex): string =>
  formatLayers(value, index, (layer) => formatGradientLayer(layer, index));
