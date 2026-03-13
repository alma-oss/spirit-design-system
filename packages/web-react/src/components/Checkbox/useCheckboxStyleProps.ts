import classNames from 'classnames';
import { InputPositions } from '../../constants';
import { useClassNamePrefix, useInputPositionClass } from '../../hooks';
import { type CheckboxProps, type SpiritCheckboxProps } from '../../types';

export interface CheckboxStyles {
  /** className props */
  classProps: {
    root: string;
    text: string;
    label: string;
    input: string;
    validationText: string;
  };
  /** props to be passed to the input element */
  props: CheckboxProps;
}

export function useCheckboxStyleProps(props: SpiritCheckboxProps): CheckboxStyles {
  const { inputPosition = InputPositions.START, isItem, isLabelHidden, validationState, ...restProps } = props;
  const { isDisabled, isRequired } = restProps;

  const checkboxClass = useClassNamePrefix('Checkbox');
  const checkboxDisabledClass = `${checkboxClass}--disabled`;
  const checkboxItemClass = `${checkboxClass}--item`;
  const checkboxInputClass = `${checkboxClass}__input`;
  const checkboxInputPositionClass = useInputPositionClass(checkboxClass, inputPosition);
  const checkboxTextClass = `${checkboxClass}__text`;
  const checkboxLabelClass = `${checkboxClass}__label`;
  const checkboxLabelRequiredClass = `${checkboxClass}__label--required`;
  const checkboxLabelHiddenClass = `${checkboxClass}__label--hidden`;
  const checkboxValidationTextClass = `${checkboxClass}__validationText`;
  const checkboxValidationClass = `${checkboxClass}--${validationState}`;

  const rootStyles = classNames(checkboxClass, {
    [checkboxInputPositionClass]: checkboxInputPositionClass,
    [checkboxDisabledClass]: isDisabled,
    [checkboxItemClass]: isItem,
    [checkboxValidationClass]: validationState,
  });
  const labelStyles = classNames(checkboxLabelClass, {
    [checkboxLabelRequiredClass]: isRequired,
    [checkboxLabelHiddenClass]: isLabelHidden,
  });

  return {
    classProps: {
      root: rootStyles,
      text: checkboxTextClass,
      label: labelStyles,
      input: checkboxInputClass,
      validationText: checkboxValidationTextClass,
    },
    props: {
      ...restProps,
      validationState,
    },
  };
}
