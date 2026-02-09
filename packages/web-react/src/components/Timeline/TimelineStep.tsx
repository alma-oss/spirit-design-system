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
  const { elementType: ElementTag = 'li', children, ...restProps } = propsWithDefaults;
  const { classProps } = useTimelineStyleProps();
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.step, styleProps, otherProps });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps}>
      {children}
    </ElementTag>
  );
};

TimelineStep.spiritComponent = 'TimelineStep';

export default TimelineStep;
