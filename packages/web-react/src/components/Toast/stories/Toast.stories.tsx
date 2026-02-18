import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { type SpiritToastProps } from '../../../types';
import { Button } from '../../Button';
import ReadMe from '../README.md?raw';
import { Toast, ToastBar, ToastBarMessage } from '..';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    children: {
      control: 'text',
    },
    alignmentX: {
      control: 'select',
      options: ['left', 'center', 'right'],
      table: {
        defaultValue: { summary: 'center' },
      },
    },
    alignmentY: {
      control: 'select',
      options: ['top', 'bottom'],
      table: {
        defaultValue: { summary: 'bottom' },
      },
    },
  },
  args: {
    alignmentX: 'center',
    alignmentY: 'bottom',
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

const ToastWithHooks = (args: SpiritToastProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const buttonLabel = isOpen ? 'Close toast' : 'Open toast';

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>{buttonLabel}</Button>
      <Toast {...args}>
        <ToastBar id="my-toast" isOpen={isOpen} isDismissible onClose={() => setIsOpen(false)}>
          <ToastBarMessage>This is a toast message</ToastBarMessage>
        </ToastBar>
      </Toast>
    </>
  );
};

export const ToastPlayground: Story = {
  name: 'Toast',
  render: (args) => <ToastWithHooks {...args} />,
};
