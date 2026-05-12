import { type ReactNode } from 'react';
import { type CharacterCounterProps } from '../components/CharacterCounter/types';
import { type ChildrenProps, type PasswordToggleAdornmentProp } from './shared';
import { type TextAreaProps } from './textArea';
import { type TextFieldAddonProps, type TextFieldProps } from './textField';

export interface TextFieldBaseMultiLineProps {
  /** Whether the input is TextArea. */
  isMultiline?: boolean;
}

export interface TextFieldBaseCounterProps {
  /** Counter props computed by `useCharacterCounterState` */
  counterProps?: CharacterCounterProps;
}

export type TextFieldBaseProps = ChildrenProps &
  TextFieldBaseMultiLineProps &
  TextFieldBaseCounterProps &
  PasswordToggleAdornmentProp &
  TextFieldAddonProps &
  (TextFieldProps | TextAreaProps);

export type SpiritTextFieldBaseProps = {
  label: ReactNode;
} & TextFieldBaseProps;
