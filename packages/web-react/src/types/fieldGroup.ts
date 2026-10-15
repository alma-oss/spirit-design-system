import { type ReactNode } from 'react';
import { type LabelProps } from './label';
import {
  type HelperTextProps,
  type RequiredProps,
  type SizesDictionaryType,
  type SpiritFieldGroupElementPropsWithRef,
  type Validation,
  type ValidationTextType,
} from './shared';

export interface FieldGroupProps
  extends SpiritFieldGroupElementPropsWithRef, LabelProps, HelperTextProps, RequiredProps, Validation {
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  label: ReactNode;
  /** Size variant. */
  size?: SizesDictionaryType;
  validationText?: ValidationTextType;
}

export interface SpiritFieldGroupProps extends FieldGroupProps {}
