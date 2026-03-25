import type { ElementType, ReactNode } from 'react';
import type { RegisterType as RegisterDetailsType } from '../hooks/useAriaIdRefs';
import type { ChildrenProps, StyleProps } from './shared';

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
