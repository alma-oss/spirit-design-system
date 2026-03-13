import classNames from 'classnames';
import { InputPositions } from '../../constants';
import { useClassNamePrefix, useInputPositionClass } from '../../hooks';
import { type SpiritToggleProps } from '../../types';

export interface ToggleStyles<T> {
  classProps: {
    root: string;
    label: string;
    text: string;
    input: string;
    validationText: string;
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
  const toggleTextClass = `${toggleClass}__text`;
  const toggleLabelClass = `${toggleClass}__label`;
  const toggleHiddenLabelClass = `${toggleLabelClass}--hidden`;
  const toggleValidationClass = `${toggleClass}--${validationState}`;
  const toggleRequiredClass = `${toggleLabelClass}--required`;
  const toggleInputClass = `${toggleClass}__input`;
  const toggleInputIndicatorsClass = `${toggleInputClass}--indicators`;
  const toggleInputPositionClass = useInputPositionClass(toggleClass, inputPosition);
  const toggleValidationTextClass = `${toggleClass}__validationText`;

  const rootClass = classNames(toggleClass, {
    [toggleInputPositionClass]: toggleInputPositionClass,
    [toggleFluidClass]: isFluid,
    [toggleDisabledClass]: isDisabled,
    [toggleValidationClass]: validationState,
  });
  const labelClass = classNames(toggleLabelClass, {
    [toggleRequiredClass]: isRequired,
    [toggleHiddenLabelClass]: isLabelHidden,
  });
  const inputClass = classNames(toggleInputClass, {
    [toggleInputIndicatorsClass]: hasIndicators,
  });

  return {
    classProps: {
      root: rootClass,
      label: labelClass,
      text: toggleTextClass,
      input: inputClass,
      validationText: toggleValidationTextClass,
    },
    props: { ...restProps, validationState, isDisabled, isRequired },
  };
}
