import classNames from 'classnames';
import { useClassNamePrefix, useSpacingStyle } from '../../hooks';
import { type StackStyleProps } from '../../types';

export function useStackStyleProps(props: StackStyleProps) {
  const { hasEndDivider, hasIntermediateDividers, hasSpacing, hasStartDivider, spacing, ...restProps } = props;

  const stackClass = useClassNamePrefix('Stack');
  const stackBottomDividerClass = `${stackClass}--endDivider`;
  const stackMiddleDividersClass = `${stackClass}--intermediateDividers`;
  const stackSpacingClass = `${stackClass}--spacing`;
  const stackTopDividerClass = `${stackClass}--startDivider`;
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
