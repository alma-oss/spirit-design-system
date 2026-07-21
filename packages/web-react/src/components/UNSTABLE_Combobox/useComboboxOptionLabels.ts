'use client';

import { type ReactNode, type RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  collectComboboxOptionLabels,
  getOptionRowEl as getOptionRowElFromListbox,
  getOptionValueFromRow,
  getRowLabel,
} from './utils';

export interface ComboboxSelectedItem {
  label: string;
  value: string;
}

export interface UseComboboxOptionLabelsProps {
  children?: ReactNode;
  listboxRef: RefObject<HTMLElement | null>;
  selectedKeys: string[];
}

export interface UseComboboxOptionLabelsReturn {
  getOptionLabel: (key: string) => string;
  getOptionRowEl: (optionId: string) => HTMLElement | null;
  selectedItems: ComboboxSelectedItem[];
}

/**
 * Resolve option labels from children / DOM with a cache for selected tags.
 *
 * @param props Hook configuration
 * @param props.children Combobox option children
 * @param props.listboxRef Listbox grid element
 * @param props.selectedKeys Selected option ids
 * @returns {{ getOptionLabel: (key: string) => string, getOptionRowEl: (optionId: string) => HTMLElement | null, selectedItems: ComboboxSelectedItem[] }}
 */
export const useComboboxOptionLabels = ({
  children,
  listboxRef,
  selectedKeys,
}: UseComboboxOptionLabelsProps): UseComboboxOptionLabelsReturn => {
  const labelCacheRef = useRef<Map<string, string>>(new Map());

  const getOptionRowEl = useCallback(
    (optionId: string): HTMLElement | null => getOptionRowElFromListbox(listboxRef.current, optionId),
    [listboxRef],
  );

  const optionLabelsFromChildren = useMemo(() => collectComboboxOptionLabels(children), [children]);

  useEffect(() => {
    Object.entries(optionLabelsFromChildren).forEach(([key, optionLabel]) => {
      if (optionLabel) {
        labelCacheRef.current.set(key, optionLabel);
      }
    });
  }, [optionLabelsFromChildren]);

  const syncLabelCacheFromDom = useCallback(() => {
    const listbox = listboxRef.current;

    if (!listbox) {
      return;
    }

    listbox.querySelectorAll<HTMLElement>('[role="row"]').forEach((row) => {
      const optionValue = getOptionValueFromRow(row);

      if (optionValue) {
        labelCacheRef.current.set(optionValue, getRowLabel(row));
      }
    });
  }, [listboxRef]);

  useEffect(() => {
    syncLabelCacheFromDom();
  }, [children, selectedKeys, syncLabelCacheFromDom]);

  const getOptionLabel = useCallback(
    (key: string) => {
      const fromChildren = optionLabelsFromChildren[key];

      if (fromChildren) {
        labelCacheRef.current.set(key, fromChildren);

        return fromChildren;
      }

      const cached = labelCacheRef.current.get(key);

      if (cached) {
        return cached;
      }

      const rowEl = getOptionRowEl(key);

      if (rowEl) {
        const labelText = getRowLabel(rowEl);

        labelCacheRef.current.set(key, labelText);

        return labelText;
      }

      return key;
    },
    [getOptionRowEl, optionLabelsFromChildren],
  );

  const selectedItems = useMemo(
    () => selectedKeys.map((key) => ({ value: key, label: getOptionLabel(key) })),
    [getOptionLabel, selectedKeys],
  );

  return {
    getOptionLabel,
    getOptionRowEl,
    selectedItems,
  };
};
