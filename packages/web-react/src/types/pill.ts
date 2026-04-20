import { type ElementType } from 'react';
import { type PillColorsExtended } from '../components/Pill';
import type { ChildrenProps, EmotionColorNamesType, PolymorphicComponentProps, StyleProps } from './shared';

export type PillColorsExtendedNamesType = (typeof PillColorsExtended)[keyof typeof PillColorsExtended];

export type PillColor<C> = EmotionColorNamesType<C> | PillColorsExtendedNamesType | C;

/** ===== INTERNAL API ===== */
export interface PillProps<C = void> extends ChildrenProps, StyleProps {
  /** The color of the pill. */
  color?: PillColor<C>;
}

/** ===== PUBLIC API ===== */
export type SpiritPillProps<E extends ElementType = 'span', C = void> = PolymorphicComponentProps<E, PillProps<C>>;
