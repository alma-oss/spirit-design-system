import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Sizes } from '../../../constants';
import { ControlButton } from '../../ControlButton';
import { Icon } from '../../Icon';
import ReadMe from '../README.md?raw';
import { InputAddon } from '..';

const meta: Meta<typeof InputAddon> = {
  title: 'Components/InputAddon',
  component: InputAddon,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'select',
      options: ['Icon', 'ControlButton', 'String'],
      description:
        'This is the place for the content of the InputAddon. Place Icon, ControlButton or any string inside.',
      mapping: {
        Icon: <Icon name="profile" />,
        ControlButton: (
          <ControlButton size="medium" isSymmetrical isSubtle>
            <Icon name="profile" />
          </ControlButton>
        ),
        String: <span aria-hidden="true">@</span>,
      },
    },
    size: {
      control: 'select',
      options: [...Object.values(Sizes), undefined],
      table: {
        defaultValue: { summary: Sizes.MEDIUM },
      },
    },
  },
  args: {
    children: 'Icon',
    size: Sizes.MEDIUM,
  },
};

export default meta;
type Story = StoryObj<typeof InputAddon>;

export const Playground: Story = {
  name: 'InputAddon',
  render: (args) => <InputAddon {...args} />,
};
