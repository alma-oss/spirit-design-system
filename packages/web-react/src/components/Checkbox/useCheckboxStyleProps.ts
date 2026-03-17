import classNames from 'classnames';
import { InputPositions } from '../../constants';
import { useClassNamePrefix, useInputPositionClass } from '../../hooks';
import { type CheckboxProps, type SpiritCheckboxProps } from '../../types';

export interface CheckboxStyles {
  /** className props */
  classProps: {
    root: string;
    text: string;
    input: string;
  };
  /** props to be passed to the input element */
  props: CheckboxProps;
}

export function useCheckboxStyleProps(props: SpiritCheckboxProps): CheckboxStyles {
  const { inputPosition = InputPositions.START, validationState, ...restProps } = props;
  const { isDisabled, isItem } = restProps;

  const checkboxClass = useClassNamePrefix('Checkbox');
  const checkboxDisabledClass = `${checkboxClass}--disabled`;
  const checkboxItemClass = `${checkboxClass}--item`;
  const checkboxInputClass = `${checkboxClass}__input`;
  const checkboxInputPositionClass = useInputPositionClass(checkboxClass, inputPosition);
  const checkboxTextClass = `${checkboxClass}__text`;
  const checkboxValidationClass = `${checkboxClass}--${validationState}`;

  const rootStyles = classNames(checkboxClass, {
    [checkboxInputPositionClass]: checkboxInputPositionClass,
    [checkboxDisabledClass]: isDisabled,
    [checkboxItemClass]: isItem,
    [checkboxValidationClass]: validationState,
  });

  return {
    classProps: {
      root: rootStyles,
      text: checkboxTextClass,
      input: checkboxInputClass,
    },
    props: {
      ...restProps,
      validationState,
    },
  };
}
