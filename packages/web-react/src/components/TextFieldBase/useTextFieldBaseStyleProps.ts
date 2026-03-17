import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritTextFieldBaseProps, type TextFieldBaseProps } from '../../types';

export interface TextFieldBaseStyles {
  /** className props */
  classProps: {
    root: string;
    input: string;
    passwordToggle: string;
    passwordToggleButton: string;
    passwordToggleIcon: string;
    counter: string;
  };
  /** props to be passed to the input element */
  props: Omit<TextFieldBaseProps, 'label'>;
}

export function useTextFieldBaseStyleProps(props: Omit<SpiritTextFieldBaseProps, 'label'>): TextFieldBaseStyles {
  const { isFluid, isMultiline, size, validationState, ...restProps } = props;
  const { isDisabled } = restProps;

  const TextFieldBaseClass = useClassNamePrefix(isMultiline ? 'TextArea' : 'TextField');
  const TextFieldBaseDisabledClass = `${TextFieldBaseClass}--disabled`;
  const TextFieldBaseFluidClass = `${TextFieldBaseClass}--fluid`;
  const TextFieldBaseSizeClass = `${TextFieldBaseClass}--${size}`;
  const TextFieldBaseValidationClass = `${TextFieldBaseClass}--${validationState}`;
  const TextFieldBaseInputClass = `${TextFieldBaseClass}__input`;
  const TextFieldBasePasswordToggleClass = `${TextFieldBaseClass}__passwordToggle`;
  const TextFieldBasePasswordToggleButtonClass = `${TextFieldBaseClass}__passwordToggle__button`;
  const TextFieldBasePasswordToggleIconClass = `${TextFieldBaseClass}__passwordToggle__icon`;

  const rootStyles = classNames(TextFieldBaseClass, {
    [TextFieldBaseDisabledClass]: isDisabled,
    [TextFieldBaseFluidClass]: isFluid,
    [TextFieldBaseValidationClass]: validationState,
    [TextFieldBaseSizeClass]: size,
  });
  const counterStyles = `${TextFieldBaseClass}__counter`;

  return {
    classProps: {
      root: rootStyles,
      input: TextFieldBaseInputClass,
      passwordToggle: TextFieldBasePasswordToggleClass,
      passwordToggleButton: TextFieldBasePasswordToggleButtonClass,
      passwordToggleIcon: TextFieldBasePasswordToggleIconClass,
      counter: counterStyles,
    },
    props: {
      ...restProps,
      isMultiline,
    },
  };
}
