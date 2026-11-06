import type { TokenValue } from '../../core/types';
import { formatColorValue } from './colorFormatter';
import { expectType, formatLayers, member, memberOfType, roundToDecimals } from './helpers';

const DECIMALS = 3;

const formatGradientLayer = (layer: TokenValue): string => {
  const composite = expectType(layer, 'composite');
  const from = memberOfType(composite, 'from', 'composite');
  const to = memberOfType(composite, 'to', 'composite');
  const stops = memberOfType(composite, 'stops', 'composite');
  const type = memberOfType(composite, 'type', 'string').value;

  // The direction is computed on the rounded coordinates, which keeps the angle stable against float noise.
  const delta = (axis: string) =>
    roundToDecimals(memberOfType(to, axis, 'number').value, DECIMALS) -
    roundToDecimals(memberOfType(from, axis, 'number').value, DECIMALS);
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

  const stopsCss = formatLayers(stops, (stop) => {
    const stopComposite = expectType(stop, 'composite');
    const position = roundToDecimals(100 * memberOfType(stopComposite, 'position', 'number').value, DECIMALS);

    return `${formatColorValue(member(stopComposite, 'color'))} ${position}%`;
  });

  return `${prefix}${stopsCss})`;
};

/**
 * Renders a gradient as comma-separated CSS gradient layers with `#rrggbbaa` stop colors.
 *
 * @param value - A gradient composite value, its references already resolved
 */
export const formatGradientValue = (value: TokenValue): string => formatLayers(value, formatGradientLayer);
