import classNames from 'classnames';
import { useClassNamePrefix } from '../../hooks';
import { type LabelStyleProps } from '../../types';

export interface LabelStyles {
  /** className for the root element */
  classProps: string;
}

export function useLabelStyleProps(props: LabelStyleProps): LabelStyles {
  const { hasPointerCursor, isDisabled, isStretched, isLabelHidden, isRequired } = props;

  const prefix = useClassNamePrefix('Label');
  const requiredClass = `${prefix}--required`;
  const disabledClass = `${prefix}--disabled`;
  const hiddenClass = useClassNamePrefix('accessibility-hidden');
  const elementStretchedClass = useClassNamePrefix('element-stretched');
  const pointerCursorClass = useClassNamePrefix('cursor-pointer');

  const classProps = classNames(prefix, {
    [pointerCursorClass]: hasPointerCursor,
    [elementStretchedClass]: isStretched,
    [requiredClass]: isRequired,
    [disabledClass]: isDisabled,
    [hiddenClass]: isLabelHidden,
  });

  return {
    classProps,
  };
}
