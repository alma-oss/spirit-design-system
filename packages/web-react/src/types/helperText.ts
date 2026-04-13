import { type ElementType, type ReactNode } from 'react';
import { type ChildrenProps, type FormFieldProps, type FormFieldStyleProps, type StyleProps } from './shared';

export interface SpiritHelperTextProps<T extends ElementType = 'div'>
  extends FormFieldProps<T>, StyleProps, ChildrenProps, FormFieldStyleProps {
  helperText: ReactNode;
}
