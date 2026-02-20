import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Sizes, SizesExtended } from '../../../constants';
import { Icon } from '../../Icon';
import ReadMe from '../README.md?raw';
import { Avatar } from '..';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'select',
      options: ['icon', 'image', 'text'],
      description: `This is the place for the content of the Avatar. In the real code
        you can pass in any children you want. In this demo we have predefined options:
        \`icon\`, \`image\` and \`text\`. Please note the predefined options
        in this demo are not customizable.`,
      mapping: {
        icon: <Icon name="profile" />,
        image: <img src="https://picsum.photos/id/823/162/162" alt="Jiří Bárta" aria-hidden="true" />,
        text: <span aria-hidden="true">JB</span>,
      },
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
    isSquare: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: [...Object.values(SizesExtended)],
      table: {
        type: {
          summary: 'SingleOrResponsive<SizeExtendedDictionaryType>',
        },
      },
      description:
        'Size of the Avatar. Can be a single size or responsive object with mobile/tablet/desktop breakpoints.',
    },
  },
  args: {
    children: 'text',
    elementType: 'div',
    isSquare: false,
    size: Sizes.MEDIUM,
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {
  name: 'Avatar',
};
