import type { ElementType } from 'react';
import type { ChildrenProps, PolymorphicComponentProps, SizesDictionaryType, StyleProps } from '../../types/shared';

export interface InputAddonProps extends ChildrenProps, StyleProps {
  /** Size of the addon */
  size?: SizesDictionaryType;
}

export type SpiritInputAddonProps<T extends ElementType = 'div'> = PolymorphicComponentProps<T, InputAddonProps>;
