import type { ElementType } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type InputDetailsProps } from '../../types';

export interface InputDetailsStyles<T> {
  classProps: string;
  props: T;
}

export function useInputDetailsStyleProps<E extends ElementType = 'div'>(
  props: InputDetailsProps<E>,
): InputDetailsStyles<InputDetailsProps<E>> {
  const inputDetailsClass = useClassNamePrefix('InputDetails');

  return {
    classProps: inputDetailsClass,
    props,
  };
}
