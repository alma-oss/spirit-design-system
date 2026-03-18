/**
 * Converts a camelCase or PascalCase string to kebab-case.
 *
 * @param {string} input - The camelCase string to be converted.
 * @returns {string} The kebab-case version of the input string.
 */
export const camelCaseToKebabCase = (input: string): string =>
  input.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Converts a kebab-case string to camelCase.
 *
 * @param {string} input - The kebab-case string to be converted.
 * @returns {string} The camelCase version of the input string.
 */
export const kebabCaseToCamelCase = (input: string): string => input.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

/**
 * Converts an object with kebab-case string values to camelCase.
 *
 * @param {Record<string, string>} input - The input to be converted.
 * @returns {Record<string, string>} The converted input.
 */
export const kebabCaseToCamelCaseValues = (input: Record<string, string>): Record<string, string> => {
  if (typeof input === 'object' && input !== null) {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(input)) {
      result[key] = typeof value === 'string' ? kebabCaseToCamelCase(value) : value;
    }

    return result;
  }

  return input;
};

/**
 * Normalizes a value to `string | undefined`.
 *
 * Returns the original value if it is already a string,
 * `undefined` for nullish inputs, or `String(value)` for anything else.
 *
 * @param {unknown} value - The value to normalize.
 * @returns {string | undefined} The normalized string value.
 */
export const normalizeStringValue = (value: unknown): string | undefined => {
  if (typeof value === 'string' || value == null) {
    return value ?? undefined;
  }

  return String(value);
};

/**
 * Converts a kebab-case string or an object with kebab-case values to camelCase.
 *
 * @param {string | Record<string, string>} input - The input to be converted.
 * @returns {string | Record<string, string>} The converted input.
 */
export const stringOrObjectKebabCaseToCamelCase = (
  input: string | Record<string, string>,
): string | Record<string, string> => {
  if (typeof input === 'string') {
    return kebabCaseToCamelCase(input);
  }
  if (typeof input === 'object' && input !== null) {
    return kebabCaseToCamelCaseValues(input);
  }

  return input;
};
