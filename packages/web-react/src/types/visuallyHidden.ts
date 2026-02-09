import { type ElementType } from 'react';
import { type ChildrenProps, type StyleProps, type TransferProps } from './shared';

export interface VisuallyHiddenElementTypeProps<E extends ElementType = 'span'> {
  /**
   * The HTML element or React element used to render the VisuallyHidden component, e.g. 'span'.
   *
   * @default 'span'
   */
  elementType?: E;
}

export interface VisuallyHiddenProps<T extends ElementType = 'span'>
  extends VisuallyHiddenElementTypeProps<T>, ChildrenProps, StyleProps, TransferProps {}

export interface SpiritVisuallyHiddenProps<E extends ElementType = 'span'> extends VisuallyHiddenProps<E> {}
