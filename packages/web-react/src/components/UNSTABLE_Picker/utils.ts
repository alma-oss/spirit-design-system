import { Children, type ReactNode, isValidElement } from 'react';
import type { UnstablePickerItemData } from './types';

const isPickerItem = (node: ReactNode) =>
  isValidElement(node) && (node.type as { spiritComponent?: string })?.spiritComponent === 'UNSTABLE_PickerItem';

const normalizeWhitespace = (text: string) => text.replace(/\s+/g, ' ').trim();

export const collectPickerItems = (children: ReactNode): UnstablePickerItemData[] => {
  const items: UnstablePickerItemData[] = [];

  const traverse = (node: ReactNode) => {
    Children.forEach(node, (child) => {
      if (!isValidElement(child)) {
        return;
      }

      if (isPickerItem(child)) {
        items.push({
          label: child.props.children as ReactNode,
          value: child.props.value as string,
        });

        return;
      }

      if (child.props?.children) {
        traverse(child.props.children);
      }
    });
  };

  traverse(children);

  return items;
};

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

export const getNodeText = (value: ReactNode): string => {
  const collect = (node: ReactNode): string => {
    if (node == null || typeof node === 'boolean') {
      return '';
    }

    if (typeof node === 'string' || typeof node === 'number') {
      return String(node);
    }

    if (Array.isArray(node)) {
      return node.map(collect).filter(Boolean).join(' ');
    }

    if (isValidElement(node)) {
      return collect(node.props.children as ReactNode);
    }

    return '';
  };

  const text = collect(value);

  return normalizeWhitespace(text);
};

export const getAggregatedTagLabel = (label: string, selectedItems: UnstablePickerItemData[]): ReactNode => {
  if (selectedItems.length > 1) {
    return `${label} (${selectedItems.length})`;
  }

  return selectedItems[0]?.label ?? label;
};

/**
 * How many `role="row"` tags participate in selection-grid keyboard navigation
 * (`usePickerSelectionGridKeyboard`). Returns `0` when nothing is selected.
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
