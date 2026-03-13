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

<<<<<<< HEAD
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
=======
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
>>>>>>> 92c17dc32 (refactor(web-react): extract `HelperText` and move `useAriaIds` to shared hooks #DS-2398)
    },
    props: {
      ...restProps,
      isMultiline,
    },
  };
}
