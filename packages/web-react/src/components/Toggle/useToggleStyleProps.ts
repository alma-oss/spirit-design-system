import classNames from 'classnames';
import { InputPositions } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import { type FlexAlignmentXType, type FlexDirectionType, type SpiritToggleProps } from '../../types';
import { inputPositionToFlexAlignmentX, inputPositionToFlexDirection } from '../../utils';

export interface ToggleStyles<T> {
  classProps: {
    input: string;
  };
  /** Horizontal alignment props to be passed to the Flex element */
  alignmentX: FlexAlignmentXType;
  /** Direction props to be passed to the Flex element */
  direction: FlexDirectionType;
  props: T;
}

export function useToggleStyleProps(props: SpiritToggleProps): ToggleStyles<SpiritToggleProps> {
  const { hasIndicators = false, inputPosition = InputPositions.END, ...restProps } = props;

  const toggleClass = useClassNamePrefix('Toggle');
  const toggleIndicatorsClass = `${toggleClass}--indicators`;

  return {
    classProps: {
      input: classNames(toggleClass, {
        [toggleIndicatorsClass]: hasIndicators,
      }),
    },
    alignmentX: inputPositionToFlexAlignmentX(inputPosition),
    direction: inputPositionToFlexDirection(inputPosition),
    props: restProps,
  };
}
