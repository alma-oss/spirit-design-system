import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../../Button';
import { Text } from '../../Text';
import ReadMe from '../README.md?raw';
import TimelineContent from '../TimelineContent';
import { TIMELINE_DATA } from './constants';

const meta: Meta<typeof TimelineContent> = {
  title: 'Components/Timeline',
  component: TimelineContent,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'select',
      options: ['Simple Text', 'With Button'],
      description: 'Content examples for different use cases',
      mapping: {
        'Simple Text': <Text textColor="secondary">{TIMELINE_DATA[0].text}</Text>,
        'With Button': (
          <>
            <Text textColor="secondary" marginBottom="space-800">
              {TIMELINE_DATA[0].text}
            </Text>
            <Button color="secondary" size="large">
              Take Action
            </Button>
          </>
        ),
      },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
  args: {
    children: 'With Button',
  },
};

export default meta;
type Story = StoryObj<typeof TimelineContent>;

export const TimelineContentPlayground: Story = {
  name: 'TimelineContent',
};
