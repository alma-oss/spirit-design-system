import { type ElementType } from 'react';
import {
  type ChildrenProps,
  type ClickEvent,
  type PolymorphicComponentProps,
  type PolymorphicRef,
  type SpiritButtonElementProps,
  type SpiritDialogElementProps,
  type SpiritElementProps,
  type SpiritLItemElementProps,
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

export interface BaseHeaderDialogLinkProps extends ChildrenProps, StyleProps, TransferProps {
  isCurrent?: boolean;
}

export type HeaderDialogLinkProps<E extends ElementType = 'a'> = PolymorphicComponentProps<E, BaseHeaderDialogLinkProps>;

/** @deprecated Use HeaderDialogLinkProps instead */
export type SpiritDialogHeaderLinkProps<E extends ElementType = 'a'> = HeaderDialogLinkProps<E>;

/**
 * @internal
 * Helper type to get the correct ref type for a HeaderDialogLink component
 */
export type HeaderDialogLinkRef<E extends ElementType = 'a'> = PolymorphicRef<E>;

export interface HeaderDialogNavProps extends SpiritUListElementProps, ChildrenProps {}

export interface HeaderDialogNavItemProps extends SpiritLItemElementProps, ChildrenProps {}

export interface HeaderDialogTextProps extends SpiritSpanElementProps, ChildrenProps {}

export interface HeaderLinkBaseProps extends ChildrenProps, StyleProps, TransferProps {
  isCurrent?: boolean;
}

export type HeaderLinkProps<E extends ElementType = 'a'> = PolymorphicComponentProps<E, HeaderLinkBaseProps>;

/** @deprecated Use HeaderLinkProps instead */
export type SpiritHeaderLinkProps<E extends ElementType = 'a'> = HeaderLinkProps<E>;

/**
 * @internal
 * Helper type to get the correct ref type for a HeaderLink component
 */
export type HeaderLinkRef<E extends ElementType = 'a'> = PolymorphicRef<E>;

export interface HeaderMobileActionsProps extends SpiritElementProps, HeaderMobileActionsHandlingProps, ChildrenProps {
  dialogId: string;
  menuToggleLabel?: string;
}

export interface HeaderNavProps extends SpiritUListElementProps, ChildrenProps {}

export interface HeaderNavItemProps extends SpiritLItemElementProps, ChildrenProps {}
