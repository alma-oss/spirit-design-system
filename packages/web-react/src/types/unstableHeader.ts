import { type ElementType } from 'react';
import { type LinkTarget } from './link';
import {
  type ChildrenProps,
  type PolymorphicComponentProps,
  type SpiritElementProps,
  type StyleProps,
  type TransferProps,
} from './shared';

/** ===== BASE API ===== */
export interface HeaderBaseProps extends ChildrenProps, StyleProps {}

/** ===== STYLE API ===== */
export interface HeaderLogoStyleProps extends ChildrenProps, StyleProps, TransferProps {
  /** Header's href attribute */
  href?: string;
  /** Header's target attribute */
  target?: LinkTarget;
}

export interface UnstableHeaderProps extends SpiritElementProps, ChildrenProps {
  hasBottomDivider?: boolean;
}

/** ===== INTERNAL API ===== */
export interface HeaderLogoProps extends HeaderLogoStyleProps {}

/** ===== PUBLIC API ===== */
export type SpiritHeaderLogoProps<E extends ElementType = 'a'> = PolymorphicComponentProps<E, HeaderLogoProps>;
export type SpiritHeaderProps = UnstableHeaderProps;
