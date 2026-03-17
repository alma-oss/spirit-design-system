import { type ElementType } from 'react';
import {
  type ChildrenProps,
  type FormFieldContextValue,
  type FormFieldProps,
  type StyleProps,
  type ValidationTextProp,
} from './shared';

export interface SpiritValidationTextProps<T extends ElementType = 'div'>
  extends
    FormFieldProps<T>,
    ValidationTextProp,
    StyleProps,
    ChildrenProps,
    Partial<Pick<FormFieldContextValue, 'isDisabled' | 'formFieldVariant'>> {}
