import { type ComponentPropsWithRef, type ElementType, type ReactNode, type SyntheticEvent } from 'react';
import { type AlignmentX } from '../constants';
import { type SpiritControlButtonProps } from './controlButton';
import {
  type ChildrenProps,
  type OmittedExtendedUnsafeStyleProps,
  type SpiritDialogElementProps,
  type StyleProps,
} from './shared';

export type DrawerAlignmentXType = (typeof AlignmentX)['LEFT' | 'RIGHT'];

export type DrawerPanelElementType = 'aside' | 'form';

export type DrawerPanelHandlingProps = {
  isOpen: boolean;
  onClose: (event: Event | SyntheticEvent) => void;
  closeOnBackdropClick?: boolean;
  closeOnEscapeKeyDown?: boolean;
};

export interface DrawerCloseButtonProps extends Omit<
  SpiritControlButtonProps<'button'>,
  'children' | 'isSymmetrical' | 'size'
> {
  label?: string;
}

export type DrawerPanelBaseProps<E extends ElementType = DrawerPanelElementType> = {
  elementType?: E;
  /** The close button rendered automatically inside the panel header. */
  closeButton?: ReactNode;
} & ChildrenProps &
  StyleProps;

export type DrawerPanelProps<E extends ElementType = DrawerPanelElementType> = DrawerPanelBaseProps<E> &
  OmittedExtendedUnsafeStyleProps<ComponentPropsWithRef<E>, keyof DrawerPanelBaseProps<E>>;

export interface DrawerBaseProps extends Omit<SpiritDialogElementProps, 'id'>, DrawerPanelHandlingProps, ChildrenProps {
  alignmentX?: DrawerAlignmentXType;
  id: string;
}

export interface SpiritDrawerProps extends DrawerBaseProps {}
