import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type SizesDictionaryType, type Validation } from '../../types';

export interface UnstablePickerStyleProps<S = void> extends Validation {
  isDisabled?: boolean;
  isFluid?: boolean;
  isLabelHidden?: boolean;
  isRequired?: boolean;
  size?: SizesDictionaryType<S>;
}

export interface UnstablePickerStyle {
  /** className props */
  classProps: {
    helperText: string;
    inputContainer: string;
    label: string;
    root: string;
    selection: string;
    selectionEmpty: string;
    trigger: string;
    validationText: string;
  };
}

export const usePickerStyleProps = (props: UnstablePickerStyleProps): UnstablePickerStyle => {
  const { isDisabled, isFluid, isLabelHidden, isRequired, size, validationState } = props;
  const pickerClass = useClassNamePrefix('UNSTABLE_Picker');
  const pickerDisabledClass = `${pickerClass}--disabled`;
  const pickerFluidClass = `${pickerClass}--fluid`;
  const pickerSizeClass = `${pickerClass}--${size}`;
  const pickerValidationClass = `${pickerClass}--${validationState}`;
  const pickerLabelClass = `${pickerClass}__label`;
  const pickerLabelHiddenClass = `${pickerLabelClass}--hidden`;
  const pickerLabelRequiredClass = `${pickerLabelClass}--required`;
  const pickerInputContainerClass = `${pickerClass}__inputContainer`;
  const pickerSelectionClass = `${pickerClass}__selection`;
  const pickerSelectionEmptyClass = `${pickerClass}__selectionEmpty`;
  const pickerTriggerClass = `${pickerClass}__trigger`;
  const pickerHelperTextClass = `${pickerClass}__helperText`;
  const pickerValidationTextClass = `${pickerClass}__validationText`;

  return {
    classProps: {
      root: classNames(pickerClass, {
        [pickerDisabledClass]: isDisabled,
        [pickerFluidClass]: isFluid,
        [pickerSizeClass]: size,
        [pickerValidationClass]: validationState,
      }),
      label: classNames(pickerLabelClass, {
        [pickerLabelHiddenClass]: isLabelHidden,
        [pickerLabelRequiredClass]: isRequired,
      }),
      inputContainer: pickerInputContainerClass,
      selection: pickerSelectionClass,
      selectionEmpty: pickerSelectionEmptyClass,
      trigger: pickerTriggerClass,
      helperText: pickerHelperTextClass,
      validationText: pickerValidationTextClass,
    },
  };
};
