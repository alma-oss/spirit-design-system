import { type ElementType } from 'react';
import {
  type ChildrenProps,
  type RegisterType,
  type StyleProps,
  type TransferProps,
  type ValidationTextProp,
} from '../../types';

/** ===== INTERNAL API ===== */
export interface FieldBaseProps {
  id?: string;
  registerAria?: RegisterType;
}

export interface ValidationTextProps<T extends ElementType = 'div'>
  extends FieldProps<T>, ValidationTextProp, StyleProps, ChildrenProps, TransferProps {}
