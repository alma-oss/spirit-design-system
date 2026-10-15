import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type EyebrowTextProps } from './types';

export function useEyebrowTextStyleProps<C = void>(props: EyebrowTextProps<C>) {
  const { textColor, ...restProps } = props;

  const eyebrowTextClass = useClassNamePrefix('typography-eyebrow');
  const textColorClass = useClassNamePrefix(textColor ? `text-${textColor}` : '');
  const classProps = classNames(eyebrowTextClass, {
    [textColorClass]: !!textColor,
  });

  return {
    classProps,
    props: restProps,
  };
}
