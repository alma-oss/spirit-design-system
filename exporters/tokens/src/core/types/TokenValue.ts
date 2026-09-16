/**
 * Source-agnostic token value. All source adapters map their native value
 * representation (Supernova's `TokenValue`, Figma's `VariableValue`, W3C's
 * `$value`, ...) into one of these.
 */
export type TokenValue = NumberValue | StringValue | ColorValue | BooleanValue | ReferenceValue | CompositeValue;

export type NumberValue = {
  type: 'number';
  value: number;
  /** e.g. 'px', 'rem', '%', 'ms'. Left as a free string since sources differ (Figma has none). */
  unit?: string;
};

export type StringValue = {
  type: 'string';
  value: string;
};

export type ColorValue = {
  type: 'color';
  /** Original format the value was provided in (source-specific: 'hex', 'rgba', 'oklch', ...). */
  format: string;
  value: string;
};

export type BooleanValue = {
  type: 'boolean';
  value: boolean;
};

/**
 * An unresolved alias/reference to another token (e.g. Supernova's
 * `referencedTokenId`, Figma's `VARIABLE_ALIAS`). Resolved to a concrete
 * value by the transformation layer, not by adapters.
 */
export type ReferenceValue = {
  type: 'reference';
  tokenId: string;
  resolved?: TokenValue;
};

/**
 * Composite tokens (border, shadow, gradient, typography, ...) that are made
 * up of multiple named sub-values.
 */
export type CompositeValue = {
  type: 'composite';
  value: Record<string, TokenValue>;
};
