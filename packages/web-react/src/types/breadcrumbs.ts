import { type ElementType } from 'react';
import { type ChildrenProps, type PolymorphicComponentProps, type StyleProps } from './shared';

type BreadcrumbsItem = {
  title: string;
  url?: string;
};

export type BreadcrumbsItems = BreadcrumbsItem[];

export interface SpiritBreadcrumbsItemProps extends ChildrenProps {
  href?: string;
  iconNameEnd?: string;
  iconNameStart?: string;
  isCurrent?: boolean;
  isGoBackOnly?: boolean;
}

export interface BreadcrumbsStyleProps extends StyleProps {
  isGoBackOnly?: boolean;
}

/** ===== INTERNAL API ===== */
export interface BreadcrumbsProps extends StyleProps, ChildrenProps {
  goBackTitle?: string;
  items?: BreadcrumbsItems;
}

/** ===== PUBLIC API ===== */
export type SpiritBreadcrumbsProps<E extends ElementType = 'nav'> = PolymorphicComponentProps<E, BreadcrumbsProps>;
