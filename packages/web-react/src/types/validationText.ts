import { type ElementType } from 'react';
import {
  type ChildrenProps,
  type FormFieldProps,
  type FormFieldStyleProps,
  type StyleProps,
  type ValidationTextProp,
} from './shared';

export interface SpiritValidationTextProps<T extends ElementType = 'div'>
  extends FormFieldProps<T>, ValidationTextProp, StyleProps, ChildrenProps, FormFieldStyleProps {}
