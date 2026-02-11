import { type ElementType } from 'react';
import {
  type ChildrenProps,
  type SingleOrResponsive,
  type SizeExtendedDictionaryType,
  type SpiritPolymorphicComponentPropWithRef,
  type StyleProps,
} from './shared';

export type SpiritAvatarSizeType<S> = SingleOrResponsive<SizeExtendedDictionaryType<S> | S>;

export interface AvatarBaseProps extends ChildrenProps, StyleProps {}

export interface AvatarStyleProps<S = string> extends AvatarBaseProps {
  /**
   * Whether the Avatar should be square.
   *
   * @default false
   */
  isSquare?: boolean;
  /**
   * Size of the Avatar
   *
   * @default SizesExtended.MEDIUM
   */
  size?: SpiritAvatarSizeType<S>;
}

export type AvatarProps<S = string> = AvatarStyleProps<S>;

export type SpiritAvatarProps<E extends ElementType = 'div', S = string> = SpiritPolymorphicComponentPropWithRef<
  E,
  AvatarProps<S>
>;
