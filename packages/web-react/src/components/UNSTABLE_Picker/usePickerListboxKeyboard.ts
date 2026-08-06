'use client';

import { type RefObject, useCallback, useRef, useState } from 'react';
import { getToggledSelectedKeys, isKeySelected, isSingleSelectionMode, useIsomorphicLayoutEffect } from '../../hooks';
import type { UnstablePickerListboxOptionProps, UnstablePickerSelectionMode } from './types';

/** Milliseconds of inactivity before the type-ahead buffer resets. */
const TYPE_AHEAD_RESET_MS = 500;

export interface UnstablePickerListboxKeyboardProps {
  /** Option values in DOM order (from `collectPickerItems`). */
  optionValues: string[];
  selectedKeys: string[];
  selectionMode: UnstablePickerSelectionMode;
  onSelectionChange: (keys: string[]) => void;
  /** The `role="listbox"` element — used to focus options after navigation and to read option labels for type-ahead. */
  listboxRef: RefObject<HTMLElement | null>;
  /** Maps an option value to its DOM id (`${pickerId}-${value}`). */
  getOptionId: (value: string) => string;
  /** Disable navigation and selection when the picker is disabled. */
  isDisabled?: boolean;
}

const focusOption = (listboxRef: RefObject<HTMLElement | null>, optionId: string) => {
  listboxRef.current?.querySelector<HTMLElement>(`#${CSS.escape(optionId)}`)?.focus();
};

/**
 * Keyboard and roving tabindex behaviour for a Picker `role="listbox"` (listbox presentation):
 * a single tab stop, Arrow (clamped, no wrap) / Home / End navigation, Space & Enter to toggle
 * selection, and type-ahead. Selection is expressed via `aria-selected`, not native inputs.
 *
 * Roving tabindex (not `aria-activedescendant`) keeps exactly one real focusable option so the
 * popover dialog's existing focus management (initial focus, tab-out-to-close) works unchanged.
 *
 * @param root0
 * @param root0.optionValues
 * @param root0.selectedKeys
 * @param root0.selectionMode
 * @param root0.onSelectionChange
 * @param root0.listboxRef
 * @param root0.getOptionId
 * @param root0.isDisabled
 */
export const usePickerListboxKeyboard = ({
  optionValues,
  selectedKeys,
  selectionMode,
  onSelectionChange,
  listboxRef,
  getOptionId,
  isDisabled = false,
}: UnstablePickerListboxKeyboardProps): {
  getOptionProps: (value: string) => UnstablePickerListboxOptionProps;
  activeValue: string | null;
} => {
  const single = isSingleSelectionMode(selectionMode);

  // Initial roving cursor: first selected option, else the first option — so the dialog's
  // initial-focus (first `[tabindex="0"]`) lands on a sensible option when the popover opens.
  const getInitialActiveValue = () =>
    optionValues.find((value) => selectedKeys.includes(value)) ?? optionValues[0] ?? null;

  const [activeValue, setActiveValue] = useState<string | null>(getInitialActiveValue);

  const typeAheadBufferRef = useRef('');
  const typeAheadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep the roving cursor valid when the option set changes (e.g. filtered lists).
  useIsomorphicLayoutEffect(() => {
    if (activeValue !== null && optionValues.includes(activeValue)) {
      return;
    }

    setActiveValue(optionValues[0] ?? null);
  }, [activeValue, optionValues]);

  const toggle = useCallback(
    (value: string) => {
      onSelectionChange(single ? [value] : getToggledSelectedKeys(selectedKeys, value, selectionMode));
    },
    [onSelectionChange, selectedKeys, selectionMode, single],
  );

  const focusValueAt = useCallback(
    (index: number) => {
      const value = optionValues[index];

      if (value === undefined) {
        return;
      }

      focusOption(listboxRef, getOptionId(value));
    },
    [getOptionId, listboxRef, optionValues],
  );

  const runTypeAhead = useCallback(
    (character: string) => {
      if (typeAheadTimeoutRef.current) {
        clearTimeout(typeAheadTimeoutRef.current);
      }

      typeAheadBufferRef.current += character.toLowerCase();
      typeAheadTimeoutRef.current = setTimeout(() => {
        typeAheadBufferRef.current = '';
      }, TYPE_AHEAD_RESET_MS);

      const query = typeAheadBufferRef.current;
      const matchIndex = optionValues.findIndex((value) => {
        const label = listboxRef.current?.querySelector<HTMLElement>(`#${CSS.escape(getOptionId(value))}`)?.textContent;

        return label?.trim().toLowerCase().startsWith(query) ?? false;
      });

      if (matchIndex >= 0) {
        focusValueAt(matchIndex);
      }
    },
    [focusValueAt, getOptionId, listboxRef, optionValues],
  );

  const getOptionProps = useCallback(
    (value: string): UnstablePickerListboxOptionProps => {
      const index = optionValues.indexOf(value);

      return {
        role: 'option',
        id: getOptionId(value),
        tabIndex: value === activeValue ? 0 : -1,
        'aria-selected': isKeySelected(selectedKeys, value, selectionMode),
        ...(isDisabled ? { 'aria-disabled': true } : {}),
        onFocus: () => setActiveValue(value),
        onClick: () => {
          if (isDisabled) {
            return;
          }

          toggle(value);
        },
        onKeyDown: (event) => {
          if (isDisabled) {
            return;
          }

          switch (event.key) {
            case 'ArrowDown':
              event.preventDefault();
              focusValueAt(Math.min(index + 1, optionValues.length - 1));
              break;
            case 'ArrowUp':
              event.preventDefault();
              focusValueAt(Math.max(index - 1, 0));
              break;
            case 'Home':
              event.preventDefault();
              focusValueAt(0);
              break;
            case 'End':
              event.preventDefault();
              focusValueAt(optionValues.length - 1);
              break;
            case ' ':
            case 'Enter':
              event.preventDefault();
              toggle(value);
              break;
            default:
              if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
                runTypeAhead(event.key);
              }
              break;
          }
        },
      };
    },
    [
      activeValue,
      focusValueAt,
      getOptionId,
      isDisabled,
      optionValues,
      runTypeAhead,
      selectedKeys,
      selectionMode,
      toggle,
    ],
  );

  return { getOptionProps, activeValue };
};
