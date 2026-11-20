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
  const { value } = token as NumericValueToken;

  return { measure: value?.measure, unit: value?.unit };
};
