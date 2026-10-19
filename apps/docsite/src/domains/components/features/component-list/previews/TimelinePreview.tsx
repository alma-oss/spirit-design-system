import { Heading, Timeline, TimelineHeading, TimelineMarker, TimelineStep } from '@alma-oss/spirit-web-react';
import React from 'react';

const steps = ['Apply', 'Interview', 'Offer'];

const TimelinePreview = () => (
  <Timeline size="medium" UNSAFE_style={{ width: 260 }}>
    {steps.map((title, index) => (
      <TimelineStep key={title}>
        <TimelineMarker>{index + 1}</TimelineMarker>
        <TimelineHeading>
          <Heading elementType="h3" size="small" fontWeight="semibold">
            {title}
          </Heading>
        </TimelineHeading>
      </TimelineStep>
    ))}
  </Timeline>
);

export default TimelinePreview;
