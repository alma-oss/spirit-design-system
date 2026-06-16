import classNames from 'classnames';
import { DirectionExtended, InputPositions } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import { type CheckboxProps, type FlexDirectionType, type SpiritCheckboxProps } from '../../types';

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

function inputPositionToFlexDirection(inputPosition: SpiritCheckboxProps['inputPosition']): FlexDirectionType {
  if (typeof inputPosition === 'object') {
    return Object.fromEntries(
      Object.entries(inputPosition).map(([breakpoint, position]) => [
        breakpoint,
        position === InputPositions.END ? DirectionExtended.HORIZONTAL_REVERSED : DirectionExtended.HORIZONTAL,
      ]),
    ) as FlexDirectionType;
  }

  return inputPosition === InputPositions.END ? DirectionExtended.HORIZONTAL_REVERSED : DirectionExtended.HORIZONTAL;
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
