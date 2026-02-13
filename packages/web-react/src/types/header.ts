import { type ElementType, type SyntheticEvent } from 'react';
import {
  type ChildrenProps,
  type PolymorphicComponentProps,
  type SpiritButtonElementProps,
  type SpiritDialogElementProps,
  type SpiritElementProps,
  type SpiritLItemElementProps,
  type SpiritSpanElementProps,
  type SpiritUListElementProps,
  type StyleProps,
  type TransferProps,
} from './shared';

/** ===== BASE API ===== */
export type HeaderActionsColorType = 'primary' | 'secondary';
export type HeaderColorType = 'primary' | 'transparent';

export type HeaderDialogHandlingProps = {
  isOpen: boolean;
  onClose: (event: Event | SyntheticEvent) => void;
};

export type HeaderMobileActionsHandlingProps = {
  isOpen: boolean;
  onOpen: (event: Event | SyntheticEvent) => void;
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

export interface HeaderDialogNavProps extends SpiritUListElementProps, ChildrenProps {}

export interface HeaderDialogNavItemProps extends SpiritLItemElementProps, ChildrenProps {}

export interface HeaderDialogTextProps extends SpiritSpanElementProps, ChildrenProps {}

export interface HeaderMobileActionsProps extends SpiritElementProps, HeaderMobileActionsHandlingProps, ChildrenProps {
  dialogId: string;
  menuToggleLabel?: string;
}

export interface HeaderNavProps extends SpiritUListElementProps, ChildrenProps {}

export interface HeaderNavItemProps extends SpiritLItemElementProps, ChildrenProps {}

/** ===== STYLE API ===== */
export interface HeaderDialogLinkStyleProps extends ChildrenProps, StyleProps, TransferProps {
  isCurrent?: boolean;
}

export interface HeaderLinkStyleProps extends ChildrenProps, StyleProps, TransferProps {
  isCurrent?: boolean;
}

/** ===== INTERNAL API ===== */
export interface HeaderDialogLinkProps extends HeaderDialogLinkStyleProps {}

export interface HeaderLinkProps extends HeaderLinkStyleProps {}

/** ===== PUBLIC API ===== */
export type SpiritDialogHeaderLinkProps<E extends ElementType = 'a'> = PolymorphicComponentProps<
  E,
  HeaderDialogLinkProps
>;

export type SpiritHeaderLinkProps<E extends ElementType = 'a'> = PolymorphicComponentProps<E, HeaderLinkProps>;
