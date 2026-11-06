/**
 * Renders color, shadow and gradient values of the internal token model as CSS.
 *
 * These formatters replace Supernova's `CSSHelper` for these types, so they only know the internal model. Every value
 * is expected to be resolved already by the `resolve-references` transformation rule, so the formatters do not follow
 * references and a leftover one is rejected as a value of the wrong type.
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
export { formatColorValue } from './colorFormatter';
export { formatGradientValue } from './gradientFormatter';
export { formatShadowValue } from './shadowFormatter';
