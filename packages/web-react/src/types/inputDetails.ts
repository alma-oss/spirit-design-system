import type { ElementType, ReactNode } from 'react';
import type { ChildrenProps, RegisterType as RegisterDetailsType, StyleProps } from './shared';

export interface InputDetailsProps<T extends ElementType = 'div'> extends ChildrenProps, StyleProps {
  /** Details content */
  children: ReactNode;
  /** Type of element used as container */
  elementType?: T;
  /** ID of the details element */
  id?: string;
  /** Callback to register aria-details ID */
  registerAriaDetails?: RegisterDetailsType;
}
