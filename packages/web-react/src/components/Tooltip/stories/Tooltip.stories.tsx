import { Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../..';
import { Placements } from '../../../constants';
import { type SpiritTooltipProps } from '../../../types';
import ReadMe from '../README.md?raw';
import { Tooltip, TooltipPopover, TooltipTrigger } from '..';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
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
    elementType: {
      control: 'text',
      table: {
        defaultValue: {
          summary: 'div',
        },
      },
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
    positionStrategy: {
      control: 'select',
      options: ['absolute', 'fixed'],
      table: { defaultValue: { summary: 'absolute' } },
    },
    trigger: {
      control: 'select',
      options: ['click, hover', 'hover', 'click', 'focus', 'click, hover, focus', 'hover, focus', 'click, focus'],
      mapping: {
        'click, hover': ['click', 'hover'],
        hover: ['hover'],
        click: ['click'],
        focus: ['focus'],
        'click, hover, focus': ['click', 'hover', 'focus'],
        'hover, focus': ['hover', 'focus'],
        'click, focus': ['click', 'focus'],
      },
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
    elementType: 'div',
    enableFlipping: true,
    enableFlippingCrossAxis: true,
    enableShifting: true,
    enableSizing: true,
    id: 'tooltip-example',
    isDismissible: false,
    isFocusableOnHover: false,
    isOpen: false,
    placement: 'bottom',
    positionStrategy: 'absolute',
    trigger: 'click, hover' as unknown as SpiritTooltipProps['trigger'],
  },
};

export default meta;
type Story = StoryObj<SpiritTooltipProps>;

const TooltipWithHooks = (args: SpiritTooltipProps) => {
  const { children, isOpen } = args;
  const [isTooltipOpen, setIsTooltipOpen] = useState(isOpen);

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
        <Tooltip {...args} isOpen={isOpen || isTooltipOpen} onToggle={setIsTooltipOpen}>
          <TooltipTrigger elementType={Button}>Button as anchor</TooltipTrigger>
          <TooltipPopover>{children}</TooltipPopover>
        </Tooltip>
      </div>
    </div>
  );
};

export const TooltipPlayground: Story = {
  name: 'Tooltip',
  render: (args) => <TooltipWithHooks {...args} />,
};
