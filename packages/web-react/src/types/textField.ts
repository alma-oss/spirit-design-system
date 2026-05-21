import { type ReactNode } from 'react';
import { type LabelProps } from './label';
import {
  type ChildrenProps,
  type FillVariantDictionaryType,
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

export interface TextFieldAddonProps {
  /** Addon rendered after the input. Provide full addon markup, usually an `InputAddon`. */
  endAddon?: ReactNode;
  /** Addon rendered before the input. Provide full addon markup, usually an `InputAddon`. */
  startAddon?: ReactNode;
}

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
    Validation,
    TextFieldAddonProps {
  /** The size of the text field */
  size?: SizesDictionaryType<S>;
  /** The type of text field */
  type?: TextFieldType;
  /** InputContainer variant (`fill` or `outline`). */
  variant?: FillVariantDictionaryType;
}

export interface SpiritTextFieldProps<S = void> extends TextFieldProps<S> {
  label: ReactNode;
}
