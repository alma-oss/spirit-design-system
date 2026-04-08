import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritSliderProps } from '../../types';

type UseSliderStyleProps = Omit<SpiritSliderProps, 'id' | 'value' | 'label'>;

export interface SliderStyles {
  classProps: {
    root: string;
    label: string;
    input: string;
    helperText: string;
    validationText: string;
  };
  props: UseSliderStyleProps;
}

export function useSliderStyleProps(props: UseSliderStyleProps): SliderStyles {
  const { isDisabled, isFluid, isLabelHidden, validationState, ...restProps } = props;

  const sliderClass = useClassNamePrefix('Slider');
  const isDisabledClass = `${sliderClass}--disabled`;
  const isFluidClass = `${sliderClass}--fluid`;
  const validationStateClass = `${sliderClass}--${validationState}`;
  const labelClass = `${sliderClass}__label`;
  const isLabelHiddenClass = `${sliderClass}__label--hidden`;
  const inputClass = `${sliderClass}__input`;
  const helperTextClass = `${sliderClass}__helperText`;
  const validationTextClass = `${sliderClass}__validationText`;

  return {
    classProps: {
      root: classNames(sliderClass, {
        [isDisabledClass]: isDisabled,
        [isFluidClass]: isFluid,
        [validationStateClass]: validationState,
      }),
      label: classNames(labelClass, {
        [isLabelHiddenClass]: isLabelHidden,
      }),
      input: inputClass,
      helperText: helperTextClass,
      validationText: validationTextClass,
    },
    props: restProps,
  };
}
