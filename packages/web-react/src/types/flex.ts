import { type ElementType, type JSXElementConstructor } from 'react';
import {
  type AlignmentXExtendedDictionaryType,
  type AlignmentYExtendedDictionaryType,
  type ChildrenProps,
  type DirectionExtendedDictionaryType,
  type PolymorphicComponentProps,
  type PolymorphicRef,
  type SingleOrResponsive,
  type SpaceToken,
  type StyleProps,
} from './shared';

/**
 * @deprecated "row" and "column" values will be replaced in the next major version. Please use "horizontal" and "vertical" instead.
 * @see https://jira.almacareer.tech/browse/DS-1629
 */
export type FlexDirection = DirectionExtendedDictionaryType | 'row' | 'column';
export type FlexDirectionType = FlexDirection | { [key: string]: FlexDirection };
export type FlexAlignmentXType =
  | NonNullable<AlignmentXExtendedDictionaryType>
  | { [key: string]: NonNullable<AlignmentXExtendedDictionaryType> };
export type FlexAlignmentYType =
  | NonNullable<AlignmentYExtendedDictionaryType>
  | { [key: string]: NonNullable<AlignmentYExtendedDictionaryType> };
export type FlexWrapType = boolean | { [key: string]: boolean };

export interface FlexCustomLayoutProps {
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

export interface FlexBaseProps extends FlexCustomLayoutProps, ChildrenProps, StyleProps {}

export type FlexProps<T extends ElementType = 'div'> = PolymorphicComponentProps<
  T | JSXElementConstructor<unknown>,
  FlexBaseProps
>;

/** @deprecated Use FlexProps instead */
export type SpiritFlexProps<T extends ElementType = 'div'> = FlexProps<T>;

/**
 * @internal
 * Helper type to get the correct ref type for a Flex component
 */
export type FlexRef<T extends ElementType = 'div'> = PolymorphicRef<T>;
