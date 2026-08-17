import { type MULTIPLE_SELECTION_MODE, SINGLE_SELECTION_MODE } from '../../constants';

export type SelectionMode = typeof MULTIPLE_SELECTION_MODE | typeof SINGLE_SELECTION_MODE;

/**
 * Whether `selectionMode` is single-select (radio-style).
 *
 * @param selectionMode
 */
export const isSingleSelectionMode = (selectionMode: SelectionMode): boolean => selectionMode === SINGLE_SELECTION_MODE;

/**
 * Keys allowed for `selectionMode` (at most one when `single`).
 *
 * @param keys
 * @param selectionMode
 */
export const getSelectedKeys = (keys: string[], selectionMode: SelectionMode): string[] =>
  isSingleSelectionMode(selectionMode) ? keys.slice(0, 1) : keys;

/**
 * Whether `key` is part of `selectedKeys` for the given `selectionMode`.
 *
 * @param selectedKeys
 * @param key
 * @param selectionMode
 */
export const isKeySelected = (selectedKeys: string[], key: string, selectionMode: SelectionMode): boolean =>
  isSingleSelectionMode(selectionMode) ? selectedKeys[0] === key : selectedKeys.includes(key);

/**
 * Next `selectedKeys` after checkbox-style toggle of `key` (add if missing, remove if present).
 *
 * @param previousKeys
 * @param key
 */
export const toggleSelection = (previousKeys: string[], key: string): string[] => {
  const keyIsSelected = previousKeys.includes(key);

  return keyIsSelected ? previousKeys.filter((item) => item !== key) : [...previousKeys, key];
};

/**
 * Single-select keys array containing only `key` (replace-behavior for radio-style selection).
 *
 * @param key
 */
export const selectSingleKey = (key: string): string[] => [key];
