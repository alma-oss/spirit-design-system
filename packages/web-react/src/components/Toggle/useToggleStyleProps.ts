import classNames from 'classnames';
import { InputPositions } from '../../constants';
import { useClassNamePrefix, useInputPositionClass } from '../../hooks';
import { type SpiritToggleProps } from '../../types';

export interface ToggleStyles<T> {
  classProps: {
    root: string;
    text: string;
    input: string;
  };
  props: T;
}

export function useToggleStyleProps(props: SpiritToggleProps): ToggleStyles<SpiritToggleProps> {
  const {
    hasIndicators = false,
    inputPosition = InputPositions.END,
    isDisabled = false,
    isLabelHidden = false,
    isRequired = false,
    validationState,
    ...restProps
  } = props;

  const toggleClass = useClassNamePrefix('Toggle');
  const toggleDisabledClass = `${toggleClass}--disabled`;
  const toggleLabelHiddenClass = `${toggleClass}--labelHidden`;
  const toggleTextClass = `${toggleClass}__text`;
  const toggleValidationClass = `${toggleClass}--${validationState}`;
  const toggleInputClass = `${toggleClass}__input`;
  const toggleInputIndicatorsClass = `${toggleInputClass}--indicators`;
  const toggleInputPositionClass = useInputPositionClass(toggleClass, inputPosition);

  return {
    classProps: {
      root: classNames(toggleClass, {
        [toggleInputPositionClass]: toggleInputPositionClass,
        [toggleDisabledClass]: isDisabled,
        [toggleLabelHiddenClass]: isLabelHidden,
        [toggleValidationClass]: validationState,
      }),
      text: toggleTextClass,
      input: classNames(toggleInputClass, {
        [toggleInputIndicatorsClass]: hasIndicators,
      }),
    },
    props: { ...restProps, validationState, isDisabled, isLabelHidden, isRequired },
  };
}
