import { type ElementType } from 'react';
import type { ChildrenProps, EmotionColorNamesType, StyleProps, TransferProps } from './shared';

export interface AriaAlertElementTypeProps<T extends ElementType = 'div'> {
  /**
   * The HTML element or React element used to render the alert, e.g. 'div', 'span'.
   *
   * @default 'div'
   */
  elementType?: T;
}

export interface AlertProps extends ChildrenProps, StyleProps, TransferProps {}

export interface SpiritAlertProps<T extends ElementType = 'div', C = void>
  extends AriaAlertElementTypeProps<T>, AlertProps {
  /** The color of the alert. */
  color?: EmotionColorNamesType | C;
  /** Icon used in Alert. */
  iconName?: string;
  /** Whether the alert should be centered. */
  isCentered?: boolean;
}
