import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef } from 'react';
import { Button } from '../..';
import { Placements } from '../../../constants';
import { type SpiritTooltipProps } from '../../../types';
import ReadMe from '../README.md?raw';
import { TooltipPopover, TooltipTrigger, UncontrolledTooltip } from '..';

const meta: Meta<typeof UncontrolledTooltip> = {
  title: 'Components/Tooltip',
  component: UncontrolledTooltip,
  parameters: {
    docs: {
      page: () => <Markdown>{ReadMe}</Markdown>,
    },
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'object',
    },
    enableFlipping: { control: 'boolean' },
    enableFlippingCrossAxis: { control: 'boolean' },
    enableShifting: { control: 'boolean' },
    enableSizing: { control: 'boolean' },
    id: { control: 'text' },
    isDismissible: { control: 'boolean' },
    isFocusableOnHover: { control: 'boolean' },
    isOpen: { control: 'boolean' },
    placement: {
      control: 'select',
      options: Object.values(Placements),
      table: { defaultValue: { summary: 'bottom' } },
    },
    trigger: {
      control: 'select',
      options: ['click, hover', 'hover', 'click', 'focus', 'click, hover, focus', 'hover, focus', 'click, focus'],
      table: { defaultValue: { summary: 'click, hover' } },
    },
  },
  args: {
    children: (
      <>
        This long tooltip is flipping, resizing and shifting to stay in the viewport. Also its arrow is always trying to
        point to the center of the trigger.
      </>
    ),
    enableFlipping: true,
    enableFlippingCrossAxis: true,
    enableShifting: true,
    enableSizing: true,
    id: 'tooltip-example',
    isDismissible: false,
    isFocusableOnHover: false,
    isOpen: false,
    placement: 'bottom',
    trigger: ['click', 'hover'],
  },
};

export default meta;
type Story = StoryObj<typeof UncontrolledTooltip>;

const UncontrolledTooltipWithHooks = (args: Omit<SpiritTooltipProps, 'onToggle'>) => {
  const { children, trigger } = args;

  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (viewport && content) {
      viewport.scrollLeft = (content.offsetWidth - viewport.offsetWidth) / 2;
      viewport.scrollTop = (content.offsetHeight - viewport.offsetHeight) / 2;
    }
  }, []);

  // Convert trigger string to array if needed (Storybook controls pass string)
  let triggerArray = trigger;
  if (trigger && typeof trigger === 'string') {
    const triggerString = trigger as string;
    triggerArray = triggerString.split(', ').map((t: string) => t.trim()) as typeof trigger;
  }

  return (
    <div
      className="bg-secondary"
      style={{ width: '40rem', maxWidth: '100%', height: '30rem', overflow: 'auto' }}
      ref={viewportRef}
    >
      <div
        style={{ position: 'relative', width: '300%', height: '90rem', paddingBlock: '44rem', textAlign: 'center' }}
        ref={contentRef}
      >
        <UncontrolledTooltip {...args} trigger={triggerArray}>
          <TooltipTrigger elementType={Button}>Button as anchor</TooltipTrigger>
          <TooltipPopover>{children}</TooltipPopover>
        </UncontrolledTooltip>
      </div>
    </div>
  );
};

export const UncontrolledTooltipPlayground: Story = {
  name: 'UncontrolledTooltip',
  render: (args) => <UncontrolledTooltipWithHooks {...args} />,
};
