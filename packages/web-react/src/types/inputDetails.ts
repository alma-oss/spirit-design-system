import type { ElementType, ReactNode } from 'react';
import type { RegisterType as RegisterDetailsType } from '../hooks/useAriaIdRefs';
import type { ChildrenProps, PolymorphicComponentProps, StyleProps } from './shared';

/** ===== INTERNAL API ===== */
export interface InputDetailsBaseProps extends ChildrenProps, StyleProps {
  /** Details content */
  children: ReactNode;
  /** ID of the details element */
  id?: string;
  /** Callback to register aria-details ID */
  registerAriaDetails?: RegisterDetailsType;
}

/** ===== PUBLIC API ===== */
export type InputDetailsProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, InputDetailsBaseProps>;
