import classNames from 'classnames';
import { Sizes } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import { type DisplayHeadingProps } from './types';

export function useDisplayHeadingStyleProps<C = void>(props: DisplayHeadingProps<C>) {
  const { isItalic, size = Sizes.MEDIUM, textColor, ...restProps } = props;
  const shouldApplyItalic = Boolean(isItalic);

  const displayHeadingClass = useClassNamePrefix('typography-display');
  const italicClass = useClassNamePrefix(shouldApplyItalic ? 'text-italic' : '');
  const textColorClass = useClassNamePrefix(textColor ? `text-${textColor}` : '');
  const classProps = classNames(`${displayHeadingClass}-${size}`, {
    [italicClass]: shouldApplyItalic,
    [textColorClass]: !!textColor,
  });

  return {
    classProps,
    props: restProps,
  };
}
