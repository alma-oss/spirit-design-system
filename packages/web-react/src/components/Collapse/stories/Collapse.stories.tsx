import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { type SpiritCollapseProps } from '../../../types';
import { Button } from '../../Button';
import ReadMe from '../README.md?raw';
import { Collapse, useCollapse } from '..';
import content from './content';

const meta: Meta<typeof Collapse> = {
  title: 'Components/Collapse',
  component: Collapse,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
  },
  argTypes: {
    collapsibleToBreakpoint: {
      control: 'select',
      options: ['mobile', 'tablet', 'desktop', undefined],
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
    id: {
      control: 'text',
    },
    isOpen: {
      control: 'boolean',
    },
    transitionDuration: {
      control: 'number',
      table: {
        defaultValue: { summary: '250' },
      },
    },
  },
  args: {
    elementType: 'div',
    id: 'collapse-example',
    isOpen: false,
    transitionDuration: 250,
  },
};

export default meta;
type Story = StoryObj<typeof Collapse>;

const CollapseWithHooks = (args: SpiritCollapseProps) => {
  const { isOpen, toggleHandler } = useCollapse(true);

  return (
    <div>
      <Button onClick={toggleHandler}>Collapse Trigger ({isOpen ? 'Open' : 'Closed'})</Button>
      <Collapse {...args} isOpen={isOpen}>
        {content}
      </Collapse>
    </div>
  );
};

export const Playground: Story = {
  name: 'Collapse',
  render: (args) => <CollapseWithHooks {...args} />,
};
