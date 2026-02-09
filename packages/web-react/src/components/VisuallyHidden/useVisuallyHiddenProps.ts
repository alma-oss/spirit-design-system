import { type ElementType } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritVisuallyHiddenProps, type VisuallyHiddenProps } from '../../types';

export interface VisuallyHiddenStyles<E extends ElementType = 'span'> {
  /** className props */
  classProps: string | null;
  /** props to be passed to the element */
  props: VisuallyHiddenProps<E>;
}

export function useVisuallyHiddenProps<E extends ElementType = 'span'>(
  props: SpiritVisuallyHiddenProps<E>,
): VisuallyHiddenStyles<E> {
  const { ...restProps } = props;

  const visuallyHiddenClass = useClassNamePrefix('accessibility-hidden');

  return {
    classProps: visuallyHiddenClass,
    props: restProps,
  };
}
