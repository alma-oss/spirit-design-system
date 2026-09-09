import { type CSSProperties, type ReactNode } from 'react';
import type {
  AccentColorNamesType,
  ChildrenProps,
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
export type ProgressBarProps<C = void> = StyleProps &
  HelperTextProps &
  InputBaseProps &
  Validation &
  Omit<SpiritProgressElementPropsWithRef, 'color' | 'label' | 'max' | 'value'> & {
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
    /** Placement of `valueLabel` relative to the bar. */
    valuePlacement?: ProgressBarValuePlacement;
    /** Visible label of the value shown next to or below the bar. */
    valueLabel?: ReactNode;
    /** Id applied to the visible `valueLabel` element. */
    valueLabelId?: string;
  };

export type ProgressBarCaptionProps = ChildrenProps &
  Pick<ProgressBarProps, 'valueLabelId' | 'valuePlacement'> &
  Required<Pick<ProgressBarProps, 'valueLabel'>> & {
    classProps: {
      value: string;
      valueLabel: string;
    };
    isAriaHidden?: boolean;
    styleProps?: {
      className?: string;
      style?: CSSProperties;
    };
  };

/** ===== PUBLIC API ===== */
export type SpiritProgressBarProps<C = void> = ProgressBarProps<C>;
