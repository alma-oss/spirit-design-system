import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Heading } from '../../Heading';
import { Text } from '../../Text';
import ReadMe from '../README.md?raw';
import TimelineContent from '../TimelineContent';
import TimelineHeading from '../TimelineHeading';
import TimelineMarker from '../TimelineMarker';
import TimelineStep from '../TimelineStep';
import { TIMELINE_DATA } from './constants';

const meta: Meta<typeof TimelineStep> = {
  title: 'Components/Timeline',
  component: TimelineStep,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'object',
      description: 'Step content including TimelineMarker, TimelineHeading, and TimelineContent',
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'li' },
      },
      description: 'The HTML element used to render the timeline step',
    },
  },
  args: {
    children: (
      <>
        <TimelineMarker variant="number">1</TimelineMarker>
        <TimelineHeading>
          <Heading elementType="h3" size="small" emphasis="semibold">
            {TIMELINE_DATA[0].title}
          </Heading>
        </TimelineHeading>
        <TimelineContent>
          <Text textColor="secondary">{TIMELINE_DATA[0].text}</Text>
        </TimelineContent>
      </>
    ),
    elementType: 'li',
  },
};

export default meta;
type Story = StoryObj<typeof TimelineStep>;

export const TimelineStepPlayground: Story = {
  name: 'TimelineStep',
};
