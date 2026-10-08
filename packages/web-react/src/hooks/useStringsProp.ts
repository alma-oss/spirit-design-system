'use client';

import { resolveComponentString } from '../translations';
import { type TranslatableString } from '../types/shared';
import { useI18n } from './useI18n';

export interface StringsPropSource {
  /** From the `strings` prop. */
  value?: TranslatableString;
  /** From a deprecated flat prop, checked after `value`. */
  deprecated?: TranslatableString;
  /** Dictionary fallback. Omit when unset copy should stay undefined. */
  key?: string;
  params?: Record<string, unknown>;
}

type ResolvedStringsProp<S> = 'key' extends keyof S
  ? undefined extends S['key']
    ? string | undefined
    : string
  : string | undefined;

/**
 * Resolves component copy with one precedence: `strings` value, then a deprecated alias, then a dictionary key.
 * Omitting `key` leaves the result `undefined` when neither override is set.
 *
 * @param sources - Named sources. A required `key` resolves to `string`; a source without `key` may be `undefined`.
 * @returns {object} Resolved strings keyed like `sources`.
 */
export const useStringsProp = <T extends Record<string, StringsPropSource>>(
  sources: T,
): { [K in keyof T]: ResolvedStringsProp<T[K]> } => {
  const { t } = useI18n();
  const resolved = {} as { [K in keyof T]: ResolvedStringsProp<T[K]> };

  (Object.keys(sources) as Array<keyof T>).forEach((name) => {
    const { value, deprecated, key, params } = sources[name];
    const source = value ?? deprecated ?? (key ? { key, params } : undefined);

    resolved[name] = (
      source === undefined ? undefined : resolveComponentString(source, t, params)
    ) as ResolvedStringsProp<T[typeof name]>;
  });

  return resolved;
};
