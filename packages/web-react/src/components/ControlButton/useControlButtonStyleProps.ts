import classNames from 'classnames';
import { useClassNamePrefix, useSymmetry } from '../../hooks';
import { type ControlButtonStyleProps, type SizeExtendedDictionaryType } from '../../types';
import { applySize, compose } from '../../utils';

const getControlButtonSizeClassname = <S = void>(className: string, size: SizeExtendedDictionaryType | S): string =>
  compose(applySize<SizeExtendedDictionaryType | S>(size))(className);

export function useControlButtonStyleProps<S = void>(props: ControlButtonStyleProps<S>) {
  const { isDisabled, isSubtle, isSymmetrical, size, ...restProps } = props;

  const controlButtonClass = useClassNamePrefix('ControlButton');
  const controlButtonBackgroundClass = `${controlButtonClass}--hasBackground`;
  const controlButtonDisabledClass = `${controlButtonClass}--disabled`;
  const dynamicColorBackgroundInteractiveClass = useClassNamePrefix('dynamic-color-background-interactive');
  const dynamicColorBorderClass = useClassNamePrefix('dynamic-color-border');
  const accessibilityTapTargetClass = useClassNamePrefix('accessibility-tap-target');

  const { symmetricalClassName } = useSymmetry(controlButtonClass, isSymmetrical);

  const classProps = classNames(
    controlButtonClass,
    getControlButtonSizeClassname(controlButtonClass, size as SizeExtendedDictionaryType | S),
    dynamicColorBackgroundInteractiveClass,
    accessibilityTapTargetClass,
    {
      [controlButtonDisabledClass]: isDisabled,
      [controlButtonBackgroundClass]: !isSubtle,
      [dynamicColorBorderClass]: !isSubtle,
    },
    symmetricalClassName,
  );

  return {
    classProps,
    props: restProps,
  };
}
