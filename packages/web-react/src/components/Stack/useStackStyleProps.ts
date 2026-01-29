import classNames from 'classnames';
import { type ElementType } from 'react';
import { useClassNamePrefix, useSpacingStyle } from '../../hooks';
import { type SpacingCSSProperties, type SpiritStackProps } from '../../types';

interface StackCSSProperties extends SpacingCSSProperties {}

export function useStackStyleProps<T extends ElementType = 'div'>(props: SpiritStackProps<T>) {
  const { hasEndDivider, hasIntermediateDividers, hasSpacing, hasStartDivider, spacing, ...restProps } = props;

  const StackClass = useClassNamePrefix('Stack');
  const StackBottomDividerClass = `${StackClass}--hasEndDivider`;
  const StackMiddleDividersClass = `${StackClass}--hasIntermediateDividers`;
  const StackSpacingClass = `${StackClass}--hasSpacing`;
  const StackTopDividerClass = `${StackClass}--hasStartDivider`;
  const rootProps = classNames(StackClass, {
    [StackBottomDividerClass]: hasEndDivider,
    [StackMiddleDividersClass]: hasIntermediateDividers,
    [StackSpacingClass]: hasSpacing || spacing,
    [StackTopDividerClass]: hasStartDivider,
  });
  const itemProps = classNames(`${StackClass}Item`);
  const stackStyle = useSpacingStyle(spacing, 'stack');

  return {
    classProps: {
      root: rootProps,
      item: itemProps,
    },
    props: restProps,
    styleProps: stackStyle,
  };
}
