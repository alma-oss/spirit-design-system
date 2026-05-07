import classNames from 'classnames';
import { useClassNamePrefix, useSymmetry } from '../../hooks';
import { type ButtonColor, type ButtonLinkStyleProps, type ButtonSize } from '../../types';
import { applyColor, applySize } from '../../utils/classname';
import { compose } from '../../utils/compose';

// `${componentClassName}--${color}`;
const getButtonLinkColorClassname = <C = void>(className: string, color: ButtonColor<C>): string =>
  compose(applyColor<ButtonColor<C>>(color))(className);

const getButtonLinkSizeClassname = <S = void>(className: string, size: ButtonSize<S>): string =>
  compose(applySize<ButtonSize<S>>(size))(className);

export function useButtonLinkStyleProps<C = void, S = void>(props: Omit<ButtonLinkStyleProps<C, S>, 'routerOptions'>) {
  const { color, isDisabled, isLoading, isSymmetrical, size, ...restProps } = props;

  const buttonClass = useClassNamePrefix('Button');
  const buttonDisabledClass = `${buttonClass}--disabled`;
  const buttonLoadingClass = `${buttonClass}--loading`;

  const { symmetricalClassName } = useSymmetry(buttonClass, isSymmetrical);

  const classProps = classNames(
    buttonClass,
    getButtonLinkColorClassname(buttonClass, color as ButtonColor<C>),
    getButtonLinkSizeClassname(buttonClass, size as ButtonSize<S>),
    {
      [buttonDisabledClass]: isDisabled || isLoading,
      [buttonLoadingClass]: isLoading,
    },
    symmetricalClassName,
  );

  return {
    classProps,
    props: restProps,
  };
}
