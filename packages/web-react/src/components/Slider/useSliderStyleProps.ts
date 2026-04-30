import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritSliderProps } from '../../types';

type UseSliderStyleProps = Omit<SpiritSliderProps, 'id' | 'value' | 'label'>;

export interface SliderStyles {
  classProps: {
    input: string;
  };
  props: UseSliderStyleProps;
}

export function useSliderStyleProps(props: UseSliderStyleProps): SliderStyles {
  const { isDisabled, ...restProps } = props;

  const sliderClass = useClassNamePrefix('Slider');
  const isDisabledClass = `${sliderClass}--disabled`;

  return {
    classProps: {
      input: classNames(sliderClass, {
        [isDisabledClass]: isDisabled,
      }),
    },
    props: restProps,
  };
}
