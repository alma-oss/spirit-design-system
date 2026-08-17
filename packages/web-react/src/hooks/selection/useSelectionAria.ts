'use client';

import { type FocusEvent, type KeyboardEvent, type RefObject, useCallback, useRef, useState } from 'react';
import { type GridRowMove, getWrappedRowIndex } from '../gridKeyboardNavigation';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

/** Row props produced by `useSelectionAria` for roving tabindex and grid keys */
export interface SelectionGridRowProps {
  tabIndex: 0 | -1;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  onFocusCapture: (event: FocusEvent<HTMLElement>) => void;
  onBlurCapture: (event: FocusEvent<HTMLElement>) => void;
  removeButtonTabIndex: 0 | -1;
}

export interface UseSelectionAriaProps {
  /** Number of tag rows in the selection grid */
  tagCount: number;
  /** Called with the index of the tag to remove (keyboard or remove button) */
  onRemoveAtIndex: (index: number) => void;
  /** The selection element (`role="grid"`) — used to focus tag rows after arrow navigation or removal */
  selectionRef?: RefObject<HTMLElement | null>;
  /**
   * When the popover is open and owns focus, do not move focus to tags and take tags
   * out of the tab order until the popover closes.
   */
  isPopoverOpen?: boolean;
  /** Disable row keyboard interaction and tab stops when the control is disabled */
  isDisabled?: boolean;
  /**
   * Where to move focus after removing a tag.
   * - `adjacent` (default): next/previous tag, or nowhere when none remain
   * - `input`: call `onFocusInput` (e.g. Combobox filter after Gmail-style delete)
   */
  focusAfterRemove?: 'adjacent' | 'input';
  /** Focus the filter input when `focusAfterRemove` is `input` */
  onFocusInput?: () => void;
}

/**
 * Focus a tag row inside the selection grid by index.
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

/**
 * Keyboard and roving tabindex behaviour for a selection grid (`role="grid"`):
 * one tab stop per row, arrow / Home / End navigation, Delete & Backspace
 * to remove, and the remove control participating in the tab order while the row contains focus.
 *
 * Tag-grid scoped today. A Collection + KeyboardDelegate-driven generalization shared with
 * option listboxes is deferred — see `hooks/selection/README.md`.
 *
 * @param props Hook configuration
 * @param props.onRemoveAtIndex
 * @param props.selectionRef
 * @param props.tagCount
 * @param props.isPopoverOpen
 * @param props.isDisabled
 * @param props.focusAfterRemove
 * @param props.onFocusInput
 * @returns {{ getKeyboardGridRowProps: (index: number) => SelectionGridRowProps, removeTagAtIndex: (index: number) => void, focusTagAtIndex: (index: number) => void }} Keyboard helpers for selection tag rows
 */
export const useSelectionAria = ({
  onRemoveAtIndex,
  selectionRef,
  tagCount,
  isPopoverOpen = false,
  isDisabled = false,
  focusAfterRemove = 'adjacent',
  onFocusInput,
}: UseSelectionAriaProps): {
  getKeyboardGridRowProps: (index: number) => SelectionGridRowProps;
  removeTagAtIndex: (index: number) => void;
  focusTagAtIndex: (index: number) => void;
} => {
  const [activeTagIndex, setActiveTagIndex] = useState(0);
  const [focusedRowIndex, setFocusedRowIndex] = useState<number | null>(null);
  // Bumped on every explicit focus request so a repeated request for the already active row
  // (e.g. Backspace from the input after a removal) still reaches the focusing effect.
  const [focusRequestId, setFocusRequestId] = useState(0);
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
  }, [activeTagIndex, focusRequestId, isPopoverOpen, selectionRef, tagCount]);

  const removeAt = useCallback(
    (index: number) => {
      const nextCount = tagCount - 1;

      if (focusAfterRemove === 'input') {
        setActiveTagIndex(nextCount > 0 ? Math.min(index, nextCount - 1) : 0);
        setFocusedRowIndex(null);
        onRemoveAtIndex(index);
        onFocusInput?.();

        return;
      }

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
    [focusAfterRemove, isPopoverOpen, onFocusInput, onRemoveAtIndex, tagCount],
  );

  const focusTagAtIndex = useCallback((index: number) => {
    if (index < 0) {
      return;
    }

    setActiveTagIndex(index);
    pendingFocusRowRef.current = index;
    setFocusRequestId((current) => current + 1);
  }, []);

  const getKeyboardGridRowProps = useCallback(
    (index: number): SelectionGridRowProps => {
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
          if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
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

          let move: GridRowMove | null = null;

          switch (event.key) {
            case 'ArrowRight':
            case 'ArrowDown':
              move = 'next';
              break;
            case 'ArrowLeft':
            case 'ArrowUp':
              move = 'previous';
              break;
            case 'Home':
              move = 'first';
              break;
            case 'End':
              move = 'last';
              break;
            default:
              break;
          }

          if (!move) {
            return;
          }

          const nextIndex = getWrappedRowIndex(index, tagCount, move);

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

  return { getKeyboardGridRowProps, removeTagAtIndex: removeAt, focusTagAtIndex };
};
