import { type ElementType, type ReactNode } from 'react';
import { type ChildrenProps, type FormFieldContextValue, type FormFieldProps, type StyleProps } from './shared';

export interface SpiritHelperTextProps<T extends ElementType = 'div'>
  extends
    FormFieldProps<T>,
    StyleProps,
    ChildrenProps,
    Partial<Pick<FormFieldContextValue, 'isDisabled' | 'formFieldVariant'>> {
  helperText: ReactNode;
}
