import { type ComponentPropsWithRef, type ElementType } from 'react';
import { type PillColorsExtended } from '../components/Pill';
import type { ChildrenProps, EmotionColorNamesType, StyleProps, TransferProps } from './shared';

export type PillColorsExtendedNamesType = (typeof PillColorsExtended)[keyof typeof PillColorsExtended];

export type PillColor<C> = EmotionColorNamesType<C> | PillColorsExtendedNamesType | C;

export interface AriaPillElementTypeProps<E extends ElementType = 'span'> {
  /**
   * The HTML element or React element used to render the pill, e.g. 'div', 'span'.
   *
   * @default 'span'
   */
  elementType?: E;
}

export interface PillProps extends ChildrenProps, StyleProps, TransferProps {}

export type SpiritPillProps<E extends ElementType = 'span', C = void> = AriaPillElementTypeProps<E> &
  ComponentPropsWithRef<E> &
  PillProps & {
    /** The color of the pill. */
    color?: PillColor<C>;
  };
