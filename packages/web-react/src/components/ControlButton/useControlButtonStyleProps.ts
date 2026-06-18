import classNames from 'classnames';
import { type CSSProperties, type ElementType } from 'react';
import { CLASS_NAME_DISABLED } from '../../constants';
import { useClassNamePrefix, useSpacingStyle, useSymmetry } from '../../hooks';
import { type SizeExtendedDictionaryType, type SpacingType, type SpiritControlButtonProps } from '../../types';
import { applySize, compose } from '../../utils';

const getControlButtonSizeClassname = <S = void>(className: string, size: SizeExtendedDictionaryType | S): string =>
  compose(applySize<SizeExtendedDictionaryType | S>(size))(className);

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
  const dynamicColorBackgroundInteractiveClass = useClassNamePrefix('dynamic-color-background-interactive');
  const dynamicColorBorderClass = useClassNamePrefix('dynamic-color-border');
  const accessibilityTapTargetClass = useClassNamePrefix('accessibility-tap-target');
  // Baked in so the content always picks up the active color scheme — including when the `disabled` utility is applied
  // on the ControlButton itself, where there is no parent to provide the content color.
  const textColorSchemeClass = useClassNamePrefix('text-color-scheme');

  const { symmetricalClassName } = useSymmetry(controlButtonClass, isSymmetrical);

  const classProps = classNames(
    controlButtonClass,
    getControlButtonSizeClassname(controlButtonClass, size as SizeExtendedDictionaryType | S),
    textColorSchemeClass,
    dynamicColorBackgroundInteractiveClass,
    accessibilityTapTargetClass,
    {
      [controlButtonBackgroundClass]: !isSubtle,
      [dynamicColorBorderClass]: !isSubtle,
      [CLASS_NAME_DISABLED]: isDisabled,
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
