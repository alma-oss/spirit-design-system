import { type ElementType, type JSXElementConstructor, type ReactNode } from 'react';
import { type StyleProps, type TransferProps } from './shared';

export interface AriaItemElementTypeProps<T extends ElementType = 'button'> {
  /**
   * The HTML element or React element used to render the item, e.g. 'div', 'span'.
   *
   * @default 'button'
   */
  elementType?: T | JSXElementConstructor<unknown>;
}

export interface ItemStyleProps extends StyleProps, TransferProps {
  isDisabled?: boolean;
  isSelected?: boolean;
}

export interface SpiritItemProps<T extends ElementType = 'button'>
  extends AriaItemElementTypeProps<T>,
    StyleProps,
    TransferProps {
  helperText?: string;
  iconName?: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  label: string | ReactNode;
}
