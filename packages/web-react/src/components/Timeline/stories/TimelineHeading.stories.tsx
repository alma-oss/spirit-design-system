import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Heading } from '../../Heading';
import { Link } from '../../Link';
import ReadMe from '../README.md?raw';
import TimelineHeading from '../TimelineHeading';

const meta: Meta<typeof TimelineHeading> = {
  title: 'Components/Timeline',
  component: TimelineHeading,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'select',
      options: ['Heading', 'Heading with link'],
      description: 'Heading content examples',
      mapping: {
        Heading: (
          <Heading elementType="h3" size="small" emphasis="semibold">
            Heading
          </Heading>
        ),
        'Heading with link': (
          <Heading elementType="h3" size="small" emphasis="semibold">
            <Link href="#">Heading with link</Link>
          </Heading>
        ),
      },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
  args: {
    children: 'Heading',
  },
};

export default meta;
type Story = StoryObj<typeof TimelineHeading>;

export const TimelineHeadingPlayground: Story = {
  name: 'TimelineHeading',
};
