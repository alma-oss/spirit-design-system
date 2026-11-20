export type NumericValue = {
  measure: number | undefined;
  /** The unit as the source names it (e.g. `Pixels`), see `SOURCE_UNIT`. */
  unit: unknown;
};

/** The part of a dimension, font size or line height token this helper reads. */
type NumericValueToken = { value?: { measure?: number; unit?: unknown } };

/**
 * Reads the measure and the unit of a dimension, font size or line height token, which all carry them directly in
 * `value`. The caller is responsible for passing a token of one of these types.
 *
 * @param token
 */
export const readNumericValue = (token: object): NumericValue => {
  // TODO: Accept a `DesignToken` and drop the cast once the pipeline reads the source-neutral model (DS-2335).
  // Typed as `object` to keep this helper free of any source SDK type: a source's token union (e.g. Supernova's
  // `Token`) is not assignable to `NumericValueToken`, so the token is narrowed here instead of at every call site.
  const { value } = token as NumericValueToken;

  return { measure: value?.measure, unit: value?.unit };
};
