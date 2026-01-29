import classNames from 'classnames';
import { type ElementType } from 'react';
import { warning } from '../../common/utilities';
import { useClassNamePrefix, useDeprecationMessage, useSymmetry } from '../../hooks';
import { type ButtonColor, type ButtonSize, type SpiritButtonProps } from '../../types';
import { applyColor, applySize } from '../../utils/classname';
import { compose } from '../../utils/compose';

// `${componentClassName}--${color}`;
const getButtonLinkColorClassname = <C = void>(className: string, color: ButtonColor<C>): string =>
  compose(applyColor<ButtonColor<C>>(color))(className);

const getButtonLinkSizeClassname = <S = void>(className: string, size: ButtonSize<S>): string =>
  compose(applySize<ButtonSize<S>>(size))(className);

export interface ButtonLinkStyles {
  /** className props */
  classProps: string;
  /** Props for the button element */
  props: SpiritButtonProps;
}

export function useButtonLinkStyleProps<T extends ElementType = 'button', C = void, S = void>(
  props: SpiritButtonProps<T, C, S>,
): ButtonLinkStyles {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, isBlock, isDisabled, isLoading, isSymmetrical, size, routerOptions, ...restProps } = props;

  // @see https://jira.almacareer.tech/browse/DS-1897
  useDeprecationMessage({
    method: 'custom',
    trigger: !!isBlock,
    componentName: 'ButtonLink',
    customText:
      "The `isBlock` property will be deleted in the next major release. Please read component's documentation for more information.",
  });

  const buttonClass = useClassNamePrefix('Button');
  const buttonBlockClass = `${buttonClass}--block`;
  const buttonDisabledClass = `${buttonClass}--disabled`;
  const buttonLoadingClass = `${buttonClass}--loading`;

  const { isSymmetricalActive, symmetricalClassName } = useSymmetry(buttonClass, isSymmetrical);

  if (isBlock && isSymmetricalActive) {
    warning(false, 'isBlock and isSymmetrical props are mutually exclusive');
  }

  // @deprecated "isBlock" will be removed in the next major version. Please read component's documentation for more information.
  const shouldApplyBlock = () => isBlock && !isSymmetricalActive;

  const classProps = classNames(
    buttonClass,
    getButtonLinkColorClassname(buttonClass, color as ButtonColor<C>),
    getButtonLinkSizeClassname(buttonClass, size as ButtonSize<S>),
    {
      [buttonBlockClass]: shouldApplyBlock(),
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
