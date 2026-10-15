import { type ChangeEvent, type ReactNode } from 'react';
import {
  type HelperTextProps,
  type InputBaseProps,
  type RequiredProps,
  type SizeProps,
  type SizesDictionaryType,
  type SpiritInputElementPropsWithRef,
  type StyleProps,
  type Validation,
  type ValidationTextType,
} from './shared';

export type SliderBaseProps = Omit<SpiritInputElementPropsWithRef, 'size'>;

export interface SliderProps
  extends
    SliderBaseProps,
    HelperTextProps,
    InputBaseProps,
    RequiredProps,
    Validation,
    StyleProps,
    SizeProps<SizesDictionaryType> {
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
