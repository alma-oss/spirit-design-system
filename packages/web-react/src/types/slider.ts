import { type ChangeEvent, type ReactNode } from 'react';
import {
  type HelperTextProps,
  type InputBaseProps,
  type RequiredProps,
  type SpiritInputElementPropsWithRef,
  type StyleProps,
  type Validation,
  type ValidationTextType,
} from './shared';

export type SliderBaseProps = SpiritInputElementPropsWithRef;

export interface SliderProps
  extends SliderBaseProps, HelperTextProps, InputBaseProps, RequiredProps, Validation, StyleProps {
  isFluid?: boolean;
  isSelected?: boolean;
  label: ReactNode;
  max?: number;
  min?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  step?: number;
  validationText?: ValidationTextType;
  value: number;
}

export interface SpiritSliderProps extends SliderProps {}

export interface UncontrolledSliderProps extends Omit<SliderProps, 'onChange' | 'value'> {
  value?: number;
}
