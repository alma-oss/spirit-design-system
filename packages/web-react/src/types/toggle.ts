import { type ChangeEvent, type ReactNode } from 'react';
import { type LabelProps } from './label';
import {
  type ChildrenProps,
  type HelperTextProps,
  type InputBaseProps,
  type InputPositionType,
  type RequiredProps,
  type SingleOrResponsive,
  type SpiritInputElementPropsWithRef,
  type StyleProps,
  type Validation,
  type ValidationTextType,
} from './shared';

export type ToggleElementBaseProps = SpiritInputElementPropsWithRef;

export interface ToggleProps
  extends
    ToggleElementBaseProps,
    ChildrenProps,
    LabelProps,
    RequiredProps,
    InputBaseProps,
    HelperTextProps,
    StyleProps,
    Validation {
  hasIndicators?: boolean;
  /** Position of the input element relative to the label */
  inputPosition?: SingleOrResponsive<InputPositionType>;
  isChecked?: boolean;
  isDisabled?: boolean;
  isFluid?: boolean;
  isLabelHidden?: boolean;
  label: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  validationText?: ValidationTextType;
}

export interface SpiritToggleProps extends ToggleProps {}
