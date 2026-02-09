import classNames from 'classnames';
import { type ElementType } from 'react';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritTextProps, type TextProps } from '../../types';

export interface TextStyles<E extends ElementType = 'p'> {
  /** className props */
  classProps: string | null;
  /** props to be passed to the input element */
  props: TextProps<E>;
}

export function useTextStyleProps<E extends ElementType = 'p', S = void, Emph = void, C = void>(
  props: SpiritTextProps<E, S, Emph, C>,
): TextStyles<E> {
  const { emphasis, size, textColor, ...restProps } = props;

  const textClass = useClassNamePrefix('typography-body');
  const textColorClass = useClassNamePrefix(textColor ? `text-${textColor}` : '');
  const className = classNames(`${textClass}-${size}-${emphasis}`, {
    [textColorClass]: !!textColor,
  });

  return {
    classProps: className,
    props: restProps,
  };
}
