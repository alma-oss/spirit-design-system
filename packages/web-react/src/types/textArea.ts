import { type ReactNode } from 'react';
import { type LabelProps } from './label';
import {
  type ChildrenProps,
  type HelperTextProps,
  type InputBaseProps,
  type RequiredProps,
  type SizesDictionaryType,
  type SpiritTextAreaElementPropsWithRef,
  type StyleProps,
  type TextInputProps,
  type Validation,
  type ValidationTextProp,
} from './shared';

export type TextAreaElementBaseProps = Omit<SpiritTextAreaElementPropsWithRef, 'size'>;

export interface TextAreaCounterRenderProps extends StyleProps {
  counterThreshold?: number;
  currentLength: number;
  hasCounter?: boolean;
}

type TextAreaBaseProps<S = void> = TextAreaElementBaseProps &
  InputBaseProps &
  ChildrenProps &
  LabelProps &
  HelperTextProps &
  ValidationTextProp &
  TextInputProps &
  RequiredProps &
  Validation & {
    /** Maximum field height with automatic height control */
    autoResizingMaxHeight?: number;
    /** Whether is field auto resizing which adjusts its height while typing */
    isAutoResizing?: boolean;
    /** Label for the textarea, which provides context or description for the field */
    label: ReactNode;
    size?: SizesDictionaryType<S>;
  };

type TextAreaCounterOffProps = {
  counterThreshold?: undefined;
  hasCounter?: false;
};

type TextAreaCounterOnProps = {
  /**
   * Character threshold shown after the slash in the counter (e.g. `5/200`); implicitly enables `hasCounter`.
   * When `maxLength` is not provided, a safe internal fallback is used.
   */
  counterThreshold?: number;
  /**
   * Whether to show the character counter (count only); automatically true when `counterThreshold` is set.
   * When `maxLength` is not provided, a safe internal fallback is used.
   */
  hasCounter: true;
  maxLength?: number;
};

type TextAreaCounterWithThresholdProps = {
  /**
   * Character threshold shown after the slash in the counter (e.g. `5/200`); implicitly enables `hasCounter`.
   * When `maxLength` is not provided, a safe internal fallback is used.
   */
  counterThreshold: number;
  /**
   * Whether to show the character counter (count only); automatically true when `counterThreshold` is set.
   * When `maxLength` is not provided, a safe internal fallback is used.
   */
  hasCounter?: boolean;
  maxLength?: number;
};

type TextAreaCounterProps = TextAreaCounterOffProps | TextAreaCounterOnProps | TextAreaCounterWithThresholdProps;

export type TextAreaProps<S = void> = TextAreaBaseProps<S> & TextAreaCounterProps;

export type SpiritTextAreaProps<S = void> = TextAreaProps<S>;
