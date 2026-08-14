import figma from '@figma/code-connect';
import React from 'react';
import { Heading, Text } from '../..';
import { Timeline, TimelineContent, TimelineHeading, TimelineMarker, TimelineStep } from '..';

figma.connect(Timeline, '<FIGMA_FILE_ID>?node-id=37905%3A1011', {
  props: {
    markerProps: figma.nestedProps('timeline-point', {
      size: figma.enum('Size', {
        Medium: 'medium',
        Large: 'large',
      }),
      variant: figma.enum('Type', {
        Number: 'number',
        Point: 'dot',
        Icon: 'icon',
      }),
    }),
  },
  example: ({ markerProps, ...props }) => (
    <Timeline {...props} size={markerProps.size}>
      <TimelineStep>
        <TimelineMarker variant={markerProps.variant} />
        <TimelineHeading>
          <Heading elementType="h3" size="small" fontWeight="semibold">
            Headline
          </Heading>
        </TimelineHeading>
        <TimelineContent>
          <Text textColor="secondary">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
            some form, by injected humour, or randomised words which don&#39;t look even slightly believable.
          </Text>
        </TimelineContent>
      </TimelineStep>
    </Timeline>
  ),
});
