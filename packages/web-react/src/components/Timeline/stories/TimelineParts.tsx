import React from 'react';
import { Button } from '../../Button';
import { Heading } from '../../Heading';
import { Icon } from '../../Icon';
import { Link } from '../../Link';
import { Text } from '../../Text';
import { TIMELINE_MARKER } from '../constants';
import TimelineContent from '../TimelineContent';
import TimelineHeading from '../TimelineHeading';
import TimelineMarker from '../TimelineMarker';
import TimelineStep from '../TimelineStep';
import { TIMELINE_DATA, type TimelineDataStep } from './constants';

const renderTimelineContent = (item: TimelineDataStep) => (
  <>
    {item.title && (
      <TimelineHeading>
        <Heading elementType="h3" size="small" fontWeight="semibold">
          {item.button ? <Link href="#">{item.title}</Link> : item.title}
        </Heading>
      </TimelineHeading>
    )}
    {item.text && (
      <TimelineContent>
        <Text textColor="secondary">{item.text}</Text>
        {item.button && (
          <Button color="secondary" size="large">
            Learn More
          </Button>
        )}
      </TimelineContent>
    )}
  </>
);

export const TimelineWithNumber = () => (
  <>
    {TIMELINE_DATA.map((item, index) => (
      <TimelineStep key={`number-${index.toString()}`}>
        <TimelineMarker variant={TIMELINE_MARKER.NUMBER}>{index + 1}</TimelineMarker>
        {renderTimelineContent(item)}
      </TimelineStep>
    ))}
  </>
);

export const TimelineWithDot = () => (
  <>
    {TIMELINE_DATA.map((item, index) => (
      <TimelineStep key={`dot-${index.toString()}`}>
        <TimelineMarker variant={TIMELINE_MARKER.DOT} />
        {renderTimelineContent(item)}
      </TimelineStep>
    ))}
  </>
);

export const TimelineWithIcon = () => (
  <>
    {TIMELINE_DATA.map((item, index) => (
      <TimelineStep key={`icon-${index.toString()}`}>
        <TimelineMarker variant={TIMELINE_MARKER.ICON}>
          <Icon name="file" />
        </TimelineMarker>
        {renderTimelineContent(item)}
      </TimelineStep>
    ))}
  </>
);
