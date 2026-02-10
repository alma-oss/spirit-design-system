import { type ReactNode } from 'react';
import { type LabelProps } from './label';
import {
  type HelperTextProps,
  type RequiredProps,
  type SpiritFieldGroupElementPropsWithRef,
  type Validation,
  type ValidationTextType,
} from './shared';

export type FieldGroupElementBaseProps = SpiritFieldGroupElementPropsWithRef;

export interface FieldGroupProps
  extends FieldGroupElementBaseProps, LabelProps, HelperTextProps, RequiredProps, Validation {
  isDisabled?: boolean;
  isFluid?: boolean;
  isLabelHidden?: boolean;
  label: ReactNode;
  validationText?: ValidationTextType;
}

export interface SpiritFieldGroupProps extends FieldGroupProps {}
