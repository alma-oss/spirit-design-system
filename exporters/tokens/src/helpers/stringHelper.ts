import { NamingHelper, StringCase } from '@supernovaio/export-helpers';

export const toPlural = (name: string): string => {
  const specialCases: Record<string, string> = {
    radius: 'radii',
    spacing: 'spaces',
  };

  return specialCases[name] || (name.endsWith('s') ? name : `${name}s`);
};

export const toCamelCase = (name: string): string => NamingHelper.codeSafeVariableName(name, StringCase.camelCase);

export const formatLayerSuffix = (layer: number): string => `-${layer.toString().padStart(2, '0')}`;

export const toKebabCase = (value: string) => value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

export const removePairQuotes = (input: string): string => {
  const regex = /^'([^']*)'$/;

  return input.replace(regex, '$1');
};

/**
 * Prepares a set of search-and-replace key-value pairs based on a configuration object.
 *
 * This function generates an object containing `search` and `replace` keys with their
 * corresponding values derived from the configuration object. The keys are dynamically
 * constructed using the provided `name` and `index` parameters.
 *
 * @param {Record<string, unknown>} configuration - The configuration object containing the key-value pairs.
 * @param {string} name - The base name used to construct the dynamic keys.
 * @param {number} index - The index used to construct the dynamic keys.
 * @returns {Record<string, string>} - An object with `search` and `replace` keys and their corresponding values.
 */
const prepareReplacements = (configuration: Record<string, unknown>, name: string, index: number) => {
  return ['search', 'replace'].reduce(
    (acc, key) => ({
      [key]: (configuration?.[`${key}${name}${index}`] as string) || '',
      ...acc,
    }),
    {},
  );
};

/**
 * Generates an array of search-and-replace objects based on a configuration object and a name.
 *
 * This function creates an array of objects, each containing `search` and `replace` keys,
 * by calling the `prepareReplacements` function for a fixed number of iterations (5).
 * The `prepareReplacements` function dynamically constructs the `search` and `replace` values
 * based on the provided configuration and name.
 *
 * @param {Record<string, unknown>} configuration - The configuration object containing key-value pairs.
 * @param {string} name - The base name used to construct dynamic keys for replacements.
 * @returns {Array<{ search: string; replace: string }>} - An array of objects with `search` and `replace` keys.
 */
const getReplacements = (configuration: Record<string, unknown>, name: string) => {
  const replacements: Array<{ search: string; replace: string }> = [...Array(5)].map(
    (_, i) => prepareReplacements(configuration, name, i) as { search: string; replace: string },
  );

  return replacements;
};

/**
 * Replaces occurrences of specific patterns in a string with their corresponding replacements.
 *
 * This function takes a configuration object, a string value, and a name. It retrieves
 * an array of search-and-replace pairs using the `getReplacements` function. Then, it iterates
 * through the replacements and applies them to the input string using regular expressions.
 *
 * @param {Record<string, unknown>} configuration - The configuration object containing replacement rules.
 * @param {string} value - The input string to be processed.
 * @param {string} name - The base name used to retrieve replacement rules.
 * @returns {string} - The processed string with replacements applied.
 */
export const replaceByConfiguration = (configuration: Record<string, unknown>, value: string, name: string): string => {
  // Data defined in exporter pipeline
  const replacements = getReplacements(configuration, name);

  let replaceable = value;

  for (const { search, replace } of replacements) {
    if (search && replace) {
      replaceable = replaceable.replace(new RegExp(search.trim(), 'g'), replace.trim().replace(/"/g, ''));
    }
  }

  return replaceable;
};
