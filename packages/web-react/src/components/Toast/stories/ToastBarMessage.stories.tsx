import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { type ChildrenProps } from '../../../types';
import ReadMe from '../README.md?raw';
import { ToastBarMessage } from '..';

const meta: Meta<typeof ToastBarMessage> = {
  title: 'Components/Toast',
  component: ToastBarMessage,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'This is a Toast message',
  },
};

export default meta;

type Story = StoryObj<typeof ToastBarMessage>;

const ToastBarComponent = (args: ChildrenProps) => {
  const { children, ...restProps } = args;

  return <ToastBarMessage {...restProps}>{children}</ToastBarMessage>;
};

export const ToastBarPlaygroundMessage: Story = {
  name: 'ToastBarMessage',
  render: ToastBarComponent,
};
