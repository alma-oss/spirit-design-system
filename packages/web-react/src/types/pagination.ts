import { type ElementType, type ReactNode } from 'react';
import { type SpiritButtonProps } from './button';
import {
  type ChildrenProps,
  type RouterLinkProps,
  type SpiritElementProps,
  type SpiritLItemElementProps,
  type SpiritPolymorphicElementPropsWithRef,
  type SpiritUListElementProps,
  type TranslatableString,
  type WithStrings,
} from './shared';

export type PaginationLinkDirectionType = 'previous' | 'next';

export interface PaginationProps extends SpiritElementProps {
  listProps?: SpiritUListElementProps;
}

export interface PaginationItemProps extends SpiritLItemElementProps {}

export interface DeprecatedAccessibilityLabelProps {
  /** @deprecated Use the corresponding key in `strings` instead. */
  accessibilityLabel?: string;
}

export type PaginationLinkStrings = {
  ariaLabel?: TranslatableString;
};

export type PaginationLinkPreviousNextStrings = {
  ariaLabelNext?: TranslatableString;
  ariaLabelPrevious?: TranslatableString;
};

export type UncontrolledPaginationStrings = PaginationLinkStrings & PaginationLinkPreviousNextStrings;

export interface AriaPaginationProps extends DeprecatedAccessibilityLabelProps, WithStrings<PaginationLinkStrings> {}

export interface PaginationLinkBaseProps<E extends ElementType = 'a'> {
  elementType?: E;
  isDisabled?: boolean;
}

export interface PaginationLinkPageProps<E extends ElementType = 'a'>
  extends PaginationLinkBaseProps<E>, AriaPaginationProps, RouterLinkProps {
  children?: never;
  isCurrent?: boolean;
  pageNumber: number;
}

export interface PaginationLinkChildrenProps<E extends ElementType = 'a'>
  extends PaginationLinkBaseProps<E>, AriaPaginationProps, RouterLinkProps {
  children: ReactNode;
  isCurrent?: boolean;
  pageNumber?: never;
}

export type PaginationLinkProps<E extends ElementType = 'a'> =
  PaginationLinkPageProps<E> | PaginationLinkChildrenProps<E>;

export type PaginationButtonLinkProps<E extends ElementType = 'a'> = SpiritButtonProps<E> &
  DeprecatedAccessibilityLabelProps &
  RouterLinkProps & {
    direction: PaginationLinkDirectionType;
  };

export type PaginationLinkPreviousNextProps<E extends ElementType = 'a'> = PaginationLinkBaseProps<E> &
  DeprecatedAccessibilityLabelProps &
  WithStrings<PaginationLinkPreviousNextStrings> &
  RouterLinkProps & {
    children?: never;
    pageNumber?: never;
  };

export interface SpiritPaginationProps extends PaginationProps {}

export interface SpiritPaginationItemProps extends PaginationItemProps {}

export type SpiritPaginationLinkProps<E extends ElementType = 'a'> = PaginationLinkProps<E> &
  SpiritPolymorphicElementPropsWithRef<E, PaginationLinkProps<E>>;

export type SpiritPaginationButtonLinkProps<E extends ElementType = 'a'> = PaginationButtonLinkProps<E>;

export type SpiritPaginationLinkPreviousNextProps<E extends ElementType = 'a'> = PaginationLinkPreviousNextProps<E> &
  SpiritPolymorphicElementPropsWithRef<E, PaginationLinkPreviousNextProps<E>>;

export interface UncontrolledPaginationProps {
  /** @deprecated Use `strings.ariaLabelNext` instead. */
  accessibilityLabelNext?: string;
  /** @deprecated Use `strings.ariaLabelPrevious` instead. */
  accessibilityLabelPrevious?: string;
  defaultPage?: number;
  visiblePages?: number;
  onChange?: (pageNumber: number) => void;
  totalPages: number;
}

export interface SpiritUncontrolledPaginationProps
  extends
    DeprecatedAccessibilityLabelProps,
    UncontrolledPaginationProps,
    ChildrenProps,
    WithStrings<UncontrolledPaginationStrings> {}

export interface UsePaginationProps extends UncontrolledPaginationProps {
  defaultPage: number;
  visiblePages: number;
}
