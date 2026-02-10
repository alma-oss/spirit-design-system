import { type ComponentPropsWithRef, type ElementType } from 'react';
import { type AlignmentX } from '../constants';
import { type ButtonColor, type ButtonSize } from './button';
import { type IconBoxSize } from './icon';
import {
  type ChildrenProps,
  type ClickEvent,
  type OmittedExtendedUnsafeStyleProps,
  type SpiritButtonElementProps,
  type SpiritDialogElementProps,
  type StyleProps,
} from './shared';

export type DrawerAlignmentXType = (typeof AlignmentX)['LEFT' | 'RIGHT'];

export type DrawerPanelElementType = 'aside' | 'form';

export type DrawerPanelHandlingProps = {
  isOpen: boolean;
  onClose: (event: ClickEvent) => void;
  closeOnBackdropClick?: boolean;
  closeOnEscapeKeyDown?: boolean;
};

export interface DrawerCloseButtonProps<C = void, S = void> extends Omit<
  SpiritButtonElementProps,
  'children' | 'color' | 'size'
> {
  color?: ButtonColor<C>;
  iconBoxSize?: IconBoxSize;
  label?: string;
  size?: ButtonSize<S>;
}

export type DrawerPanelBaseProps<E extends ElementType = DrawerPanelElementType> = {
  elementType?: E;
} & ChildrenProps &
  StyleProps;

export type DrawerPanelProps<E extends ElementType = DrawerPanelElementType> = DrawerPanelBaseProps<E> &
  OmittedExtendedUnsafeStyleProps<ComponentPropsWithRef<E>, keyof DrawerPanelBaseProps<E>>;

export interface DrawerBaseProps extends Omit<SpiritDialogElementProps, 'id'>, DrawerPanelHandlingProps, ChildrenProps {
  alignmentX?: DrawerAlignmentXType;
  id: string;
}

export interface SpiritDrawerProps extends DrawerBaseProps {}
