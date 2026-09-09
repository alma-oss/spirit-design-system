import { type ReactNode } from 'react';
import type {
  AccentColorNamesType,
  EmotionColorNamesType,
  HelperTextProps,
  InputBaseProps,
  SpiritProgressElementPropsWithRef,
  StyleProps,
  Validation,
  ValidationTextType,
} from '../../types';
import { type ProgressBarColorsExtended } from './constants';

export type ProgressBarColorsExtendedNamesType =
  (typeof ProgressBarColorsExtended)[keyof typeof ProgressBarColorsExtended];

export type ProgressBarColor<C = void> =
  EmotionColorNamesType<C> | AccentColorNamesType<C> | ProgressBarColorsExtendedNamesType | C;

export type ProgressBarValuePlacement = 'right' | 'bottom';

/** ===== INTERNAL API ===== */
export interface ProgressBarProps<C = void>
  extends
    StyleProps,
    HelperTextProps,
    InputBaseProps,
    Validation,
    Omit<SpiritProgressElementPropsWithRef, 'color' | 'label' | 'max' | 'value'> {
  /** The color of the progress bar. */
  color?: ProgressBarColor<C>;
  /** Accessible name rendered with the Label component. */
  label?: ReactNode;
  /** The maximum value of the progress bar. */
  max?: number;
  /** The validation text to display. */
  validationText?: ValidationTextType;
  /** The current value of the progress bar. */
  value: number;
  /** Placement of `valueText` relative to the bar. */
  valuePlacement?: ProgressBarValuePlacement;
  /** Visible value shown next to or below the bar. */
  valueText?: ReactNode;
  /** Id applied to the visible `valueText` element. */
  valueTextId?: string;
}

/** ===== PUBLIC API ===== */
export interface SpiritProgressBarProps<C = void> extends ProgressBarProps<C> {}
