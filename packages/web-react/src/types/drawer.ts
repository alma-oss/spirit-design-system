import { type ComponentPropsWithRef, type ElementType, type SyntheticEvent } from 'react';
import { type AlignmentX } from '../constants';
import { type SpiritControlButtonProps } from './controlButton';
import {
  type ChildrenProps,
  type OmittedExtendedUnsafeStyleProps,
  type SpiritDialogElementProps,
  type SpiritDivElementProps,
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
} & ChildrenProps &
  StyleProps;

export type DrawerPanelProps<E extends ElementType = DrawerPanelElementType> = DrawerPanelBaseProps<E> &
  OmittedExtendedUnsafeStyleProps<ComponentPropsWithRef<E>, keyof DrawerPanelBaseProps<E>>;

export interface DrawerPanelHeaderProps extends SpiritDivElementProps, ChildrenProps {}

export interface DrawerPanelContentProps extends SpiritDivElementProps, ChildrenProps {
  /** Whether the content has inner spacing consistent with the panel header. */
  hasSpacing?: boolean;
}

export interface DrawerBaseProps extends Omit<SpiritDialogElementProps, 'id'>, DrawerPanelHandlingProps, ChildrenProps {
  alignmentX?: DrawerAlignmentXType;
  id: string;
}

export interface SpiritDrawerProps extends DrawerBaseProps {}
