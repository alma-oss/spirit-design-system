import { type ReactNode } from 'react';
import { type LabelProps } from './label';
import {
  type HelperTextProps,
  type RequiredProps,
  type SizeProps,
  type SizesDictionaryType,
  type SpiritFieldGroupElementPropsWithRef,
  type Validation,
  type ValidationTextType,
} from './shared';

export interface FieldGroupProps
  extends
    SpiritFieldGroupElementPropsWithRef,
    LabelProps,
    HelperTextProps,
    RequiredProps,
    Validation,
    SizeProps<SizesDictionaryType> {
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  label: ReactNode;
  validationText?: ValidationTextType;
}

export interface SpiritFieldGroupProps extends FieldGroupProps {}
