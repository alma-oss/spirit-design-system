import { type ElementType } from 'react';
import { type LinkTarget } from './link';
import {
  type ChildrenProps,
  type PolymorphicComponentProps,
  type SpiritElementProps,
  type StyleProps,
  type TransferProps,
} from './shared';

export interface HeaderLogoBaseProps extends ChildrenProps, StyleProps, TransferProps {
  /** Header's href attribute */
  href?: string;
  /** Header's target attribute */
  target?: LinkTarget;
}

export type HeaderLogoProps<E extends ElementType = 'a'> = PolymorphicComponentProps<E, HeaderLogoBaseProps>;

export interface SpiritHeaderProps extends SpiritElementProps, ChildrenProps {
  hasBottomDivider?: boolean;
}

/** @deprecated Use HeaderLogoProps instead */
export type SpiritHeaderLogoProps<E extends ElementType = 'a'> = HeaderLogoProps<E>;
