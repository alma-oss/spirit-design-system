import { type ElementType } from 'react';
import {
  type ChildrenProps,
  type RegisterType,
  type StyleProps,
  type TransferProps,
  type ValidationTextProp,
} from '../../types';

export interface FieldElementTypeProps<E extends ElementType = 'div'> {
  /**
   * The HTML element or React element used to render the pill, e.g. 'div', 'span'.
   *
   * @default 'div'
   */
  elementType?: E;
}

export interface FieldProps<E extends ElementType = 'div'> extends FieldElementTypeProps<E> {
  id?: string;
  registerAria?: RegisterType;
}

export interface ValidationTextProps<T extends ElementType = 'div'>
  extends FieldProps<T>, ValidationTextProp, StyleProps, ChildrenProps, TransferProps {}
