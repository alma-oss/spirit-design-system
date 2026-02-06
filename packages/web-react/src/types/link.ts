import { type ElementType } from 'react';
import type {
  ChildrenProps,
  LinkColorsDictionaryType,
  PolymorphicComponentProps,
  StyleProps,
  TransferProps,
} from './shared';

/** ===== BASE API ===== */
export const UNDERLINED_OPTIONS = {
  ALWAYS: 'always',
  HOVER: 'hover',
  NEVER: 'never',
} as const;

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type UnderlineOptions = (typeof UNDERLINED_OPTIONS)[keyof typeof UNDERLINED_OPTIONS];

export interface LinkBaseProps extends ChildrenProps, StyleProps, TransferProps {}

/** ===== STYLE API ===== */
export interface LinkStyleProps<C = void> extends LinkBaseProps {
  /** Color of the Link */
  color?: LinkColorsDictionaryType<C>;
  /** When is the Link underlined */
  underlined?: UnderlineOptions;
  /** Whether is the Link disabled */
  isDisabled?: boolean;
}

/** ===== INTERNAL API ===== */
export interface LinkProps<C = void> extends LinkStyleProps<C> {
  /** Link's href attribute */
  href?: string;
  /** Link's target attribute */
  target?: LinkTarget;
}

/** ===== PUBLIC API ===== */
export type SpiritLinkProps<E extends ElementType = 'a', C = void> = PolymorphicComponentProps<E, LinkProps<C>>;
