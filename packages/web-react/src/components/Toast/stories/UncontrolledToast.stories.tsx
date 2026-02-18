import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AlignmentX, EmotionColors } from '../../../constants';
import { type ToastColorType, type ToastLinkProps, type UncontrolledToastProps } from '../../../types';
import { Button } from '../../Button';
import ReadMe from '../README.md?raw';
import { type ToastItem, ToastProvider } from '../ToastContext';
import { DEFAULT_TOAST_AUTO_CLOSE_INTERVAL, ToastColorsExtended, UncontrolledToast, useToast } from '..';

interface UncontrolledToastPlaygroundProps extends UncontrolledToastProps, ToastItem {}

const meta: Meta<UncontrolledToastPlaygroundProps> = {
  title: 'Components/Toast',
  component: UncontrolledToast,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    alignmentX: {
      control: 'select',
      options: [...Object.values(AlignmentX)],
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
    closeLabel: {
      control: 'text',
      table: {
        defaultValue: { summary: 'Close' },
      },
    },
    hasIcon: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isDismissible: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    color: {
      control: 'select',
      options: [Object.values(ToastColorsExtended), ...Object.values(EmotionColors)],
      table: {
        defaultValue: { summary: 'neutral' },
      },
    },
    iconName: {
      control: 'text',
    },
    isCollapsible: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    enableAutoClose: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    autoCloseInterval: {
      control: 'number',
      table: {
        defaultValue: { summary: DEFAULT_TOAST_AUTO_CLOSE_INTERVAL.toString() },
      },
    },
  },
  args: {
    content: {
      message: 'This is a toast message',
      link: 'Action',
    },
    alignmentX: 'center',
    alignmentY: 'bottom',
    closeLabel: 'Close',
    hasIcon: false,
    isDismissible: true,
    color: ToastColorsExtended.NEUTRAL,
    iconName: '',
    isCollapsible: true,
    enableAutoClose: true,
    autoCloseInterval: DEFAULT_TOAST_AUTO_CLOSE_INTERVAL,
    linkProps: {
      href: '#',
    },
  },
};

export default meta;
type Story = StoryObj<UncontrolledToastPlaygroundProps>;

const ShowButton = (props: {
  autoCloseInterval?: number;
  color: ToastColorType;
  enableAutoClose?: boolean;
  hasIcon: boolean;
  iconName?: string;
  isDismissible: boolean;
  linkProps: ToastLinkProps;
  content: { message: string | JSX.Element; link?: string | JSX.Element };
}) => {
  const { content, color, hasIcon, isDismissible, iconName, enableAutoClose, autoCloseInterval, linkProps } = props;
  const { show, clear } = useToast();

  return (
    <>
      <Button
        type="button"
        onClick={() =>
          show({ message: content.message, link: content.link }, Date.now().toString(), {
            color,
            hasIcon,
            isDismissible,
            iconName,
            enableAutoClose,
            autoCloseInterval,
            linkProps,
          })
        }
        marginBottom="space-400"
      >
        Show Toast
      </Button>
      <br />
      <Button type="button" onClick={() => clear()}>
        Clear queue
      </Button>
    </>
  );
};

const UncontrolledToastComponent = (args: UncontrolledToastPlaygroundProps) => {
  const { content, color, hasIcon, isDismissible, iconName, enableAutoClose, autoCloseInterval, linkProps } = args;

  return (
    <ToastProvider>
      <ShowButton
        autoCloseInterval={autoCloseInterval}
        color={color}
        enableAutoClose={enableAutoClose}
        hasIcon={hasIcon}
        iconName={iconName}
        isDismissible={isDismissible}
        content={content}
        linkProps={linkProps}
      />
      <UncontrolledToast {...args} />
    </ToastProvider>
  );
};

export const UncontrolledToastPlayground: Story = {
  name: 'UncontrolledToast',
  render: UncontrolledToastComponent,
};
