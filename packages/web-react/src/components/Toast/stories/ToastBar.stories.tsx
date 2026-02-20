import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EmotionColors } from '../../../constants';
import { type SpiritToastBarProps } from '../../../types';
import ReadMe from '../README.md?raw';
import { Toast, ToastBar, ToastBarLink, ToastBarMessage, ToastColorsExtended } from '..';

const meta: Meta<typeof ToastBar> = {
  title: 'Components/Toast',
  component: ToastBar,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'text',
    },
    closeLabel: {
      control: 'text',
      table: {
        defaultValue: { summary: 'Close' },
      },
    },
    color: {
      control: 'select',
      options: [...Object.values(ToastColorsExtended), ...Object.values(EmotionColors)],
      table: {
        defaultValue: { summary: 'neutral' },
      },
    },
    hasIcon: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    iconName: {
      control: 'text',
    },
    isDismissible: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isOpen: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    onClose: {
      action: 'onClose',
    },
  },
  args: {
    id: 'toast-bar',
    children: (
      <>
        <ToastBarMessage>Hello, World! This is a toast message with an action.</ToastBarMessage>
        <ToastBarLink href="#">Action</ToastBarLink>
      </>
    ),
    closeLabel: 'Close',
    color: ToastColorsExtended.NEUTRAL,
    hasIcon: false,
    iconName: '',
    isDismissible: false,
    isOpen: true,
    onClose: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof ToastBar>;

const ToastBarComponent = (args: SpiritToastBarProps) => (
  <Toast alignmentY="top">
    <ToastBar {...args} />
  </Toast>
);

export const ToastBarPlayground: Story = {
  name: 'ToastBar',
  render: ToastBarComponent,
};
