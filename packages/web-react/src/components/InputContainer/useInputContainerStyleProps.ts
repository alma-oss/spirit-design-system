import classNames from 'classnames';
import type { ElementType } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritInputContainerProps } from './types';

export interface InputContainerStyles {
  /** className props */
  classProps: string;
  /** props to be passed to the element */
  props: Partial<SpiritInputContainerProps>;
}

export function useInputContainerStyleProps<E extends ElementType = 'div'>(
  props: SpiritInputContainerProps<E>,
): InputContainerStyles {
  const { size, isDisabled, validationState, ...restProps } = props;
  const inputContainerClass = useClassNamePrefix('InputContainer');
  const inputContainerSizeClass = `${inputContainerClass}--${size}`;
  const inputContainerDisabledClass = `${inputContainerClass}--disabled`;
  const inputContainerValidationClass = validationState ? `${inputContainerClass}--${validationState}` : null;

  return {
    classProps: classNames(
      inputContainerClass,
      {
        [inputContainerSizeClass]: size,
        [inputContainerDisabledClass]: isDisabled,
      },
      inputContainerValidationClass,
    ),
    props: restProps,
  };
}
