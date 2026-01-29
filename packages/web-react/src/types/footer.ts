import { type ElementType } from 'react';
import {
  type BackgroundColorsDictionaryType,
  type ChildrenProps,
  type PolymorphicComponentProps,
  type PolymorphicRef,
  type SpaceToken,
  type StyleProps,
  type TextAlignmentType,
} from './shared';

export interface FooterStyleProps {
  paddingTop?: SpaceToken;
  paddingBottom?: SpaceToken;
  backgroundColor?: BackgroundColorsDictionaryType;
  textAlignment?: TextAlignmentType;
}

export interface FooterBaseProps extends FooterStyleProps, ChildrenProps, StyleProps {}

export type FooterProps<E extends ElementType = 'footer'> = PolymorphicComponentProps<E, FooterBaseProps>;

/** @deprecated Use FooterProps instead */
export type SpiritFooterProps<E extends ElementType = 'footer'> = FooterProps<E>;

/**
 * @internal
 * Helper type to get the correct ref type for a Footer component
 */
export type FooterRef<E extends ElementType = 'footer'> = PolymorphicRef<E>;
