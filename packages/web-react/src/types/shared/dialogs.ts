import { type SyntheticEvent } from 'react';
import { type SpiritDialogElementPropsWithRef } from './element';
import { type ChildrenProps, type StyleProps } from '.';

export type DialogElementBaseProps = SpiritDialogElementPropsWithRef;

export interface DialogProps extends DialogElementBaseProps, ChildrenProps, StyleProps {
  isOpen: boolean;
  onClose: (event: Event | SyntheticEvent) => void;
  closeOnBackdropClick?: boolean;
  closeOnEscapeKeyDown?: boolean;
}
