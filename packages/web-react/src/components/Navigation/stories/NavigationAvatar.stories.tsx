import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Sizes, SizesExtended } from '../../../constants';
import { Icon } from '../../Icon';
import { Text } from '../../Text';
import Navigation from '../Navigation';
import NavigationAvatar from '../NavigationAvatar';
import NavigationItem from '../NavigationItem';
import ReadMe from '../README.md';

const meta: Meta<typeof NavigationAvatar> = {
  title: 'Components/Navigation',
  component: NavigationAvatar,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    avatarContent: {
      control: 'select',
      options: ['icon', 'image', 'text'],
      description: `This is the place for the content of the Avatar. In the real code
        you can pass in any children you want. In this demo we have predefined options:
        \`icon\`, \`image\` and \`text\`. Please note the predefined options
        in this demo are not customizable.`,
      mapping: {
        icon: <Icon name="profile" boxSize={24} />,
        image: <img src="https://picsum.photos/id/823/162/162" alt="Jiří Bárta" aria-hidden="true" />,
        text: <span aria-hidden="true">JB</span>,
      },
    },
    avatarSize: {
      control: 'select',
      options: [...Object.values(SizesExtended)],
      table: {
        type: {
          summary: 'SingleOrResponsive<SizeExtendedDictionaryType>',
        },
        defaultValue: { summary: 'small' },
      },
      description:
        'Size of the Avatar. Can be a single size or responsive object with mobile/tablet/desktop breakpoints.',
    },
    children: {
      control: 'select',
      options: ['text', 'text with icon'],
      description: `This is the place for the content of the NavigationAvatar. In the real code
        you can pass in any children you want. In this demo we have predefined options:
        \`text\` and \`text and icon\`. Please note the predefined options
        in this demo are not customizable.`,
      mapping: {
        text: (
          <Text elementType="span" size="small" emphasis="semibold">
            My Account
          </Text>
        ),
        'text with icon': (
          <>
            <Text elementType="span" size="small" emphasis="semibold">
              My Account
            </Text>
            <Icon name="chevron-down" />
          </>
        ),
      },
    },
    isSquare: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    avatarContent: 'icon',
    avatarSize: Sizes.SMALL,
    children: 'text',
    href: '#',
  },
};

export default meta;
type Story = StoryObj<typeof NavigationAvatar>;

export const NavigationAvatarPlayground: Story = {
  name: 'NavigationAvatar',
  render: (args) => (
    <Navigation>
      <NavigationItem>
        <NavigationAvatar {...args} />
      </NavigationItem>
    </Navigation>
  ),
};
