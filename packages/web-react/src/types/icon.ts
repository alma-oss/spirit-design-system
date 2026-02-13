import { type SVGAttributes } from 'react';
import {
  type AccentColorNamesType,
  type ChildrenProps,
  type EmotionColorNamesType,
  type SingleOrResponsive,
  type StyleProps,
  type TextColorNamesType,
} from './shared';

export type IconBoxSize = SingleOrResponsive<number>;
export type IconColorType = TextColorNamesType | EmotionColorNamesType | AccentColorNamesType;
export interface IconStyleProps extends SVGAttributes<SVGElement> {
  /** Size of the icon */
  boxSize?: IconBoxSize;
  /** Color of the icon */
  color?: IconColorType;
  /** Name of the icon */
  name: string;
}

export interface IconProps extends IconStyleProps, StyleProps, ChildrenProps {
  /** Aria hidden */
  ariaHidden?: boolean;
  /** Title of the icon */
  title?: string;
}

export interface SpiritIconProps extends IconProps {}
