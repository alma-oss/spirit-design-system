import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritSliderProps } from '../../types';

type UseSliderStyleProps = Omit<SpiritSliderProps, 'id' | 'value' | 'label'>;

export interface SliderStyles {
  classProps: {
    root: string;
    input: string;
    validationText: string;
  };
  props: UseSliderStyleProps;
}

export function useSliderStyleProps(props: UseSliderStyleProps): SliderStyles {
  const { isDisabled, isFluid, validationState, ...restProps } = props;

  const sliderClass = useClassNamePrefix('Slider');
  const rootClass = classNames(sliderClass);
  const isDisabledClass = `${sliderClass}--disabled`;
  const isFluidClass = `${sliderClass}--fluid`;
  const validationStateClass = `${sliderClass}--${validationState}`;
  const inputClass = `${sliderClass}__input`;
  const validationTextClass = `${sliderClass}__validationText`;

  return {
    classProps: {
      root: classNames(rootClass, {
        [isDisabledClass]: isDisabled,
        [isFluidClass]: isFluid,
        [validationStateClass]: validationState,
      }),
      input: inputClass,
      validationText: validationTextClass,
    },
    props: restProps,
  };
}
