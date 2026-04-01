'use client';

import { useEffect, useRef, useState } from 'react';
import { MULTIPLE_SELECTION_MODE, SINGLE_SELECTION_MODE } from '../constants';

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
 * Next `selectedKeys` after toggling `key` (checkbox-style in multiple mode, radio-style in single).
 *
 * @param previousKeys
 * @param key
 * @param selectionMode
 */
export const getToggledSelectedKeys = (previousKeys: string[], key: string, selectionMode: SelectionMode): string[] => {
  const keyIsSelected = previousKeys.includes(key);

  if (isSingleSelectionMode(selectionMode)) {
    return keyIsSelected ? [] : [key];
  }

  return keyIsSelected ? previousKeys.filter((item) => item !== key) : [...previousKeys, key];
};

export interface UseSelectionStateProps {
  defaultSelectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  selectionMode?: SelectionMode;
}

export interface SelectionState {
  selectedKeys: string[];
  /** Sets the full selection, normalized for `selectionMode` (e.g. at most one key in single mode). */
  setSelectedKeys: (keys: string[]) => void;
  /** Toggles one key in the selection (same rules as `getToggledSelectedKeys`). */
  toggleSelectedKey: (key: string) => void;
}

export const useSelectionState = ({
  defaultSelectedKeys = [],
  onSelectionChange,
  selectionMode = MULTIPLE_SELECTION_MODE,
}: UseSelectionStateProps): SelectionState => {
  const [selectedKeys, updateSelectedKeys] = useState<string[]>(() =>
    getSelectedKeys(defaultSelectedKeys, selectionMode),
  );

  const onSelectionChangeRef = useRef(onSelectionChange);
  onSelectionChangeRef.current = onSelectionChange;

  const skipNotificationRef = useRef(true);

  /**  Re-apply mode rules when `selectionMode` changes. Trims via `onSelectionChange` when keys change. */
  useEffect(() => {
    updateSelectedKeys((previousKeys) => {
      const nextKeys = getSelectedKeys(previousKeys, selectionMode);
      const unchanged =
        previousKeys.length === nextKeys.length && previousKeys.every((key, index) => key === nextKeys[index]);

      return unchanged ? previousKeys : nextKeys;
    });
  }, [selectionMode]);

  useEffect(() => {
    if (skipNotificationRef.current) {
      skipNotificationRef.current = false;

      return;
    }

    onSelectionChangeRef.current?.(selectedKeys);
  }, [selectedKeys]);

  const toggleSelectedKey = (key: string) => {
    updateSelectedKeys((previousKeys) => getToggledSelectedKeys(previousKeys, key, selectionMode));
  };

  const setSelectedKeys = (keys: string[]) => {
    updateSelectedKeys(getSelectedKeys(keys, selectionMode));
  };

  return { selectedKeys, setSelectedKeys, toggleSelectedKey };
};
