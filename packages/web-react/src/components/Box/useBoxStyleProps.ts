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
  const {
    backgroundColor,
    backgroundGradient,
    borderColor,
    borderStyle,
    borderWidth,
    colorScheme,
    textColor,
    ...restProps
  } = props || {};

  const schemeRootClass = useClassNamePrefix(colorScheme ? `color-scheme-on-${colorScheme}` : '');
  const bgColorSchemeClass = useClassNamePrefix('bg-color-scheme');
  const textColorSchemeClass = useClassNamePrefix('text-color-scheme');
  const borderColorSchemeClass = useClassNamePrefix('border-color-scheme');

  const explicitBackgroundClass = useClassNamePrefix(backgroundColor ? `bg-${backgroundColor}` : '');
  let boxBackgroundColor = '';
  if (backgroundColor) {
    boxBackgroundColor = explicitBackgroundClass;
  } else if (colorScheme && backgroundGradient === undefined) {
    boxBackgroundColor = bgColorSchemeClass;
  }

  const boxBorderClassName = useClassNamePrefix('border-');

  let boxBorderColor = borderColor ? borderColor.replace('', boxBorderClassName) : '';
  let boxBorderStyle = '';
  const boxBorderWidth = borderWidth ? borderWidth.replace('', boxBorderClassName) : '';

  const explicitTextClass = useClassNamePrefix(textColor ? `text-${textColor}` : '');
  let boxTextColorClass = '';
  if (textColor) {
    boxTextColorClass = explicitTextClass;
  } else if (colorScheme) {
    boxTextColorClass = textColorSchemeClass;
  }

  if (borderWidth && parseInt(borderWidth, 10) > 0) {
    boxBorderStyle = `${boxBorderClassName}${borderStyle}`;
    if (!borderColor) {
      boxBorderColor = colorScheme ? borderColorSchemeClass : `${boxBorderClassName}${BorderColors.BASIC}`;
    }
  }

  const boxClasses = classNames(
    colorScheme ? schemeRootClass : '',
    boxBackgroundColor,
    boxBorderColor,
    boxBorderStyle,
    boxBorderWidth,
    {
      [boxTextColorClass]: Boolean(boxTextColorClass),
    },
  );

  return {
    classProps: boxClasses,
    props: { ...restProps, backgroundGradient },
  };
};
