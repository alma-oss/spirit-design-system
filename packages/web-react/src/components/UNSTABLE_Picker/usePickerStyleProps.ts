import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';

export interface UnstablePickerStyleProps {
  isDisabled?: boolean;
}

export interface UnstablePickerStyle {
  /** className props */
  classProps: {
    root: string;
    selection: string;
    selectionEmpty: string;
    trigger: string;
  };
}

export const usePickerStyleProps = ({ isDisabled }: UnstablePickerStyleProps = {}): UnstablePickerStyle => {
  const pickerClass = useClassNamePrefix('UNSTABLE_Picker');
  const pickerSelectionClass = `${pickerClass}Selection`;
  const pickerSelectionEmptyClass = `${pickerSelectionClass}__empty`;
  const pickerSelectionDisabledClass = `${pickerSelectionClass}--disabled`;
  const pickerTriggerClass = `${pickerClass}Trigger`;

  return {
    classProps: {
      root: pickerClass,
      selection: classNames(pickerSelectionClass, { [pickerSelectionDisabledClass]: isDisabled }),
      selectionEmpty: pickerSelectionEmptyClass,
      trigger: pickerTriggerClass,
    },
  };
};
