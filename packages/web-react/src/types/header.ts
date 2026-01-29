import { type ElementType } from 'react';
import {
  type ChildrenProps,
  type ClickEvent,
  type RouterLinkProps,
  type SpiritButtonElementProps,
  type SpiritDialogElementProps,
  type SpiritElementProps,
  type SpiritLItemElementProps,
  type SpiritPolymorphicElementPropsWithRef,
  type SpiritSpanElementProps,
  type SpiritUListElementProps,
  type StyleProps,
  type TransferProps,
} from './shared';

export type HeaderActionsColorType = 'primary' | 'secondary';
export type HeaderColorType = 'primary' | 'transparent';

export type HeaderDialogHandlingProps = {
  isOpen: boolean;
  onClose: (event: ClickEvent) => void;
};

export type HeaderMobileActionsHandlingProps = {
  isOpen: boolean;
  onOpen: (event: ClickEvent) => void;
};

export interface HeaderProps extends SpiritElementProps, ChildrenProps {
  color?: HeaderColorType;
  isSimple?: boolean;
}

export interface HeaderButtonProps extends SpiritButtonElementProps, ChildrenProps {}

export interface HeaderDesktopActionsProps extends SpiritElementProps, ChildrenProps {
  isAtEnd?: boolean;
}

export interface HeaderDialogProps extends SpiritDialogElementProps, HeaderDialogHandlingProps, ChildrenProps {
  id: string;
}

export interface HeaderDialogActionsProps extends SpiritElementProps, ChildrenProps {
  color?: HeaderActionsColorType;
}

export interface HeaderDialogButtonProps extends SpiritButtonElementProps, ChildrenProps {}

export interface HeaderDialogCloseButtonProps extends Omit<SpiritButtonElementProps, 'children'> {
  label?: string;
}

export interface BaseHeaderDialogLinkProps extends ChildrenProps, StyleProps, TransferProps, RouterLinkProps {
  isCurrent?: boolean;
}

export type HeaderDialogLinkProps<E extends ElementType = 'a'> = {
  /**
   * The HTML element or React element used to render the Link, e.g. 'a'.
   *
   * @default 'a'
   */
  elementType?: E;
} & BaseHeaderDialogLinkProps;

export type SpiritDialogHeaderLinkProps<E extends ElementType = 'a'> = HeaderDialogLinkProps<E> &
  SpiritPolymorphicElementPropsWithRef<E, HeaderDialogLinkProps<E>>;

export interface HeaderDialogNavProps extends SpiritUListElementProps, ChildrenProps {}

export interface HeaderDialogNavItemProps extends SpiritLItemElementProps, ChildrenProps {}

export interface HeaderDialogTextProps extends SpiritSpanElementProps, ChildrenProps {}

export interface HeaderLinkBaseProps extends ChildrenProps, StyleProps, TransferProps, RouterLinkProps {
  isCurrent?: boolean;
}

export type HeaderLinkProps<E extends ElementType = 'a'> = {
  /**
   * The HTML element or React element used to render the Link, e.g. 'a'.
   *
   * @default 'a'
   */
  elementType?: E;
} & HeaderLinkBaseProps;

export type SpiritHeaderLinkProps<E extends ElementType = 'a'> = HeaderLinkProps<E> &
  SpiritPolymorphicElementPropsWithRef<E, HeaderLinkProps<E>>;

export interface HeaderMobileActionsProps extends SpiritElementProps, HeaderMobileActionsHandlingProps, ChildrenProps {
  dialogId: string;
  menuToggleLabel?: string;
}

export interface HeaderNavProps extends SpiritUListElementProps, ChildrenProps {}

export interface HeaderNavItemProps extends SpiritLItemElementProps, ChildrenProps {}
