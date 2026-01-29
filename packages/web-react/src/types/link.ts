import { type ElementType } from 'react';
import type {
  ChildrenProps,
  LinkColorsDictionaryType,
  PolymorphicComponentProps,
  PolymorphicRef,
  StyleProps,
  TransferProps,
} from './shared';

export const UNDERLINED_OPTIONS = {
  ALWAYS: 'always',
  HOVER: 'hover',
  NEVER: 'never',
} as const;

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type UnderlineOptions = (typeof UNDERLINED_OPTIONS)[keyof typeof UNDERLINED_OPTIONS];

export interface LinkBaseProps<C = void> extends ChildrenProps, StyleProps, TransferProps {
  /** Link's href attribute */
  href?: string;
  /** Link's target attribute */
  target?: LinkTarget;
  /** Color of the Link */
  color?: LinkColorsDictionaryType<C>;
  /** When is the Link underlined */
  underlined?: UnderlineOptions;
  /** Whether is the Link disabled */
  isDisabled?: boolean;
}

export type LinkProps<E extends ElementType = 'a', C = void> = PolymorphicComponentProps<E, LinkBaseProps<C>>;

/** @deprecated Use LinkProps instead */
export type SpiritLinkProps<E extends ElementType = 'a', C = void> = LinkProps<E, C>;

/**
 * @internal
 * Helper type to get the correct ref type for a Link component
 */
export type LinkRef<E extends ElementType = 'a'> = PolymorphicRef<E>;
