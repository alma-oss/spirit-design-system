import type { ElementType } from 'react';
import type { ChildrenProps, StyleProps, TransferProps } from '../../types';
import type { RegisterType as RegisterDetailsType } from '../Field/useAriaIdRefs';

export interface InputDetailsProps<T extends ElementType = 'div'> extends ChildrenProps, StyleProps, TransferProps {
  elementType?: T;
  id?: string;
  registerAriaDetails?: RegisterDetailsType;
}
