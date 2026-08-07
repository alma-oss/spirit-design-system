import { Children, type ReactNode, isValidElement } from 'react';
import {
  COMBOBOX_OPTION_CELL_CONTROL_SELECTOR,
  COMBOBOX_OPTION_ITEM_SELECTOR,
  COMBOBOX_OPTION_LABEL_ATTR,
  COMBOBOX_OPTION_VALUE_ATTR,
} from './constants';

/**
 * Flattens a ReactNode to plain text (for aria-labels).
 *
 * @param node React node
 */
export const getNodeText = (node: ReactNode): string => {
  if (node == null || typeof node === 'boolean') {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join('');
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }

  return '';
};

const isComboboxOption = (node: ReactNode) =>
  isValidElement(node) && (node.type as { spiritComponent?: string })?.spiritComponent === 'UNSTABLE_ComboboxOption';

const isOptionItemRole = (role?: string) => role === 'option' || role === 'row';

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

/** Structured option metadata collected from Combobox children (Picker-style item collection). */
export interface ComboboxItem {
  isDisabled: boolean;
  key: string;
  label: string;
}

/**
 * Collects Combobox option items from children (`UNSTABLE_ComboboxOption` or `role="option"|"row"`).
 * Insertion order, unique by key.
 *
 * @param children Combobox option children
 */
export const collectComboboxItems = (children: ReactNode): ComboboxItem[] => {
  const items: ComboboxItem[] = [];
  const seen = new Set<string>();

  const push = (item: ComboboxItem) => {
    if (!item.key || seen.has(item.key)) {
      return;
    }

    seen.add(item.key);
    items.push(item);
  };

  const traverse = (node: ReactNode) => {
    Children.forEach(node, (child) => {
      if (
        !isValidElement<{
          id?: string;
          isDisabled?: boolean;
          label?: string;
          role?: string;
          value?: string;
          children?: ReactNode;
        }>(child)
      ) {
        return;
      }

      const { id, isDisabled, label, role, value, children: childChildren } = child.props;

      if (isComboboxOption(child) && value) {
        push({
          key: value,
          label: label || getNodeText(childChildren),
          isDisabled: Boolean(isDisabled),
        });

        return;
      }

      if (isOptionItemRole(role) && id) {
        push({
          key: id,
          label: getNodeText(childChildren),
          isDisabled: Boolean(isDisabled),
        });

        return;
      }

      if (childChildren != null) {
        traverse(childChildren);
      }
    });
  };

  traverse(children);

  return items;
};

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
 * Visible option items inside the options widget (not hidden via `display: none` / `hidden`).
 *
 * @param optionsEl Options widget element (`listbox` or `grid`)
 */
export const getVisibleOptionRows = (optionsEl: HTMLElement | null): HTMLElement[] => {
  if (!optionsEl) {
    return [];
  }

  return Array.from(optionsEl.querySelectorAll<HTMLElement>(COMBOBOX_OPTION_ITEM_SELECTOR)).filter((option) => {
    if (option.hasAttribute('hidden') || option.getAttribute('aria-hidden') === 'true') {
      return false;
    }

    return option.style.display !== 'none';
  });
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
