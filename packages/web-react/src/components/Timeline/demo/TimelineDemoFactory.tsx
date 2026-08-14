import React from 'react';
import type { SingleOrResponsive, SizesDictionaryType, TimelineMarkerType } from '../../../types';
import { Button } from '../../Button';
import { Heading } from '../../Heading';
import { Icon } from '../../Icon';
import { Link } from '../../Link';
import { Text } from '../../Text';
import Timeline from '../Timeline';
import TimelineContent from '../TimelineContent';
import TimelineHeading from '../TimelineHeading';
import TimelineMarker from '../TimelineMarker';
import TimelineStep from '../TimelineStep';
import type { TimelineDemoStep } from './constants';

interface TimelineDemoFactoryProps {
  size?: SingleOrResponsive<SizesDictionaryType>;
  steps: TimelineDemoStep[];
  variant: TimelineMarkerType;
}

const TimelineDemoFactory = ({ size, steps, variant }: TimelineDemoFactoryProps) => (
  <Timeline size={size}>
    {steps.map((step, index) => (
      <TimelineStep key={`timeline-step-${index.toString()}`}>
        <TimelineMarker
          variant={variant}
          backgroundColor={step.marker?.backgroundColor}
          borderColor={step.marker?.borderColor}
          textColor={step.marker?.textColor}
        >
          {step.marker?.iconName ? (
            <Icon name={step.marker?.iconName} color={step.marker?.iconColor} />
          ) : (
            step.marker?.content
          )}
        </TimelineMarker>

        {step.heading && (
          <TimelineHeading>
            <Heading elementType="h3" size="small" fontWeight="semibold">
              {step.heading.isLink ? (
                <Link href="#" color="primary">
                  {step.heading.text}
                </Link>
              ) : (
                step.heading.text
              )}
            </Heading>
          </TimelineHeading>
        )}

        {step.content && (
          <TimelineContent>
            <Text textColor="secondary" marginBottom={step.content.hasButton ? 'space-800' : undefined}>
              {step.content.text}
            </Text>
            {step.content.hasButton && (
              <Button color="secondary" size="large">
                Button secondary
              </Button>
            )}
          </TimelineContent>
        )}
      </TimelineStep>
    ))}
  </Timeline>
);

export default TimelineDemoFactory;
