import { type ReactNode } from 'react';
import type { IconColorType, TimelineMarkerProps } from '../../../types';

export interface TimelineDemoStep {
  marker?: Pick<TimelineMarkerProps, 'backgroundColor' | 'borderColor' | 'textColor'> & {
    content?: string | ReactNode;
    iconName?: string;
    iconColor?: IconColorType;
  };
  heading?: {
    text: string;
    isLink?: boolean;
  };
  content?: {
    text: string;
    hasButton?: boolean;
  };
}

const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.';

export const DEFAULT_STEPS: TimelineDemoStep[] = [
  {
    marker: { content: '1' },
    heading: { text: 'Title' },
    content: { text: LOREM_IPSUM },
  },
  {
    marker: { content: '2' },
    content: { text: LOREM_IPSUM },
  },
  {
    marker: { content: '3' },
    heading: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', isLink: true },
    content: { text: LOREM_IPSUM, hasButton: true },
  },
  {
    marker: { content: '99' },
    heading: { text: 'Lorem ipsum dolor sit amet elit.' },
  },
];

export const COLORED_NUMBER_STEPS: TimelineDemoStep[] = [
  {
    marker: {
      content: '1',
      backgroundColor: 'accent-01-subtle',
      borderColor: 'accent-01-basic',
      textColor: 'accent-01-basic',
    },
    heading: { text: 'Title' },
    content: { text: LOREM_IPSUM },
  },
  {
    marker: {
      content: '2',
      backgroundColor: 'accent-01-subtle',
      borderColor: 'accent-01-basic',
      textColor: 'accent-01-basic',
    },
    heading: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    content: { text: LOREM_IPSUM },
  },
];

export const DOT_STEPS: TimelineDemoStep[] = [
  {
    marker: {
      backgroundColor: 'accent-01-subtle',
      borderColor: 'accent-01-basic',
      textColor: 'accent-01-basic',
    },
    heading: { text: 'Title' },
    content: { text: LOREM_IPSUM },
  },
  {
    heading: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    content: { text: LOREM_IPSUM },
  },
];

export const ICON_STEPS: TimelineDemoStep[] = [
  {
    marker: { iconName: 'search', iconColor: '01' },
    heading: { text: 'Title' },
    content: { text: LOREM_IPSUM },
  },
  {
    marker: { iconName: 'file', iconColor: 'secondary' },
    heading: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    content: { text: LOREM_IPSUM },
  },
];

const SHORT_LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.';

export const SIZE_STEPS: TimelineDemoStep[] = [
  {
    marker: { content: '1' },
    heading: { text: 'Small Size' },
    content: { text: SHORT_LOREM_IPSUM },
  },
  {
    marker: { content: '2' },
    heading: { text: 'Medium Size' },
    content: { text: SHORT_LOREM_IPSUM },
  },
  {
    marker: { content: '3' },
    heading: { text: 'Large Size' },
    content: { text: SHORT_LOREM_IPSUM },
  },
];

export const SIZE_ICON_STEPS: TimelineDemoStep[] = [
  {
    marker: { iconName: 'file', iconColor: 'secondary' },
    heading: { text: 'Small Icon Marker' },
    content: { text: SHORT_LOREM_IPSUM },
  },
  {
    marker: { iconName: 'file', iconColor: 'secondary' },
    heading: { text: 'Medium Icon Marker' },
    content: { text: SHORT_LOREM_IPSUM },
  },
  {
    marker: { iconName: 'file', iconColor: 'secondary' },
    heading: { text: 'Large Icon Marker' },
    content: { text: SHORT_LOREM_IPSUM },
  },
];

export const SIZE_DOT_STEPS: TimelineDemoStep[] = [
  {
    heading: { text: 'Small Dot Marker' },
    content: { text: SHORT_LOREM_IPSUM },
  },
  {
    heading: { text: 'Medium Dot Marker' },
    content: { text: SHORT_LOREM_IPSUM },
  },
  {
    heading: { text: 'Large Dot Marker' },
    content: { text: SHORT_LOREM_IPSUM },
  },
];

export const RESPONSIVE_SIZE_STEPS: TimelineDemoStep[] = [
  {
    marker: { content: '1' },
    heading: { text: 'Responsive Marker' },
    content: { text: SHORT_LOREM_IPSUM },
  },
];

export const RESPONSIVE_SIZE_ICON_STEPS: TimelineDemoStep[] = [
  {
    marker: { iconName: 'file', iconColor: 'secondary' },
    heading: { text: 'Responsive Icon Marker' },
    content: { text: SHORT_LOREM_IPSUM },
  },
];

export const RESPONSIVE_SIZE_DOT_STEPS: TimelineDemoStep[] = [
  {
    heading: { text: 'Responsive Dot Marker' },
    content: { text: SHORT_LOREM_IPSUM },
  },
];
