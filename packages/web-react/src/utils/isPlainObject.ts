/**
 * Check if the value is a plain object (not `null` and not an array).
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - `true` if the value is a plain object, `false` otherwise.
 */
export const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
