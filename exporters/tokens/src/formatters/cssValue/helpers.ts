import type { CompositeValue, TokenValue } from '../../core/types';

const LAYER_SEPARATOR = ', ';

export const roundToDecimals = (value: number, decimals: number): number => {
  const factor = 10 ** decimals;

  return parseFloat((Math.round(value * factor) / factor).toFixed(decimals));
};

// Checks the type of a value. A reference is never of the expected type, the formatters read values that the
// `resolve-references` transformation rule already resolved.
export const expectType = <T extends TokenValue['type']>(
  value: TokenValue,
  type: T,
): Extract<TokenValue, { type: T }> => {
  if (value.type !== type) {
    throw new Error(`Expected a "${type}" value, got a "${value.type}" value`);
  }

  return value as Extract<TokenValue, { type: T }>;
};

export const member = (composite: CompositeValue, key: string): TokenValue => {
  const value = composite.value[key];

  if (value === undefined) {
    throw new Error(`Missing "${key}" in a composite value`);
  }

  return value;
};

// Reads a member of a composite value and checks its type.
export const memberOfType = <T extends TokenValue['type']>(
  composite: CompositeValue,
  key: string,
  type: T,
): Extract<TokenValue, { type: T }> => expectType(member(composite, key), type);

// Renders every entry of a composite value keyed by index (shadow layers, gradient layers, gradient stops) and joins
// them the CSS way.
export const formatLayers = (value: TokenValue, formatLayer: (layer: TokenValue) => string): string =>
  Object.values(expectType(value, 'composite').value).map(formatLayer).join(LAYER_SEPARATOR);
