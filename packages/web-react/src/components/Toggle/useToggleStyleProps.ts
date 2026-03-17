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
    isFluid = false,
    isLabelHidden = false,
    isRequired = false,
    validationState,
    ...restProps
  } = props;

  const toggleClass = useClassNamePrefix('Toggle');
  const toggleFluidClass = `${toggleClass}--fluid`;
  const toggleDisabledClass = `${toggleClass}--disabled`;
  const toggleLabelHiddenClass = `${toggleClass}--labelHidden`;
  const toggleTextClass = `${toggleClass}__text`;
  const toggleValidationClass = `${toggleClass}--${validationState}`;
  const toggleInputClass = `${toggleClass}__input`;
  const toggleInputIndicatorsClass = `${toggleInputClass}--indicators`;
  const toggleInputPositionClass = useInputPositionClass(toggleClass, inputPosition);

  const rootClass = classNames(toggleClass, {
    [toggleInputPositionClass]: toggleInputPositionClass,
    [toggleFluidClass]: isFluid,
    [toggleDisabledClass]: isDisabled,
    [toggleLabelHiddenClass]: isLabelHidden,
    [toggleValidationClass]: validationState,
  });
  const inputClass = classNames(toggleInputClass, {
    [toggleInputIndicatorsClass]: hasIndicators,
  });

  return {
    classProps: {
      root: rootClass,
      text: toggleTextClass,
      input: inputClass,
    },
    props: { ...restProps, validationState, isDisabled, isLabelHidden, isRequired },
  };
}
