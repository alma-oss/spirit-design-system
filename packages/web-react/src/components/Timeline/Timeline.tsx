'use client';

import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritTimelineProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { TIMELINE_SIZE_DEFAULT } from './constants';
import { useTimelineStyleProps } from './useTimelineStyleProps';

const defaultProps: Partial<SpiritTimelineProps> = {
  elementType: 'ol',
  size: TIMELINE_SIZE_DEFAULT,
};

const Timeline = <E extends ElementType = 'ol'>(props: SpiritTimelineProps<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, size, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { classProps } = useTimelineStyleProps({ markerSize: size });
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.root, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps}>
      {children}
    </Component>
  );
};

Timeline.spiritComponent = 'Timeline';
Timeline.displayName = 'Timeline';

export default Timeline;
