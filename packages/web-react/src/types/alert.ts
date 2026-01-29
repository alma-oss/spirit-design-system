import { type ElementType } from 'react';
import type { ChildrenProps, EmotionColorNamesType, SpiritPolymorphicElementPropsWithRef, StyleProps } from './shared';

export interface AlertBaseProps extends ChildrenProps, StyleProps {}

export interface AriaAlertElementTypeProps<T extends ElementType = 'div'> {
  /**
   * The HTML element or React element used to render the alert, e.g. 'div', 'span'.
   *
   * @default 'div'
   */
  elementType?: T;
}

export interface AlertProps<T extends ElementType = 'div', C = void>
  extends AriaAlertElementTypeProps<T>,
    AlertBaseProps {
  /** The color of the alert. */
  color?: EmotionColorNamesType | C;
  /** Icon used in Alert. */
  iconName?: string;
  /** Whether the alert should be centered. */
  isCentered?: boolean;
}

export type SpiritAlertProps<T extends ElementType = 'div', C = void> = AlertProps<T, C> &
  SpiritPolymorphicElementPropsWithRef<T, AlertProps<T, C>>;
