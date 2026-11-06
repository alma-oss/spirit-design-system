import { PX_UNIT } from '../../constants';
import type { NumberValue, TokenValue } from '../../core/types';
import { formatColorValue } from './colorFormatter';
import { expectType, formatLayers, member, memberOfType } from './helpers';

const formatLength = ({ value, unit }: NumberValue): string => `${value}${unit ?? PX_UNIT}`;

const formatShadowLayer = (layer: TokenValue): string => {
  const composite = expectType(layer, 'composite');

  const lengths = ['x', 'y', 'blur', 'spread'].map((key) => formatLength(memberOfType(composite, key, 'number')));
  const inset = memberOfType(composite, 'inset', 'boolean').value;

  return `${inset ? 'inset ' : ''}${lengths.join(' ')} ${formatColorValue(member(composite, 'color'))}`;
};

/**
 * Renders a shadow as comma-separated CSS layers with `#rrggbbaa` colors, e.g. `0px 2px 8px 0px #00000026`.
 *
 * @param value - A shadow composite value, its references already resolved
 */
export const formatShadowValue = (value: TokenValue): string => formatLayers(value, formatShadowLayer);
