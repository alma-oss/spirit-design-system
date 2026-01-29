import { type ElementType, type JSXElementConstructor } from 'react';
import { type IconBoxShapes } from '../components/IconBox/constants';
import type {
  AccentColorNamesType,
  ChildrenProps,
  EmotionColorNamesType,
  PolymorphicComponentProps,
  PolymorphicRef,
  SingleOrResponsive,
  SizeExtendedDictionaryType,
  StyleProps,
} from './shared';

export type IconBoxShapeKeys = keyof typeof IconBoxShapes;
export type IconBoxShapeType = (typeof IconBoxShapes)[IconBoxShapeKeys];

export type IconBoxColorsType = AccentColorNamesType | EmotionColorNamesType;

export interface IconBoxBaseProps extends ChildrenProps, StyleProps {
  /** The color of the iconBox. */
  color?: IconBoxColorsType;
  /** The shape of the iconBox. */
  shape?: IconBoxShapeType;
  /** Whether the iconBox has a border */
  hasBorder?: boolean;
  /** Name of the icon */
  iconName: string;
  /** Whether the iconBox is in subtle color scheme */
  isSubtle?: boolean;
  /** The size of the iconBox */
  size?: SingleOrResponsive<SizeExtendedDictionaryType>;
}

export type IconBoxProps<E extends ElementType = 'div'> = PolymorphicComponentProps<
  E | JSXElementConstructor<unknown>,
  IconBoxBaseProps
>;

/** @deprecated Use IconBoxProps instead */
export type SpiritIconBoxProps<E extends ElementType = 'div'> = IconBoxProps<E>;

/**
 * @internal
 * Helper type to get the correct ref type for an IconBox component
 */
export type IconBoxRef<E extends ElementType = 'div'> = PolymorphicRef<E>;
