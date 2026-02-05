import classNames from 'classnames';
import { type CSSProperties, type ElementType } from 'react';
import { useClassNamePrefix, useSpacingStyle, useSymmetry } from '../../hooks';
import { type ControlButtonSize, type SpacingType, type SpiritControlButtonProps } from '../../types';
import { applySize, compose } from '../../utils';

const getControlButtonSizeClassname = <S = void>(className: string, size: ControlButtonSize<S>): string =>
  compose(applySize<ControlButtonSize<S>>(size))(className);

interface ControlButtonCSSProperties extends CSSProperties {
  [key: string]: string | undefined | number;
}

export interface ControlButtonStyles {
  /** className props */
  classProps: string;
  /** Props for the control button element */
  props: SpiritControlButtonProps;
  /** Style props for the element */
  styleProps: ControlButtonCSSProperties;
}

export function useControlButtonStyleProps<T extends ElementType = 'button', S = void>(
  props: SpiritControlButtonProps<T, S>,
): ControlButtonStyles {
  const { isDisabled, isSubtle, isSymmetrical, size, spacing, ...restProps } = props;

  const controlButtonClass = useClassNamePrefix('ControlButton');
  const controlButtonBackgroundClass = `${controlButtonClass}--hasBackground`;
  const controlButtonDisabledClass = `${controlButtonClass}--disabled`;
  const dynamicColorBackgroundInteractiveClass = useClassNamePrefix('dynamic-color-background-interactive');
  const dynamicColorBorderClass = useClassNamePrefix('dynamic-color-border');
  const accessibilityTapTargetClass = useClassNamePrefix('accessibility-tap-target');

  const { symmetricalClassName } = useSymmetry(controlButtonClass, isSymmetrical);

  const classProps = classNames(
    controlButtonClass,
    getControlButtonSizeClassname(controlButtonClass, size as ControlButtonSize<S>),
    dynamicColorBackgroundInteractiveClass,
    accessibilityTapTargetClass,
    {
      [controlButtonDisabledClass]: isDisabled,
      [controlButtonBackgroundClass]: !isSubtle,
      [dynamicColorBorderClass]: !isSubtle,
    },
    symmetricalClassName,
  );

  const controlButtonStyle: ControlButtonCSSProperties = {
    ...(useSpacingStyle(spacing as SpacingType, 'control-button') as ControlButtonCSSProperties),
  };

  return {
    classProps,
    props: restProps,
    styleProps: controlButtonStyle,
  };
}
