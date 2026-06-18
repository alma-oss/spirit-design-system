import classNames from 'classnames';
import { InputPositions } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import { type CheckboxProps, type FlexDirectionType, type SpiritCheckboxProps } from '../../types';
import { inputPositionToFlexDirection } from '../../utils';

export interface CheckboxStyles {
  /** className props */
  classProps: {
    input: string;
  };
  /** Direction props to be passed to the Flex element */
  direction: FlexDirectionType;
  /** props to be passed to the input element */
  props: CheckboxProps;
}

export function useCheckboxStyleProps(props: SpiritCheckboxProps): CheckboxStyles {
  const { inputPosition = InputPositions.START, validationState, ...restProps } = props;
  const { isItem } = restProps;

  const checkboxClass = useClassNamePrefix('Checkbox');
  const checkboxItemClass = `${checkboxClass}--item`;
  const checkboxValidationClass = `${checkboxClass}--${validationState}`;

  return {
    classProps: {
      input: classNames(checkboxClass, {
        [checkboxValidationClass]: validationState,
        [checkboxItemClass]: isItem,
      }),
    },
    direction: inputPositionToFlexDirection(inputPosition),
    props: {
      ...restProps,
      validationState,
    },
  };
}
