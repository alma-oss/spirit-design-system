'use client';

import { type RefObject, useCallback, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../../hooks';
import type { UnstablePickerSelectionGridRowProps } from './types';

export interface UnstablePickerSelectionKeyboardProps {
  /** Number of tag rows in the selection grid */
  tagCount: number;
  /** Called with the index of the tag to remove (keyboard or remove button) */
  onRemoveAtIndex: (index: number) => void;
  /** The selection element (`role="grid"`) — used to focus tag rows after arrow navigation or removal */
  selectionRef?: RefObject<HTMLElement | null>;
  /**
   * When the picker popover is open, the dialog owns focus — do not move focus to tags and take tags
   * out of the tab order until the popover closes (matches web picker demo).
   */
  isPopoverOpen?: boolean;
  /** Disable row keyboard interaction and tab stops when picker is disabled */
  isDisabled?: boolean;
}

/**
 * Keyboard and roving tabindex behaviour for the Picker selection grid (`role="grid"`)
 * one tab stop per row, arrow / Home / End navigation, Delete & Backspace
 * to remove, and the remove control participating in the tab order while the row contains focus.
 *
 * @param selectionRef Selection container (`role="grid"`)
 * @param rowIndex Index of the tag row to focus
 */
const focusTagRow = (selectionRef: RefObject<HTMLElement | null> | undefined, rowIndex: number) => {
  if (!selectionRef?.current) {
    return;
  }

  const rows = selectionRef.current.querySelectorAll<HTMLElement>('[role="row"]');

  rows.item(rowIndex)?.focus();
};

export const usePickerSelectionGridKeyboard = ({
  onRemoveAtIndex,
  selectionRef,
  tagCount,
  isPopoverOpen = false,
  isDisabled = false,
}: UnstablePickerSelectionKeyboardProps): {
  getKeyboardGridRowProps: (index: number) => UnstablePickerSelectionGridRowProps;
  removeTagAtIndex: (index: number) => void;
} => {
  const [activeTagIndex, setActiveTagIndex] = useState(0);
  const [focusedRowIndex, setFocusedRowIndex] = useState<number | null>(null);
  const prevTagCountRef = useRef<number | null>(null);
  const pendingFocusRowRef = useRef<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    const previousCount = prevTagCountRef.current;

    if (previousCount === null) {
      prevTagCountRef.current = tagCount;

      if (tagCount > 0) {
        setActiveTagIndex(tagCount - 1);
      }

      return;
    }

    if (tagCount === 0) {
      prevTagCountRef.current = 0;

      return;
    }

    const lastRowIndex = tagCount - 1;
    const tagCountDifference = tagCount - previousCount;

    if (tagCountDifference > 0) {
      setActiveTagIndex(lastRowIndex);

      if (!isPopoverOpen) {
        pendingFocusRowRef.current = lastRowIndex;
      }
    } else if (tagCountDifference < 0) {
      setActiveTagIndex((current) => Math.min(current, lastRowIndex));
    }

    prevTagCountRef.current = tagCount;
  }, [isPopoverOpen, tagCount]);

  useIsomorphicLayoutEffect(() => {
    const rowIndex = pendingFocusRowRef.current;

    if (rowIndex === null || tagCount === 0 || isPopoverOpen) {
      return;
    }

    pendingFocusRowRef.current = null;
    focusTagRow(selectionRef, rowIndex);
  }, [activeTagIndex, isPopoverOpen, selectionRef, tagCount]);

  const removeAt = useCallback(
    (index: number) => {
      const nextCount = tagCount - 1;

      if (nextCount > 0) {
        const nextActive = index < nextCount ? index : index - 1;

        setActiveTagIndex(nextActive);

        if (!isPopoverOpen) {
          pendingFocusRowRef.current = nextActive;
        }
      }

      setFocusedRowIndex(null);
      onRemoveAtIndex(index);
    },
    [isPopoverOpen, onRemoveAtIndex, tagCount],
  );

  const getKeyboardGridRowProps = useCallback(
    (index: number): UnstablePickerSelectionGridRowProps => {
      if (isPopoverOpen || isDisabled) {
        return {
          tabIndex: -1,
          removeButtonTabIndex: -1,
          onFocusCapture: () => {},
          onBlurCapture: () => {},
          onKeyDown: () => {},
        };
      }

      return {
        tabIndex: index === activeTagIndex ? 0 : -1,
        removeButtonTabIndex: focusedRowIndex === index ? 0 : -1,
        onFocusCapture: () => {
          setActiveTagIndex(index);
          setFocusedRowIndex(index);
        },
        onBlurCapture: (event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setFocusedRowIndex(null);
          }
        },
        onKeyDown: (event) => {
          if (tagCount === 0) {
            return;
          }

          if (event.key === 'Delete' || event.key === 'Backspace') {
            event.preventDefault();
            removeAt(index);

            return;
          }

          let nextIndex = -1;

          switch (event.key) {
            case 'ArrowRight':
            case 'ArrowDown':
              nextIndex = (index + 1) % tagCount;
              break;
            case 'ArrowLeft':
            case 'ArrowUp':
              nextIndex = (index - 1 + tagCount) % tagCount;
              break;
            case 'Home':
              nextIndex = 0;
              break;
            case 'End':
              nextIndex = tagCount - 1;
              break;
            default:
              break;
          }

          if (nextIndex >= 0) {
            event.preventDefault();
            setActiveTagIndex(nextIndex);
            pendingFocusRowRef.current = nextIndex;
          }
        },
      };
    },
    [activeTagIndex, focusedRowIndex, isDisabled, isPopoverOpen, removeAt, tagCount],
  );

  return { getKeyboardGridRowProps, removeTagAtIndex: removeAt };
};
