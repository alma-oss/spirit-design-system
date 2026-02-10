import { type ReactNode } from 'react';
import { type LabelProps } from './label';
import {
  type ChildrenProps,
  type HelperTextProps,
  type InputBaseProps,
  type PasswordToggleAdornmentProp,
  type RequiredProps,
  type SizesDictionaryType,
  type SpiritInputElementPropsWithRef,
  type TextInputProps,
  type Validation,
  type ValidationTextProp,
} from './shared';

export type TextFieldType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';

export type TextFieldElementBaseProps = Omit<SpiritInputElementPropsWithRef, 'size'>;

export interface TextFieldProps<S = void>
  extends
    TextFieldElementBaseProps,
    InputBaseProps,
    PasswordToggleAdornmentProp,
    ChildrenProps,
    LabelProps,
    HelperTextProps,
    ValidationTextProp,
    TextInputProps,
    RequiredProps,
    Validation {
  /** The type of text field */
  type?: TextFieldType;
  size?: SizesDictionaryType<S>;
}

export interface SpiritTextFieldProps<S = void> extends TextFieldProps<S> {
  label: ReactNode;
}
