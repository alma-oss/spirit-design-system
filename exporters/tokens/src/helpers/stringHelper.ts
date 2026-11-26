import { camelCase, kebabCase } from 'change-case';
import type { FontReplacement } from '../core/types';

export const toPlural = (name: string): string => {
  const specialCases: Record<string, string> = {
    radius: 'radii',
    spacing: 'spaces',
  };

  return specialCases[name] || (name.endsWith('s') ? name : `${name}s`);
};

/**
 * Makes a name safe to be used as a code identifier: unsafe characters become `_`, the case is applied, the remaining
 * `_` are dropped and a name that does not start with a letter gets a `_` prefix.
 *
 * Source-independent replacement of Supernova's `NamingHelper.codeSafeVariableName` (same result).
 *
 * @param parts
 * @param convertCase
 */
const toCodeSafeName = (parts: string | string[], convertCase: (value: string) => string): string => {
  const name = convertCase((typeof parts === 'string' ? parts : parts.join(' ')).replace(/[^a-zA-Z0-9_-]/g, '_'));
  const withoutUnderscores = name.replace(/_/g, '');

  return /^[^a-zA-Z]/.test(withoutUnderscores) ? `_${withoutUnderscores}` : withoutUnderscores;
};

export const toCamelCase = (name: string): string => toCodeSafeName(name, camelCase);

/**
 * Name of a file, a key or a variable in the output: camel case in the JS output, as it is in the SCSS output.
 *
 * @param name
 * @param hasJsOutput
 */
export const toOutputName = (name: string, hasJsOutput: boolean): string => (hasJsOutput ? toCamelCase(name) : name);

export const toParamCase = (parts: string | string[]): string => toCodeSafeName(parts, kebabCase);

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
export const getReplacements = (configuration: Record<string, unknown>, name: string): FontReplacement[] => {
  // The configuration keys are 1-based: searchFont1..5 and replaceFont1..5
  return [...Array(5)].map((_, i) => prepareReplacements(configuration, name, i + 1) as FontReplacement);
};

/**
 * Applies search-and-replace pairs to a string, in order. A pair with an empty search or replace is skipped.
 *
 * @param value - The input string to be processed.
 * @param replacements - The pairs to apply, `search` is a regular expression.
 * @returns {string} - The processed string with replacements applied.
 */
export const applyReplacements = (value: string, replacements: FontReplacement[]): string => {
  let replaceable = value;

  for (const { search, replace } of replacements) {
    if (search && replace) {
      replaceable = replaceable.replace(new RegExp(search.trim(), 'g'), replace.trim().replace(/"/g, ''));
    }
  }

  return replaceable;
};
