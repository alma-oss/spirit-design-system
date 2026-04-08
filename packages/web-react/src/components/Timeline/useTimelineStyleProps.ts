import classNames from 'classnames';
import { type ElementType } from 'react';
import { useClassNamePrefix } from '../../hooks';
import type { SingleOrResponsive, SizesDictionaryType, SpiritTimelineProps, TimelineMarkerProps } from '../../types';
import { generateResponsiveClassNames } from '../../utils';
import { TIMELINE_MARKER, TIMELINE_SIZE_DEFAULT } from './constants';

export interface UseTimelineStyleProps {
  markerVariant?: TimelineMarkerProps['variant'];
  markerBackgroundColor?: TimelineMarkerProps['backgroundColor'];
  markerBorderColor?: TimelineMarkerProps['borderColor'];
  markerTextColor?: TimelineMarkerProps['textColor'];
  markerSize?: SingleOrResponsive<SizesDictionaryType>;
}

export interface TimelineStyles<T> {
  /** className props */
  classProps: {
    content: string;
    heading: string;
    marker: string;
    root: string;
    step: string;
  };
  /** props to be passed to the element */
  props: T;
}

export function useTimelineStyleProps(props?: UseTimelineStyleProps): TimelineStyles<SpiritTimelineProps<ElementType>> {
  const {
    markerBackgroundColor,
    markerBorderColor,
    markerTextColor,
    markerVariant,
    markerSize = TIMELINE_SIZE_DEFAULT,
    ...restProps
  } = props || {};
  const timelineClass = useClassNamePrefix('Timeline');
  const contentClass = `${timelineClass}Content`;
  const headingClass = `${timelineClass}Heading`;
  const markerClass = `${timelineClass}Marker`;
  const stepClass = `${timelineClass}Step`;
  const shouldApplyBackgroundAndBorderColors =
    markerVariant === TIMELINE_MARKER.DOT || markerVariant === TIMELINE_MARKER.NUMBER;
  const markerBackgroundPrefix = useClassNamePrefix(`bg-${markerBackgroundColor}`);
  const markerBorderClassPrefix = useClassNamePrefix(`border-${markerBorderColor}`);
  const markerTextColorClassPrefix = useClassNamePrefix(`text-${markerTextColor}`);
  const markerBackgroundClass = markerBackgroundColor ? markerBackgroundPrefix : '';
  const markerBorderClass = markerBorderColor ? markerBorderClassPrefix : '';
  const markerTextColorClass = markerTextColor ? markerTextColorClassPrefix : '';

  return {
    classProps: {
      content: contentClass,
      heading: headingClass,
      marker: classNames(markerClass, {
        [`${markerClass}--${markerVariant}`]: !!markerVariant,
        [markerBackgroundClass]: shouldApplyBackgroundAndBorderColors,
        [markerBorderClass]: shouldApplyBackgroundAndBorderColors,
        [markerTextColorClass]: !!markerTextColor,
      }),
      root: classNames(timelineClass, generateResponsiveClassNames(timelineClass, markerSize)),
      step: stepClass,
    },
    props: restProps,
  };
}
