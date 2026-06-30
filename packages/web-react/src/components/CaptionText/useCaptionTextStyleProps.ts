'use client';

import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type CaptionTextProps } from './types';

export function useCaptionTextStyleProps<C = void>(props: CaptionTextProps<C>) {
  const { textColor, ...restProps } = props;

  const captionTextClass = useClassNamePrefix('typography-caption');
  const textColorClass = useClassNamePrefix(textColor ? `text-${textColor}` : '');
  const classProps = classNames(captionTextClass, {
    [textColorClass]: !!textColor,
  });

  return {
    classProps,
    props: restProps,
  };
}
