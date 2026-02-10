import { type ReactNode } from 'react';
import {
  type ChildrenProps,
  type PasswordToggleAdornmentProp,
  type RequiredProps,
  type SizesDictionaryType,
  type TextInputProps,
} from './shared';
import { type TextAreaProps } from './textArea';
import { type TextFieldProps } from './textField';

export interface TextFieldBaseMultiLineProps {
  /** Whether the input is TextArea. */
  isMultiline?: boolean;
}

export type TextFieldBaseProps = ChildrenProps & TextFieldBaseMultiLineProps & (TextFieldProps | TextAreaProps);

export type SpiritTextFieldBaseProps = {
  label: ReactNode;
} & TextFieldBaseProps;

export type TextFieldBaseSizeType<S> = SizesDictionaryType<S>;

export type TextFieldBaseInputProps = TextInputProps & TextFieldBaseMultiLineProps;

export interface SpiritTextFieldBaseInputProps extends RequiredProps, TextFieldBaseInputProps {}

export interface PasswordToggleProps<S = void> {
  isDisabled?: boolean;
  isPasswordShown: boolean;
  onToggleClick: () => void;
  size?: TextFieldBaseSizeType<S>;
}

export interface TextFieldBasePasswordToggleProps<S = void>
  extends ChildrenProps, SpiritTextFieldBaseInputProps, PasswordToggleAdornmentProp {
  size?: TextFieldBaseSizeType<S>;
}

export interface SpiritTextFieldBasePasswordToggleProps extends TextFieldBasePasswordToggleProps, PasswordToggleProps {}
