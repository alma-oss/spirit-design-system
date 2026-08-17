'use client';

import { useCallback, useMemo } from 'react';
import { MULTIPLE_SELECTION_MODE } from '../../constants';
import {
  type SelectionMode,
  isKeySelected,
  isSingleSelectionMode,
  selectSingleKey,
  toggleSelection as toggleSelectionKeys,
} from './utils';

export interface UseSelectionManagerProps {
  selectedKeys: string[];
  onSelectionChange: (keys: string[]) => void;
  selectionMode?: SelectionMode;
}

export interface SelectionManager {
  /** Whether `key` is currently selected. */
  isSelected: (key: string) => boolean;
  /** Remove one key from the selection (clears all in single mode). */
  removeItem: (key: string) => void;
  /** Clear the entire selection. */
  removeAll: () => void;
  /** Replace the selection with a single key. */
  replaceSelection: (key: string) => void;
  /**
   * Toggle one key: checkbox-style in `multiple` mode, replace with that key in `single` mode.
   * (Pure helper `toggleSelection(keys, key)` stays mode-free for call sites that branch explicitly.)
   */
  toggleSelection: (key: string) => void;
}

/**
 * Selection mutation helpers for controlled `selectedKeys` / `onSelectionChange`.
 * Operates on the keys array — Collection-dependent verbs (`selectAll`, `extendSelection`, …)
 * are intentionally deferred; see `hooks/selection/README.md`.
 *
 * @param props
 * @param props.selectedKeys
 * @param props.onSelectionChange
 * @param props.selectionMode
 */
export const useSelectionManager = ({
  selectedKeys,
  onSelectionChange,
  selectionMode = MULTIPLE_SELECTION_MODE,
}: UseSelectionManagerProps): SelectionManager => {
  const isSelected = useCallback(
    (key: string) => isKeySelected(selectedKeys, key, selectionMode),
    [selectedKeys, selectionMode],
  );

  const toggleSelection = useCallback(
    (key: string) => {
      if (isSingleSelectionMode(selectionMode)) {
        onSelectionChange(selectSingleKey(key));

        return;
      }

      onSelectionChange(toggleSelectionKeys(selectedKeys, key));
    },
    [onSelectionChange, selectedKeys, selectionMode],
  );

  const replaceSelection = useCallback(
    (key: string) => {
      onSelectionChange(selectSingleKey(key));
    },
    [onSelectionChange],
  );

  const removeItem = useCallback(
    (key: string) => {
      if (isSingleSelectionMode(selectionMode)) {
        onSelectionChange([]);

        return;
      }

      onSelectionChange(selectedKeys.filter((selectedKey) => selectedKey !== key));
    },
    [onSelectionChange, selectedKeys, selectionMode],
  );

  const removeAll = useCallback(() => {
    onSelectionChange([]);
  }, [onSelectionChange]);

  return useMemo(
    () => ({
      isSelected,
      removeAll,
      removeItem,
      replaceSelection,
      toggleSelection,
    }),
    [isSelected, removeAll, removeItem, replaceSelection, toggleSelection],
  );
};
