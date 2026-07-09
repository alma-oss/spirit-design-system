import classNames from 'classnames';
import { type CSSProperties } from 'react';
import { CLASS_NAME_DISABLED } from '../../constants';
import { useClassNamePrefix, useSpacingStyle, useSymmetry } from '../../hooks';
import { type ButtonColor, type ButtonLinkStyleProps, type ButtonSize, type SpacingType } from '../../types';
import { getColorSchemeClassName, getEmotionColorNames } from '../../utils';
import { applyColor, applySize } from '../../utils/classname';
import { compose } from '../../utils/compose';

// `${componentClassName}--${color}`;
const getButtonLinkColorClassname = <C = void>(className: string, color: ButtonColor<C>): string =>
  compose(applyColor<ButtonColor<C>>(color))(className);

const getButtonLinkSizeClassname = <S = void>(className: string, size: ButtonSize<S>): string =>
  compose(applySize<ButtonSize<S>>(size))(className);

const emotionColorNames = getEmotionColorNames() as string[];

interface ButtonLinkCSSProperties extends CSSProperties {
  [key: string]: string | undefined | number;
}

export interface ButtonLinkStyles {
  /** className props */
  classProps: string;
  /** Props for the button link element */
  props: ButtonLinkStyleProps;
  /** Style props for the element */
  styleProps: ButtonLinkCSSProperties;
}

export function useButtonLinkStyleProps<C = void, S = void>(props: Omit<ButtonLinkStyleProps<C, S>, 'routerOptions'>) {
  const { color, isDisabled, isLoading, isSymmetrical, size, spacing, ...restProps } = props;
  const colorAsString = String(color);

  const buttonClass = useClassNamePrefix('Button');
  const buttonLoadingClass = `${buttonClass}--loading`;
  const buttonLinkColorSchemeClass = emotionColorNames.includes(colorAsString)
    ? getColorSchemeClassName({ color: colorAsString, isSubtle: false })
    : undefined;

  const { symmetricalClassName } = useSymmetry(buttonClass, isSymmetrical);

  const classProps = classNames(
    buttonClass,
    getButtonLinkColorClassname(buttonClass, color as ButtonColor<C>),
    buttonLinkColorSchemeClass,
    getButtonLinkSizeClassname(buttonClass, size as ButtonSize<S>),
    {
      [CLASS_NAME_DISABLED]: isDisabled && !isLoading,
      [buttonLoadingClass]: isLoading,
    },
    symmetricalClassName,
  );

  const buttonLinkStyle: ButtonLinkCSSProperties = {
    ...(useSpacingStyle(spacing as SpacingType, 'button') as ButtonLinkCSSProperties),
  };

  return {
    classProps,
    props: restProps,
    styleProps: buttonLinkStyle,
  };
}
