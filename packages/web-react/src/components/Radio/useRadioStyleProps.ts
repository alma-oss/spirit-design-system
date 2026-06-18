import classNames from 'classnames';
import { InputPositions } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import { type FlexDirectionType, type RadioProps, type SpiritRadioProps } from '../../types';
import { inputPositionToFlexDirection } from '../../utils';

export interface RadioStyles {
  /** className props */
  classProps: {
    input: string;
  };
  /** Direction props to be passed to the Flex element */
  direction: FlexDirectionType;
  /** props to be passed to the input element */
  props: RadioProps;
}

export function useRadioStyleProps(props: SpiritRadioProps): RadioStyles {
  const { inputPosition = InputPositions.START, validationState, ...restProps } = props;
  const { isItem } = restProps;

  const radioClass = useClassNamePrefix('Radio');
  const radioItemClass = `${radioClass}--item`;
  const radioValidationClass = `${radioClass}--${validationState}`;

  return {
    classProps: {
      input: classNames(radioClass, {
        [radioValidationClass]: validationState,
        [radioItemClass]: isItem,
      }),
    },
    direction: inputPositionToFlexDirection(inputPosition),
    props: {
      ...restProps,
      validationState,
    },
  };
}
