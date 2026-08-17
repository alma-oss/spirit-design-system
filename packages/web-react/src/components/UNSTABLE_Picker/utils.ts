import type { ReactNode } from 'react';
import { getNodeText } from '../../hooks';
import type { UnstablePickerItemData } from './types';

export { getNodeText };

export const getPickerItemLabelMap = (items: UnstablePickerItemData[]): Record<string, ReactNode> => {
  const labelsMap: Record<string, ReactNode> = {};

  for (const item of items) {
    labelsMap[item.value] = item.label;
  }

  return labelsMap;
};

export const getSelectedItems = (keys: string[], labels: Record<string, ReactNode>): UnstablePickerItemData[] =>
  keys.map((value) => ({
    label: labels[value] ?? value,
    value,
  }));

export const getAggregatedTagLabel = (label: string, selectedItems: UnstablePickerItemData[]): ReactNode => {
  if (selectedItems.length > 1) {
    return `${label} (${selectedItems.length})`;
  }

  return selectedItems[0]?.label ?? label;
};

/**
 * How many `role="row"` tags participate in selection-grid keyboard navigation
 * (`useSelectionAria`). Returns `0` when nothing is selected.
 * Custom `renderTags` should use one `UNSTABLE_PickerTag` (row) per count, or behaviour will not match.
 *
 * @param selectedItemCount
 * @param options
 * @param options.isAggregated
 */
export const getPickerSelectionGridKeyboardRowCount = (
  selectedItemCount: number,
  options: { isAggregated: boolean },
): number => {
  const { isAggregated } = options;

  if (selectedItemCount === 0) {
    return 0;
  }

  return isAggregated ? 1 : selectedItemCount;
};
