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
  type SizesDictionaryType,
  type SpiritInputElementPropsWithRef,
  type Validation,
} from './shared';

export type RadioElementBaseProps = Omit<SpiritInputElementPropsWithRef, 'size'>;

export interface RadioProps
  extends
    RadioElementBaseProps,
    ChildrenProps,
    LabelProps,
    ItemProps,
    HelperTextProps,
    InputBaseProps,
    RequiredProps,
    Omit<Validation, 'isRequired'> {
  /** Position of the input element relative to the label */
  inputPosition?: SingleOrResponsive<InputPositionType>;
  /** Whether the checkbox is checked */
  isChecked?: boolean;
  /** Text of control label */
  label: ReactNode;
  /** Size variant. */
  size?: SizesDictionaryType;
}

export interface SpiritRadioProps extends RadioProps {}
