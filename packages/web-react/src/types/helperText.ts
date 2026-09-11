import { type AriaRole, type ElementType, type ReactNode } from 'react';
import { type ChildrenProps, type FormFieldProps, type FormFieldStyleProps, type StyleProps } from './shared';

export interface SpiritHelperTextProps<T extends ElementType = 'div'>
  extends FormFieldProps<T>, StyleProps, ChildrenProps, FormFieldStyleProps {
  helperText: ReactNode;
  /** ARIA role (e.g. `status` for live upload progress). */
  role?: AriaRole;
}
