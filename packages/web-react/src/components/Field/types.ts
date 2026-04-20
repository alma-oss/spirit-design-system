import { type ElementType, type ReactNode } from 'react';
import { type RegisterType } from '../../hooks/useAriaIdRefs';
import {
  type ChildrenProps,
  type PolymorphicComponentProps,
  type StyleProps,
  type ValidationTextProp,
} from '../../types';

/** ===== INTERNAL API ===== */
export interface FieldBaseProps {
  id?: string;
  registerAria?: RegisterType;
}

export interface HelperTextBaseProps extends FieldBaseProps, StyleProps, ChildrenProps {
  helperText: ReactNode;
}

export interface ValidationTextBaseProps extends FieldBaseProps, ValidationTextProp, StyleProps, ChildrenProps {}

/** ===== PUBLIC API ===== */
export type HelperTextProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, HelperTextBaseProps>;

export type ValidationTextProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, ValidationTextBaseProps>;
