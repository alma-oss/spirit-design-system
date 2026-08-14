import { getNodeText } from '../../hooks';
import {
  COMBOBOX_OPTION_CELL_CONTROL_SELECTOR,
  COMBOBOX_OPTION_ITEM_SELECTOR,
  COMBOBOX_OPTION_LABEL_ATTR,
  COMBOBOX_OPTION_VALUE_ATTR,
} from './constants';

export { getNodeText };

/**
 * Namespaced DOM id for an option item (unique per Combobox instance).
 *
 * @param comboboxId Combobox instance id prefix from `useComboboxId`
 * @param value Option selection key
 */
export const getComboboxOptionDomId = (comboboxId: string, value: string): string => `${comboboxId}-${value}`;

/**
 * Selection key from an option item (`data-spirit-value`, else raw `id` for custom items).
 *
 * @param optionEl Option item
 */
export const getOptionValueFromRow = (optionEl: HTMLElement): string =>
  optionEl.getAttribute(COMBOBOX_OPTION_VALUE_ATTR) || optionEl.id;

/** Structured option metadata collected from Combobox children. */
export interface ComboboxItem {
  isDisabled: boolean;
  key: string;
  label: string;
}

/**
 * Readable label for an option item element.
 *
 * @param optionEl Option item
 */
export const getRowLabel = (optionEl: HTMLElement): string => {
  const explicitLabel = optionEl.getAttribute(COMBOBOX_OPTION_LABEL_ATTR)?.trim();

  if (explicitLabel) {
    return explicitLabel;
  }

  const firstCell = optionEl.querySelector('[role="gridcell"]');

  return (firstCell?.textContent ?? optionEl.textContent ?? '').trim();
};

/**
 * Whether an option item is disabled (`aria-disabled`), so keyboard navigation skips it.
 *
 * @param optionEl Option item
 */
export const isOptionRowDisabled = (optionEl: HTMLElement | null | undefined): boolean =>
  optionEl?.getAttribute('aria-disabled') === 'true';

/**
 * Resolve the option row that owns the current focus (the row itself, or a nested control).
 *
 * @param focused Active element
 * @param visibleRows Visible option rows in the options widget
 */
export const getOptionRowFromFocus = (focused: Element | null, visibleRows: HTMLElement[]): HTMLElement | null => {
  if (!(focused instanceof HTMLElement)) {
    return null;
  }

  if (visibleRows.includes(focused)) {
    return focused;
  }

  const row = focused.closest<HTMLElement>(COMBOBOX_OPTION_ITEM_SELECTOR);

  return row && visibleRows.includes(row) ? row : null;
};

/**
 * Interactive controls nested in an option row (DOM order), for Left/Right cell navigation.
 *
 * @param rowEl Option row
 */
export const getOptionRowCellControls = (rowEl: HTMLElement): HTMLElement[] =>
  Array.from(rowEl.querySelectorAll<HTMLElement>(COMBOBOX_OPTION_CELL_CONTROL_SELECTOR));

/**
 * Whether every option id in `optionKeys` is selected.
 *
 * @param selectedKeys Selected keys (array or Set)
 * @param optionKeys Full option key set
 */
export const areAllOptionsSelected = (
  selectedKeys: readonly string[] | ReadonlySet<string>,
  optionKeys: readonly string[],
): boolean => {
  if (optionKeys.length === 0) {
    return false;
  }

  const selectedSet = selectedKeys instanceof Set ? selectedKeys : new Set(selectedKeys);

  return optionKeys.every((key) => selectedSet.has(key));
};

/**
 * Build a selection Set that preserves insertion order of `selectedKeys`.
 *
 * @param selectedKeys Selected keys
 */
export const createSelectedKeysSet = (selectedKeys: readonly string[]): ReadonlySet<string> => new Set(selectedKeys);

/**
 * Find an option item by selection key within the options widget (scoped lookup).
 *
 * @param optionsEl Options widget element
 * @param optionValue Option selection key
 */
export const getOptionRowEl = (optionsEl: HTMLElement | null, optionValue: string): HTMLElement | null => {
  if (!optionsEl || !optionValue) {
    return null;
  }

  return (
    Array.from(optionsEl.querySelectorAll<HTMLElement>(COMBOBOX_OPTION_ITEM_SELECTOR)).find(
      (option) => getOptionValueFromRow(option) === optionValue,
    ) ?? null
  );
};
