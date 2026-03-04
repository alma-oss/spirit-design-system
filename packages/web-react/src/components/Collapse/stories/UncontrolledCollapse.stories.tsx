import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { type SpiritUncontrolledCollapseProps } from '../../../types';
import { Button } from '../../Button';
import { UncontrolledCollapse } from '..';

type UncontrolledCollapsePlaygroundType = {
  content: string;
} & SpiritUncontrolledCollapseProps;

const meta: Meta<UncontrolledCollapsePlaygroundType> = {
  title: 'Components/Collapse',
  component: UncontrolledCollapse,
  argTypes: {
    collapsibleToBreakpoint: {
      control: 'select',
      options: ['mobile', 'tablet', 'desktop', undefined],
      description: 'Handle for responsive breakpoint',
      table: {
        defaultValue: { summary: undefined },
      },
    },
    elementType: {
      control: 'text',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
    hideOnCollapse: {
      control: 'boolean',
      description: '**DEPRECATED** in favor of `isDisposable`; Hides button when content is displayed',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isDisposable: {
      control: 'boolean',
      description: 'Hides trigger when content is displayed',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    id: {
      control: 'text',
    },
    isOpen: {
      control: 'boolean',
      description: 'Initial state of the collapse',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    transitionDuration: {
      control: 'number',
      description: 'Duration of the transition',
      table: {
        defaultValue: { summary: '250', detail: ' in milliseconds' },
      },
    },
    content: {
      control: 'text',
      description: 'Content to be displayed in the collapse',
    },
  },
  args: {
    elementType: 'div',
    hideOnCollapse: false,
    id: 'collapse-example',
    isDisposable: false,
    isOpen: false,
    transitionDuration: 250,
    content:
      'Condimentum odio, pulvinar et sollicitudin accumsan ac hendrerit vestibulum commodo, molestie laoreet dui sit amet. Molestie consectetur, sed ac felis scelerisque lectus accumsan purus id dolor sed vitae, praesent aliquam dolor quis ornare. Nulla sit amet, rhoncus at quis odio et iaculis lacinia suscipit vivamus sodales, nunc id condimentum felis. Consectetur nec commodo, praesent et elit magna purus molestie cursus molestie, libero ut venenatis erat id et nisi. Quam posuere, aliquam quam leo vitae tellus semper eget nunc, ultricies adipiscing sit amet accumsan. Lorem rutrum, porttitor ante mauris suspendisse ultricies consequat purus, congue a commodo magna et.',
  },
};

export default meta;
type Story = StoryObj<UncontrolledCollapsePlaygroundType>;

export const UncontrolledCollapsePlayground: Story = {
  name: 'UncontrolledCollapse',
  render: (args) => {
    const { content } = args;

    return (
      <>
        <p>{content}</p>
        <UncontrolledCollapse
          {...args}
          renderTrigger={({ isOpen, ...restProps }) => (
            <Button {...restProps} marginBottom="space-700">
              Collapse Trigger ({isOpen ? 'Open' : 'Closed'})
            </Button>
          )}
        >
          <p>{content}</p>
        </UncontrolledCollapse>
      </>
    );
  },
};
