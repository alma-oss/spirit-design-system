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
    inputContainer: string;
    root: string;
    selection: string;
    selectionEmpty: string;
    trigger: string;
  };
}

export const usePickerStyleProps = (props: UnstablePickerStyleProps): UnstablePickerStyle => {
  const { isDisabled, isFluid, size, validationState } = props;
  const pickerClass = useClassNamePrefix('UNSTABLE_Picker');
  const pickerDisabledClass = `${pickerClass}--disabled`;
  const pickerFluidClass = `${pickerClass}--fluid`;
  const pickerSizeClass = `${pickerClass}--${size}`;
  const pickerValidationClass = `${pickerClass}--${validationState}`;
  const pickerInputContainerClass = `${pickerClass}__inputContainer`;
  const pickerSelectionClass = `${pickerClass}__selection`;
  const pickerSelectionEmptyClass = `${pickerClass}__selectionEmpty`;
  const pickerTriggerClass = `${pickerClass}__trigger`;

  return {
    classProps: {
      root: classNames(pickerClass, {
        [pickerDisabledClass]: isDisabled,
        [pickerFluidClass]: isFluid,
        [pickerSizeClass]: size,
        [pickerValidationClass]: validationState,
      }),
      inputContainer: pickerInputContainerClass,
      selection: pickerSelectionClass,
      selectionEmpty: pickerSelectionEmptyClass,
      trigger: pickerTriggerClass,
    },
  };
};
