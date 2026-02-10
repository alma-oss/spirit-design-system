import { type ReactNode } from 'react';
import { type LabelProps } from './label';
import {
  type ChildrenProps,
  type HelperTextProps,
  type InputBaseProps,
  type InputPositionType,
  type ItemProps,
  type RequiredProps,
  type SingleOrResponsive,
  type SpiritInputElementPropsWithRef,
  type Validation,
  type ValidationTextProp,
} from './shared';

export type CheckboxElementBaseProps = SpiritInputElementPropsWithRef;

export interface CheckboxProps
  extends
    CheckboxElementBaseProps,
    ChildrenProps,
    LabelProps,
    ItemProps,
    InputBaseProps,
    Validation,
    ValidationTextProp,
    RequiredProps,
    HelperTextProps {
  /** Whether the checkbox is indeterminate */
  indeterminate?: boolean;
  /** Whether the checkbox is checked */
  isChecked?: boolean;
  /** Position of the input element relative to the label */
  inputPosition?: SingleOrResponsive<InputPositionType>;
  /** Text of control label */
  label: ReactNode;
}

export interface SpiritCheckboxProps extends CheckboxProps {}
