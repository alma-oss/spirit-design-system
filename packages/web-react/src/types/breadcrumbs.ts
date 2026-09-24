import { type ElementType } from 'react';
import {
  type ChildrenProps,
  type PolymorphicComponentProps,
  type StringsProps,
  type StyleProps,
  type TranslatableString,
} from './shared';

export type BreadcrumbsStrings = {
  ariaLabel?: TranslatableString;
};

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
export interface BreadcrumbsProps extends StyleProps, ChildrenProps, StringsProps<BreadcrumbsStrings> {
  /** @deprecated Use `labelBack` instead. */
  goBackTitle?: string;
  labelBack?: TranslatableString;
  items?: BreadcrumbsItems;
}

/** ===== PUBLIC API ===== */
export type SpiritBreadcrumbsProps<E extends ElementType = 'nav'> = PolymorphicComponentProps<E, BreadcrumbsProps>;
