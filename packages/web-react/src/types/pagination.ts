import { type ElementType, type ReactNode } from 'react';
import { type SpiritButtonProps } from './button';
import {
  type ChildrenProps,
  type RouterLinkProps,
  type SpiritElementProps,
  type SpiritLItemElementProps,
  type SpiritPolymorphicElementPropsWithRef,
  type SpiritUListElementProps,
} from './shared';

export type PaginationLinkDirectionType = 'previous' | 'next';

export interface PaginationProps extends SpiritElementProps {
  listProps?: SpiritUListElementProps;
}

export interface PaginationItemProps extends SpiritLItemElementProps {}

export interface AriaPaginationProps {
  accessibilityLabel?: string;
}

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
  AriaPaginationProps &
  RouterLinkProps & {
    direction: PaginationLinkDirectionType;
  };

export type PaginationLinkPreviousNextProps<E extends ElementType = 'a'> = PaginationLinkBaseProps<E> &
  AriaPaginationProps &
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
  accessibilityLabelNext?: string;
  accessibilityLabelPrevious?: string;
  defaultPage?: number;
  visiblePages?: number;
  onChange?: (pageNumber: number) => void;
  totalPages: number;
}

export interface SpiritUncontrolledPaginationProps
  extends AriaPaginationProps, UncontrolledPaginationProps, ChildrenProps {}

export interface UsePaginationProps extends UncontrolledPaginationProps {
  defaultPage: number;
  visiblePages: number;
}
