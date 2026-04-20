'use client';

import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritTimelineStepProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useTimelineStyleProps } from './useTimelineStyleProps';

const defaultProps: Partial<SpiritTimelineStepProps> = {
  elementType: 'li',
};

const TimelineStep = <E extends ElementType = 'li'>(props: SpiritTimelineStepProps<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { classProps } = useTimelineStyleProps();
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.step, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps}>
      {children}
    </Component>
  );
};

TimelineStep.spiritComponent = 'TimelineStep';
TimelineStep.displayName = 'TimelineStep';

export default TimelineStep;
