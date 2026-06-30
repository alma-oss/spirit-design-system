import classNames from 'classnames';
import { Sizes } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import { type ActionTextProps } from './types';

export function useActionTextStyleProps<C = void>(props: ActionTextProps<C>) {
  const { textColor, size = Sizes.MEDIUM, ...restProps } = props;

  const actionTextClass = useClassNamePrefix('typography-action');
  const textColorClass = useClassNamePrefix(textColor ? `text-${textColor}` : '');
  const classProps = classNames(`${actionTextClass}-${size}`, {
    [textColorClass]: !!textColor,
  });

  return {
    classProps,
    props: restProps,
  };
}
