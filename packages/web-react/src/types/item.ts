import { type ElementType, type ReactNode } from 'react';
import { type PolymorphicComponentProps, type StyleProps } from './shared';

export const ITEM_SELECTION_DECORATOR_BACKGROUND = 'background';
export const ITEM_SELECTION_DECORATOR_BOTH = 'both';
export const ITEM_SELECTION_DECORATOR_ICON = 'icon';

export type ItemSelectionDecorator =
  | typeof ITEM_SELECTION_DECORATOR_BACKGROUND
  | typeof ITEM_SELECTION_DECORATOR_BOTH
  | typeof ITEM_SELECTION_DECORATOR_ICON;

export interface ItemStyleProps extends StyleProps {
  isDisabled?: boolean;
  isSelected?: boolean;
  selectionDecorator?: ItemSelectionDecorator;
}

/** ===== INTERNAL API ===== */
export interface ItemBaseProps extends StyleProps {
  helperText?: string;
  iconName?: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  label: string | ReactNode;
  selectionDecorator?: ItemSelectionDecorator;
}

/** ===== PUBLIC API ===== */
export type SpiritItemProps<E extends ElementType = 'button'> = PolymorphicComponentProps<E, ItemBaseProps>;
