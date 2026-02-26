import { type ElementType, type ReactNode } from 'react';
import { type StyleProps, type TransferProps } from './shared';

export const ITEM_SELECTION_DECORATOR_BACKGROUND = 'background';
export const ITEM_SELECTION_DECORATOR_BOTH = 'both';
export const ITEM_SELECTION_DECORATOR_ICON = 'icon';

export type ItemSelectionDecorator =
  | typeof ITEM_SELECTION_DECORATOR_BACKGROUND
  | typeof ITEM_SELECTION_DECORATOR_BOTH
  | typeof ITEM_SELECTION_DECORATOR_ICON;

export interface AriaItemElementTypeProps<E extends ElementType = 'button'> {
  /**
   * The HTML element or React element used to render the item, e.g. 'div', 'span'.
   *
   * @default 'button'
   */
  elementType?: E;
}

export interface ItemStyleProps extends StyleProps, TransferProps {
  isDisabled?: boolean;
  isSelected?: boolean;
  selectionDecorator?: ItemSelectionDecorator;
}

export interface SpiritItemProps<T extends ElementType = 'button'>
  extends AriaItemElementTypeProps<T>, StyleProps, TransferProps {
  helperText?: string;
  iconName?: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  label: string | ReactNode;
  selectionDecorator?: ItemSelectionDecorator;
}
