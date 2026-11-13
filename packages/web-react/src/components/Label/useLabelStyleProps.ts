import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type LabelStyleProps } from '../../types';

export interface LabelStyles {
  /** className for the root element */
  classProps: string;
}

export function useLabelStyleProps(props: LabelStyleProps): LabelStyles {
  const { fontWeight, hasPointerCursor, isDisabled, isStretched, isLabelHidden, isRequired, size } = props;

  const prefix = useClassNamePrefix('Label');
  const fontWeightClass = `${prefix}--${fontWeight}`;
  const sizeClass = `${prefix}--${size}`;
  const requiredClass = `${prefix}--required`;
  const disabledClass = `${prefix}--disabled`;
  const hiddenClass = useClassNamePrefix('accessibility-hidden');
  const elementStretchedClass = useClassNamePrefix('element-stretched');
  const pointerCursorClass = useClassNamePrefix('cursor-pointer');

  const classProps = classNames(prefix, {
    [disabledClass]: isDisabled,
    [elementStretchedClass]: isStretched,
    [fontWeightClass]: fontWeight,
    [hiddenClass]: isLabelHidden,
    [pointerCursorClass]: hasPointerCursor,
    [requiredClass]: isRequired,
    [sizeClass]: size,
  });

  return {
    classProps,
  };
}
