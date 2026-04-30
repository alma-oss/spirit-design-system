import classNames from 'classnames';
import type { ElementType } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritInputAddonProps } from './types';

export interface InputAddonStyles<E extends ElementType = 'div'> {
  classProps: string;
  props: Omit<SpiritInputAddonProps<E>, 'size'>;
}

export function useInputAddonStyleProps<E extends ElementType = 'div'>(
  props: SpiritInputAddonProps<E>,
): InputAddonStyles<E> {
  const { size, ...restProps } = props;
  const inputAddonClass = useClassNamePrefix('InputAddon');
  const inputAddonSizeClass = `${inputAddonClass}--${size}`;

  return {
    classProps: classNames(inputAddonClass, {
      [inputAddonSizeClass]: size,
    }),
    props: restProps,
  };
}
