import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { type SpiritTooltipProps } from '../../../types';
import { Tooltip, TooltipPopover, TooltipTrigger } from '..';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip/Figma',
  component: Tooltip,
  tags: ['!autodocs', 'figma'],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: '<FIGMA_FILE_ID>?node-id=4701%3A4086',
      props: {
        isDismissible: figma.boolean('Dismissible'),
        placement: figma.enum('Placement', {
          Top: 'top',
          Right: 'right',
          Bottom: 'bottom',
          Left: 'left',
          'Top Start': 'top-start',
          'Top End': 'top-end',
          'Right Start': 'right-start',
          'Right End': 'right-end',
          'Bottom Start': 'bottom-start',
          'Bottom End': 'bottom-end',
          'Left Start': 'left-start',
          'Left End': 'left-end',
        }),
        text: figma.string('Text'),
      },
      examples: ['FigmaPlayground'],
    },
  },
};

export default meta;
type Story = StoryObj<SpiritTooltipProps>;

export const FigmaPlayground: Story = {
  name: 'Tooltip',
  render: ({ text, ...props }: SpiritTooltipProps & { text?: string }) => (
    <Tooltip {...props} id="tooltip-example" onToggle={() => {}}>
      <TooltipTrigger>Trigger</TooltipTrigger>
      <TooltipPopover>{text}</TooltipPopover>
    </Tooltip>
  ),
};
