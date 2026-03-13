import type { ElementType, ReactNode } from 'react';
<<<<<<< HEAD
import type { RegisterType as RegisterDetailsType } from '../hooks/useAriaIdRefs';
import type { ChildrenProps, PolymorphicComponentProps, StyleProps } from './shared';
=======
import type { ChildrenProps, RegisterType as RegisterDetailsType, StyleProps } from './shared';
>>>>>>> 92c17dc32 (refactor(web-react): extract `HelperText` and move `useAriaIds` to shared hooks #DS-2398)

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
