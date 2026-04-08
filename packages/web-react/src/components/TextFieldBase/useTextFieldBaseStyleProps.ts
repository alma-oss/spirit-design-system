import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritTextFieldBaseProps, type TextFieldBaseProps } from '../../types';

export interface TextFieldBaseStyles {
  /** className props */
  classProps: {
    root: string;
    label: string;
    input: string;
    helperText: string;
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

  const textFieldBaseClass = useClassNamePrefix(isMultiline ? 'TextArea' : 'TextField');
  const textFieldBaseDisabledClass = `${textFieldBaseClass}--disabled`;
  const textFieldBaseFluidClass = `${textFieldBaseClass}--fluid`;
  const textFieldBaseSizeClass = `${textFieldBaseClass}--${size}`;
  const textFieldBaseValidationClass = `${textFieldBaseClass}--${validationState}`;
  const textFieldBaseInputClass = `${textFieldBaseClass}__input`;
  const textFieldBaseLabelClass = `${textFieldBaseClass}__label`;
  const textFieldBaseLabelRequiredClass = `${textFieldBaseClass}__label--required`;
  const textFieldBaseLabelHiddenClass = `${textFieldBaseClass}__label--hidden`;
  const textFieldBaseValidationTextClass = `${textFieldBaseClass}__validationText`;
  const textFieldBasePasswordToggleClass = `${textFieldBaseClass}__passwordToggle`;
  const textFieldBasePasswordToggleButtonClass = `${textFieldBaseClass}__passwordToggle__button`;
  const textFieldBasePasswordToggleIconClass = `${textFieldBaseClass}__passwordToggle__icon`;
  const textFieldBaseHelperTextClass = `${textFieldBaseClass}__helperText`;
  const textFieldBaseCounterClass = `${textFieldBaseClass}__counter`;

  return {
    classProps: {
      root: classNames(textFieldBaseClass, {
        [textFieldBaseDisabledClass]: isDisabled,
        [textFieldBaseFluidClass]: isFluid,
        [textFieldBaseValidationClass]: validationState,
        [textFieldBaseSizeClass]: size,
      }),
      label: classNames(textFieldBaseLabelClass, {
        [textFieldBaseLabelRequiredClass]: isRequired,
        [textFieldBaseLabelHiddenClass]: isLabelHidden,
      }),
      input: textFieldBaseInputClass,
      helperText: textFieldBaseHelperTextClass,
      validationText: textFieldBaseValidationTextClass,
      passwordToggle: textFieldBasePasswordToggleClass,
      passwordToggleButton: textFieldBasePasswordToggleButtonClass,
      passwordToggleIcon: textFieldBasePasswordToggleIconClass,
      counter: textFieldBaseCounterClass,
    },
    props: {
      ...restProps,
      isMultiline,
    },
  };
}
