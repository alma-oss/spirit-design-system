import classNames from 'classnames';
import { type ElementType } from 'react';
import { BorderColors } from '../../constants';
import { useClassNamePrefix } from '../../hooks';
import { type BoxBorderRadiusCornersType, type BoxProps } from '../../types';

export interface UseBoxStyleProps<E> {
  /** className props */
  classProps: string;
  /** Props for the box element. */
  props: E;
}

const BORDER_RADIUS_CORNER_PROPS = {
  topStart: 'borderRadiusTopStart',
  topEnd: 'borderRadiusTopEnd',
  bottomEnd: 'borderRadiusBottomEnd',
  bottomStart: 'borderRadiusBottomStart',
} as const;

const isBorderRadiusCorners = (value: unknown): value is BoxBorderRadiusCornersType =>
  typeof value === 'object' &&
  value !== null &&
  ['all', ...Object.keys(BORDER_RADIUS_CORNER_PROPS)].some((key) => key in value);

// Flatten the `borderRadius` prop into style props, a per-corner object becomes one style prop per corner.
const getBorderRadiusProps = (borderRadius: BoxProps<ElementType>['borderRadius']) => {
  if (!isBorderRadiusCorners(borderRadius)) {
    return { borderRadius };
  }

  const { all, ...corners } = borderRadius;

  return {
    borderRadius: all,
    ...Object.fromEntries(
      Object.entries(BORDER_RADIUS_CORNER_PROPS).map(([corner, propName]) => [
        propName,
        corners[corner as keyof typeof corners],
      ]),
    ),
  };
};

export const useBoxStyleProps = (
  props: Partial<BoxProps<ElementType>>,
): UseBoxStyleProps<Partial<BoxProps<ElementType>>> => {
  const { backgroundColor, borderColor, borderRadius, borderStyle, borderWidth, colorScheme, textColor, ...restProps } =
    props || {};

  const schemeRootClass = useClassNamePrefix(colorScheme ? `color-scheme-on-${colorScheme}` : '');
  const bgColorSchemeClass = useClassNamePrefix('bg-color-scheme');
  const textColorSchemeClass = useClassNamePrefix('text-color-scheme');
  const borderColorSchemeClass = useClassNamePrefix('border-color-scheme');

  const explicitBackgroundClass = useClassNamePrefix(backgroundColor ? `bg-${backgroundColor}` : '');
  let boxBackgroundColor = '';
  if (backgroundColor) {
    boxBackgroundColor = explicitBackgroundClass;
  } else if (colorScheme && props?.backgroundGradient === undefined) {
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
    props: { ...restProps, ...getBorderRadiusProps(borderRadius) },
  };
};
