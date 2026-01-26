import { type ElementType } from 'react';
import {
  type BackgroundColorsDictionaryType,
  type ChildrenProps,
  type PolymorphicComponentProps,
  type SpaceToken,
  type StyleProps,
  type TextAlignmentType,
} from './shared';

/** ===== BASE API ===== */
export interface FooterBaseProps extends ChildrenProps, StyleProps {}

/** ===== STYLE API ===== */
export interface FooterStyleProps extends FooterBaseProps {
  paddingTop?: SpaceToken;
  paddingBottom?: SpaceToken;
  backgroundColor?: BackgroundColorsDictionaryType;
  textAlignment?: TextAlignmentType;
}

/** ===== INTERNAL API ===== */
export interface FooterProps extends FooterStyleProps {}

/** ===== PUBLIC API ===== */
export type SpiritFooterProps<E extends ElementType = 'footer'> = PolymorphicComponentProps<E, FooterProps>;
