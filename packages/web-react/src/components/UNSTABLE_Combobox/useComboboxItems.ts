'use client';

import { type ReactNode, type RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { COMBOBOX_OPTION_ITEM_SELECTOR } from './constants';
import {
  type ComboboxItem,
  collectComboboxItems,
  getOptionRowEl as getOptionRowElFromListbox,
  getOptionValueFromRow,
  getRowLabel,
} from './utils';

export interface ComboboxSelectedItem {
  label: string;
  value: string;
}

export interface UseComboboxItemsProps {
  children?: ReactNode;
  listboxRef: RefObject<HTMLElement | null>;
  /** Full option key set when filtered options unmount. */
  optionKeys?: string[];
  selectedKeys: readonly string[];
}

export interface UseComboboxItemsReturn {
  getItem: (key: string) => ComboboxItem | undefined;
  getItemLabel: (key: string) => string;
  getOptionRowEl: (optionId: string) => HTMLElement | null;
  itemsByKey: Readonly<Record<string, ComboboxItem>>;
  resolvedOptionKeys: string[];
  selectedItems: ComboboxSelectedItem[];
  warmItemLabel: (key: string) => void;
}

/**
 * Item collection for Combobox options, separated from selection state.
 * Keeps a label cache so selected tags stay readable after filtered options unmount.
 *
 * @param props Hook configuration
 * @param props.children Combobox option children
 * @param props.listboxRef Options widget element ref
 * @param props.optionKeys Full option key set when filtered options unmount
 * @param props.selectedKeys Currently selected keys
 */
export const useComboboxItems = ({
  children,
  listboxRef,
  optionKeys,
  selectedKeys,
}: UseComboboxItemsProps): UseComboboxItemsReturn => {
  const labelCacheRef = useRef<Map<string, string>>(new Map());
  const disabledCacheRef = useRef<Map<string, boolean>>(new Map());

  const collectedItems = useMemo(() => collectComboboxItems(children), [children]);

  const itemsByKey = useMemo(() => {
    const map: Record<string, ComboboxItem> = {};

    collectedItems.forEach((item) => {
      map[item.key] = item;
      labelCacheRef.current.set(item.key, item.label);
      disabledCacheRef.current.set(item.key, item.isDisabled);
    });

    return map;
  }, [collectedItems]);

  const resolvedOptionKeys = useMemo(
    () => optionKeys ?? collectedItems.map((item) => item.key),
    [collectedItems, optionKeys],
  );

  const getOptionRowEl = useCallback(
    (optionId: string): HTMLElement | null => getOptionRowElFromListbox(listboxRef.current, optionId),
    [listboxRef],
  );

  const syncCachesFromDom = useCallback(() => {
    const listbox = listboxRef.current;

    if (!listbox) {
      return;
    }

    listbox.querySelectorAll<HTMLElement>(COMBOBOX_OPTION_ITEM_SELECTOR).forEach((row) => {
      const optionValue = getOptionValueFromRow(row);

      if (!optionValue) {
        return;
      }

      labelCacheRef.current.set(optionValue, getRowLabel(row));
      disabledCacheRef.current.set(optionValue, row.getAttribute('aria-disabled') === 'true');
    });
  }, [listboxRef]);

  useEffect(() => {
    syncCachesFromDom();
  }, [children, selectedKeys, syncCachesFromDom]);

  const getItem = useCallback(
    (key: string): ComboboxItem | undefined => {
      const fromCollection = itemsByKey[key];

      if (fromCollection) {
        return fromCollection;
      }

      const cachedLabel = labelCacheRef.current.get(key);

      if (cachedLabel == null) {
        return undefined;
      }

      return {
        key,
        label: cachedLabel,
        isDisabled: disabledCacheRef.current.get(key) ?? false,
      };
    },
    [itemsByKey],
  );

  const getItemLabel = useCallback(
    (key: string) => {
      const fromCollection = itemsByKey[key]?.label;

      if (fromCollection) {
        labelCacheRef.current.set(key, fromCollection);

        return fromCollection;
      }

      const cached = labelCacheRef.current.get(key);

      if (cached) {
        return cached;
      }

      const rowEl = getOptionRowEl(key);

      if (rowEl) {
        const labelText = getRowLabel(rowEl);

        labelCacheRef.current.set(key, labelText);
        disabledCacheRef.current.set(key, rowEl.getAttribute('aria-disabled') === 'true');

        return labelText;
      }

      return key;
    },
    [getOptionRowEl, itemsByKey],
  );

  const warmItemLabel = useCallback(
    (key: string) => {
      getItemLabel(key);
    },
    [getItemLabel],
  );

  const selectedItems = useMemo(
    () => selectedKeys.map((key) => ({ value: key, label: getItemLabel(key) })),
    [getItemLabel, selectedKeys],
  );

  return {
    getItem,
    getItemLabel,
    getOptionRowEl,
    itemsByKey,
    resolvedOptionKeys,
    selectedItems,
    warmItemLabel,
  };
};
