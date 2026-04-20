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
  PolymorphicComponentProps,
  SingleOrResponsive,
  SizesDictionaryType,
  StyleProps,
  TextColorProps,
} from './shared';

export type TimelineBaseProps = {
  /** Size of the timeline. */
  size?: SingleOrResponsive<SizesDictionaryType>;
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

/** ===== INTERNAL API ===== */
export interface TimelineProps extends TimelineBaseProps, ChildrenProps, StyleProps {}

export interface TimelineStepProps extends ChildrenProps, StyleProps {}

/** ===== PUBLIC API ===== */
export type SpiritTimelineProps<E extends ElementType = 'ol'> = PolymorphicComponentProps<E, TimelineProps>;

export type SpiritTimelineStepProps<E extends ElementType = 'li'> = PolymorphicComponentProps<E, TimelineStepProps>;

export interface SpiritTimelineMarkerProps extends TimelineMarkerProps, ChildrenProps, StyleProps {}

export interface SpiritTimelineHeadingProps extends ChildrenProps, StyleProps {}

export interface SpiritTimelineContentProps extends ChildrenProps, StyleProps {}
