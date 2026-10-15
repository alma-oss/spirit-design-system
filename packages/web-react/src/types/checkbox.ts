import { type ReactNode } from 'react';
import { type LabelProps } from './label';
import {
  type ChildrenProps,
  type DetailsProps,
  type HelperTextProps,
  type InputBaseProps,
  type InputPositionType,
  type ItemProps,
  type RequiredProps,
  type SingleOrResponsive,
  type SizeProps,
  type SizesDictionaryType,
  type SpiritInputElementPropsWithRef,
  type Validation,
  type ValidationTextProp,
} from './shared';

export type CheckboxElementBaseProps = Omit<SpiritInputElementPropsWithRef, 'size'>;

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
    HelperTextProps,
    DetailsProps,
    SizeProps<SizesDictionaryType> {
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
