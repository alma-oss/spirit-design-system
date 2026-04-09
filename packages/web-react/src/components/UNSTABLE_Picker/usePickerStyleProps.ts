import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type SizesDictionaryType, type Validation } from '../../types';

export interface UnstablePickerStyleProps<S = void> extends Validation {
  isDisabled?: boolean;
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
  const { isDisabled, size, validationState } = props;
  const pickerClass = useClassNamePrefix('UNSTABLE_Picker');
  const pickerDisabledClass = `${pickerClass}--disabled`;
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
