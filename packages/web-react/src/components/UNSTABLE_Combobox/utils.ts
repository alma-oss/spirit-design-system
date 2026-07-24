import { Children, type ReactNode, isValidElement } from 'react';

/** Attribute holding the selection key on an option row (DOM `id` is namespaced). */
export const COMBOBOX_OPTION_VALUE_ATTR = 'data-spirit-value';

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

/**
 * Namespaced DOM id for an option row (unique per Combobox instance).
 *
 * @param comboboxId Combobox instance id prefix from `useComboboxId`
 * @param value Option selection key
 */
export const getComboboxOptionDomId = (comboboxId: string, value: string): string => `${comboboxId}-${value}`;

/**
 * Selection key from an option row (`data-spirit-value`, else raw `id` for custom rows).
 *
 * @param rowEl Option row
 */
export const getOptionValueFromRow = (rowEl: HTMLElement): string =>
  rowEl.getAttribute(COMBOBOX_OPTION_VALUE_ATTR) || rowEl.id;

/**
 * Collects option id → label from Combobox children (`UNSTABLE_ComboboxOption` or `role="row"` items).
 * Used so selection tags show readable labels before/without relying on DOM.
 *
 * @param children Combobox option children
 */
export const collectComboboxOptionLabels = (children: ReactNode): Record<string, string> => {
  const labels: Record<string, string> = {};

  const traverse = (node: ReactNode) => {
    Children.forEach(node, (child) => {
      if (!isValidElement<{ id?: string; role?: string; value?: string; children?: ReactNode }>(child)) {
        return;
      }

      const { id, role, value, children: childChildren } = child.props;

      if (isComboboxOption(child) && value) {
        labels[value] = getNodeText(childChildren);

        return;
      }

      if (role === 'row' && id) {
        labels[id] = getNodeText(childChildren);

        return;
      }

      if (childChildren != null) {
        traverse(childChildren);
      }
    });
  };

  traverse(children);

  return labels;
};

/**
 * Collects option selection keys from Combobox children (insertion order, unique).
 *
 * @param children Combobox option children
 */
export const collectComboboxOptionKeys = (children: ReactNode): string[] => {
  const keys: string[] = [];
  const seen = new Set<string>();

  const push = (key: string) => {
    if (!key || seen.has(key)) {
      return;
    }

    seen.add(key);
    keys.push(key);
  };

  const traverse = (node: ReactNode) => {
    Children.forEach(node, (child) => {
      if (!isValidElement<{ id?: string; role?: string; value?: string; children?: ReactNode }>(child)) {
        return;
      }

      const { id, role, value, children: childChildren } = child.props;

      if (isComboboxOption(child) && value) {
        push(value);

        return;
      }

      if (role === 'row' && id) {
        push(id);

        return;
      }

      if (childChildren != null) {
        traverse(childChildren);
      }
    });
  };

  traverse(children);

  return keys;
};

/**
 * Readable label for an option row element.
 *
 * @param rowEl Option row
 */
export const getRowLabel = (rowEl: HTMLElement): string => {
  const firstCell = rowEl.querySelector('[role="gridcell"]');

  return (firstCell?.textContent ?? rowEl.textContent ?? '').trim();
};

/**
 * Visible option rows inside the listbox grid (not hidden via `display: none` / `hidden`).
 *
 * @param listboxEl Listbox grid element
 */
export const getVisibleOptionRows = (listboxEl: HTMLElement | null): HTMLElement[] => {
  if (!listboxEl) {
    return [];
  }

  return Array.from(listboxEl.querySelectorAll<HTMLElement>('[role="row"]')).filter((row) => {
    if (row.hasAttribute('hidden') || row.getAttribute('aria-hidden') === 'true') {
      return false;
    }

    return row.style.display !== 'none';
  });
};

/**
 * Whether every option id in `optionKeys` is selected.
 *
 * @param selectedKeys Selected keys
 * @param optionKeys Full option key set
 */
export const areAllOptionsSelected = (selectedKeys: string[], optionKeys: string[]): boolean =>
  optionKeys.length > 0 && optionKeys.every((key) => selectedKeys.includes(key));

/**
 * Find an option row by selection key within a listbox (scoped lookup).
 *
 * @param listboxEl Listbox grid element
 * @param optionValue Option selection key
 */
export const getOptionRowEl = (listboxEl: HTMLElement | null, optionValue: string): HTMLElement | null => {
  if (!listboxEl || !optionValue) {
    return null;
  }

  return (
    Array.from(listboxEl.querySelectorAll<HTMLElement>('[role="row"]')).find(
      (row) => getOptionValueFromRow(row) === optionValue,
    ) ?? null
  );
};
