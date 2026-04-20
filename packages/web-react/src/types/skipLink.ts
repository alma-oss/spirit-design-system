import { type ElementType } from 'react';
import { type LinkTarget } from './link';
import { type ChildrenProps, type StyleProps } from './shared';

export interface SkipLinkBaseProps extends ChildrenProps, StyleProps {
  /** SkipLink's href attribute */
  href?: string;
  /** SkipLink's target attribute */
  target?: LinkTarget;
}

export type SkipLinkProps<E extends ElementType = 'a'> = {
  /**
   * The HTML element or React element used to render the SkipLink, e.g. 'a'.
   *
   * @default 'a'
   */
  elementType?: E;
} & SkipLinkBaseProps;

export type SpiritSkipLinkProps<E extends ElementType = 'a'> = SkipLinkProps<E>;
