import { type ElementType } from 'react';
import {
  type ChildrenProps,
  type FormFieldProps,
  type StyleProps,
  type ValidationTextProp,
  type ValidationTextStyleProps,
} from './shared';

export interface SpiritValidationTextProps<T extends ElementType = 'div'>
  extends FormFieldProps<T>, ValidationTextProp, StyleProps, ChildrenProps, ValidationTextStyleProps {}
