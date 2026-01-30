import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { LinkColors } from '../../../constants';
import Link from '../Link';
import ReadMe from '../README.md';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'text',
    },
    color: {
      control: 'select',
      options: [...Object.values(LinkColors), 'inherit'],
      table: {
        defaultValue: { summary: LinkColors.PRIMARY },
      },
    },
    elementType: {
      control: 'text',
    },
    href: {
      control: 'text',
      defaultValue: 'https://www.example.com',
    },
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    target: {
      control: 'select',
      options: ['_blank', '_self', '_parent', '_top', undefined],
      table: {
        defaultValue: { summary: undefined },
      },
    },
    underlined: {
      control: 'select',
      options: [undefined, 'hover', 'always', 'never'],
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    children: 'Link',
    color: LinkColors.PRIMARY,
    elementType: 'a',
    href: 'https://www.example.com',
    isDisabled: false,
    target: '_blank',
    underlined: undefined,
    hasVisitedStyleAllowed: false,
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Playground: Story = {
  name: 'Link',
};
