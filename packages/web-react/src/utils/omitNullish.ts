import { isNullish } from './assert';

/**
 * Removes `null`/`undefined` values so they cannot clobber component defaults downstream.
 *
 * @template T - The type of the props object.
 * @param {T} value - The object to filter.
 * @returns {T} A new object without nullish values.
 */
export const omitNullish = <T extends Record<string, unknown>>(value: T): T =>
  Object.entries(value).reduce(
    (result, [key, propValue]) => (isNullish(propValue) ? result : { ...result, [key]: propValue }),
    {} as T,
  );
