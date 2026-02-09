import classNames from 'classnames';
import { type ElementType } from 'react';
import { BorderColors } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import { type SpiritBoxProps } from '../../types';

export interface UseBoxStyleProps<E> {
  /** className props */
  classProps: string;
  /** Props for the box element. */
  props: E;
}

export const useBoxStyleProps = (
  props: Partial<SpiritBoxProps<ElementType>>,
): UseBoxStyleProps<Partial<SpiritBoxProps<ElementType>>> => {
  const { backgroundColor, borderColor, borderStyle, borderWidth, textColor, ...restProps } = props || {};
  const boxBackgroundClassName = useClassNamePrefix(`bg-${backgroundColor}`);
  const boxBorderClassName = useClassNamePrefix('border-');

  const boxBackgroundColor = backgroundColor ? boxBackgroundClassName : '';
  let boxBorderColor = borderColor ? borderColor.replace('', boxBorderClassName) : '';
  let boxBorderStyle = '';
  const boxBorderWidth = borderWidth ? borderWidth.replace('', boxBorderClassName) : '';

  const boxTextColorClass = useClassNamePrefix(textColor ? `text-${textColor}` : '');

  if (borderWidth && parseInt(borderWidth, 10) > 0) {
    boxBorderStyle = `${boxBorderClassName}${borderStyle}`;
    if (!borderColor) {
      boxBorderColor = `${boxBorderClassName}${BorderColors.BASIC}`;
    }
  }

  const boxClasses = classNames(boxBackgroundColor, boxBorderColor, boxBorderStyle, boxBorderWidth, {
    [boxTextColorClass]: !!textColor,
  });

  return {
    classProps: boxClasses,
    props: restProps,
  };
};
