import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Direction } from '../../../constants';
import { Button } from '../../Button';
import { Navigation, NavigationAction, NavigationItem } from '../../Navigation';
import ReadMe from '../README.md?raw';
import { Toolbar } from '..';

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: false,
    },
    orientation: {
      control: 'select',
      options: [...Object.values(Direction)],
      table: {
        defaultValue: { summary: Direction.HORIZONTAL },
      },
    },
  },
  args: {
    'aria-label': 'Document actions',
    orientation: Direction.HORIZONTAL,
  },
  render: (args) => (
    <Toolbar {...args}>
      <Navigation>
        <NavigationItem>
          <NavigationAction href="#" variant="pill">
            Preview
          </NavigationAction>
        </NavigationItem>
        <NavigationItem>
          <NavigationAction elementType="button" type="button" variant="pill">
            Download
          </NavigationAction>
        </NavigationItem>
        <NavigationItem>
          <NavigationAction href="#" variant="pill" isDisabled>
            Disabled
          </NavigationAction>
        </NavigationItem>
        <NavigationItem>
          <Button color="secondary">Share</Button>
        </NavigationItem>
      </Navigation>
    </Toolbar>
  ),
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Playground: Story = {
  name: 'Toolbar',
};
