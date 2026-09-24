import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { BackgroundColors } from '../../../constants';
import ReadMe from '../README.md?raw';
import { UNSTABLE_Tile } from '..';

const meta: Meta<typeof UNSTABLE_Tile> = {
  title: 'Experimental/UNSTABLE_Tile',
  component: UNSTABLE_Tile,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    backgroundColor: {
      control: 'select',
      options: [...Object.values(BackgroundColors), undefined],
      table: {
        type: {
          summary: 'BackgroundColorsDictionaryType',
        },
      },
    },
    children: {
      control: 'text',
    },
    hasShadow: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: {
          summary: 'div',
        },
      },
    },
    padding: {
      control: 'text',
      table: {
        defaultValue: {
          summary: 'space-800',
        },
        type: {
          summary: 'SpaceToken',
        },
      },
    },
    paddingX: {
      control: 'text',
      table: {
        type: {
          summary: 'SpaceToken',
        },
      },
    },
    paddingY: {
      control: 'text',
      table: {
        type: {
          summary: 'SpaceToken',
        },
      },
    },
    paddingTop: {
      control: 'text',
      table: {
        type: {
          summary: 'SpaceToken',
        },
      },
    },
    paddingRight: {
      control: 'text',
      table: {
        type: {
          summary: 'SpaceToken',
        },
      },
    },
    paddingBottom: {
      control: 'text',
      table: {
        type: {
          summary: 'SpaceToken',
        },
      },
    },
    paddingLeft: {
      control: 'text',
      table: {
        type: {
          summary: 'SpaceToken',
        },
      },
    },
  },
  args: {
    backgroundColor: undefined,
    children: 'Tile content',
    hasShadow: false,
    padding: undefined,
    paddingX: undefined,
    paddingY: undefined,
    paddingTop: undefined,
    paddingRight: undefined,
    paddingBottom: undefined,
    paddingLeft: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof UNSTABLE_Tile>;

export const Playground: Story = {
  name: 'UNSTABLE_Tile',
  render: (args) => <UNSTABLE_Tile {...args} />,
};
