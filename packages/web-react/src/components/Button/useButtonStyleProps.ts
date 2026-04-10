import classNames from 'classnames';
import { type CSSProperties, type ElementType } from 'react';
import { warning } from '../../common/utilities';
import { useClassNamePrefix, useDeprecationMessage, useSpacingStyle, useSymmetry } from '../../hooks';
import { type ButtonColor, type ButtonSize, type SpacingType, type SpiritButtonProps } from '../../types';
import { applyColor, applySize } from '../../utils/classname';
import { compose } from '../../utils/compose';

// `${componentClassName}--${color}`;
const getButtonColorClassname = <C = void>(className: string, color: ButtonColor<C>): string =>
  compose(applyColor<ButtonColor<C>>(color))(className);

const getButtonSizeClassname = <S = void>(className: string, size: ButtonSize<S>): string =>
  compose(applySize<ButtonSize<S>>(size))(className);

interface ButtonCSSProperties extends CSSProperties {
  [key: string]: string | undefined | number;
}

export interface ButtonStyles {
  /** className props */
  classProps: string;
  /** Props for the button element */
  props: SpiritButtonProps;
  /** Style props for the element */
  styleProps: ButtonCSSProperties;
}

export function useButtonStyleProps<T extends ElementType = 'button', C = void, S = void>(
  props: SpiritButtonProps<T, C, S>,
): ButtonStyles {
  const { color, isBlock, isDisabled, isLoading, isSymmetrical, size, spacing, ...restProps } = props;

  // @see https://jira.almacareer.tech/browse/DS-1897
  useDeprecationMessage({
    method: 'custom',
    trigger: !!isBlock,
    componentName: 'Button',
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
    getButtonColorClassname(buttonClass, color as ButtonColor<C>),
    getButtonSizeClassname(buttonClass, size as ButtonSize<S>),
    {
      [buttonBlockClass]: shouldApplyBlock(),
      [buttonDisabledClass]: isDisabled || isLoading,
      [buttonLoadingClass]: isLoading,
    },
    symmetricalClassName,
  );

  const buttonStyle: ButtonCSSProperties = {
    ...(useSpacingStyle(spacing as SpacingType, 'button') as ButtonCSSProperties),
  };

  return {
    classProps,
    props: restProps,
    styleProps: buttonStyle,
  };
}
