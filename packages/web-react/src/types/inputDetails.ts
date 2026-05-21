import type { ElementType, ReactNode } from 'react';
import type {
  ChildrenProps,
  PolymorphicComponentProps,
  RegisterType as RegisterDetailsType,
  StyleProps,
} from './shared';

/** ===== INTERNAL API ===== */
export interface InputDetailsBaseProps extends ChildrenProps, StyleProps {
  /** Details content */
  children: ReactNode;
  /** ID of the details element */
  id?: string;
  /** Whether the input details are disabled */
  isDisabled?: boolean;
  /** Callback to register aria-details ID */
  registerAriaDetails?: RegisterDetailsType;
}

/** ===== PUBLIC API ===== */
export type InputDetailsProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, InputDetailsBaseProps>;
