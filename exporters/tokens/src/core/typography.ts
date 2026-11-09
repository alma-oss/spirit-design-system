import { type ConcreteTokenValue, resolveValueDeep } from './resolveValue';
import type { CompositeValue, NumberValue, TokenIndex, TokenValue } from './types';

/**
 * Reading and rewriting typography values of the internal token model.
 *
 * A typography value is a composite (sources must map to this shape):
 *
 * - `fontFamily`: string, the family name without any fallback (e.g. `Inter`)
 * - `fontWeight`: string, the weight as the source names it (e.g. `Bold`, `Semi Bold Italic`, `500`)
 * - `fontSize`, `lineHeight`: numbers with a CSS unit (`px`, `rem`, `%`, ... - none for a raw value), both optional.
 *   Either may be a reference to another token (the dimension a device collection overrides), in which case the
 *   source also fills in the `resolved` value it computed itself.
 *
 * Whatever else a source knows about a style (decoration, case, letter spacing, ...) is not read by the exporter and
 * is left out of the model.
 */

/** Concrete (reference-free) typography members, as the exporter reads them. */
export type TypographyStyle = {
  fontFamily: string;
  fontWeight: string;
  fontSize?: NumberValue;
  lineHeight?: NumberValue;
};

/** Ids of the tokens a style's dimensions point at. */
export type TypographyReferences = {
  fontSize?: string;
  lineHeight?: string;
};

type DimensionKey = 'fontSize' | 'lineHeight';

const NO_TOKENS: TokenIndex = { has: () => false, get: () => undefined };

const readMember = <T extends ConcreteTokenValue['type']>(
  composite: CompositeValue,
  key: string,
  type: T,
): Extract<ConcreteTokenValue, { type: T }> | undefined => {
  const member = composite.value[key];

  if (member === undefined) {
    return undefined;
  }

  if (member.type !== type) {
    throw new Error(`Expected "${key}" of a typography to be a "${type}" value, got a "${member.type}" value`);
  }

  return member as Extract<ConcreteTokenValue, { type: T }>;
};

const requiredString = (composite: CompositeValue, key: string): string => {
  const member = readMember(composite, key, 'string');

  if (member === undefined) {
    throw new Error(`Missing "${key}" in a typography value`);
  }

  return member.value;
};

/**
 * Reads the members of a typography value, following references to their concrete values.
 *
 * A reference the source already resolved is taken as it is, at every reference of a chain and without a check against
 * the index: typography never validated its references, and a source that computes values itself (Supernova) has
 * already applied the themes and devices to what it hands over.
 *
 * @param value - A typography composite value
 * @param index - View of the tokens references point into; only needed for a reference the source did not resolve
 */
export const readTypography = (value: TokenValue, index: TokenIndex = NO_TOKENS): TypographyStyle => {
  const composite = resolveValueDeep(value, index, { trustResolved: true });

  if (composite.type !== 'composite') {
    throw new Error(`Expected a typography composite value, got a "${composite.type}" value`);
  }

  return {
    fontFamily: requiredString(composite, 'fontFamily'),
    fontWeight: requiredString(composite, 'fontWeight'),
    fontSize: readMember(composite, 'fontSize', 'number'),
    lineHeight: readMember(composite, 'lineHeight', 'number'),
  };
};

/**
 * Reads the ids of the tokens the font size and the line height of a typography value point at.
 *
 * @param value - A typography composite value
 */
export const readTypographyReferences = (value: TokenValue): TypographyReferences => {
  if (value.type !== 'composite') {
    return {};
  }

  const referenceId = (key: DimensionKey) => {
    const member = value.value[key];

    return member?.type === 'reference' ? member.tokenId : undefined;
  };

  return { fontSize: referenceId('fontSize'), lineHeight: referenceId('lineHeight') };
};

/**
 * Returns a copy of a typography value with its font size and/or line height replaced by plain numbers (a device
 * variant of a style). The replaced members no longer point at a token.
 *
 * @param value - A typography composite value
 * @param dimensions - The members to replace
 * @param dimensions.fontSize
 * @param dimensions.lineHeight
 */
export const withTypographyDimensions = (
  value: TokenValue,
  dimensions: Partial<Record<DimensionKey, NumberValue>>,
): TokenValue => {
  if (value.type !== 'composite') {
    throw new Error(`Expected a typography composite value, got a "${value.type}" value`);
  }

  return { type: 'composite', value: { ...value.value, ...dimensions } };
};
