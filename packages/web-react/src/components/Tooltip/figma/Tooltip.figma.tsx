import figma from '@figma/code-connect';
import React from 'react';
import Tooltip from '../Tooltip';
import TooltipPopover from '../TooltipPopover';
import TooltipTrigger from '../TooltipTrigger';

figma.connect(Tooltip, '<FIGMA_FILE_ID>?node-id=4701%3A4086', {
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
  example: ({ text, ...props }) => (
    <Tooltip {...props} id="tooltip-example" onToggle={() => {}}>
      <TooltipTrigger>Trigger</TooltipTrigger>
      <TooltipPopover>{text}</TooltipPopover>
    </Tooltip>
  ),
});
