'use client';

import { type KeyboardEvent, type RefObject, useCallback, useEffect, useRef, useState } from 'react';
import {
  type GridRowMove,
  getNextEnabledRowIndex,
  mapComboboxInputKeyToAction,
  useIsomorphicLayoutEffect,
} from '../../hooks';
import { getOptionRowCellControls, getOptionValueFromRow, isOptionRowDisabled } from './utils';

export interface UseComboboxOptionGridKeyboardProps {
  listboxRef: RefObject<HTMLElement | null>;
  inputRef: RefObject<HTMLInputElement>;
  isOpen: boolean;
  isDisabled?: boolean;
  activeDescendantId?: string;
  /** When true, Backspace on the empty filter focuses the last selected tag */
  canFocusLastTag?: boolean;
  /** Mounted option rows from the collection (no DOM visibility scan). */
  getVisibleOptionRows: () => HTMLElement[];
  onOpen: () => void;
  onClose: () => void;
  onToggleOption: (optionId: string) => void;
  /** Focus the last selected tag (Backspace on empty filter; Gmail-style) */
  onFocusLastTag?: () => void;
  setActiveDescendantId: (id: string | undefined) => void;
}

/**
 * Prevent the default browser action, then run a keyboard side effect.
 *
 * @param event Keyboard event
 * @param action Side effect to run after preventDefault
 */
const runPreventedAction = (event: KeyboardEvent<HTMLElement>, action: () => void) => {
  event.preventDefault();
  action();
};

/**
 * Visually activate an option row (no DOM focus) and sync `aria-activedescendant`.
 *
 * @param rowEl Option row
 * @param setActiveDescendantId State setter for activedescendant
 */
const activateOptionRow = (
  rowEl: HTMLElement | null | undefined,
  setActiveDescendantId: (id: string | undefined) => void,
) => {
  if (!rowEl) {
    return;
  }

  rowEl.scrollIntoView({ block: 'nearest' });

  if (rowEl.id) {
    setActiveDescendantId(rowEl.id);
  }
};

/**
 * Scroll a nested cell control into view without moving DOM focus.
 *
 * @param controlEl Nested interactive control
 */
const scrollOptionCellControlIntoView = (controlEl: HTMLElement) => {
  controlEl.scrollIntoView({ block: 'nearest' });
};

/**
 * Activate the row the move lands on, skipping disabled rows.
 *
 * @param visibleRows Visible option rows
 * @param currentIndex Index of the active row (`-1` when none)
 * @param move Navigation move
 * @param setActiveDescendantId State setter for activedescendant
 */
const activateOptionRowByMove = (
  visibleRows: HTMLElement[],
  currentIndex: number,
  move: GridRowMove,
  setActiveDescendantId: (id: string | undefined) => void,
) => {
  const nextIndex = getNextEnabledRowIndex(currentIndex, visibleRows.length, move, (index) =>
    isOptionRowDisabled(visibleRows[index]),
  );

  if (nextIndex === -1) {
    return;
  }

  activateOptionRow(visibleRows[nextIndex], setActiveDescendantId);
};

/**
 * Keyboard navigation for the combobox option list using pure `aria-activedescendant`.
 * DOM focus stays on the filter input; arrow keys only update the visual active option.
 *
 * @param props Hook configuration
 * @param props.listboxRef Options widget element ref
 * @param props.inputRef Filter input element ref
 * @param props.isOpen Whether the options popover is open
 * @param props.isDisabled Whether the Combobox is disabled
 * @param props.activeDescendantId Id of the visually active option
 * @param props.canFocusLastTag Whether Backspace may move focus to the last selected tag
 * @param props.onOpen Open the options popover
 * @param props.onClose Close the options popover
 * @param props.onToggleOption Toggle selection for an option value
 * @param props.onFocusLastTag Focus the last selected tag from an empty filter
 * @param props.setActiveDescendantId State setter for activedescendant
 * @param props.getVisibleOptionRows
 */
export const useComboboxOptionGridKeyboard = ({
  listboxRef,
  inputRef,
  isOpen,
  isDisabled = false,
  activeDescendantId,
  canFocusLastTag = false,
  getVisibleOptionRows,
  onOpen,
  onClose,
  onToggleOption,
  onFocusLastTag,
  setActiveDescendantId,
}: UseComboboxOptionGridKeyboardProps): {
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  activeNestedControlIndex: number | null;
  clearActiveNestedControl: () => void;
} => {
  const pendingActivateEdgeRef = useRef<'first' | 'last' | null>(null);
  const [activeNestedControlIndex, setActiveNestedControlIndex] = useState<number | null>(null);

  const clearActiveNestedControl = useCallback(() => {
    setActiveNestedControlIndex(null);
  }, []);

  const clearActiveDescendant = useCallback(() => {
    setActiveDescendantId(undefined);
    setActiveNestedControlIndex(null);
  }, [setActiveDescendantId]);

  useEffect(() => {
    if (!activeDescendantId) {
      setActiveNestedControlIndex(null);
    }
  }, [activeDescendantId]);

  const activateEdgeOption = useCallback(
    (edge: 'first' | 'last') => {
      setActiveNestedControlIndex(null);
      activateOptionRowByMove(getVisibleOptionRows(), -1, edge, setActiveDescendantId);
    },
    [getVisibleOptionRows, setActiveDescendantId],
  );

  // Options exist only once the popover is open, so arrow keys on a closed combobox wait for that render.
  useIsomorphicLayoutEffect(() => {
    const edge = pendingActivateEdgeRef.current;

    if (!edge || !isOpen) {
      return;
    }

    pendingActivateEdgeRef.current = null;
    activateEdgeOption(edge);
  }, [activateEdgeOption, isOpen]);

  // Keep nested-control `is-active` in sync after React re-renders the active option.
  useIsomorphicLayoutEffect(() => {
    const listboxEl = listboxRef.current;

    if (!listboxEl) {
      return;
    }

    listboxEl.querySelectorAll<HTMLElement>('[data-spirit-combobox-active-control]').forEach((element) => {
      element.removeAttribute('data-spirit-combobox-active-control');
      element.classList.remove('is-active');
    });

    if (!activeDescendantId || activeNestedControlIndex == null) {
      return;
    }

    const rowEl = document.getElementById(activeDescendantId);

    if (!rowEl || !listboxEl.contains(rowEl)) {
      return;
    }

    const controlEl = getOptionRowCellControls(rowEl)[activeNestedControlIndex];

    if (!controlEl) {
      return;
    }

    controlEl.classList.add('is-active');
    controlEl.setAttribute('data-spirit-combobox-active-control', '');
  }, [activeDescendantId, activeNestedControlIndex, listboxRef]);

  const getActiveRowState = useCallback(() => {
    const visible = getVisibleOptionRows();
    const currentRow = activeDescendantId ? (visible.find((row) => row.id === activeDescendantId) ?? null) : null;
    const currentIndex = currentRow ? visible.indexOf(currentRow) : -1;

    return { visible, currentRow, currentIndex };
  }, [activeDescendantId, getVisibleOptionRows]);

  const onInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (isDisabled) {
        return;
      }

      const action = mapComboboxInputKeyToAction(event.key, isOpen, Boolean(activeDescendantId), canFocusLastTag);

      if (!action) {
        return;
      }

      // Tab must leave the field; every other handled key keeps DOM focus on the input.
      let shouldKeepInputFocus = true;

      switch (action.type) {
        case 'CLOSE':
          runPreventedAction(event, () => {
            pendingActivateEdgeRef.current = null;
            clearActiveDescendant();
            onClose();
          });
          break;
        case 'TAB_OUT':
          pendingActivateEdgeRef.current = null;
          clearActiveDescendant();
          onClose();
          shouldKeepInputFocus = false;
          break;
        case 'FOCUS_LAST_TAG':
          runPreventedAction(event, () => {
            pendingActivateEdgeRef.current = null;
            clearActiveDescendant();
            onClose();
            onFocusLastTag?.();
          });
          shouldKeepInputFocus = false;
          break;
        case 'FOCUS_FIRST':
          runPreventedAction(event, () => {
            activateEdgeOption('first');
          });
          break;
        case 'FOCUS_LAST':
          runPreventedAction(event, () => {
            activateEdgeOption('last');
          });
          break;
        case 'OPEN_AND_FOCUS_FIRST':
          runPreventedAction(event, () => {
            pendingActivateEdgeRef.current = 'first';
            onOpen();
          });
          break;
        case 'OPEN_AND_FOCUS_LAST':
          runPreventedAction(event, () => {
            pendingActivateEdgeRef.current = 'last';
            onOpen();
          });
          break;
        case 'MOVE_DOWN': {
          const { visible, currentIndex } = getActiveRowState();

          runPreventedAction(event, () => {
            setActiveNestedControlIndex(null);
            activateOptionRowByMove(visible, currentIndex, 'next', setActiveDescendantId);
          });
          break;
        }
        case 'MOVE_UP': {
          const { visible, currentIndex } = getActiveRowState();

          runPreventedAction(event, () => {
            setActiveNestedControlIndex(null);
            activateOptionRowByMove(visible, currentIndex, 'previous', setActiveDescendantId);
          });
          break;
        }
        case 'MOVE_HOME': {
          const { visible, currentIndex } = getActiveRowState();

          runPreventedAction(event, () => {
            setActiveNestedControlIndex(null);
            activateOptionRowByMove(visible, currentIndex, 'first', setActiveDescendantId);
          });
          break;
        }
        case 'MOVE_END': {
          const { visible, currentIndex } = getActiveRowState();

          runPreventedAction(event, () => {
            setActiveNestedControlIndex(null);
            activateOptionRowByMove(visible, currentIndex, 'last', setActiveDescendantId);
          });
          break;
        }
        case 'MOVE_RIGHT': {
          const { currentRow } = getActiveRowState();

          if (!currentRow) {
            return;
          }

          const controls = getOptionRowCellControls(currentRow);

          if (!controls.length) {
            return;
          }

          runPreventedAction(event, () => {
            const nextIndex = activeNestedControlIndex == null ? 0 : activeNestedControlIndex + 1;

            if (nextIndex >= controls.length) {
              return;
            }

            scrollOptionCellControlIntoView(controls[nextIndex]);
            setActiveNestedControlIndex(nextIndex);
          });
          break;
        }
        case 'MOVE_LEFT': {
          const { currentRow } = getActiveRowState();

          if (!currentRow || activeNestedControlIndex == null) {
            return;
          }

          const controls = getOptionRowCellControls(currentRow);

          if (!controls.length) {
            return;
          }

          runPreventedAction(event, () => {
            if (activeNestedControlIndex <= 0) {
              setActiveNestedControlIndex(null);
              activateOptionRow(currentRow, setActiveDescendantId);

              return;
            }

            const previousControl = controls[activeNestedControlIndex - 1];

            scrollOptionCellControlIntoView(previousControl);
            setActiveNestedControlIndex(activeNestedControlIndex - 1);
          });
          break;
        }
        case 'TOGGLE_ACTIVE': {
          const { currentRow } = getActiveRowState();

          if (!currentRow) {
            return;
          }

          if (activeNestedControlIndex != null) {
            const controlEl = getOptionRowCellControls(currentRow)[activeNestedControlIndex];

            if (controlEl) {
              runPreventedAction(event, () => {
                controlEl.click();
              });
            }

            break;
          }

          // Row-level Enter activates a nested link when present (e.g. Last Searches); otherwise toggles selection.
          if (!isOptionRowDisabled(currentRow)) {
            const linkEl = currentRow.querySelector<HTMLAnchorElement>('a[href]');

            if (linkEl) {
              runPreventedAction(event, () => {
                linkEl.click();
              });

              break;
            }
          }

          runPreventedAction(event, () => {
            const optionValue = getOptionValueFromRow(currentRow);

            if (optionValue && !isOptionRowDisabled(currentRow)) {
              onToggleOption(optionValue);
            }
          });
          break;
        }
        default:
          break;
      }

      // Keep DOM focus on the filter input for the pure activedescendant model.
      if (shouldKeepInputFocus && document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
      }
    },
    [
      activateEdgeOption,
      activeDescendantId,
      activeNestedControlIndex,
      canFocusLastTag,
      clearActiveDescendant,
      getActiveRowState,
      inputRef,
      isDisabled,
      isOpen,
      onClose,
      onFocusLastTag,
      onOpen,
      onToggleOption,
      setActiveDescendantId,
    ],
  );

  return { onInputKeyDown, activeNestedControlIndex, clearActiveNestedControl };
};
