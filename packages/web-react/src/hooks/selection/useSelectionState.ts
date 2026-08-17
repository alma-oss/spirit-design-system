'use client';

import { useEffect, useRef, useState } from 'react';
import { MULTIPLE_SELECTION_MODE } from '../../constants';
import { type SelectionMode, getSelectedKeys, isSingleSelectionMode, selectSingleKey, toggleSelection } from './utils';

export type { SelectionMode } from './utils';

export interface UseSelectionStateProps {
  defaultSelectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  selectionMode?: SelectionMode;
}

export interface SelectionState {
  selectedKeys: string[];
  /** Sets the full selection, normalized for `selectionMode` (e.g. at most one key in single mode). */
  setSelectedKeys: (keys: string[]) => void;
  /**
   * Toggle one key: checkbox-style in `multiple` mode, replace with that key in `single` mode.
   * (Pure helper `toggleSelection(keys, key)` stays mode-free for call sites that branch explicitly.)
   */
  toggleSelection: (key: string) => void;
  /** Replace the selection with a single key. */
  replaceSelection: (key: string) => void;
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

  const handleToggleSelection = (key: string) => {
    updateSelectedKeys((previousKeys) =>
      isSingleSelectionMode(selectionMode) ? selectSingleKey(key) : toggleSelection(previousKeys, key),
    );
  };

  const handleReplaceSelection = (key: string) => {
    updateSelectedKeys(selectSingleKey(key));
  };

  const setSelectedKeys = (keys: string[]) => {
    updateSelectedKeys(getSelectedKeys(keys, selectionMode));
  };

  return {
    selectedKeys,
    setSelectedKeys,
    toggleSelection: handleToggleSelection,
    replaceSelection: handleReplaceSelection,
  };
};
