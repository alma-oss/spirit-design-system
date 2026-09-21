import { type TranslateFunction } from '../hooks/useI18n';
import { type TranslatableString } from '../types/shared';
import { replaceTranslationParams } from './replaceTranslationParams';

const isTranslationReference = (
  value: TranslatableString,
): value is { key: string; params?: Record<string, unknown> } => typeof value !== 'string';

/**
 * Resolves component text from a literal value or from the active translation catalog.
 * Runtime parameters provide component state while parameters on the reference allow
 * an instance override; reference parameters take precedence when both define a key.
 *
 * @param value - Literal component text or a translation reference.
 * @param t - Translation function from `useI18n`.
 * @param runtimeParams - Default interpolation values supplied by the component.
 * @returns {string} Resolved and interpolated component text.
 */
export const resolveComponentString = (
  value: TranslatableString,
  t: TranslateFunction,
  runtimeParams?: Record<string, unknown>,
): string => {
  if (isTranslationReference(value)) {
    return t(value.key, { ...runtimeParams, ...value.params });
  }

  return runtimeParams ? replaceTranslationParams(value, runtimeParams) : value;
};

export interface ComponentStringSource {
  key: string;
  params?: Record<string, unknown>;
  value?: TranslatableString;
}

/**
 * Resolves several optional component strings with the same precedence:
 * `strings` override or deprecated alias, then the dictionary fallback key.
 *
 * @param sources - Named sources, each with an optional value and a fallback key.
 * @param t - Translation function from `useI18n`.
 * @returns {object} Resolved strings keyed like `sources`.
 */
export const resolveComponentStrings = <T extends Record<string, ComponentStringSource>>(
  sources: T,
  t: TranslateFunction,
): { [K in keyof T]: string } => {
  const resolved = {} as { [K in keyof T]: string };

  (Object.keys(sources) as Array<keyof T>).forEach((name) => {
    const source = sources[name];

    resolved[name] = resolveComponentString(source.value ?? { key: source.key }, t, source.params);
  });

  return resolved;
};
