import { type ElementType } from 'react';
import { type TIMELINE_MARKER } from '../components/Timeline/constants';
import type {
  BackgroundAccentColorsType,
  BackgroundColorsDictionaryType,
  BackgroundEmotionColorsType,
  BorderAccentColorsType,
  BorderColorsDictionaryType,
  BorderEmotionColorsType,
  ChildrenProps,
  SingleOrResponsive,
  SizesDictionaryType,
  StyleProps,
  TextColorProps,
} from './shared';

export type TimelineBaseProps = {
  /** Size of the timeline. */
  size?: SingleOrResponsive<SizesDictionaryType>;
};

export type TimelineProps<E extends ElementType> = {
  /**
   * The HTML element or React element used to render the plan, e.g. 'div', 'a', or `RouterLink`.
   *
   * @default 'ol'
   */
  elementType?: E;
};

export type TimelineStepProps<E extends ElementType> = {
  /**
   * The HTML element or React element used to render the plan, e.g. 'div', 'a', or `RouterLink`.
   *
   * @default 'li'
   */
  elementType?: E;
};

export type TimelineMarkerType = (typeof TIMELINE_MARKER)[keyof typeof TIMELINE_MARKER];

export interface TimelineMarkerProps {
  /**
   * Marker variant type.
   */
  variant?: TimelineMarkerType;
  /**
   * Background color of the marker.
   */
  backgroundColor?: BackgroundAccentColorsType | BackgroundEmotionColorsType | BackgroundColorsDictionaryType;
  /**
   * Text color of the marker.
   */
  textColor?: TextColorProps['textColor'];
  /**
   * Border color of the marker.
   */
  borderColor?: BorderAccentColorsType | BorderEmotionColorsType | BorderColorsDictionaryType;
}

export interface SpiritTimelineProps<T extends ElementType = 'ol'>
  extends TimelineProps<T>, TimelineBaseProps, ChildrenProps, StyleProps {}

export interface SpiritTimelineStepProps<T extends ElementType = 'li'>
  extends TimelineStepProps<T>, ChildrenProps, StyleProps {}

export interface SpiritTimelineMarkerProps extends TimelineMarkerProps, ChildrenProps, StyleProps {}

export interface SpiritTimelineHeadingProps extends ChildrenProps, StyleProps {}

export interface SpiritTimelineContentProps extends ChildrenProps, StyleProps {}
