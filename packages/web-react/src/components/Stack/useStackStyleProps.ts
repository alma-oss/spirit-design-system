import classNames from 'classnames';
import { useClassNamePrefix, useSpacingStyle } from '../../hooks';
import { type StackStyleProps } from '../../types';

export function useStackStyleProps(props: StackStyleProps) {
  const { hasEndDivider, hasIntermediateDividers, hasSpacing, hasStartDivider, spacing, ...restProps } = props;

  const stackClass = useClassNamePrefix('Stack');
  const stackBottomDividerClass = `${stackClass}--hasEndDivider`;
  const stackMiddleDividersClass = `${stackClass}--hasIntermediateDividers`;
  const stackSpacingClass = `${stackClass}--hasSpacing`;
  const stackTopDividerClass = `${stackClass}--hasStartDivider`;
  const itemProps = `${stackClass}Item`;
  const stackStyle = useSpacingStyle(spacing, 'stack');

  return {
    classProps: {
      root: classNames(stackClass, {
        [stackBottomDividerClass]: hasEndDivider,
        [stackMiddleDividersClass]: hasIntermediateDividers,
        [stackSpacingClass]: hasSpacing || spacing,
        [stackTopDividerClass]: hasStartDivider,
      }),
      item: itemProps,
    },
    props: restProps,
    styleProps: stackStyle,
  };
}
