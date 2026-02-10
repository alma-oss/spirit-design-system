import { type ReactNode } from 'react';
import { type LabelProps } from './label';
import {
  type ChildrenProps,
  type HelperTextProps,
  type InputBaseProps,
  type RequiredProps,
  type SizesDictionaryType,
  type SpiritTextAreaElementPropsWithRef,
  type TextInputProps,
  type Validation,
  type ValidationTextProp,
} from './shared';

export type TextAreaElementBaseProps = Omit<SpiritTextAreaElementPropsWithRef, 'size'>;

export interface TextAreaProps<S = void>
  extends
    TextAreaElementBaseProps,
    InputBaseProps,
    ChildrenProps,
    LabelProps,
    HelperTextProps,
    ValidationTextProp,
    TextInputProps,
    RequiredProps,
    Validation {
  /** Maximum field height with automatic height control */
  autoResizingMaxHeight?: number;
  /** Whether is field auto resizing which adjusts its height while typing */
  isAutoResizing?: boolean;
  /** Label for the textarea, which provides context or description for the field */
  label: ReactNode;
  size?: SizesDictionaryType<S>;
}

export interface SpiritTextAreaProps<S = void> extends TextAreaProps<S> {}
