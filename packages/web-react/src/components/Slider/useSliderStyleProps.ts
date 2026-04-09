import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritSliderProps } from '../../types';

type UseSliderStyleProps = Omit<SpiritSliderProps, 'id' | 'value' | 'label'>;

export interface SliderStyles {
  classProps: {
    root: string;
    input: string;
  };
  props: UseSliderStyleProps;
}

export function useSliderStyleProps(props: UseSliderStyleProps): SliderStyles {
  const { isDisabled, validationState, ...restProps } = props;

  const sliderClass = useClassNamePrefix('Slider');
  const isDisabledClass = `${sliderClass}--disabled`;
  const validationStateClass = `${sliderClass}--${validationState}`;
  const inputClass = `${sliderClass}__input`;

  return {
    classProps: {
      root: classNames(sliderClass, {
        [isDisabledClass]: isDisabled,
        [validationStateClass]: validationState,
      }),
      input: inputClass,
    },
    props: restProps,
  };
}
