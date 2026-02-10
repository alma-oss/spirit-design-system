import { type ElementType } from 'react';
import { type ChildrenProps, type StyleProps, type TransferProps } from './shared';

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

export interface AriaBreadcrumbsElementTypeProps<T extends ElementType = 'nav'> {
  /**
   * The HTML element or React element used to render the breadcrumbs, e.g. 'div', 'span'.
   *
   * @default 'nav'
   */
  elementType?: T;
}

export interface BreadcrumbsStyleProps extends StyleProps, TransferProps {
  isGoBackOnly?: boolean;
}

export interface SpiritBreadcrumbsProps<T extends ElementType = 'nav'>
  extends AriaBreadcrumbsElementTypeProps<T>, StyleProps, ChildrenProps {
  goBackTitle?: string;
  items?: BreadcrumbsItems;
}
