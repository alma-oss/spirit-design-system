import { type ElementType } from 'react';
import type { ChildrenProps, EmotionColorNamesType, SpiritPolymorphicComponentPropWithRef, StyleProps } from './shared';

export interface AlertBaseProps extends ChildrenProps, StyleProps {}

export interface AlertProps<C = void> extends AlertBaseProps {
  /** The color of the alert. */
  color?: EmotionColorNamesType | C;
  /** Icon used in Alert. */
  iconName?: string;
  /** Whether the alert should be centered. */
  isCentered?: boolean;
}

export type SpiritAlertProps<E extends ElementType = 'div', C = void> = SpiritPolymorphicComponentPropWithRef<
  E,
  AlertProps<C>
>;
