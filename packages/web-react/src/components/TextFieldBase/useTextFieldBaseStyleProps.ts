import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritTextFieldBaseProps, type TextFieldBaseProps } from '../../types';

export interface TextFieldBaseStyles {
  /** className props */
  classProps: {
    root: string;
    label: string;
    input: string;
    validationText: string;
    passwordToggle: string;
    passwordToggleButton: string;
    passwordToggleIcon: string;
    counter: string;
  };
  /** props to be passed to the input element */
  props: Omit<TextFieldBaseProps, 'label'>;
}

export function useTextFieldBaseStyleProps(props: Omit<SpiritTextFieldBaseProps, 'label'>): TextFieldBaseStyles {
  const { isFluid, isMultiline, isLabelHidden, size, validationState, ...restProps } = props;
  const { isDisabled, isRequired } = restProps;

  const TextFieldBaseClass = useClassNamePrefix(isMultiline ? 'TextArea' : 'TextField');
  const TextFieldBaseDisabledClass = `${TextFieldBaseClass}--disabled`;
  const TextFieldBaseFluidClass = `${TextFieldBaseClass}--fluid`;
  const TextFieldBaseSizeClass = `${TextFieldBaseClass}--${size}`;
  const TextFieldBaseValidationClass = `${TextFieldBaseClass}--${validationState}`;
  const TextFieldBaseInputClass = `${TextFieldBaseClass}__input`;
  const TextFieldBaseLabelClass = `${TextFieldBaseClass}__label`;
  const TextFieldBaseLabelRequiredClass = `${TextFieldBaseClass}__label--required`;
  const TextFieldBaseLabelHiddenClass = `${TextFieldBaseClass}__label--hidden`;
  const TextFieldBaseValidationTextClass = `${TextFieldBaseClass}__validationText`;
  const TextFieldBasePasswordToggleClass = `${TextFieldBaseClass}__passwordToggle`;
  const TextFieldBasePasswordToggleButtonClass = `${TextFieldBaseClass}__passwordToggle__button`;
  const TextFieldBasePasswordToggleIconClass = `${TextFieldBaseClass}__passwordToggle__icon`;

  const rootStyles = classNames(TextFieldBaseClass, {
    [TextFieldBaseDisabledClass]: isDisabled,
    [TextFieldBaseFluidClass]: isFluid,
    [TextFieldBaseValidationClass]: validationState,
    [TextFieldBaseSizeClass]: size,
  });
  const labelStyles = classNames(TextFieldBaseLabelClass, {
    [TextFieldBaseLabelRequiredClass]: isRequired,
    [TextFieldBaseLabelHiddenClass]: isLabelHidden,
  });
  const counterStyles = `${TextFieldBaseClass}__counter`;

  return {
    classProps: {
      root: rootStyles,
      label: labelStyles,
      input: TextFieldBaseInputClass,
      validationText: TextFieldBaseValidationTextClass,
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
