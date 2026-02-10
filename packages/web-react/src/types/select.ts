import { type ReactNode } from 'react';
import { type LabelProps } from './label';
import {
  type HelperTextProps,
  type RequiredProps,
  type SizesDictionaryType,
  type SpiritSelectElementPropsWithRef,
  type Validation,
  type ValidationTextType,
} from './shared';

export type SelectElementBaseProps = Omit<SpiritSelectElementPropsWithRef, 'size'>;

export type SelectSizeType<S> = SizesDictionaryType<S>;

export interface SelectProps<S = void>
  extends SelectElementBaseProps, LabelProps, HelperTextProps, RequiredProps, Validation {
  isDisabled?: boolean;
  isFluid?: boolean;
  isLabelHidden?: boolean;
  label: ReactNode;
  size?: SelectSizeType<S>;
  validationText?: ValidationTextType;
}

export interface SpiritSelectProps<S = void> extends SelectProps<S> {}
