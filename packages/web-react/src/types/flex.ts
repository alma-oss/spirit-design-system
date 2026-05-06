import { type ElementType } from 'react';
import {
  type AlignmentXExtendedDictionaryType,
  type AlignmentYExtendedDictionaryType,
  type ChildrenProps,
  type DirectionExtendedDictionaryType,
  type PolymorphicComponentProps,
  type SingleOrResponsive,
  type SpaceToken,
  type StyleProps,
} from './shared';

/** ===== BASE API ===== */
export type FlexDirection = DirectionExtendedDictionaryType;
export type FlexDirectionType = FlexDirection | { [key: string]: FlexDirection };
export type FlexAlignmentXType =
  | NonNullable<AlignmentXExtendedDictionaryType>
  | { [key: string]: NonNullable<AlignmentXExtendedDictionaryType> };
export type FlexAlignmentYType =
  | NonNullable<AlignmentYExtendedDictionaryType>
  | { [key: string]: NonNullable<AlignmentYExtendedDictionaryType> };
export type FlexWrapType = boolean | { [key: string]: boolean };

export interface FlexBaseProps extends ChildrenProps, StyleProps {}

/** ===== STYLE API ===== */
export interface FlexStyleProps extends FlexBaseProps {
  alignmentX?: FlexAlignmentXType;
  alignmentY?: FlexAlignmentYType;
  direction?: FlexDirectionType;
  isWrapping?: FlexWrapType;
  /** Custom spacing between items */
  spacing?: SingleOrResponsive<SpaceToken>;
  /** Custom horizontal spacing between items */
  spacingX?: SingleOrResponsive<SpaceToken>;
  /** Custom vertical spacing between items */
  spacingY?: SingleOrResponsive<SpaceToken>;
}

/** ===== INTERNAL API ===== */
export interface FlexProps extends FlexStyleProps {}

/** ===== PUBLIC API ===== */
export type SpiritFlexProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, FlexProps>;
